---
title: How to clean up your Docker environment
description: See how you can clean up your local Docker environment.
published: true
featured: false
tags: [docker, microservices, kubernetes, bash]
canonical_url: https://deepu.tech/docker-env-cleanup/
devto_url: https://dev.to/deepu105/how-to-clean-up-your-docker-environment-4jm4
devto_id: 216187
cover_image: https://thepracticaldev.s3.amazonaws.com/i/tbwh49ldicoxvo57bklg.jpg
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what can be improved in the post.

---

# Cleanup your Docker setup

If you are using Docker on your PC or Mac, over time it is gonna accumulate a lot of Junk, the majority of which being dangling images and orphan volumes. It could take up a lot of space in your machine.

You should clean this up once in a while, thankfully there are some docker commands to help us here and along with some bash magic, we can nicely do this in 3 easy steps.

## Clean up old containers

Docker has a `docker rm` command to remove containers, we can use this along with some `docker ps` filters to remove all containers that are not being used currently. This is perfectly fine as it doesn't affect anything that is running and if you want to use any of the removed images again, docker will download it for you.

So the below command should do the trick.

```sh
docker rm -v $(docker ps -a -q -f status=exited);
```

`docker ps -a -q -f status=exited` provides a list of container Ids that are in exited status and `docker rm -v` removes those along with their associated volumes. Run `docker rm --help` and `docker ps --help` to see what the flags mean.

**Note**: If you want anything from these volumes, you should back it up before doing this.

## Clean up dangling volumes

A dangling volume is one that exists and is no longer connected to any containers. There is a similar `rm` command for volumes as well. We can use this along with `docker volume ls` command with a filter to remove volumes that are dangling. Below is the command for that.

```sh
docker volume rm $(docker volume ls -q -f dangling=true);
```

`docker volume ls -q -f dangling=true` returns the volume names that are not connected to any containers and `docker volume rm` removes them. Run `docker volume rm --help` and `docker volume ls --help` to see what the flags mean.

**Note**: If you want anything from these volumes, you should back it up before doing this.

## Clean up dangling images

Finally, we need to clean up dangling images. Docker images are made up of multiple layers and dangling images are layers that have no relationship to any tagged images. They no longer serve any purpose and consume disk space and hence can be safely removed. We can use the `docker image prune -a` command from Docker to remove unused images but for some reason, this command was not working for me and hence I had to resort to the `image rm` command as below.

```sh
docker image rm $(docker images -q -f dangling=true);
```

`docker images -q -f dangling=true` returns the image names that are not related to any tagged images and `docker image rm` removes them. Run `docker image rm --help` and `docker images --help` to see what the flags mean.

# Clean up everything

**Update:** Seems like docker provides a native command to clean up everything. 

```sh
docker system prune --volumes
```
You can run this to achieve the same result as below command and a bit more. Thanks to [cyberjack](https://dev.to/cyberjack) for pointing it out. I'll leave the below for educational purposes.

Now we can add these commands as a handy bash function so that we can do this cleanup with a single command like I always do. It frees up a lot of disk space and helps when I'm having some weird cache issues with docker-compose 😉.

Add the below function to your `~/.bashrc` or `~/.zshrc` and reload your terminal or source the file by running `. ~/.zshrc` or `. ~/.bashrc`.

```sh
function dpurgeall(){
  docker rm -v $(docker ps -a -q -f status=exited);
  docker volume rm $(docker volume ls -qf dangling=true);
  docker image rm $(docker images -qf dangling=true);
}
```

Now you can simply run `dpurgeall` and it will clean up your Docker environment. If there is nothing to clean up the command will just exist so nothing to worry there.

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Photo by [chuttersnap](https://unsplash.com/@chuttersnap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/containers?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
