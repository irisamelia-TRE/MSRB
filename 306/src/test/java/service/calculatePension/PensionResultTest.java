package service.calculatePension;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class PensionResultTest {
    PensionResult testResult;

    @Before
    public void setUp() {
        testResult = new PensionResult(50, 100, (double)300);
    }

    @Test
    public void getOptionAAllowance() {
        assertEquals(testResult.getOptionAAllowance(), 50, .01);
    }

    @Test
    public void setOptionAAllowance() {
        testResult.setOptionAAllowance(200);
        assertEquals(testResult.getOptionAAllowance(), 200, .01);
    }

    @Test
    public void getOptionBAllowance() {
        assertEquals(testResult.getOptionBAllowance(), 100, .01);
    }

    @Test
    public void setOptionBAllowance() {
        testResult.setOptionBAllowance(500);
        assertEquals(testResult.getOptionBAllowance(), 500, .01);
    }

    @Test
    public void getOptionCAllowance() {
        assertEquals(testResult.getOptionCAllowance(), 300, .01);
    }

    @Test
    public void setOptionCAllowance() {
        testResult.setOptionCAllowance(1200.0);
        assertEquals(testResult.getOptionCAllowance(), 1200, .01);
    }

    @Test
    public void testEquals() {
        PensionResult testResult2 = new PensionResult(50, 100, (double)300);
        assertEquals(testResult.equals(testResult2), true);
        assertTrue(testResult.equals(testResult));
        assertFalse(testResult.equals(null));
        assertFalse(testResult.equals("Hollo"));

        testResult2.setOptionAAllowance(1000);
        assertFalse(testResult.equals(testResult2));
        testResult2.setOptionAAllowance(50);

        testResult2.setOptionBAllowance(1000);
        assertFalse(testResult.equals(testResult2));
        testResult2.setOptionBAllowance(100);

        testResult2.setOptionCAllowance(1000);
        assertFalse(testResult.equals(testResult2));
        testResult2.setOptionBAllowance(300);
    }

    @Test
    public void testHashCode() {
        PensionResult testResult2 = new PensionResult(50, 100, (double)300);
        assertTrue(testResult.hashCode() == testResult2.hashCode());

        testResult2.setOptionAAllowance(1000);
        assertFalse(testResult.hashCode() == testResult2.hashCode());
    }

    @Test
    public void testToString() {
        assertEquals(testResult.toString(), "PensionResult{optionAAllowance=50.0, optionBAllowance=100.0}");
    }

}
