package model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

import java.time.LocalDate;

import service.agefactor.GroupType;

/**
 * Class that holds information about Employments used in calculations that JSON will serialize to.
 */
public class EmploymentCalcInfo {
  @JsonProperty("startDate")
  @JsonDeserialize(using=LocalDateDeserializer.class)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private LocalDate startDate;

  @JsonProperty("endDate")
  @JsonDeserialize(using=LocalDateDeserializer.class)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private LocalDate endDate;

  @JsonProperty("groupNumber")
  private GroupType groupNumber;

  public EmploymentCalcInfo(){}

  public EmploymentCalcInfo(LocalDate startDate, LocalDate endDate, GroupType groupNumber) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.groupNumber = groupNumber;
  }

  /**
   * Gets the start date
   * @return
   */
  public LocalDate getStartDate() {
    return startDate;
  }

  /**
   * Sets the start date
   * @param startDate
   */
  public void setStartDate(LocalDate startDate) {
    this.startDate = startDate;
  }

  /**
   * Gets the end date
   * @return
   */
  public LocalDate getEndDate() {
    return endDate;
  }

  /**
   * Sets the end date
   * @param endDate
   */
  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }

  /**
   * Gets the group type
   * @return
   */
  public GroupType getGroupNumber() {
    return groupNumber;
  }

  /**
   * Sets the group type
   * @param groupNumber
   */
  public void setGroupNumber(GroupType groupNumber) {
    this.groupNumber = groupNumber;
  }

  /**
   * Converts this EmploymentCalcInfo to a String
   * @return A string representation of this EmploymentCalcInfo
   */
  @Override
  public String toString() {
    return "EmploymentCalcInfo{" +
            "startDate=" + startDate +
            ", endDate=" + endDate +
            ", groupNumber=" + groupNumber +
            '}';
  }

  /**
   * Determines whether two EmploymentCalcInfo are the same
   * @param o
   * @return
   */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    EmploymentCalcInfo that = (EmploymentCalcInfo) o;

    if (!startDate.equals(that.startDate)) return false;
    if (!endDate.equals(that.endDate)) return false;
    return groupNumber == that.groupNumber;

  }

  /**
   *
   * @return Hash value for this EmploymentCalcInfo
   */
  @Override
  public int hashCode() {
    int result = startDate.hashCode();
    result = 31 * result + endDate.hashCode();
    result = 31 * result + groupNumber.hashCode();
    return result;
  }
}
