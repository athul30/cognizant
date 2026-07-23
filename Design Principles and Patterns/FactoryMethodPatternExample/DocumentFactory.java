/**
 * DocumentFactory.java
 *
 * Abstract creator class in the Factory Method Pattern.
 * Declares the factory method createDocument() that subclasses
 * must implement to produce a specific type of Document.
 */
public abstract class DocumentFactory {

    // Factory method - to be implemented by concrete factories
    public abstract Document createDocument();

    // Template method that uses the factory method.
    // Demonstrates typical Factory Method usage: the creation logic
    // is separated from the business logic that uses the product.
    public Document processNewDocument() {
        Document document = createDocument();
        document.open();
        document.save();
        document.close();
        return document;
    }
}
