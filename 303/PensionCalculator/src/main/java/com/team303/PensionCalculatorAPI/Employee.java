package com.team303.PensionCalculatorAPI;

import java.text.SimpleDateFormat;
import java.util.Date;

/*
 * * Create class diagrams
* Create java classes corresponding to classes in diagrams
* Set up java persistence library or other ORM solution
* Map data elements in created classes to database using chosen ORM solution.
 */
public class Employee {
	
	
	private String lastName;
	private String firstName;
	private String SSN;
	private Date birthdate;
	private Date beneficiaryBirthdate;
	private boolean isVeteran;
	private String password;
	
	public Employee(String lastName, String firstName, String SSN, 
					Date birthdate, Date beneficiaryBirthdate, 
					boolean isVeteran, String password) {
		this.lastName = lastName;
		this.firstName = firstName;
		this.SSN = SSN;
		this.birthdate = birthdate;
		this.beneficiaryBirthdate = beneficiaryBirthdate;
		this.isVeteran = isVeteran;
		this.password=password;
	}
	
	public Employee () {
		
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getSSN() {
		return SSN;
	}

	public void setSSN(String sSN) {
		SSN = sSN;
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		if (birthdate == null) {
			this.birthdate = null;
		} else {
			this.birthdate = birthdate;
		}
	}

	public Date getBeneficiaryBirthdate() {
		return beneficiaryBirthdate;
	}

	public void setBeneficiaryBirthdate(Date beneficiaryBirthdate) {
		if (beneficiaryBirthdate == null) {
			this.beneficiaryBirthdate = null;
		} else {
			this.beneficiaryBirthdate = beneficiaryBirthdate;
		}
	}

	public boolean isVeteran() {
		return isVeteran;
	}

	public void setVeteran(boolean isVeteran) {
		this.isVeteran = isVeteran;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}

