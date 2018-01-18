package model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

import service.agefactor.GroupType;
import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.*;

@Entity
@Table(name="employment")
@JsonIgnoreProperties(value = {"salary"})
public class Employment {
    @Id
    @Column(name="id")
    private  int id;

    @JsonProperty("start_date")
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name="start_date")
    private LocalDate startDate;

    @JsonProperty("end_date")
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name="end_date")
    private LocalDate endDate;

    @JsonProperty("group_classification")
    @Column(name="group_classification")
    private GroupType groupType;


    @Column(name="salary")
    private int salary;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="employee_id", nullable = false)
    private Employee employee;

    /**
     * Empty constructor for database configuration
     */
    public Employment() {}

    /**
     *
     * @param id Id of an employment
     * @param startDate The date this employment started
     * @param endDate The date this employment ended
     * @param groupType The type of job this employment falls under
     * @param salary The amount of money made at this job
     */
    public Employment(int id, LocalDate startDate, LocalDate endDate, GroupType groupType, int salary) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.groupType = groupType;
        this.salary = salary;
    }

    /**
     * Grabs the ID of this employment
     * @return The ID of the employment
     */
    public int getId() {
        return id;
    }

    /**
     * Gets the SSN of the employee
     * @return The SSN of the employee
     */
    public int getSalary() {
        return salary;
    }

    /**
     * Sets the SSN of the employee
     * @param salary The new ssn of the employee
     */
    public void setSalary (int salary) {
        this.salary = salary;
    }

    /**
     * Grabs the start date of the employment
     * @return The start date of the employment
     */
    public LocalDate getStartDate() {
        return startDate;
    }

    /**
     * Sets the start date of employment.
     * @param startDate The start date of the employment
     */
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    /**
     * Grabs the end date of employment.
     * @return The end date of employment.
     */
    public LocalDate getEndDate() {
        return endDate;
    }

    /**
     * Sets the end date of employment.
     * @param endDate The end date of employment.
     */
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    /**
     * Grabs the group type of the employment
     * @return The group type of the employment
     */
    public GroupType getGroupType() {
        return groupType;
    }

    /**
     * Sets the group type of the employment
     * @param groupType The group type of employment
     */
    public void setGroupType(GroupType groupType) {
        this.groupType = groupType;
    }


    /**
     * Returns the number of months this Employment spanned. This value is inclusive with the start and end months.
     * @return A single integer month value
     */
    public int numberOfMonths() {
        return (12 * (this.endDate.getYear() - this.startDate.getYear()))
                + (this.endDate.getMonthValue() - this.startDate.getMonthValue())
                + 1;
    }

    /**
     * Determines if this Employments End Date occupies the same month as a given Employments Start-date
     * @param e The given Employment
     * @return True if end date of this Employment occupies same month as start date of given, false otherwise
     */
    public boolean sameMonthAs(Employment e) {
        return this.startDate.getMonthValue() + this.endDate.getYear()
                - e.getEndDate().getMonthValue() - e.getEndDate().getYear() == 0;
    }

    /**
     * Converts an Employment to a string
     * @return A string representation of an Employment
     */
    @Override
    public String toString() {
        String buildString= "";
        buildString += "id: " + Integer.toString(this.id);
        buildString += "\nStart Date: " + startDate.toString();
        buildString += "\nEnd Date: " + endDate.toString();
        buildString += "\nGroup Type: " + Integer.toString(this.groupType.getGroupNum());
        buildString += "\nsalary: " + Integer.toString(this.salary);

        return buildString;
    }

    /**
     * Checks if two Employments are equal
     * @param object The given object to check if its equal to this Employment
     * @return whether two Employments are equal
     */
    @Override
    public boolean equals(Object object) {
        if (object == null) {
            return false;
        }
        if (!Employment.class.isAssignableFrom(object.getClass())) {
            return false;
        }
        final Employment e = (Employment)object;
        return this.id == e.id && this.startDate.equals(e.startDate)
               && this.endDate.equals(e.endDate) && this.groupType == e.groupType
                && this.salary == e.salary;
    }

    /**
     *
     * @return Hash value for this Employment
     */
    @Override
    public int hashCode() {
        return Objects.hash(id, startDate, endDate, groupType, salary);
    }
}