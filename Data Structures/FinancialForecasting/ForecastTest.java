/**
 * ForecastTest.java
 *
 * Demonstrates the recursive financial forecasting methods,
 * including a timing comparison between naive recursion and
 * the memoized version.
 */
public class ForecastTest {

    public static void main(String[] args) {

        FinancialForecast forecast = new FinancialForecast();

        double presentValue = 10000.0; // e.g. $10,000 initial investment
        double growthRate = 0.07;      // 7% growth per year
        int periods = 10;              // forecast 10 years into the future

        // ---- Fixed-rate recursive forecast ----
        System.out.println("=== Fixed Growth Rate Forecast ===");
        double futureValue = forecast.calculateFutureValueRecursive(presentValue, growthRate, periods);
        System.out.printf("Present Value: $%.2f%n", presentValue);
        System.out.printf("Growth Rate: %.2f%% per period%n", growthRate * 100);
        System.out.printf("Periods: %d%n", periods);
        System.out.printf("Predicted Future Value: $%.2f%n", futureValue);

        // ---- Memoized version ----
        System.out.println("\n=== Memoized Forecast (repeated calls) ===");
        long start = System.nanoTime();
        for (int p = 1; p <= periods; p++) {
            forecast.calculateFutureValueMemoized(presentValue, growthRate, p);
        }
        long end = System.nanoTime();
        System.out.println("Computed forecasts for periods 1.." + periods + " using memoization.");
        System.out.println("Total time (ns): " + (end - start));

        // ---- Variable growth rate forecast ----
        System.out.println("\n=== Variable Growth Rate Forecast ===");
        double[] yearlyRates = {0.05, 0.03, 0.07, 0.02, 0.06}; // different rate each year
        double variableFutureValue = forecast.calculateFutureValueVariableRate(
                presentValue, yearlyRates, yearlyRates.length);
        System.out.printf("Present Value: $%.2f%n", presentValue);
        System.out.println("Yearly Growth Rates: 5%, 3%, 7%, 2%, 6%");
        System.out.printf("Predicted Future Value after 5 years: $%.2f%n", variableFutureValue);
    }
}
