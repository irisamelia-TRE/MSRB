package service.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.EmployeeDao;
import model.Employee;

/**
 * {@inheritDoc}
 */
@Service
public class DatabaseService implements IDatabaseService {

  @Autowired
  EmployeeDao employeeDao;

  /**
   * Given an ID, retrieve from database and serialize
   * @param id Id of the employee
   * @return an Employee object with the given ID
   */
  @Override
  public Employee getEmployee(int id) {
    Employee e = employeeDao.getById(id);
    e.prepareToSerialize();
    return e;
  }
}
