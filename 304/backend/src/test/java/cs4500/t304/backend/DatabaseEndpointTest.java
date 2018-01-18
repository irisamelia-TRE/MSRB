package cs4500.t304.backend;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Test;
import org.mockito.Mockito;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.time.LocalDate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cs4500.t304.backend.model.CalculatorInput;

import static cs4500.t304.backend.CalculationEndpoint.getMapper;
import static org.junit.Assert.assertEquals;



public class DatabaseEndpointTest extends Mockito{

  @Test
  public void sampleInputTest() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);
    DatabaseEndpoint db1 = spy(DatabaseEndpoint.class);
    doReturn("241-82-7985").when(db1).getSSN(any(HttpServletRequest.class));
    db1.doPost(request, response);
    ObjectMapper mapper = getMapper();
    mapper.readValue(stringWriter.toString(), CalculatorInput.class);
  }

  @Test
  public void sampleResponseTest() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);
    when(request.getParameter("dor")).thenReturn("2017-11-15");
    DatabaseEndpoint db1 = spy(DatabaseEndpoint.class);
    doReturn("241-82-7985").when(db1).getSSN(any(HttpServletRequest.class));

    db1.doPost(request, response);
    ObjectMapper mapper = getMapper();
    CalculatorInput c2 = mapper.readValue(stringWriter.toString(), CalculatorInput.class);

    assertEquals(LocalDate.of(1989, 9, 15), c2.getDayOfBirth());
    assertEquals(LocalDate.of(2017, 11, 15), c2.getDayOfRetirement());
    assertEquals(true, c2.isBefore2012());
    assertEquals(1, c2.getGroupNumber());
    assertEquals(48934, c2.getSalaryAverage());
    assertEquals(false, c2.isMilitaryVeteran());
    assertEquals(89, c2.getMonthsOfService());
  }

  @Test
  public void nullInputTest() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);
    DatabaseEndpoint db1 = spy(DatabaseEndpoint.class);
    doReturn(null).when(db1).getSSN(any(HttpServletRequest.class));

    db1.doPost(request, response);
    verify(response).setStatus(422);
  }

  @Test
  public void nullDateFieldTest() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);
    DatabaseEndpoint db1 = spy(DatabaseEndpoint.class);
    doReturn("241-82-7985").when(db1).getSSN(any(HttpServletRequest.class));

    db1.doPost(request, response);
    ObjectMapper mapper = getMapper();
    CalculatorInput c2 = mapper.readValue(stringWriter.toString(), CalculatorInput.class);

    assertEquals(LocalDate.now(), c2.getDayOfRetirement());
  }

    @Test
  public void doOptionsTest() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);
    DatabaseEndpoint db1 = new DatabaseEndpoint();
    db1.doOptions(request, response);

  }
}
