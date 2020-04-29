# [Spring Framework: Spring Fundamentals](https://app.pluralsight.com/library/courses/spring-framework-spring-fundamentals/table-of-contents) (Bryan Hansen, 2019-11-07)

## Course Overview

### [Course Overview](https://app.pluralsight.com/player?course=spring-framework-spring-fundamentals&author=bryan-hansen&name=1439a9c1-60c5-4956-a328-a28f8ede770a&clip=0&mode=live)

## What Is Spring?

### [Introduction](https://app.pluralsight.com/course-player?clipId=5791f49e-b50a-4bf7-8c12-b8f629f3db35)

### [What Is Spring?](https://app.pluralsight.com/course-player?clipId=dada1f08-0d6e-4b14-8b33-32ae34d8b659)

- Inversion of control container
- Dependency injection
- Java without Enterprise JavaBeans (EJBs).

### [Update](https://app.pluralsight.com/course-player?clipId=eb820f09-4649-4438-ac7e-503ffaa65145)

- Reduce complexity of JEE
  - Can be used with or without EJBs.
  - Enabled Java development without an application server.
  - Tomcat _isn't_ an application server, but a web server.
- Completely POJO-based
  - Any code written in Spring can be written without using Spring.
- Unobtrusive.
  - If Spring gets in the way, you're using it wrong.
- AOP/Proxies
  - Consolidate cross-cutting concerns.
- Best practices
  - Singletons, factories, abstract factories, template method, etc. are built-in.

### [The Problem](https://app.pluralsight.com/course-player?clipId=f5fbe426-a5f0-4807-acfa-000afc154c49)

- What problem is Spring trying to solve?
  - Increases testability
  - Increases maintainability
  - Helps with scalability
  - Adds decoupling (enabling caching layers, etc.)
  - Reduces code complexity
  - Puts the focus on the business, helping us get complex code done faster in a more testable, maintainable way.

### [Business Focus](https://app.pluralsight.com/course-player?clipId=644287f1-37c1-443f-8c60-34cccf6f1735)

- JDBC for a simple SELECT:
  - ![jdbc-without-spring](2020-04-29-10-51-09.png)
  - Rather than handling assignments, closing resources, etc., Spring can help us by injecting these into our code.

### [The Solution](https://app.pluralsight.com/course-player?clipId=30610e74-2f2e-4606-ae48-c501f8339223)

- What we're hoping to get from Spring:
  - We can remove configuration/lookup code.
  - Developers can focus on business needs.
  - Our code can focus on testing (much less hard-coding).
  - Helps us do annotation/XML0-based development.
  - Spring encourages development through interfaces.

### [Business Focus Revisited](https://app.pluralsight.com/course-player?clipId=755c7758-02da-4ba5-bd17-b319a7b66677)

- Database query with Spring (using Spring JDBC template code):
  - ![spring-select](2020-04-29-10-55-57.png)
  - Spring is using a template method pattern

### [How It Works](https://app.pluralsight.com/course-player?clipId=3775f3b5-afd8-421b-9904-b908d15dc511)

- Everything is POJOs.
- Spring is basically a glorified HashMap: application context.
- Spring can also be used as a registry.

### [Demo: What We Are Building](https://app.pluralsight.com/course-player?clipId=3ac86b96-9191-439b-9038-bcae2c2c2874)

- Conference Registration App, focusing on the model and writing

### [Summary](https://app.pluralsight.com/course-player?clipId=b5389b55-5baa-40e4-9e89-41a1992a4600)

## Architecture and Project Setup

### [Sample App Intro](https://app.pluralsight.com/course-player?clipId=522ffd33-bcbe-4c8e-82f6-ba0f35722c1b)

### [Architecture](https://app.pluralsight.com/course-player?clipId=a71de5f3-b60c-462d-bef2-a554428f194f)

- Spring was developed to make existing tasks easier.
  - Before Spring, we used design patterns from JEE Blueprints.
    - They helped, but made things brittle.
    - Couldn't WORA: Write Once Run Anywhere.
    - And we ended up hard-coding a lot.

### [Prerequisites](https://app.pluralsight.com/course-player?clipId=18120043-179d-4e21-9b23-864e16190df4)

- Java

  - Using 11 in this course

  ```sh
  # https://mkyong.com/java/how-to-install-java-on-mac-osx/
  # https://github.com/AdoptOpenJDK/homebrew-openjdk
  brew tap adoptopenjdk/openjdk
  brew cask install adoptopenjdk11
  brew cask install adoptopenjdk14
  ## Add jdk function. To change Java versions, run `jdk 11`.
  cat <<\EOT >>~/.profile
  jdk() {
          version=$1
          export JAVA_HOME=$(/usr/libexec/java_home -v"$version");
          java -version
  }
  EOT
  source ~/.profile
  jdk 11
  java --version
  ```

- Maven

  ```sh
  # https://www.code2bits.com/how-to-install-maven-on-macos-using-homebrew/
  brew install maven
  mvn --version
  ```

  - Got output:

    ```txt
    For the system Java wrappers to find this JDK, symlink it with
      sudo ln -sfn /usr/local/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk

    openjdk is keg-only, which means it was not symlinked into /usr/local,
    because it shadows the macOS `java` wrapper.

    If you need to have openjdk first in your PATH run:
      echo 'export PATH="/usr/local/opt/openjdk/bin:$PATH"' >> ~/.zshrc

    For compilers to find openjdk you may need to set:
      export CPPFLAGS="-I/usr/local/opt/openjdk/include"
    ```

- IntelliJ

  ```sh
  brew cask install intellij-idea
  ```

- Tomcat

  - For sample app at the end.

  ```sh
  # https://medium.com/@fahimhossain_16989/installing-apache-tomcat-on-macos-mojave-using-homebrew-28ce039b4b2e
  brew install tomcat
  # brew services start tomcat
  # brew services stop tomcat
  ```

### [Sample App Setup](https://app.pluralsight.com/course-player?clipId=2bb860ad-969e-4e9b-a9be-e74eba0552ce)

- Open IntelliJ > Create New Project
  - Select Project SDK for Java 11
  - Select Maven on the left
  - Groupid: `com.pluralsight`
  - ArtifactID: `conference`
  - Project location: Choose a location (e.g., `~/dev/workspace/conference`)
- Base project:
  - ![base-project](2020-04-29-13-22-51.png)

### [Demo: Sample App pom.xml]()

### [Demo: Sample App Add Model]()

### [Demo: Sample App Add Repository]()

### [Demo: Sample App Fun Application]()

### [Configuration]()

### [Demo: Pain Points Walkthrough]()

### [Spring Download]()

### [Demo: Spring Download Maven]()

### [Summary]()

## Spring Configuration Using Java

## Spring Scopes and Autowiring

## Spring Configuration Using XML

## Advanced Bean Configuration
