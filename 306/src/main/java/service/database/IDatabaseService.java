package service.database;

import model.Employee;

/**
 * Interface for service to look up employees in database by id.
 */
public interface IDatabaseService {

  /**
   * Given an ID, retrieve from database and serialize
   * @param id Id of the employee
   * @return an Employee object with the given ID
   */
  Employee getEmployee(int id);
}
