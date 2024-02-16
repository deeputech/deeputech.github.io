---
title: "A Passwordless Future: Passkeys for Java Developers"
published: true
description: >-
  Passkeys and WebAuthn for developers. Learn how passkeys work and the benefits they provide.
tags:
  - security
  - passkeys
  - webauthn
cover_image: >-
  https://images.ctfassets.net/23aumh6u8s0i/7rtOe5zpG2fdUQvgPIBT4k/8ae35a470997b31ea60d57ceffa8f9a4/passkeys-hero.jpg
canonical_url: "https://auth0.com/blog/webauthn-and-passkeys-for-developers/"
---

_Originally published at [auth0.com](https://auth0.com/blog/webauthn-and-passkeys-for-developers/)_

So, first things first, why do we even need to go passwordless? After all, passwords have been around for over 1000 years, right? And we were all happily sharing our Netflix passwords.

## The Password Problem

The most important reason to go passwordless would be the password problem. According to [Verizon's 2023 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/2023/summary-of-findings/), stolen credentials and phishing account for over 65% of all data breaches.

![Anime character depicting a hacker](https://images.ctfassets.net/23aumh6u8s0i/4kBHMXHpPNBBHiuwsJCMGK/4141a7ac4f7a7b66a3bbf07812c968c2/hacker_wearing_a_hoodie_anime.jpg)

Most of the password problems are human problems in my opinion. Because passwords rely on us humans to remember them and to not share them and do a bunch of other stuff. History has repeatedly, a quadrillion times, shown us that we are not good at doing these things. So it is an **us** problem rather than the technology itself.

These are the main problems with passwords:

- **Knowledge-based**:
  - People can be socially engineered, quite easily, to divulge passwords, or other information that can be used to get to the password.
  - In this day and age there are just too many passwords to remember. If passwords are easy to remember they are also easy to guess. Complex passwords are not easy to remember, so we end up reusing passwords.
- **Phishing**: Phishing websites can easily harvest passwords from even the most tech-savvy.
- **Remote Replay**: Accounts can be accessed remotely using harvested passwords.
- **Data Breach**: Applications become a target for data breaches when they store passwords.
- **Share and Reuse**: Sharing and reusing passwords makes them even more vulnerable.
- **Password management**: Passwords are not just a hassle for the end users, they are a hassle on the server side as well. Because
  - We need to build password recovery and reset flows.
  - We need multi-factor authentication flows to secure them further.
  - They need to be reset regularly in some use cases.

![Problems with passwords](https://images.ctfassets.net/23aumh6u8s0i/2aFBrgOCSmtq4yWQa958jh/99c50506bf6eeaad148afee6eb5f9a0a/password-problems.jpg)

> [Did you know it could cost around 70$ to reset a password?](https://www.forbes.com/sites/forbestechcouncil/2023/03/23/embracing-the-end-of-the-password-here-and-now)

Of course, password managers help with some aspects of this and everyone should use one. But they are still an overhead and not very convenient for everyone, especially non-tech folks.

## What is Passwordless?

The obvious solution for the password problem is to go passwordless. So what exactly is passwordless?

If you can verify a user's identity with something other than a password as the first factor of authentication, it is passwordless. We are doing this every day to unlock our phones and laptops using our fingerprints, faces, and so on.

There are a few [passwordless methods](https://auth0.com/blog/what-is-passwordless-authentication/) that you might have seen here and there. Like:

- Biometric authentication
- Magic links
- SMS/Email One-Time Password (OTP)
- Push notifications

But most of these methods are not secure enough to replace a password + Multi-Factor Authentication (MFA) combination.

## Passkeys

> Passkeys are a password replacement that provide faster, easier, and more secure sign-ins to websites and apps across a user’s devices. Unlike passwords, passkeys are resistant to phishing, are always strong, and are designed so that there are no shared secrets.
>
> — FIDO Alliance

This is where passkeys come into the picture. A secure passwordless future is the one offered by passkeys in my opinion. You probably already encountered passkeys since Google and GitHub have been rolling it out to all users recently. If you haven't set them up yet, you should!

A passkey is a unique cryptographic key pair that allows you to access online services without using passwords. It is based on [asymmetric public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography).

<include src="LearnPasskeysCTA"/>

Before we dive deep into passkeys let's look at some of the underlying technologies that make passkeys possible.

### Public-key cryptography

Asymmetric public key cryptography involves a pair of mathematically linked keys: a public key, which is shared openly, and a private key, kept secret by the owner.

This key pair can be used for encryption. When a message is encrypted with the public key, only the corresponding private key can decrypt it, ensuring confidentiality.

![Signature verification using Public-key cryptography](https://images.ctfassets.net/23aumh6u8s0i/65xEECjioOX0xqW8D4sYtf/a105305563ee8cdc4431a59c61ee95a7/pub-key-encrypt.jpg)

The same key pair can also be used for digital signatures. A message signed with a private key can be verified with the public key, authenticating the sender's identity.

![Signature verification using Public-key cryptography](https://images.ctfassets.net/23aumh6u8s0i/2SROWLHSH9If5eZ0fZ5dbj/89633fe6d9afe573c407fcc9ff8303c0/pub-key-sign.jpg)

Passkeys use the signature verification mechanism. These keys are generated using a cryptographic algorithm, such as RSA or ECC.

### Authenticator

An authenticator is a hardware or software entity that can create and store public-private key pairs which can be used for user registration and authentication. There are two types of authenticators:

- **Platform authenticators**: An authenticator built into a user's device. For example, TouchID and FaceID from Apple, smartphone authenticators, Windows Hello, and so on.
- **Roaming authenticators**: A removable authenticator usable with any device the user is trying to sign in from. They are attached using USB, NFC, and/or Bluetooth. For example, security keys like [YubiKey](https://www.yubico.com/products/how-the-yubikey-works/), [Google Titan](https://cloud.google.com/titan-security-key) and smartphones.

### FIDO

FIDO stands for Fast IDentity Online. FIDO is a global authentication standard based on public key cryptography developed by the [FIDO Alliance](https://fidoalliance.org/). It aims to solve all our password problems. FIDO Credentials are cryptographic key pairs that can be used for authentication.

Passkeys are made possible by the [FIDO2](https://fidoalliance.org/fido2/) standard which is made up of Web Authentication (WebAuthn) and Client to Authenticator Protocol (CTAP).

### Web Authentication

[Web Authentication](https://webauthn.me/introduction) is a [W3C recommendation](https://www.w3.org/TR/webauthn/) that lets a webpage use a set of JavaScript APIs to talk to authenticators.

![WebAuthn architecture](https://images.ctfassets.net/23aumh6u8s0i/362EsMw63XVyLPh1jvJuZL/098194b80c218131f37f0af6435483f4/webauthn-arch-passkeys.jpg)

The WebAuthn architecture consists of three main entities:

- **Authenticator**: Platform or roaming authenticators that let a user authenticate by confirming their presence.
- **Relying Party**: A server (custom implementation or an Identity Provider like Auth0) that requires authentication. It issues challenges and stores public keys.
- **Client**: A client consists of the user's browser. The client relays information between an authenticator and a relying party.

### Client to Authenticator Protocol

The [FIDO Client to Authenticator Protocol](https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-errata-20220621.html) is used for communications with authenticators over a variety of transports like USB, NFC, and Bluetooth. It is used to send requests from WebAuthn to authenticators.

> Passkeys are passwordless FIDO credentials implemented using WebAuthn.

Passkeys were originally called FIDO Multi-Device Credentials implemented with the WebAuthn. But recently that definition has evolved to mean any passwordless FIDO credentials that are discoverable by the browser. Passkeys are still evolving and hence this could change as well. But for simplicity let's stick to passkeys as that is the term used by the FIDO Alliance.

### Types of passkeys

Passkeys have two variants. Synced passkeys (sometimes referred to as multi-device passkeys) and device-bound passkeys (sometimes referred to as hardware-bound passkeys).

![Passkey types](https://images.ctfassets.net/23aumh6u8s0i/3I3nxEpG2HYNBnQi1BZx3O/b10ff4f77c0d385b9b99ba8bf05cc0b6/passkey-types.jpg)

#### Synced passkeys

Synced passkeys have a better user experience since the private keys are end-to-end encrypted and synced to the cloud. For example, on the Apple ecosystem, the private key is synced on your iCloud Keychain and you can register on one device and log in to any synced Apple device. The same goes for the Google ecosystem using the Chrome browser and Google Password Manager. Or you can use a password manager like BitWarden or 1Password to store your passkeys.
This kind of passkeys can be restored on new devices. But they are less secure than single device-bound passkeys since your private key is on the cloud and theoretically can be breached.

#### Device-bound passkeys

In the device-bound passkeys, the private key stays on the device itself and you need to authenticate using the same authenticator used for registration. It is slightly less convenient but more secure than synced passkeys. The relying party must support registering multiple credentials for a user so that backup keys can be registered, which is a best practice for device-bound passkeys.

> For example, I use a YubiKey with a fingerprint reader since I'm on Linux, and my passkeys are device-bound to that YubiKey. I don't get any roaming or backup benefits like in the Apple or Google ecosystem. But it's not a big deal, in my opinion, since I can register multiple YubiKeys as backup and use them on any device, and it's more secure and way more convenient than password + MFA.

### How does it work?

Let's see how user registration and authentication work with passkeys.

#### User registration

First, let's see how the registration flow works.

![Passkey registration flow](https://images.ctfassets.net/23aumh6u8s0i/2wFESoN5p5JJNnCM8gzIIA/8359b4717f89f2bd6ad0036961b4e841/registartion-flow.jpg)

1. The user begins the registration flow. The relying party provides a randomly generated challenge string.
2. The `navigator.credentials.create()` method of the WebAuthn API is invoked and the user provides approval using their authenticator.
3. The authenticator creates a private-public key pair which is unique for the relying party's domain and the user. The private key is used to sign the challenge.
   - The private key is stored on the authenticator.
   - **For synced passkeys**, the private key is also synced to a cloud service for backup and roaming (This is the only place where synced passkeys differ from device-bound passkeys).
   - An attestation object is created which contains the public key, signed challenge, credential ID, and certificate.
4. The attestation object and other metadata are then passed to the relying party by the client-side implementation. The relying party verifies the signed challenge using the public key and registers the user by storing the public key and credential ID along with the user details.

#### User authentication

Now, let's see how the login flow works, which is quite similar except for the third step.

![Passkey login flow](https://images.ctfassets.net/23aumh6u8s0i/6sQPhaAjnYdPl2L1Ruu0gU/0b866c672109b02ba5a856b324d719a0/login-flow.jpg)

1. The user begins the login flow. The relying party provides a randomly generated challenge string.
2. The `navigator.credentials.get()` method of the WebAuthn API is invoked and the user provides approval using their authenticator.
3. The authenticator retrieves the private keys for the relying party's domain name.
   - **For synced passkeys**, if the device is new, the private key is synced from a cloud service if available (This is the only place where synced passkeys differ from device-bound passkeys).
   - The user selects the private key for their username. The private key is used to sign the challenge.
   - An assertion object is created which contains the signed challenge and credential ID.
4. The assertion object and other metadata are then passed to the relying party by the client-side implementation. The relying party verifies the signed challenge using the public key stored for the user and authenticates the user.

## Why Passkeys?

Let's see why we need passkeys to replace passwords.

Passkeys are superior to password + traditional OTP MFA in terms of security and usability and they are as secure and more convenient than password + FIDO MFA. Most importantly, you don’t have to remember anything (unless you are like me and forget your YubiKeys all the time).

![password vs passkeys](https://images.ctfassets.net/23aumh6u8s0i/6VeM8DTr7thzYZYucQk53A/b16e52d6e9b404cd5fc5d576ba972688/password-vs-passkey.jpg)

- **Discoverable**: Passwords are knowledge-based but passkeys are discoverable credentials and the browser can autofill them for a service making it unnecessary for you to remember even usernames. It doesn’t rely on something you know, instead, it relies on something you have or something you are which is more secure from hacking and social engineering.
- **Phishing resistant**: Passkeys cannot be phished as they rely on public key cryptography and are bound to the domain name of the website, making it impossible to work on a spoofed website.
- **Remote attack resistant**: Passkeys rely on physical keys, like biometric sensors of platform authenticators or roaming authenticators like YubiKey, hence cannot be remotely breached.
- **Breach resistant**: The website only stores the public key of a user which is useless to an attacker on a data breach on the server side. This makes the server less attractive to hackers.
- **Not reusable and shareable\***: They cannot be reused as they are unique per service and user combination and cannot be shared.
  - **\***except for Apple which lets you share a passkey by air-dropping it 🤷🏽.
- **Easier management**: Passkeys are scalable. Synced passkeys are backed up and replicated across your devices by services like iCloud Keychain, Google Password Manager, Bitwarden, and so on. This makes recovery part of the platform rather than the application.
- **Cross-device authentication**: Passkeys can also perform cross-device authentication regardless of ecosystem or platform. For example, you can simply use your Android phone as an authenticator for your Apple laptop.

![Security and usability spectrum of passkeys](https://images.ctfassets.net/23aumh6u8s0i/42XVjCL09xrYbViYJEBJKz/e18d7b66fdd0973c45ab58b4c880ee8c/usability.jpg)

The security of passkeys is way better than most other combinations. When it comes to user experience, though it is subjective, I think it outperforms all other combinations.

## How Does Passkeys Differ from WebAuthn Multi-Factor Authentication?

Technically they are very similar since both are implemented with WebAuthn and in the case of device-bound passkeys they are even more similar. However, some differences set them apart.

- Passkeys are **[Discoverable Credentials](https://www.w3.org/TR/webauthn-2/#discoverable-credential)** and are entirely stored on the authenticator. This means for hardware keys like YubiKey, the private key is stored on the key itself and hence can only hold what its memory allows. They are client-side discoverable during authentication ceremonies and can be used in the [autofill UI](https://passkeys.dev/docs/reference/terms/#autofill-ui) of the browser. WebAuthn/FIDO-based MFA implementations are **Non-Discoverable Credentials** or **[Server-side Credentials](https://www.w3.org/TR/webauthn-2/#server-side-credential)** and hence are not client-side discoverable. They are stored server-side and the private key is encrypted and sent to the relying party, hence there is no storage limitation on the hardware key.
- WebAuthn MFA does not have a synced option, passkeys do.
- In the case of synced passkeys there are even more differences in terms of usability and security. For example, enrollment needs to be done only once and the private keys are synced to a cloud.

The most important difference is that passkeys can be used as first-factor authentication whereas WebAuthn MFA can only be used as a second-factor after user registration with a password.

## Challenges

There are still some challenges when it comes to passkeys:

- **OS/Browser support**: It is dependent on the OS and Browser to implement the specs, and we all know how that turns out right? This means the support may not be uniform and can become fragmented and we might never have the same experience everywhere.
- **Cloud vendor reliance**: It relies on companies like Apple, Google, and Microsoft to save the private keys in their cloud securely and protect them from breaches.
- **Enterprise use cases**: Enterprise users might want more control and flexibility which could be a problem. For example, if an enterprise doesn’t allow iCloud or Google Chrome on their computer, synced passkeys will not work there, only device-bound passkeys will work.
- **Reset & Recovery**: There are no default recovery flows for device-bound passkeys, and applications might still need to implement recovery & reset flows to accommodate all use cases.

[Browser and OS compatibility](https://passkeys.dev/device-support/) is still catching up. As of writing, Chrome has the best support and the Apple ecosystem has the most seamless experience, especially for platform authenticators. Linux does not have any support for platform authenticators. Roaming authenticators have great support on all platforms.

## Conclusion

Passkeys are the future of secure authentication. They are more secure and more convenient than passwords and traditional MFA. They are also more secure and more convenient than other passwordless methods like magic links, SMS/Email OTP, and push notifications. The wider adoption of passkeys could finally solve the password problem and make the internet a safer place.

Passkeys are not just for the future, they are here now. You can start using them today. If you are a developer, you can start implementing them in your applications [using Auth0](https://developer.auth0.com/resources/labs/authentication/passkeys#go-beyond-passwords-with-passkeys). If you are a user, you can start using them on [services that support them](https://passkeys.directory/).

## Resources

Check out this follow-up blog post.

{% link https://deepu.tech/webauthn-and-passkeys-for-java-developers/ %}

I hope that you found this article helpful. Here are some additional resources to learn more about WebAuthn and passkeys.

- [learnpasskeys.io](https://learnpasskeys.io)
- [webauthn.me](https://webauthn.me)
- [passkeys.dev](https://passkeys.dev)
- [fidoalliance](https://fidoalliance.org/passkeys/)
- [Our Take On Passkeys](https://auth0.com/blog/our-take-on-passkeys/)
- [Activate Passkeys and Let Your Users Log in without a Password](https://auth0.com/blog/activate-passkeys-let-users-log-in-without-password/)
- [How to Explain Public-Key Cryptography and Digital Signatures to Anyone](https://auth0.com/blog/how-to-explain-public-key-cryptography-digital-signatures-to-anyone/)

---

If you like this article, please leave a like or a comment.

You can follow me on [Mastodon](https://mastodon.social/@deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).
