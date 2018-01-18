package dao;

import model.Employment;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import config.DatabaseConfig;
import model.Employee;
import service.agefactor.GroupType;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by John Compitello on 11/22/17.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {DatabaseConfig.class, EmployeeDao.class })
@EnableTransactionManagement
public class EmployeeDaoTest {


  @Autowired
  private EmployeeDao ed;

  @Test
  public void testGetID() {
    assertNotNull(ed);
    Employment e = new Employment(1, LocalDate.of(2004, 1, 6),
            LocalDate.of(2010, 10, 5), GroupType.TWO, 50000);
    List<Employment> employments = new ArrayList<Employment>();
    employments.add(e);
    Assert.assertEquals(ed.getById(1).getListOfEmployment(), employments);
    Assert.assertEquals(ed.getById(1), new Employee(1, "Danny", "Cadance", "78901267",
            LocalDate.of(1990, 10, 1),null, false, employments));
  }

}