package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import model.EmployeeCalcInfo;
import service.calculatePension.ICalculatePensionService;
import service.calculatePension.PensionResult;

/**
 * Controller for requests to calculate pensions.
 */

@RestController
@RequestMapping("")
public class CalculatePensionController {

  @Autowired
  ICalculatePensionService calculatePensionService;

  @RequestMapping(value="/calculate", method = RequestMethod.POST,
          consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public PensionResult calculatePension(@RequestBody EmployeeCalcInfo employeeCalcInfo) {
    return calculatePensionService.calculatePension(employeeCalcInfo);
  }

}
