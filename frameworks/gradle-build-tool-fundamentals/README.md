# [Gradle Build Tool Fundamentals](https://app.pluralsight.com/library/courses/gradle-build-tool-fundamentals/table-of-contents) (2020-04-15, Kevin Jones)

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

### [Introduction](https://app.pluralsight.com/course-player?clipId=fc212c04-24d2-46be-a7af-339a49f8b01c)

- How do we create a build?
  - We create a build file.
  - We then apply the appropriate plugin(s).
  - And then we override tasks and properties as needed.
- Java plugin

  - Base plugin
    - `java`
    - `java-library`
      - We use this if we're building libraries (vs. applications).
      - We'll talk about some of the subtleties later, such as specifying the APIs it uses.
    - `application`
      - Gives the ability to run the application within Gradle.
      - Implicitly applies the `distribution` plugin.
  - The java plugin expects to find source code in standard locations.

    - Can change this using SourceSets.
    - Standard code layout (same as Maven):
      - `src/`
        - `main/`
          - `java/`
          - `kotlin/`
          - `resources/`
        - `test/`
          - `java/`
          - `kotlin/`
          - `resources/`
    - If you need to change the structure (to support a non-standard layout), you can use SourceSets.

    ```groovy
    sourceSets {
      main {
        java {
          srcDir 'src/java'
        }
        resources {
          srcDir 'src/resources'
        }
      }
    }
    ```

### [Basic Java Projects](https://app.pluralsight.com/course-player?clipId=7d018456-6c73-45fd-8f75-5ee39c69fe13)

- Working directory: `groovy/jacket/Repository`
- Starting `build.gradle`:

  ```groovy
  plugins {
      id 'java'
  }
  ```

  ```sh
  # Run build (2 tasks).
  gradle build
  # Creates a build directory (and build/libs/Repository.jar).

  # Run clean then build.
  gradle clean
  gradle build

  # Same as above (3 tasks).
  gradle clean build

  # Clean.
  gradle clean
  # Print information-level logging.
  gradle build -i
  ```

### [Java Build Tasks](https://app.pluralsight.com/course-player?clipId=a1fa6764-a49d-46ca-ab3a-e47edd0a0998)

- Working directory: `groovy/jacket/Repository`
- To more closely examine the output: `gradle clean && gradle build -i > build.txt`
  - We ran the build task, which as a bunch of dependent tasks.
    - :compileJava
      - Runs
    - :processResources
      - Skipped because it has no source files.
    - :classes
      - :classes is a lifecycle task. It depends on :compileJava and :processResources, so it forces those other 2 to run.
      - Skipped because it has no actions
    - :jar
      - Part of the java plugin.
      - The java plugin depends on this. It's the Java-specific task that assembles files together.
    - :assemble
      - The java plugin depends on this. It's a general purpose base task that assembles files together.
      - In this case, :assemble is synonymous with :jar. Skipped because it has no actions.
    - :compileTestJava
      - Skipped because there are no test sources to compile.
    - :processTestResources
      - Skipped because there are no test resources.
    - :testClasses
      - No test classes
    - :test
      - No tests to run
    - :check
    - :build
      - Completes
- Working directory: `kts/jacket/Repository`

  ```kts
  plugins {
      java
  }

  version = "1.0-SNAPSHOT"
  ```

  - Now running `gradle build` produces `build/libs/Repository-1.0-SNAPSHOT.jar`.

### [Using Source Sets](https://app.pluralsight.com/course-player?clipId=4c4e0a41-2333-4e73-b4ba-28415151e247)

- In `groovy/SecurityTools.Java`, it does not follow a standard format (i.e., no `src/main/`). Instead, the Java files are at `src/com/pluralsight/security`.

  - Starting `build.gradle`:

    ```groovy
    plugins {
      id 'java'
    }

    // Reference local files as dependencies.
    dependencies {
      implementation files ('lib/log4j-1.2.8.jar', 'lib/junit-3.8.1.jar', 'lib/jaxb-api-2.3.1.jar')
    }
    ```

  - If we run the build task right now, it doens't know where to find the classes.
  - So we can specify `sourceSets`:

    ```groovy
    sourceSets {
      main {
        java {
          srcDir 'src'
        }
      }
      test {
        java {
          srcDir 'test/src'
        }
      }
    }
    ```

  - Now if we run `gradle build`, the `:compileJava` task runs and we get the classes in the JAR file.
  - If we change the `java` plugin to the `application` plugin (which derives from the java plugin) and run `gradle tasks`, there's a new task: `run`.

    - It will treat the Java code as an application, running any main method.
    - So we have to specify the main class.

    ```groovy
    // mainClassName is a property brought in by the application plugin
    mainClassName = 'com.pluralsight.security.Hash'
    ```

  - So now if we run `gradle run`, it executes that main class.

- Working directory: `kts/SecurityTools.Java`:

  - `build.gradle.kts`:

    ```kts
    plugins {
      application
    }

    sourceSets {
      main {
        java {
          setSrcDirs(listOf("src"))
        }
      }
      test {
        java {
          setSrcDirs(listOf("test/src"))
        }
      }
    }

    application {
        mainClassName = "com.pluralsight.security.Hash"
    }

    dependencies {
      implementation(files ("lib/log4j-1.2.8.jar", "lib/junit-3.8.1.jar", "lib/jaxb-api-2.3.1.jar"))
    }
    ```

### [Extending Java Builds](https://app.pluralsight.com/course-player?clipId=265034a9-4cf5-4f4b-9f13-2e8e6de4b3eb)

- The java plugin is highly configurable.
- Working directory: `groovy/SecurityTools.Java`

  - If we're currently running Java 11 but we don't want to use all the facilities of Java 11, we can specify the target Java version in the build file.

    ```groovy
    // The java block lets us configure the java plugin (and the application plugin).
    java {
      sourceCompatibility = JavaVersion.VERSION_1_8
      // If targetCompatibility is not set, it defaults to the same version as sourceCompatibility.
      targetCompatibility = JavaVersion.VERSION_1_1
    }
    ```

    - So if we were to use a `var`, for instance, we'd get a build error due to incompatibility with Java 8.

  - We can generate Javadocs via `gradle javadoc`.

    - So now we have `build/docs/javadoc`.
      - Opening `index.html` pull up the standard Javadocs.

  - We can add `withJavadocJar()` and `withSourcesJar()` so that, when we publish the project, we can publish it with the Javadocs and the sources if we need to.

    ```groovy
    java {
      sourceCompatibility = JavaVersion.VERSION_1_8
      targetCompatibility = JavaVersion.VERSION_1_8
      withJavadocJar()
      withSourcesJar()
    }
    ```

  - So now `gradle build` produces 3 JAR files in `build/libs`:
    - `SecurityTools.Java.jar`
      - Standard JAR file.
    - `SecurityTools.Java-javadoc.jar`
      - Javadoc JAR file.
    - `SecurityTools.Java-sources.jar`
      - Sources JAR file.

- Working directory: `kts/SecurityTools.Java`

  ```kts
  plugins {
    application
  }

  java {
    sourceCompatibility = JavaVersion.VERSION_1_8
    targetCompatibility = JavaVersion.VERSION_1_8
    withJavadocJar()
    withSourcesJar()
  }

  sourceSets {
    main {
      java {
        setSrcDirs(listOf("src"))
      }
    }
    test {
      java {
        setSrcDirs(listOf("test/src"))
      }
    }
  }

  application {
      mainClassName = "com.pluralsight.security.Hash"
  }

  dependencies {
    implementation(files ("lib/log4j-1.2.8.jar", "lib/junit-3.8.1.jar", "lib/jaxb-api-2.3.1.jar"))
  }
  ```

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
