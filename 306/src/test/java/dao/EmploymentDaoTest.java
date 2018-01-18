package dao;

import config.DatabaseConfig;
import model.Employment;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import service.agefactor.GroupType;

import java.time.LocalDate;

import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {DatabaseConfig.class, EmploymentDao.class })
@EnableTransactionManagement
public class EmploymentDaoTest {

    @Autowired
    private EmploymentDao ed;

    @Test
    public void testGetID() {
        assertNotNull(ed);
        Assert.assertEquals(ed.getById(1), new Employment(1, LocalDate.of(2004, 1, 6),
                LocalDate.of(2010, 10, 5), GroupType.TWO, 50000));
    }

}
