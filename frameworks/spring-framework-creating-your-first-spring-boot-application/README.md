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

### [Introduction](https://app.pluralsight.com/course-player?clipId=c2ec0a13-8324-466a-b309-0109a57f2c76)

- Our conference scheduling app will include:
  - Spring MVC
  - Spring Data JPA
  - JPA
  - A relational database (PostgreSQL)
- A full-stack Spring microservice app (though no GUI)

### [Application Overview](https://app.pluralsight.com/course-player?clipId=6759e7a8-d989-49e5-905b-20872aecbf97)

### [Setting up the Database](https://app.pluralsight.com/course-player?clipId=2e2b265c-fff4-497a-8d76-e5bfc0364761)

- Database ERD
  - ![erd](2020-05-01-16-58-42.png)
- [github.com/dlbunker/ps-first-spring-boot-app](https://github.com/dlbunker/ps-first-spring-boot-app)

  - Can proceed with a local PostgreSQL instance or Docker.
  - Local PostgreSQL instance.

    - Note: Found this to work better in terms of port mapping, etc. Did _not_ need username or password specified in `application.properties`.

    ```sh
    # See https://github.com/ehelander/modern-apis/blob/master/frameworks/building-scalable-apis-with-graphql/building-scalable-apis-with-graphql.md#introduction-2
    # Start postgres.
    brew services start postgres
    # Create conference_app DB.
    createdb conference_app
    # Create tables & load data.
    psql conference_app < create_tables.sql
    psql conference_app < insert_data.sql
    # Begin psql shell.
    psql conference_app
    # Ensure data is in session table.
    select * from sessions;
    # Quit psql shell.
    \q
    ```

  - Docker:

    - Install Docker

      ```sh
      # Install Docker
      brew install cask docker
      # Open Docker to create symbolic links
      open /Applications/Docker.app
      ```

    - Create & run Docker container; create database.

      ```sh
      # Create Docker container with PostgreSQL database.
      docker create --name postgres-demo -e POSTGRES_PASSWORD=Welcome -p 5432:5432 postgres:11.5-alpine
      # Start container.
      docker start postgres-demo

      # Connect to psql prompt from Docker.
      docker exec -it postgres-demo psql -U postgres

      # Create database.
      create database conference_app;

      # List databases.
      \l

      # Use conference_app database.
      \c conference_app
      ```

    - Create tables & insert data

      ```sh
      cd ps-first-spring-boot-app/database/postgresql
      docker cp create_tables.sql postgres-demo:/create_tables.sql
      docker exec -it postgres-demo psql -d conference_app -f create_tables.sql -U postgres

      docker cp insert_data.sql postgres-demo:/insert_data.sql
      docker exec -it postgres-demo psql -d conference_app -f insert_data.sql -U postgres
      ```

    - Stop container

      ```sh
      # Stop container
      docker stop postgres-demo
      ```

    - Connection info:
      - JDBC URL: `jdbc:postgresql://localhost:5432/conference_app`
      - Username: `postgres`
      - Password: `Welcome`

- Recommended database client: [Postico](https://eggerapps.at/postico/)

  ```sh
  brew cask install postico
  ```

### [Demo: Connecting to the Database](https://app.pluralsight.com/course-player?clipId=1d370eee-b668-4cdc-abd9-1ba7f198544c)

- Need to add a starter dependency that will include the Spring Data JPA library, and then connect it to PostgreSQL.
- `pom.xml`

  - Add the following dependencies below `spring-boot-starter-web` (and import the Maven changes):

    ```xml
        <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <dependency>
          <groupId>org.postgresql</groupId>
          <artifactId>postgresql</artifactId>
          <scope>runtime</scope>
        </dependency>
    ```

- Tell Spring Boot the database connection string.

  - `src/main/resources/application.properties`

    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/conference_app
    spring.datasource.username=postgres
    spring.datasource.password=Welcome
    spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
    spring.jpa.hibernate.ddl-auto=none
    spring.jpa.hibernate.show-sql=true
    ```

### [Demo: Creating JPA Models](https://app.pluralsight.com/course-player?clipId=d1dea5c6-6bae-41a0-88cf-752f27dd3519)

- Next step: Apply some JPA entities so we can talk to the database.
- Right click `src/main/java/com.pluralsight.conferencedemo/models` > New > Java Class

  - `Session.java`

    - Add annotation: `@Entity(name="sessions")`
    - Note that we're using plural `sessions` in the entity name because that is the name of our database table, whereas the class is singular because it will be one row or instance of that data.
    - ![sessions](2020-05-01-21-02-03.png)
    - Add default constructors to all entities.
      - Helps with serialization and deserialization (when plugging in controllers).
    - Add variables for our columns.
      - Keeping the case and spelling the same (i.e., snake_case vs. normal Java camelCase) as the database columns allows JPA to automatically bind to them.
        - Otherwise, we'd need to add an @Column annotation to each.
      - We need to add the `@Id` annotation to tell JPA which key is the primary key.
      - And `@GeneratedValue(strategy = GenerationType.IDENTITY)` tells JPA how the primary key gets populated on a new insert.
        - With `strategy = GenerationType.IDENTITY`, JPA will use the PostgreSQL-generated value.
      - Generate getters & setters.

    ```java
    package com.pluralsight.conferencedemo.models;

    import javax.persistence.Entity;
    import javax.persistence.GeneratedValue;
    import javax.persistence.GenerationType;
    import javax.persistence.Id;

    @Entity(name="sessions")
    public class Session {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long session_id;
        private String session_name;
        private String session_description;
        private Integer session_length;

        public Session() {}

        public Long getSession_id() {
            return session_id;
        }

        public void setSession_id(Long session_id) {
            this.session_id = session_id;
        }

        public String getSession_name() {
            return session_name;
        }

        public void setSession_name(String session_name) {
            this.session_name = session_name;
        }

        public String getSession_description() {
            return session_description;
        }

        public void setSession_description(String session_description) {
            this.session_description = session_description;
        }

        public Integer getSession_length() {
            return session_length;
        }

        public void setSession_length(Integer session_length) {
            this.session_length = session_length;
        }
    }
    ```

  - Add a `Speaker` entity:

    ```java
    package com.pluralsight.conferencedemo.models;

    import javax.persistence.Entity;
    import javax.persistence.GeneratedValue;
    import javax.persistence.GenerationType;
    import javax.persistence.Id;

    @Entity(name = "speakers")
    public class Speaker {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long speaker_id;

        private String first_name;
        private String last_name;
        private String title;
        private String company;
        private String speaker_bio;

        public Speaker() {}

        public Long getSpeaker_id() {
            return speaker_id;
        }

        public void setSpeaker_id(Long speaker_id) {
            this.speaker_id = speaker_id;
        }

        public String getFirst_name() {
            return first_name;
        }

        public void setFirst_name(String first_name) {
            this.first_name = first_name;
        }

        public String getLast_name() {
            return last_name;
        }

        public void setLast_name(String last_name) {
            this.last_name = last_name;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getCompany() {
            return company;
        }

        public void setCompany(String company) {
            this.company = company;
        }

        public String getSpeaker_bio() {
            return speaker_bio;
        }

        public void setSpeaker_bio(String speaker_bio) {
            this.speaker_bio = speaker_bio;
        }
    }
    ```

### [Demo: Working with JPA Relationships](https://app.pluralsight.com/course-player?clipId=5b55594b-84fe-43fd-9bd7-8a1158b0b1bc)

- Now we'll tie our Session and our Speaker together in a JPA relationship that will match their relationship in the database.
  - In the databse, they're connected by a union or join table. So we'll need a many-to-many relationship.
- We need to pick one side to be the owner or main definition point of the relationship. We'll use the `src/main/java/com.pluralsight.conference/models/Session` class.

  - Start by adding a `private List<Speaker> speakers;` list.
  - Add a getter and setter.
  - Then define the relationship.
    - `@ManyToMany`
      - Setting up a many-to-many relationship.
    - `@JoinTable`
      - Defines the join table and the foreign key columns.
  - Now JPA will set up the SQL the join automatically when calling the speakers attribute.

  ```java
  package com.pluralsight.conferencedemo.models;

  import javax.persistence.*;
  import java.util.List;

  @Entity(name = "sessions")
  public class Session {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long session_id;

      private String session_name;
      private String session_description;
      private Integer session_length;

      @ManyToMany
      @JoinTable(
              name = "session_speakers",
              joinColumns = @JoinColumn(name = "session_id"),
              inverseJoinColumns = @JoinColumn(name = "speaker_id")
      )
      private List<Speaker> speakers;

      public Session() {}

      public List<Speaker> getSpeakers() {
          return speakers;
      }

      public void setSpeakers(List<Speaker> speakers) {
          this.speakers = speakers;
      }

      public Long getSession_id() {
          return session_id;
      }

      public void setSession_id(Long session_id) {
          this.session_id = session_id;
      }

      public String getSession_name() {
          return session_name;
      }

      public void setSession_name(String session_name) {
          this.session_name = session_name;
      }

      public String getSession_description() {
          return session_description;
      }

      public void setSession_description(String session_description) {
          this.session_description = session_description;
      }

      public Integer getSession_length() {
          return session_length;
      }

      public void setSession_length(Integer session_length) {
          this.session_length = session_length;
      }
  }
  ```

- And in `Speaker`:

  - We need to define the many-to-many relationship here also (to make it bi-directional).
  - Since we defined the nature of the mapping on `Session`, we can just specify `@ManyToMany(mappedBy = "speakers")` here.

  ```java
  package com.pluralsight.conferencedemo.models;

  import javax.persistence.*;
  import java.util.List;

  @Entity(name = "speakers")
  public class Speaker {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long speaker_id;

      private String first_name;
      private String last_name;
      private String title;
      private String company;
      private String speaker_bio;

      @ManyToMany(mappedBy = "speakers")
      private List<Session> sessions;

      public Speaker() {}

      public List<Session> getSessions() {
          return sessions;
      }

      public void setSessions(List<Session> sessions) {
          this.sessions = sessions;
      }

      public Long getSpeaker_id() {
          return speaker_id;
      }

      public void setSpeaker_id(Long speaker_id) {
          this.speaker_id = speaker_id;
      }

      public String getFirst_name() {
          return first_name;
      }

      public void setFirst_name(String first_name) {
          this.first_name = first_name;
      }

      public String getLast_name() {
          return last_name;
      }

      public void setLast_name(String last_name) {
          this.last_name = last_name;
      }

      public String getTitle() {
          return title;
      }

      public void setTitle(String title) {
          this.title = title;
      }

      public String getCompany() {
          return company;
      }

      public void setCompany(String company) {
          this.company = company;
      }

      public String getSpeaker_bio() {
          return speaker_bio;
      }

      public void setSpeaker_bio(String speaker_bio) {
          this.speaker_bio = speaker_bio;
      }
  }
  ```

### [Demo: Working with Binary Data Types](https://app.pluralsight.com/course-player?clipId=81f08dde-217a-45ac-80c6-a7aaf8235039)

- In `Speaker` entity:

  - We need to handle binary photo data.
  - Add a `private byte[] speaker_photo;` property.
    - A byte array is well-suited for binary data in Java.
  - Generate getters and setters.
  - Add annotations:
    - `@Lob`
      - Large object. Binary data can get quite large. Providing this annotation helps JPA deal with the large data.
    - `@Type(type="org.hibernate.type.BinaryType")`
      - Helps Hibernate deal with binary data.
      - Hibernate is the JPA implementation we're using under the covers.
      - Without this annotation, we'd end up with an exception.

  ```java
  package com.pluralsight.conferencedemo.models;

  import org.hibernate.annotations.Type;

  import javax.persistence.*;
  import java.util.List;

  @Entity(name = "speakers")
  public class Speaker {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long speaker_id;

      private String first_name;
      private String last_name;
      private String title;
      private String company;
      private String speaker_bio;

      @Lob
      @Type(type="org.hibernate.type.BinaryType")
      private byte[] speaker_photo;

      @ManyToMany(mappedBy = "speakers")
      private List<Session> sessions;

      public Speaker() {}

      public byte[] getSpeaker_photo() {
          return speaker_photo;
      }

      public void setSpeaker_photo(byte[] speaker_photo) {
          this.speaker_photo = speaker_photo;
      }

      public List<Session> getSessions() {
          return sessions;
      }

      public void setSessions(List<Session> sessions) {
          this.sessions = sessions;
      }

      public Long getSpeaker_id() {
          return speaker_id;
      }

      public void setSpeaker_id(Long speaker_id) {
          this.speaker_id = speaker_id;
      }

      public String getFirst_name() {
          return first_name;
      }

      public void setFirst_name(String first_name) {
          this.first_name = first_name;
      }

      public String getLast_name() {
          return last_name;
      }

      public void setLast_name(String last_name) {
          this.last_name = last_name;
      }

      public String getTitle() {
          return title;
      }

      public void setTitle(String title) {
          this.title = title;
      }

      public String getCompany() {
          return company;
      }

      public void setCompany(String company) {
          this.company = company;
      }

      public String getSpeaker_bio() {
          return speaker_bio;
      }

      public void setSpeaker_bio(String speaker_bio) {
          this.speaker_bio = speaker_bio;
      }
  }
  ```

- Back in `src/main/resources/application.properties`, add `spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true`
  - Needed so the PostgreSQL JDBC driver can create Lob data correctly on the Java side.
  - Would encounter exceptions otherwise.

### [Demo: Creating JPA Repositories](https://app.pluralsight.com/course-player?clipId=813fea5b-eeaf-4b61-a98e-22d5a8f71395)

- Once entities are in place, we have a few options for how to handle our data access layer.
  - Spring Data JPA provides many out-of-the box benefits.
- `pom.xml`
  - Adding the `spring-boot-starter-data-jpa` pulls in the libraries necessary for us to get started with JPA repos.
- Add Java Interface: `src/main/java/com.pluralsight.conference/repositories/SessionRepository`.

  - To make it a JPA repository:
    - `extends JpaRepository<Session, Long>`
      - `Session`: Data type
      - `Long`: Primary key
    - So now we have find, update, save, delete, etc., set up on our Session JPA class.

  ```java
  package com.pluralsight.conferencedemo.repositories;

  import com.pluralsight.conferencedemo.models.Session;
  import org.springframework.data.jpa.repository.JpaRepository;

  public interface SessionRepository extends JpaRepository<Session, Long> {
  }
  ```

- Add Java Interface: `src/main/java/com.pluralsight.conference/repositories/SpeakerRepository`.

  ```java
  package com.pluralsight.conferencedemo.repositories;

  import com.pluralsight.conferencedemo.models.Speaker;
  import org.springframework.data.jpa.repository.JpaRepository;

  public interface SpeakerRepository extends JpaRepository<Speaker, Long> {
  }
  ```

### [Demo: Creating Spring API REST Controllers - Part 1](https://app.pluralsight.com/course-player?clipId=4715f7b8-c4f4-4854-8bac-8f427a17c8d1)

- Controllers will handle our API endpoints.
- New Java Class: `src/main/java/com.pluralsight.conference/controllers/SessionsController`

  - Add annotations to tell Spring this is a controller.
    - `@RestController`
      - This will respond to payloads incoming and outgoing as JSON REST endpoints.
    - `@RequestMapping("/api/v1/sessions")`
      - Tells the router what the mapping URL is.
  - Autowire `SessionRepository`: When a `SessionsController` is created, an instance of `SessionRepository` is created and added automatically.
  - By default, the REST controller will return 200s for all statuses.
    - One way to override: `@ResponseStatus(HttpStatus.CREATED)` &rarr; returns a 201 instead (but we'll just leave these all as the 200 defaults for now).
  - `list()`
    - `@GetMapping`
      - When a call is made to `/api/v1/sessions`, this maps the HTTP GET verb to this method.
    - We can call `findAll()` on `sessionRepository` because it's a JPA repository.
    - The method returns a `List` of `Session` objects.
      - Spring MVC will pass this to Jackson (a serialization library) which will turn these Session objects into JSON and return that back to the caller.
  - `get()`
    - Return a specific session.
    - `@GetMapping`
      - Map the GET verb to this method.
    - `@RequestMapping("{id}")`
      - In addition to the class-level request mapping.
        - So now we're actually mapping `/api/v1/sessions/{id}`
    - Since we have `Long` data types for our primary key, we'll marshall it into a `Long`.
    - Again, the `sessionRepository` has auto-built `getOne()`.
    - And with Spring MVC we can automarshall the return value into a `Session` that gets returned to the caller as a JSON payload.

  ```java
  package com.pluralsight.conferencedemo.controllers;

  import com.pluralsight.conferencedemo.models.Session;
  import com.pluralsight.conferencedemo.repositories.SessionRepository;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.web.bind.annotation.*;

  import java.util.List;

  @RestController
  @RequestMapping("/api/v1/sessions")
  public class SessionsController {
      @Autowired
      private SessionRepository sessionRepository;

      @GetMapping
      public List<Session> list() {
          return sessionRepository.findAll();
      }

      @GetMapping
      @RequestMapping("{id}")
      public Session get(@PathVariable Long id) {
          return sessionRepository.getOne(id);
      }
  }
  ```

- New Java Class: `src/main/java/com.pluralsight.conference/controllers/SpeakerssController`

  ```java
  package com.pluralsight.conferencedemo.controllers;

  import com.pluralsight.conferencedemo.models.Speaker;
  import com.pluralsight.conferencedemo.repositories.SpeakerRepository;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.PathVariable;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RestController;

  import java.util.List;

  @RestController
  @RequestMapping("/api/v1/speakers")
  public class SpeakersController {
      @Autowired
      private SpeakerRepository speakerRepository;

      @GetMapping
      public List<Speaker> list() {
          return speakerRepository.findAll();
      }

      @GetMapping
      @RequestMapping("{id}")
      public Speaker get(@PathVariable Long id) {
          return speakerRepository.getOne(id);
      }
  }
  ```

### [Demo: Creating Spring API REST Controllers - Part 2](https://app.pluralsight.com/course-player?clipId=524195a9-b8bc-4fe9-93b0-221215cbee28)

- Now for create, update, delete.
- `SessionsController`:

  ```java
  package com.pluralsight.conferencedemo.controllers;

  import com.pluralsight.conferencedemo.models.Session;
  import com.pluralsight.conferencedemo.repositories.SessionRepository;
  import org.springframework.beans.BeanUtils;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.web.bind.annotation.*;

  import java.util.List;

  @RestController
  @RequestMapping("/api/v1/sessions")
  public class SessionsController {
      @Autowired
      private SessionRepository sessionRepository;

      @GetMapping
      public List<Session> list() {
          return sessionRepository.findAll();
      }

      @GetMapping
      @RequestMapping("{id}")
      public Session get(@PathVariable Long id) {
          return sessionRepository.getOne(id);
      }

      // Map the POST verb to this method.
      @PostMapping
      // Spring MVC is taking in all the attributes in the JSON payload and marshalling them into a Session object.
      public Session create(@RequestBody final Session session) {
          // When working with JPA & entities, you can save an object as you're working with it, but it doesn't get committed to the database until you flush.
          return sessionRepository.saveAndFlush(session);
      }

      // Add /{id} to the path.
      // Map the HTTP DELETE verb to this method. Spring only provides @GetMappings and @PostMappings, so we must specify it this way.
      @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
      public void delete(@PathVariable Long id) {
          // TODO: Check for children records before deleting. (Need to handle cascading deletes anytime working with JPA.)
          sessionRepository.deleteById(id);
      }

      @RequestMapping(value = "{id}", method = RequestMethod.PUT)
      public Session update(@PathVariable Long id, @RequestBody Session session) {
          // Because this is a PUT, we expect all attributes to be passed in.
          // TODO: Validate that all attributes are passed in. Otherwise, return a 400.
          // In order to update an existing record, we first need to retrieve the session object currently associated with that id.
          Session existingSession = sessionRepository.getOne(id);
          // Copy properties from the new object onto the old one. But don't copy the session_id, because that's the PK and we don't want to replace it (i.e., we don't want a null PK). Non-existent properties on the incoming session will be copied as null.
          BeanUtils.copyProperties(session, existingSession, "session_id");
          return sessionRepository.saveAndFlush(existingSession);
      }
  }
  ```

- `SpeakersController`:

  ```java
  package com.pluralsight.conferencedemo.controllers;

  import com.pluralsight.conferencedemo.models.Speaker;
  import com.pluralsight.conferencedemo.repositories.SpeakerRepository;
  import org.springframework.beans.BeanUtils;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.web.bind.annotation.*;

  import java.util.List;

  @RestController
  @RequestMapping("/api/v1/speakers")
  public class SpeakersController {
      @Autowired
      private SpeakerRepository speakerRepository;

      @GetMapping
      public List<Speaker> list() {
          return speakerRepository.findAll();
      }

      @GetMapping
      @RequestMapping("{id}")
      public Speaker get(@PathVariable Long id) {
          return speakerRepository.getOne(id);
      }

      @PostMapping
      public Speaker create(@RequestBody Speaker speaker) {
          return speakerRepository.saveAndFlush(speaker);
      }

      @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
      public void delete(@PathVariable Long id) {
          // TODO: Check for children records before deleting. (Need to handle cascading deletes anytime working with JPA.)
          speakerRepository.deleteById(id);
      }

      @RequestMapping(value = "{id}", method = RequestMethod.PUT)
      public Speaker update(@PathVariable Long id, @RequestBody Speaker speaker) {
          // TODO: Validate that all attributes are passed in. Otherwise, return a 400.
          Speaker existingSpeaker = speakerRepository.getOne(id);
          BeanUtils.copyProperties(speaker, existingSpeaker, "speaker_id");
          return speakerRepository.saveAndFlush(existingSpeaker);
      }
  }
  ```

### [Demo: Handling Serialization Issues and Running the App](https://app.pluralsight.com/course-player?clipId=63956c4e-bb7c-4975-b85e-c2a438a616b4)

- Right click on `ConferenceDemoApplication` > `Run`.

  - Note: Had to change `pom.xml` to use Java version 1.8.

    ```xml
    <properties>
      <java.version>1.8</java.version>
    </properties>
    ```

- Our application is started on port `8080`.
- In Postman:
  - GET `http://localhost:8080/api/v1/sessions`
- Right now, we have a serialization problem: We're getting a bunch of nested data.
  - It's looping cyclically over our many-to-many relationship.
- To handle this cyclical looping, we can either add annotations in our entities, or create DTOs (data transfer objects). Here, we'll deal with serialization issues on our models instead of using DTOs.
- In `Session.java`:
  - `@ManyToMany` is causing the problem.
  - Since we defined Session as the dominant side, we'll leave this alone.
- In `Speaker.java`:

  - Add a new annotation: `@JsonIgnore` (from `com.fasterxml.jackson.annotation.JsonIgnore`) below `@ManyToMany`.
    - Jackson will ignore this when it goes to reload the sessions.

  ```java
  package com.pluralsight.conferencedemo.models;

  import com.fasterxml.jackson.annotation.JsonIgnore;
  import org.hibernate.annotations.Type;

  import javax.persistence.*;
  import java.util.List;

  @Entity(name = "speakers")
  public class Speaker {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long speaker_id;

      private String first_name;
      private String last_name;
      private String title;
      private String company;
      private String speaker_bio;

      @Lob
      @Type(type="org.hibernate.type.BinaryType")
      private byte[] speaker_photo;

      @ManyToMany(mappedBy = "speakers")
      @JsonIgnore
      private List<Session> sessions;

      public Speaker() {}

      public byte[] getSpeaker_photo() {
          return speaker_photo;
      }

      public void setSpeaker_photo(byte[] speaker_photo) {
          this.speaker_photo = speaker_photo;
      }

      public List<Session> getSessions() {
          return sessions;
      }

      public void setSessions(List<Session> sessions) {
          this.sessions = sessions;
      }

      public Long getSpeaker_id() {
          return speaker_id;
      }

      public void setSpeaker_id(Long speaker_id) {
          this.speaker_id = speaker_id;
      }

      public String getFirst_name() {
          return first_name;
      }

      public void setFirst_name(String first_name) {
          this.first_name = first_name;
      }

      public String getLast_name() {
          return last_name;
      }

      public void setLast_name(String last_name) {
          this.last_name = last_name;
      }

      public String getTitle() {
          return title;
      }

      public void setTitle(String title) {
          this.title = title;
      }

      public String getCompany() {
          return company;
      }

      public void setCompany(String company) {
          this.company = company;
      }

      public String getSpeaker_bio() {
          return speaker_bio;
      }

      public void setSpeaker_bio(String speaker_bio) {
          this.speaker_bio = speaker_bio;
      }
  }
  ```

- Restart server. (Note restart button on top toolbar.)
  - Now we get a list.
- If we try to GET `http://localhost:8080/api/v1/sessions/2`, we encounter another Spring/Hibernate serialization issue.
- In `Session.java`:

  - Add `@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})` below `@Entity(name = "sessions")`
    - When you create an entity with a relationship, Hibernate adds a few stub methods to handle lazy & eager loading of data. When you go to serialize a Hibernate object, you don't want to serialize this: it will try to load in all your relational data and cause exceptions.

  ```java
  @Entity(name = "sessions")
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  public class Session {
  ```

- Add it to the Speaker class also.
- Restart the server.
- Now GET `http://localhost:8080/api/v1/sessions/2` works.
- POST `http://localhost:8080/api/v1/sessions`:

  ```json
  {
    "session_name": "Some new session",
    "session_description": "A new session description",
    "session_length": 42
  }
  ```

- PUT `http://localhost:8080/api/v1/sessions/93`:

  ```json
  {
    "session_name": "Some updated session",
    "session_description": "An updated session description",
    "session_length": 43
  }
  ```

- DELETE `http://localhost:8080/api/v1/sessions/93` (no children data on the session we just created)
- Test out speaker endpoints.
  - GET `http://localhost:8080/api/v1/speakers`
  - GET `http://localhost:8080/api/v1/speakers/1`
  - POST `http://localhost:8080/api/v1/speakers`

    ```json
    {
      "first_name": "Eric",
      "last_name": "Helander",
      "title": "Software Engineer Consultant",
      "company": "Object Partners, Inc.",
      "speaker_bio": "cloud, web, services, data"
    }
    ```

  - PUT `http://localhost:8080/api/v1/speakers/42`

    ```json
    {
      "first_name": "Eric",
      "last_name": "Helander",
      "title": "Software Engineer Consultant",
      "company": "Object Partners, Inc.",
      "speaker_bio": "frontend, backend, cloud, data"
    }
    ```

  - DELETE `http://localhost:8080/api/v1/speakers/42`

### [Summary](https://app.pluralsight.com/course-player?clipId=6475d1a1-b98c-47e9-a54d-7f6441ad6906)

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
