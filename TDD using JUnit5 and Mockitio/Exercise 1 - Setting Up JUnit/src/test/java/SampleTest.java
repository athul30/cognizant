import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class SampleTest {

    @Test
    public void testJUnitIsSetUpCorrectly() {
        int expected = 4;
        int actual = 2 + 2;
        assertEquals(expected, actual);
    }
}
