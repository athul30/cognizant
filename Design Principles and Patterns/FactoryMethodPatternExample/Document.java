/**
 * Document.java
 *
 * Common interface implemented by all document types
 * (WordDocument, PdfDocument, ExcelDocument).
 */
public interface Document {

    // Common operations every document type must support
    void open();

    void save();

    void close();
}
