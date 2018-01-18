package service.agefactor;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.HashMap;
import java.util.Map;

/**
 * Enum representing different group types.
 */
public enum GroupType {
  ONE(1), TWO(2), FOUR(4);

  private static final Map<Integer, GroupType> numToGroupTypeMap = new HashMap<>();

  static {
    numToGroupTypeMap.put(1, ONE);
    numToGroupTypeMap.put(2, TWO);
    numToGroupTypeMap.put(4, FOUR);
  }

  private final int groupNum;

  GroupType(int groupNum) {
    this.groupNum = groupNum;
  }

  /**
   * Returns the number for this group.
   *
   * @return the number of this group type
   */
  @JsonValue
  public int getGroupNum() {
    return groupNum;
  }

  /**
   * Gets the GroupType from a given number
   *
   * @param num the number group we want the GroupType for
   * @return the group type that the given number corresponds to
   */
  public static GroupType getTypeFromNum(int num) {
    GroupType type = numToGroupTypeMap.get(num);
    if (type != null) {
      return type;
    } else {
      throw new IllegalArgumentException("Invalid group number.");
    }
  }

}
