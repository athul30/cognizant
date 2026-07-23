package com.cognizant.jpadml;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class JpaDmlDemoApplication {

    private static final Logger logger = LoggerFactory.getLogger(JpaDmlDemoApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(JpaDmlDemoApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(ProductRepository productRepository) {
        return args -> {
            // Create (Save)
            Product saved = productRepository.save(new Product("Laptop", 55000.0));
            logger.info("Saved product: {}", saved);

            // Read (findById)
            Product found = productRepository.findById(saved.getId()).orElseThrow();
            logger.info("Found product by id: {}", found);

            // Read (custom query method)
            List<Product> byName = productRepository.findByName("Laptop");
            logger.info("Found products by name: {}", byName);

            // Update
            found.setPrice(50000.0);
            productRepository.save(found);
            logger.info("Updated product: {}", found);

            // Delete
            productRepository.deleteById(found.getId());
            logger.info("Deleted product with id: {}", found.getId());
        };
    }
}
