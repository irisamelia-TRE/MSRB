package cs4500.t304.backend.model;

import com.google.common.collect.ImmutableList;

import java.util.InputMismatchException;
import java.util.List;
import java.util.Optional;

/**
 * Main access point to the model.
 */
public class Calculator {

  private static final List<Ruleset> RULESETS = ImmutableList.of(new Pre2012Ruleset(), new Post2012Ruleset());

  private static Ruleset getApplicableRuleset(CalculatorInput input) {
    for (Ruleset r : RULESETS) {
      if (r.isApplicableRuleset(input)) {
        return r;
      }
    }
    throw new InputMismatchException();
  }

  /**
   * Calculate the amount and options for retirement.
   */
  public static CalculatorResult calculate(CalculatorInput input) {
    return getApplicableRuleset(input).calculateBenefits(input);
  }

  /**
   * Validate the input object. Checks for issues that would cause errors, but does not necessarily
   * check for issues that may produce nonsensical results.
   * @return A String error message if there is one.
   */
  public static Optional<String> validateInput(CalculatorInput input) {
    if (input.getDayOfRetirement() == null
        || input.getDayOfBirth() == null) {
      return Optional.of("Null field");
    }

    return Optional.empty();
  }

}
