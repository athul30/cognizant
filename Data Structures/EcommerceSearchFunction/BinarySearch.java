/**
 * BinarySearch.java
 *
 * Implements binary search over a SORTED array of Products
 * (sorted by productId).
 *
 * Time Complexity:
 *   Best case:    O(1)      - target is the middle element on first check
 *   Average case: O(log n)  - search space halves each iteration
 *   Worst case:   O(log n)  - target is at an extreme, or not present at all
 *
 * Binary search is much faster than linear search for large datasets,
 * but requires the array to be sorted beforehand (sorting itself costs
 * O(n log n) if the data isn't already sorted).
 */
public class BinarySearch {

    /**
     * Searches for a product by productId using binary search.
     * Assumes 'products' is sorted in ascending order by productId.
     *
     * @param products sorted array of products
     * @param targetId productId to search for
     * @return the matching Product, or null if not found
     */
    public static Product search(Product[] products, int targetId) {
        int low = 0;
        int high = products.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2; // avoids potential overflow
            int midId = products[mid].getProductId();

            if (midId == targetId) {
                return products[mid]; // Found the target
            } else if (midId < targetId) {
                low = mid + 1; // Search the right half
            } else {
                high = mid - 1; // Search the left half
            }
        }
        return null; // Not found
    }
}
