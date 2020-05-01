# [Spring Framework: Creating Your First Spring Boot Application](https://app.pluralsight.com/library/courses/creating-first-spring-boot-application) (Dan Bunker, 2019-10-31)

## Course Overview

### [Course Overview](https://app.pluralsight.com/player?course=creating-first-spring-boot-application&author=dan-bunker&name=93b7bf66-cc65-4884-803d-c159f169d0b6&clip=0&mode=live)

## Using Spring Boot to Create Applications

### [Introduction](https://app.pluralsight.com/player?course=creating-first-spring-boot-application&author=dan-bunker&name=1db3a0ad-cab9-46db-84fe-d7b033473655&clip=0&mode=live)

- Prerequisites
  - Java (at least Java 12)
  - IntelliJ (Community is alright)

### [What Is Spring Boot?](https://app.pluralsight.com/course-player?clipId=491b5cc0-bef1-4d46-90d9-7da8e777fa6d)

- Before Spring Boot, it could take days of development simply to get an app set up and talking to a database.
- Spring Boot
  - Opinionated framework
  - Rapid development
  - Stand alone app
    - Self-contained, suitable for cloud deployments

### [Demo: Creating a Spring Boot App with Spring Initializr](https://app.pluralsight.com/course-player?clipId=104fa981-df71-4342-9fd3-e748823e3ac4)

- One way to create a Spring Boot app:
  - [Spring Initializr](https://start.spring.io/)
- Example project
  - Maven Project
  - Java
  - Latest Spring Boot version
  - Group: `com.pluralsight`
  - Artifact: `conference-demo`
  - Dependencies: `Spring Web`
    - Spring MVC, REST API info
  - Click `Generate`: generates `conference-demo.zip`.

### [Demo: Importing and Setting up a Spring Boot App](https://app.pluralsight.com/course-player?clipId=b7bc9b61-098a-4bcc-84db-bee51013d9a2)

- Extract `conference-demo.zip`.
- Open IntelliJ.
  - Import `conference-demo`.
  - Maven project.
  - Leave defaults.
  - Choose or setup JDK.
  - Finish.

### [Demo: Overview of a Spring Boot App](https://app.pluralsight.com/course-player?clipId=b638e587-8ad0-475a-95b1-56f0023fcb64)

- Maven apps generally follow the same layout:
  - `pom.xml`
    - Dependencies (e.g., `org.springframework.boot`)
  - `src/main`
    - Java goes in `java`
      - `src/main/java/com.pluralsight.conferencedemo/ConferenceDemoApplication` is main entry point of application.
      - Note `@SpringBootApplication`
    - Property files, XML files, etc. go in `resources`
  - `src/test`
- Restructure our app and add some new files.
  - Right click on `com.pluralsight.conferencedemo` > `New` > `Package`
    - `com.pluralsight.conferencedemo.controllers`
      - Will hold API controllers
    - `com.pluralsight.conferencedemo.models`
      - Will hold JPA entities and other persistence info
    - `com.pluralsight.conferencedemo.repositories`
      - Will hold JPA repositories
    - `com.pluralsight.conferencedemo.services`
      - Will hold service- or logic-based code

### [Demo: Creating a Spring Boot App with IntelliJ](https://app.pluralsight.com/course-player?clipId=ac40d0a9-5570-42b3-8905-21d9834a650c)

- Alternate way to create a Spring Boot application (IntelliJ Ultimate)
  - Create New Project
  - Select `Spring Initializr` on the left menu

### [Demo: Using the Spring Boot CLI](https://app.pluralsight.com/course-player?clipId=c8d2df30-bff1-402a-bf90-7548ab984558)

- [Spring Boot CLI installation](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started-installing-the-cli)

  - Suggested install: [sdkman](https://sdkman.io/)
    - `sdk install springboot`
  - Homebrew

    ```sh
    brew tap pivotal/tap
    brew install springboot
    ```

- Once installed

  ```sh
  spring
  spring help
  spring init # Another way to create a Spring Boot project
  spring run # Can run a Groovy-based Spring Boot project
  ```

### [Understanding Spring Boot Starters](https://app.pluralsight.com/course-player?clipId=90ec12ea-9d75-4acd-aa03-d879dbda8731)

- Starters are what make Spring Boot shine.
- A starter is a way to integrate a dependency on your project.
  - Simply declare a starter, and it will take care of getting all the right versions and dependencies in place.
- `pom.xml` > dependencies
  - ![starter-dependencies](2020-05-01-16-27-02.png)
  - We have 2 starters currently:
    - `spring-boot-starter-web`
    - `spring-boot-starter-test`
  - You don't have to specify a version when declaring a starter dependency.
    - The `spring-boot-starter-parent` declaration at the top declares the versions of all the possible dependencies.
      - Sometimes called the BOM (bill of materials).
      - Can see by right clicking > `Maven` > `Show Effective POM`

### [Summary](https://app.pluralsight.com/course-player?clipId=2e7c8e2a-6a08-41c8-a53b-aff752d920a7)

- What is Spring Boot? Simply, an opinionated rapid development framework.

## Building Apps with Spring Boot

### [Introduction]()

### [Application Overview]()

### [Setting up the Database]()

### [Demo: Connecting to the Database]()

### [Demo: Creating JPA Models]()

### [Demo: Working with JPA Relationships]()

### [Demo: Working with Binary Data Types]()

### [Demo: Creating JPA Repositories]()

### [Demo: Creating Spring API REST Controllers - Part 1]()

### [Demo: Creating Spring API REST Controllers - Part 2]()

### [Demo: Handling Serialization Issues and Running the App]()

### [Summary]()

## Working with Spring Boot Config and Environment Needs

### [Introduction]()

### [How to Customize and Override Spring Boot]()

### [Demo: Locating and Working with Config Files]()

### [Demo: How to Change Database Connections]()

### [Demo: How to Handle Different Environments]()

### [Demo: Setting Properties with YAML]()

### [Demo: How to Use Spring Properties in Code]()

### [Demo: Overriding Spring Boot with Java Config]()

### [Creating Your Own Auto-configuration Class]()

### [Summary]()

## Deploying Spring Boot Applications

### [Introduction]()

### [Spring Boot Containerless Architecture]()

### [Demo: Switching out the Spring Boot Embedded Container]()

### [Demo: Creating Executable JAR Deployments]()

### [Common Cloud Supported Platforms]()

### [Demo: Deploying Spring Boot to the Cloud]()

### [What About WAR Deployments?]()

### [Demo: Creating a Spring Boot  WAR Deployment]()

### [Summary]()
