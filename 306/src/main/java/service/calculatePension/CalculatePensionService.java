package service.calculatePension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import model.EmployeeCalcInfo;
import model.EmploymentCalcInfo;
import service.agefactor.IAgeFactorService;
import service.optionc.IOptionCService;

/**
 * {@inheritDoc}
 */
@Service
public class CalculatePensionService implements ICalculatePensionService {

  @Autowired
  private IAgeFactorService ageFactorService;

  @Autowired
  private IOptionCService optionCService;

  @Override
  public PensionResult calculatePension(EmployeeCalcInfo employee) {
    List<EmploymentCalcInfo> employments = new ArrayList<>(employee.getEmployments());
    Comparator<EmploymentCalcInfo> comparator = (EmploymentCalcInfo e1, EmploymentCalcInfo e2) -> e1.getStartDate().compareTo(e2.getStartDate());

    LocalDate enteredService = Collections.min(employments, comparator).getStartDate();
    EmploymentCalcInfo lastEmployment = Collections.max(employments, comparator);
    LocalDate retirementDate = lastEmployment.getEndDate();

    int age = Period.between(employee.getBirthDate(), retirementDate).getYears();

    double optionAAllowance = 0;
    double totalYearsOfService = 0;

    for (EmploymentCalcInfo employment : employments) {
      Period employmentPeriod = Period.between(employment.getStartDate(), employment.getEndDate());
      double yearsOfService = employmentPeriod.getYears() + (employmentPeriod.getMonths() / 12.0);
      totalYearsOfService += yearsOfService;

      double ageFactor = ageFactorService.getAgeFactor(employment.getGroupNumber(), age,
              enteredService, retirementDate) / 100.0;
      optionAAllowance = optionAAllowance + ageFactor * employee.getHighestAverageSalary() * yearsOfService;
    }

    //Veteran bonus cannot exceed 300 dollars a year.
    double veteranBonus = (employee.isVeteran()) ? Math.min(300, ((Math.ceil(totalYearsOfService) * 15))) : 0;
    optionAAllowance += veteranBonus;

    //linear interpolation between 1 and 5 percent for ages 50 - 70, maxed out at 5%.
    double optionBAgePercentage = Math.min(20, age - 50) / 20.0 * 4 + 1;
    double optionBAllowance = optionAAllowance * (1 - optionBAgePercentage / 100.0);


    LocalDate maybeNullBeneficiaryBirthDate = employee.getBeneficiaryBirthDate();

    double optionCAllowance = 0.0;

    if (maybeNullBeneficiaryBirthDate != null) {
      int beneficiaryAge = Period.between(maybeNullBeneficiaryBirthDate, retirementDate).getYears();
      optionCAllowance = optionCService.calculateOptionCFactor(age, beneficiaryAge) * optionAAllowance;
    }

    return new PensionResult(optionAAllowance, optionBAllowance, optionCAllowance);
  }

  public void setAgeFactorService(IAgeFactorService service) {
    this.ageFactorService = service;
  }
  public void setOptionCService(IOptionCService service) { this.optionCService = service; }
}
