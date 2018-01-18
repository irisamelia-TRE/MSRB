package cs4500.t304.backend;

import com.google.common.collect.ImmutableList;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cs4500.t304.backend.model.Calculator;
import cs4500.t304.backend.model.CalculatorInput;
import cs4500.t304.backend.model.CalculatorResult;

/**
 * Endpoint responsible for receiving retiree data and returning the retirement options and benefits
 * that retiree is estimated to have.
 */
public class CalculationEndpoint extends HttpServlet {
    private static ObjectMapper mapper;

    // called by WildFly
    public void init() throws ServletException {
        mapper = getMapper();
    }

    // called by WildFly
    public void destroy() {
        // do nothing
    }

    /**
     * Produces a Jackson {@link ObjectMapper} that has all the modules it needs to serialize
     * calculator data classes.
     */
    static ObjectMapper getMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new Jdk8Module()); // necessary for Optional serialization
        mapper.registerModule(new JavaTimeModule()); // necessary for LocalDates
        return mapper;
    }

    /**
     * Handle requests for calculation. This is the main endpoint for the calculator.
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.addHeader("Access-Control-Allow-Origin", "*");
        CalculatorInput input = mapper.readValue(request.getReader(), CalculatorInput.class);
        Optional<String> errorMessage = Calculator.validateInput(input);
        if (!errorMessage.isPresent()) {
            CalculatorResult result = Calculator.calculate(input);
            response.setStatus(200);
            response.setContentType("application/json");
            mapper.writeValue(response.getWriter(), result);
        } else {
            response.setStatus(422);
            response.getWriter().write(errorMessage.get());
        }
    }

    /**
     * Handle some auxiliary tasks, namely providing sample serializations of data.
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.addHeader("Access-Control-Allow-Origin", "*");
        if (request.getParameter("test_response") != null) {
            sendTestResponse(response); // so (de)serialization can be tested
        } else if (request.getParameter("test_input") != null) {
            sendTestInput(response);
        }
    }

    public void doOptions(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        response.setStatus(200);
        response.addHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Allow", "GET,POST,OPTIONS");
        response.addHeader("Content-Type", "application/json");
    }

    /**
     * Send a test response. Useful for testing (de)serialization.
     * @param response callback to send to
     * @throws IOException on network problem
     */
    private void sendTestResponse(HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        CalculatorResult.RetirementOption option =
            new CalculatorResult.RetirementOption("testOption",
                                                  ImmutableList.of(new CalculatorResult.Benefit("testBenefit", 2),
                                                                   new CalculatorResult.Benefit("testExplanationBenefit", "remaining annuity")));
        CalculatorResult result = new CalculatorResult(ImmutableList.of(option));
        mapper.writeValue(response.getWriter(), result);
    }

    /**
     * Send a test input. Useful for testing (de)serialization.
     * @param response callback to send to
     * @throws IOException on network problem
     */
    private void sendTestInput(HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        CalculatorInput input = new CalculatorInput();
        input.setBeneficiaryDoB(Optional.empty());
        input.setDayOfBirth(LocalDate.of(1950, 2, 1));
        input.setDayOfRetirement(LocalDate.now());
        input.setGroupNumber(1);
        input.setMilitaryVeteran(false);
        input.setSalaryAverage(100000);
        input.setBefore2012(true);
        input.setMonthsOfService(240);
        mapper.writeValue(response.getWriter(), input);
    }
}
