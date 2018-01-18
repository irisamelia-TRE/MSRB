package service.agefactor;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

/**
 * {@inheritDoc}
 */
@Service
public class AgeFactorService implements IAgeFactorService {

  private static final Map<AgeFactorGroup, Map<GroupType, Map<Integer, Double>>> ageFactorCharts =
          new HashMap<>();

  static {
    initAgeFactorMaps();
    createAgeFactorMapForGroupFromFile(AgeFactorGroup.PRE_DATE,
            "resources/ageFactorData/preDate.csv");
    createAgeFactorMapForGroupFromFile(AgeFactorGroup.POST_DATE,
            "resources/ageFactorData/postDate.csv");
    createAgeFactorMapForGroupFromFile(AgeFactorGroup.POST_DATE_WITH_SUFFICIENT_YEARS,
            "resources/ageFactorData/postDateSufficientYears.csv");
  }

  private static void initAgeFactorMaps() {
    for (AgeFactorGroup ageFactorGroup : AgeFactorGroup.values()) {
      ageFactorCharts.put(ageFactorGroup, new HashMap<>());
      Map<GroupType, Map<Integer, Double>> curChart = ageFactorCharts.get(ageFactorGroup);

      for (GroupType group : GroupType.values()) {
        curChart.put(group, new HashMap<>());
      }
    }
  }

  private static void createAgeFactorMapForGroupFromFile(AgeFactorGroup group, String fileName) {
    String[] fileHeaderMapping = {"Group1", "Group2", "Group4", "AgeFactor"};
    Map<GroupType, Map<Integer, Double>> groupToAgeFactorMap = ageFactorCharts.get(group);

    try {
      Reader fileReader = new FileReader(fileName);
      Iterable<CSVRecord> records = CSVFormat.DEFAULT.withHeader(fileHeaderMapping)
              .withFirstRecordAsHeader().parse(fileReader);

      for (CSVRecord curRecord : records) {
        insertDataIntoChartForGroup(curRecord, groupToAgeFactorMap);
      }
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private static void insertDataIntoChartForGroup(CSVRecord record,
                                                  Map<GroupType, Map<Integer, Double>> groupToAgeFactorMap) {
    String group1AgeString = record.get("Group1");
    String group2AgeString = record.get("Group2");
    String group4AgeString = record.get("Group4");

    double ageFactor = Double.parseDouble(record.get("AgeFactor"));

    if (!group1AgeString.isEmpty()) {
      int group1Age = Integer.parseInt(group1AgeString);
      groupToAgeFactorMap.get(GroupType.ONE).put(group1Age, ageFactor);
    }

    if (!group2AgeString.isEmpty()) {
      int group2Age = Integer.parseInt(group2AgeString);
      groupToAgeFactorMap.get(GroupType.TWO).put(group2Age, ageFactor);
    }

    if (!group4AgeString.isEmpty()) {
      int group4Age = Integer.parseInt(group4AgeString);
      groupToAgeFactorMap.get(GroupType.FOUR).put(group4Age, ageFactor);
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public double getAgeFactor(GroupType group, int age, LocalDate start, LocalDate end) {
    AgeFactorGroup ageFactorGroup = AgeFactorGroup.getGroupFromStartEndDate(start, end);
    Map<Integer, Double> ageToAgeFactorMap = ageFactorCharts.get(ageFactorGroup).get(group);

    int minAgeForGroup = getMinAgeInMap(ageToAgeFactorMap);
    age = (age >= minAgeForGroup) ? age : minAgeForGroup;

    int maxAgeForGroup = getMaxAgeInMap(ageToAgeFactorMap);
    age = (age <= maxAgeForGroup) ? age : maxAgeForGroup;

    return ageToAgeFactorMap.get(age);
  }

  private int getMaxAgeInMap(Map<Integer, Double> ageToAgeFactorMap) {
    return ageToAgeFactorMap.keySet()
            .stream()
            .mapToInt(Integer::valueOf)
            .max()
            .getAsInt();
  }

  private int getMinAgeInMap(Map<Integer, Double> ageToAgeFactorMap) {
    return ageToAgeFactorMap.keySet()
            .stream()
            .mapToInt(Integer::valueOf)
            .min()
            .getAsInt();
  }
}
