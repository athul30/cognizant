import java.util.HashMap;
import java.util.Map;

/**
 * FinancialForecast.java
 *
 * Predicts the future value of an investment/asset using a recursive
 * approach based on a (possibly varying) growth rate per period.
 *
 * Formula (compound growth), recursively defined:
 *   FV(0)     = presentValue
 *   FV(n)     = FV(n - 1) * (1 + growthRate)
 *
 * This class provides three versions:
 *   1. calculateFutureValueRecursive   - plain recursion (naive)
 *   2. calculateFutureValueMemoized    - recursion + memoization (optimized)
 *   3. calculateFutureValueVariableRate - recursion with a different growth
 *      rate per period, useful for realistic forecasting where growth
 *      rates change year to year.
 */
public class FinancialForecast {

    // Cache used for memoization: key = "presentValue_rate_period"
    private final Map<String, Double> memo = new HashMap<>();

    /**
     * Naive recursive calculation of future value.
     *
     * @param presentValue current value of the investment
     * @param growthRate   growth rate per period, e.g. 0.05 for 5%
     * @param periods      number of periods (years) to forecast
     * @return the predicted future value
     */
    public double calculateFutureValueRecursive(double presentValue, double growthRate, int periods) {
        // Base case: 0 periods means no growth applied yet
        if (periods == 0) {
            return presentValue;
        }
        // Recursive case: grow the value from period (n-1) by one more period
        return calculateFutureValueRecursive(presentValue, growthRate, periods - 1) * (1 + growthRate);
    }

    /**
     * Optimized recursive calculation using memoization to avoid
     * recomputing the same (presentValue, growthRate, periods) subproblem.
     * Most useful when the same forecast is requested repeatedly, or when
     * calculateFutureValue is called for many different period counts
     * from the same base scenario.
     */
    public double calculateFutureValueMemoized(double presentValue, double growthRate, int periods) {
        if (periods == 0) {
            return presentValue;
        }

        String key = presentValue + "_" + growthRate + "_" + periods;
        if (memo.containsKey(key)) {
            return memo.get(key); // Return cached result - avoids recomputation
        }

        double result = calculateFutureValueMemoized(presentValue, growthRate, periods - 1) * (1 + growthRate);
        memo.put(key, result);
        return result;
    }

    /**
     * Recursive forecast where the growth rate can differ each period
     * (e.g., year 1 grows 5%, year 2 grows 3%, year 3 grows 7%, ...).
     * This models real-world forecasting more realistically than a
     * single fixed rate.
     *
     * @param presentValue current value
     * @param growthRates  array of growth rates, one per period
     * @param period       current period index being processed (start at growthRates.length)
     * @return predicted future value after applying all given growth rates
     */
    public double calculateFutureValueVariableRate(double presentValue, double[] growthRates, int period) {
        // Base case: no more periods to process
        if (period == 0) {
            return presentValue;
        }
        // Apply the growth rate for this period, then recurse on the remaining periods
        double grown = calculateFutureValueVariableRate(presentValue, growthRates, period - 1);
        return grown * (1 + growthRates[period - 1]);
    }
}
