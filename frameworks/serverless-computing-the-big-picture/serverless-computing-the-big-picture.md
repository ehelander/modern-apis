# [Serverless Computing: The Big Picture](https://app.pluralsight.com/library/courses/serverless-big-picture) (Richard Seroter, 2019-04-17)

## Course Overview

### [Course Overview](https://app.pluralsight.com/course-player?clipId=d462f9b9-3521-4bc6-b795-8a36ed2eb11b)

## Defining Serverless Computing

### [Introduction and How We Got Here](https://app.pluralsight.com/course-player?clipId=199eefa7-5076-4e6b-8769-9ea2309f6a1b)

- Eras
  - 1960s
    - Time sharing
  - 1970s
    - Microcomputers
  - 1980s
    - Client-server
  - 1989
    - Web era begins
  - 1999
    - Salesforce launched: SaaS goes mainstream
  - 2006
    - AWS EC2: IaaS era starts
  - 2008
    - Google App Engine: PaaS emerges
  - 2014
    - AWS Lambda: Serverless takes off
- Value from Cloud Abstractions
  - SaaS
    - Self-service with zero operations
  - IaaS
    - Agile, on-demand infrastructure
  - PaaS
    - Application-centric, integrated runtime
  - CaaS
    - Intelligent machinery for diverse workloads
  - FaaS
    - Pay-per-use code execution

### [What Does "Serverless" Mean](https://app.pluralsight.com/course-player?clipId=e2a4ca6c-0487-4e9f-899c-f539dbe60824)

- What is serverless?
  - Wikipedia
    - Serverless computing is a misnomer referring to a cloud-computing execution model in which the cloud provider runs the server, and dynamically manages the allocation of machine resources.
  - Tim Bray (AWS)
    - If you can't see the servers in the service, then it's serverless.
  - Paul D. Johnson
    - A Serverless solution is one that costs you nothing to run if nobody is using it.
  - Simon Wardley
    - [Serverless is] an event driven, utility based, stateless, code execution environment in which you write code and consume services.
  - Rachel Stephens (Redmonk)
    - Managed services that scale to zero.
- What responsibilities remain?
  - Write code.
    - As little as possible. Code is a liability.
  - Define triggers.
  - Connect managed services together.
  - Pay for consumption, not for allocation.
- What don't you do?
  - Pre-provision infrastructure.
  - Patch infrastructure.
  - Define scaling policies.
  - Store state alongside the compute.
- Paradigm changes for serverless
  - You are only responsible for your application itself.
    - Infrastructure is fully managed.
  - Your architecture depends on events and stateless computing.
    - You can't cheat. You have to re-architect.
  - When nothing's happening, you pay nothing.
    - When something does happen, you have fine-grained billing visibility.

| Serverless | Serverful |
| - | - |
| Program runs based on defined event | Program runs continuously until stopped |
| Program state kept in storage | Program state kept anywhere |
| Max memory size of ~3 GB | Max memory size > 10 TB |
| Maximum run time measured in minutes | No limit on run time |
| OS and machine selected by provider | OS and instance selected by user |
| Provider responsible for scaling | User responsible for scaling |

### [Challenges with Serverless Computing]()

### [Serverless Use Cases]()

### [Summary]()

## Serverless Technologies that Matter

### [Hosted FaaS Platforms]()

### [Installable FaaS Platforms]()

### [Serverless Framework for Developers]()

### [Managed Services to Know]()

### [Summary]()

## Serverless Architecture Patterns

### [Introduction and Major Architectural Considerations for Serverless]()

### [Serverless Best Practices]()

### [Serverless Design Patterns]()

### [Summary]()
