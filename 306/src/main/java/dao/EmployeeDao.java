package dao;

import model.Employee;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


/**
 * DAO for Employees in database.
 */
@Repository
@Transactional
public class EmployeeDao {
    // An EntityManager will be automatically injected from entityManagerFactory
    // setup on DatabaseConfig class.
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Creates an Employee in the database
     * @param employee The Employee to be added to the database
     */
    public void create(Employee employee) {
        entityManager.persist(employee);
    }

    /**
     * Delete the given Employee in the database if it exists
     * @param employee The Employee to be deleted from the database
     */
    public void delete(Employee employee) {
        if (entityManager.contains(employee))
            entityManager.remove(employee);
        else
            entityManager.remove(entityManager.merge(employee));
    }

    /**
     * Updates an Employee in the database with the given Employee
     * @param employee The Employee to be updated to
     */
    public void update(Employee employee) {
        entityManager.merge(employee);
        return;
    }

    /**
     * Read an Employee from the database given an ID
     * @param id The ID of an Employee
     * @return The Employee with the given ID
     */
    public Employee getById(int id) {
        return entityManager.find(Employee.class, id);
    }

}

