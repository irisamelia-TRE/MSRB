package model;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import service.agefactor.GroupType;

/**
 * Tests for the {@link EmployeeCalcInfo} class.
 */
public class EmployeeCalcInfoTest {

  ObjectMapper objectMapper;
  EmployeeCalcInfo employeeCalcInfo1;
  EmployeeCalcInfo employeeCalcInfo2;

  List<EmploymentCalcInfo> emptyEmployments;
  List<EmploymentCalcInfo> employments1;
  List<EmploymentCalcInfo> employments2;

  @Before
  public void setUp() {
    objectMapper = new ObjectMapper();
    employeeCalcInfo1 = new EmployeeCalcInfo();
    employeeCalcInfo2 = new EmployeeCalcInfo();

    emptyEmployments = new ArrayList<>();

    employments1 = new ArrayList<>();
    employments1.add(new EmploymentCalcInfo(LocalDate.of(2010, Month.MAY, 10), LocalDate
            .of(2050, Month.DECEMBER, 10), GroupType.TWO));

    employments2 = new ArrayList<>();
    employments2.add(new EmploymentCalcInfo(LocalDate.of(2010, Month.MAY, 10), LocalDate
            .of(2050, Month.DECEMBER, 10), GroupType.TWO));
  }

  @Test
  public void testDeserialize() throws IOException {
    String jsonString = "{\"birthDate\":\"1990-10-20\",\"isVeteran\":\"false\","
            + "\"highestAverageSalary\":\"80000\",\"beneficiaryBirthDate\""
            + ":\"1995-05-20\",\"employments\":[{\"startDate\":\"2010-05-10\",\"endDate\":\""
            + "2050-12-10\",\"groupNumber\":\"2\"}]}";

    EmployeeCalcInfo employeeCalcInfo = objectMapper.readValue(jsonString, EmployeeCalcInfo.class);

    Assert.assertEquals(LocalDate.of(1990, Month.OCTOBER, 20), employeeCalcInfo.getBirthDate());
    Assert.assertEquals(false, employeeCalcInfo.isVeteran());
    Assert.assertEquals(80000, employeeCalcInfo.getHighestAverageSalary());
    Assert.assertEquals(LocalDate.of(1995, Month.MAY, 20), employeeCalcInfo.getBeneficiaryBirthDate());

    List<EmploymentCalcInfo> expectedEmployments = new ArrayList<>();
    expectedEmployments.add(new EmploymentCalcInfo(LocalDate.of(2010, Month.MAY, 10), LocalDate
            .of(2050, Month.DECEMBER, 10), GroupType.TWO));

    Assert.assertEquals(expectedEmployments, employeeCalcInfo.getEmployments());
  }

  @Test
  public void testGetAndSetBirthDate() {
    employeeCalcInfo1.setBirthDate(LocalDate.of(1990, Month.OCTOBER, 20));
    Assert.assertEquals(LocalDate.of(1990, Month.OCTOBER, 20), employeeCalcInfo1.getBirthDate());
  }

  @Test
  public void testGetAndSetRetirementDate() {
    employeeCalcInfo1.setBirthDate(LocalDate.of(2040, Month.MAY, 10));
    Assert.assertEquals(LocalDate.of(2040, Month.MAY, 10), employeeCalcInfo1.getBirthDate());
  }

  @Test
  public void testGetAndSetVeteran() {
    employeeCalcInfo1.setVeteran(true);
    Assert.assertTrue(employeeCalcInfo1.isVeteran());
  }

  @Test
  public void testGetAndSetHighestAverageSalary() {
    employeeCalcInfo1.setHighestAverageSalary(100000);
    Assert.assertEquals(100000, employeeCalcInfo1.getHighestAverageSalary());
  }

  @Test
  public void testGetAndSetBeneficiaryBirthDate() {
    employeeCalcInfo1.setBeneficiaryBirthDate(LocalDate.of(1993, Month.OCTOBER, 20));
    Assert.assertEquals(LocalDate.of(1993, Month.OCTOBER, 20),
            employeeCalcInfo1.getBeneficiaryBirthDate());
  }

  @Test
  public void testGetAndSetEmployments() {
    employeeCalcInfo1.setEmployments(employments1);
    Assert.assertEquals(employments1, employeeCalcInfo1.getEmployments());
  }

  @Test
  public void testEquals() {
    employeeCalcInfo1 = new EmployeeCalcInfo(LocalDate.of(1992, Month.APRIL, 20), false, 75000,
            null, employments1);
    employeeCalcInfo2 = new EmployeeCalcInfo(LocalDate.of(1992, Month.APRIL, 20), false, 75000,
            null, employments2);
    Assert.assertEquals(employeeCalcInfo1, employeeCalcInfo1);

    Assert.assertTrue(employeeCalcInfo1.equals(employeeCalcInfo2));
    Assert.assertFalse(employeeCalcInfo1.equals(null));
    Assert.assertFalse(employeeCalcInfo1.equals("I'm a String"));

    employeeCalcInfo2.setVeteran(true);
    Assert.assertFalse(employeeCalcInfo1.equals(employeeCalcInfo2));
    employeeCalcInfo2.setVeteran(false);

    employeeCalcInfo2.setHighestAverageSalary(80000);
    Assert.assertFalse(employeeCalcInfo1.equals(employeeCalcInfo2));
    employeeCalcInfo2.setHighestAverageSalary(75000);

    employeeCalcInfo2.setBirthDate(LocalDate.of(1998, Month.AUGUST, 29));
    Assert.assertFalse(employeeCalcInfo1.equals(employeeCalcInfo2));
    employeeCalcInfo2.setBirthDate(LocalDate.of(1992, Month.APRIL, 20));

    employeeCalcInfo2.setBeneficiaryBirthDate(LocalDate.of(1970, 5, 12));
    Assert.assertFalse(employeeCalcInfo1.equals(employeeCalcInfo2));
    employeeCalcInfo1.setBeneficiaryBirthDate(LocalDate.of(1970, 5, 12));
    Assert.assertTrue(employeeCalcInfo1.equals(employeeCalcInfo2));

    employeeCalcInfo2.setEmployments(emptyEmployments);
    Assert.assertFalse(employeeCalcInfo1.equals(employeeCalcInfo2));
  }

  @Test
  public void testNonNullDifferentDatesEquals() {
    employeeCalcInfo1 = new EmployeeCalcInfo(LocalDate.of(1992, Month.APRIL, 20), false, 75000,
            (LocalDate.of(1989, 3, 4)), employments1);
    employeeCalcInfo2 = new EmployeeCalcInfo(LocalDate.of(1992, Month.APRIL, 20), false, 75000,
            LocalDate.of(1990, 5, 17), employments2);

    Assert.assertFalse(employeeCalcInfo1.equals(employeeCalcInfo2));
    employeeCalcInfo1.setBeneficiaryBirthDate(LocalDate.of(1990, 5, 17));
    Assert.assertTrue(employeeCalcInfo1.equals(employeeCalcInfo2));
  }

  @Test
  public void testHashCode() {
    employeeCalcInfo1 = new EmployeeCalcInfo(LocalDate.of(1992, Month.APRIL, 20), false, 75000, null, employments1);
    employeeCalcInfo2 = new EmployeeCalcInfo(LocalDate.of(1992, Month.APRIL, 20), false, 75000, null, employments2);

    Assert.assertEquals(employeeCalcInfo1.hashCode(), employeeCalcInfo2.hashCode());
    employeeCalcInfo2.setVeteran(true);
    Assert.assertNotEquals(employeeCalcInfo1.hashCode(), employeeCalcInfo2.hashCode());
    employeeCalcInfo2.setVeteran(false);

    employeeCalcInfo2.setBeneficiaryBirthDate(LocalDate.of(1980, 8, 16));
    Assert.assertNotEquals(employeeCalcInfo1.hashCode(), employeeCalcInfo2.hashCode());
    employeeCalcInfo2.setBeneficiaryBirthDate(null);

    employeeCalcInfo2.setEmployments(emptyEmployments);
    Assert.assertNotEquals(employeeCalcInfo1.hashCode(), employeeCalcInfo2.hashCode());

  }

  @Test
  public void testToString() {
    employeeCalcInfo1 = new EmployeeCalcInfo(LocalDate.of(1992, Month.APRIL, 20), false, 75000, null, employments1);
    Assert.assertEquals("EmployeeCalcInfo{birthDate=1992-04-20, "
            + "isVeteran=false, highestAverageSalary=75000, beneficiaryBirthDate=null, "
            + "employments=[EmploymentCalcInfo{startDate=2010-05-10, endDate=2050-12-10, "
            + "groupNumber=TWO}]}", employeeCalcInfo1.toString());
  }

}
