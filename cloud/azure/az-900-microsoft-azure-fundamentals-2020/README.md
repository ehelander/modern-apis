# [AZ-900 Microsoft Azure Fundamentals 2020](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/dashboard) (Lars Klint)

## 1. Introduction

### [Introduction](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/introduction/introduction/watch)

- Exam topics
  - Cloud concepts
  - Azure architecture
  - Compute
  - Networking
  - Storage
  - Authentication & Authorization

### [Introduction & Course Overview](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/introduction/welcome/watch)

### [Course Overview](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/introduction/course-overview/watch)

### [Azure Portal](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/introduction/azure-portal/watch)

- From the portal, you can "Build, manage, and monitor everything from simple web apps to complex cloud applications in a single, unified console."

### [Azure CLI](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/introduction/azure-cli/watch)

- Azure CLI commands start with `az`.
  - Commands are constant (vs. the dynamic nature of the the portal)
  - Structured
  - Cross-platform
  - Great for automation
  - Easy to log commands
- [Install via Homebrew](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-macos):

  ```sh
  brew update && brew install azure-cli
  ```

### [Azure PowerShell](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/introduction/powershell/watch)

- PowerShell is based around cmdlets.
  - Small, lightweight groups of commands (scripts) to perform actions.
    - E.g., create a new virtual machine: `New-AzVm`
  - Azure talks to the Azure Resource Manager (just like console, CLI)
  - Azure professionals often use PowerShell to interact with Azure, since they'll often be using it elsewhere.
- [Install via Homebrew](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-macos?view=powershell-7)

  ```sh
  brew cask install powershell
  # Start PowerShell:
  pwsh
  ```

### [Cloud Shell](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/introduction/cloud-shell/watch)

- "Cloud Shell is an interactive, browser-accessible shell for managing Azure resources."
  - Like crossing portal, CLI, PowerShell.
- Can use stand-alone or in-portal.
- Features
  - Access to cloudshell from web or mobile app. Authenticated & secure.
  - Choose between Bash or PowerShell.
  - Tools included by default:
    - Azure tools
    - Node.js
    - .NET
    - Python
    - Interpreters, modules
  - Dedicated storage to persist data between sessions.
  - Integrated file editor.

### [Hands-on Lab: Feee Azure Account](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/introduction/lab-free-account/watch)

- Recommendation: Use personal email (since a corporate account may already have access, and things might get complicated).
- azure.com > Start free
  - We _do_ need to put in a valid credit card.
  - portal.azure.com
    - The cloud shell:
      - ![](2020-10-05-14-54-25.png)

### [Summary](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/introduction/summary/watch)

- ![](2020-10-05-14-56-27.png)

## 2. Cloud Concepts

### [Introduction](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/cloud-concepts/introduction/watch)

### [The Language of Cloud Computing](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/cloud-concepts/the-language-of-cloud-computing/watch)

- Resilience
  - High Availability
    - Traditional:
      - You own the hardware
      - Physical access
      - You can't "just add servers"
    - Cloud
      - You don't own the hardware
      - Add more servers with a click
      - If hardware fails, replace instantly
      - Uses clusters
  - Fault Tolerance
    - Resilient to outages
    - Zero down-time for services provided by Azure
  - Disaster Recovery
    - Catastrophic disaster
    - Complete plans to recover critical business systems
    - Configured with a time to recovery and recovery point
- Infinite(ish) resources
  - Scalability
    - Scala out, up, or down
    - Auto-scaling
  - Elasticity
    - Ability to quickly expand/shrink resources
  - Agility
    - Ability to rapidly develop, test, and launch applications to drive business growth

### [The Economy of Cloud Computing](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/cloud-concepts/the-economy-of-cloud-computing/watch)

- Capital Expenditure (CapEx)
  - Money spent by an organization on acquiring/maintaining fixed assets (land, buildings, servers)
  - E.g., buying servers
  - Large upfront investments
- Operational Expenditure (OpEx)
  - An ongoing cost for running a product, business, or system
  - E.g., cost to run servers
  - Pay-as-you-go
- Switching to cloud: CapEx &rarr; OpEx
- Pricing models
  - Hourly pricing
    - Pay for time
  - Consumption-based pricing
    - Pay for resource used (per execution, per second, or a combination)
    - Low usage &rarr; low cost

### [Cloud Service Models](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/cloud-concepts/cloud-services-models/watch)

- 3 models + 1 more
  - Infrastructure as a Service
    - IaaS
    - Infrastructure: Actual servers
    - Scaling is fast
    - No ownership of hardware
    - Examples
      - VMs & servers
      - Networks
      - Physical buildings
  - Platform as a Service
    - PaaS
    - A superset of IaaS
    - Supports complete web application life cycle
    - Avoids software license hell
    - Examples
      - Middleware
      - Tools
  - Software as a Service
    - SaaS
      - Implicitly includes IaaS and Paas
    - Provides a managed service
    - No maintenance; latest features.
    - Access fee.
    - Examples
      - Apps
  - Serverless
    - _You_ don't have to manage any servers.
    - Examples
      - Azure Functions
    - Takes PaaS to the most extreme, abstracting away the server.
- Service is the core of Azure.

### [Azure Marketplace](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/cloud-concepts/azure-marketplace/watch)

- Large selection of solutions and services from Microsoft and partners
  - Apps, VMs, templates, services, etc.
- Like an Azure app store
- Easy to integrate; accessed from portal, CLI, PowerShell.
- Microsoft Partners can publish services.

### [Cloud Architecture Models](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/cloud-concepts/cloud-architect-models/watch)

- 3 general models:
  - Private
    - An incarnation of Azure on your hardware in a location of your choice.
    - The services within the cloud are offered to selected users only.
    - An organization can create their own cloud, but get the benefits of public cloud.
    - Better security and privacy.
  - Cons
    - Organization's IT department is responsible for maintenance and staffing
  - Public
    - Pros
      - Azure, AWS, GCP, etc.
      - No purchase of hardware.
      - No upfront costs; low monthly fees.
    - Cons
      - No control over features and version.
      - No physical access
  - Hybrid
    - Mix of private and public
    - Pros
      - Avoids disruptions and outages
      - Adhere to regulation, governance, etc.
      - Data spans both public and private cloud.
      - Can alleviate some of the large CapEx investments for private cloud.
    - Cons
      - Can lead to complex infrastructure

### [Summary](https://learn.acloud.guru/course/az-900-microsoft-azure-fundamentals/learn/cloud-concepts/summary/watch)

- ![](2020-10-05-16-08-13.png)

## Azure Architecture

## Compute

## Networking

## Storage

## Database

## Authentication and Authorization

## Azure Solutions

## Security

## Privacy, Compliance and Trust

## Pricing

## Support

## Exam Preparation
