package service.agefactor;

import java.time.LocalDate;
import java.time.Month;
import java.time.Period;

/**
 * Represents the different categories of age factor charts. Users fall under these categories
 * based on two criteria: the date they began service, and how many years they worked before
 * retiring.
 */
public enum AgeFactorGroup {

  PRE_DATE, POST_DATE, POST_DATE_WITH_SUFFICIENT_YEARS;

  /**
   * The date that a member's service start date is compared to to determine their age factor
   * group. Members whose service start date is before the cutoff date will be using the PRE_DATE
   * chart, while members who began on or after will be either POST_DATE or
   * POST_DATE_WITH_SUFFICIENT_YEARS based on the number of years they've worked.
   */
  private static final LocalDate cutoffDate = LocalDate.of(2012, Month.APRIL, 12);

  /**
   * The years of service required to fall under the highest age factor category.
   */
  private static final int yearsRequired = 30;

  /**
   * Gives an age factor chart group based on the given start and end dates.
   *
   * @param start the date someone entered service
   * @param end   the date someone is planning on leaving service
   * @return the AgeFactorGroup representing which group (and which chart) they will fall under
   */
  public static AgeFactorGroup getGroupFromStartEndDate(LocalDate start, LocalDate end) {
    if (start.compareTo(cutoffDate) < 0) {
      return PRE_DATE;
    }
    long yearsOfService = Period.between(start, end).getYears();
    return (yearsOfService >= yearsRequired) ? POST_DATE_WITH_SUFFICIENT_YEARS : POST_DATE;
  }

}
