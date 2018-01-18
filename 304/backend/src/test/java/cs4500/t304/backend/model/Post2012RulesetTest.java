package cs4500.t304.backend.model;

import org.junit.Test;

import java.time.LocalDate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class Post2012RulesetTest {

  @Test
  public void ageFactor() throws Exception {
    Post2012Ruleset ruleset = new Post2012Ruleset();
    CalculatorInput input = new CalculatorInput();

    LocalDate now = LocalDate.now();
    input.setDayOfRetirement(now);
    input.setMonthsOfService(240);
    input.setDayOfBirth(now.minusYears(60));
    input.setGroupNumber(1);
    assertEquals(1.45d, ruleset.ageFactor(input), .01d);
    input.setMonthsOfService(360);
    assertEquals(1.625d, ruleset.ageFactor(input), .01d);
    input.setDayOfBirth(now.minusYears(65));
    assertEquals(2.25d, ruleset.ageFactor(input), .01d);
    input.setGroupNumber(4);
    assertEquals(2.5d, ruleset.ageFactor(input), .01d);
  }

  @Test
  public void applicableTest() throws Exception {
    Post2012Ruleset ruleset = new Post2012Ruleset();
    CalculatorInput input = new CalculatorInput();
    input.setBefore2012(false);
    assertTrue(ruleset.isApplicableRuleset(input));
    input.setBefore2012(true);
    assertFalse(ruleset.isApplicableRuleset(input));
  }

}