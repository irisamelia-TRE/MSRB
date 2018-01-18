package cs4500.t304.backend;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Test;
import org.mockito.Mockito;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.time.LocalDate;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cs4500.t304.backend.model.CalculatorInput;
import cs4500.t304.backend.model.CalculatorResult;
import cs4500.t304.backend.model.CalculatorResult.RetirementOption;

import static cs4500.t304.backend.CalculationEndpoint.getMapper;
import static cs4500.t304.backend.model.CalculatorResult.Benefit;
import static org.junit.Assert.assertEquals;

public class CalculationEndpointTest extends Mockito {

    private CalculationEndpoint initBackend() throws ServletException {
        CalculationEndpoint backend = new CalculationEndpoint();
        backend.init();
        return backend;
    }

    private static class RequestResponse {
        HttpServletRequest request;
        HttpServletResponse response;
        String responseData;

        RequestResponse(HttpServletRequest request, HttpServletResponse response, String responseData) {
            this.response = response;
            this.request = request;
            this.responseData = responseData;
        }
    }

    private RequestResponse doPost(CalculatorInput input) throws IOException, ServletException {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        String json = getMapper().writeValueAsString(input);
        when(response.getWriter()).thenReturn(writer);
        when(request.getReader()).thenReturn(new BufferedReader(new StringReader(json)));
        initBackend().doPost(request, response);
        return new RequestResponse(request, response, stringWriter.toString());
    }

    @Test
    public void postSmokeTest() throws Exception {
        CalculatorInput input = new CalculatorInput();
        input.setBeneficiaryDoB(Optional.empty());
        input.setDayOfBirth(LocalDate.now().minusYears(60));
        input.setDayOfRetirement(LocalDate.now());
        input.setGroupNumber(1);
        input.setMilitaryVeteran(false);
        input.setSalaryAverage(100000);
        input.setMonthsOfService(240);
        input.setBefore2012(true);

        RequestResponse rr = doPost(input);
        CalculatorResult result = getMapper().readValue(rr.responseData, CalculatorResult.class);
        verify(rr.response).setStatus(200);
        RetirementOption optionA = result.getResults().get(0);
        assertEquals("Option A", optionA.getName());

    }

    @Test
    public void calculationTest() throws Exception {
        CalculatorInput input = new CalculatorInput();
        input.setBeneficiaryDoB(Optional.empty());
        input.setDayOfBirth(LocalDate.now().minusYears(55));
        input.setDayOfRetirement(LocalDate.now());
        input.setGroupNumber(1);
        input.setMilitaryVeteran(false);
        input.setSalaryAverage(50000);
        input.setMonthsOfService(186);
        input.setBefore2012(true);

        RequestResponse rr = doPost(input);
        CalculatorResult result = getMapper().readValue(rr.responseData, CalculatorResult.class);
        verify(rr.response).setStatus(200);
        assertEquals(2, result.getResults().size());
        RetirementOption optionA = result.getResults().get(0);
        assertEquals("Option A", optionA.getName());
        Benefit annual = optionA.getBenefits().get(0);
        assertEquals(11625, annual.getAmount().get().intValue());
        assertEquals("Option B", result.getResults().get(1).getName());
        assertEquals("Balance of Annuity Reserve Account, if any", result.getResults().get(1).getBenefits().get(2).getExplanation().get());
    }

    @Test
    public void optionCTest() throws Exception {
        CalculatorInput input = new CalculatorInput();
        input.setBeneficiaryDoB(Optional.of(LocalDate.now().minusYears(22)));
        input.setDayOfBirth(LocalDate.now().minusYears(55));
        input.setDayOfRetirement(LocalDate.now());
        input.setGroupNumber(1);
        input.setMilitaryVeteran(false);
        input.setSalaryAverage(50000);
        input.setMonthsOfService(186);
        input.setBefore2012(true);

        RequestResponse rr = doPost(input);
        CalculatorResult result = getMapper().readValue(rr.responseData, CalculatorResult.class);
        verify(rr.response).setStatus(200);
        assertEquals(3, result.getResults().size());
        RetirementOption optionC = result.getResults().get(2);
        Benefit annual = optionC.getBenefits().get(0);
        assertEquals(10156, annual.getAmount().get().intValue());
        Benefit beneficiaryAnnual = optionC.getBenefits().get(2);
        assertEquals(6770, beneficiaryAnnual.getAmount().get().intValue());
    }

    @Test
    public void nullFieldTest() throws Exception {
        CalculatorInput input = new CalculatorInput();
        input.setBeneficiaryDoB(Optional.empty());
        input.setDayOfBirth(null); // note the null
        input.setDayOfRetirement(LocalDate.now());
        input.setGroupNumber(1);
        input.setMilitaryVeteran(false);
        input.setSalaryAverage(50000);
        input.setMonthsOfService(186);
        input.setBefore2012(true);

        RequestResponse rr = doPost(input);
        verify(rr.response).setStatus(422);
        assertEquals("Null field", rr.responseData);
    }

    @Test
    public void getSmokeTest() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        when(response.getWriter()).thenReturn(writer);

        initBackend().doGet(request, response);
    }

    @Test
    public void sampleResponseTest() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        when(response.getWriter()).thenReturn(writer);
        when(request.getParameter("test_response")).thenReturn("true");

        initBackend().doGet(request, response);

        ObjectMapper mapper = getMapper();
        CalculatorResult result = mapper.readValue(stringWriter.toString(), CalculatorResult.class);
        assertEquals(1, result.getResults().size());
        RetirementOption option = result.getResults().get(0);
        assertEquals("testOption", option.getName());
        assertEquals("testBenefit", option.getBenefits().get(0).getName());
        assertEquals(2, (int) option.getBenefits().get(0).getAmount().get());
        assertEquals("testExplanationBenefit", option.getBenefits().get(1).getName());
        assertEquals("remaining annuity", option.getBenefits().get(1).getExplanation().get());
    }

    @Test
    public void sampleInputTest() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        when(response.getWriter()).thenReturn(writer);
        when(request.getParameter("test_input")).thenReturn("true");

        initBackend().doGet(request, response);
        ObjectMapper mapper = getMapper();
        mapper.readValue(stringWriter.toString(), CalculatorInput.class);
    }

}
