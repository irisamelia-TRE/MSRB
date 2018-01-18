package cs4500.t304.backend.model;

import org.junit.Test;

import java.time.LocalDate;
import java.util.Optional;

import cs4500.t304.backend.model.CalculatorResult.RetirementOption;

import static cs4500.t304.backend.model.CalculatorResult.Benefit;
import static org.junit.Assert.assertEquals;

public class CalculatorTest {

  @Test
  public void calculateTest() throws Exception {
    CalculatorInput input = new CalculatorInput();
    input.setBeneficiaryDoB(Optional.empty());
    input.setDayOfBirth(LocalDate.now().minusYears(60));
    input.setDayOfRetirement(LocalDate.now());
    input.setGroupNumber(1);
    input.setMilitaryVeteran(false);
    input.setSalaryAverage(50000);
    input.setMonthsOfService(186);
    input.setBefore2012(false);

    CalculatorResult result = Calculator.calculate(input);
    RetirementOption optionA = result.getResults().get(0);
    assertEquals("Option A", optionA.getName());
    Benefit annual = optionA.getBenefits().get(0);
    assertEquals(11237, annual.getAmount().get().intValue());
    Benefit monthly = optionA.getBenefits().get(1);
    assertEquals(936, monthly.getAmount().get().intValue());

    RetirementOption optionB = result.getResults().get(1);
    assertEquals("Option B", optionB.getName());
    annual = optionB.getBenefits().get(0);
    assertEquals(10900, annual.getAmount().get().intValue());
  }

  @Test
  public void veteranTest() throws Exception {
    CalculatorInput input = new CalculatorInput();
    input.setBeneficiaryDoB(Optional.empty());
    input.setDayOfBirth(LocalDate.now().minusYears(60));
    input.setDayOfRetirement(LocalDate.now());
    input.setGroupNumber(1);
    input.setMilitaryVeteran(true);
    input.setSalaryAverage(50000);
    input.setMonthsOfService(186);
    input.setBefore2012(false);

    CalculatorResult result = Calculator.calculate(input);
    RetirementOption optionA = result.getResults().get(0);
    assertEquals("Option A", optionA.getName());
    Benefit annual = optionA.getBenefits().get(0);
    assertEquals(11470, annual.getAmount().get().intValue());
    Benefit monthly = optionA.getBenefits().get(1);
    assertEquals(956, monthly.getAmount().get().intValue());  }

  @Test
  public void validateInput() throws Exception {
    CalculatorInput input = new CalculatorInput();
    input.setBeneficiaryDoB(Optional.empty());
    input.setDayOfBirth(LocalDate.now().minusYears(60));
    input.setDayOfRetirement(null); // note the null
    input.setGroupNumber(1);
    input.setMilitaryVeteran(false);
    input.setSalaryAverage(100000);
    input.setMonthsOfService(240);
    input.setBefore2012(true);

    assertEquals(Optional.of("Null field"), Calculator.validateInput(input));
  }

}