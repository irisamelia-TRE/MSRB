package model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

import java.time.LocalDate;
import java.util.List;

/**
 * Class that holds information about Employees used in calculations that JSON will serialize to.
 */
public class EmployeeCalcInfo {

  @JsonProperty("birthDate")
  @JsonDeserialize(using = LocalDateDeserializer.class)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private LocalDate birthDate;

  @JsonProperty("isVeteran")
  private boolean isVeteran;

  @JsonProperty("highestAverageSalary")
  private int highestAverageSalary;

  @JsonProperty("beneficiaryBirthDate")
  @JsonDeserialize(using = LocalDateDeserializer.class)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private LocalDate beneficiaryBirthDate;

  @JsonProperty("employments")
  private List<EmploymentCalcInfo> employments;

  public EmployeeCalcInfo(){}

  public EmployeeCalcInfo(LocalDate birthDate, boolean isVeteran,
                          int highestAverageSalary, LocalDate beneficiaryBirthDate,
                          List<EmploymentCalcInfo> employments) {
    this.birthDate = birthDate;
    this.isVeteran = isVeteran;
    this.highestAverageSalary = highestAverageSalary;
    this.beneficiaryBirthDate = beneficiaryBirthDate;
    this.employments = employments;
  }

  /**
   * Gets the birthdate for this employee.
   * @return The birhtdate of this employee.
   */
  public LocalDate getBirthDate() {
    return birthDate;
  }

  /**
   * Sets the birthdate for this employee.
   * @param birthDate
   */
  public void setBirthDate(LocalDate birthDate) {
    this.birthDate = birthDate;
  }

  /**
   * Checks if this employee is a veteran.
   * @return
   */
  public boolean isVeteran() {
    return isVeteran;
  }

  /**
   * Sets the veteran status of this employee.
   * @param veteranStatus
   */
  public void setVeteran(boolean veteranStatus) {
    this.isVeteran = veteranStatus;
  }

  /**
   * Gets the highest average salary of this Employee.
   * @return
   */
  public int getHighestAverageSalary() {
    return highestAverageSalary;
  }

  /**
   * Sets the highest average salary of this employee.
   * @param highestAverageSalary
   */
  public void setHighestAverageSalary(int highestAverageSalary) {
    this.highestAverageSalary = highestAverageSalary;
  }

  /**
   * Get the beneficiary birth date
   * @return
   */
  public LocalDate getBeneficiaryBirthDate() {
    return beneficiaryBirthDate;
  }

  /**
   * Set the beneficiary birth date
   * @param beneficiaryBirthDate
   */
  public void setBeneficiaryBirthDate(LocalDate beneficiaryBirthDate) {
    this.beneficiaryBirthDate = beneficiaryBirthDate;
  }

  public List<EmploymentCalcInfo> getEmployments() {
    return employments;
  }

  public void setEmployments(List<EmploymentCalcInfo> employments) {
    this.employments = employments;
  }

  /**
   * Converts an EmployeeCalcInfo to a string
   * @return
   */
  @Override
  public String toString() {
    return "EmployeeCalcInfo{" +
            "birthDate=" + birthDate +
            ", isVeteran=" + isVeteran +
            ", highestAverageSalary=" + highestAverageSalary +
            ", beneficiaryBirthDate=" + beneficiaryBirthDate +
            ", employments=" + employments +
            '}';
  }

  /**
   * Check whether the given Object is equal to this EmployeeCalcInfo
   * @param o The given object
   * @return Whether the given object is equal to this EmployeeCalcInfo
   */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    EmployeeCalcInfo that = (EmployeeCalcInfo) o;

    if (isVeteran != that.isVeteran) return false;
    if (highestAverageSalary != that.highestAverageSalary) return false;
    if (!birthDate.equals(that.birthDate)) return false;
    if (beneficiaryBirthDate != null ? !beneficiaryBirthDate.equals(that.beneficiaryBirthDate) : that.beneficiaryBirthDate != null)
      return false;
    return employments.equals(that.employments);

  }

  /**
   *
   * @return the hash value for this EmployeeCalcInfo
   */
  @Override
  public int hashCode() {
    int result = birthDate.hashCode();
    result = 31 * result + (isVeteran ? 1 : 0);
    result = 31 * result + highestAverageSalary;
    result = 31 * result + (beneficiaryBirthDate != null ? beneficiaryBirthDate.hashCode() : 0);
    result = 31 * result + employments.hashCode();
    return result;
  }
}
