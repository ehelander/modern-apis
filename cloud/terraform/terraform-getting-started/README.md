# [Terraform - Getting Started](https://app.pluralsight.com/course-player?courseId=cc6552b7-fc1c-4dfe-a3f3-635c8a0c4528), Ned Bellavance, 2019-10-02

## Course Overview

### [Course Overview](https://app.pluralsight.com/course-player?clipId=199606ac-3578-4699-99ea-f9ff88255d2c)

## What You Need to Know About Infrastructure as Code

### [Overview](https://app.pluralsight.com/course-player?clipId=4ffc60c2-9f03-40d8-a6df-b7668efe8466)

### [Infrastructure as Code Defined](https://app.pluralsight.com/course-player?clipId=b34394c1-d8d9-4a18-90ca-3827e5bd6355)

- Infrastructure as Code:
  - Provisioning infrastructure through software to achieve consistent and predictable environments.
    - Software: Not a manual process
- Core concepts of Iac:
  - Defined in code
  - Stored in source control
  - 2 approaches:
    - Declarative
    - Imperative
  - Idempotent & consistent
  - Push or pull
    - Terraform is a push model
    - Pull: E.g., a running agent that pull from a central source.

### [Declarative vs. Imperative](https://app.pluralsight.com/course-player?clipId=b13f5368-0050-4740-8999-db3b051f0192)

### [Idempotence and Consistency](https://app.pluralsight.com/course-player?clipId=72b97ae7-2a61-4c7f-9433-3a290dcb63a4)

### [Push or Pull](https://app.pluralsight.com/course-player?clipId=eab60448-8849-44a6-872a-17104d35c59c)

### [IaC Benefits](https://app.pluralsight.com/course-player?clipId=48775898-6b30-4b77-b8b1-937dd4667e7f)

- Automated deployment
- Consistent environments
- Repeatable process
- Reusable components
- Documented architecture

### [Summary](https://app.pluralsight.com/course-player?clipId=8e138525-577a-4482-99c5-232210097165)

- Manual processes are the enemy.

## Deploying Your First Terraform Configuration

### [Overview](https://app.pluralsight.com/course-player?clipId=6ee9f344-c758-468e-b262-924da39b3388)

### [Provisioning Resources](https://app.pluralsight.com/course-player?clipId=ac05cb56-b5f0-468e-b379-cd41e999ee8e)

- Provisioning resources
- Planning updates
- Using source control
- Reusing templates

### [Our Scenario](https://app.pluralsight.com/course-player?clipId=a337fa58-4e12-4c9f-80e8-89ed9f8c051b)

### [Terraform Components](https://app.pluralsight.com/course-player?clipId=cb1fa927-4f1c-4e28-adbd-a2dc335c5541)

- Terraform components
  - Terraform executable
    - Self-contained
    - Written in Go
    - Available for any major OS
  - Terraform files
    - Typically use `.tf` extension
    - Terraform stitches together all `.tf` files from a directory.
  - Terraform plugins
    - To interact with providers (e.g., AWS)
  - Terraform state
    - Keep track of resources
    - A state file, tracking the current state
    - When you want to do an update, Terraform compares the update to the current state and figures out what changes are necessary.
- What we'll need:

  - AWS credentials

    - Terraform provides the ability to store this type of information in variables:

      ```tf
      variable "aws_access_key" {}
      variable "aws_secret_key" {}

      variable "aws_region" {
        default = "us-east-1"
      }
      ```

    - Credentials are a required property for a provider:

      ```tf
      provider "aws" {
        access_key = "var.access_key"
        secret_key = "var.secret_key"
        region = "var.aws_region"
      }
      ```

      - See documentation for required and optional properties.

    - Data from a provider (e.g., get all available AWS Linux AMIs):

      ```tf
      data "aws_ami" "alx" {
        most_recent = true
        owners = ["amazon"]
        filters = {}
      }
      ```

    - Resource (e.g., create an instance):

      ```tf
      resource "aws_instance" "ex" {
        # Passin the AMI we got from our data source:
        ami = "data.aws_ami.alx.id"
        # Hard-coding the instance type:
        instance_type = "t2.micro"
      }
      ```

    - Output (e.g., get the public IP from an instance)

      ```tf
      output "aws_public_ip" {
        value = "aws_instance.ex.public_dns"
      }
      ```

### [Demo Prep](https://app.pluralsight.com/course-player?clipId=6fb3864b-37a5-4ad3-844d-5db189a557c8)

- Prerequisites

  - AWS account
  - Demo files: https://github.com/ned1313/Getting-Started-Terraform

    ```sh
    git clone https://github.com/ned1313/Getting-Started-Terraform.git
    ```

### [Examining the Configuration](https://app.pluralsight.com/course-player?clipId=98bd02b2-f22d-48eb-8d2b-68e0f15a73fe)

- Our module: [demo/m3/module_three.tf](demo/m3/module_three.tf)

  ```tf
  ##################################################################################
  # VARIABLES
  ##################################################################################

  # Define our variables.
  variable "aws_access_key" {}
  variable "aws_secret_key" {}
  variable "private_key_path" {}
  variable "key_name" {}
  variable "region" {
    default = "us-east-1"
  }

  ##################################################################################
  # PROVIDERS
  ##################################################################################

  provider "aws" {
    access_key = var.aws_access_key
    secret_key = var.aws_secret_key
    region     = var.region
  }

  ##################################################################################
  # DATA
  ##################################################################################

  data "aws_ami" "aws-linux" {
    most_recent = true
    owners      = ["amazon"]

    filter {
      name   = "name"
      values = ["amzn-ami-hvm*"]
    }

    filter {
      name   = "root-device-type"
      values = ["ebs"]
    }

    filter {
      name   = "virtualization-type"
      values = ["hvm"]
    }
  }

  ##################################################################################
  # RESOURCES
  ##################################################################################

  #This uses the default VPC.  It WILL NOT delete it on destroy.
  resource "aws_default_vpc" "default" {

  }

  resource "aws_security_group" "allow_ssh" {
    name        = "nginx_demo"
    description = "Allow ports for nginx demo"
    # A frequent pattern, known as the 'triplet': The resource type, the resource name, and the resource property.
    vpc_id      = aws_default_vpc.default.id

    ingress {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
      from_port   = 0
      to_port     = 0
      protocol    = -1
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  resource "aws_instance" "nginx" {
    # Use the ID from the AMI resource defined above.
    ami                    = data.aws_ami.aws-linux.id
    instance_type          = "t2.micro"
    key_name               = var.key_name
    # Brackets indicate a list.
    vpc_security_group_ids = [aws_security_group.allow_ssh.id]

    connection {
      type        = "ssh"
      # `self`: Refers to the resource being defined.
      host        = self.public_ip
      user        = "ec2-user"
      # `file()` is a function, reading the contents of that private key file.
      private_key = file(var.private_key_path)

    }

    # We want to remotely execute an inline script
    provisioner "remote-exec" {
      inline = [
        "sudo yum install nginx -y",
        "sudo service nginx start"
      ]
    }
  }

  ##################################################################################
  # OUTPUT
  ##################################################################################

  # What we want Terraform to output to us after the configuration has been instantiated.
  output "aws_instance_public_dns" {
    value = aws_instance.nginx.public_dns
  }
  ```

- We didn't give values to all of the variables.

### [Working with Variables](https://app.pluralsight.com/course-player?clipId=9cf9f115-9f32-4605-b5c9-269c7b49ca36)

- A number of ways to define Terraform variables.

  - One way: Use a `.tfvars` file (can use double or single quotes).
  - [demo/m3/terraform.tfvars.example](demo/m3/terraform.tfvars.example)

    ```tfvars
    aws_access_key = ""

    aws_secret_key = ""

    key_name = "name_of_existing_key_pair"

    private_key_path = "private_key_path\private_key_file.pem"
    ```

### [Deploying the Configuration](https://app.pluralsight.com/course-player?clipId=8e2af742-18fc-450a-ba04-3026bb98d4f2)

```sh
cd demo/m3/
ls

# Shows potential commands.
terraform

# Check version.
terraform version

# Because we're using AWS, we need to get the AWS provider plugin.
# We do this by init.
terraform init

# Look at the files in the working directory and load the variables in the same directory.
# Store the plan in m3.tfplan so we can reference it when we want to create the resources.
terraform plan -out m3.tfplan
# Console output shows resources that would be added, changed, destroyed.

# Apply the plan.
terraform apply "m3.tfplan"
# Console output shows public DNS.

# Note that the current state is now stored in `terraform.tfstate` (stored in the same directory, by default)

# Destroy the configuration (which references the state file).
terraform destroy
# `yes` to confirm.
```

- Note that some resource attributes are known at plan time; others are unknown until apply:
  - ![](2020-11-04-17-00-10.png)

### [Summary](https://app.pluralsight.com/course-player?clipId=6cb34662-488b-4a71-9e68-56a19a33270d)

## Updating Your Configuration with More Resources

### [Overview]()

### [Terraform State]()

### [Terraform Plan]()

### [The Scenario, Part 1]()

### [Deploying a VPC]()

### [The Scenario, Part 2]()

### [Updating Resources]()

### [Summary]()

## Configuring a Resource After Creation

### [Overview]()

### [Terraform Syntax]()

### [Blocks]()

### [References]()

### [Updated Scenario]()

### [Provisioners]()

### [Variables and Tags]()

### [Instance Configuration]()

### [S3 Configuration]()

### [Configuration Deployment]()

### [Summary]()

## Adding a New Provider to Your Configuration

### [Overview]()

### [Sally Sue Strikes Again]()

### [Terraform Functions]()

### [Function Examples]()

### [Terraform Console]()

### [Terraform CLI]()

### [Terraform Providers]()

### [Adding the AzureRM Provider]()

### [Resource Arguments]()

### [Using the Count Argument]()

### [Deploying the Configuration]()

### [Summary]()

## Using Variables and Functions

### [Overview]()

### [Sally Sue Is Back, Again]()

### [Working with Variables]()

### [Updating the Configuration Variables]()

### [Adding Multiple Environments]()

### [Using Terraform Workspaces]()

### [Deploying the Lower Environments]()

### [Managing Secrets]()

### [Using Environment Variables in Production]()

### [Summary]()

## Using a Module for Common Configurations

### [Overview]()

### [The Scenario Expands]()

### [Modules]()

### [Using the VPC Module]()

### [Using the S3 Module]()

### [Deploying the Configuration]()

### [Summary]()
