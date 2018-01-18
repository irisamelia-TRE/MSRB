package service.agefactor;

import org.junit.Assert;
import org.junit.Test;

import java.time.LocalDate;
import java.time.Month;

/**
 * Tests for the {@link AgeFactorGroup} enum.
 */
public class AgeFactorGroupTest {

  @Test
  public void testPreDateGroups() {
    LocalDate predate1Start = LocalDate.of(1981, Month.FEBRUARY, 4);
    LocalDate predate1End = LocalDate.of(2016, Month.JANUARY, 8);
    LocalDate predate2Start = LocalDate.of(2005, Month.NOVEMBER, 9);
    LocalDate predate2End = LocalDate.of(2040, Month.MARCH, 13);

    LocalDate predateWith30yearsStart = LocalDate.of(2011, Month.APRIL, 12);
    LocalDate predateWith30yearsEnd = LocalDate.of(2045, Month.APRIL, 12);

    LocalDate predateOneDayBeforeCutoffStart = LocalDate.of(2012, Month.APRIL, 11);
    LocalDate predateOneDayBeforeCutoffEnd = LocalDate.of(2050, Month.MAY, 27);

    Assert.assertEquals(AgeFactorGroup.PRE_DATE,
            AgeFactorGroup.getGroupFromStartEndDate(predate1Start, predate1End));
    Assert.assertEquals(AgeFactorGroup.PRE_DATE,
            AgeFactorGroup.getGroupFromStartEndDate(predate2Start, predate2End));

    Assert.assertEquals(AgeFactorGroup.PRE_DATE,
            AgeFactorGroup.getGroupFromStartEndDate(predateWith30yearsStart,
                    predateWith30yearsEnd));
    Assert.assertEquals(AgeFactorGroup.PRE_DATE,
            AgeFactorGroup.getGroupFromStartEndDate(predateOneDayBeforeCutoffStart,
                    predateOneDayBeforeCutoffEnd));
  }

  @Test
  public void testPostDateWithSufficientServiceGroups() {
    LocalDate ex1Start = LocalDate.of(2020, Month.JULY, 12);
    LocalDate ex1End = LocalDate.of(2061, Month.DECEMBER, 29);
    LocalDate ex2Start = LocalDate.of(2013, Month.JANUARY, 7);
    LocalDate ex2End = LocalDate.of(2058, Month.JULY, 19);

    LocalDate exactCutOffDate30YearsStart = LocalDate.of(2012, Month.APRIL, 12);
    LocalDate exactCutOffDate30YearsEnd = LocalDate.of(2053, Month.JUNE, 25);

    LocalDate exactly30YearsStart = LocalDate.of(2012, Month.APRIL, 12);
    LocalDate exactly30YearsEnd = LocalDate.of(2042, Month.APRIL, 12);

    Assert.assertEquals(AgeFactorGroup.POST_DATE_WITH_SUFFICIENT_YEARS,
            AgeFactorGroup.getGroupFromStartEndDate(ex1Start, ex1End));
    Assert.assertEquals(AgeFactorGroup.POST_DATE_WITH_SUFFICIENT_YEARS,
            AgeFactorGroup.getGroupFromStartEndDate(ex2Start, ex2End));

    Assert.assertEquals(AgeFactorGroup.POST_DATE_WITH_SUFFICIENT_YEARS,
            AgeFactorGroup.getGroupFromStartEndDate(exactCutOffDate30YearsStart,
                    exactCutOffDate30YearsEnd));

    Assert.assertEquals(AgeFactorGroup.POST_DATE_WITH_SUFFICIENT_YEARS,
            AgeFactorGroup.getGroupFromStartEndDate(exactly30YearsStart,
                    exactly30YearsEnd));
  }

  @Test
  public void testPostDateInsufficientYears() {
    LocalDate ex1Start = LocalDate.of(2020, Month.JULY, 12);
    LocalDate ex1End = LocalDate.of(2029, Month.DECEMBER, 29);
    LocalDate ex2Start = LocalDate.of(2013, Month.JANUARY, 7);
    LocalDate ex2End = LocalDate.of(2038, Month.JULY, 19);

    LocalDate exactCutOffDateStart = LocalDate.of(2012, Month.APRIL, 12);
    LocalDate exactCutOffDateEnd = LocalDate.of(2032, Month.JUNE, 25);

    LocalDate fewDaysUnder30YearsStart = LocalDate.of(2018, Month.AUGUST, 28);
    LocalDate fewDaysUnder30YearsEnd = LocalDate.of(2048, Month.AUGUST, 26);

    Assert.assertEquals(AgeFactorGroup.POST_DATE,
            AgeFactorGroup.getGroupFromStartEndDate(ex1Start, ex1End));
    Assert.assertEquals(AgeFactorGroup.POST_DATE,
            AgeFactorGroup.getGroupFromStartEndDate(ex2Start, ex2End));

    Assert.assertEquals(AgeFactorGroup.POST_DATE,
            AgeFactorGroup.getGroupFromStartEndDate(exactCutOffDateStart,
                    exactCutOffDateEnd));

    Assert.assertEquals(AgeFactorGroup.POST_DATE,
            AgeFactorGroup.getGroupFromStartEndDate(fewDaysUnder30YearsStart,
                    fewDaysUnder30YearsEnd));
  }
}
