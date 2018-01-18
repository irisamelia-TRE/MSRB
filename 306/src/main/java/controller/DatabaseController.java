package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import model.Employee;
import service.database.IDatabaseService;

/**
 * Controller for requests for employee info to database
 */

@RestController
@RequestMapping("")
public class DatabaseController {

  @Autowired
  IDatabaseService databaseService;

  @RequestMapping(value="/getEmployee", method = RequestMethod.POST,
          consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public Employee getEmployee(@RequestBody int id) {
    return databaseService.getEmployee(id);
  }
}
