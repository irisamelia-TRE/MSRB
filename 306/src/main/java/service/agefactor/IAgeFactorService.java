package service.agefactor;

import java.time.LocalDate;

/**
 * Service to handle and retrieve age factor data.
 */
public interface IAgeFactorService {

  /**
   * Gets the age factor based on the given group, age, start date and end date.
   *
   * @param group the group the user is in
   * @param age the age the user plans to retire at
   * @param start the date that the user entered service
   * @param end the date that the user plans to leave service
   * @return the age factor
   */
  double getAgeFactor(GroupType group, int age, LocalDate start, LocalDate end);

}
