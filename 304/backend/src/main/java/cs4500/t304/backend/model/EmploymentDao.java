package cs4500.t304.backend.model;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.cfg4j.source.ConfigurationSource;
import org.cfg4j.source.classpath.ClasspathConfigurationSource;
import org.cfg4j.source.context.environment.DefaultEnvironment;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Properties;

/**
 * Responsible for supporting {@link cs4500.t304.backend.DatabaseEndpoint}.
 */
public class EmploymentDao implements AutoCloseable {

  private static Properties properties;
  static {
    ConfigurationSource configSource = new ClasspathConfigurationSource();
    properties = configSource.getConfiguration(new DefaultEnvironment());
  }
  private static String url = properties.getProperty("database.url");
  private static String username = properties.getProperty("database.username");
  private static String password = properties.getProperty("database.password");

  private static final Logger logger = LogManager.getLogger(EmploymentDao.class);

  //Create connections and SQL statements for population.
  Connection connection = null;

  public static EmploymentDao getDao() {
    return new EmploymentDao(url, username, password);
  }

  /**
   * Constructor that returns an EmploymentDB object.
   *
   * @param url the URL for where the database is hosted.
   * @param user the username for the database connection
   * @param pw the password for the database.
   */
  private EmploymentDao(String url, String user, String pw) {
    try {
      connection = DriverManager.getConnection(url, user, pw);
    } catch (SQLException e) {
      logger.error("Failed to get database connection! Check output console");
      logger.error(e.toString());
      throw new RuntimeException(e);
    }
  }


  /**
   * Creates and returns a CalculatorInput object that is populated through database calls.
   * @param ssn the Social Security Number of the employee.
   * @return the CalculatorInput object to use for calculating retirement.
   */
  public CalculatorInput createCalculatorInput(String ssn, LocalDate dayOfRetirement) {
    CalculatorInput theInput = new CalculatorInput();
    try {
      boolean before2012 = getClassificationData(ssn);
      int max_duration = before2012 ? 3 : 5;

      theInput.setDayOfBirth(getDayOfBirthData(ssn));
      theInput.setDayOfRetirement(dayOfRetirement);
      theInput.setBefore2012(before2012);
      theInput.setGroupNumber(getGroupNumberData(ssn));
      theInput.setSalaryAverage(getSalaryAverageData(ssn, max_duration, dayOfRetirement));
      theInput.setMilitaryVeteran(getMilitaryVeteranData(ssn));
      theInput.setMonthsOfService(getMonthOfServiceData(ssn, dayOfRetirement));

      return theInput;
    } catch (SQLException e) {
      logger.error("Creating calculator input failed");
      logger.error(e.toString());
      throw new RuntimeException(e);
    }
  }

  /**
   * @param ssn the Social Security Number of the employee
   * @return the employees date of birth.
   */
  protected LocalDate getDayOfBirthData(String ssn) throws SQLException {
    try (PreparedStatement dobStmt = connection.prepareStatement("SELECT DoB from employee where SSN = ?")) {
      dobStmt.setString(1, ssn);
      try (ResultSet result = dobStmt.executeQuery()) {
        result.next();
        LocalDate dob = result.getDate("DoB").toLocalDate();
        dobStmt.close();
        return dob;
      }
    }
  }


  /**
   * @param ssn the Social Security Number of the employee
   * @return if the employee has a start date before 4/2/2012
   */
  protected boolean getClassificationData(String ssn) throws SQLException {
    try (PreparedStatement classStmt = connection.prepareStatement(
        "SELECT min(startDate) from retirement_info.employment where SSN = ?")) {
      classStmt.setString(1, ssn);
      try (ResultSet result = classStmt.executeQuery()) {
        result.next();
        LocalDate eis = result.getDate("min(startDate)").toLocalDate();
        LocalDate cutoff = LocalDate.of(2012, 4, 2);
        return eis.isBefore(cutoff);
      }
    }
  }

  /**
   * @param ssn the Social Security Number of the employee
   * @return the maximum group number of the employee
   */
  protected int getGroupNumberData(String ssn) throws SQLException {
    try (PreparedStatement groupStmt = connection.prepareStatement("SELECT max(groupClassification) from " + "retirement_info.employment where SSN = ?")) {
      groupStmt.setString(1, ssn);
      try (ResultSet result = groupStmt.executeQuery()) {
        result.next();
        int groupNumber = result.getInt("max(groupClassification)");
        if (groupNumber == 0) {
          throw new RuntimeException("Error - group classificaion not found.");
        }
        return groupNumber;
      }
    }
  }

  /**
   * @param ssn the Social Security Number of the employee
   * @param years the number of years to average salary by as determined by start date
   * @return the highest average salary of the employee
   */
  protected int getSalaryAverageData(String ssn, int years, LocalDate dayOfRetirement) throws SQLException {
    try (PreparedStatement salaryStmt = connection.prepareStatement(
        "select startDate, endDate, Salary "
        + "from retirement_info.employment where SSN = ? order by Salary DESC ")) {
      salaryStmt.setString(1, ssn);
      try (ResultSet result = salaryStmt.executeQuery()) {
        int duration = 0;
        int max_duration = 12 * years;
        double total_salary = 0;
        while (duration < max_duration && result.next()) {
          LocalDate startDate = result.getDate("startDate").toLocalDate();
          LocalDate endDate;
          try {
            endDate = result.getDate("endDate").toLocalDate();
          } catch (Exception e) {
            endDate = dayOfRetirement;
          }
          double salary = result.getDouble("Salary");
          long difference = startDate.until(endDate, ChronoUnit.MONTHS) + 1;

          if (difference < (max_duration - duration)) {
            total_salary = total_salary + (salary * difference);
            duration = duration + (int) difference;
          } else {
            total_salary = total_salary + (salary * (max_duration - duration));
            duration = max_duration;
          }
        }
        return  (int) total_salary / duration;
      }
    }
  }

  /**
   * @param ssn the Social Security Number of the employee
   * @return if the employee is a military veteran.
   */
  protected boolean getMilitaryVeteranData(String ssn) throws SQLException {
    try (PreparedStatement vetStmt = connection.prepareStatement("select USVeteran from employee where SSN = ?")) {
      vetStmt.setString(1, ssn);
      try (ResultSet result = vetStmt.executeQuery()) {
        result.next();
        return result.getBoolean("USVeteran");
      }
    }
  }


  /**
   * @param ssn the Social Security Number of the employee
   * @return the number of months of service for the employee, rounded down to the nearest int.
   */
  protected int getMonthOfServiceData(String ssn, LocalDate dayOfRetirement) throws SQLException {
    double duration = 0;
    try (PreparedStatement mosStmt = connection.prepareStatement(
        "select startDate, endDate, Salary "
        + "from retirement_info.employment where SSN = ? order by endDate desc")) {
      mosStmt.setString(1, ssn);
      try (ResultSet result = mosStmt.executeQuery()) {
        boolean results = false;
        while (result.next()) {
          results = true;
          LocalDate startDate = result.getDate("startDate").toLocalDate();
          LocalDate endDate;
          try {
            endDate = result.getDate("endDate").toLocalDate();
          } catch (Exception e) {
            endDate = dayOfRetirement;
          }
          int difference = (int) startDate.until(endDate, ChronoUnit.DAYS) + 1;
          duration = duration + difference;
        }
        if (results == false) {
          throw new RuntimeException("Error - no resultset found for months of service");
        }

        double numYears = duration / 365.0;
        return (int) (numYears * 12);
      }
    }
  }

  @Override
  public void close() throws Exception {
    connection.close();
  }
}
