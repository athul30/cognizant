# Exercise 7: Financial Forecasting

## 1. Understanding Recursive Algorithms

**Recursion** is a technique where a method solves a problem by calling
itself on a smaller version of the same problem, until it reaches a
**base case** that can be answered directly without further recursion.

Recursion simplifies problems that have a natural self-similar structure —
here, "the value next year depends on the value this year" — because each
recursive call only needs to express *one* period's growth, and the
recursion handles building up the full sequence of periods automatically.

Every recursive algorithm needs:
- **Base case**: the simplest input that can be answered directly
  (here: 0 periods remaining → return the present value as-is).
- **Recursive case**: how to reduce the problem toward the base case
  (here: future value at period n = future value at period n-1, grown by
  one more period's rate).

## 2 & 3. Setup and Implementation

`FinancialForecast.java` implements:

1. **`calculateFutureValueRecursive`** — naive recursive compounding using
   a single fixed growth rate:
   `FV(n) = FV(n-1) * (1 + rate)`, with `FV(0) = presentValue`.
2. **`calculateFutureValueMemoized`** — same recursion, but caches results
   for each `(presentValue, rate, periods)` combination so repeated or
   overlapping forecasts don't get recomputed from scratch.
3. **`calculateFutureValueVariableRate`** — recursive forecast that applies
   a *different* growth rate for each period, which is more realistic for
   financial forecasting than assuming a constant rate every year.

`ForecastTest.java` exercises all three methods and prints predicted future
values, plus a simple timing demo of the memoized version.

## 4. Analysis

### Time Complexity

- **Naive recursive version**: each call to `calculateFutureValueRecursive`
  makes exactly one recursive call, so it runs in **O(n)** time and uses
  **O(n)** stack space (one stack frame per period), where n = number of
  periods.
  - Note: this is *not* like naive recursive Fibonacci (which is
    exponential O(2^n) due to branching into two calls per step); this
    forecasting recursion only branches once per call, so it's linear.
- **Memoized version**: still O(n) for a single call, since there's no
  overlapping/repeated work within one call chain. The benefit of
  memoization here shows up when the **same or overlapping subproblems are
  requested multiple times** — e.g., asking for forecasts at periods
  1, 2, 3, ... 10 for the same present value and rate. Without memoization,
  each of those calls independently recomputes all the periods below it
  (O(n) each, O(n²) total across all calls). With memoization, previously
  computed periods are reused, dropping the repeated-query cost close to
  **O(n)** total instead of O(n²).
- **Variable growth rate version**: also **O(n)**, one recursive call per
  period, since a different rate is simply looked up from the array at
  each step.

### Optimizing the Recursive Solution

Ways to avoid excessive computation:

1. **Memoization (top-down caching)** — as implemented, cache results keyed
   by the input parameters so repeated calls with the same arguments return
   instantly instead of recomputing the recursive chain.
2. **Convert to iteration (bottom-up / tabulation)** — since each step only
   depends on the immediately preceding period, the same result can be
   computed with a simple loop in O(n) time and **O(1) space**, avoiding
   recursive call-stack overhead entirely:
   ```java
   double fv = presentValue;
   for (int i = 0; i < periods; i++) {
       fv *= (1 + growthRate);
   }
   ```
3. **Closed-form formula** — for a constant growth rate, compound growth has
   a direct mathematical formula, computable in **O(1)** time:
   ```java
   double fv = presentValue * Math.pow(1 + growthRate, periods);
   ```
   This is the most efficient option when the growth rate is constant, but
   the recursive/iterative approach is still valuable when growth rates
   vary period to period (as modeled in `calculateFutureValueVariableRate`),
   since there's no single closed-form formula for arbitrary variable rates.

## How to Run

```bash
javac *.java
java ForecastTest
```
