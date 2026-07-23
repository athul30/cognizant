import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class AaaPatternTest {

    private List<String> items;

    @Before
    public void setUp() {
        // Arrange: create a fresh fixture before each test
        items = new ArrayList<>();
        items.add("apple");
        items.add("banana");
    }

    @After
    public void tearDown() {
        // Teardown: clean up the fixture after each test
        items.clear();
        items = null;
    }

    @Test
    public void testAddItem() {
        // Arrange
        String newItem = "cherry";

        // Act
        items.add(newItem);

        // Assert
        assertEquals(3, items.size());
        assertTrue(items.contains(newItem));
    }

    @Test
    public void testRemoveItem() {
        // Arrange
        String itemToRemove = "apple";

        // Act
        boolean removed = items.remove(itemToRemove);

        // Assert
        assertTrue(removed);
        assertEquals(1, items.size());
    }
}
