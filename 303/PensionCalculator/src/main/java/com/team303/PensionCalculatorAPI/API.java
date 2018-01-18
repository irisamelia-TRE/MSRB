package com.team303.PensionCalculatorAPI;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import com.team303.PensionCalculatorAPI.Employment.GroupClassification;
import java.sql.Connection;
import java.sql.*;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class API {
	
	//creating database connection
	public static Connection openDatabaseConnection() throws Exception{
		Connection c = null;
		Class.forName("org.postgresql.Driver");
		c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/calculator", "postgres", "password");
		return c;
	}
	
	
	//EMPLOYEE METHODS
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
	
	public static void createEmployee(String lastName, String firstName, String password, int SSN, Date birthdate, Date beneficiaryBirthdate, boolean isVeteran, Connection c) throws Exception {
		   
		if (validateName(firstName) && validateName(lastName) && validateSSN(Integer.toString(SSN))) {
		
		    String sql = "INSERT INTO EMPLOYEE (SSN,FIRST_NAME,LAST_NAME,PASSWORD, DOB,BENEFICIARY_DOB,VETERAN) VALUES (?,?,?,?,?,?,?)";
		    PreparedStatement pstatement = c.prepareStatement(sql);
		    pstatement.setInt(1,  SSN);
		    pstatement.setString(2, firstName);
		    pstatement.setString(3, lastName);
		    pstatement.setString(4, password);
		    pstatement.setDate(5, new java.sql.Date(birthdate.getTime()));
		    pstatement.setDate(6, new java.sql.Date(beneficiaryBirthdate.getTime()));
		    pstatement.setBoolean(7, isVeteran);
		    pstatement.executeUpdate();
		}
	}
	
	public static Employee getEmployee(int SSN, String password, Connection c) throws Exception {
		String sql = "SELECT * FROM EMPLOYEE WHERE ssn = ? and password = ?";
		PreparedStatement pstatement = c.prepareStatement(sql);
		pstatement.setInt(1,SSN);
		pstatement.setString(2, password);
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
	
	public static boolean EmployeeExists(int SSN, String password, Connection c) throws Exception {
		String sql = "SELECT * FROM EMPLOYEE WHERE ssn = ? and password = ?";
		PreparedStatement pstatement = c.prepareStatement(sql);
		pstatement.setInt(1,SSN);
		pstatement.setString(2, password);
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
	
	//String lastName, String firstName, String password, int SSN, String birthdate, String beneficiaryBirthdate, boolean isVeteran, Connection c
	public static void deleteEmployee(int SSN, String password, Connection c) throws Exception {
		String sql = "DELETE from EMPLOYEE where ssn = ? and password = ?";
		PreparedStatement pstatement = c.prepareStatement(sql);
		pstatement.setInt(1, SSN);
		pstatement.setString(2, password);
		pstatement.executeUpdate();
		
	}
	
	public static void updateEmployeeFirstName(int SSN, String firstName, Connection c) throws Exception {
		String sql = "UPDATE EMPLOYEE set first_name = ? where ssn = ?";
		PreparedStatement pstatement = c.prepareStatement(sql);
		pstatement.setString(1, firstName);
		pstatement.setInt(2,  SSN);
		pstatement.executeUpdate();
		
	}
	
	public static void updateEmployeeLastName(int SSN, String lastName, Connection c) throws Exception {
		String sql = "UPDATE EMPLOYEE set last_name = ? where ssn = ?";
		PreparedStatement pstatement = c.prepareStatement(sql);
		pstatement.setString(1, lastName);
		pstatement.setInt(2,  SSN);
		pstatement.executeUpdate();
		
	}
	//String lastName, String firstName, String password, int SSN, String birthdate, String beneficiaryBirthdate, boolean isVeteran, Connection c
	@RequestMapping(value="/createEmployee")
	public void createEmployeeAPI(@RequestParam(value="SSN") int ssn,
								@RequestParam(value="password") String password,
								@RequestParam(value="firstname") String firstname,
								@RequestParam(value="lastname") String lastname,
								@RequestParam(value="birthdate") String birthdate,
								@RequestParam(value="beneficiaryBirthdate") String beneficiaryBirthdate,
								@RequestParam(value="isveteran") boolean isVeteran) throws Exception {
		Connection c = openDatabaseConnection();
		Date parsedBirthDate = new SimpleDateFormat("dd/MM/yyyy").parse(birthdate);
		Date parsedBeneficiaryBirthDate = new SimpleDateFormat("dd/MM/yyyy").parse(beneficiaryBirthdate);
		createEmployee(lastname, firstname, password, ssn, parsedBirthDate, parsedBeneficiaryBirthDate, isVeteran, c);
	}
	@RequestMapping(value="/getEmployee")
	public Employee validateEmployeeAPI(@RequestParam(value="SSN", defaultValue="World") int ssn, 
					@RequestParam(value="password", defaultValue="password") String password) throws Exception {
		Connection c = openDatabaseConnection();
		return getEmployee(ssn,password, c);
		
	}
	
	@RequestMapping(value="/deleteEmployee")
	public void deleteEmployeeAPI(@RequestParam(value="SSN", defaultValue="World") int ssn, 
			@RequestParam(value="password", defaultValue="password") String password) throws Exception {
		Connection c = openDatabaseConnection();
		deleteEmployee(ssn,password, c);

	}
	
	@RequestMapping(value="/updateEmployeeFirstName")
	public void updateEmployeeFirstNameAPI(@RequestParam(value="SSN", defaultValue="1") int ssn,
				@RequestParam(value="firstname") String firstName) throws Exception {
		Connection c = openDatabaseConnection();
		updateEmployeeFirstName(ssn, firstName, c);
	}
	
	@RequestMapping(value="/updateEmployeeLastName")
	public void updateEmployeeLastNameAPI(@RequestParam(value="SSN", defaultValue="1") int ssn,
				@RequestParam(value="lastname") String lastName) throws Exception {
		Connection c = openDatabaseConnection();
		updateEmployeeLastName(ssn, lastName, c);
	}
	
	//EMPLOYMENT METHODS
	
	public static void createEmployment(int SSN, Date startDate, Date endDate, String groupNo, int salary, Connection c) throws Exception {
		if (validateSSN(Integer.toString(SSN))) {
		
		    String sql = "INSERT INTO EMPLOYMENT (SSN,START_DATE ,END_DATE,GROUP_NO, SALARY) VALUES (?,?,?,?,?)";
		    PreparedStatement pstatement = c.prepareStatement(sql);
		    pstatement.setInt(1,  SSN);
		    pstatement.setDate(2, new java.sql.Date(startDate.getTime()));
		    pstatement.setDate(3, new java.sql.Date(endDate.getTime()));
		    pstatement.setString(4, groupNo);
		    pstatement.setInt(5, salary);
		    pstatement.executeUpdate();
		}
	}
		
		
	public static Employment getEmployment(int SSN, Connection c) throws Exception {
		String sql = "SELECT * FROM EMPLOYMENT WHERE ssn = ?";
		PreparedStatement pstatement = c.prepareStatement(sql);
		pstatement.setInt(1,SSN);
		ResultSet rs = pstatement.executeQuery();
		String db_ssn = "";
		Date db_start = new Date();
		Date db_end = new Date();
		String db_groupno = "";
		int salary = 0;
		
		while (rs.next()) {
			db_ssn = rs.getString("ssn");
			db_start = rs.getDate("start_date");
			db_end = rs.getDate("end_date");
			db_groupno = rs.getString("group_no");
			salary = rs.getInt("salary");
		}
		if (db_ssn.equals("")) {
			return null;
		} else {
			return new Employment(db_ssn, db_start, db_end, Employment.groupClassificationFromString(db_groupno), salary);
		}
	}
	
	public static void deleteEmployment(int SSN, Connection c) throws Exception {
		String sql = "DELETE from EMPLOYMENT where ssn = ?";
		PreparedStatement pstatement = c.prepareStatement(sql);
		pstatement.setInt(1, SSN);
		pstatement.executeUpdate();
		
	}
	
	@RequestMapping(value="/getEmployment")
	public Employment getEmploymentAPI(@RequestParam(value="SSN", defaultValue="1") int ssn) throws Exception {
		Connection c = openDatabaseConnection();
		return getEmployment(ssn, c);
	}
	

	
	@RequestMapping(value="/createEmployment")
	public void createEmploymentAPI(@RequestParam(value="SSN") int ssn,
								@RequestParam(value="startdate") String startdate,
								@RequestParam(value="enddate") String enddate,
								@RequestParam(value="salary") int salary,
								@RequestParam(value="groupno") String groupno) throws Exception {
		Connection c = openDatabaseConnection();
		Date parsedStartDate = new SimpleDateFormat("dd/MM/yyyy").parse(startdate);
		Date parsedEndDate = new SimpleDateFormat("dd/MM/yyyy").parse(enddate);
		createEmployment(ssn, parsedStartDate, parsedEndDate, groupno, salary, c);
	}
	
	@RequestMapping(value="/deleteEmployment")
	public void deleteEmploymentAPI(@RequestParam(value="SSN") int ssn) throws Exception {
		Connection c = openDatabaseConnection();
		deleteEmployment(ssn, c);
	}
		
		
	
		
	
}
