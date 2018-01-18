package cs4500.t304.backend.model;

import com.google.common.collect.ImmutableList;
import com.google.common.io.Resources;

import au.com.bytecode.opencsv.CSVReader;

import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Map;

import cs4500.t304.backend.model.CalculatorResult.Benefit;
import cs4500.t304.backend.model.CalculatorResult.RetirementOption;
import jdk.nashorn.api.scripting.URLReader;

/**
 * A grouping of rules for calculation. Responsible for the business logic of calculating the output
 * of the calculator ({@link CalculatorResult}) given its input ({@link CalculatorInput})
 */
public abstract class Ruleset {

  private static final double MAX_PORTION_OF_SALARY = 0.8d;
  private static final double MAX_VETERAN_BENEFIT = 300d;
  private static final double VETERAN_BENEFIT_EARNED_PER_YEAR = 15d;

  private static final double OPTION_B_ZERO_REDUCTION_AGE = 45d;
  private static final double OPTION_B_PER_YEAR_REDUCTION = 0.002d;

  private static final double OPTION_C_SURVIVOR_BENEFIT_FACTOR = 2d / 3d;
  private static final Map<Integer, Map<Integer, Double>> OPTION_C_FACTOR = new HashMap<>();

  static {
    try {
      CSVReader reader = new CSVReader(new URLReader(Resources.getResource("option-c-factor.tsv")), '\t');
      String[] header = reader.readNext();
      assert("Age".equals(header[0]));
      int[] beneficiaryAges = new int[header.length];
      for (int i = 1; i < header.length; i++) {
        beneficiaryAges[i] = Integer.parseInt(header[i]);
      }

      String[] line;
      while ((line = reader.readNext()) != null) {
        int memberAge = Integer.parseInt(line[0]);
        HashMap<Integer, Double> thisAge = new HashMap<>();
        OPTION_C_FACTOR.put(memberAge, thisAge);
        for (int i = 1; i < header.length; i++) {
          thisAge.put(beneficiaryAges[i], Double.parseDouble(line[i]));
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  /**
   * Calculate the age factor, i.e. one of the key modifiers in the retirement amount estimation.
   */
  protected abstract double ageFactor(CalculatorInput input);

  /**
   * Is this ruleset applicable to the given input? Rulesets can vary in applicability on, for
   * example, the start date.
   */
  protected abstract boolean isApplicableRuleset(CalculatorInput input);

  /**
   * Calculate the age at retirement, using the "age at last birthday" standard
   * @param dob date of birth
   * @param dor date of retirement
   */
  public static int floorAgeAtRetirement(LocalDate dob, LocalDate dor) {
    return (int) ChronoUnit.YEARS.between(dob, dor);
  }

  /**
   * Calculate the age at retirement, using the "age at closest birthday to retirement" standard
   * @param dob date of birth
   * @param dor date of retirement
   */
  public static int roundAgeAtRetirement(LocalDate dob, LocalDate dor) {
    int floorYears = (int) ChronoUnit.YEARS.between(dob, dor);
    LocalDate beforeBirthday = dob.plusYears(floorYears);
    LocalDate afterBirthday = beforeBirthday.plusYears(1);

    if (ChronoUnit.DAYS.between(beforeBirthday, dor) > ChronoUnit.DAYS.between(dor, afterBirthday)) {
      return floorYears + 1;
    } else {
      return floorYears;
    }
  }

  protected static int floorRetireeAge(CalculatorInput input) {
    return floorAgeAtRetirement(input.getDayOfBirth(), input.getDayOfRetirement());
  }

  protected static int roundRetireeAge(CalculatorInput input) {
    return roundAgeAtRetirement(input.getDayOfBirth(), input.getDayOfRetirement());
  }

  protected static int roundBeneficiaryAge(CalculatorInput input) {
    if (!input.getBeneficiaryDoB().isPresent()) {
      throw new InputMismatchException("Beneficiary date of birth not present");
    }
    return roundAgeAtRetirement(input.getBeneficiaryDoB().get(), input.getDayOfRetirement());
  }

  /**
   * Calculate a factor such that option B allowance = (option A allowance) * (option B factor)
   */
  protected static double optionBFactor(CalculatorInput input) {
    double extraAge = Math.max(0d, floorRetireeAge(input) - OPTION_B_ZERO_REDUCTION_AGE);
    return 1d - (extraAge * OPTION_B_PER_YEAR_REDUCTION);
  }

  /**
   * Calculate a factor such that option C allowance = (option A allowance) * (option C factor)
   */
  protected static double optionCFactor(CalculatorInput input) {
    int minRetireeAge = Collections.min(OPTION_C_FACTOR.keySet());
    int maxRetireeAge = Collections.max(OPTION_C_FACTOR.keySet());
    int minBeneficiaryAge = Collections.min(OPTION_C_FACTOR.get(minRetireeAge).keySet());
    int maxBeneficiaryAge = Collections.max(OPTION_C_FACTOR.get(maxRetireeAge).keySet());

    int beneficiaryAge = Math.min(Math.max(roundBeneficiaryAge(input), minBeneficiaryAge), maxBeneficiaryAge);
    int retireeAge = Math.min(Math.max(roundRetireeAge(input), minRetireeAge), maxRetireeAge);

    return OPTION_C_FACTOR.get(retireeAge).get(beneficiaryAge);
  }

  /**
   * Calculates the list of retirement options a retiree has
   *
   * @param input         the relevant input
   * @param fullAllowance the calculated maximum annual value
   * @return list of options for the retiree to choose among
   */
  protected List<RetirementOption> getRetirementOptions(CalculatorInput input, double fullAllowance) {
    RetirementOption optionA = new RetirementOption("Option A",
                                                    ImmutableList.of(new Benefit("Annual Allowance", (int) Math.round(fullAllowance)),
                                                                     new Benefit("Monthly Allowance", (int) Math.round(fullAllowance / 12d))));

    double optionBAllowance = fullAllowance * optionBFactor(input);
    RetirementOption optionB = new RetirementOption("Option B",
                                                    ImmutableList.of(new Benefit("Annual Allowance", (int) Math.round(optionBAllowance)),
                                                                     new Benefit("Monthly Allowance", (int) Math.round(optionBAllowance / 12d)),
                                                                     new Benefit("Beneficiary Annual Allowance", "Balance of Annuity Reserve Account, if any")));
    List<RetirementOption> options = new ArrayList<>();
    options.add(optionA);
    options.add(optionB);
    if (input.getBeneficiaryDoB().isPresent()) {
      double optionCAllowance = fullAllowance * optionCFactor(input);
      double optionCBeneficiaryAllowance = optionCAllowance * OPTION_C_SURVIVOR_BENEFIT_FACTOR;
      options.add(new RetirementOption("Option C",
                                                      ImmutableList
                                                          .of(new Benefit("Annual Allowance", (int) Math.round(optionCAllowance)),
                                                              new Benefit("Monthly Allowance", (int) Math.round(optionCAllowance / 12d)),
                                                              new Benefit("Beneficiary Annual Allowance", (int) Math.round(optionCBeneficiaryAllowance)),
                                                              new Benefit("Beneficiary Monthly Allowance", (int) Math.round(optionCBeneficiaryAllowance / 12d)))));
    }
    return options;
  }

  /**
   * Calculate the amount and options for retirement, given that this ruleset is the correct one.
   */
  public CalculatorResult calculateBenefits(CalculatorInput input) {
    double ageFactor = ageFactor(input);
    double yearsOfService = input.getMonthsOfService() / 12d;
    double portionOfSalary = yearsOfService * (ageFactor / 100d);
    portionOfSalary = Math.min(portionOfSalary, MAX_PORTION_OF_SALARY);

    double veteranBenefit;
    if (input.isMilitaryVeteran()) {
      veteranBenefit = yearsOfService * VETERAN_BENEFIT_EARNED_PER_YEAR;
      veteranBenefit = Math.min(veteranBenefit, MAX_VETERAN_BENEFIT);
    } else {
      veteranBenefit = 0;
    }

    double fullAllowance = input.getSalaryAverage() * portionOfSalary + veteranBenefit;
    List<RetirementOption> options = getRetirementOptions(input, fullAllowance);
    return new CalculatorResult(options);
  }
}
