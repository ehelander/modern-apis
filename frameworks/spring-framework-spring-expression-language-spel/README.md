# [Spring Framework: Spring Expression Language (SpEL)](https://app.pluralsight.com/library/courses/spring-framework-spel/table-of-contents)

## [Course Overview](https://app.pluralsight.com/player?course=spring-framework-spel&author=buddhini-samarakoddy&name=dc6de602-98cb-423e-b573-89071fd8dadf&clip=0&mode=live)

### Course Overview

## Getting to Know SpEL: Simple SpEL Expressions

### Module Overview

- Spring Expression Language enables developers to manipulate and query objects and object graphs at runtime &rarr; dynamic rewiring.
- Since Spring 3.0.
- Dynamic Bean Wiring
  - Dependency injection at runtime.
  - Example: Pick a bean or assign a value to a bean property at runtime, based on some condition.

### SpEL Overview

- ![](2020-09-14-20-35-05.png)
- ![](2020-09-14-20-36-00.png)
- ![](2020-09-14-20-36-27.png)
- SpEL can be used in plain Java code, but it's more likely to be used in metadata.
- ![](2020-09-14-20-37-06.png)

### Demo: Writing and Parsing Basic SpEL Expressions

- No special dependencies needed (just `spring-core`, `spring-context`). We'll use Spring Web Starter.
  - ![](2020-09-14-20-45-37.png)

### Evaluation Context

- Uses reflection.
- ![](2020-09-14-20-46-42.png)

### Demo: Evaluation Context in Action

- ![](2020-09-14-20-48-39.png)
- ![](2020-09-14-20-49-09.png)
- `user` with getters and setters
  - ![](2020-09-14-20-49-46.png)
- ![](2020-09-14-20-50-35.png)

### The systemProperties Predefined Variable

![](2020-09-14-20-51-27.png)

### Demo: Populating Bean Properties at Run Time Using systemProperties

- ![](2020-09-14-20-52-25.png)
- ![](2020-09-14-20-53-11.png)
- ![](2020-09-14-20-53-19.png)

### Summary

## Leveraging the Power of SpEL: Advanced SpEL Expressions

### Module Overview

### The @Value Annotation

### Demo: Using SpEL with @Value Annotation

### Collection Manipulation with SpEL

### Demo: Collection Manipulation with SpEL in Action

### Expression Templates

### Demo: Expression Templates in Action

### Demo: Using SpEL with XML

### Typical Usages of SpEL

### Summary
