package dao;


import model.Employment;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * DAO for Employments from database.
 */
public class EmploymentDao {
    // An EntityManager will be automatically injected from entityManagerFactory
    // setup on DatabaseConfig class.
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Create an employment
     */
    public void create(Employment employment) {
        entityManager.persist(employment);
    }

    /**
     * Delete the given employee
     */
    public void delete(Employment employment) {
        if (entityManager.contains(employment))
            entityManager.remove(employment);
        else
            entityManager.remove(entityManager.merge(employment));
    }

    /**
     * Update employment with same id as given employment to match given employment.
     * @param employment The new employment info.
     */
    public void update(Employment employment) {
        entityManager.merge(employment);
        return;
    }

    /**
     * Get the Employment with the given id from the database.
     * @param id The id to look up.
     * @return The Employment with the given id.
     */
    public Employment getById(int id) {
        return entityManager.find(Employment.class, id);
    }

}
