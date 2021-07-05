---
title: Microservices - the good, bad, and the ugly
published: true
description: When to use microservices, the pros, the cons and issues you might face
tags: [microservices, architecture, devops, distributedsystems]
cover_image: https://thepracticaldev.s3.amazonaws.com/i/m6ddxwbdkokue4aktl1r.jpg
canonical_url: https://deepu.tech/microservices-the-good-bad-and-the-ugly/
devto_url: https://dev.to/deepu105/microservices-the-good-bad-and-the-ugly-9gp
devto_id: 197694
---

So you are attending this awesome conference where speaker after speaker talks about how awesome microservices are. You hear a speaker from a Tech giant presenting how they scaled up and solved their issues using microservices running on containers or something, and you wonder shouldn't we do the same as well?

The reality is that there is no silver bullet in software engineering. Microservices doesn't magically solve every scaling issues, some times they introduce more problems then they solve.

Well, this is not a microservice bashing post, as someone who likes microservice architectures(sometimes for their sheer complexity and sometimes for the ingenuity), I think it's important to know the cost of doing microservice architectures in real-world use cases. I talked briefly about this in my [book](https://www.packtpub.com/application-development/full-stack-development-jhipster) as well.

---

# Microservice architectures

In a microservice architecture, you generally split your domain model into individual loosely coupled services that can be deployed and scaled individually.
Each of the services is in itself a small application with its own architecture and even runtime sometimes.

The services might offer REST endpoints that can be aggregated by an application acting as a gateway or the services could be communicating with each other using a messaging system. Some services might have Web GUI some are headless services offering just an API.

In microservice architectures, each service is responsible for handling its data and ideally do not share database schema with other services.
Such architectures make it easy to provide different clients for Mobile and Desktop experience which can be scaled independently based on demand.

![Monolith vs Microservice architecture](https://thepracticaldev.s3.amazonaws.com/i/8qgu7ue5togsslflganb.jpg)

There are different architecture patterns for building microservices. The patterns used also decides the way services communicate and the way they are aggregated.

[This](https://microservices.io/patterns/microservices.html) article details some of these patterns quite nicely.

So let's break down the benefits and issues of microservice architecture and see when it makes sense to adopt one and when to avoid one.

# General benefits of Microservice architectures

In general, Microservices provide(As it depends on how you actually implement it) or at least promise the below benefits, which can be grouped into three major categories

### Loose coupling

Microservice components are more loosely coupled than traditional architectures.
Such systems employ event-driven or message-driven architectures to achieve communication between loosely coupled components.
This results in better isolation of components and makes it easy to unit test them and faster to startup.

Such systems also provide other benefits like, for example, a memory leak in one of the services, are isolated and hence will not bring down the entire application. Hence overall single point of failures are reduced

Loosely coupled individual components will start up much faster than a big monolith making it possible to parallelize and improve overall start-up for large systems.

It also makes it easy to refactor existing features as you can gradually refactor things rather than having to refactor an entire system in one go.

Because of such loose coupling, each service can choose to use a database/datastore that is more appropriate whereas in a monolith you might compromise with a single database type.
For example, a service dealing with a lot of unstructured data can choose a NoSQL database while a service that is handling transactions or structured data can opt for a SQL database.

### Faster development & release cycle

In a well-implemented microservice architecture, development turnaround is faster and hence you get a better time to market for new features and easier refactoring of existing features.

A complex problem domain can be easily tackled by splitting it into separately manageable services making it easier to understand and maintain in the long run.

Technology adoption is easier, components can be independently upgraded in incremental migration making it possible to have a different stack for each component.

It is also possible to have different microservices in a system use different implementation languages and just communicate using a common messaging format like gRPC or a message queue or pub/sub,
thus making it possible to have teams with different language skills hence less dependency on a single language or stack.

Teams will be less dependent on each other as communication between systems is governed by a public API or contract letting you change internals without having to worry about breaking someone else's code.

Best suited for agile teams. Such teams can have better focus as they only need to worry about a single service.

### Fine-grained scaling

One of the most important benefits of a microservice architecture is the ability to scale individual components based on load.
If implemented properly this will result in ideal load distribution and reduced overall infrastructure cost.
Services with more demand can be scaled up while the ones with less demand can be scaled down utilizing infrastructure more efficiently.

Deploying services independently also makes the application more reliable and makes patching easier as you do not have to upgrade the entire application to fix an issue in a single service.

More complex and efficient scaling models can be established. Critical services can be scaled more effectively. Infrastructure is used more efficiently.

Continuous delivery of such complex applications also would be easier than its equivalent monolith as components are smaller and any issue in deployment can be investigated easily and rectified on a per-component basis

# General issues with microservice architectures

Well with any architectures, there are disadvantages of Microservice architectures as well.

### Complexity

Complexity is one of the biggest side effects of this architecture. While microservices can reduce the domain complexity by breaking the problem into smaller services,
there could be complexities of a distributed system in terms of;

-   Overall stack as different components might have different technology stacks forcing the team to invest more time in keeping up with them.
-   Scaling is more efficient but it would require advanced features such as service discovery, DNS routing, and so on.
-   Communication between components might require a messaging system(Queue, PubSub, Event store).
-   Business transactions on a distributed system might involve updating multiple databases making rollbacks more complex and error-prone.
-   The entire application is more complex to deploy as there are complexities with containers, orchestration, and virtualization involved.
-   Requires a complex infrastructure. Most often will require containers (Docker), Orchestration(Kubernetes) and multiple JVM or app containers to run on.

### Integration testing

End-to-end tests and integration tests become harder to perform there are more moving parts in the stack and more complex communication between components.
The testing infrastructure required also becomes more difficult to set up and maintain.

### Team size and experience

The technical stack for microservices is more complex and most of the time harder to learn and hence it would demand a more experienced team with more senior-level skillset than that would be required for a similar monolithic application.

It will also require a bigger team to maintain the application as there are more components and more technologies involved.

Implementing requirements that span multiple services would require more upfront time to agree on contracts and APIs.

Team members share varying skill sets based on the component they work on but might not be having a birds-eye view of the entire application making business requirements harder to visualize and cross-cutting issues harder to fix.

### Overhead

Complex microservices will have the additional overhead of running monitoring setup, messaging services, orchestration, service registry and so on.

Initial development time will be higher due to the complexity making time to market slower.

The overall cost of the initial infrastructure might be much higher than that of a similar monolith.

In microservice architectures, there is always code duplication between services which also can be considered overhead.

# When you should not be considering Microservice architectures

You should not be using microservice architecture unless you absolutely have to, remember not every application has the same scale requirements as Netflix, Google, Amazon or Spotify.
Many of the benefits that microservices provide to these kinds of applications are due to their sheer scale which might not be applicable to you.
So here are some reasons not to choose microservices and maybe stick to monoliths.

-   When your application's scope is small and you know that it's not going to grow and turn into something like Facebook. For well defined simple usecases a monolith is always the best fit. Examples are
    -   A CRUD application for an internal use case in a company.
    -   A small application with a very niche user base. Like a shopping site for some specialty items.
-   When the time to market is critical for a new application. The initial time to market would be higher for microservices.
-   When the size of your team is small or the average experience of the team is less. Its best to start with a monolith when you are a small or inexperienced team.
-   When your infrastructure budget is limited. Though on long-run microservice might help to save money, in the beginning, it is going to cost you more.

Most importantly do not choose microservices because it is the hype or because it is used by a popular company or because it was suggested by a popular person. For most use cases monoliths are still a great solution and even if you start with a monolith you can always split away into microservices if required.

# When you could consider Microservice architectures

In general, Microservices tend to be beneficial if you have one of the below scenarios.

-   When your use case domain is complex, you have a large team with experience and splitting it up would make it easier to implement.
-   When you are expecting to become the next Facebook, Netflix or Twitter in terms of user load. So ideally when you are expecting an exponential user base.
-   If your application is going to be an API provider for other applications with a large userbase. Like a payment gateway or inventory service that will be used by a social media application
-   When you have a popular e-commerce application with a large userbase with an uneven load on different services in the application. Its time to split them into microservices.

---

So in conclusion, don't choose an architecture pattern because it works for someone else, choose a pattern that is appropriate for your use case, scale and requirements.
Not everyone needs to handle millions of concurrent users or stream terabytes of data.

---

If you liked this article you might like my [book](https://deepu.tech/books) as well. You can get it from [Packt](https://www.packtpub.com/web-development/full-stack-development-with-jhipster-second-edition) and [Amazon](https://smile.amazon.com/Full-Stack-Development-JHipster-applications-microservices-ebook/dp/B083XLGV98).

![book cover](https://i.imgur.com/SSnzOvR.png)

---

If you like this article, please leave a like or a comment.

If you do decide to build microservices checkout JHipster and my below articles don't forget to give it a star on [Github](https://github.com/jhipster/generator-jhipster).

1. [Create full Microservice stack using JHipster Domain Language under 30 minutes](https://deepu.tech/create-full-microservice-stack-using-j-hipster-domain-language-under-30-minutes)
2. [Deploying JHipster Microservices on Azure Kubernetes Service (AKS)](https://deepu.tech/deploying-jhipster-microservices-on-azure-kubernetes-service-aks)
3. [JHipster microservices with Istio service mesh on Kubernetes](https://deepu.tech/deploying-jhipster-microservices-on-azure-kubernetes-service-aks)

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image photo by [Sergei Akulich](https://unsplash.com/@sakulich?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/hFBFC5YmIck)
