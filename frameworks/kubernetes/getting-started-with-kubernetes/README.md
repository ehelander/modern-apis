# [Getting Started with Kubernetes](https://app.pluralsight.com/library/courses/kubernetes-getting-started/table-of-contents), Neil Poulton (2020-07-30)

## Course Overview

### [Course Overview](https://app.pluralsight.com/course-player?courseId=3794d6de-7050-40ae-8e10-d245efeb7a0c)

## Course Introduction

### [Course Outline](https://app.pluralsight.com/course-player?clipId=f43296c4-421c-4f77-8a86-fbae328f2424)

- Code and examples: https://github.com/nigelpoulton/getting-started-k8s
- Standard K8s icons for diagrams: http://github.com/kubernetes/community/tree/master/icons

## What Is Kubernetes?

### [What Is Kubernetes?](https://app.pluralsight.com/course-player?clipId=480131d8-12b5-4c6a-93e4-eed069f4b6c0)

- Kubernetes came from Google
- It was opensourced in 2014 and handed over to the Cloud Native Computing Foundation
- Written in Go
- http://github.com/kubernetes/kubernetes
- Google churns through billions of containers each week.
  - The internal Borg and Omega proprietary projects were created to manage this.
    - Borg grew into Omega, which spawned K8s (which was built from scratch)
- Version 1: July 2015
- Kubernetes: Greek for 'helmsman' (the person who steers a ship)
- Was named 'Seven of Nine'

### [Kubernetes What and Why](https://app.pluralsight.com/course-player?clipId=905584bc-3c80-4eae-8770-2a6ccebe8841)

- Containers and microservices bring a whole new set of management challenges.
- Containers are like a cloud OS - abstracting away the hardware.

### [Quick Jargon Busting](https://app.pluralsight.com/course-player?clipId=864df46e-d05a-42d6-9215-5d3a32cec75f)

## Kubernetes Architecture

### [Module Overview](https://app.pluralsight.com/course-player?clipId=24bfc59c-9c0d-4aa2-ac68-de2b366a642a)

### [Kubernetes Big Picture View](https://app.pluralsight.com/course-player?clipId=65a5161a-b32b-424d-8f1d-7c76de06731f)

- Microservices are like players on a soccer team, with a Kubernetes coach organizing everything into a useful application: Orchestration.
- K8s masters are in charge
  - Masters comprise the control plane
- Nodes run the business applications
- We package our app code as a container. We wrap the container in a pod. We then wrap the pod in a deployment.
- This is all defined in a K8s YAML file, which we give to the master and the master makes it happen.

### [Kubernetes Masters](https://app.pluralsight.com/course-player?clipId=bca23a3c-5aba-4e97-a8ed-e9686c3f7205)

- Masters are also known as head nodes or the control plane.
  - Multi-master control planes (spread across multiple failure domains) are critical for production workloads.
    - 3 is a magic number. 5 is ok. More than 5 can increase latency.
    - Even cluster numbers can lead to split brain.
    - If we have 3 masters, one becomes the leader and the others are followers.
- K8s masters need to be Linux machines.
- In a hosted K8s, the controle plane is hidden.
  - This is 'Kubernetes as a service': Outsourcing the control plane to a cloud provider (for a fee)
- Best practice: Don't run business applications on the masters (allowing the masters to just look after the cluster).
- ![](2020-10-30-16-09-58.png)
  - `kube-apiserver`
    - The front-end to the control plane.
    - Exposes a REST API; consumes JSON/YAML.
    - The only master component that anything should be talking to.
    - Usually connected to via `kubectl`
  - Cluster store
    - The only persistent component: Persists cluster state and config.
    - Based on `etcd`
    - Performance is critical.
      - Probably the first bottleneck in a cluster.
      - If you expect large/busy clusters, look at splitting out the store.
  - Kube-controller-manager
    - Controller of controllers
      - Node controller
      - Deployment controller
      - Endpoint/EndpointSlice controller
    - Each basically runs as a reconciliation loop: Reconciles observed with desired state of the cluster.
  - Kube-scheduler
    - Watches API Server for new work and assigns it to cluster nodes.
      - Affinity/anti-affinity
      - Constraints
      - Resources
      - Etc.

### [Kubernetes Nodes](https://app.pluralsight.com/course-player?clipId=c10a58c4-861b-4743-be3b-0416b53cede7)

- 3 components:
  - Kubelet
    - Main K8s agent running on every cluster.
      - Sometimes, 'node' and 'Kubelet' are used interchangeably.
      - A node can be Linux or Windows.
    - Registers node with cluster
    - Runs Pods.
      - Work on a K8s cluster comes in the form of a pod:
        - 1 or more containers packaged together as a unit.
      - Watches API Server for work tasks (Pods)
    - Reports back to Masters.
  - Container runtime
    - Often Docker
      - But pluggable via the CRI (Container Runtime Interface)
      - Can be Docker, containerd, CRI-O, Kata, etc.
      - See gVisor and katacontainers
  - Kube-proxy
    - Networking component
    - Makes sure every Pod gets its own IP
      - So in a multi-container pod, each container uses the same IP. So we'd need to use ports.
    - Does lightweight load balancing for all of the pods behind a service (e.g., hiding multiple pods behind a single network address)

### [The Declarative Model and Desired State]()

### [Kubernetes Pods]()

### [Stable Networking with Kubernetes Services]()

### [Game Changing Deployments]()

### [The Kubernetes API and API Server]()

### [Epic Recap]()

## Getting Kubernetes

### [Module Overview]()

### [Getting kubectl]()

### [Getting K8s on Your Laptop]()

### [Getting K8s in the Cloud]()

### [Recap]()

## Working with Pods

### [Module Overview]()

### [App Deployment Workflow]()

### [Creating a Pod Manifest]()

### [Deploying a Pod]()

### [Multi-container Pod Example]()

### [Recap]()

## Kubernetes Services

### [Module Overview]()

### [Kubernetes Service Theory]()

### [Creating Services Imperatively]()

### [Creating Services Declaratively]()

### [Creating Internet LoadBalancer Services]()

### [Recap]()

## Kubernetes Deployments

### [Module Overview]()

### [Kubernetes Deployment Theory]()

### [Creating a Deployment YAML]()

### [Deploying a Deployment]()

### [Self-healing and Scaling]()

### [Rolling Updates and Rollbacks]()

## What Next?

### [What Next?]()
