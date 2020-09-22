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

### Basics of Creating an Apache Kafka Producer

### Creating and Preparing Apache Kafka Producer Records

### Apache Kafka Producer Record Properties

### The Process of Sending Messages, Part One

### The Process of Sending Messages, Part Two

### Message Buffering and Micro-batching

### Message Delivery and Ordering Guarantees

### Demo: Creating and Running an Apache Kafka Producer Application in Java

### Advanced Topics and Module 4 Summary

## Consuming Messages with Kafka Consumers and Consumer Groups

### Introduction and Apache Kafka Consumer Overview

### Subscribing and Unsubscribing to Topics

### Comparing Subscribe and Assign APIs

### Single Consumer Subscriptions and Assignments

### The Poll Loop

### Demo: Simple Kafka Consumer

### Walkthrough: Consumer Polling

### Walkthrough: Message Processing

### The Consumer OFfset in Detail

### Offset Behavior and Management

### CommitSync and CommitAsync for Manual Offset Management

### When to Manager Your Own Offsets Altogether

### Scaling out with Consumer Groups

### Consumer Group Coordinator

### Demo: Consumer Groups

### Configuration and Advanced Topics

### Summary

## Exploring the Kafka Ecosystem and Its Future

### Apache Kafka's Success and Challenges

### Challenges and Solutions for Data Governance

### Challenges and Solutions for Consistency and Productivity

### Challenges and Solutions for Fast Data

### Apache Kafka's Ecosystem and Summary
