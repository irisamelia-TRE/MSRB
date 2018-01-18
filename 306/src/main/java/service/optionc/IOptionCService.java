package service.optionc;


/**
 * Computes the fraction of a retirees Option A allowance they can expect to receive under
 * Option C.
 */
public interface IOptionCService {

  /**
   * @param ageOfRetiree The age of the retiree in years.
   * @param ageOfBeneficiary The age of the beneficiary in years.
   * @return The fraction of a retirees Option A allowance they should receive under Option C.
   */
  double calculateOptionCFactor(int ageOfRetiree, int ageOfBeneficiary);
}
