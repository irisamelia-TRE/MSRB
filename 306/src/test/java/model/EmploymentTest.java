package model;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import service.agefactor.GroupType;

import java.time.LocalDate;

/**
 * Test class for the Employment java class.
 */
public class EmploymentTest {
    private Employment testEmployment;

    @Before
    public void setUp() {
        testEmployment = new Employment(1895, LocalDate.of(1998, 4, 24),
                LocalDate.of(2001, 3, 12), GroupType.TWO, 50000);
    }

    @Test
    public void testGetId() {
        Assert.assertEquals(testEmployment.getId(), 1895);
    }


    @Test
    public void testGetStartDate() {
        LocalDate testStartDate = LocalDate.of(1998, 4, 24);
        Assert.assertEquals(testEmployment.getStartDate(), testStartDate);
    }

    @Test
    public void testGetEndDate() {
        LocalDate testEndDate = LocalDate.of(2001, 3, 12);
        Assert.assertEquals(testEmployment.getEndDate(), testEndDate);
    }

    @Test
    public void testGetGroupType() {
        Assert.assertEquals(testEmployment.getGroupType().getGroupNum(), 2);
    }


    @Test
    public void testSetStartDate() {
        LocalDate newTestStartDate = LocalDate.of(103, 5,23);
        testEmployment.setStartDate(newTestStartDate);
        Assert.assertEquals(testEmployment.getStartDate(), newTestStartDate);
    }

    @Test
    public void testSetEndDate() {
        LocalDate newTestEndDate = LocalDate.of(103, 5,23);
        testEmployment.setEndDate(newTestEndDate);
        Assert.assertEquals(testEmployment.getEndDate(), newTestEndDate);
    }

    @Test
    public void testSetGroupTypeDate() {
        testEmployment.setGroupType(GroupType.FOUR);
        Assert.assertEquals(testEmployment.getGroupType().getGroupNum(), 4);
    }

    @Test
    public void testToString() {
        Assert.assertEquals(testEmployment.toString(), "id: 1895\nStart Date: 1998-04-24\nEnd Date:" +
                " 2001-03-12\nGroup Type: 2\nsalary: 50000");
    }

    @Test
    public void testEquals() {
        Employment employ = new Employment(1895, LocalDate.of(1998, 4, 24),
                LocalDate.of(2001, 3, 12), GroupType.TWO, 50000);
        Employment differentIDEmploy = new Employment(2000, LocalDate.of(1998, 4, 24),
                LocalDate.of(2001, 3, 12), GroupType.TWO, 50000);

        Assert.assertFalse(employ.equals(differentIDEmploy));
        Assert.assertFalse(testEmployment.equals(null));
        Assert.assertFalse(testEmployment.equals("I'm not an Employment"));

        Assert.assertTrue(employ.equals(testEmployment));
        Assert.assertFalse(testEmployment.equals(null));
        Assert.assertTrue(testEmployment.equals(testEmployment));

        employ.setStartDate(LocalDate.of(1997, 3, 15));
        Assert.assertFalse(testEmployment.equals(employ));
        employ.setStartDate(LocalDate.of(1998, 4, 24));

        employ.setEndDate(LocalDate.of(2000, 3, 15));
        Assert.assertFalse(testEmployment.equals(employ));
        employ.setEndDate(LocalDate.of(2001, 3, 12));

        employ.setSalary(17800);
        Assert.assertFalse(testEmployment.equals(employ));
        employ.setSalary(50000);

        employ.setGroupType(GroupType.ONE);
        Assert.assertFalse(testEmployment.equals(employ));
        employ.setGroupType(GroupType.TWO);

    }

    @Test
    public void testHashCode() {
        Assert.assertEquals(testEmployment.hashCode(), new Employment(1895, LocalDate.of(1998, 4, 24),
                LocalDate.of(2001, 3, 12), GroupType.TWO, 50000).hashCode());
    }

    @Test
    public void testNumberOfMonths() {
        Assert.assertEquals(testEmployment.numberOfMonths(), 36);
    }

    @Test
    public void testSmallNumberOfMonths() {
        testEmployment.setStartDate(LocalDate.of(2016, 3, 3));
        testEmployment.setEndDate(LocalDate.of(2016, 4, 4));
        Assert.assertEquals(testEmployment.numberOfMonths(), 2);
    }

    @Test
    public void testSingleDateNumberOfMonths() {
        testEmployment.setStartDate(LocalDate.of(2016, 4, 3));
        testEmployment.setEndDate(LocalDate.of(2016, 4, 7));
        Assert.assertEquals(testEmployment.numberOfMonths(), 1);
    }

    @Test
    public void testSameMonthAs() {
        testEmployment.setStartDate(LocalDate.of(2016, 4, 3));
        testEmployment.setEndDate(LocalDate.of(2016, 4, 7));

        Employment testEmployment2 = new Employment(1895, LocalDate.of(1998, 4, 24),
                LocalDate.of(2001, 3, 12), GroupType.TWO, 70500);

        Assert.assertTrue(testEmployment.sameMonthAs(testEmployment));
        Assert.assertFalse(testEmployment.sameMonthAs(testEmployment2));

        testEmployment2.setStartDate(LocalDate.of(2016, 4, 13));
        testEmployment2.setEndDate(LocalDate.of(2029, 6, 1));
        Assert.assertTrue(testEmployment.sameMonthAs(testEmployment));
    }
}
