package service.calculatePension;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * This class is a data class that just groups the results of a pension calculation.
 */
public class PensionResult {

  @JsonProperty("optionAAllowance")
  private double optionAAllowance;

  @JsonProperty("optionBAllowance")
  private double optionBAllowance;

  @JsonProperty("optionCAllowance")
  private double optionCAllowance;

  PensionResult(double optionAAllowance, double optionBAllowance, double optionCAllowance) {
    this.optionAAllowance = optionAAllowance;
    this.optionBAllowance = optionBAllowance;
    this.optionCAllowance = optionCAllowance;
  }

  /**
   * Gets the Option A Allowance
   * @return
   */
  public double getOptionAAllowance() {
    return optionAAllowance;
  }


  /**
   * Sets the option A Allowance
   * @param optionAAllowance
   */
  public void setOptionAAllowance(double optionAAllowance) {
    this.optionAAllowance = optionAAllowance;
  }

  /**
   * Gets the Option B Allowance
   * @return
   */
  public double getOptionBAllowance() {
    return optionBAllowance;
  }

  /**
   * Sets the Option B Allowance
   * @param optionBAllowance
   */
  public void setOptionBAllowance(double optionBAllowance) {
    this.optionBAllowance = optionBAllowance;
  }

  /**
   * Gets the Option C Allowance
   * @return
   */
  public double getOptionCAllowance() { return optionCAllowance; }

  /**
   * Sets the Option C Allowance
   * @param optionCAllowance
   */
  public void setOptionCAllowance(double optionCAllowance) {
    this.optionCAllowance = optionCAllowance;
  }

  /**
   * Determines if two Pension Results are equal
   * @param o The given Object to compare to this Pension Result
   * @return whether two Pension Results are the same
   */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    PensionResult that = (PensionResult) o;

    if (Double.compare(that.optionAAllowance, optionAAllowance) != 0) return false;
    if (Double.compare(that.optionBAllowance, optionBAllowance) != 0) return false;
    return Double.compare(that.optionCAllowance, optionCAllowance) == 0;

  }

  /**
   *
   * @return the hash value of this Pension Result
   */
  @Override
  public int hashCode() {
    int result;
    long temp;
    temp = Double.doubleToLongBits(optionAAllowance);
    result = (int) (temp ^ (temp >>> 32));
    temp = Double.doubleToLongBits(optionBAllowance);
    result = 31 * result + (int) (temp ^ (temp >>> 32));
    return result;
  }

  /**
   * Converts a Pension Result to a String
   * @return String representation of this Pension Result
   */
  @Override
  public String toString() {
    return "PensionResult{" +
            "optionAAllowance=" + optionAAllowance +
            ", optionBAllowance=" + optionBAllowance +
            '}';
  }
}