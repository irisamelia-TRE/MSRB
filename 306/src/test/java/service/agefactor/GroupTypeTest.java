package service.agefactor;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

/**
 * Tests for GroupType.
 */
public class GroupTypeTest {

  @Rule
  public ExpectedException thrown = ExpectedException.none();

  @Test
  public void testGetGroupNum() {
    Assert.assertEquals(1, GroupType.ONE.getGroupNum());
    Assert.assertEquals(2, GroupType.TWO.getGroupNum());
    Assert.assertEquals(4, GroupType.FOUR.getGroupNum());
  }

  @Test
  public void testGetTypeFromNum() {
    Assert.assertEquals(GroupType.ONE, GroupType.getTypeFromNum(1));
    Assert.assertEquals(GroupType.TWO, GroupType.getTypeFromNum(2));
    Assert.assertEquals(GroupType.FOUR, GroupType.getTypeFromNum(4));
  }

  @Test
  public void testInvalidGetTypeFrom0() {
    thrown.expect(IllegalArgumentException.class);
    thrown.expectMessage("Invalid group number.");

    GroupType.getTypeFromNum(0);
  }

  @Test
  public void testInvalidGetTypeFrom3() {
    thrown.expect(IllegalArgumentException.class);
    thrown.expectMessage("Invalid group number.");

    GroupType.getTypeFromNum(3);
  }

  @Test
  public void testInvalidGetTypeFrom5() {
    thrown.expect(IllegalArgumentException.class);
    thrown.expectMessage("Invalid group number.");

    GroupType.getTypeFromNum(5);
  }

}
