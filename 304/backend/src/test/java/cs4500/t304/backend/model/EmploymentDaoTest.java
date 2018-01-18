package cs4500.t304.backend.model;

import org.junit.Test;

import java.sql.SQLException;
import java.time.LocalDate;

import static org.junit.Assert.assertEquals;



public class EmploymentDaoTest {

  EmploymentDao theDB = EmploymentDao.getDao();

  //Test case for a continuous employment history that starts before 2012.
  @Test
  public void testCase1() {
    CalculatorInput c1 = theDB.createCalculatorInput("152-79-9476", LocalDate.of(2017, 11, 15));
    assertEquals(LocalDate.of(1967, 05, 05), c1.getDayOfBirth());
    assertEquals(true, c1.isBefore2012());
    assertEquals(4, c1.getGroupNumber());
    assertEquals(129735, c1.getSalaryAverage());
    assertEquals(false, c1.isMilitaryVeteran());
    assertEquals(330, c1.getMonthsOfService());
  }

  //Test case for an employment history that is broken up across many periods
  @Test
  public void testCase2() {
    CalculatorInput c2 = theDB.createCalculatorInput("241-82-7985", LocalDate.of(2017, 11, 15));
    assertEquals(LocalDate.of(1989, 9, 15), c2.getDayOfBirth());
    assertEquals(LocalDate.of(2017, 11, 15), c2.getDayOfRetirement());
    assertEquals(true, c2.isBefore2012());
    assertEquals(1, c2.getGroupNumber());
    assertEquals(48934, c2.getSalaryAverage());
    assertEquals(false, c2.isMilitaryVeteran());
    assertEquals(89, c2.getMonthsOfService());
  }

  //Test case for an employment history that begins after 2012
  @Test
  public void testCase3() {
    CalculatorInput c3 = theDB.createCalculatorInput("438-82-9840", LocalDate.of(2017, 11, 15));
    assertEquals(LocalDate.of(1987, 5, 24), c3.getDayOfBirth());
    assertEquals(LocalDate.of(2017, 11, 15), c3.getDayOfRetirement());
    assertEquals(false, c3.isBefore2012());
    assertEquals(1, c3.getGroupNumber());
    assertEquals(52000, c3.getSalaryAverage());
    assertEquals(false, c3.isMilitaryVeteran());
    assertEquals(37, c3.getMonthsOfService());
  }

  //Test case for an employee who is a veteran
  @Test
  public void testCase4() {
    CalculatorInput c4 = theDB.createCalculatorInput("447-52-5437", LocalDate.of(2017, 11, 15));
    assertEquals(LocalDate.of(1958, 5, 21), c4.getDayOfBirth());
    assertEquals(LocalDate.of(2017, 11, 15), c4.getDayOfRetirement());
    assertEquals(true, c4.isBefore2012());
    assertEquals(4, c4.getGroupNumber());
    assertEquals(95956, c4.getSalaryAverage());
    assertEquals(true, c4.isMilitaryVeteran());
    assertEquals(308, c4.getMonthsOfService());
  }


  //Exception testing

  @Test(expected = RuntimeException.class)
  public void testDOBException() throws Exception {
    theDB.getDayOfBirthData("123-45-6789");
  }

  @Test(expected = RuntimeException.class)
  public void testClassificationException() throws Exception {
    theDB.getClassificationData("123-45-6789");
  }

  @Test(expected = RuntimeException.class)
  public void testGroupException() throws Exception {
    theDB.getGroupNumberData("888-22-3333");
  }

  @Test(expected = RuntimeException.class)
  public void testSalaryException() throws Exception {
    theDB.getSalaryAverageData("888-22-3212", 9, LocalDate.now());
  }

  @Test(expected = SQLException.class)
  public void testMilitaryException() throws Exception {
    theDB.getMilitaryVeteranData("123-458-679");
  }

  @Test(expected = RuntimeException.class)
  public void testMOSException() throws Exception {
    theDB.getMonthOfServiceData("888-22-3212", LocalDate.of(2017, 10, 15));
  }


}
