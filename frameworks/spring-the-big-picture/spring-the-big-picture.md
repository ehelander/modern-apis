# Spring: The Big Picture (Dustin Schultz, 2018-05-14)

## Overview

### [Course Overview](https://app.pluralsight.com/player?course=spring-big-picture&author=dustin-schultz&name=cb2bdb36-85ec-4d22-8ece-263d4318aa80&clip=0&mode=live)

## What Is Spring?

### [Introduction](https://app.pluralsight.com/course-player?clipId=e8197f0f-d207-463f-aca4-7eeb975f30b2)

- Spring is one of the most popular technologies for Java development.

### [What Is Spring?](https://app.pluralsight.com/course-player?clipId=fdb7d227-f280-41f0-bf95-94f89a07e11b)

- 'Spring' can refer to a wide variety of technologies. Whens someone says 'Spring', they're likely referring to the family or ecosystem.

### [Meet the Spring Family](https://app.pluralsight.com/course-player?clipId=8f8afce6-cac6-49c8-bcd0-c26dcdd03546)

- Spring was built to reduce the complexity of working with J2EE (Java EE).
  - Make web development and data access easier.
  - Reduce boilerplate.
- A variety of project have been built on top of the Spring framework:
  - Spring Data
  - Spring Batch
  - Spring Security
  - Spring Social
  - Spring Kafka
  - Spring LDAP
  - Spring Web Services
  - Spring Session
  - Spring Integration
  - Spring Boot
    - Provided a new and faster way of building Spring-based applications.
    - Takes an opinionated view with sensible defaults, auto-configuration, simpler deployment.
  - Spring Cloud
    - Build on top of Spring Boot.
    - Simplified distributed architectures when using Spring.

### [Why Spring?](https://app.pluralsight.com/course-player?clipId=fecac44f-2a52-4fb0-ae76-375b23d7e1c0)

- Today, Spring is much more than just an alternative to Java EE. It's more complementary to Java EE than an alternative.
- Why Spring?
  - Because creating software can be hard. Spring can help make it easier.
    - Spring Framework Reference Documentation: "Spring makes it easier to create Java enterprise applications."
      - Shared theme across Spring projects.
  - Flexible, modular, backwards compatible.
    - Freedom to pick & choose.
  - Large & active community.
  - Continually innovates and evolves.

### [Summary](https://app.pluralsight.com/course-player?clipId=32179899-2a7f-4f88-8a1e-72e58f3b7ec1)

## Getting to Know Spring with Spring Boot

### [Spring Boot Makes Spring Both Quick and Easy](https://app.pluralsight.com/course-player?clipId=8dcd8deb-e2ff-4822-ada1-b482355559cb)

- Spring Boot makes getting started with Spring quick & easy.
  - But without sacrificing features: It's fully-featured and heavily used in production environments.

### [Understanding Spring Boot's Key Features](https://app.pluralsight.com/course-player?clipId=5af675a4-d0ca-4327-b30f-7c36c7cbe1b4)

- Spring Boot can be used for both web- and non-web-based applications.
- Spring Boot is built on top of the Spring framework.
- Notable features
  - Auto-configuration
  - Standalone
  - Opinionated

### [Intelligent Auto-configurations](https://app.pluralsight.com/course-player?clipId=d97f2b1c-ad6c-4acc-aa79-c61dbaef76c8)

- A best-guess configuration, based on dependencies that have been added.
  - Contextual aware; smart
- Setting up auto-configuration:
  - `@EnableAutoConfiguration` annotation

### [Standalone Applications that "Just Run"](https://app.pluralsight.com/course-player?clipId=8132190b-3076-4630-989e-681617a4b6c3)

- "Spring Boot makes it easy to create stand-alone, production-grade, Spring-based applications that you can 'just run'."
  - Vs. typical Java web application:
    - Package application
    - Choose/download webserver
    - Configure webserver
    - Deploy application
    - Start webserver
- Spring Boot:
  - Package & run: `java -jar my-application.jar`

### [An Opinionated View of Spring](https://app.pluralsight.com/course-player?clipId=f9bed16b-4aca-43bb-aad4-4d59d98b618a)

- Building Java applications entails an overwhelming number of choices.
- Spring boot "favors convention over configuration and is designed to get you up and running as quickly as possible"
- Example:
  - Spring Initializer: [https://start.spring.io](https://start.spring.io)
    - Create & download a fully-functional Spring Boot application based on dependencies

### [Where Can I Learn More About Spring Boot?](https://app.pluralsight.com/course-player?clipId=71cdae66-5c74-47de-9301-be28d4cb1e5d)

- Pluralsight: Creating Your First Spring Boot Application (Dan Bunker)
- Pluralsight: Spring Boot: Efficient Development, Configuration, and Deployment (Dustin Schultz)

### [Summary](https://app.pluralsight.com/course-player?clipId=bb6b3070-10fb-4f2e-8f7a-bc03fdeeea68)

## Understanding Spring's Foundations: The Spring Framework

### [The Spring Framework Is a Software Framework](https://app.pluralsight.com/course-player?clipId=1beb64bd-4860-4ca7-99c5-9c787e17c2a3)

- Software framework
  - "A universal, reusable software environment that provides particular functionality as part of a larger software platform to facilitate development of software applications, products and solutions" (Wikipedia)
    - A universal, reusable software environment
      - Serves as the support upon which applications are built
    - provides particular functionality
      - Spring provides functionality for web development, data access, etc.
    - part of a larger software platform
      - Spring Framework is part of Java
    - facilitate development of software applications, products and solutions
      - Makes application development easier

### [This Is Where It All Began](https://app.pluralsight.com/course-player?clipId=09498b72-2347-4d7c-8729-b7422056821a)

- Enterprise Java Development was complex. The Spring Framework has grown and evolved.
  - Not only dit it simplify development, but it became the foundation for Spring projects.

### [The Six Key Areas of the Spring Framework](https://app.pluralsight.com/course-player?clipId=54f5df34-f9d4-4410-8beb-c1e17dce11e2)

- Spring is modular, with 6 key areas
  - Core
  - Web
  - AOP
  - Data Access
  - Integration
  - Testing

### [Spring Core](https://app.pluralsight.com/course-player?clipId=6c4515ea-5f0d-4fa9-9ec3-55cb0a6540a6)

- The most important piece: The foundational module.
- Provides
  - Internationalization
  - Validation
  - Data binding
  - Type conversion
  - Dependency injection
    - Objects don't exist in isolation: they often depend on other objects.
    - 2 approaches to fulfilling dependencies
      1. Object fulfills its own dependencies
         - Limitations
           - The object and its dependencies become tightly coupled.
      2. Object declares what it depends on (and something else fulfills the dependency)
         - More flexible: Loose coupling between object and dependencies.
         - Dependency injection
         - Spring Core is a dependency injection container, creating and managing objects and their dependencies.
    - Spring Core is the glue of the application.

### [Spring Web Overview](https://app.pluralsight.com/course-player?clipId=d9406e11-d4f0-4488-b13b-772a4f784f55)

- Spring Web is a framework for handling web requests.
- 2 ways of handling web requests:
  1. Spring Web MVC
  2. Spring Web Webflux

### [Spring Web MVC](https://app.pluralsight.com/course-player?clipId=aaee9963-7a6c-4f22-bb8e-f943e928f4b2)

- Java servlet API
  - "A servlet is an object that receives a request and generates a response based on that request." (Wikipedia)
  - It's a low-level API
    - Hard to use
    - Less productive
    - Often leads to poor design
- Spring Web MVC provides a higher-level API
  - Easier
  - More productive
  - Easier to follow proper design principles
- MVC
  - Pluralsight: Introduction Spring MVC 4 (Bryan Hansen)

### [Spring Webflux](https://app.pluralsight.com/course-player?clipId=02373c77-5197-4d67-88cd-18506363173a)

- Reactive programming
  - A declarative programming paradigm concerned with data streams and the propagation of changes
  - Key idea: React to change, rather than wait for change
- Different way of handling web requests
  - Asynchronous execution (no blocking/waiting) &rarr; better resource utilization
- Pluralsight: Spring WebFlux: Getting Started (Esteban Herrera)

### [Spring AOP](https://app.pluralsight.com/course-player?clipId=52fcac99-8587-446c-a2af-ffa8b6831911)

- Aspect-Oriented Programming
  - "A programming paradigm that aims to increase modularity by allowing the separation of cross-cutting concerns." (Wikipedia)
- Spring AOP
  - An implementation of AOP inside Spring.
  - 2 main uses:
    - Implement certain features within Spring
    - Valuable tool for developers to ues when handling cross-cutting concerns
  - E.g., rather than needing to check if the user has the correct permissions: `@PreAuthorize("hasRole('admin')")`
- Pluralsight: Aspect Oriented Programming (AOP) using Spring AOP and AspectJ (Eberhard Wolff)

### [Spring Data Access](https://app.pluralsight.com/course-player?clipId=e083bcdd-a5a3-417c-aa76-f83b3dbe13e2)

- With standard JDBC, there's a lot of boilerplate code for retrieving data.
  - Spring Data Access example:

    ```java
    int cnt = new JdbcTemplate(ds).queryForInt("SELECT COUNT(*) FROM foo");
    ```

- (Atomic) database transactions are easy with Spring Data Access
  - Spring Data Access example:

    ```java
    @Transactional
    public void operation() {
      // queries, updates, etc.
    }
    ```

- Exception translation
  - Different vendors use different exceptions
    - E.g., takes database-specific codes and translates them into a well-known exception (e.g., `DataIntegrityViolationException`)
- Makes testing easier
  - Since Spring manages the configuration/setup for how the application accesses data, it's easy to swap this out with test data.

### [Spring Integration](https://app.pluralsight.com/course-player?clipId=2cdaf81c-ab3e-4fa9-b591-898b2602af88)

- How do you expose operations to other systems? How do you invoke operations on other systems? (RMI: Remote Method Invocation; Messaging Systems; Web Services)
  - Spring makes it easy to expose and invoke web services.

    ```java
    // @RestController Denotes that this is a REST service
    @RestController
    public class AccountController {

      // @GetMapping Denotes the path that is sued to invoke this operation
      @GetMapping("/account/{id}")
      public Account
        // @PathVariable Indicates this is a placeholder
        find(@PathVariable int id) {
          // look up account by id
        }
    }
    ```

  - `RestTemplate` abstracts away details of dealing with a web service (connecting to the web service, sending a command, handling the response)

    ```java
    restTemplate.getForObject("http://foo.com/account/123", Account.class);
    ```

### [Spring Testing](https://app.pluralsight.com/course-player?clipId=b956e09c-8b52-484f-a193-f734bfad162b)

- Spring Testing focuses on unit tests and integration tests
- Unit testing
  - Explicit support for unit testing in Spring is minimal. Most of the benefit comes from using dependency injection.
    - Testing codes that has no dependencies is easy to test.
    - But dependencies cause testing challenges. When testing code with dependency injection, the developer is forced to declare dependencies. When testing, the dependencies can be replaced with mocks.
      - Spring includes several built-in mocks.
- Integration testing
  - Spring pieces the parts of the application together.
    - Support for common testing scenarios
      - Data access
      - Web apps
    - Support for cleaning up after tests

### [Summary](https://app.pluralsight.com/course-player?clipId=da90852f-f596-488b-9bf2-bf38b4d7f8c4)

## Exploring Other Spring Projects

### The Spring Projects We'll Be Exploring

### Spring Data Project

### Spring Cloud Project

### Spring Security Project

### Summary

## Is Spring a Good Fit?

### Is Spring a Good Fit for What I'm Doing?

### The Advantages of Using Spring

### The Disadvantages of Using Spring

### Making the Decision

### Summary
