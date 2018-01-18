package service.optionc;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Tests for OptionCService.
 */
public class OptionCServiceTest {
  OptionCService service = new OptionCService();

  @Test
  public void test90And90() {
    assertEquals(service.calculateOptionCFactor(90, 90), .7164, 1.0E-5);
  }

  @Test
  public void test1And1() {
    assertEquals(service.calculateOptionCFactor(1, 1), 0.9956, 1.0E-5);
  }

  @Test
  public void test1And90() {
    assertEquals(service.calculateOptionCFactor(1, 90), 1.0, 1.0E-5);
  }

  @Test
  public void test90And1() {
    assertEquals(service.calculateOptionCFactor(90, 1), .3303, 1.0E-5);
  }

  @Test
  public void test65And75() {
    assertEquals(service.calculateOptionCFactor(65, 75), .9298, 1.0E-5);
  }
}