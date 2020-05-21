# [Gradle Build Tool Fundamentals](https://app.pluralsight.com/library/courses/gradle-build-tool-fundamentals/table-of-contents)

## Course Overview

### [Course Overview](https://app.pluralsight.com/player?course=gradle-build-tool-fundamentals&author=kevin-jones&name=47a85ed7-0534-4198-b8f4-e306ae02816b&clip=0&mode=live)

## Setting up Gradle in Your Environment

### [Introduction](https://app.pluralsight.com/course-player?clipId=53575000-1d3b-441a-8130-f0dc5958720c)

- Java's traditional build tools are Ant and Maven.
- What is Gradle?
  - A convention-based tool.
    - Vs. no conventions in Ant.
  - Highly configurable.
  - DSL to describe the build.
    - Vs. XML in And & Maven.
  - Suports multi-project builds.
  - Easily customizable.
  - Supports many languages.
  - Supports dependency management.

### [Comparing Ant and Maven](https://app.pluralsight.com/course-player?clipId=e2ec1cc9-b2cf-421b-a4d0-f77166a7e9b0)

- Ant (Another Neat Tool)
  - First Java build tool.
  - Provides an XML script that's difficult to read and maintain.
  - Lacks conventions. Everything must be specified.
- Maven
  - Has many conventions: Fewer things to be specified.
  - Supports dependency management.
  - Highly extensible (plugins, etc.).
  - XML. Hard to read and maintain.
- Gradle
  - DSL: Relatively self-explanatory, easy to understand & maintain.

### [Installing Gradle](https://app.pluralsight.com/course-player?clipId=98c2df9c-dedd-4f3e-955a-5bccf91f9e5e)

- Installation options
  - Website
    - All platforms

| Option                                                 | Platforms                     |
| ------------------------------------------------------ | ----------------------------- |
| [Website](gradle.org)                                  | All                           |
| SDK Manager (`curl -s "https://get.sdkman.io" | bash`) | \*nix (or Cygwin for Windows) |
| Homebrew                                               | Mac                           |

### [Running Gradle for the First Time](https://app.pluralsight.com/course-player?clipId=78eae5f1-3a44-41c2-8e28-c9643c3d5144)

- The first thing we have to do with Gradle it to create a build script.

  - 2 DSL options:
    - Groovy
      - Traditional.
      - Supported everywhere.
    - Kotlin
      - A typed language, so more IDE help.
  - A build script defines tasks.
    - Build, clean, etc.
  - A build script often contains plugins.
    - Plugins define many tasks.
  - We can then run the tasks from the command line or an IDE.

- A simple (Groovy) build file (`build.gradle`):

  ```groovy
  task 'hello' {
    doLast {
      println "Hello Gradle"
    }
  }
  ```

- Tasks have a lifecycle
  - Configuration phase
  - Initialization phase
- When you define a task, 2 methods are provided:
  - `doFirst`
  - `doLast`
- The task above can be run as follows:

  ```sh
  gradle hello
  ```

### [Initial Use of Plugins]()

### [Using the Gradle Wrapper]()

### [Review]()

## Understanding Projects and Tasks

### [Introduction to Build Files]()

### [Writing Tasks]()

### [Dependencies]()

### [Adding Plugins]()

### [Review]()

## Building Java and Kotlin Projects

### [Introduction]()

### [Basic Java Projects]()

### [Java Build Tasks]()

### [Using Source Sets]()

### [Extending Java Builds]()

### [Building Kotlin Code]()

### [Review]()

## Understanding Gradle Dependency Management

### [Introduction]()

### [File-based Repositories]()

### [Configuration Scopes]()

### [Using Remote Repositories]()

### [The Gradle Cache]()

### [Review]()

## Creating and Managing Multi-project Builds

### [Introduction to Multi-project]()

### [A Simple Multi-project Build]()

### [Configuring Multi-project Builds]()

### [Configuring Multi-project Builds with the Kotlin Build Script]()

### [Using the java-library Plugin and API Scope]()

### [Review]()

## Using Gradle to Manage Testing

### [Introduction]()

### [Testing with JUnit 4]()

### [Improving Logging]()

### [Testing with JUnit 5]()

### [Filtering Tests]()

### [Review]()

## Understanding the Gradle Wrapper and How to Use It

### [Introduction]()

### [Adding the Wrapper]()

### [Using a Build Server]()

### [Extending the Build]()

### [Review]()
