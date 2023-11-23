---
title: "Deploy Secure Spring Boot Microservices on Amazon EKS Using Terraform and Kubernetes"
published: true
description: Deploy a cloud-native Java Spring Boot microservice stack secured with Auth0 on Amazon EKS using Terraform and Kubernetes.
tags:
  - java
  - terraform
  - kubernetes
  - aws
cover_image: >-
  https://images.ctfassets.net/23aumh6u8s0i/4v0xPe8ANM1ntPRbQCVZVs/97fb1ada5c603d12b9f505574196cac4/java-duke.jpg
canonical_url: "https://auth0.com/blog/terraform-eks-java-microservices/"
---

_Originally published at [auth0.com](https://auth0.com/blog/terraform-eks-java-microservices/)_

When it comes to infrastructure, public clouds are the most popular choice these days, and Amazon Web Services (AWS) is the go-to option. If you are working with microservices, orchestrating their deployments becomes essential. Kubernetes is the de-facto choice for orchestrating microservices, and most public cloud providers offer managed Kubernetes services. For AWS, the managed Kubernetes service is Amazon Elastic Kubernetes Service (EKS).

Deploying and managing microservices on the public cloud is not without its challenges. Each cloud service has its own complexities. Among them, Amazon EKS is one of the most flexible but also one of the most difficult Kubernetes services to use. EKS utilizes clever orchestrations on top of other AWS services like EC2, EBS, and more.

To run a microservice stack on EKS, you will need to spend extra time and effort setting it up and managing it. This is where infrastructure as code (IaC) tools like [Terraform](https://www.terraform.io/) come in handy.

## Overview

So here is what you will learn to do today:

- Scaffold a Java microservice stack using JHipster, Spring Boot, and Spring Cloud
- Create an EKS cluster, Virtual Private Cloud (VPC), subnets, and required Kubernetes add-ons using Terraform on AWS
- Set up Terraform scripts for OpenID Connect (OIDC) authentication for the microservice stack using Auth0 by Okta
- Build and deploy the microservice stack to the cluster

**Prerequisites:**

- [AWS account](https://portal.aws.amazon.com/billing/signup) with the [IAM permissions to create EKS clusters](https://docs.aws.amazon.com/eks/latest/userguide/security_iam_id-based-policy-examples.html)
- AWS CLI [installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Docker](https://docs.docker.com/get-docker/) installed and configured
- [Terraform](https://www.terraform.io/downloads) CLI
- [Java 11+](https://sdkman.io/usage)
- [Auth0 CLI](https://auth0.github.io/auth0-cli/)
- [Optional] [JHipster](https://www.jhipster.tech/installation/) CLI
- [Optional] [KDash](https://github.com/kdash-rs/kdash)

## Why Terraform, Why Not Cloud Formation?

At this point, the first question that might pop up in your mind would be, "Why not use [CloudFormation](https://aws.amazon.com/cloudformation/)?". It's a good question; after all, CloudFormation is built by AWS and hence sounds like an excellent solution to manage AWS resources. But anyone who has tried both CloudFormation and Terraform will probably tell you to forget that CloudFormation even exists. I think CloudFormation is far more complex and less developer-friendly than Terraform. You also need to write a lot more boilerplate with CloudFormation in YAML or JSON. Yikes! In contrast, Terraform is elegant and concise, and the syntax is easier to read and write. It's cross-platform, developer-friendly, and does not require a lot of ramp-up time.

Okay, now that we have that sorted, let's dive into the steps to deploy our microservice stack on EKS.

## Scaffold a Java Microservice Stack Using JHipster

To start, you will scaffold a Java microservice stack using [JHipster](https://www.jhipster.tech), Spring Boot, and Consul. JHipster is an excellent tool to generate a microservice stack with Spring Boot, Angular/React/Vue.js, and other modern frameworks. You can use another microservice stack if you want. If you prefer using the same application as in this demo, then you can either scaffold it using JHipster [JDL](https://www.jhipster.tech/jdl/intro) or clone the sample repository from [GitHub](https://github.com/oktadev/auth0-jhipster-k8s-eks-microservices-example). Here is how you can scaffold your microservice stack using JHipster:

![JHipster microservice architecture](https://images.ctfassets.net/23aumh6u8s0i/4yatkCE8FKwJaySwnBRNeG/ee5ecddec53a48ffc712b0aaa8a1e70e/jh-microservice-auth0-consul.jpg)

**Option 1: Scaffold the microservice stack using JHipster**

Use JHipster version **7.9.3** or **8.0.0**

```bash
mkdir jhipster-microservice-stack
cd jhipster-microservice-stack
# download the JDL file.
jhipster download https://raw.githubusercontent.com/oktadev/auth0-jhipster-k8s-eks-microservices-example/main/apps.jdl
# Update the `dockerRepositoryName` property to use your Docker Repository URI/Name.
# scaffold the apps.
jhipster jdl apps.jdl
```

**Option 2: Clone the sample repository**

```
git clone https://github.com/oktadev/auth0-jhipster-k8s-eks-microservices-example
```

In either case, remember to change the Docker repository name in the JDL file and Kubernetes manifests to match your Docker repository.

The JHipster scaffolded sample application has a gateway application and two microservices. It uses [Consul](https://www.consul.io/) for service discovery and centralized configuration.

## Create an EKS Cluster Using Terraform

Now let us move on to the important part of the tutorial. Creating an EKS cluster in AWS is not as straightforward as in other cloud platforms. You need to also create a lot more resources for everything to work correctly without surprises. You will be using a bunch of Terraform providers to help with this, and you will also use some prebuilt Terraform modules like [AWS VPC Terraform module](https://github.com/terraform-aws-modules/terraform-aws-vpc) and [Amazon EKS Blueprints for Terraform](https://github.com/aws-ia/terraform-aws-eks-blueprints) to reduce the amount of boilerplate you need to write.

These are the AWS resources and VPC architecture you will create:

![AWS EKS and VPC architecture](https://images.ctfassets.net/23aumh6u8s0i/3Mp7zJ1fmWkxng0Pqrxnft/905300cce62bf12b986a2177f5b7d11c/tf-eks-arch.jpg)

### Build the Terraform configuration

First, make sure you use a specific version of the providers as different versions might use different attributes and features. Create a `versions.tf` file:

```bash
mkdir terraform
cd terraform
touch versions.tf
```

Add the following to the file:

```hcl
terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.47"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.20"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.9"
    }
  }
}
```

Next, you need to define variables and configure the providers. Create a `config.tf` file:

```bash
touch config.tf
```

Add the following to the file:

```hcl
# ##  To save state in s3. Update to suit your needs
# backend "s3" {
#   bucket = "create-an-s3-bucket-and-provide-name-here"
#   region = local.region
#   key    = "eks-cluster-with-new-vpc/terraform.tfstate"
# }

variable "region" {
  default     = "eu-west-1"
  description = "AWS region"
}

data "aws_availability_zones" "available" {}

locals {
  name            = "okta-auth0-jhipster-eks"
  region          = var.region
  cluster_version = "1.27"
  instance_types  = ["t2.large"] # can be multiple, comma separated

  vpc_cidr = "10.0.0.0/16"
  azs      = slice(data.aws_availability_zones.available.names, 0, 3)

  tags = {
    Blueprint  = local.name
    GitHubRepo = "github.com/aws-ia/terraform-aws-eks-blueprints"
  }
}

provider "aws" {
  region = local.region
}

# Kubernetes provider
# You should **not** schedule deployments and services in this workspace.
# This keeps workspaces modular (one for provision EKS, another for scheduling
# Kubernetes resources) as per best practices.
provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    # This requires the awscli to be installed locally where Terraform is executed
    args = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
  }
}

provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      # This requires the awscli to be installed locally where Terraform is executed
      args = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
    }
  }
}
```

You can uncomment the `backend` section above to save the state in AWS S3 instead of your local filesystem. This is recommended for production setup so that everyone in a team has the same state. This file defines configurable and local variables used across the workspace and configures some of the providers used. The Kubernetes provider is included in this file so the EKS module can complete successfully. Otherwise, it throws an error when creating `kubernetes_config_map.aws_auth`. The Helm provider is used to install Kubernetes add-ons to the cluster.

### Build the VPC

Next up, you need a VPC, subnets, route tables, and other networking bits. You will use the `vpc` module from the [`terraform-aws-modules`](https://github.com/terraform-aws-modules) repository. This module is a wrapper around the AWS VPC module. It makes it easier to configure VPCs and all the other required networking resources. Create a `vpc.tf` file:

```bash
touch vpc.tf
```

Add the following to the file:

```hcl
#---------------------------------------------------------------
# VPC, Subnets, Internet gateway, Route tables, etc.
#---------------------------------------------------------------
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = local.name
  cidr = local.vpc_cidr

  azs             = local.azs
  public_subnets  = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k)]
  private_subnets = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k + 10)]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  # Manage so we can name them
  manage_default_network_acl    = true
  default_network_acl_tags      = { Name = "${local.name}-default" }
  manage_default_route_table    = true
  default_route_table_tags      = { Name = "${local.name}-default" }
  manage_default_security_group = true
  default_security_group_tags   = { Name = "${local.name}-default" }

  public_subnet_tags = {
    "kubernetes.io/cluster/${local.name}" = "shared"
    "kubernetes.io/role/elb"              = 1
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${local.name}" = "shared"
    "kubernetes.io/role/internal-elb"     = 1
  }

  tags = local.tags
}
```

This will create:

- A new VPC, three private subnets, and three public subnets,
- An Internet gateway and NAT gateway for the public subnets,
- and AWS routes for the gateways, public/private route tables, and route table associations.

### Build the EKS cluster

Now that you have the networking part done, you can build configurations for the EKS cluster and its add-ons. You will use the [`terraform-aws-modules`](https://github.com/terraform-aws-modules) to create the EKS cluster and `eks_blueprints` module from [`terraform-aws-eks-blueprints`](https://aws-ia.github.io/terraform-aws-eks-blueprints/)to configure EKS add-ons.

Create a `eks-cluster.tf` file:

```bash
touch eks-cluster.tf
```

Add the following to the file:

```hcl
#---------------------------------------------------------------
# EKS cluster, worker nodes, security groups, IAM roles, K8s add-ons, etc.
#---------------------------------------------------------------
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.15"

  cluster_name                   = local.name
  cluster_version                = local.cluster_version
  cluster_endpoint_public_access = true
  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets

  # EKS Addons
  cluster_addons = {
    aws-ebs-csi-driver = {
      most_recent = true
    }
    coredns    = {}
    kube-proxy = {}
    vpc-cni    = {}
  }
  eks_managed_node_group_defaults = {
    # Needed by the aws-ebs-csi-driver
    iam_role_additional_policies = {
      AmazonEBSCSIDriverPolicy = "arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
    }
  }
  eks_managed_node_groups = {
    initial = {
      instance_types = local.instance_types
      min_size       = 2
      max_size       = 4
      desired_size   = 3
      subnet_ids     = module.vpc.private_subnets
    }
  }

  tags = local.tags
}

module "eks_blueprints_addons" {
  source = "github.com/aws-ia/terraform-aws-eks-blueprints//modules/kubernetes-addons?ref=v4.32.1"

  eks_cluster_id        = module.eks.cluster_name
  eks_cluster_endpoint  = module.eks.cluster_endpoint
  eks_cluster_version   = module.eks.cluster_version
  eks_oidc_provider     = module.eks.oidc_provider
  eks_oidc_provider_arn = module.eks.oidc_provider_arn

  # K8S Add-ons
  enable_aws_load_balancer_controller = true
  enable_metrics_server               = true
  enable_aws_cloudwatch_metrics       = false

  tags = local.tags
}

# To update local kubeconfig with new cluster details
resource "null_resource" "kubeconfig" {
  depends_on = [module.eks_blueprints_addons]
  provisioner "local-exec" {
    command = "aws eks --region ${local.region}  update-kubeconfig --name $AWS_CLUSTER_NAME"
    environment = {
      AWS_CLUSTER_NAME = local.name
    }
  }
}
```

The `eks` module definition creates:

- EKS Cluster Control plane with one [managed node group](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html),
- Cluster and node security groups and rules, IAM roles and policies required,
- Amazon EKS add-ons ebs-csi-driver, vpc-cni, CoreDNS, and kube-proxy,
- and AWS Key Management Service (KMS) configuration.

The `eks_blueprints_addons` module definition creates:

- AWS Load Balancer Controller that provisions an AWS Network Load Balancer for distributing traffic,
- and the [Metrics Server](https://github.com/kubernetes-sigs/metrics-server).

The `null_resource` configuration updates your local `kubeconfig` file with the new cluster details. It's not a required step for provisioning but just a handy hack.

Finally, you can also define some outputs to be captured. Create a `outputs.tf` file:

```bash
touch outputs.tf
```

Add the following to the file:

```hcl
output "vpc_private_subnet_cidr" {
  description = "VPC private subnet CIDR"
  value       = module.vpc.private_subnets_cidr_blocks
}

output "vpc_public_subnet_cidr" {
  description = "VPC public subnet CIDR"
  value       = module.vpc.public_subnets_cidr_blocks
}

output "vpc_cidr" {
  description = "VPC CIDR"
  value       = module.vpc.vpc_cidr_block
}

output "eks_cluster_id" {
  description = "EKS cluster ID"
  value       = module.eks.cluster_id
}

output "eks_cluster_name" {
  description = "EKS cluster Name"
  value       = module.eks.cluster_name
}

output "eks_managed_nodegroups" {
  description = "EKS managed node groups"
  value       = module.eks.eks_managed_node_groups
}

output "configure_kubectl" {
  description = "Configure kubectl: make sure you're logged in with the correct AWS profile and run the following command to update your kubeconfig"
  value       = "aws eks update-kubeconfig --name ${module.eks.cluster_name} --alias ${module.eks.cluster_name}"
}
```

### Provision the cluster

Our Terraform definitions are ready. Now you can provision the cluster.

First, ensure you have configured your AWS CLI to use the correct AWS account and a region that supports EKS. If not, run the following:

```bash
# Visit https://console.aws.amazon.com/iam/home?#/security_credentials for creating access keys
aws configure
```

Next, initialize Terraform workspace and plan the changes:

```bash
# Download modules and providers. Initialize state.
terraform init
# see a preview of what will be done
terraform plan
```

Review the plan and make sure everything is correct.

Now you can apply the changes:

```bash
terraform apply
```

Confirm by typing `yes` when prompted. This will take a while (15-20 minutes), so sit back and have a coffee or contemplate what led you to this point in life. 😉

Once the EKS cluster is ready, you will see the output variables printed to the console.

```hcl
configure_kubectl = "aws eks update-kubeconfig --name okta-auth0-jhipster-eks --alias okta-auth0-jhipster-eks"
eks_cluster_name = "okta-auth0-jhipster-eks"
eks_managed_nodegroups = {
  "initial" = {
    "autoscaling_group_schedule_arns" = {}
    "iam_role_arn" = "arn:aws:iam::216713166862:role/initial-eks-node-group-20230628170956397500000007"
    "iam_role_name" = "initial-eks-node-group-20230628170956397500000007"
    "iam_role_unique_id" = "AROATE5I4QAHNFCURF5WI"
    "launch_template_arn" = "arn:aws:ec2:eu-west-1:216713166862:launch-template/lt-028654c46a256c879"
    "launch_template_id" = "lt-028654c46a256c879"
    "launch_template_latest_version" = 1
    "launch_template_name" = "initial-2023062817211846290000000e"
    "node_group_arn" = "arn:aws:eks:eu-west-1:216713166862:nodegroup/okta-auth0-jhipster-eks/initial-20230628172118695900000010/f2c48183-0cd0-f970-d405-0869ccddad37"
    "node_group_autoscaling_group_names" = [
      "eks-initial-20230628172118695900000010-f2c48183-0cd0-f970-d405-0869ccddad37",
    ]
    "node_group_id" = "okta-auth0-jhipster-eks:initial-20230628172118695900000010"
    "node_group_labels" = tomap(null) /* of string */
    "node_group_resources" = tolist([
      {
        "autoscaling_groups" = tolist([
          {
            "name" = "eks-initial-20230628172118695900000010-f2c48183-0cd0-f970-d405-0869ccddad37"
          },
        ])
        "remote_access_security_group_id" = ""
      },
    ])
    "node_group_status" = "ACTIVE"
    "node_group_taints" = toset([])
  }
}
vpc_cidr = "10.0.0.0/16"
vpc_private_subnet_cidr = tolist([
  "10.0.10.0/24",
  "10.0.11.0/24",
  "10.0.12.0/24",
])
vpc_public_subnet_cidr = tolist([
  "10.0.0.0/24",
  "10.0.1.0/24",
  "10.0.2.0/24",
])
```

You should see the cluster details if you run `kdash` or `kubectl get nodes` commands.

![EKS cluster in KDash](https://images.ctfassets.net/23aumh6u8s0i/7jsmSHoLHEGh9HMb1lWNqj/cbac14bd55c5b4a31865cd683feb4b53/eks-cluster.png)

> **Note**: The EKS cluster defined here will not come under AWS free tier; hence, running this will cost money, so delete the cluster as soon as you finish the tutorial to keep the cost within a few dollars.

## Set Up OIDC Authentication Using Auth0 by Okta

You can proceed to deploy the sample application. You could skip this step if you used a sample that does not use Auth0 or OIDC for authentication.

Since you are using Terraform, you can set up the Auth0 application using the [Auth0 Terraform provider](https://registry.terraform.io/providers/auth0/auth0/latest/docs). This will allow you to automate the setup of the Auth0 application and manage the addition of users, customizations, and such.

### Create an Auth0 application

Open the `versions.tf` file in the `terraform` folder and add the following content to the `required_providers` section:

```hcl
    auth0 = {
      source  = "auth0/auth0"
      version = "~> 0.49.0"
    }
```

Let's create a Terraform script that creates an Auth0 web application and required customizations. Create a file named `auth0.tf` in the `terraform` folder and add the following content:

```hcl
provider "auth0" {
  domain        = "https://<your_auth0_domain_uri>"
  debug         = false
}

# Create a new Auth0 application for the JHipster app
resource "auth0_client" "java_ms_client" {
  name                = "JavaMicroservices"
  description         = "Java Microservices Client Created Through Terraform"
  app_type            = "regular_web"
  callbacks           = ["http://localhost:8080/login/oauth2/code/oidc"]
  allowed_logout_urls = ["http://localhost:8080"]
  oidc_conformant     = true

  jwt_configuration {
    alg = "RS256"
  }
}

# Configuring client_secret_post as an authentication method.
resource "auth0_client_credentials" "java_ms_client_creds" {
  client_id = auth0_client.java_ms_client.id

  authentication_method = "client_secret_post"
}

# Create roles for the JHipster app
resource "auth0_role" "admin" {
  name        = "ROLE_ADMIN"
  description = "Administrator"
}

resource "auth0_role" "user" {
  name        = "ROLE_USER"
  description = "User"
}

# Create an action to customize the authentication flow to add the roles and the username to the access token claims expected by JHipster applications.
resource "auth0_action" "jhipster_action" {
  name    = "jhipster_roles_claim"
  runtime = "node18"
  deploy  = true
  code    = <<-EOT
  /**
   * Handler that will be called during the execution of a PostLogin flow.
   *
   * @param {Event} event - Details about the user and the context in which they are logging in.
   * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
   */
   exports.onExecutePostLogin = async (event, api) => {
     const namespace = 'https://www.jhipster.tech';
     if (event.authorization) {
         api.idToken.setCustomClaim(namespace + '/roles', event.authorization.roles);
         api.accessToken.setCustomClaim(namespace + '/roles', event.authorization.roles);
     }
   };
  EOT

  supported_triggers {
    id      = "post-login"
    version = "v3"
  }
}

# Attach the action to the login flow
resource "auth0_trigger_actions" "login_flow" {
  trigger = "post-login"

  actions {
    id           = auth0_action.jhipster_action.id
    display_name = auth0_action.jhipster_action.name
  }
}

# Create a test user. You can create more users here if needed
resource "auth0_user" "test_user" {
  connection_name = "Username-Password-Authentication"
  name            = "Jane Doe"
  email           = "jhipster@test.com"
  email_verified  = true
  password        = "passpass$12$12" # Don't set passwords like this in production! Use env variables instead.
  lifecycle {
    ignore_changes = [roles]
  }
}

resource "auth0_user_roles" "test_user_roles" {
  user_id = auth0_user.test_user.id
  roles   = [auth0_role.admin.id, auth0_role.user.id]
}

output "auth0_webapp_client_id" {
  description = "Auth0 JavaMicroservices Client ID"
  value       = auth0_client.java_ms_client.client_id
}

output "auth0_webapp_client_secret" {
  description = "Auth0 JavaMicroservices Client Secret"
  value       = auth0_client_credentials.java_ms_client_creds.client_secret
  sensitive   = true
}
```

You can find your Auth0 domain in the [Auth0 dashboard](https://manage.auth0.com/) or by running the `auth0 tenants list` command. The script above does the following:

- The `auth0_client` resource definition creates an Auth0 Web application client conforming to the OIDC standard.
- The `auth0_client_credentials` resource definition configures the client to use the `client_secret_post` authentication method.
- The `auth0_role` resource definition creates two roles for the JHipster application.
- The `auth0_action` resource definition creates an action that will be executed during the Auth0 post-login flow. This action will add the roles and the username to the ID and access token claims as expected by JHipster applications.
- The `auth0_user` resource definition creates a test user.

### Provision the Auth0 application

Now before you can run this script you need to create a machine-to-machine application in Auth0 so that Terraform can communicate with the Auth0 management API. This can be done using the Auth0 CLI. Please note that you also need to have [jq](https://jqlang.github.io/jq/) installed to run the below commands. Run the following commands to create an application after logging into the CLI with the `auth0 login` command:

```bash
# Create a machine-to-machine application on Auth0
export AUTH0_M2M_APP=$(auth0 apps create \
  --name "Auth0 Terraform Provider" \
  --description "Auth0 Terraform Provider M2M" \
  --type m2m \
  --reveal-secrets \
  --json | jq -r '. | {client_id: .client_id, client_secret: .client_secret}')

# Extract the client ID and client secret from the output.
export AUTH0_CLIENT_ID=$(echo $AUTH0_M2M_APP | jq -r '.client_id')
export AUTH0_CLIENT_SECRET=$(echo $AUTH0_M2M_APP | jq -r '.client_secret')
```

This will create the application and set environment variables for the client ID and secret. This application needs to be authorized to use the Auth0 management API. This can be done using the commands below.

```bash
# Get the ID and IDENTIFIER fields of the Auth0 Management API
export AUTH0_MANAGEMENT_API_ID=$(auth0 apis list --json | jq -r 'map(select(.name == "Auth0 Management API"))[0].id')
export AUTH0_MANAGEMENT_API_IDENTIFIER=$(auth0 apis list --json | jq -r 'map(select(.name == "Auth0 Management API"))[0].identifier')
# Get the SCOPES to be authorized
export AUTH0_MANAGEMENT_API_SCOPES=$(auth0 apis scopes list $AUTH0_MANAGEMENT_API_ID --json | jq -r '.[].value' | jq -ncR '[inputs]')

# Authorize the Auth0 Terraform Provider application to use the Auth0 Management API
auth0 api post "client-grants" --data='{"client_id": "'$AUTH0_CLIENT_ID'", "audience": "'$AUTH0_MANAGEMENT_API_IDENTIFIER'", "scope":'$AUTH0_MANAGEMENT_API_SCOPES'}'
```

Now you can run the Terraform script to create the Auth0 application. Run the following commands to initialize the script and apply it.

```bash
# Upgrade the terraform script
terraform init -upgrade
terraform apply
```

This will create the Auth0 application and the test user. You can find the client ID and secret in the output of the `terraform output` command. You can also find the client ID and secret in the Auth0 dashboard.

```bash
# Client ID
terraform output --json | jq -r '.auth0_webapp_client_id.value'
# Client Secret
terraform output --json | jq -r '.auth0_webapp_client_secret.value'
```

Note the client ID and client secret from the output. You will need these values in the next section.

### Configure the JHipster application to use Auth0

Update `kubernetes/registry-k8s/application-configmap.yml` with the Spring Security OIDC configuration using values from the previous step. This configuration is loaded into Consul, and it shares the values with the gateway and microservices.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: application-config
  namespace: jhipster
#common configuration shared between all applications
data:
  application.yml: |-
    configserver:
      ...
    jhipster:
      security:
        ...
        oauth2:
          audience:
            - https://<your-auth0-domain>/api/v2/
    spring:
      security:
        oauth2:
          client:
            provider:
              oidc:
                # make sure to include the trailing slash
                issuer-uri: https://<your-auth0-domain>/
            registration:
              oidc:
                client-id: <client-id>
                client-secret: <client-secret>
  # app specific configuration
```

The microservice applications are now ready.

### Secure secrets

If you have noticed, you are setting secrets in plain text on the `application-configmap.yml` file, which is not ideal and is not a best practice for security. The best way to do this securely would be to use [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/), an external service like [HashiCorp Vault](https://www.hashicorp.com/products/vault), or [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets). To learn more about these methods see the blog post [Shhhh... Kubernetes Secrets Are Not Really Secret!](https://auth0.com/blog/kubernetes-secrets-management/).

## Deploy the Microservice Stack

You are ready to deploy to our shiny new EKS cluster, but first, you need to build and push the Docker images to a container registry. You can use [Amazon Elastic Container Registry (ECR)](https://aws.amazon.com/ecr/) or any other container registry.

### Build the Docker images

You need to build Docker images for each app. This is specific to the JHipster application used in this tutorial which uses [Jib](https://github.com/GoogleContainerTools/jib) to build the images. Make sure you are logged into Docker using `docker login`. Navigate to each app folder (**store**, **invoice**, **product**) and run the following command:

```bash
./gradlew bootJar -Pprod jib -Djib.to.image=<docker-repo-uri-or-name>/<image-name>
```

Image names should be `store`, `invoice`, and `product`.

### Deploy the applications to EKS

Start the deployment using the handy script provided by JHipster. You could also manually apply deployments using `kubectl apply -f <file>` commands.

```bash
cd kubernetes
./kubectl-apply.sh -f
```

![JHipster pods in KDash](https://images.ctfassets.net/23aumh6u8s0i/3vo9lWwxkHWghbvcnSt9wg/b5158d9a4b0ab89e8a73d255acb206ff/eks-pods.png)

You can also run the following command to see the status of the deployments:

```bash
kubectl get pods -n jhipster
```

View the Consul registry using port-forwarding as follows, and you will be able to access the application at `http://localhost:8500`.

```bash
kubectl port-forward svc/consul-ui -n jhipster 8500
```

You can access the gateway application using port-forwarding as follows, and you will be able to access the application at `http://localhost:8080`.

```bash
kubectl port-forward svc/store -n jhipster 8080
```

Or, you can access the application via the load balancer exposed. Find the external IP of the `store` service by navigating to the service tab in KDash or by running the following:

```bash
kubectl get svc store -n jhipster
```

You need to add the external IP of the store to allowed callback URLs and allowed logout URLs in the Auth0 web application. You can do this by adding the values to the `callbacks` and `allowed_logout_urls` array in the `java_ms_client` resource in `auth0.tf` file like below:

```hcl
resource "auth0_client" "java_ms_client" {
  name                = "JavaMicroservices"
  description         = "Java Microservices Client Created Through Terraform"
  app_type            = "regular_web"
  callbacks           = ["http://localhost:8080/login/oauth2/code/oidc", "http://aws-elb-id.region.elb.amazonaws.com:8080/login/oauth2/code/oidc"]
  allowed_logout_urls = ["http://localhost:8080", "http://aws-elb-id.region.elb.amazonaws.com:8080"]
  oidc_conformant     = true

  jwt_configuration {
    alg = "RS256"
  }
}
```

Run `terraform apply -target="auth0_client.java_ms_client"` to update the configuration in your Auth0 tenant.

Now you should be able to visit the external IP of the `store` service on port 8080 and see the application, and you should be able to log in using your Auth0 test user credentials.

If you encounter an issue where the Consul pods do not start, you might have issues with the AWS EBS addon for EKS. Run `kubectl describe pvc -n jhipster` to see if there are any errors. If you see `could not create volume in EC2: UnauthorizedOperation` in errors, then you need to troubleshoot by following the [Managing the Amazon EBS CSI driver as an Amazon EKS add-on](https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html) guide.

## Tear Down the Cluster with Terraform

Once you are done with the tutorial, you can delete the cluster and all the resources created using Terraform by running the following commands:

```bash
cd terraform
# The commands below might take a while to finish.
terraform destroy -target="module.eks_blueprints_addons" -auto-approve
# If deleting the VPC fails, then manually delete the load balancers and the security groups
# for the load balancer associated with the VPC from the AWS EC2 console and try again.
# This is due to the fact that EKS creates a load balancer for Kubernetes service and it is not known to Terraform.
terraform destroy -target="module.eks" -auto-approve
terraform destroy -target="module.vpc" -auto-approve
# Clean up Auth0 apps and anything left over.
terraform destroy -auto-approve
```

You can find all the code from this example on [GitHub](https://github.com/oktadev/auth0-jhipster-k8s-eks-microservices-example).

---

If you like this article, please leave a like or a comment.

You can follow me on [Mastodon](https://mastodon.social/@deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).
