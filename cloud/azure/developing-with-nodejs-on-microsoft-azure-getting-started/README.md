# [Developing with Node.js on Microsoft Azure - Getting Started](https://app.pluralsight.com/library/courses/developing-nodejs-microsoft-azure-getting-started/table-of-contents) (Scot Allen, 2018-05-14)

## Course Overview

### [Course Overview](https://app.pluralsight.com/course-player?clipId=532529dd-9a56-456a-958c-1c9ec9206ddf)

## Foundational Concepts

### [Introduction](https://app.pluralsight.com/course-player?clipId=5f89ce7e-d6fe-46d5-95a8-1ffb491976dc)

### [Learning about Cloud Computing](https://app.pluralsight.com/course-player?clipId=79bf3b44-059a-4e45-a58b-f2e44a366f42)

### [Azure Technologies and Languages](https://app.pluralsight.com/course-player?clipId=215ae097-dea9-488b-adc4-bfb96e24bf0b)

### [Azure Regions](https://app.pluralsight.com/course-player?clipId=ea79bcb6-8cf8-410b-8c93-0cfcd893fd2c)

### [Azure Platform Resources](https://app.pluralsight.com/course-player?clipId=5f0bd1ea-08cb-41ce-a847-47308c22a79d)

### [Setting up an Azure Subscription](https://app.pluralsight.com/course-player?clipId=f22c1b18-cbaa-4f72-be64-764457c745fe)

### [Getting Started with the Azure Portal](https://app.pluralsight.com/course-player?clipId=af7c6131-701b-4c8c-af40-3c1d172049ea)

- Customize dashboard: right click
- Resource hub > a blade

### [Creating Your First Virtual Machine](https://app.pluralsight.com/course-player?clipId=17a939d4-1474-460a-9d2d-e312c58b5612)

- Resources > Virtual machines
  - Select image
    - E.g., Ubuntu Server
    - Deployment model: Use Resource Manager (vs. Classic)

### [Configuring Your Virtual Machine](https://app.pluralsight.com/course-player?clipId=69b1191e-964e-4880-8362-a6cc34034318)

- Configure basic settings
  - Name
  - VM disk type
    - Options
      - SSD
      - HDD (cheaper, slower)
  - User Name
  - Authentication
    - Options
      - SSH public key
        - E.g., via `ssh-keygen`
          - Public key: `.ssh/id_rsa.pub` (start copying at `ssh-rsa` through end of key)
      - Password
  - Subscription
    - Subscriptions can use different credit cards (e.g., for separating clients)
  - Resource group
    - A logical container for resources that simplifies management.
  - Location
- Choose virtual machine size
  - Can always scale up/down.
  - VMs are classified into series.
    - A cheap option: DS1_V2 (~\$50/month).
- Configure optional features (defaults alright for now)
  - HA
  - Storage
    - Managed disks
      - Typically, yes.
      - 30 GB starting out.
  - Network
  - Auto-shutdown.

### [Connecting to Your Virtual Machine](https://app.pluralsight.com/course-player?clipId=02adbcae-eaf6-49c2-9999-db479dcb0e29)

- When VM is created, a new status tile appears on the dashboard.
- Other ways to find:
  - All resources > filter
  - Resource groups
  - Virtual machines blade
- Creating a VM creates a group of resources
  - VM
  - Disk
  - Network interface
  - Public IP address
  - Network security group
    - Inbound/outbound security rules
  - Storage account
  - Virtual network
- To connect to VM
  - VM blade > Overview
    - Connect
      - Provides SSH command
- When stopping a VM, storage still incurs costs.

### [Automating Azure Using CLI Tools](https://app.pluralsight.com/course-player?clipId=cfd3660e-7fe8-4b69-9ec7-77f2b16a8e2e)

- Think of Azure as a programmable data center.
  - Behind the scenes, everything in Azure is managed through a REST API.
  - SDKs
  - Azure CLI
    - Works cross-platform (Windows, Mac, Linux)
      - Install
        - `brew install azure-cli`
      - List base commands
        - `az`
      - Login
        - `az login`
          - Provides code for [https://microsoft.com/devicelogin](https://microsoft.com/devicelogin)
      - Help flag: `-h`
      - Set subscription
        - `az account set -s <subscription>`
      - Interactive mode with intellisense
        - `az interactive`
      - Note: `az vm stop` stops VM, but you still pay for it.
        - Whereas `az vm deallocate` executes the same as `Stop` from the portal (so only storage incurs costs)
      - Can specify resource by ID or by resource group (`--resource-group`) & name (`--name`).
- Easiest way to clean up resources: Delete resource group

### [Summary](https://app.pluralsight.com/course-player?clipId=f9f479aa-67f8-4e8e-b776-c5b72c0b9716)

## Building Web Applications and APIs

### [Introduction](https://app.pluralsight.com/course-player?clipId=0f43b681-3e56-4f18-a763-c35ea0759da3)

### [Understanding IaaS and PaaS](https://app.pluralsight.com/course-player?clipId=c1d3f186-7b6e-46f4-9527-6fee80ad571c)

- 3 models

| On-Prem                 | IaaS            | PaaS                |
| ----------------------- | --------------- | ------------------- |
| Azure: Nothing          | Azure: Hardware | Azure: Hardware, OS |
| You: Hardware, OS, Apps | You: OS, Apps   | You: Apps           |

### [Introducing Azure App Services](https://app.pluralsight.com/course-player?clipId=3e388c56-6e1b-4106-a221-2bc7db3ffc0e)

- App Services
  - Where you want to go to build a web app or web API

### [Creating an App Service](https://app.pluralsight.com/course-player?clipId=b09e09a9-102b-440b-aef3-6a3452cb0de1)

- Create an app service in the portal
  - App services
    - Add
    - Starting configuration
      - E.g. Wordpress, Node.js empty web app
      - Or empty web app
    - App name
      - Must be unique in the domain (`.azurewebsite.net`)
      - Can select operating system
        - Not much configuration to do.
      - App service plan
        - See below
      - Runtime stack (for Linux)
        - E.g., Node.js
      - Can build in a container also.

### [About App Service Plans](https://app.pluralsight.com/course-player?clipId=8a6902a9-5ab2-4f5f-b390-899533139e6b)

- Every web application will be placed in a dedicated app service, and each app service must map to an app service plan.
  - An app service plan describes the performance characteristics of the VM that will host the web app.
    - A VM behind the scenes, but abstracted away.
    - Multiple app services can be mapped to the same app service plan &rarr; will live together on the same VM.
      - One reason to keep app services together: Can scale together.
        - Scale up
          - Change plan to one with more compute resources.
        - Scale out
          - By default, just a single instance is in use. Can go as high as 20 instance with the P2 plan.
          - Can scale in/out based on load or schedule, with load balancing.

### [Creating an App Service Plan](https://app.pluralsight.com/course-player?clipId=b4e96630-1419-4e73-9cd9-8d6e41e9ad20)

- Portal > App service > app service plan
  - Choose from list, or create new
    - Name
    - Location
    - Pricing tier
- CLI

  ```sh
  az group
  az appservice plan create
  # An app service maps to the `webapp` command.
  az webapp list
  # Get the name of each app service.
  az webapp list --query [].name
  ```

- In portal, note URL for app service.

### [Deploying an App Service Using Git](https://app.pluralsight.com/course-player?clipId=3969bc32-87a9-41f2-ae81-f850c655b6e2)

- Prework: `nmp install -g express-generator`
- Can set up a Git repo that lives inside the app service.
- App service blade
  - Deployment credentials
  - Deployment options
    - Source
      - Local, Bitbucket, Github
    - Back on app service blade, note Git clone URL (`https://<app-service-name>.scm.azurewebsites.net:443`)
      - Locally, `git init && git remote add <name> <git-clone-url>`
      - Ensure `.gitignore` is created.
      - After pushing, note logs about deployment.
        - Azure determined that this is a Node.js application, so it's copying the files and doing an npm install.

### [Summary](https://app.pluralsight.com/course-player?clipId=e1063515-de3c-414e-b875-f17c1bc70229)

## Monitoring & Scaling Web Applications and APIs

### [Introduction]()

### [Deployment Slots]()

### [Creating and Deploying Using a Deployment Slot]()

### [Monitoring Your Application]()

### [Creating Alerts for your Application]()

### [Scaling Your Application]()

### [Monitoring and Debugging with Application Insights]()

### [Using Project Kudu]()

### [Summary]()

## Using Cloud Databases

### [Introduction]()

### [Databases in the Cloud]()

### [Creating and Scaling an Azure SQL Database]()

### [Connecting and Configuring an Azure SQL Database]()

### [Reading and Writing Data to Azure SQL from NodeJS]()

### [Creating a Cosmos DB Account]()

### [Creating and Scaling a Cosmos DB Collection]()

### [Reading and Writing Documents with Cosmos DB and NodeJS]()

### [Monitoring Cosmos DB]()

### [Summary]()

## Cloud Storage

### [Introduction]()

### [Understanding Azure Storage Features]()

### [Accounts, Containers, and Blobs]()

### [Creating a Storage Account]()

### [Managing Storage with Storage Explorer]()

### [Uploading a Blob from NodeJS]()

### [Generating a Shared Access Signature]()

### [Summary]()

## Functions

### [Introduction]()

### [Serverless Computing]()

### [Creating a Function App]()

### [Creating a Function in the Azure Portal]()

### [Function Triggers and Configuration]()

### [Function Monitoring and Application Settings]()

### [Using the Function CLI for Local Development]()

### [Using Cognitive Services for Image Analysis]()

### [Exporting Results to Cosmos DB]()

### [Summary]()

## Continuous Integration

### [Introduction]()

### [Visual Studio Team Services]()

### [Creating a Team Project]()

### [Pushing Code into VSTS]()

### [Configuring a Gulp Build Task]()

### [Creating a Build Definition]()

### [Creating a Release Definition]()

### [Continuous Deployment in Action]()
