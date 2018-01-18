package service.optionc;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Iterator;

/**
 * {@inheritDoc}
 */

@Service
public class OptionCService implements IOptionCService {

  //Since arrays are 0 indexed, getting age pair (x, y) from lookup table requires
  //doing lookupTable.get(x - 1).get(y - 1)
  private static final ArrayList<ArrayList<Double>> lookupTable = new ArrayList<>();

  static {
    createLookupTableFromFile("resources/optionCData/option-c.csv");
  }

  private static void createLookupTableFromFile(String filename) {
    try {
      Reader fileReader = new FileReader(filename);

      Iterable<CSVRecord> records = CSVFormat.DEFAULT.parse(fileReader);
      Iterator<CSVRecord> recordIterator = records.iterator();
      recordIterator.next(); //To skip header.

      while (recordIterator.hasNext()) {
        ArrayList<Double> oneRow = new ArrayList<>();
        CSVRecord currentRecord = recordIterator.next();
        for (int i = 1; i <= 90; i++) {
          oneRow.add(Double.parseDouble(currentRecord.get(i)));
        }
        lookupTable.add(oneRow);
      }

    } catch (Exception e) {
      e.printStackTrace();
    }
  }


  @Override
  public double calculateOptionCFactor(int ageOfRetiree, int ageOfBeneficiary) {
    return lookupTable.get(Math.min(ageOfRetiree - 1, 89)).get(Math.min(ageOfBeneficiary - 1, 89));
  }
}
