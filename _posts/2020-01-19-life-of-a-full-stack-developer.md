---
title: Life of a Full-stack developer 😱 🤯 😱
description: The life of a Full-stack developer in a nutshell
published: true
featured: false
tags: [webdev, showdev, motivation, books]
series:
canonical_url: https://deepu.tech/life-of-a-full-stack-developer/
devto_url: https://dev.to/deepu105/life-of-a-full-stack-developer-2og5
devto_id: 239348
cover_image: https://i.imgur.com/G2ygcmv.jpg
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what can be improved in the post.

---

Hello friends, the second edition of my book **"Full Stack Development with JHipster"**, co-authored with [Sendil Kumar N](https://dev.to/sendilkumarn), is published this week and I thought of dedicating it to all the Full Stack Developers out there.

**Disclaimer**: This article contains excerpts from my book ["Full Stack Development with JHipster – Second Edition"](https://deepu.tech/books) published by [Packt](https://www.packtpub.com/).

---

According to the [Stack Overflow developer survey 2019](https:/​/insights.stackoverflow.​com/survey/2019#developer-​roles), **full stack developer** is the most popular developer title. The software industry defines a full stack developer as someone who can work on different areas of an application stack. The term stack refers to the different components and tools that make up an application.

In terms of web application development, the stack can be broadly classified into two areas—frontend and backend stack, also known as the client-side and server-side stack. The term frontend generally refers to the part of the code that is responsible for rendering the user interface, and the term backend refers to the part that is responsible for the business logic, database interactions, user authentication, server configuration, and so on. There is also the DevOps part of the application, which includes continuous integration, production deployment, and so on. A full-stack Java web application developer is expected to work on both frontend and backend technologies, ranging from writing HTML/JavaScript for the user interface to writing Java class files for business logic and SQL queries for database operations. They are also expected to work on DevOps, ranging from production deployments to setting up continuous integration and continuous delivery (CI/CD) as required.

With an ever-evolving software architecture landscape, the scope of technologies that a full stack web developer is expected to work with has increased dramatically. It is no longer enough that we can write HTML and JavaScript to build a user interface — we are expected to know client-side frameworks, such as Angular, React, and Vue.js. It is also not enough that we are proficient in enterprise Java and SQL — we are expected to know server-side frameworks, such as Spring, Hibernate, Play, and Quarkus.

## Modern full-stack web development

The life of a full stack developer would be worthy of a whole book by itself, so let's leave that topic for another day.

{% twitter 1158404065593708545 %}

Instead, let's look at a user story from a full-stack Java web application and see what is involved.

### What a day looks like

Let's use an example of developing a user management module for a typical Java web application. Let's assume that you would be writing unit test cases for all of the code, and so we won't look at it in detail here:

1. You would start by designing the architecture for the feature. You would decide on the plugins and frameworks to use, patterns to follow, and so on.
2. You will be modeling the domain model for the feature depending on the database technology used.
3. Then, you would create server-side code and database queries to persist and fetch data from the database.
4. Once the data is ready, you would implement the server-side code for any business logic.
5. Then, you would implement an API that can be used to provide data for the presentation over an HTTP connection.
6. You would write integration tests for the API.
7. Since the backend is ready, you would start writing frontend code in JavaScript or similar technology.
8. You would write client-side services to fetch data from the backend API.
9. You would write client-side components to display the data on a web page.
10. You would build the page and style it as per the design provided.
11. You would write some automated end-to-end tests for the web page.
12. You are not done yet. Once you have tested whether everything works locally, you would create pull requests or check the code into the version control system used.
13. You would wait for the continuous integration process to verify everything and fix anything that is broken.
14. Once everything is green and the code is accepted, you would typically start the deployment of this feature to a staging or acceptance environment, either on-premises or to a cloud provider using technologies like Docker and Kubernetes. If you choose the latter, you would be expected to be familiar with the cloud technologies used as well. You would also be upgrading the database schema as necessary and writing migration scripts when required.
15. Once the feature is accepted, you might be responsible for deploying it into the production environment in a similar way, troubleshooting issues where necessary. In some teams, you might swap the steps with other team members so that you would be deploying a feature developed by your coworker while they deploy yours.
16. You might also be responsible, along with your coworkers, for making sure that the production environment is up and running, including the database, virtual machines, and so on.

As you can see, it is no easy task. The range of responsibilities spans from making stylesheet updates on the client-side to running database migration scripts on a virtual machine in the production cloud service. If you are not familiar enough with the setup, then this would be a herculean task, and you would soon be lost in the vast ocean of frameworks, technologies, and design patterns out there.

### Challenges

Full-stack development is not for the faint-hearted. It takes a lot of time and effort to keep yourself up to date with the various technologies and patterns in multiple disciplines of software development. The following are some of the common problems you might face as a full stack Java developer:

-   Client-side development is not just about writing plain HTML and JavaScript anymore. It is becoming as complex as server-side development, with build tools, transpilers, frameworks, and patterns.
-   There is a new framework almost every week in the JavaScript world, and if you are coming from outside a Java background, it could be very overwhelming for you.
-   Container technologies such as Docker & Kubernetes revolutionized the software industry, but they also introduced a lot of new stuff to learn and keep track of, such as orchestration tools and container management tools.
-   Cloud services are growing day by day. To stay on track, you would have to familiarize yourself with their APIs and related orchestration tools.
-   Java server-side technologies have also undergone a major shift in recent times with the introduction of JVM languages, such as Scala, Groovy, and Kotlin, forcing you to keep yourself up to date with them. On the other side, server-side frameworks are becoming more feature-rich, and therefore more complex.

The most important thing of all is to make sure that all of these work well together when required. This task will need a lot of configuration, some glue code, and endless cups of coffee.

## Conclusion

It's very easy to get lost here, and this is where technologies such as [JHipster](https://www.jhipster.tech/) and [Spring Boot](https://spring.io/projects/spring-boot) step in to help. They help by providing the wiring between moving parts so that you only need to concentrate on writing business code. JHipster also helps by providing the abstractions to deploy and manage the application to various cloud providers.

A full-stack developer is one of the toughest roles in our industry these days and I think it is one that is under-appreciated a lot. If you are a full stack developer be proud as it takes some courage to be one. You may not be an expert in a single technology or framework but you are a magician of sorts. You can juggle between so many technologies and frameworks without breaking a sweat. You are the real 10x developer, what the heck, you are a 100x developer, not because you use specific keys on your keyboard more than others, its because your job used to be something that required at least four people to work together. You may not get enough credits, though you deserve it just for the effort that is required to keep up, you are awesome.

Though the satisfaction of being able to work on all aspects of application development is rewarding, It is still a shame that we are not getting the salary that is the sum paid to four people who were needed to do this work 😉

So if you are a proud full stack developer let me know in the comments and tell us how your day looks like.

---

If you liked this article you might like my [book](https://deepu.tech/books) as well. You can get it from [Packt](https://www.packtpub.com/web-development/full-stack-development-with-jhipster-second-edition) and [Amazon](https://smile.amazon.com/Full-Stack-Development-JHipster-microservices/dp/1838824987).

![book cover](https://i.imgur.com/SSnzOvR.png)

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Photo by [Arian Darvishi](https://unsplash.com/@arianismmm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on Unsplash
