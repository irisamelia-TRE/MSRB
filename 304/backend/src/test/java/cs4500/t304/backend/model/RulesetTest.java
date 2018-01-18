package cs4500.t304.backend.model;

import org.junit.Test;

import java.time.LocalDate;
import java.util.InputMismatchException;
import java.util.Optional;

import static org.junit.Assert.assertEquals;

public class RulesetTest {

  @Test
  public void roundAgeAtRetirementTest() throws Exception {
    LocalDate now = LocalDate.of(2001, 7, 1);
    assertEquals(60, Ruleset.roundAgeAtRetirement(now.minusYears(60), now));
    assertEquals(60, Ruleset.roundAgeAtRetirement(now.minusYears(60).minusMonths(6), now));
    assertEquals(61, Ruleset.roundAgeAtRetirement(now.minusYears(60).minusMonths(6).minusDays(2), now));
  }

  @Test
  public void optionCFactorTest() throws Exception {
    CalculatorInput input = new CalculatorInput();
    LocalDate now = LocalDate.now();
    input.setDayOfRetirement(now);
    input.setDayOfBirth(now.minusYears(21));
    input.setBeneficiaryDoB(Optional.of(now.minusYears(21)));
    assertEquals(0.9901d, Ruleset.optionCFactor(input), .01d);
  }

  @Test(expected = InputMismatchException.class)
  public void optionCFactorTest2() throws Exception {
    CalculatorInput input = new CalculatorInput();
    LocalDate now = LocalDate.now();
    input.setDayOfRetirement(now);
    input.setDayOfBirth(now.minusYears(21));
    input.setBeneficiaryDoB(Optional.empty());
    Ruleset.optionCFactor(input);
  }

}