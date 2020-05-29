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

### [Initial Use of Plugins](https://app.pluralsight.com/course-player?clipId=cb7e2c13-ea1a-4de1-9fcc-25b5a566ac69)

- An even simpler build script (`build.gradle`): Applying a plugin

  ```groovy
  apply plugin: 'java'
  ```

- Plugins are a way of extending Gradle and introducing tasks to Gradle.
- So now if we run `gradle tasks` (to see a list of tasks), we receive the following outpu:

  ```txt
  > Task :tasks

  ------------------------------------------------------------
  Tasks runnable from root project
  ------------------------------------------------------------

  Build tasks
  -----------
  assemble - Assembles the outputs of this project.
  build - Assembles and tests this project.
  buildDependents - Assembles and tests this project and all projects that depend on it.
  buildNeeded - Assembles and tests this project and all projects it depends on.
  classes - Assembles main classes.
  clean - Deletes the build directory.
  jar - Assembles a jar archive containing the main classes.
  testClasses - Assembles test classes.

  Build Setup tasks
  -----------------
  init - Initializes a new Gradle build.
  wrapper - Generates Gradle wrapper files.

  Documentation tasks
  -------------------
  javadoc - Generates Javadoc API documentation for the main source code.

  Help tasks
  ----------
  buildEnvironment - Displays all buildscript dependencies declared in root project 'gradle-build-tool-fundamentals'.
  components - Displays the components produced by root project 'gradle-build-tool-fundamentals'. [incubating]
  dependencies - Displays all dependencies declared in root project 'gradle-build-tool-fundamentals'.
  dependencyInsight - Displays the insight into a specific dependency in root project 'gradle-build-tool-fundamentals'.
  dependentComponents - Displays the dependent components of components in root project 'gradle-build-tool-fundamentals'. [incubating]
  help - Displays a help message.
  model - Displays the configuration model of root project 'gradle-build-tool-fundamentals'. [incubating]
  outgoingVariants - Displays the outgoing variants of root project 'gradle-build-tool-fundamentals'.
  projects - Displays the sub-projects of root project 'gradle-build-tool-fundamentals'.
  properties - Displays the properties of root project 'gradle-build-tool-fundamentals'.
  tasks - Displays the tasks runnable from root project 'gradle-build-tool-fundamentals'.

  Verification tasks
  ------------------
  check - Runs all checks.
  test - Runs the unit tests.

  Rules
  -----
  Pattern: clean<TaskName>: Cleans the output files of a task.
  Pattern: build<ConfigurationName>: Assembles the artifacts of a configuration.
  Pattern: upload<ConfigurationName>: Assembles and uploads the artifacts belonging to a configuration.

  To see all tasks and more detail, run gradle tasks --all

  To see more detail about a task, run gradle help --task <task>
  ```

  - Note the task categories.
    - Build
    - Build Step
    - Documentation
    - Help
    - Verification

- By convention, Gradle will look for files in the following:
  - src/main
  - src/tests
- We can now build our Java code by running:

  ```sh
  gradle build
  ```

  - Creates classes, a JAR file, and a gradle folder.

- We can run the following to see further information about the other tasks it's running (`compileJava`, `jar`, `classes`, etc.):

  ```sh
  gradle -i build
  ```

- Multiple plugin syntax options. We can use either in this case.

  ```groovy
  // Option 1
  apply plugin: 'java'

  // Option 2
  plugins {
    id 'java'
  }
  ```

### [Using the Gradle Wrapper](https://app.pluralsight.com/course-player?clipId=d04b4f32-8008-4d66-81fb-ff09d3c310f2)

- The Gradle wrapper is another way of installing Gradle.
- We can run the Gradle wrapper task.

  ```sh
  gradle wrapper
  ```

  - This creates the following:
    - `gradlew`
      - Shell script for Unix platforms
    - `gradlew.bat`
      - Batch script for Windows platforms.
    - `gradle/`
    - `gradle/wrapper`
    - `gradle/wrapper/gradle-wrapper.jar`
    - `gradle/wrapper/gradle-wrapper.properties`
  - Now, instead of running Gradle directly, we can use the wrapper:

    ```sh
    ./gradlew build
    ```

    - Downloads a version of Gradle to the local machine.
    - Then uses that version to execute the code.

- This way, we can specify within the project the exact version of Gradle we want to use.

### [Review](https://app.pluralsight.com/course-player?clipId=99525863-3ebb-4dff-b65e-6bda5d8ac338)

## Understanding Projects and Tasks

### [Introduction to Build Files](https://app.pluralsight.com/player?course=gradle-build-tool-fundamentals&author=kevin-jones&name=93f68bdc-25f5-4aab-8f22-ddca35b2842f&clip=0&mode=live)

- Gradle mostly consists of
  - Projects
    - Defined by a build file (`build.gradle` or `build.gradle.kts`.
    - Optional settings file.
  - Tasks
    - Executed as part of a `build.gradle` file.
- A build has 1 or more projects.
  - More complex builds will consist of many projects.
- A project has 1 or more tasks.
  - Some pre-defined tasks.
  - Can add tasks directly or indirectly (through plugins).
- If we create an empty `build.gradle.kts` file and run `gradle tasks`, we see the built-in tasks.

  ```txt
  > Task :tasks

  ------------------------------------------------------------
  Tasks runnable from root project
  ------------------------------------------------------------

  Build Setup tasks
  -----------------
  init - Initializes a new Gradle build.
  wrapper - Generates Gradle wrapper files.

  Help tasks
  ----------
  buildEnvironment - Displays all buildscript dependencies declared in root project 'gradle-build-tool-fundamentals'.
  components - Displays the components produced by root project 'gradle-build-tool-fundamentals'. [incubating]
  dependencies - Displays all dependencies declared in root project 'gradle-build-tool-fundamentals'.
  dependencyInsight - Displays the insight into a specific dependency in root project 'gradle-build-tool-fundamentals'.
  dependentComponents - Displays the dependent components of components in root project 'gradle-build-tool-fundamentals'. [incubating]
  help - Displays a help message.
  model - Displays the configuration model of root project 'gradle-build-tool-fundamentals'. [incubating]
  outgoingVariants - Displays the outgoing variants of root project 'gradle-build-tool-fundamentals'.
  projects - Displays the sub-projects of root project 'gradle-build-tool-fundamentals'.
  properties - Displays the properties of root project 'gradle-build-tool-fundamentals'.
  tasks - Displays the tasks runnable from root project 'gradle-build-tool-fundamentals'.
  ```

  - 2 types of tasks
    - Setup
      - wrapper
      - init
        - Allows us to initialize a project in a given runtime environment (e.g., a Java application).
    - Help

### [Writing Tasks](https://app.pluralsight.com/course-player?clipId=60f4a642-3cfa-4c01-ba88-f141e0747a3a)

- Build phases
  - Initialization
    - Gradle looks up which project will be part of this build (e.g., in a multi-project build).
  - Configuration
    - Execute the build scripts of all the project that are part of this build.
  - Execution
    - Figure out which tasks should be executed (by the task name passed to Gradle via the command line).
    - Execution phases
      - `doFirst` closure
        - Things that execute at the start of the task execution.
      - `doLast` closure
        - Things that execute at the end of the task execution.
      - Can specify conditions also.
- A simple hello task:

  ```groovy
  task hello {
    doFirst {
      print 'Hello'
    }

    doLast {
      println(', World')
    }
  }
  ```

- Then if we run `gradle hello`, it prints `Hello, World`.

  ```kts
  // Kotlin has a tasks collection.
  tasks.register("hello") {
    doFirst {
      print("Hello")
    }

    doLast {
      println(", Gradle")
    }
  }
  ```

- Run `gradle hello`, &rarr; `Hello, Gradle`.

### [Dependencies](https://app.pluralsight.com/course-player?clipId=e2ac148e-8fde-4053-a587-86f945ff267e)

- Tasks can have dependencies (and these dependencies can have dependencies).

  - So we can have a hierarchy of dependencies.

- With Kotlin:

  ```kts
  tasks.register("hello") {
    doLast {
      println("Hello, ")
    }
  }

  tasks.register("world") {
    doLast {
      println(" World")
    }
  }
  ```

  - Running `gradle world` prints `World`.

  ```kts
  tasks.register("hello") {
    doLast {
      println("Hello, ")
    }
  }

  tasks.register("world") {

    dependsOn("hello")

    doLast {
      println(" World")
    }
  }
  ```

  - Now, running `gradle world` prints `Hello,` and `World`.

- With Groovy:

  ```groovy
  task hello {
    doLast {
      println 'Hello, '
    }
  }

  task world {

    dependsOn hello

    doLast {
      println(' World')
    }
  }
  ```

- Note that `doFirst` and `doLast` execute within each task.

  ```kts
  tasks.register("hello") {
    doFirst {
      println("Hel")
    }

    doLast {
      println("lo, ")
    }
  }

  tasks.register("world") {

    dependsOn("hello")

    doFirst {
      println(" Wo")
    }

    doLast {
      println("rld")
    }
  }
  ```

  ```txt
  > Task :hello
  Hel
  lo,

  > Task :world
  Wo
  rld
  ```

### [Adding Plugins](https://app.pluralsight.com/course-player?clipId=295e944e-e172-4460-8ee6-48232f98e133)

- A plugin extends the project's capabilities in some way.
- Kotlin

  ```kts
  plugins { java }
  ```

- Groovy

  ```groovy
  // Option 1
  plugins { id 'java' } // preferred

  // Option 2
  apply plugin: 'java'
  ```

- Java is a well-known tool, so we don't need to provide any further information about it.
- But what if we wanted to use a community plugin that we can't simply add by name (i.e., where we have to supply a version)?

  - Then we need the fully-qualified name of the plugin and the version.

  ```groovy
  plugins {
    id 'java'
    id "org.flywaydb.flyway" version "6.3.2"
  }
  ```

  ```kts
  plugins {
    java
    id("org.flywaydb.flyway") version "6.3.2"
  }
  ```

  - Now if we run `gradle tasks`, it will try to download all the dependencies and plugins.

### [Review](https://app.pluralsight.com/course-player?clipId=a0e5f606-9033-492f-bf7f-a1ab19a27856)

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
