
package com.team303.PensionCalculatorAPI;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.boot.jackson.JsonObjectSerializer;
import org.springframework.stereotype.Component;
import org.springframework.boot.jackson.*;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;

public class Employment {
	public enum GroupClassification {
		ONE, TWO, THREE, FOUR
	}
	public static GroupClassification groupClassificationFromString(String val) {
		int intFromStr = Integer.parseInt(val);
		switch (intFromStr) {
		case 1:
			return GroupClassification.ONE;
		case 2:
			return GroupClassification.TWO;
		case 3:
			return GroupClassification.THREE;
		case 4:
			return GroupClassification.FOUR;
		default:
			throw new IllegalArgumentException("Unexpected group classification " + intFromStr);
		}
	}
	
	private String SSN;
	private Date startDate;
	private Date endDate;
	private GroupClassification groupClassification;
	private int salary;
	
	public static class EmploymentSerializer extends JsonObjectSerializer<Employment> {
		@Override
		protected void serializeObject(Employment value, JsonGenerator jgen, SerializerProvider provider)
				throws IOException {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			jgen.writeStringField("SSN", value.SSN);
			jgen.writeStringField("startDate", dateFormat.format(value.startDate));
			jgen.writeStringField("endDate", dateFormat.format(value.endDate));
			jgen.writeNumberField("groupClassification", value.groupClassification.ordinal() + 1);
			jgen.writeNumberField("salary", value.salary);
		}
	}
	
	public Employment(String SSN, Date startDate, Date endDate, 
			GroupClassification groupClassification, int salary) {
		this.SSN = SSN;
		this.endDate = endDate;
		this.startDate = startDate;
		this.groupClassification = groupClassification;
		this.salary = salary;
	}
	
	public String getSSN() {
		return SSN;
	}

	public void setSSN(String sSN) {
		SSN = sSN;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public GroupClassification getGroupClassification() {
		return groupClassification;
	}

	public void setGroupClassification(GroupClassification groupClassification) {
		this.groupClassification = groupClassification;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	public Employment() {}
					
	
}
