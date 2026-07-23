/**
 * FactoryMethodTest.java
 *
 * Test class demonstrating creation of different document types
 * using the Factory Method Pattern.
 */
public class FactoryMethodTest {

    public static void main(String[] args) {

        System.out.println("=== Creating Word Document ===");
        DocumentFactory wordFactory = new WordDocumentFactory();
        Document wordDoc = wordFactory.processNewDocument();
        System.out.println("Created: " + wordDoc.getClass().getSimpleName());

        System.out.println("\n=== Creating PDF Document ===");
        DocumentFactory pdfFactory = new PdfDocumentFactory();
        Document pdfDoc = pdfFactory.processNewDocument();
        System.out.println("Created: " + pdfDoc.getClass().getSimpleName());

        System.out.println("\n=== Creating Excel Document ===");
        DocumentFactory excelFactory = new ExcelDocumentFactory();
        Document excelDoc = excelFactory.processNewDocument();
        System.out.println("Created: " + excelDoc.getClass().getSimpleName());
    }
}
