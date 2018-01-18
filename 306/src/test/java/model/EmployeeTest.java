package model;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import service.agefactor.GroupType;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class EmployeeTest {
    private Employee testEmployee;
    private LocalDate testDate1;
    private LocalDate testDate2;
    private Employment testEmployment1;
    private List<Employment> testEmployments;

    @Before
    public void setUp() {
        testDate1 = LocalDate.of(2013, 11, 21);
        testDate2 = LocalDate.of(2014, 5, 8);
        testEmployment1 = new Employment(1879, testDate1,testDate2, GroupType.TWO, 500000);
        testEmployments = new ArrayList<>();
        testEmployments.add(testEmployment1);

        testEmployee = new Employee(1879, "Haley", "Krosnin", "123-45-6789", testDate1, testDate2,
                false, testEmployments);
    }

    @Test
    public void testGetId() {
        Assert.assertEquals(testEmployee.getId(), 1879);
    }


    @Test
    public void testGetFirstName() {
        Assert.assertEquals(testEmployee.getFirstName(), "Haley");
    }

    @Test
    public void testGetLastName() {
        Assert.assertEquals(testEmployee.getLastName(), "Krosnin");
    }

    @Test
    public void testGetSsn() {
        Assert.assertEquals(testEmployee.getSsn(), "123-45-6789");
    }

    @Test
    public void testGetDOB() {
        LocalDate testDOB = LocalDate.of(2013, 11, 21);
        Assert.assertEquals(testEmployee.getDateOfBirth(), testDOB);
    }

    @Test
    public void testGetBDOB() {
        LocalDate testBDOB = LocalDate.of(2014, 5, 8);
        Assert.assertEquals(testEmployee.getBeneficiaryDateOfBirth(), testBDOB);
    }

    @Test
    public void testIsVeteran() {
        Assert.assertEquals(testEmployee.isVeteran(), false);
    }

    @Test
    public void testSetFirstName() {
        testEmployee.setFirstName("Harry");
        Assert.assertEquals(testEmployee.getFirstName(), "Harry");
    }

    @Test
    public void testSetLastName() {
        testEmployee.setLastName("Smith");
        Assert.assertEquals(testEmployee.getLastName(), "Smith");
    }

    @Test
    public void testSetSsn() {
        testEmployee.setSsn("435-23-2345");
        Assert.assertEquals(testEmployee.getSsn(), "435-23-2345");
    }

    @Test
    public void testSetDOB() {
        LocalDate testDOB = LocalDate.of(117, 11, 21);
        testEmployee.setDateOfBirth(testDOB);
        Assert.assertEquals(testEmployee.getDateOfBirth(), testDOB);
    }

    @Test
    public void testSetBDOB() {
        LocalDate testBDOB = LocalDate.of(117, 11, 21);
        testEmployee.setBeneficiaryDateOfBirth(testBDOB);
        Assert.assertEquals(testEmployee.getBeneficiaryDateOfBirth(), testBDOB);
    }

    @Test
    public void testSetIsVeteran() {
        testEmployee.setVeteran(true);
        Assert.assertEquals(testEmployee.isVeteran(), true);
    }

    @Test
    public void testGetEmployments() {
        System.out.println(testEmployee.getListOfEmployment());
        Assert.assertEquals(testEmployee.getListOfEmployment().get(0).toString(), testEmployment1.toString());
    }

    @Test
    public void testSetEmployments() {
        List<Employment> emptyEmployments = new ArrayList<>();
        testEmployee.setListOfEmployment(emptyEmployments);
        Assert.assertEquals(testEmployee.getListOfEmployment().toString(), "[]");
    }

    @Test
    public void testEquals() {
        List<Employment> employments = new ArrayList<>();
        Employment employment1 = new Employment(1879, testDate1,testDate2, GroupType.TWO, 500000);
        employments.add(employment1);
        Assert.assertEquals(testEmployee, (new Employee(1879,"Haley","Krosnin","123-45-6789",testDate1,testDate2,
                false, employments)));
        Assert.assertFalse(testEmployee.equals((new Employee(1879,"WRONG","Krosnin","123-45-6789",testDate1,testDate2,
                false, employments))));
        Assert.assertFalse(testEmployee.equals((new Employee(1879,"Haley","WRONG","123-45-6789",testDate1,testDate2,
                false, employments))));
        Assert.assertFalse(testEmployee.equals((new Employee(1879,"Haley","Krosnin","WRONG",testDate1,testDate2,
                false, employments))));
        Assert.assertFalse(testEmployee.equals((new Employee(1879,"Haley","Krosnin","123-45-6789",testDate2,testDate2,
                false, employments))));
        Assert.assertFalse(testEmployee.equals((new Employee(1,"Haley","Krosnin","123-45-6789",testDate1,testDate2,
                false, employments))));
        Assert.assertFalse(testEmployee.equals((new Employee(1879,"Haley","Krosnin","123-45-6789",testDate1,testDate2,
                true, employments))));
        Assert.assertFalse(testEmployee.equals((new Employee(1879,"Haley","Krosnin","123-45-6789",testDate1,testDate2,
                false, new ArrayList<Employment>()))));


    }

    @Test
    public void testNoEqual() {
        Assert.assertEquals(testEmployee.equals(null), false);
    }

    @Test
    public void testNoEqual1() {
        List<Employment> employments = new ArrayList<>();
        Employment employment1 = new Employment(1879, testDate1,testDate2, GroupType.TWO, 500010);
        employments.add(employment1);
        Assert.assertEquals(testEmployee.equals((new Employee(1879,"Haley","Krosnin","123-45-6789",
                testDate1,testDate2, false, employments))), false);
    }

    @Test
    public void testNullEmployee() {
        Employee nullEmployee = null;
        Assert.assertFalse(testEmployee.equals(nullEmployee));
    }

    @Test
    public void testIncorrectObjectTypeEquals() {
        Assert.assertFalse(testEmployee.equals("Totally an Employee"));
    }

    @Test
    public void testToString() {
        Assert.assertEquals(testEmployee.toString(), "id: 1879\n" +
                "first name: Haley\n" +
                "last name: Krosnin\n" +
                "ssn: 123-45-6789\n" +
                "dob: 2013-11-21\n" +
                "beneficiary dob: 2014-05-08\n" +
                "veteran false\n" +
                "employments id: 1879\n" +
                "Start Date: 2013-11-21\n" +
                "End Date: 2014-05-08\n" +
                "Group Type: 2\n" +
                "salary: 500000");
        testEmployee.setBeneficiaryDateOfBirth(null);
        Assert.assertEquals(testEmployee.toString(), "id: 1879\n" +
                "first name: Haley\n" +
                "last name: Krosnin\n" +
                "ssn: 123-45-6789\n" +
                "dob: 2013-11-21\n" +
                "veteran false\n" +
                "employments id: 1879\n" +
                "Start Date: 2013-11-21\n" +
                "End Date: 2014-05-08\n" +
                "Group Type: 2\n" +
                "salary: 500000");
    }

    @Test
    public void testhashCode() {
        List<Employment> employments = new ArrayList<>();
        Employment employment1 = new Employment(1879, testDate1,testDate2, GroupType.TWO, 500000);
        employments.add(employment1);
        Employee e = new Employee(1879,"Haley","Krosnin","123-45-6789",
                testDate1,testDate2, false, employments);
        Assert.assertEquals(testEmployee.hashCode(), e.hashCode());
    }

    @Test //Tests if a constructed object for employee orders its employments.
    public void testNewEmployeeOrderedEmployments() {
        Employment testEmployment2;
        LocalDate testDate3 = LocalDate.of(1990, 4, 2);
        testEmployment2 = new Employment(1879, testDate3, testDate1, GroupType.TWO, 500000);
        testEmployments.add(testEmployment2);

        Employee testConstructor = new Employee(1879, "Testicus", "McTest", "123-45-6770", testDate1, testDate2,
                false, testEmployments);
        Assert.assertEquals(testConstructor.getListOfEmployment().get(0).getStartDate().toString(), "1990-04-02");
    }

    @Test //Test if a setting employments is properly re-ordering the set list
    public void testSetEmploymentsOrdered() {
        Employment testEmployment2;
        LocalDate testDate3 = LocalDate.of(1990, 4, 2);
        testEmployment2 = new Employment(1879, testDate3, testDate1, GroupType.TWO, 500000);
        testEmployments.add(testEmployment2);

        testEmployee.setListOfEmployment(testEmployments);
        Assert.assertEquals(testEmployee.getListOfEmployment().get(0).getStartDate().toString(), "1990-04-02");
    }

    @Test
    public void highestConsecutivePayBasicFunctionality() {
        Assert.assertEquals(testEmployee.highestConsecutivePay(1), 500000, .01);
        Assert.assertEquals(testEmployee.highestConsecutivePay(5), 500000, .01);

    }

    @Test
    public void highestConsecutivePayChangingAverages() {
        Employment testEmployment2 = new Employment(1879, testDate2,
                                                    LocalDate.of(2016, 3, 8), GroupType.TWO, 1000000);
        testEmployments.add(testEmployment2);
        testEmployee.setListOfEmployment(testEmployments);

        Assert.assertEquals(testEmployee.highestConsecutivePay(7), 1000000, .01);
        testEmployment2.setStartDate(LocalDate.of(2014, 7, 18));
        testEmployment2.setEndDate(LocalDate.of(2014, 8, 19));
        Assert.assertEquals(testEmployee.highestConsecutivePay(3), 833333.33, .01);
    }

    @Test
    public void highestConsecutivePayOverlappingJobs() {
        Employment testEmployment2 = new Employment(1879, testDate2,
                LocalDate.of(2016, 3, 8), GroupType.TWO, 1000000);
        testEmployments.add(testEmployment2);
        testEmployee.setListOfEmployment(testEmployments);

        testEmployment2.setStartDate(LocalDate.of(2014, 5, 18));
        testEmployment2.setEndDate(LocalDate.of(2014, 7, 19));
        Assert.assertEquals(testEmployee.highestConsecutivePay(8), 687500.00, .01);
        testEmployment2.setSalary(100000);
        Assert.assertEquals(testEmployee.highestConsecutivePay(8), 450000.00, .01);
    }


    @Test (expected = IllegalArgumentException.class)
    public void highestConsectivePayNegativeInputException() {
        testEmployee.highestConsecutivePay(-1);
    }

    @Test (expected = IllegalArgumentException.class)
    public void highestConsectivePayZeroInputException() {
        testEmployee.highestConsecutivePay(0);
    }

    @Test (expected = IllegalArgumentException.class)
    public void highestConsectivePayLargeInputException() {
        testEmployee.highestConsecutivePay(8);
    }

    @Test
    public void testPrepareToSerialize() {
        //After 2012 check
        Assert.assertEquals(testEmployee.getHighestPay(), 0, .01);
        testEmployee.prepareToSerialize();
        Assert.assertEquals(testEmployee.getHighestPay(), 500000.0, .01);

        //Before 2012 check
        Employment earlyStartEmploy = new Employment(1879, LocalDate.of(1990, 5, 1),
                (LocalDate.of(1996, 6, 2)), GroupType.TWO, 500000);
        List<Employment> earlyStartEmployList = new ArrayList<>();
        earlyStartEmployList.add(earlyStartEmploy);
        testEmployee.setListOfEmployment(earlyStartEmployList);
        testEmployee.prepareToSerialize();
        Assert.assertEquals(testEmployee.getHighestPay(), 500000.0, .01);

        testEmployee.setListOfEmployment(new ArrayList<>());
        testEmployee.prepareToSerialize();
        Assert.assertEquals(testEmployee.getListOfEmployment(), new ArrayList<>());
    }
}