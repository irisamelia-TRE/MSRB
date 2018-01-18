package service.calculatePension;

import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;
import java.util.ArrayList;

import model.EmployeeCalcInfo;
import model.EmploymentCalcInfo;
import service.agefactor.AgeFactorService;
import service.agefactor.GroupType;
import service.agefactor.IAgeFactorService;
import service.optionc.IOptionCService;
import service.optionc.OptionCService;

import static org.junit.Assert.*;

/**
 * Tests for CalculatePensionService.
 */
public class CalculatePensionServiceTest {
  CalculatePensionService calculatePensionService;
  IAgeFactorService ageFactorService;
  IOptionCService optionCService;

  @Before
  public void setUp() {
    calculatePensionService = new CalculatePensionService();
    ageFactorService = new AgeFactorService();
    optionCService = new OptionCService();
    calculatePensionService.setAgeFactorService(ageFactorService);
    calculatePensionService.setOptionCService(optionCService);
  }

  @Test
  public void testRetGuideExampleOne() {
    EmploymentCalcInfo emp1 = new EmploymentCalcInfo(LocalDate.of(2000, 7, 1),
            LocalDate.of(2016, 1, 1), GroupType.ONE);
    ArrayList<EmploymentCalcInfo> employmentList = new ArrayList<>();
    employmentList.add(emp1);

    EmployeeCalcInfo employee = new EmployeeCalcInfo(LocalDate.of(1961, 1, 1), false, 50000,
            LocalDate.of(1961, 1, 1), employmentList);

    PensionResult pr = calculatePensionService.calculatePension(employee);

    assertEquals(pr.getOptionAAllowance(), 11625.0, .1);
    assertEquals(pr.getOptionBAllowance(), 11392.5, .1);
    assertEquals(pr.getOptionCAllowance(), 10864.725, .1);
  }

  @Test
  public void testRetGuideExampleTwo() {
    EmploymentCalcInfo emp1 = new EmploymentCalcInfo(LocalDate.of(2014, 1, 1),
            LocalDate.of(2029, 7, 1), GroupType.ONE);
    ArrayList<EmploymentCalcInfo> employmentList = new ArrayList<>();
    employmentList.add(emp1);

    EmployeeCalcInfo employee = new EmployeeCalcInfo(LocalDate.of(1969, 7, 1), false, 50000, null,
            employmentList);

    PensionResult pr = calculatePensionService.calculatePension(employee);

    assertEquals(pr.getOptionAAllowance(), 11237.50, .01);
    assertEquals(pr.getOptionBAllowance(), 10900.38, .01);
  }

  @Test
  public void testRetGuideExampleThree() {
    EmploymentCalcInfo emp1 = new EmploymentCalcInfo(LocalDate.of(2000, 1, 1),
            LocalDate.of(2010, 1, 1), GroupType.TWO);
    EmploymentCalcInfo emp2 = new EmploymentCalcInfo(LocalDate.of(2010, 1, 1),
            LocalDate.of(2030, 1, 1), GroupType.ONE);

    ArrayList<EmploymentCalcInfo> employmentList = new ArrayList<>();
    employmentList.add(emp1);
    employmentList.add(emp2);

    EmployeeCalcInfo employee = new EmployeeCalcInfo(LocalDate.of(1970, 1, 1), true, 50000, null,
            employmentList);

    PensionResult pr = calculatePensionService.calculatePension(employee);

    assertEquals(pr.getOptionAAllowance(), 32800.0, .01);
    assertEquals(pr.getOptionBAllowance(), 31816.0, .01);
  }

  @Test
  public void testGroup2() {
    EmploymentCalcInfo emp1 = new EmploymentCalcInfo(LocalDate.of(1998, 7, 1),
            LocalDate.of(2016, 1, 1), GroupType.TWO);
    ArrayList<EmploymentCalcInfo> employmentList = new ArrayList<>();
    employmentList.add(emp1);
    EmployeeCalcInfo employee = new EmployeeCalcInfo(LocalDate.of(1940, 4, 23), false, 100000,
            null, employmentList);

    PensionResult pr = calculatePensionService.calculatePension(employee);
    assertEquals(pr.getOptionAAllowance(), 43750.0, .01);
    assertEquals(pr.getOptionBAllowance(), 41562.5, .01);
  }

  @Test
  public void testGroup4() {
    EmploymentCalcInfo emp1 = new EmploymentCalcInfo(LocalDate.of(2000, 7, 1),
            LocalDate.of(2016, 1, 1), GroupType.FOUR);
    ArrayList<EmploymentCalcInfo> employmentList = new ArrayList<>();
    employmentList.add(emp1);

    EmployeeCalcInfo employee = new EmployeeCalcInfo(LocalDate.of(1950, 3, 12), false, 90000,
            LocalDate.of(1910, 1, 1), employmentList);

    PensionResult pr = calculatePensionService.calculatePension(employee);
    assertEquals(pr.getOptionAAllowance(), 34875.0, .1);
    assertEquals(pr.getOptionBAllowance(), 33480.0, .1);
    assertEquals(pr.getOptionCAllowance(), 33905.475, .1);
  }


  @Test
  public void testVeteran() {
    EmploymentCalcInfo emp1 = new EmploymentCalcInfo(LocalDate.of(2000, 7, 1),
            LocalDate.of(2016, 1, 1), GroupType.FOUR);

    ArrayList<EmploymentCalcInfo> employmentList = new ArrayList<>();
    employmentList.add(emp1);

    EmployeeCalcInfo employee = new EmployeeCalcInfo(LocalDate.of(1950, 3, 12),
            true, 90000, LocalDate.of(1970, 1, 1), employmentList);

    PensionResult pr = calculatePensionService.calculatePension(employee);
    assertEquals(pr.getOptionAAllowance(), 35115.0, .1);
    assertEquals(pr.getOptionBAllowance(), 33710.4, .1);
    assertEquals(pr.getOptionCAllowance(), 28464.219, .1);
  }

  @Test
  public void testAutoExtendUntilRetirement() {
    EmploymentCalcInfo emp1 = new EmploymentCalcInfo(LocalDate.of(2000, 7, 1),
            LocalDate.of(2016, 1, 1), GroupType.ONE);
    ArrayList<EmploymentCalcInfo> employmentList = new ArrayList<>();
    employmentList.add(emp1);

    EmployeeCalcInfo employee = new EmployeeCalcInfo(LocalDate.of(1961, 1, 1),
            false, 50000, null, employmentList);

    PensionResult pr = calculatePensionService.calculatePension(employee);

    assertEquals(pr.getOptionAAllowance(), 11625.0, .1);
    assertEquals(pr.getOptionBAllowance(), 11392.5, .1);
  }

}