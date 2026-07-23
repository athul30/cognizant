# Exercise 2: E-commerce Platform Search Function

## 1. Asymptotic Notation (Big O)

**Big O notation** describes how the runtime (or memory usage) of an algorithm
grows as the size of the input (n) grows. It focuses on the *rate of growth*
rather than exact timings, which lets us compare algorithms independently of
hardware, programming language, or implementation details. Big O gives an
**upper bound** on growth, so it is most often used to describe the
**worst-case** behavior of an algorithm.

### Best, Average, and Worst Case for Search

| Case    | Linear Search | Binary Search | Explanation |
|---------|--------------|---------------|-------------|
| Best    | O(1)         | O(1)          | Target is found on the very first comparison (first element for linear, middle element for binary). |
| Average | O(n)         | O(log n)      | Linear search checks roughly n/2 elements on average; binary search halves the search space each step. |
| Worst   | O(n)         | O(log n)      | Linear search may scan the entire array (target at the end or missing); binary search still only needs log2(n) comparisons because it discards half the remaining elements each iteration. |

## 2. Setup

The `Product` class models a catalog item with:
- `productId` (int) — used as the search key
- `productName` (String)
- `category` (String)

## 3. Implementation

- `LinearSearch.java` — scans an array from start to end, works on
  **unsorted** data, O(n) worst case.
- `BinarySearch.java` — repeatedly halves the search range, requires the
  array to be **sorted** by `productId`, O(log n) worst case.
- `SearchTest.java` — demonstrates both algorithms and times them on a
  1,000,000-element dataset to show the practical difference.

## 4. Analysis: Linear vs Binary Search

| Aspect              | Linear Search | Binary Search |
|---------------------|---------------|---------------|
| Time complexity     | O(n)          | O(log n)      |
| Requires sorted data| No            | Yes           |
| Extra cost          | None          | Sorting cost O(n log n) if data isn't already sorted, plus cost of keeping it sorted on inserts |
| Best for            | Small or infrequently searched, unsorted, or frequently-changing datasets | Large, static or infrequently-updated, sortable datasets |

### Which is more suitable for an e-commerce platform?

For a real e-commerce search feature, **binary search (or better, an index/
hash-based lookup)** is the right choice when searching by a sortable key
such as `productId`, because:

- Product catalogs are typically **large** (thousands to millions of items),
  where O(log n) vastly outperforms O(n).
- Catalogs are **read far more often than they are updated** (browsing/search
  happens constantly; new products are added far less frequently), so the
  one-time cost of keeping the array sorted (or indexed) pays off quickly.

However, in practice, most production e-commerce search systems go a step
further and use **hash maps/indexes (O(1) average lookup)** or full-text
search engines (e.g., Elasticsearch) for searching by name, category, or
free-text queries, since binary search only works well for a single sortable
key. Binary search is most appropriate here specifically for **exact key
lookups** (e.g., looking up a product by its ID), while text/category search
benefits more from indexing structures such as hash maps or inverted
indexes.

## How to Run

```bash
javac *.java
java SearchTest
```
