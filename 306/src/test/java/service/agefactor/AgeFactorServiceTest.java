package service.agefactor;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.time.LocalDate;
import java.time.Month;

/**
 * Tests for the {@link AgeFactorService}.
 */
public class AgeFactorServiceTest {

  AgeFactorService ageFactorService = new AgeFactorService();

  @Rule
  public ExpectedException thrown = ExpectedException.none();

  @Test
  public void testGetAgeFactorPreDateGroup1() {
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.ONE, 75, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.ONE, 65, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.3,
            ageFactorService.getAgeFactor(GroupType.ONE, 63, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.1,
            ageFactorService.getAgeFactor(GroupType.ONE, 61, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.7,
            ageFactorService.getAgeFactor(GroupType.ONE, 57, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.5,
            ageFactorService.getAgeFactor(GroupType.ONE, 55, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.5,
            ageFactorService.getAgeFactor(GroupType.ONE, 45, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);

  }

  @Test
  public void testGetAgeFactorPreDateGroup2() {
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.TWO, 75, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.TWO, 60, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.3,
            ageFactorService.getAgeFactor(GroupType.TWO, 58, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.2,
            ageFactorService.getAgeFactor(GroupType.TWO, 57, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.1,
            ageFactorService.getAgeFactor(GroupType.TWO, 56, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.0,
            ageFactorService.getAgeFactor(GroupType.TWO, 55, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
  }

  @Test
  public void testGetAgeFactorPreDateGroup4() {
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.FOUR, 60, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.FOUR, 55, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.4,
            ageFactorService.getAgeFactor(GroupType.FOUR, 54, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.2,
            ageFactorService.getAgeFactor(GroupType.FOUR, 52, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.0,
            ageFactorService.getAgeFactor(GroupType.FOUR, 50, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.8,
            ageFactorService.getAgeFactor(GroupType.FOUR, 48, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.7,
            ageFactorService.getAgeFactor(GroupType.FOUR, 47, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.5,
            ageFactorService.getAgeFactor(GroupType.FOUR, 45, LocalDate.of(2010, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
  }

  @Test
  public void testGetAgeFactorPostDateGroup1() {
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.ONE, 75, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.2,
            ageFactorService.getAgeFactor(GroupType.ONE, 65, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.05,
            ageFactorService.getAgeFactor(GroupType.ONE, 64, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.75,
            ageFactorService.getAgeFactor(GroupType.ONE, 62, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.45,
            ageFactorService.getAgeFactor(GroupType.ONE, 60, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
  }

  @Test
  public void testGetAgeFactorPostDateGroup2() {
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.TWO, 66, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.TWO, 62, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.2,
            ageFactorService.getAgeFactor(GroupType.TWO, 60, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.05,
            ageFactorService.getAgeFactor(GroupType.TWO, 59, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.75,
            ageFactorService.getAgeFactor(GroupType.TWO, 57, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.45,
            ageFactorService.getAgeFactor(GroupType.TWO, 55, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
  }

  @Test
  public void testGetAgeFactorPostDateGroup4() {
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.FOUR, 60, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.FOUR, 57, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.35,
            ageFactorService.getAgeFactor(GroupType.FOUR, 56, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.2,
            ageFactorService.getAgeFactor(GroupType.FOUR, 55, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.9,
            ageFactorService.getAgeFactor(GroupType.FOUR, 53, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.6,
            ageFactorService.getAgeFactor(GroupType.FOUR, 51, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(1.45,
            ageFactorService.getAgeFactor(GroupType.FOUR, 50, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2030, Month.AUGUST, 10)), 0.001);
  }

  @Test
  public void testGetAgeFactorPostDateSufficientYearsGroup1() {
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.ONE, 75, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2045, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.ONE, 67, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(2.25,
            ageFactorService.getAgeFactor(GroupType.ONE, 65, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(2.0,
            ageFactorService.getAgeFactor(GroupType.ONE, 63, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(1.875,
            ageFactorService.getAgeFactor(GroupType.ONE, 62, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(1.750,
            ageFactorService.getAgeFactor(GroupType.ONE, 61, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(1.625,
            ageFactorService.getAgeFactor(GroupType.ONE, 60, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
  }

  @Test
  public void testGetAgeFactorPostDateSufficientYearsGroup2() {
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.TWO, 75, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2045, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.TWO, 62, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(2.375,
            ageFactorService.getAgeFactor(GroupType.TWO, 61, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(2.25,
            ageFactorService.getAgeFactor(GroupType.TWO, 60, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(2.0,
            ageFactorService.getAgeFactor(GroupType.TWO, 58, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(1.750,
            ageFactorService.getAgeFactor(GroupType.TWO, 56, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(1.625,
            ageFactorService.getAgeFactor(GroupType.TWO, 55, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
  }

  @Test
  public void testGetAgeFactorPostDateSufficientYearsGroup4() {
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.FOUR, 60, LocalDate.of(2013, Month.APRIL, 20),
                    LocalDate.of(2045, Month.AUGUST, 10)), 0.001);
    Assert.assertEquals(2.5,
            ageFactorService.getAgeFactor(GroupType.FOUR, 57, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(2.375,
            ageFactorService.getAgeFactor(GroupType.FOUR, 56, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(2.125,
            ageFactorService.getAgeFactor(GroupType.FOUR, 54, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(1.875,
            ageFactorService.getAgeFactor(GroupType.FOUR, 52, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(1.750,
            ageFactorService.getAgeFactor(GroupType.FOUR, 51, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
    Assert.assertEquals(1.625,
            ageFactorService.getAgeFactor(GroupType.FOUR, 50, LocalDate.of(2012, Month.AUGUST, 20),
                    LocalDate.of(2049, Month.JULY, 10)), 0.001);
  }

}
