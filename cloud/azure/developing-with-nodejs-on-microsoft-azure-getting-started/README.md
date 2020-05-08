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

- `Resources` > `Virtual machines`
  - Select image
    - E.g., Ubuntu Server
    - Deployment model: Use `Resource Manager` (vs. `Classic`)

### [Configuring Your Virtual Machine](https://app.pluralsight.com/course-player?clipId=69b1191e-964e-4880-8362-a6cc34034318)

- Configure basic settings
  - `Name`
  - `VM disk type`
    - Options
      - `SSD`
      - `HDD` (cheaper, slower)
  - `User Name`
  - `Authentication`
    - Options
      - `SSH public key`
        - E.g., via `ssh-keygen`
          - Public key: `.ssh/id_rsa.pub` (start copying at `ssh-rsa` through end of key)
      - `Password`
  - `Subscription`
    - Subscriptions can use different credit cards (e.g., for separating clients)
  - `Resource group`
    - A logical container for resources that simplifies management.
  - `Location`
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

- `App Services`
  - Where you want to go to build a web app or web API

### [Creating an App Service](https://app.pluralsight.com/course-player?clipId=b09e09a9-102b-440b-aef3-6a3452cb0de1)

- Create an app service in the portal
  - `App Services`
    - `Add`
    - `Starting configuration`
      - E.g. Wordpress, Node.js empty web app
      - Or empty web app
    - `App name`
      - Must be unique in the domain (`.azurewebsite.net`)
      - Can select operating system
        - Not much configuration to do.
      - `App service plan`
        - See below
      - `Runtime stack` (for Linux)
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
  - `Deployment credentials`
  - `Deployment options`
    - Source
      - Local, Bitbucket, Github
    - Back on app service blade, note Git clone URL (`https://<app-service-name>.scm.azurewebsites.net:443`)
      - Locally, `git init && git remote add <name> <git-clone-url>`
      - Ensure `.gitignore` is created.
      - After pushing, note logs about deployment.
        - Azure determined that this is a Node.js application, so it's copying the files and doing an npm install.

### [Summary](https://app.pluralsight.com/course-player?clipId=e1063515-de3c-414e-b875-f17c1bc70229)

## Monitoring & Scaling Web Applications and APIs

### [Introduction](https://app.pluralsight.com/course-player?clipId=6f77eb1f-bd1c-4163-bb08-850e45a7f799)

### [Deployment Slots](https://app.pluralsight.com/course-player?clipId=4472d2e8-ea42-4e5a-9121-b27b8c1ee732)

- Deployment slots allow verifying that an application is working as expected before deploying to production.
  - E.g., `QA`, `Staging`, `Production`
- Swapping slots is easy, such as for zero-downtime deployments.

### [Creating and Deploying Using a Deployment Slot](https://app.pluralsight.com/course-player?clipId=12c3d2e7-337e-452f-8062-1862271f02cd)

- Portal > `App Services` > App blade service
  - Could select a differnet tuntime stack, etc.
  - Application settings
    - Key-value pairs for environment variables (accessible by `process.env.<name>`)
      - `Slot setting` makes it sticky: when swapping, these settings don't move.
  - Deployment slots
    - Add a slot
- Or, via CLI:

  ```sh
  az webapp deployment slot create
  ```

- Convention: Take name of app service and append it with a `-` and a deployment slot type (e.g., `name-staging`).
  - This effectively creates a new sub-app service.
  - And then can add a new Git remote to deploy to the new slot.
- Then can swap via portal (in deployment slots) or via CLI: `az webapp deployment slot swap -g <resrouce-group> -n <app-service-name> --slot <slot-name> --target-slot <target-slot-name>`

### [Monitoring Your Application](https://app.pluralsight.com/course-player?clipId=c0b958dd-97b4-45a9-a3e3-3be05fb3ac4b)

- App service blade > `Overview` blade
  - Can see errors, data coming in, data going out, request count, response time
  - Can pin any to dashboard or modify charts.
- `All services` > Monitor
  - `Metrics` > resource

### [Creating Alerts for your Application](https://app.pluralsight.com/course-player?clipId=eea82901-e340-4209-ba03-17aa1b64f5cb)

- `All services` > `Monitor` > `Alerts`
  - Could also create an alert from an app service.
  - At tht time of this video, alerts classic was more appropriate for app services.
  - 2 types
    - `Metric alert`
      - Errors, usage, etc.
    - `Activity log alerts`
      - When someone takes an action against a resource
  - Can alert roles:
    - Owners, contributors, readers.

### [Scaling Your Application](https://app.pluralsight.com/course-player?clipId=cd246ec8-edcf-4792-a91e-f6ac3e76a85c)

- Scaling in the portal
  - App service blade > `Scale up (App Service plan)` or `Scale out (App Service plan)`
  - Can `Enable autoscale`
    - Can add conditions

### [Monitoring and Debugging with Application Insights](https://app.pluralsight.com/course-player?clipId=071ab651-6233-48a6-9180-0c1337e40452)

- `App Services` > `Monitoring`
  - `Docker Container logging`
    - Need `Quota`
- `Application Insights`

  - Performance management service
    - Highly recommended. Cost when logging more than 2 GB (as of course date).
  - Can use existing resource or create new
  - Can query API with HTTP calls
  - To start recording:

    - In application, `npm install applicationinsights`
    - Then in `app.js` near the top:

      ```js
      var appInsights = require('applicationinsights');
      // Copy Instrumentation Key from portal and paste
      appInsights.setup('some-guid');
      appInsights.start();
      ```

    - Will log unhandled exceptions, etc.
    - To log exceptions in production: In an error handler:

      ```js
      appInsights.defaultClient.trackException({ exception: err });
      ```

  - `Metrics Explorer`

### [Using Project Kudu](https://app.pluralsight.com/course-player?clipId=4e38075c-6f9f-471f-981c-d99055b69123)

- App service > `Advanced Tools` > `Go`
  - Project Kudu
  - Can SSH into server

### [Summary](https://app.pluralsight.com/course-player?clipId=b51df91b-3449-45b8-8818-a1ae7cd06c47)

## Using Cloud Databases

### [Introduction](https://app.pluralsight.com/course-player?clipId=27d79a90-0ff3-4a31-a1d0-7546fb2e1dda)

### [Databases in the Cloud](https://app.pluralsight.com/course-player?clipId=05776de9-bf03-4fa2-9e5d-c2db98eeb648)

- `Azure SQL Database`
  - RDBMS
  - Adaptively tunes performance.
  - Can work with SQL Server locally.
- `Cosmos DB Database`
  - Document-oriented database
  - MongoDB-compatible API

### [Creating and Scaling an Azure SQL Database](https://app.pluralsight.com/course-player?clipId=60615205-ba86-4c03-8bc6-9f638f7ab250)

- `Home` > `SQL databases` > `SQL Database`
  - `Database name`
  - `Subscription`
  - `Resource group`
  - `Select source`
    - `Blank`, `Adventureworks`, backup
  - `Server`
  - `SQL elastic pool`
    - Effective way to scale processing when dealing with multiple databases
  - `Pricing tier`
    - Database size
    - DTUs: Database Throughput Unit
- A logical server needs to be associated with the database(s).

### [Connecting and Configuring an Azure SQL Database](https://app.pluralsight.com/course-player?clipId=e3bb2406-b6a6-4cb5-81a3-4194b1b1ec8d)

- `Home` > `SQL databases` > database
  - Can see DTU usage
  - Transparent data encryption
  - Automatic tuning
  - Threat detection
  - Geo-replication
- Ways to connect:
  - Most tools that work with SQL Server or ODBC
  - Portal query editor
  - VS Code extension: `mssql`
    - Click on `Disconnected` on bottom right &rarr; set up database connection.
    - Can right click, `Execute query`
- Note that firewall only allows access from within Azure. In `Firewall settings`, can `Add client IP`.

### [Reading and Writing Data to Azure SQL from NodeJS](https://app.pluralsight.com/course-player?clipId=c87e28a6-9bd8-44f9-aad9-44d6133ac124)

```sh
npm install tedious
```

```js
var Connection = tedious.Connection;
var Request = tedious.Request;
var config = {
  // Connection info
};
```

### [Creating a Cosmos DB Account](https://app.pluralsight.com/course-player?clipId=6c6d7b71-b8dc-42e0-ace4-2e106193f98f)

- Original name: Document DB
- `Home` > `Azure Cosmos DB` > `Add`
  - `ID`
  - `API`
    - SQL
    - MongoDB
    - Cassandra
    - Azure Table
    - Gremlin (graph)
  - `Subscription`
  - `Resource group`
  - `Location`
  - `Enable geo-redundancy`

### [Creating and Scaling a Cosmos DB Collection](https://app.pluralsight.com/course-player?clipId=b53b3ee9-bbc5-494e-848c-f6a1e63ca991)

- `Home` > `Azure Cosmos DB` > Cosmos account
  - `Add Collection`
    - Can create new database
    - Consider segregating less-frequently-used items in tables with lower provisioned resources to save cost.
    - 1 RU: Fetching 1 KB over HTTP
    - Can specify unique keys

### [Reading and Writing Documents with Cosmos DB and NodeJS](https://app.pluralsight.com/course-player?clipId=66d38527-3501-4bbb-93e9-044450ffeb68)

- Everything with Cosmos DB is based on HTTP messaging.

```sh
npm install documentdb
```

```js
var docdb = require('documentdb');
var config = {
  // Configuration info
};
var client = new docdb.DocumentClient(config.host, config.auth);
client.createDocument(/* ... */);
client.queryDocuments(/* ... */); // Returns a query iterator; can call .toArray() on it.
```

### [Monitoring Cosmos DB](https://app.pluralsight.com/course-player?clipId=c29adb36-82e5-423c-8b8d-2a3a2387440b)

- Note that Cosmos DB has
  - Stored Procedures (implemented in JavaScript)
  - User Defined Functions
  - Triggers
- `Home` > `Azure Cosmos DB` > `Overview`
  - Note that `429`s indicate that insufficient RUs are provisioned.

### [Summary](https://app.pluralsight.com/course-player?clipId=1bed435a-294b-43a5-836f-2cc40d0d2c4e)

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
