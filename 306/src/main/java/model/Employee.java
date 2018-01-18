package model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

import service.agefactor.GroupType;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Represents Employee entity in database.
 */
import javax.persistence.*;
@JsonIgnoreProperties(value = {"id", "ssn"})
@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @Column(name = "id")
    private int id;

    @JsonProperty("first_name")
    @Column(name = "first_name")
    private String firstName;

    @JsonProperty("last_name")
    @Column(name = "last_name")
    private String lastName;

    @Column(name = "ssn")
    private String ssn;

    @Column(name = "dob")
    @JsonProperty("dob")
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @Column(name = "beneficiary")
    @JsonProperty("beneficiary_dob")
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate beneficiaryDateOfBirth;

    @JsonProperty("veteran_status")
    @Column(name = "us_veteran")
    private boolean isVeteran;

    @Transient
    @JsonProperty("highest_pay")
    private double highestPay;


    @JsonProperty("list_of_employment")
    @OneToMany(mappedBy="employee", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Employment> listOfEmployment;

    /**
     * Empty Constructor for database configuration
     */
    public Employee() {}

    /**
     *
     * @param id the ID of the employee
     * @param firstName the first name of the employee
     * @param lastName the last name of the employee
     * @param ssn the social security number of the employee
     * @param dateOfBirth the date of birth of the employee
     * @param beneficiaryDateOfBirth the beneficiary date of birth
     * @param isVeteran whether this employee is a veteran or not
     * @param listOfEmployment the list of employments this employee has had
     */
    public Employee(int id, String firstName, String lastName, String ssn, LocalDate dateOfBirth,
                    LocalDate beneficiaryDateOfBirth, boolean isVeteran, List<Employment> listOfEmployment) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.ssn = ssn;
        this.dateOfBirth = dateOfBirth;
        this.beneficiaryDateOfBirth = beneficiaryDateOfBirth;
        this.isVeteran = isVeteran;
        this.listOfEmployment = listOfEmployment;
        orderEmployment();
    }


    /**
     * Grabs the first name of the employee
     * @return The first name of the employee
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the first name of the employee
     * @param firstName The new first name being given to the employee
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Grabs the last name of the employee
     * @return The last name of the employee
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets the last name of the employee
     * @param lastName The new last name of the employee
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Gets the SSN of the employee
     * @return The SSN of the employee
     */
    public String getSsn() {
        return ssn;
    }

    /**
     * Sets the SSN of the employee
     * @param ssn The new SSN of the Employee
     */
    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    /**
     * Grabs the date of birth of the employee
     * @return The date of birth of the employee
     */
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    /**
     * Sets the date of the birth of the Employee
     * @param dateOfBirth The new date of birth of the employee
     */
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    /**
     * Grabs the employee's beneficiary's date of the birth
     * @return The date of birth of the employee's beneficiary
     */
    public LocalDate getBeneficiaryDateOfBirth() {
        return beneficiaryDateOfBirth;
    }

    /**
     * Sets the beneficiary's date of birth
     * @param beneficiaryDateOfBirth The beneficiary's new date of birth
     */
    public void setBeneficiaryDateOfBirth(LocalDate beneficiaryDateOfBirth) {
        this.beneficiaryDateOfBirth = beneficiaryDateOfBirth;
    }

    /**
     * Determines if the employee is a veteran or not.
     * @return A boolean representing if the employee is a veteran or not.
     */
    public boolean isVeteran() {
        return isVeteran;
    }

    /**
     * Sets the status of the employee as a veteran or not.
     * @param veteran A boolean value that determines if the employee is a veteran or not.
     */
    public void setVeteran(boolean veteran) {
        isVeteran = veteran;
    }

    /**
     * Grabs a list of the employees employment history
     * @return List of employment history
     */
    public List<Employment> getListOfEmployment() {
        Employment tempEmployment;
        List<Employment> shallowCopy = new ArrayList<>();

        for(Employment e : listOfEmployment) {
            tempEmployment = new Employment(e.getId(), e.getStartDate(), e.getEndDate(),
                    GroupType.getTypeFromNum(e.getGroupType().getGroupNum()), e.getSalary());
            shallowCopy.add(tempEmployment);
        }
        return shallowCopy;
    }

    /**
     * Sets the employee's employment history
     * @param listOfEmployment The new employment history of the employee
     */
    public void setListOfEmployment(List<Employment> listOfEmployment) {
        this.listOfEmployment = listOfEmployment;
        orderEmployment();
    }

    /**
     * Grabs the employee's id
     * @return The employee's id
     */
    public int getId() {
        return id;
    }

    /**
     * Grabs the highestPay of the employee
     * @return Returns the highestPay of the employee
     */
    public double getHighestPay() {
        return highestPay;
    }

    /**
     * Converts an Employee object to a string
     * @return String representation of an Employee
     */
    @Override
    public String toString() {
        String buildString= "";
        buildString += "id: " + Integer.toString(this.id);
        buildString += "\nfirst name: " + this.firstName;
        buildString += "\nlast name: " + this.lastName;
        buildString += "\nssn: " + this.ssn;
        buildString += "\ndob: " + dateOfBirth.toString();
        if(beneficiaryDateOfBirth != null) {
            buildString += "\nbeneficiary dob: " + beneficiaryDateOfBirth.toString();
        }
        buildString += "\nveteran " + isVeteran;
        buildString += "\nemployments " + listOfEmployment.stream().map(Object::toString)
                .collect(Collectors.joining(", "));;


        return buildString;
    }

    /**
     * Checks if two Employees are equal to each other
     * @param object Object that you are comparing this Employee to
     * @return Boolean determines if two Employees are equal
     */
    @Override
    public boolean equals(Object object) {
        if (object == null) {
            return false;
        }
        if (!Employee.class.isAssignableFrom(object.getClass())) {
            return false;
        }
        final Employee e = (Employee)object;
        return this.id == e.id && this.firstName.equals(e.firstName) && this.lastName.equals(e.lastName) &&
                this.ssn.equals(e.ssn) && this.dateOfBirth.equals(e.dateOfBirth)
                 && this.isVeteran == e.isVeteran && this.getListOfEmployment().equals(e.getListOfEmployment());
    }

    /**
     *
     * @return An integer representing the Hashcode of an Employee
     */
    @Override
    public int hashCode() {
        return Objects.hash(firstName, lastName, ssn, dateOfBirth, beneficiaryDateOfBirth, isVeteran, listOfEmployment);
    }

    /**
     * Orders the employment history of the employee by start dates. This function should be called whenever the list
     * of employees is mutated or when the instance of the Employee is initialized.
     */
    private void orderEmployment() {
        listOfEmployment.sort(new Comparator<Employment>() {
            @Override
            public int compare(Employment o1, Employment o2) {
                return o1.getStartDate().compareTo(o2.getStartDate());
            }
        });
    }

    /**
     * Prepares the employee to be serialized by sorting the list of employments by start date and
     * populating the highestPay field.
     */
    public void prepareToSerialize() {
        orderEmployment();
        if(!this.listOfEmployment.isEmpty()) {
            Employment firstEmployment = this.listOfEmployment.get(0);
            LocalDate startDate = firstEmployment.getStartDate();
            if (startDate.isBefore(LocalDate.of(2012, 4, 2))) {
                this.highestPay = highestConsecutivePay(3);
            }
            else {
                this.highestPay = highestConsecutivePay(5);
            }
        }
    }

    /**
     * Determines the highest amount average salary an employee has been payed over the specified span of months.
     * @param numberOfMonths The number of months being tested
     * @return A salary average for the specified time frame
     * @throws IllegalArgumentException if numberOfMonths is either negative, zero, or larger than total number of months worked
     */
    public double highestConsecutivePay(int numberOfMonths) throws IllegalArgumentException {
        ArrayList<Integer> salaryList = createSalaryList();
        if(numberOfMonths <= 0 || numberOfMonths > salaryList.size()) {
            throw new IllegalArgumentException("numberOfMonths is either negative, zero, or too large.");
        }

        double workingAverage = 0;
        double highestAverage = 0;

        //Iterates through the array of salaries with a scanning window
        for(int i = 0; i < salaryList.size() - numberOfMonths + 1; i++) {
            for(int j = i; j < i + numberOfMonths; j++) {
                workingAverage += salaryList.get(j);
            }
            //Logic for determining if a window of salaries has the highest average so far or not.
            workingAverage = workingAverage / numberOfMonths;
            if(workingAverage > highestAverage) {
                highestAverage = workingAverage;
            }
            workingAverage = 0; //Resets the workingAverage back to zero.
        }

        return highestAverage;
    }

    /**
     * Creates an arraylist of per-month salaries that the employee has been earning over their entire career
     * @return A list of salaries
     */
    private ArrayList<Integer> createSalaryList() {
        ArrayList<Integer> salaryList = new ArrayList<>();
        Employment previousEmployment = null;
        boolean swapped = false;

        for(Employment e : listOfEmployment) {
            //Checks if there is overlap between two jobs, and if there is takes the higher salary.
            if(previousEmployment != null && e.sameMonthAs(previousEmployment)) {
                swapped = true; //Boolean flag letting us know that we'll end up with one more entry than desired
                if(salaryList.get(salaryList.size() - 1) < e.getSalary()) {
                    salaryList.set(salaryList.size() - 1, e.getSalary());
                }
            }
            //Adds the salaries of the employment to the arrayList
            for(int i = 0; i < e.numberOfMonths(); i++) {
                salaryList.add(e.getSalary());
            }
            //Corrects the size of the salaryList according to value of swapped
            if(swapped){
                salaryList.remove(salaryList.size() - 1);
                swapped = false;
            }
            previousEmployment = e; //Saves the current Employment for next iteration.
        }
        return salaryList;
    }
}