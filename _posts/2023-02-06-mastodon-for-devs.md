---
title: 'Mastodon for Developers: Everything You Need to Know'
published: true
description: Learn how to use Mastodon effectively as a developer.
tags:
  - social
  - mastodon
cover_image: >-
  https://images.ctfassets.net/23aumh6u8s0i/48DMcrjsrTyczgB2Im8ii7/8b8e3050f1c04e797181500c44da05ee/mastodon-color.png
canonical_url: 'https://auth0.com/blog/mastdon-for-developers/'
devto_id: 1355611
devto_url: >-
  https://dev.to/deepu105/mastodon-for-developers-everything-you-need-to-know-2hhf
---

_Originally published at [auth0.com](https://auth0.com/blog/mastdon-for-developers/)_

## What Is Mastodon?

Mastodon is an open-source, distributed micro-blogging platform that can host social networking sites. It was created by [Eugen Rochko](https://en.wikipedia.org/wiki/Eugen_Rochko) and was first released in 2016. It is similar to Twitter regarding features, target audience, and user experience. But unlike Twitter, it is run on a decentralized network of servers, each of which is called an **instance**. This does not mean that you have fragmented silos; instances are federated, which means you can talk to other instances, follow people, and see content from other instances, making Mastodon the ideal decentralized social network.

Any single company does not own the Mastodon network, and users can join any instance they wish. The federation allows people to connect and interact with each other across different instances, making Mastodon more open, secure, and free than something like Twitter. This means no single entity has absolute control over Mastodon, which is a big advantage over traditional social networks like Twitter, which is owned by a single company and is not open source.

After the recent [Twitter saga](https://twitterisgoinggreat.com), it's clear why this is a major benefit. However, this does not mean there is no moderation. Quite the contrary, actually. Each instance can have its own rules and can moderate content as they see fit. This means you can join an instance that is more aligned with your values and beliefs or even hosts your own if you have the necessary resources.

## Why Should You Care about Mastodon?

Platforms like Twitter, Facebook, Instagram, and TikTok make most of their revenue from advertisements. This means they are selling our attention to advertisers.

How do you keep someones attention? Our brains are naturally wired to seek dopamine reward pathways and [algorithms](https://www.iomcworld.org/open-access/neurotransmitter-dopamine-da-and-its-role-in-the-development-of-social-media-addiction-59222.html) used by these social media often target dopamine pathways to create a feeling of reward and reinforcement that encourages people to keep using their services. This is done by providing users with a steady stream of new content and positive feedback, such as likes and comments, which stimulates dopamine production in the brain. This can lead to people becoming addicted to social media, as they constantly seek out the reward of dopamine that comes with using the platform.

In addition, many platforms use algorithms to personalize content and increase the chance of a positive outcome, further encouraging people to use the service. But that's not all; these algorithms also use tactics like amplifying content that is reactionary, sensational, or [frightening](https://en.wikipedia.org/wiki/Mean_world_syndrome), which grabs our attention.

Platforms like Mastodon, which [does not operate for profit](https://arstechnica.com/tech-policy/2022/12/twitter-rival-mastodon-rejects-funding-to-preserve-nonprofit-status/), do not have any incentives to follow similar tactics. This does not mean that it is not possible as a Mastodon instance can choose to serve advertisements. But since you have control as a user, you can choose to join an instance that does not serve advertisements. This means that algorithms are not manipulating you to keep you hooked on the platform. This is a big advantage over platforms like Twitter which are designed to keep you hooked on the platform, making it easier to sow division and hatred by nefarious actors.

Mastodon is an important platform for anyone who values their freedom, security, mental health, and privacy online. It is a great alternative to Twitter for those who are looking for a more open and secure platform to connect with others without having to worry about being harassed or bullied. It is quite customizable and provides greater control over your data. With its growing user base, Mastodon is quickly becoming the go-to platform for many people looking for a better way to connect with others and get out of the grasp of BigTech.

## What Is Fediverse, and How Does It Work?

Fediverse is the term used to describe a network of interconnected servers that can communicate with each other using decentralized networking protocols. Fediverse is bigger than Mastodon and can include, among others:

- Mastodon servers (social networking and microblogging)
- [Friendica](https://friendi.ca/) servers (social networking and microblogging)
- [PeerTube](https://joinpeertube.org/) servers (video hosting)
- [Pleroma](https://pleroma.social/) servers (social networking and microblogging)

Fediverse networks can be used for social networks, file hosting services, and so on.

Fediverse works using several different communication protocols. The most important ones are [ActivityPub](https://activitypub.rocks/), [OStatus](https://www.w3.org/community/ostatus/wiki/Main_Page), and [diaspora](https://diaspora.github.io/diaspora_federation/).

ActivityPub is a protocol that allows servers to communicate with each other. It is a decentralized protocol based on the [ActivityStreams](https://www.w3.org/TR/activitystreams-core/) standard. Mastodon, PeerTube, and Pleroma use ActivityPub.

OStatus is a decentralized protocol based on the [Atom Syndication Format](https://www.rfc-editor.org/rfc/rfc4287). OStatus is a predecessor to ActivityPub and is used by older instances of Mastodon and Pleroma.

Diaspora is a decentralized protocol. Mastodon, Friendica, and Pleroma use it.

Any server that supports one of these protocols can communicate with other servers that support the same protocol.

It is difficult to estimate the number of users in Fediverse due to the distributed nature, but [rough third-party estimates](https://fediverse.observer/stats) put it at around 8 million users. This is a small fraction of the number of users on Twitter, but it is growing rapidly, as well as the number of instances.

## Choosing Servers

One of the biggest strengths of Mastodon, decentralization, is also its biggest hurdle when it comes to adoption. This means that there is no single place to sign up for Mastodon. Instead, you have to choose an instance to join. Choosing a server could be a daunting task, especially if you are new to Mastodon. There are some factors to consider when choosing a server. These include:

- Quality and reliability of the server
- Community and moderation
- Rules and Policies
- Non-profit status

Choosing a server based on this is important, but it's not as critical as it seems. This is because you can follow people from other servers and see their content in your timeline. This means you can join a server that is more aligned with your values and beliefs and still follow people from other servers. This is one of the biggest advantages of Mastodon over Twitter, where you are forced to follow people from the same server. Not just that, Mastodon lets you move from one server to another in case you choose a server that turns out to be unreliable, or you realize that you disagree with the server's policies. You can also easily import your data, like your followers and people you follow, to the new server. So choose a server you feel comfortable with and stick around to see how it goes. You can always move to another server if you don't like it.

As of this writing, there are over 17,000 instances of Mastodon, which is growing daily. This means that there is a Mastodon instance for everyone. You can find a list of Mastodon instances on [instances.social](https://instances.social/).

### Recommended servers

For technical folks like developers, you could consider joining one of these servers:

- [fosstodon.org](https://fosstodon.org/): Ideal for developers, especially if you are an open-source enthusiast
- [mstdn.social](https://mstdn.social/): It's a general-purpose server with a good community and is quite reliable
- [mastodon.social](https://mastodon.social/): The official Mastodon server with a good community and is quite reliable
- [hachyderm.io](https://hachyderm.io/): A server for tech industry professionals
- [techhub.social](https://techhub.social/): A server for technology enthusiasts

## Building a Timeline Based on Hashtags and Follows

Unlike Twitter, when you join a Mastodon server, you will not be greeted by a timeline with interesting posts and recommendations for people to follow. Instead, you are going to be greeted by an empty timeline. This is by design, as Mastodon does not have any algorithm or recommendation system, and you will not be following people from the same server. This means that you have to build your timeline by following people and hashtags. This is a good thing as it gives you more control over your timeline, and you will not be bombarded with content you are not interested in. You can find and follow people from other instances by searching for their usernames. For example, if you want to follow me, you can search for my username `@deepu105` or `@deepu105@mastodon.social`

Similarly, you can also follow hashtags; look for the **+** button on the top right corner of the screen when you are on the hashtag page. This works on the web version and some mobile clients.

![Follow hashtags](https://images.ctfassets.net/23aumh6u8s0i/2j6yJWRTi4l5ietKeozjqR/374a2ad171c40d316bf9f0dfb5d7a92e/follow-hasgtags.png)

It is important to follow people and hashtags you are interested in to have interesting content on your timeline. You can mute people you are not interested in.

![Mute accounts](https://images.ctfassets.net/23aumh6u8s0i/6TfN7bNDr2wW1gUZAj88tN/ca7e15a4aa52899a3c4b183f6fb9925a/mute-accounts.png)

You can also filter hashtags or words you don't want to see on your timeline.

![Filter hashtags](https://images.ctfassets.net/23aumh6u8s0i/2k95DqMi5dliPOdPLdmLxm/cbd8ca9268379c89bd4207b581e3df2f/mute-hashtag.png)

This is a great way to keep your timeline clean and free of unwanted content.

If you are migrating from Twitter, [Movetodon.org](https://www.movetodon.org/) is a great tool to help you find and follow people from Twitter on Mastodon.

## Cross-Posting

If you prefer to keep your Twitter account and cross-post to Mastodon and vice versa, you can use some tools to do so, including writing your own scripts using Twitter and Mastodon APIs. My personal favorite is [moa.party](https://moa.party/). It supports cross-posting to and from Twitter and Mastodon and is simple to setup and use. It can also post from Instagram to Mastodon. It is [open-source](https://gitlab.com/fedstoa/moa), and you can host it yourself if you don't want to give the service access to your Twitter/Mastodon accounts [using OAuth](https://moaparty.com/oauth/).

## Securing the Account

As usual, it is important to keep your Mastodon account secure. This includes using a strong password, using a password manager, and enabling two-factor authentication (2FA). Mastodon supports 2FA using TOTP (Time-based One-time Password Algorithm) authenticator apps like Google Authenticator and FIDO security keys like Yubikey.

![Adding 2FA](https://images.ctfassets.net/23aumh6u8s0i/3u8URYtpAdDxDHXiNb5Tvb/2df7bd5aa4975e281054d3853cab566a/2fa.png)

You can also verify your Mastodon account by linking your official website, GitHub profile, and so on. This is a great way to prove that you are the owner of the account and prevent impersonation.

![Verify your Mastodon account](https://images.ctfassets.net/23aumh6u8s0i/CP3tOMcsMX7V90jGrYXJO/2641210af2340acd254c4d1fdd08e9b0/verify.png)

To do this, go to **Preferences** -> **Appearance** -> **Profile metadata** and copy the verification URL and add it to your website as instructed. For the GitHub profile, add your Mastodon profile URL in the GitHub profile's website field. For example, my Mastodon profile URL is `https://mastodon.social/@deepu105`. Now add your website or GitHub profile URL to your Mastodon profile metadata and save.

![Verified links on Mastodon account](https://images.ctfassets.net/23aumh6u8s0i/45ZMJHHZsTkADIWI4yOlbf/0a50498ca9ca17e43c358bba1ecdd1fa/verify-result.png)

## Moving between Servers

If you decide to move from one Mastodon server to another, here are a few tips to make the process smooth.

1. First, create a profile on the new server you want to use. Note that this will be a new username, as Mastodon usernames include the server name, and you need to choose a username that is available on the new server.
2. Export your data from the old server by going to **Preferences** -> **Import and export** -> **Data export**. You will get CSV files for each item you export, like Follows, mutes, and so on.
3. Create an account alias in your new account by going to **Preferences** -> **Account** -> **Account settings** -> **Moving from a different account**. This will allow you to redirect your old account and move followers from your old account to the new account.
4. Now, from your old account, redirect to the new account by going to **Preferences** -> **Account** -> **Account settings** -> **Moving to a different account**. This will redirect your old account to the new account, and all your followers will be moved to the new account.
5. Now, from your new account, go to **Preferences** -> **Import and export** -> **Import** and import the CSV files that you exported from your old account. This will import all your follows, mutes, lists, and so on to the new account.

## Conclusion

Mastodon is a great alternative to Twitter and is a great way to connect with people from around the world without worrying about a single entity dictating what you can and cannot do with your social media. It is a great way to build a community around your projects and share your thoughts and ideas. It is also a great way to connect with people from the open-source community. I hope this guide will help you get started with Mastodon.

---

If you like this article, please leave a like or a comment.

You can follow me on [Mastodon](https://mastodon.social/@deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

