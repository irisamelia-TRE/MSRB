package cs4500.t304.backend.model;

import com.google.common.collect.ImmutableMap;

import java.util.Map;

public class Post2012Ruleset extends Ruleset {

  private static final Map<Integer, Integer> GROUP_AGE_FACTOR_OFFSETS = ImmutableMap
      .of(1, 60, 2, 55, 4, 50);
  private static final double MAX_AGE_FACTOR = 2.5d;
  private static final double BASE_AGE_FACTOR = 1.45d;
  private static final double AGE_FACTOR_INCREMENT = 0.15d;
  private static final int LONG_SERVICE_MONTHS_THRESHOLD = 360;
  private static final double LONG_SERVICE_BASE_AGE_FACTOR = 1.625d;
  private static final double LONG_SERVICE_AGE_FACTOR_INCREMENT = 0.125d;

  @Override
  protected double ageFactor(CalculatorInput input) {
    int ageOffset = GROUP_AGE_FACTOR_OFFSETS.get(input.getGroupNumber());
    int extraAge = Math.max(0, floorRetireeAge(input) - ageOffset);

    double base, increment;
    if (input.getMonthsOfService() < LONG_SERVICE_MONTHS_THRESHOLD) {
      base = BASE_AGE_FACTOR;
      increment = AGE_FACTOR_INCREMENT;
    } else {
      base = LONG_SERVICE_BASE_AGE_FACTOR;
      increment = LONG_SERVICE_AGE_FACTOR_INCREMENT;
    }

    double factor = base + increment * extraAge;
    return Math.min(factor, MAX_AGE_FACTOR);
  }

  @Override
  protected boolean isApplicableRuleset(CalculatorInput input) {
    return !input.isBefore2012();
  }
}
