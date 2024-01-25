---
title: A Passwordless Future! Passkeys for Java Developers
published: true
description: >-
  Passkeys and WebAuthn for Java developers. Learn how to get started with
  passkeys for your Java and Spring Boot applications.
tags:
  - java
  - spring
  - passkeys
  - webauthn
cover_image: >-
  https://images.ctfassets.net/23aumh6u8s0i/5hJmVQbQfsNjNelza45z5p/41ef7af98a312dcd771c361bfc9e6149/Our_Take_on_Passkeys_4X.jpg
canonical_url: 'https://auth0.com/blog/webauthn-and-passkeys-for-java-developers/'
devto_id: 1714905
devto_url: >-
  https://dev.to/deepu105/a-passwordless-future-passkeys-for-java-developers-3f0c
---

_Originally published at [auth0.com](https://auth0.com/blog/webauthn-and-passkeys-for-java-developers/)_

So, first things first, why do we even need to go passwordless? After all, passwords have been around for over 1000 years, right? And we were all happily sharing our Netflix passwords.

## The Password Problem

The most important reason to go passwordless would be the password problem. According to [Verizon's 2023 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/2023/summary-of-findings/), stolen credentials and phishing account for over 65% of all data breaches.

Most of the password problems are human problems in my opinion. Because passwords rely on us humans to remember them and to not share them and do a bunch of other stuff. History has repeatedly, a quadrillion times, shown us that we are not good at doing these things. So it is an **us** problem rather than the technology itself.

![Anime character depicting a hacker](https://images.ctfassets.net/23aumh6u8s0i/4kBHMXHpPNBBHiuwsJCMGK/4141a7ac4f7a7b66a3bbf07812c968c2/hacker_wearing_a_hoodie_anime.jpg)

These are the main problems with passwords:

-   **Knowledge-based**:
    -   People can be socially engineered, quite easily, to divulge passwords, or other information that can be used to get to the password.
    -   In this day and age there are just too many passwords to remember. If passwords are easy to remember they are also easy to guess. Complex passwords are not easy to remember, so we end up reusing passwords.
-   **Phishing**: Phishing websites can easily harvest passwords from even the most tech-savvy.
-   **Remote Replay**: Accounts can be accessed remotely using harvested passwords.
-   **Data Breach**: Applications become a target for data breaches when they store passwords.
-   **Share and Reuse**: Sharing and reusing passwords makes them even more vulnerable.
-   **Password management**: Passwords are not just a hassle for the end users, they are a hassle on the server side as well. Because
    -   We need to build password recovery and reset flows.
    -   We need multi-factor authentication flows to secure them further.
    -   They need to be reset regularly in some use cases.

> [Did you know it could cost around 70$ to reset a password?](https://www.forbes.com/sites/forbestechcouncil/2023/03/23/embracing-the-end-of-the-password-here-and-now)

Of course, password managers help with some aspects of this and everyone should use one. But they are still an overhead and not very convenient for everyone, especially non-tech folks.

## What is Passwordless?

The obvious solution for the password problem is to go passwordless. So what exactly is passwordless?

If you can verify a user's identity with something other than a password as the first factor of authentication, it is passwordless. We are doing this every day to unlock our phones and laptops using our fingerprints, faces, and so on.

There are a few [passwordless methods](https://auth0.com/blog/what-is-passwordless-authentication/) that you might have seen here and there. Like:

-   Biometric authentication
-   Magic links
-   SMS/Email One-Time Password (OTP)
-   Push notifications

But most of these methods are not secure enough to replace a password + Multi-Factor Authentication (MFA) combination.

## Passkeys

> Passkeys are a password replacement that provide faster, easier, and more secure sign-ins to websites and apps across a user’s devices. Unlike passwords, passkeys are resistant to phishing, are always strong, and are designed so that there are no shared secrets.
> –– FIDO Alliance

This is where passkeys come into the picture. A secure passwordless future is the one offered by passkeys in my opinion. You probably already encountered passkeys since Google and GitHub have been rolling it out to all users recently. If you haven't set them up yet, you should!

A passkey is a unique cryptographic key pair that allows you to access online services without using passwords. It is based on [asymmetric public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography).

Before we dive deep into passkeys let's look at some of the underlying technologies that make passkeys possible.

### Public-key cryptography

Asymmetric public key cryptography involves a pair of mathematically linked keys: a public key, which is shared openly, and a private key, kept secret by the owner.

When a message is encrypted with the public key, only the corresponding private key can decrypt it, ensuring confidentiality. At the same time, a message signed with a private key can be verified with the public key, authenticating the sender's identity. Passkeys use the signature verification mechanism.

![Signature verification using Public-key cryptography](https://images.ctfassets.net/23aumh6u8s0i/3MWt9AKNIHYTANuAwI0kwT/54fa496219c32ad6f651165c16e5bec0/digital-signing.jpg)

These keys are generated using a cryptographic algorithm, such as RSA or ECC.

### Authenticator

An authenticator is a hardware or software entity that can create and store public-private key pairs which can be used for user registration and authentication. There are two types of authenticators:

-   **Platform authenticators**: An authenticator built into a user's device. For example, TouchID and FaceID from Apple, smartphone authenticators, Windows Hello, and so on.
-   **Roaming authenticators**: A removable authenticator usable with any device the user is trying to sign in from. They are attached using USB, NFC, and/or Bluetooth. For example, security keys like [YubiKey](https://www.yubico.com/products/how-the-yubikey-works/), [Google Titan](https://cloud.google.com/titan-security-key) and smartphones.

### FIDO

FIDO stands for Fast IDentity Online. FIDO is a global authentication standard based on public key cryptography developed by the [FIDO Alliance](https://fidoalliance.org/). It aims to solve all our password problems. FIDO Credentials are cryptographic key pairs that can be used for authentication.

Passkeys are made possible by the [FIDO2](https://fidoalliance.org/fido2/) standard which is made up of Web Authentication (WebAuthn) and Client to Authenticator Protocol (CTAP).

### Web Authentication

[Web Authentication](https://webauthn.me/introduction) is a [W3C recommendation](https://www.w3.org/TR/webauthn/) that lets a webpage use a set of JavaScript APIs to talk to authenticators.

![WebAuthn architecture](https://images.ctfassets.net/23aumh6u8s0i/362EsMw63XVyLPh1jvJuZL/098194b80c218131f37f0af6435483f4/webauthn-arch-passkeys.jpg)

The WebAuthn architecture consists of three main entities:

-   **Authenticator**: Platform or roaming authenticators that let a user authenticate by confirming their presence.
-   **Relying Party**: A server (custom implementation or an Identity Provider like Auth0) that requires authentication. It issues challenges and stores public keys.
-   **Client**: A client consists of the user's browser. The client relays information between an authenticator and a relying party.

### Client to Authenticator Protocol

The [FIDO Client to Authenticator Protocol](https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-errata-20220621.html) is used for communications with authenticators over a variety of transports like USB, NFC, and Bluetooth. It is used to send requests from WebAuthn to authenticators.

> Passkeys are passwordless FIDO credentials implemented using WebAuthn.

The term passkey itself is just a marketing term popularized originally by companies like Apple and Google. Originally it was FIDO Multi-Device Credentials implemented with the WebAuthn specification. But recently that definition has evolved to mean any passwordless FIDO credentials that are discoverable by the browser. Passkeys are still evolving and hence this could change as well. But for simplicity let's stick to passkeys as that is the term approved and used by the FIDO Alliance.

### Types of passkeys

Passkeys have two variants. Synced or multi-device passkeys and hardware or device-bound passkeys.

![Passkey types](https://images.ctfassets.net/23aumh6u8s0i/6gWyrZIApjNIMzNLsYTZAy/dbd53f5f33b665fb4abe499612e87513/passkey-types.jpg)

#### Synced passkeys

Synced passkeys have a better user experience since the private keys are end-to-end encrypted and synced to the cloud. For example, on the Apple ecosystem, the private key is synced on your iCloud keychain and you can register on one device and log in to any synced Apple device. The same goes for the Google ecosystem using the Chrome browser. Or you can use a password manager like BitWarden to store your passkeys.
This kind of passkeys can be restored on new devices. But they are less secure than single device-bound passkeys since your private key is on the cloud and theoretically can be breached.

#### Hardware-bound passkeys

In the hardware or device-bound passkeys, the private key stays on the device itself and you need to authenticate using the same authenticator used for registration. It is slightly less convenient but more secure than synced passkeys. The relying party must support registering multiple credentials for a user so that backup keys can be registered, which is a best practice for hardware-bound passkeys.

> For example, I use a YubiKey with a fingerprint reader since I'm on Linux, and my passkeys are hardware-bound to that YubiKey. I don't get any roaming or backup benefits like in the Apple or Google ecosystem. But it's not a big deal, in my opinion, since I can register multiple Yubikeys as backup and use them on any device, and it's more secure and way more convenient than password + MFA.

### How does it work?

Let's see how user registration and authentication works with passkeys.

#### User registration

First, let's see how the registration flow works.

![Passkey registration flow](https://images.ctfassets.net/23aumh6u8s0i/1baVPd0OibsVRiE1ZRhLyr/525189d154e10c19b789263642b6baf4/passkey-registration-flow.jpg)

1. The user begins the registration flow. The relying party provides a randomly generated challenge string.
2. The `navigator.credentials.create()` API is invoked and the user provides approval using their authenticator.
3. The authenticator creates a private-public key pair which is unique for the relying party's domain and the user. The private key is used to sign the challenge.
    - An attestation object is created which contains the public key, signed challenge, credential ID, and certificate.
    - The private key is stored on the authenticator.
    - **For synced passkeys**, the private key is also synced to a cloud service for backup and roaming (This is the only place where synced passkeys differ from hardware-bound passkeys).
4. The attestation object and other metadata are then passed to the relying party by the client-side implementation. The relying party verifies the signed challenge using the public key and registers the user by storing the public key and credential ID along with the user details.

#### User authentication

Now, let's see how the login flow works, which is quite similar except for the third step.

![Passkey login flow](https://images.ctfassets.net/23aumh6u8s0i/1jrvIF1jqOAPckwX7FnVyB/456c25b1586a84770efeaff7d2664e0e/passkey-login-flow.jpg)

1. The user begins the login flow. The relying party provides a randomly generated challenge string.
2. The `navigator.credentials.get()` API is invoked and the user provides approval using their authenticator.
3. The authenticator retrieves the private keys for the relying party's domain name.
    - **For synced passkeys**, if the device is new, the private key is synced from a cloud service if available (This is the only place where synced passkeys differ from hardware-bound passkeys).
    - The user selects the private key for their username. The private key is used to sign the challenge.
    - An assertion object is created which contains the signed challenge and credential ID.
4. The assertion object and other metadata are then passed to the relying party by the client-side implementation. The relying party verifies the signed challenge using the public key stored for the user and authenticates the user.

## Why Passkeys?

Let's see why we need passkeys to replace passwords.

Passkeys are superior to password + traditional OTP MFA in terms of security and usability and they are as secure and more convenient than password + FIDO MFA. Most importantly, you don’t have to remember anything (unless you are like me and forget your YubiKeys all the time).

![password vs passkeys](https://images.ctfassets.net/23aumh6u8s0i/2PT1FgbaFHD0ZOJDu3789k/b8a229f5c72115298db20f64060c65b0/passkey-vs-password.jpg)

-   **Discoverable**: They are discoverable by the browser and the browser can autofill them for a service making it unnecessary for you to remember even usernames. It doesn’t rely on something you know, instead, it relies on something you have which is more secure from hacking and social engineering.
-   **Phishing resistant**: Passkeys cannot be phished as they rely on public key cryptography and are bound to the domain name of the website, making it impossible to work on a spoofed website.
-   **Remote attack resistant**: They rely on physical keys, like biometric sensors of platform authenticators or roaming authenticators like YubiKey, hence cannot be remotely breached.
-   **Breach resistant**: The website only stores the public key of a user which is useless to an attacker on a data breach on the server side. This makes the server less attractive to hackers.
-   **Not reusable and shareable\***: They cannot be reused as they are unique per service and user combination and cannot be shared.
    -   **\***except for Apple which lets you share a passkey by air-dropping it 🤷🏽 making it slightly less secure.
-   **Easier management**: Passkeys are scalable. Synced passkeys are backed up and replicated across your devices by cloud services like iCloud, Google Cloud, Bitwarden, and so on. This makes recovery part of the platform rather than the application.
-   **Cross-device authentication**: Passkeys can also perform cross-device authentication regardless of ecosystem or platform. This means you can simply use your Android phone as an authenticator for your Apple laptop. This method also ensures security by making sure the devices are nearby using Bluetooth.

![Security and usability spectrum](https://images.ctfassets.net/23aumh6u8s0i/5QPkAg3AaayeXqAqILLbC/06967f9aaf00771e619cb260e4d924ff/passkey-usability-security.jpg)

The security of passkeys is way better than most other combinations. When it comes to user experience, though it is subjective, I think it outperforms all other combinations.

## How Does It Differ from FIDO2 MFA?

Technically they are very similar since both can be implemented with WebAuthn and in the case of hardware-bound passkeys they are almost the same. However, there are some differences in terms of usability.

-   Passkeys are **Discoverable Credentials (Resident Keys)** and hence are discoverable by browsers, FIDO2 MFA is non-resident keys. This means for hardware keys like YubiKey, the private key is stored on the key itself and hence can only hold what its memory allows, whereas for FIDO2 MFA, the private key is encrypted and sent to the relying party, hence no storage limitation on the hardware key.
-   FIDO2 MFA does not have a synced option, passkeys does.
-   In the case of synced passkeys there are even more differences in terms of usability and security. For example, enrollment needs to be done only once and the private keys are synced to a cloud.

The most important difference is that passkeys can be used as first-factor authentication whereas MFA can only be used as a second-factor after user registration with a password.

## Challenges

There are still some challenges when it comes to passkeys:

-   **OS/Browser support**: It is dependent on the OS and Browser to implement the specs, and we all know how that turns out right? This means the support may not be uniform and can become fragmented and we might never have the same experience everywhere.
-   **Cloud vendor reliance**: It relies on companies like Apple, Google, and Microsoft to save the private keys in their cloud securely and protect it from breaches.
-   **Enterprise use cases**: Enterprise users might want more control and flexibility which could be a problem. For example, if an enterprise doesn’t allow iCloud or Google on their computer, passkeys would not work there.
-   **Reset & Recovery**: There are no default recovery flows for hardware-bound passkeys, and applications might still need to implement recovery & reset flows to accommodate all use cases.

[Browser and OS compatibility](https://webauthn.me/browser-support) is still catching up. As of writing, Chrome has the best support and the Apple ecosystem has the most seamless experience, especially for platform authenticators. Linux does not have any support for platform authenticators. Roaming authenticators have great support on all platforms.

## Let's See Passkeys in Action

Let's build a Spring Boot web app and secure it using passkeys with the help of Auth0 by Okta. You can find a sample app [on GitHub](https://a0.to/jfall-passkey) if you just want to try passkeys.

Before you get started, you will need the following:

-   Java 17 or higher. You can use [SDKMAN!](https://sdkman.io/) to install Java if you don't have it already.
-   A free Auth0 account. [Sign up](https://a0.to/blog_signup) if you don't have one already.
-   The Auth0 CLI. [Install](https://github.com/auth0/auth0-cli#installation) the CLI if you don't have it and log in to your Auth0 account using the `auth0 login` command.

### Create a Spring Boot application

Create a new Spring Boot application using the [Spring Initializr](https://start.spring.io/). You can use the web version or the curl command below. Use the default for most of the options. For the dependencies, select `web`, and `okta`. For the build tool, select `Gradle`.

```bash
curl -G https://start.spring.io/starter.tgz \
  -d dependencies=web,okta \
  -d baseDir=passkey-demo \
 | tar -xzvf -
```

The `web` dependency provides Spring Web MVC with basic HTTP REST functionality. The `okta` dependency provides the Okta Spring Boot Starter, which provides the required dependencies and configuration to add OIDC authentication to your application.

### Add a web controller

> Imports are omitted for brevity so make sure to import them using your IDE.

Open the created starter application in your favorite IDE. Add a simple web controller to the application. Create a new file `src/main/java/com/example/demo/HomeController.java` with the following content:

```java
@RestController
class HomeController {
    @GetMapping("/")
    public String home(@AuthenticationPrincipal OidcUser user) {
        return "Hello, " + user.getFullName() + "!";
    }
}
```

This controller will handle requests to the `/` path.

> If you run the application using `./gradlew bootRun`, you will see a login page from the Okta Spring Boot starter instead of your home screen. This is OK, and you will be able to configure this soon. You can comment out the `okta-spring-boot-starter` dependency in the `build.gradle` file if you want to run the application at this point.

### Enable passkeys on your Auth0 tenant

1. Log in to your [Auth0 Dashboard](https://manage.auth0.com) and navigate to **Authentication** > **Database** > **Username-Password-Authentication**.
    1. If the second tab says **Authentication Methods**, your tenant supports passkeys, proceed to the next step.
    2. If the second tab says **Password Policy**, your tenant doesn't support passkeys, [Create a new tenant](https://auth0.com/docs/get-started/auth0-overview/create-tenants) and proceed to the next step.
2. Navigate to **Authentication** > **Authentication Profile** and select **Identifier First**. **Save** your changes.
3. Navigate to **Authentication** > **Database** > **Username-Password-Authentication** and select the **Authentication Methods** tab and enable **Passkey**.

### Configure OIDC Authentication with Auth0

Configure the application to use Auth0 as the Identity Provider (IdP). You can use the Auth0 CLI to create a new application. Run the following command to create a new application:

```bash
auth0 apps create \
  --name "Spring Boot Passkeys" \
  --description "Spring Boot Example" \
  --type regular \
  --callbacks http://localhost:8080/login/oauth2/code/okta \
  --logout-urls http://localhost:8080 \
  --reveal-secrets
```

The `--type` option specifies that you use a regular web application. The `--callbacks` option specifies the callback URL for the application. The `--logout-urls` option specifies the logout URL for the application. The `--reveal-secrets` option will display the client secret in the output. You can also use the `auth0 apps update` command to update the application with the callback and logout URLs.

Note down the Auth0 issuer (for example, `https://dev-12345678.us.auth0.com/`), `CLIENT ID`, and `CLIENT SECRET` from the output. You will use these values in the next step.

### Configure the Spring Boot application

Configure the application by creating an `application.properties` file in the applications root folder with the following content:

```yaml
# trailing `/` is important for issuer URI
okta.oauth2.issuer=https://<AUTH0_domain>/
okta.oauth2.client-id=<AUTH0_clientId>
okta.oauth2.client-secret=<AUTH0_clientSecret>
```

Add the `application.properties` file to the `.gitignore` file to avoid committing the secrets to the repository.

### Run the application

To run the application, execute the following command:

```bash
./gradlew bootRun
```

The application should start successfully. Navigate to [http://localhost:8080](http://localhost:8080/) in your browser. You will be redirected to the Auth0 universal login page for authentication.

Click on the **Sign up** link to register a new user. Enter any email address and click **Continue**. You will now be prompted to register a passkey.

![Registration Screen](https://images.ctfassets.net/23aumh6u8s0i/6HjspO1xZy3n4wOCalfmpQ/a6b88eb00dab38ee7c724536b69ee4c8/register-screen.jpg)

Create a passkey using your platform authenticator or roaming authenticator like YubiKey. Once you have registered a passkey, you should be redirected back to the application and see the welcome message.

## WebAuthn for Java

Though Web Authentication’s user experience is a client-side implementation using JavaScript, the backend or Relying party can be a Java server. Ideally using an IdP like Auth0 would be the best option since it takes care of all the heavy lifting for you. But if you want to implement it yourself, you can use one of the below libraries.

-   [WebAuthn4j](https://github.com/webauthn4j/webauthn4j): A 100% FIDO2 conformant library with support for all attestation formats and validation. It is used by Keycloak and Spring Security.
-   [java-webauthn-server](https://github.com/Yubico/java-webauthn-server): A library from Yubico that supports many attestation format. But it is not 100% FIDO2 conformant.

We will dive deeper into using WebAuthn4j with Spring Security in a follow-up blog post. In the meantime, you can explore a sample application I built using WebAuthn4j and Spring Security [on GitHub](https://a0.to/jfall-webauthn).

## Resources

I hope that you found this article helpful. Here are some additional resources to learn more about WebAuthn and passkeys.

-   https://webauthn.me
-   https://passkeys.dev
-   https://passkey.org/
-   https://fidoalliance.org/passkeys/
-   [Our Take On Passkeys](https://auth0.com/blog/our-take-on-passkeys/)

---

If you like this article, please leave a like or a comment.

You can follow me on [Mastodon](https://mastodon.social/@deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

