package cs4500.t304.backend.model;

import com.google.common.collect.ImmutableMap;

import java.util.Map;

public class Pre2012Ruleset extends Ruleset {

    private static final double MAX_AGE_FACTOR = 2.5d;
    private static final double BASE_AGE_FACTOR = 1.5d;
    private static final double AGE_FACTOR_INCREMENT = 0.1d;
    private static final Map<Integer, Integer> GROUP_AGE_FACTOR_OFFSETS = ImmutableMap
        .of(1, 55, 2, 50, 4, 45);

    @Override
    protected double ageFactor(CalculatorInput input) {
        int ageOffset = GROUP_AGE_FACTOR_OFFSETS.get(input.getGroupNumber());
        int extraAge = Math.max(0, floorRetireeAge(input) - ageOffset);
        double factor = extraAge * AGE_FACTOR_INCREMENT + BASE_AGE_FACTOR;
        return Math.min(factor, MAX_AGE_FACTOR);
    }

    @Override
    protected boolean isApplicableRuleset(CalculatorInput input) {
        return input.isBefore2012();
    }
}
