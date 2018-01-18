package service.calculatePension;

import model.EmployeeCalcInfo;

/**
 * Interface for services that calculate pensions.
 */
public interface ICalculatePensionService {

  public PensionResult calculatePension(EmployeeCalcInfo employee);

}