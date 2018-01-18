package model;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Month;

import service.agefactor.GroupType;

/**
 * Tests for the {@link EmploymentCalcInfo} class.
 */
public class EmploymentCalcInfoTest {

  ObjectMapper objectMapper;
  EmploymentCalcInfo employmentCalcInfo1;
  EmploymentCalcInfo employmentCalcInfo2;

  @Before
  public void setUp() {
    objectMapper = new ObjectMapper();
    employmentCalcInfo1 = new EmploymentCalcInfo();
    employmentCalcInfo2 = new EmploymentCalcInfo();
  }

  @Test
  public void testDeserialize() throws IOException {
    String jsonString = "{\"startDate\":\"2000-01-04\",\"endDate\":\"2050-06-14\","
            + "\"groupNumber\":\"4\"}";

    EmploymentCalcInfo employmentCalcInfo =
            objectMapper.readValue(jsonString, EmploymentCalcInfo.class);

    Assert.assertEquals(employmentCalcInfo.getStartDate(), LocalDate.of(2000, Month.JANUARY, 4));
    Assert.assertEquals(employmentCalcInfo.getEndDate(), LocalDate.of(2050, Month.JUNE, 14));
    Assert.assertEquals(employmentCalcInfo.getGroupNumber(), GroupType.FOUR);
  }

  @Test
  public void testGetAndSetStartDate() {
    employmentCalcInfo1.setStartDate(LocalDate.of(2010, Month.APRIL, 12));
    Assert.assertEquals(LocalDate.of(2010, Month.APRIL, 12), employmentCalcInfo1.getStartDate());
  }

  @Test
  public void testGetAndSetEndDate() {
    employmentCalcInfo1.setEndDate(LocalDate.of(2040, Month.APRIL, 12));
    Assert.assertEquals(LocalDate.of(2040, Month.APRIL, 12), employmentCalcInfo1.getEndDate());
  }

  @Test
  public void testGetAndSetGroupNumber() {
    employmentCalcInfo1.setGroupNumber(GroupType.FOUR);
    Assert.assertEquals(GroupType.FOUR, employmentCalcInfo1.getGroupNumber());
  }

  @Test
  public void testEquals() {
    employmentCalcInfo1 = new EmploymentCalcInfo(LocalDate.of(2010, Month.APRIL, 12), LocalDate
            .of(2040, Month.APRIL, 12), GroupType.FOUR);
    employmentCalcInfo2 = new EmploymentCalcInfo(LocalDate.of(2010, Month.APRIL, 12), LocalDate
            .of(2040, Month.APRIL, 12), GroupType.FOUR);

    Assert.assertTrue(employmentCalcInfo1.equals(employmentCalcInfo2));

    employmentCalcInfo2.setGroupNumber(GroupType.TWO);
    Assert.assertFalse(employmentCalcInfo1.equals(employmentCalcInfo2));
    employmentCalcInfo2.setGroupNumber(GroupType.FOUR);

    employmentCalcInfo2.setStartDate(LocalDate.of(2000, 1, 12));
    Assert.assertFalse(employmentCalcInfo1.equals(employmentCalcInfo2));
    employmentCalcInfo2.setStartDate(LocalDate.of(2010, Month.APRIL, 12));

    employmentCalcInfo2.setEndDate(LocalDate.of(2000, 1, 12));
    Assert.assertFalse(employmentCalcInfo1.equals(employmentCalcInfo2));
    employmentCalcInfo2.setEndDate(LocalDate.of(2040, Month.APRIL, 12));

    employmentCalcInfo2 = null;
    Assert.assertFalse(employmentCalcInfo1.equals(employmentCalcInfo2));
    Assert.assertTrue(employmentCalcInfo1.equals(employmentCalcInfo1));

    Assert.assertFalse(employmentCalcInfo1.equals("Employment in disguise"));
  }

  @Test
  public void testHashCode() {
    employmentCalcInfo1 = new EmploymentCalcInfo(LocalDate.of(2010, Month.APRIL, 12), LocalDate
            .of(2040, Month.APRIL, 12), GroupType.FOUR);
    employmentCalcInfo2 = new EmploymentCalcInfo(LocalDate.of(2010, Month.APRIL, 12), LocalDate
            .of(2040, Month.APRIL, 12), GroupType.FOUR);

    Assert.assertEquals(employmentCalcInfo1.hashCode(), employmentCalcInfo2.hashCode());

    employmentCalcInfo2.setGroupNumber(GroupType.TWO);
    Assert.assertNotEquals(employmentCalcInfo1.hashCode(), employmentCalcInfo2.hashCode());
  }

  @Test
  public void testToString() {
    employmentCalcInfo1 = new EmploymentCalcInfo(LocalDate.of(2010, Month.APRIL, 12), LocalDate
            .of(2040, Month.APRIL, 12), GroupType.FOUR);

    Assert.assertEquals("EmploymentCalcInfo{startDate=2010-04-12, endDate=2040-04-12, "
            + "groupNumber=FOUR}", employmentCalcInfo1.toString());
  }
}
