/**
 * WordDocument.java
 *
 * Concrete Document implementation representing a Word document.
 */
public class WordDocument implements Document {

    @Override
    public void open() {
        System.out.println("Opening Word document (.docx)...");
    }

    @Override
    public void save() {
        System.out.println("Saving Word document (.docx)...");
    }

    @Override
    public void close() {
        System.out.println("Closing Word document (.docx)...");
    }
}
