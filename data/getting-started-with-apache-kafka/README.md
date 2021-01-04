# [Getting Started with Apache Kafka, Ryan Plant, 2016-10-14](https://app.pluralsight.com/library/courses/apache-kafka-getting-started/table-of-contents)

## Course Overview

### Course Overview

## Getting Started with Apache Kafka

### Enterprise Challenges with Data

- Apache Kafka: A high-throughput distributed messaging system.
  - Helps avoid a complex web of point-to-point data movement.
- Traditional solutions to this problem:
  - Database replication & log shipping
    - Limited to RDBMS-to-RDBMS
    - Database-specific
    - Tight coupling to schemas
    - Performance challenges for log shipping
    - Cumbersome to manage subscriptions
  - ETL
    - Typically proprietary and costly, though some open source options are available
    - Lots of custom development
    - Scalability is challenged
    - Performance challenges
    - Often, multiple instances are required
  - Messaging
    - A fairly simple paradigm for moving data between applications and data stores
    - Scalability can be challenging: messaging broker can be a bottleneck
    - Message size impacts reliability and performance\
    - Requires rapid consumption
    - Non-fault-tolerant.
    - Technically, a form of middleware.
  - Custom middleware magic
    - Code needs to have intimate knowledge of every data store.
    - Requires distributed coordination logic, multiphase commits, and complex error handling.
    - Seems simple on a whiteboard; becomes prohibitively complex.
    - Consistency challenges.
    - Potentially expensive.
    - Vendors' solutions may or may not work, and can be expensive.

### Messaging Limitations and Challenges

- ![](2020-09-16-09-21-40.png)
  - Depending on error handling, a croaking broker can lead to a complete denial of service for publishing applications.
- ![](2020-09-16-09-22-49.png)
- ![](2020-09-16-09-26-01.png)

### LinkedIn's Search for a Better Solution

- Goal: Find a better way to move data around:
  - Cleanly
  - Reliably
    - Reduce impact of a single unavailable component.
  - Quickly
    - For real-time use cases.
  - Autonomously
    - With reduced coupling between components, allowing us to make changes without cascading changes.
- LinkedIn asked this same question in 2010.
  - Founded in 2003.
  - ![](2020-09-16-09-28-38.png)
  - ![](2020-09-16-10-02-24.png)

### Apache Kafka as a Viable Solution

- Next-generation messaging goals:
  - High throughput
  - Horizontally scalable
  - Reliable and durable
  - Loosely-coupled producers and consumers &rarr; common data exchanges
  - Flexible publish-subscribe semantics
- ![](2020-09-16-10-04-12.png)
- LinkedIn started developing Kafka in 2009, started using it in 2010, and open sourced Kafka in 2011.

## Getting to Know Apache Kafka's Architecture

### Apache Kafka as a Messaging System

- Kafka: A pub/sub (producer/consumer) messaging system.
- Messages are sent to topics.
- Kafka keeps and maintains topics in the broker.
  - The broker is an executable process or daemon. Could be called a 'server'.

### The Apache Kafka Cluster

- With Kafka, brokers can scaled out as much as is necessary.
  - LinkedIn: 1400 brokers (as of recording).
- Kafka cluster: A grouping of multiple Kafka brokers across 1 or more machines.
  - Apache Zookeeper comes into play for managing grouping of brokers.

### Principles of Distributed Systems

- A system is a collection of resources that have instructions to achieve a specific goal or function.
- A distributed system involves multiple workers or nodes.
  - Coordination is required to ensure consistency and progress toward a common goal.
- Controller: A worker node, elected to officiate in the lead capacity.
  - Often the oldest node.
  - Responsibilities
    - Maintain an inventory of available workers.
    - Maintain a list of work items.
    - Maintain a status of workers and tasks.

### Reliable Work Distribution

- Controller needs to consider worker available and health and must consider the risk policy in effect (replication factor).
  - Leaders & followers.
- "Work" in Kafka:
  - Receiving messages.
  - Categorizing messages into topics.
  - Persisting messages for eventual retrieval.
- Components
  - Producers
  - Consumers
- Consumers add a more substantial load than producers.

### Distributed Consensus with Apache Zookeeper

- Distributed systems require a consensus.
  - Worker node membership and naming
  - Configuration management
  - Leader election
  - Health status
- Apache Zookeeper
  - Used in a variety of distributed systems.
  - Serves as a centralized service for maintaining metadata about a cluster of distributed nodes:
    - Configuration information
    - Health status
    - Group membership
  - A distributed system itself; to run reliably, require multiple nodes (an "ensemble")
- ![](2020-09-16-14-30-06.png)

## Understanding Topics, Partitions, and Brokers

### Introduction and Apache Kafka Setup Demo

- Basic Apache Kafka installation
- Prerequisites

  - Familiarity with Linux
  - JDK 8 installed
    <!-- - `sdk list java`
    - `sdk install java 8.0.265.hs-adpt`
    - `sdk use java 8.0.265.hs-adpt` -->
    <!-- - `brew tap adoptopenjdk/openjdk` -->
    - `brew cask install homebrew/cask-versions/adoptopenjdk8`
  - Scala (2.11.x) installed
    - `sdk install scala`
      - https://sdkman.io/sdks#scala
  - Kafka

    ```sh
    # https://gist.github.com/jarrad/3528a5d9128fe693ca84#gistcomment-2323553
    # Install java 1.8, zookeeper, and kafka
    brew install kafka

    # Start Zookeeper & Kafka:
    brew services start zookeeper
    brew services start kafka

    # Stop Kafka:
    brew services stop kafka
    brew services stop zookeeper
    ```

- `/usr/local/Cellar/kafka/2.6.0/libexec`
  - `libs`
    - Note that Zookeeper is included among `libs`, allowing a standalone installation (not requiring a separate Zookeeper installation).
  - `config`
    - All the files we'll use to configure Kafka.
    - `server.properties`: The broker properties.
  - `bin`
    - All the programs to get Kafka up and running.

### Apache Kafka Topics in Detail

- A messaging topis is the primary abstraction of Kafka.
  - A topic is a named feed or category of messages that producers produce to, and consumers consume from.
  - Topics are logical entities that span the entire cluster of brokers.
    - Behind the scenes, Kafka physically represents a topic as 1 or more logs.
- Messages are appended to a time-ordered, sequential stream.
- Each message represents an event or "fact".
- Messages are immutable.
  - If an incorrect/outdated message is sent, the only correction option is for the producer to publish a new event with the updated information.
    - It's up to consumers to digest these appropriately.
- Event sourcing
  - An architectural style or approach to maintaining an application's state by capturing all changes as a sequence of time-ordered, immutable events.
- (Logical) message content
  - Timestamp
    - When the message was received.
  - ID
    - Referenceable by the consumers.
  - Data content
    - Binary payload.
- Consumers simply read messages from a topic.
  - Messages can be read by a theoretically unlimited number of autonomous consumers.
  - Each consumer maintains its own operational boundary. A consumer's error or crash doesn't affect other consumers.

### The Consumer Offset and Message Retention Policy

- How do consumers maintain their autonomy?
  - The message offset.
  - Allows consumers to read messages at their own pace and process them independently.
  - Basically a bookmark: The last read message.
  - Established and maintained by the consumer.
  - Corresponds to a message identifier.
- When a consumer decides to read from a topic (that it either has not read from previously, or for which it wants to start over), it starts from the beginning ('offset: 0').
- The consumer chooses to advance its position, stay put, or re-read a previous message.
- When a new message arrives, consumers receive an event that a new message is available.
- Kafka is immune from a major challenge with messaging systems: slow consumers.
  - Message retention period is configurable (in hours).
    - Default: 168 hours (7 days).
    - After the retention period, old messages fall off.
    - Retention period is set on a per-topic basis.
  - All published Kafka messages are retained, regardless of consumption.

### Demo: Starting Apache Kafka and Producing and Consuming Messages

- Demo:

  - Set up a simple Kafka cluster.
  - Create a topic.
  - Publish some messages.
  - Consume the message.

- Change into Kafka directory (though we'll be using Homebrew for some services)

  ```sh
  cd /usr/local/Cellar/kafka/2.6.0/
  ```

- Start Zookeeper (standalone: 1 instance)

  - ![](2020-09-22-14-15-26.png)

    ```sh
    bin/zookeeper-server-start.sh config/zookeeper.properties
    ```

- Using Homebrew instead:

  ```sh
  brew services start zookeeper
  ```

- Test that Zookeeper is running:

```sh
# Install telnet, since MacOS removed it.
brew install telnet
telnet localhost 2181
stat
```

- https://osxdaily.com/2018/07/18/get-telnet-macos/
- `telnet towel.blinkenlights.nl`

- ![](2020-09-22-14-33-14.png)

  - With Homebrew:

    ```sh
    brew services start kafka
    ```

- Create a topic:

  ```sh
  # bin/kafka-topics.sh
  bin/kafka-topics --create --topic my_topic --zookeeper localhost:2181 --replication-factor 1 --partitions 1
  ```

  - We need to specify the Zookeeper-managed cluster.
  - Note the replication factor and partition flags.

- Logs are accessible at `/usr/local/var/lib/kafka-logs`:
  - See https://stackoverflow.com/questions/40369238/which-directory-does-apache-kafka-store-the-data-in-broker-nodes
  - ![](2020-09-22-15-12-28.png)
- Inquire which topics are available:

  ```sh
  # bin/kafka-topics.sh --list --zookeeper localhost:2181
  bin/kafka-topics --list --zookeeper localhost:2181
  ```

  - ![](2020-09-22-15-14-09.png)

- Instantiate a producer

  ```sh
  # bin/kafka-console-producer.sh
  # bin/kafka-console-producer --broker-list localhost:9092 --topic my_topic
  bin/kafka-console-producer --bootstrap-server localhost:9092 --topic my_topic
  ```

  - Everything we type (and follow by 'enter') becomes a message that the producer sends to the broker.

- Instantiate a consumer

  ```sh
  # bin/kafka-console-consumer.sh
  # bin/kafka-console-consumer --zookeeper localhost:2181 --topic my_topic --from-beginning
  # bin/kafka-console-consumer --bootstrap-server localhost:2181 --topic my_topic --from-beginning
  bin/kafka-console-consumer --bootstrap-server localhost:9092 --topic my_topic --from-beginning
  ```

  - See also https://medium.com/@at_ishikawa/getting-started-with-kafka-on-mac-f6aa8924fcda

### Apache Kafka as a Distributed Commit Log

- The simple-yet-powerful concept upon which Kafka is built: The commit (or transaction) log.
  - The source of truth.
  - Physically stored & maintained.
  - Higher-order data structures derive from the log (tables, indexes, view, etc.).
    - Useful for point-of-recovery: Can replay past events.
    - Basis for replication & distribution (redundancy, fault-tolerance, and scalability).
- What Kafka really is, at its heart, is a _distributed commit log_.

### Apache Kafka Partitions in Detail

- A topic, as a logical concept, is represented by 1 or more physical log files.
- The number of partitions per topic is highly configurable.
- Partitions enable:
  - Scalability
  - Fault-tolerance
  - High throughput
- Each partition is maintained on 1 or more brokers.
- When we created a topic topic, we specified 1 partition and a replication factor of 1.
- At a minimum, each topic must have at least 1 topic.
- The partition's logs are on the broker's file system at `/tmp/kafka-logs/{topic}-{partition}` (by default).
- Tradeoffs related to the number of partitions:
  - Scalability
    - Eventually, scaling out requires multiple partitions.
  - Each partition must fit on a single machine.
- If we had created our topic with 3 partitions, we would be splitting our topic across 3 log files (ideally, across multiple machines). This enables each partition to share the burden of the message load.
  - But the logs are still a time-ordered sequence or events.
    - A partitioning scheme can be specified.

### Distributed Partition Management in Apache Kafka

- Zookeeper looks at the available brokers and establishes leaders for a topic.
- Each broker creates a log for the new partition.
- As partition assignments are broadcast, each broker maintains a subset of the metadata from Zookeeper (enabling each broker to direct producers to the correct broker).
- A producer must have knowledge of at least 1 broker in each topic so it can find the leaders.
- A consumer inquires of Zookeeper to determine which brokers own which topic.
- Consumers working with multiple partitions are likely going to consumer messages in a different order (and will be responsible for handling the messages in the different orders).
- Partitioning trade-offs:
  - More partitions
    - Greater Zookeeper overhead
      - I.e., ensure proper Zookeeper ensemble provisioning.
    - Message ordering can become complex.
      - There will not be a global order to messages across partitions.
      - To get a global order (without forcing consumers to manage the ordering), a single partition would be required.
    - Longer leader fail-over time.

### Achieving Reliability with Apache Kafka Replication

- What about fault tolerance?
  - Broker failure
  - Network issue
  - Disk failure
- When Zookeeper determines that a broker is down, it will find another broker to take its place.
  - But without redundancy between brokers, there could be data loss.
- Replication factor
  - We had set this to 1 in our demo.
  - Enables reliable work distribution
    - Ensures redundancy of messages
    - Enhances system resiliency and fault-tolerance
  - Guarantees
    - Up to n-1 broker failure tolerance
      - Minimum of 2 or 3
  - Configured on a per-topic basis
  - It is the leader's job to get the peer brokers to participate in a quorum for the purposes of replicating the log to achieve the intended redundancy level.
  - ISR: In-sync replicas
    - When the ISR is equal to the replication factor, the topic, and each partition within that topic, is considered to be in a healthy state.
- View topic's state:

  - PartitionCount
  - ReplicationFactor

  ```sh
  bin/kafka-topics --describe --topic my_topic --zookeeper localhost:2181
  ```

### Demo: Fault-tolerance and Resiliency in Apache Kafka

- Multi-broker (3) Kafka setup with a single partition and a replication factor of 3.
- To configure a multi-broker setup on a single machine, create a new `server.properties` file for each broker you want to instantiate:

  - ![](2020-09-22-16-08-17.png)

- ![](2020-09-22-16-09-15.png)
- ![](2020-09-22-16-09-44.png)
- ![](2020-09-22-16-10-18.png)
- ![](2020-09-22-16-11-57.png)
- Simulate a broker failure (by ending the terminal process for the leader)
  - ![](2020-09-22-16-12-55.png)
    - The leader changed.
    - There are still 3 replicas.
    - But note that there are only 2 ISRs.
  - If another broker were available, Kafka would have replaced the one we killed.
- The producer doesn't indicate anything happened; the consumer shows WARNs - but it didn't cause the consumer to fail.
  - ![](2020-09-22-16-14-50.png)
  - ![](2020-09-22-16-15-54.png)
    - Nothing was lost, due to the replication factor.

### Module 3 Summary

## Producing Messages with Kafka Producers

### Introduction and Setting up an Apache Kafka Development Environment

- Prerequisites:
  - IDE
  - Java 8 JDK
  - Maven
  - Access to a test Kafka cluster (at least 1 running broker)
- Create new project
  - Maven
- Add Kafka dependency:

  ```xml
  <dependencies>
      <dependency>
          <groupId>org.apache.kafka</groupId>
          <artifactId>kafka-clients</artifactId>
          <version>0.10.0.1</version>
      </dependency>
  </dependencies>
  ```

- Note the `clients` libraries. These are the objects we'll be working with directly.
  - ![](2020-10-07-15-59-54.png)
  - In particular: `KafkaProducer` and `KafkaProducerRecord`.
- So far, we've covered Kafka's externals:
  - ![](2020-10-07-16-46-53.png)
- Next, we'll start looking at what goes on inside a producer:
  - ![](2020-10-07-16-47-17.png)

### Basics of Creating an Apache Kafka Producer

- When creating a KafkaProducer client application, you'll first need an object to represent the required configuration properties to start up a producer.
  - 3 properties are required
    - `bootstrap.servers`
      - The producer connects to the first available broker, which it then uses to discover the full membership of the cluster. This list is used to determine the partition owners (leaders) so it can send messages immediately when needed.
        - Best practice: Supply more than 1 broker in this list so that messages can be sent if 1 is unavailable.
    - `key.serializer` & `value.serializer`
      - Classes used for message serialization & deserialization.
      - StringSerializer is the most common.
  - Full list: https://kafka.apache.org/documentation/#producerconfigs
  - ![](2020-10-07-16-54-45.png)
  - Creating a producer (with the simplest approach):
    - ![](2020-10-07-17-00-36.png)
    - In the implementation, the properties instantiate an instance of ProducerConfig.
      - Establishing a type-safe contract that extends to the consumer.
      - ![](2020-10-07-17-02-52.png)

### Creating and Preparing Apache Kafka Producer Records

- From the point of view of a Kafka Producer, it doesn't really send "messages". Instead, it sends Records.
  - Important class: `ProducerRecord`.
    - Only 2 required values:
      - `Topic`
      - `Value`
    - Optional values
      - Partition
      - Timestamp
      - Key
    - ![](2020-10-07-17-04-22.png)
    - ![](2020-10-07-17-04-30.png)
    - KafkaProducer instances can only send ProducerRecords that match the key and value serializer's types it is configured with.

### Apache Kafka Producer Record Properties

- `ProducerRecord` optional properties
  - `partition`
    - Can set to a specific partition you want messages to be sent to.
  - `timestamp`
    - Allows for explicit setting of a timestamp to the `ProducerRecord`, submitted with the record.
      - Carries an additional 8 bytes, which can affect performance.
    - The actual timestamp logged is based on `server.properties`:
      - ![](2020-10-07-17-08-27.png)
  - `key`
    - A value used as the basis for determining the partitioning strategy to be employed by the Kafka Producer.
    - Best practice: Define a key.
      - 2 purposes
        - Can be used as additional information in the message, used for processing decisions later.
        - Can determine the manner in which messages are routed to partitions.
      - Possible downsides
        - Introduces additional payload overhead
          - Depends on serializer type used

### The Process of Sending Messages, Part One

- ![](2020-10-07-17-11-15.png)
  - The send operation can be unsuccessful.
- Metadata is used to instantiate a `Metadata` object, which it keeps up to date with information about the cluster.
- ![](2020-10-07-17-15-12.png)
- The partition routing step is determined by 4 strategies
  - ![](2020-10-07-17-19-06.png)

### The Process of Sending Messages, Part Two

- ![](2020-10-07-17-20-53.png)
  - RecordAccumulator: A queue-like, fairly low-level object.
- ![](2020-10-07-17-22-59.png)
- The RecordAccumulator enables batching/sending messages.
  - ![](2020-10-07-17-24-21.png)

### Message Buffering and Micro-batching

- Each `RecordBatch` has a buffering limit: `batch.size` (the max bytes that can be buffered per batch).
  - Across all buffers, the `buffer.memory` establishes a ceiling for how much memory can be used to buffer records waiting to be sent to the brokers.
    - If the ceiling is reached, then the `max.block.ms` setting determines for how many milliseconds the send method will be blocked.
  - ![](2020-10-07-17-25-57.png)
  - When records are sent to a RecordBatch, they wait until either:
    - A RecordAccumulation occurs and the total buffer size reaches the per buffer batch size limit, the records are sent immediately in a batch &rarr; optimizing the overhead in transferring the page cache bytes to the network socket.
      - New records are dispatched to other accumulators and other record buffers.
    - `linger.ms`: The number of milliseconds a not-full buffer should wait before transmitting.
  - ![](2020-10-07-17-29-17.png)
- When the batched records get transmitted to the brokers, the result of the transmission is sent as a gets sent as a `RecordMetadata` object (containing information about records that were successfully or unsuccessfully received).
  - ![](2020-10-07-17-30-38.png)

### Message Delivery and Ordering Guarantees

- To ensure the best chance of delivery, additional producer settings can be used.
  - `acks`
    - What level of acknowledgement the producer expects from the broker.
    - Options:
      - `0`
        - Fire and forget
        - Fastest.
        - Not very reliable.
      - `1`
        - Producer asks for the leader broker to confirm receipt (rather than waiting for all replicas).
        - Good balance of performance & reliability.
      - `2`
        - Replication quorum acknowledged.
        - Highest assurance, but lowest performance.
- When an error is sent back, the producer needs to decide what to do.
  - Options:
    - `retries`
      - Producer retries
    - `retry.backoff.ms`
      - Wait time in milliseconds before retrying.
- Ordering guarantees
  - Message order is only preserved _within_ a given partition.
  - Errors can complicate ordering.
    - E.g., `retries` with `retry.backoff.ms`
      - Such as a second message getting sent during a retry for the first one.
      - Only way to avoid: setting `max.in.flight.request.per.connection` to `1`.
        - Note that this has a high cost to throughput, however.
  - Based on delivery semantics (configured at producer, broker, and the consumer), we can achieve:
    - At-most-once
    - At-least-once
    - Only-once

### Demo: Creating and Running an Apache Kafka Producer Application in Java

- ![](2020-10-07-17-53-11.png)
- ![](2020-10-07-17-53-27.png)

```java
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;

import java.util.Properties;
import java.util.stream.IntStream;

public class KafkaProducerApp {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092,localhost:9093");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        // Important: Close resource to avoid memory leak.
        try (KafkaProducer<String, String> producer = new KafkaProducer<>(props)) {
            IntStream.range(0, 150).forEachOrdered(i -> {
                ProducerRecord<String, String> record = new ProducerRecord<>("my-topic", Integer.toString(i), "MyMessage: " + Integer.toString(i));
                producer.send(record);
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

- Approximate setup:

  ```sh
  cd /usr/local/Cellar/kafka/2.6.0/
  /usr/local/Cellar/kafka/2.6.0/libexec/config

  # Create 2 new server.properties files:
  cp libexec/config/server.properties libexec/config/server-0.properties
  cp libexec/config/server.properties libexec/config/server-1.properties
  cp libexec/config/server.properties libexec/config/server-2.properties

  # Second terminal - start broker:
  cd /usr/local/Cellar/kafka/2.6.0/
  bin/kafka-server-start libexec/config/server-0.properties
  # Third terminal - start broker:
  cd /usr/local/Cellar/kafka/2.6.0/
  bin/kafka-server-start libexec/config/server-1.properties
  # Fourth terminal - start broker:
  cd /usr/local/Cellar/kafka/2.6.0/
  bin/kafka-server-start libexec/config/server-2.properties

  # Create topic
  bin/kafka-topics --zookeeper localhost:2181 --create --topic my-topic --partitions 3 --replication-factor 3
  # View topics
  bin/kafka-topics --describe --topic my-topic --zookeeper localhost:2181
  # Create consumer
  bin/kafka-console-consumer --bootstrap-server localhost:9092 --topic my-topic --from-beginning
  ```

- Note that messages are not ordered, due to (default, based on key) partitioning.

### Advanced Topics and Module 4 Summary

- Custom serializers
- Custom partitioners
- Asynchronous (callback & future) send
- Compression
- Advanced settings

## Consuming Messages with Kafka Consumers and Consumer Groups

### Introduction and Apache Kafka Consumer Overview

- ![](2020-10-08-08-53-10.png)
- ![](2020-10-08-08-53-17.png)
- ![](2020-10-08-08-53-51.png)
  - The function of the initial required properties is closely related to the initial required producer properties.
  - https://kafka.apache.org/documentation/#consumerconfigs
- ![](2020-10-08-08-55-33.png)

### Subscribing and Unsubscribing to Topics

- ![](2020-10-08-08-56-30.png)
  - Note that the method signature of `subscribe()` takes in a collection of strings (topics).
  - May not be a limit to the number of topics that can be subscribed to.
- A nuance:
  - Calls to `subscribe()` are _not_ incremental: A subsequent call overwrites the first.
  - ![](2020-10-08-08-57-34.png)
- You don't unsubscribe from individual topics; you simply unsubscribe:
  - ![](2020-10-08-08-58-04.png)

### Comparing Subscribe and Assign APIs

- `subscribe()` vs. `assign()`:
  - With `subscribe()`, you're enlisting the consumer to poll from every partition within every topic.
  - Another option: Subscribe to individual partitions (via `assign()`) - _regardless_ of topic.
  - Both take lists, and neither can be added to incrementally.
  - `assign()`: Advanced.
  - ![](2020-10-08-09-00-26.png)
- ![](2020-10-08-09-01-23.png)

### Single Consumer Subscriptions and Assignments

- Benefit to using `subscribe()`: Partition management is managed for you.
  - E.g., if a new partition is added to the topic, it's added automatically to the topic list polled by the consumer.
  - ![](2020-10-08-09-06-22.png)
- `assign()` is similar to hard-coding partition IDs.
  - ![](2020-10-08-09-07-41.png)

### The Poll Loop

- Polling within the consumer context.
  - Primary function of the Kafka consumer.
- ![](2020-10-08-09-09-01.png)
- A poll loop must live within a loop - an infinite loop we'll only interrupt if needed.
- Inside a try/catch: A good idea, due to potential network complications.
  - And the poll operation opens network resources, so we need to close them.
- ![](2020-10-08-09-28-37.png)

### Demo: Simple Kafka Consumer

- Similar setup as before.
- ![](2020-10-08-09-30-36.png)
- Setup
  - 1 broker
  - 2 topics
    - `my-topic`
    - `my-other-topic`
  - 3 partitions per topic
- `bin/kafka-topics --zookeeper localhost:2181 --describe`
  - ![](2020-10-08-09-32-36.png)
- 2 sample Java applications
  - KafkaConsumerSubscribeApp.java
    - ![](2020-10-08-09-34-05.png)
    - ![](2020-10-08-09-34-21.png)
      - Timeout value: 10 milliseconds
  - KafkaConsumerAssignApp.java
    - Virtually identical.
      - Except we have to create a TopicPartition collection, and invoking `.assign()`.
    - ![](2020-10-08-09-35-30.png)
    - ![](2020-10-08-09-41-37.png)
    -

```java
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import java.util.Arrays;
import java.util.List;
import java.util.Properties;

public class KafkaConsumerSubscribeApp {
  public static void main(String[] args) {
    Properties props = new Properties();
    props.put("bootstrap.servers", "localhost:9092,localhost:9093");
    props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    props.put("group.id", "test");

    KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

    // Subscribe to a list of topics.
    List<String> topics = Arrays.asList("my-topic", "my-other-topic");
    consumer.subscribe(topics);

    try (consumer) {
      while (true) {
        ConsumerRecords<String, String> records = consumer.poll(10);
        for (ConsumerRecord<String, String> record : records) {
          System.out.println(
              String.format(
                  "Topic: %s, Partition: %d, Offset: %d, Key: %s, Value: %s",
                  record.topic(),
                  record.partition(),
                  record.offset(),
                  record.key(),
                  record.value()));
        }
      }
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
  }
}
```

```java
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;

import java.util.Arrays;
import java.util.List;
import java.util.Properties;

public class KafkaConsumerAssignApp {
  public static void main(String[] args) {
    Properties props = new Properties();
    props.put("bootstrap.servers", "localhost:9092,localhost:9093");
    props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    props.put("group.id", "test");

    KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

    // Assign a list of partitions.
    TopicPartition myTopicPartition0 = new TopicPartition("my-topic", 0);
    TopicPartition myOtherTopicPartition2 = new TopicPartition("my-other-topic", 2);
    List<TopicPartition> partitions = Arrays.asList(myTopicPartition0, myOtherTopicPartition2);
    consumer.assign(partitions);

    try (consumer) {
      while (true) {
        ConsumerRecords<String, String> records = consumer.poll(10);
        for (ConsumerRecord<String, String> record : records) {
          System.out.println(
              String.format(
                  "Topic: %s, Partition: %d, Offset: %d, Key: %s, Value: %s",
                  record.topic(),
                  record.partition(),
                  record.offset(),
                  record.key(),
                  record.value()));
        }
      }
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
  }
}
```

- Handy tool for creating lots of messages: `kafka-producer-perf-test.sh`.
  - ![](2020-10-08-10-31-43.png)
  - ![](2020-10-08-10-45-45.png)
    - Same configuration for both topics.
  - ![](2020-10-08-10-47-56.png)
    - Subscribing to all partitions by topic.
  - ![](2020-10-08-10-46-50.png)
    - We only see results from the partitions we passed to `assign()`.
  - If we create another partition for one of those topics (via `kafka-topics.sh`, altering it to `4` instead of `3` partitions)...
    - ![](2020-10-08-10-49-48.png)
    - ![](2020-10-08-10-50-06.png)
    - ...
      - The `subscribe()` version picks up the new partition's messages (`3`):
        - ![](2020-10-08-10-51-11.png)
      - But the `assign()` didn't.
        - ![](2020-10-08-10-51-44.png)

### Walkthrough: Consumer Polling

- The `SubscriptionState` object is the source of truth for the topics of partitions the consumer is subscribed to, and works with the ConsumerCoordinator to manage offsets.
  - Timeout: The minimum amount of time each message retrieval session will take.
    - Upon timeout expiry, records are returned and added to an in-memory buffer, then processed.
    - ![](2020-10-08-10-55-38.png)

### Walkthrough: Message Processing

- Kafka consumers are essentially single-threaded: Just a single `poll()` loop.
  - Goal: Keep it simple and force parallelism in different, more scalable manners.
- After the `poll()` method has returned messages for processing:
  - Careful consideration should be given to how each record is processed.
    - Remember: A slow consumer doesn't impact the cluster's performance.
  - ![](2020-10-08-10-57-58.png)

### The Consumer Offset in Detail

- The offset is the critical value that allows consumers to operate independently.
  - ![](2020-10-08-10-58-28.png)
- Terminology
  - Last committed offset
    - The last record the consumer has confirmed to have processed.
    - This is within a _partition_. A consumer may have multiple offsets: one for each partition within a topic.
  - Current position
    - Advances as the consumer advances.
    - Difference between 'last committed offset' and 'current position': Un-committed offsets
  - Log-end offset
- ![](2020-10-08-11-00-54.png)
- 2 important configuration properties that govern the default behavior of the consumer offsets
  - `enable.auto.commit`
    - Manages when current position offsets are upgraded to full committed offsets.
  - Based on a time: `auto.commit.interval`
    - By default, set to 5000 milliseconds.
    - Likely sufficient, but this depends on your processing speed. If processing takes longer than this interval, Kafka commits it.
    - Generally, large-scale systems operate with _eventual_ consistency.
      - The extent to which your system can be tolerant of eventual consistency is determined by its reliability.
  - ![](2020-10-08-11-11-55.png)
    - If an error occurs, the impact varies based on the consumer topology.
      - Single consumer vs. multiple consumers in a consumer group.

### Offset Behavior and Management

- Read != committed
  - Depends on offset management mode.
- Offset commit behavior is configurable.
  - `enable.auto.commit`
    - `true` by default
    - Similar to garbage collection: Convenient, until it isn't.
  - `auto.commit.interval.ms`
    - `5000` by default
    - As long as there is a gap, there is some risk of failure and a gap or record duplication.
  - `auto.offset.rest`
    - Strategy to use when a consumer starts reading from a new partition.
    - `latest`: Default
      - Starts from latest known committed offset.
    - Could be `earliest`.
    - Could be `none`: Throw an exception, and let the consumer decide what to do with it.
- Kafka stores the committed consumer offsets in `__consumer_offsets`
  - Defaults to 50 partitions.
- ![](2020-10-08-11-18-15.png)
- ![](2020-10-08-11-18-39.png)
  - We would want a replication factor higher than 1.
- How does the committed offset value get produced in the topic?
  - The Consumer Coordinator
    - So a consumer is also a producer (of sorts)
    - ![](2020-10-08-11-19-35.png)
- Offset management
  - 2 modes
    - Automatic
      - `enable.auto.commit = true` (default
    - Manual
      - `enable.auto.commit = false`
      - You take full control of when you want Kafka to consider a record to have been fully processed.
      - Advanced, but not uncommon.
      - The API for manual offset management consists of 2 methods:
        - `commitSync()`
        - `commitAsync()`

### CommitSync and CommitAsync for Manual Offset Management

- `commitSync()`
  - When you want precise control over when you want a record to be considered fully processed.
  - Used when you need higher consistency for message processing (e.g., not processing new records until certain previously-committed records have been processed).
  - Suggestion: Invoke this message after processing records in a `for` loop, not during.
    - _Can_ invoke after every message, but this would likely just introduce latency.
  - ![](2020-10-08-11-36-15.png)
    - `retry.backoff.ms`: Default, `100` ms.
- `commitAsync()`
  - Due to the asynchronous nature of the call, you don't know exactly when the commit succeeded.
    - Does _not_ automatically retry upon failure.
    - But there _is_ a callback option: Will be triggered upon commit response from cluster.
      - Can determine the status of the commit and act accordingly.
  - Better throughput/performance.
    - But only recommended when you register a callback and can handle the responses accordingly.
  - ![](2020-10-08-11-38-05.png)

### When to Manager Your Own Offsets Altogether

- ![](2020-10-08-11-41-04.png)
- For advanced scenarios, you can handle offset management on your own.
  - Common reasons for taking control of offsets:
    - Consistency
      - When a message is processed and ready to commit (vs. default: when auto commit interval expires)
    - Atomicity
      - Treating steps of message consumption/processing as an atomic operation.
      - "Exactly-once" vs. "at-least-once" processing
        - Most common scenario
        - In order to get an exactly-once system, will likely need to handle manually.

### Scaling out with Consumer Groups

- A scary reality may be required to consume from dozens or hundreds of topics, each with many partitions: Overwhelming for a single consumer with a single thread.
- Solution: Scale out the number of consumers consuming messages, working in concert &rarr; consumer groups
  - A group of independent consumers working as a team.
  - Only requirement: `group.id` setting as a configuration property before starting the consumer.
  - Enables evenly sharing message consumption/processing load
    - Increased parallelism and higher throughput.
    - Increased redundancy.
    - Improved performance.
- Consumer Group: Formed when individual consumers with a common group id invoke `subscribe()` and pass in a common topic list.
  - Behind the scenes: A designated broker is elected to serve as GroupCoordinator, monitoring/maintaining the consumer group's membership and monitors specific partitions within a topic.
  - Each consumer sends regular heartbeats (`heartbeat.interval.ms`, `session.timeout.ms`)
    - Group Coordinator relies on these to determine consumer health.
      - If an unhealthy consumer: A rebalance occurs.
        - Needs to figure out where the failed consumer left off.
          - Where offset management can make or break a consumer group (reprocessing, missing, etc.).
      - And when a new consumer joins, a rebalance occurs.
      - And when a new partition is added.
- ![](2020-10-08-11-52-20.png)

### Consumer Group Coordinator

- When a new consumer in the group is assigned a partition that was previously assigned to a different consumer:
  - `auto.offset.reset` setting. Default: `latest`.
    - Assumes the committed offset was accurately/completely committed prior to rebalance.
  - ![](2020-10-08-11-54-06.png)
- Group Coordinator duties
  - Evenly balance available consumers to partitions
    - Whenever possible: Assigns 1:1 consumer-to-partition ratio
      - But if more consumers than partitions: over-provisioned
  - Initiate rebalancing protocol
    - Topic changes (partition added)
    - Consumer failure

### Demo: Consumer Groups

- 3 independent, identical (except for the class name) consumers, sharing a group ID.

```java
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

public class KafkaConsumerGroupApp01 {
  public static void main(String[] args) {
    Properties props = new Properties();
    props.put("bootstrap.servers", "localhost:9092,localhost:9093");
    props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    props.put("group.id", "test-group");

    KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

    // Subscribe to a list of topics.
    List<String> topics = Collections.singletonList("my-big-topic");
    consumer.subscribe(topics);

    try (consumer) {
      while (true) {
        ConsumerRecords<String, String> records = consumer.poll(10);
        for (ConsumerRecord<String, String> record : records) {
          System.out.println(
              String.format(
                  "Topic: %s, Partition: %d, Value: %s",
                  record.topic(),
                  record.partition(),
                  record.value()).toUpperCase());
        }
      }
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
  }
}
```

```java
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;

import java.util.Properties;
import java.util.stream.IntStream;

public class KafkaGroupProducerApp {
  public static void main(String[] args) {
    Properties props = new Properties();
    props.put("bootstrap.servers", "localhost:9092,localhost:9093");
    props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

    KafkaProducer<String, String> producer = new KafkaProducer<>(props);

    try (producer) {
      String topic = "my-big-topic";
      String value = "abcdefghijklmnopqrstuvwxyz";
      IntStream.range(0, 150)
          .forEachOrdered(
                  i -> {
                ProducerRecord<String, String> record = new ProducerRecord<>(topic, value);
                producer.send(record);
              });
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

- ![](2020-10-08-12-18-02.png)
- ![](2020-10-08-12-18-12.png)
- ![](2020-10-08-12-18-21.png)
- But if we add a 4th consumer to this consumer group (an overprovisioned consumer group: only 3 partitions), one consumer doesn't get any messages.

### Configuration and Advanced Topics

### Summary

## Exploring the Kafka Ecosystem and Its Future

### Apache Kafka's Success and Challenges

### Challenges and Solutions for Data Governance

### Challenges and Solutions for Consistency and Productivity

### Challenges and Solutions for Fast Data

### Apache Kafka's Ecosystem and Summary
