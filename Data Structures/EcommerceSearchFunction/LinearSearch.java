/**
 * LinearSearch.java
 *
 * Implements linear search over an (unsorted) array of Products.
 *
 * Time Complexity:
 *   Best case:    O(1)   - target is the first element checked
 *   Average case: O(n)   - target is found somewhere in the middle, on average
 *   Worst case:   O(n)   - target is the last element, or not present at all
 *
 * Linear search does not require the data to be sorted, which makes it
 * simple and flexible, but it scans every element in the worst case.
 */
public class LinearSearch {

    /**
     * Searches for a product by productId using linear search.
     *
     * @param products array of products (does not need to be sorted)
     * @param targetId productId to search for
     * @return the matching Product, or null if not found
     */
    public static Product search(Product[] products, int targetId) {
        // Check every element one by one
        for (int i = 0; i < products.length; i++) {
            if (products[i].getProductId() == targetId) {
                return products[i]; // Found - best case if i == 0
            }
        }
        return null; // Not found - worst case, scanned entire array
    }
}
