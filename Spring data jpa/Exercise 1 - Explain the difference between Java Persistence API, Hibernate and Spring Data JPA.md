# Explain the difference between Java Persistence API, Hibernate and Spring Data JPA

JPA (Java Persistence API) is a specification (JSR 338). JPA does not have an
implementation of its own. Hibernate is one of the implementations of the JPA
specification, and it is an ORM (Object-Relational Mapping) tool. Spring Data
JPA is an abstraction built on top of Hibernate (or any other JPA provider)
that removes boilerplate code when persisting data using Hibernate.

- **JPA**: A specification that defines a set of interfaces/annotations for
  managing relational data in Java applications. It has no implementation.
- **Hibernate**: A concrete implementation of the JPA specification, and a
  full-featured ORM framework in its own right.
- **Spring Data JPA**: A higher-level abstraction over a JPA provider (such as
  Hibernate) that generates repository implementations automatically, further
  reducing boilerplate code (e.g. no need to write DAO implementations).

## References

- Difference between Spring Data JPA and Hibernate: https://dzone.com/articles/what-is-the-difference-between-hibernate-and-sprin-1
- Intro to JPA: https://www.javaworld.com/article/3379043/what-is-jpa-introduction-to-the-java-persistence-api.html
