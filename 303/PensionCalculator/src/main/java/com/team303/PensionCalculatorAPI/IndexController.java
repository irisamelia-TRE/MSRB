package com.team303.PensionCalculatorAPI;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import java.sql.Connection;
import java.sql.*;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


@Controller
public class IndexController {
	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}
	
	
	
	/*
	//Initialize the employee table
	private static void createEmployeeTable() throws Exception {
		Connection c = openDatabaseConnection();
		Statement statement = c.createStatement();
		String sql = "CREATE TABLE EMPLOYEE " +
					"(SSN INT PRIMARY KEY	NOT NULL," +
					"FIRST_NAME 	TEXT	NOT NULL," +
					"LAST_NAME		TEXT	NOT NULL," +
					"PASSWORD		TEXT	NOT NULL," +	
					"DOB			DATE	NOT NULL," +
					"BENEFICIARY_DOB	DATE," +
					"VETERAN		BOOLEAN	NOT NULL)";
		statement.executeUpdate(sql);
		statement.close();
		c.close();
	}
	
	//Initialize the e table
	private static void createEmploymentTable() throws Exception {
		Connection c = openDatabaseConnection();
		Statement statement = c.createStatement();
		String sql = "CREATE TABLE EMPLOYEE " +
					"(SSN INT PRIMARY KEY	NOT NULL," +
					"START		 	TEXT	NOT NULL," +
					"END			TEXT	NOT NULL," +
					"Group			TEXT	NOT NULL," +	
					"SALARY			INT	NOT NULL)";
		statement.executeUpdate(sql);
		statement.close();
		c.close();
	}
	

		
	//Gets an employment with SSN 
		public static Employee getEmployee(String SSN, String password, Connection c) throws Exception {
			String sql = String.format("SELECT * FROM EMPLOYMENT WHERE ssn = '%s'");
			PreparedStatement pstatement = c.prepareStatement(sql);
			ResultSet rs = pstatement.executeQuery();
			String db_ssn = "";
			String first_name = "";
			String last_name = "";
			String db_password = "";
			Date db_dob = new Date();
			Date db_bdob = new Date();
			boolean db_isveteran = false;
			
			while (rs.next()) {
				db_ssn = rs.getString("ssn");
				first_name = rs.getString("first_name");
				last_name = rs.getString("last_name");
				db_password = rs.getString("password");
				db_dob = rs.getDate("dob");
				db_bdob = rs.getDate("beneficiary_dob");
				db_isveteran = rs.getBoolean("veteran");
			}
			if (db_ssn.equals("")) {
				return null;
			} else {
				return new Employee(last_name, first_name, db_ssn, db_dob, db_bdob, db_isveteran, db_password);
			}
			
		}

	
	
	private static boolean validateName(String name) {
		if (name.length() < 1) {
			return false;
		}
		boolean hasLetter = false;
		for (int i = 0; i < name.length(); i++) {
			if (Character.isLetter(name.charAt(i))) {
				hasLetter = true;
			}
		}
		return hasLetter;
	}
	
	private static boolean validateSSN(String SSN) {
		if (SSN.length() < 1) {
			return false;
		}
		boolean isAllZero = true;
		for (int i = 0; i < SSN.length(); i++) {
			if (SSN.charAt(i) != '0') {
				isAllZero = false;
			}
		}
		return !isAllZero;
		
	}
	
	
	//Create an employee
	public static void createEmployee(String lastName, String firstName, String password, String SSN, String birthdate, String beneficiaryBirthdate, boolean isVeteran, Connection c) throws Exception {
		   
		if (validateName(firstName) && validateName(lastName) && validateSSN(SSN)) {
		
		    String sql = String.format("INSERT INTO EMPLOYEE (SSN,FIRST_NAME,LAST_NAME,PASSWORD, DOB,BENEFICIARY_DOB,VETERAN)" 
		    							+ "VALUES ('%s', '%s','%s', '%s','%s','%s','%b')", SSN, firstName, lastName,password, birthdate, beneficiaryBirthdate, isVeteran);
		    PreparedStatement pstatement = c.prepareStatement(sql);
		    pstatement.executeUpdate();
		}
	}
	
	//validate that the employee exists
	public static boolean validateEmployee(String SSN, String password, Connection c) throws Exception {
		String sql = String.format("SELECT * FROM EMPLOYEE WHERE ssn = '%s' and password = '%s'", SSN, password);
		PreparedStatement pstatement = c.prepareStatement(sql);
		ResultSet rs = pstatement.executeQuery();
		String db_ssn = "";
		String first_name = "";
		String last_name = "";
		String db_password = "";
		Date db_dob = new Date();
		Date db_bdob = new Date();
		boolean db_isveteran = false;
		
		while (rs.next()) {
			db_ssn = rs.getString("ssn");
			first_name = rs.getString("first_name");
			last_name = rs.getString("last_name");
			db_password = rs.getString("password");
			db_dob = rs.getDate("dob");
			db_bdob = rs.getDate("beneficiary_dob");
			db_isveteran = rs.getBoolean("veteran");
		}
		if (db_ssn.equals("")) {
			return false;
		} else {
			return true;
		}
		
	}
	
	//delete an employee based on SSN and password
	public static void deleteEmployee(String SSN, String password, Connection c) throws Exception {
		String sql = String.format("DELETE from EMPLOYEE where ssn = '%s' and password = '%s'", SSN, password);
		PreparedStatement pstatement = c.prepareStatement(sql);
		pstatement.executeUpdate();
		
	}
	
	//update an employee's last name
	public static void updateEmployeeLastName(String SSN, String lastName, Connection c) throws Exception {
		String sql = String.format("UPDATE EMPLOYEE set last_name = '%s' where ssn = '%s'", lastName, SSN);
		PreparedStatement pstatement = c.prepareStatement(sql);
		pstatement.executeUpdate();
		
	}
	
	//update an employee's first name
	public static void updateEmployeeFirstName(String SSN, String firstName, Connection c) throws Exception {
		String sql = String.format("UPDATE EMPLOYEE set first_name = '%s' where ssn = '%s'", firstName, SSN);
		PreparedStatement pstatement = c.prepareStatement(sql);
		pstatement.executeUpdate();
		
	}
	
	//opens the database connection
	public static Connection openDatabaseConnection() throws Exception{
		Connection c = null;
		Class.forName("org.postgresql.Driver");
		c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/Calculator", "postgres", "password");
		return c;
	}
	
	@RequestMapping(value="/getEmployee")
	public Employee getEmployeeAPI(@RequestParam(value="SSN", defaultValue="World") String ssn, @RequestParam(value="password", defaultValue="password") String password) throws Exception{
		Connection c = openDatabaseConnection();
		return getEmployee(ssn, password, c);
	}
	
	//createEmployee(String lastName, String firstName, String password, String SSN, String birthdate, String beneficiaryBirthdate, boolean isVeteran, Connection c)
	@RequestMapping(value="/createEmployee")
	public void createEmployeeAPI(@RequestParam(value="SSN", defaultValue="World") String ssn, 
			@RequestParam(value="password", defaultValue="password") String password,
			@RequestParam(value="firstName") String firstName, 
			@RequestParam(value="lastName") String lastName, 
			@RequestParam(value="birthdate") String birthdate,
			@RequestParam(value="beneficiaryBirthdate") String beneficiaryBirthdate,
			@RequestParam(value="isVeteran") boolean isVeteran) throws Exception {
		Connection c = openDatabaseConnection();
		createEmployee(lastName, firstName, password, ssn, birthdate, beneficiaryBirthdate, isVeteran, c);
		
	}
	
	//validate an employee
	@RequestMapping(value="/validateEmployee")
	public boolean validateEmployeeAPI(@RequestParam(value="SSN", defaultValue="World") String ssn, 
			@RequestParam(value="password", defaultValue="password") String password) throws Exception {
		Connection c = openDatabaseConnection();
		return validateEmployee(ssn,password, c);
		
	}
	*/
}
