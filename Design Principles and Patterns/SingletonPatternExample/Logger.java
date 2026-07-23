/**
 * Logger.java
 *
 * Singleton Pattern Implementation
 * Ensures only one instance of Logger exists throughout the application lifecycle.
 */
public class Logger {

    // Private static instance of the class itself (the single instance)
    private static Logger instance;

    // Optional: keep a simple log history to demonstrate shared state
    private StringBuilder logHistory;

    // Private constructor prevents instantiation from other classes
    private Logger() {
        logHistory = new StringBuilder();
        System.out.println("Logger instance created.");
    }

    /**
     * Public static method to provide global access to the single instance.
     * Uses lazy initialization with synchronized block for thread safety.
     */
    public static Logger getInstance() {
        if (instance == null) {
            synchronized (Logger.class) {
                if (instance == null) {
                    instance = new Logger();
                }
            }
        }
        return instance;
    }

    // Example logging method
    public void log(String message) {
        String entry = "[LOG] " + message;
        logHistory.append(entry).append(System.lineSeparator());
        System.out.println(entry);
    }

    // Method to display all logged messages so far
    public void printHistory() {
        System.out.println("----- Log History -----");
        System.out.print(logHistory.toString());
        System.out.println("------------------------");
    }
}
