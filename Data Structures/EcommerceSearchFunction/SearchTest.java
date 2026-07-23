import java.util.Arrays;
import java.util.Comparator;

/**
 * SearchTest.java
 *
 * Demonstrates and compares linear search and binary search
 * over a Product catalog, including a simple timing comparison
 * on a larger dataset.
 */
public class SearchTest {

    public static void main(String[] args) {

        // ---- Small demo dataset ----
        Product[] catalog = {
                new Product(101, "Wireless Mouse", "Electronics"),
                new Product(203, "Yoga Mat", "Fitness"),
                new Product(305, "Coffee Maker", "Home Appliances"),
                new Product(150, "Bluetooth Speaker", "Electronics"),
                new Product(275, "Running Shoes", "Footwear"),
                new Product(120, "Desk Lamp", "Home Appliances"),
                new Product(190, "Backpack", "Accessories")
        };

        int targetId = 275;

        // ---- Linear Search Demo (works on unsorted array) ----
        System.out.println("=== Linear Search Demo ===");
        Product linearResult = LinearSearch.search(catalog, targetId);
        System.out.println("Searching for productId=" + targetId);
        System.out.println("Result: " + linearResult);

        // ---- Binary Search Demo (requires sorted array) ----
        System.out.println("\n=== Binary Search Demo ===");
        Product[] sortedCatalog = Arrays.copyOf(catalog, catalog.length);
        Arrays.sort(sortedCatalog, Comparator.comparingInt(Product::getProductId));

        System.out.println("Sorted catalog by productId:");
        for (Product p : sortedCatalog) {
            System.out.println("  " + p);
        }

        Product binaryResult = BinarySearch.search(sortedCatalog, targetId);
        System.out.println("Searching for productId=" + targetId);
        System.out.println("Result: " + binaryResult);

        // ---- Performance Comparison on Larger Dataset ----
        System.out.println("\n=== Performance Comparison (large dataset) ===");
        int size = 1_000_000;
        Product[] largeCatalog = new Product[size];
        for (int i = 0; i < size; i++) {
            largeCatalog[i] = new Product(i, "Product" + i, "Category" + (i % 10));
        }
        int searchTarget = size - 1; // worst case for both searches

        long startLinear = System.nanoTime();
        LinearSearch.search(largeCatalog, searchTarget);
        long endLinear = System.nanoTime();

        long startBinary = System.nanoTime();
        BinarySearch.search(largeCatalog, searchTarget); // already sorted by construction
        long endBinary = System.nanoTime();

        System.out.println("Dataset size: " + size);
        System.out.println("Linear search time (ns): " + (endLinear - startLinear));
        System.out.println("Binary search time (ns): " + (endBinary - startBinary));
        System.out.println("=> Binary search is dramatically faster for large, sorted datasets.");
    }
}
