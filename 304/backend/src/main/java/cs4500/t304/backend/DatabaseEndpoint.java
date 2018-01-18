package cs4500.t304.backend;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.io.BufferedReader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import cs4500.t304.backend.model.CalculatorInput;
import cs4500.t304.backend.model.EmploymentDao;
import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

/**
 * Endpoint responsible for receiving identifying information for a retiree (plus eventually
 * authentication information) and returning the input the calculator will need for that retiree.
 */
public class DatabaseEndpoint extends HttpServlet {

  private DateTimeFormatter dateFormat;

  public DatabaseEndpoint() {
    dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    dateFormat = dateFormat.withLocale(Locale.US);
  }

  protected String getSSN(HttpServletRequest request) throws IOException {
    StringBuilder sb = new StringBuilder();

    BufferedReader reader = request.getReader();
    try {
      String line;
      while ((line = reader.readLine()) != null) {
        sb.append(line).append('\n');
      }
    } finally {
      reader.close();
    }
    JSONObject object = new JSONObject(sb.toString().trim());
    return object.getString("ssn");
  }

  /**
   * Handle requests for data.
   */
  public void doPost(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    String socialString = getSSN(request);
    if (socialString == null) {
      response.setStatus(422);
      response.getWriter().write("Passed in a null SSN.");
    }
    String dayOfRetirementString = request.getParameter("dor");
    LocalDate dayOfRetirement;
    if (dayOfRetirementString == null) {
      dayOfRetirement = LocalDate.now();
    } else {
      dayOfRetirement = LocalDate.parse(dayOfRetirementString, dateFormat);
    }

    try (EmploymentDao dao = EmploymentDao.getDao()) {
      CalculatorInput input = dao.createCalculatorInput(socialString, dayOfRetirement);
      ObjectMapper mapper = CalculationEndpoint.getMapper();

      response.setStatus(200);
      response.addHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
      response.addHeader("Access-Control-Allow-Origin", "*");
      response.addHeader("Content-Type", "application/json");
      response.setContentType("application/json");
      mapper.writeValue(response.getWriter(), input);
    } catch (Exception e) {
      response.setStatus(500);
    }
  }

  public void doOptions(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {

    response.setStatus(200);
    response.addHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    response.addHeader("Access-Control-Allow-Origin", "*");
    response.addHeader("Allow", "POST,OPTIONS");
    response.addHeader("Content-Type", "application/json");
  }


}
