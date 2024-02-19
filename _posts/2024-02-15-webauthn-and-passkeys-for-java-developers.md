---
title: "A Passwordless Future: Passkeys for Java Developers"
published: true
description: >-
  Learn how to get started with passkeys for your Java and Spring Boot applications.
tags:
  - java
  - spring
  - passkeys
  - webauthn
cover_image: >-
  https://images.ctfassets.net/23aumh6u8s0i/5hJmVQbQfsNjNelza45z5p/41ef7af98a312dcd771c361bfc9e6149/Our_Take_on_Passkeys_4X.jpg
canonical_url: 'https://auth0.com/blog/webauthn-and-passkeys-for-java-developers/'
series: Passkeys
devto_id: 1714905
devto_url: >-
  https://dev.to/deepu105/a-passwordless-future-passkeys-for-java-developers-3f0c
---

_Originally published at [auth0.com](https://auth0.com/blog/webauthn-and-passkeys-for-java-developers/)_

This blog post is a continuation of my previous [blog post on passkeys](https://auth0.com/blog/webauthn-and-passkeys-for-developers/). In this post, you will learn how to implement passkeys using Auth0 and the WebAuthn4j library on your Java applications.

{% link https://dev.to/deepu105/a-passwordless-future-passkeys-for-java-developers-1f54 %}

If you have not read the previous blog post, I would highly recommend you read it first to understand the basics of passkeys and WebAuthn.

## Passkeys

A passkey is a unique cryptographic key pair that allows you to access online services without using passwords. It is based on [asymmetric public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography).

> Passkeys are passwordless FIDO credentials implemented using WebAuthn.

## Why Passkeys?

Passkeys are superior to password + traditional OTP MFA in terms of security and usability and they are as secure and more convenient than password + FIDO MFA. Most importantly, you don’t have to remember anything.

![password vs passkeys](https://images.ctfassets.net/23aumh6u8s0i/6VeM8DTr7thzYZYucQk53A/b16e52d6e9b404cd5fc5d576ba972688/password-vs-passkey.jpg)

## Let's See Passkeys in Action with Auth0

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

-   The `web` dependency provides Spring Web MVC with basic HTTP REST functionality.
-   The `okta` dependency provides the Okta Spring Boot Starter, which provides the required dependencies and configuration to add OIDC authentication to your application.

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

Configure the application to use Auth0 as the Identity Provider (IdP). You can use the Auth0 CLI to create a new authorization server application. Run the following command to create a new application:

```bash
auth0 apps create \
  --name "Spring Boot Passkeys" \
  --description "Spring Boot Example" \
  --type regular \
  --callbacks http://localhost:8080/login/oauth2/code/okta \
  --logout-urls http://localhost:8080 \
  --reveal-secrets
```

-   The `--type` option specifies that you use a regular web application.
-   The `--callbacks` option specifies the callback URL for the application.
-   The `--logout-urls` option specifies the logout URL for the application.
-   The `--reveal-secrets` option will display the client secret in the output.

You can also use the `auth0 apps update` command to update the application with the callback and logout URLs.

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

Open a new incognito window and navigate to [http://localhost:8080](http://localhost:8080/). You will be prompted to sign in using your passkey. Once you have signed in, you will see the welcome message.

Isn't that cool? You just implemented passkeys in your Spring Boot application with so little effort thanks to Auth0.

## WebAuthn for Java

Though Web Authentication’s user experience is a client-side implementation using JavaScript, the backend or Relying party can be a Java server. Ideally using an IdP like Auth0 would be the best option since it takes care of all the heavy lifting for you. But if you want to implement it yourself and walk the harder path, you can use one of the below libraries.

-   [WebAuthn4j](https://github.com/webauthn4j/webauthn4j): A 100% FIDO2 conformant library with support for all attestation formats and validation. It is used by Keycloak and Spring Security.
-   [java-webauthn-server](https://github.com/Yubico/java-webauthn-server): A library from Yubico that supports many attestation format. But it is not 100% FIDO2 conformant.

## WebAuthn4j with Spring Security in Action

Let's look at a simple Spring Boot application that uses passkeys for authentication without using an IdP. You can find the sample app [on GitHub](https://a0.to/jfall-webauthn).

### Clone and run the application

Start by cloning the application.

```shell
git clone https://github.com/deepu105/webauthn4j-spring-boot-passkeys-demo.git

cd webauthn4j-spring-boot-passkeys-demo
./gradlew bootRun
```

Visit [http://localhost:8080/](http://localhost:8080/). You should see the below screen. Try registering a new user with passkeys and log in.

![Sign up Screen](https://images.ctfassets.net/23aumh6u8s0i/6AMgTTV5zvVh1kqb3Y3MjQ/ad84606693d09195dc43a4aa1c5ea8a5/register-screen-webauthn4j.jpg)

### WebAuthn4j configuration

Let's look at some of the important parts of the application.

-   The `webauthn4j-spring-security-core` dependency, in `build.gradle` file, provides the Spring Security integration for WebAuthn4j.
-   The required beans for WebAuthn4j are configured in `src/main/java/com/example/demo/config/WebSecurityBeanConfig.java`.
-   The `InMemoryWebAuthnAuthenticatorManager` is used to keep things simple but it means authenticator data is lost on application restart. For production use, it is better to implement the `WebAuthnAuthenticatorManager` interface and persist credential IDs for users.
-   WebAuthn4j is configured using the standard Spring Security filter chain in `src/main/java/com/example/demo/config/WebSecurityConfig.java`.

```java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    ...
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
        // WebAuthn Login
        http.apply(WebAuthnLoginConfigurer.webAuthnLogin())
            .defaultSuccessUrl("/", true)
            .failureHandler((request, response, exception) -> {
                logger.error("Login error", exception);
                response.sendRedirect("/login?error=Login failed: " + exception.getMessage());
            })
            .attestationOptionsEndpoint()
            .rp()
            .name("WebAuthn4J Passkeys Demo")
            .and()
            .pubKeyCredParams(
                // supported algorithms for cryptography
                new PublicKeyCredentialParameters(PublicKeyCredentialType.PUBLIC_KEY, COSEAlgorithmIdentifier.ES256),
                new PublicKeyCredentialParameters(PublicKeyCredentialType.PUBLIC_KEY, COSEAlgorithmIdentifier.RS256)
            )
            .attestation(AttestationConveyancePreference.DIRECT)
            .extensions()
            .uvm(true)
            .credProps(true)
            .extensionProviders()
            .and()
            .assertionOptionsEndpoint()
            .extensions()
            .extensionProviders();

        http.headers(headers -> {
            // 'publickey-credentials-get *' allows getting WebAuthn credentials to all nested browsing contexts (iframes) regardless of their origin.
            headers.permissionsPolicy(config -> config.policy("publickey-credentials-get *"));
            // Disable "X-Frame-Options" to allow cross-origin iframe access
            headers.frameOptions(Customizer.withDefaults()).disable();
        });

        // Authorization
        http.authorizeHttpRequests(authz -> authz
            .requestMatchers(HttpMethod.GET, "/login").permitAll()
            .requestMatchers(HttpMethod.POST, "/signup").permitAll()
            .anyRequest().access(getWebExpressionAuthorizationManager("@webAuthnSecurityExpression.isWebAuthnAuthenticated(authentication)"))
        );

        http.exceptionHandling(eh -> eh.accessDeniedHandler((request, response, accessDeniedException) -> {
            logger.error("Access denied", accessDeniedException);
            response.sendRedirect("/login");
        }));

        http.authenticationManager(authenticationManager);

        // As WebAuthn has its own CSRF protection mechanism (challenge), CSRF token is disabled here
        http.csrf(csrf -> {
            csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
            csrf.ignoringRequestMatchers("/webauthn/**");
        });

        return http.build();
    }
    ...
}

```

The endpoints are configured in `src/main/java/com/example/demo/web/WebAuthnSampleController.java`. The `/` and `/login` endpoints are quite simple and self-explanatory. The `/signup` endpoint handles the WebAuthn registration request using WebAuthn4j. The request is first validated using `WebAuthnRegistrationRequestValidator` and then the authenticator is created using `WebAuthnAuthenticatorManager`.

```java
@Controller
public class WebAuthnSampleController {
    ...
    @PostMapping(value = "/signup")
    public String create(HttpServletRequest request, @Valid @ModelAttribute("userForm") UserCreateForm userCreateForm, BindingResult result, Model model, RedirectAttributes redirectAttributes) {
        try {
            if (result.hasErrors()) {
                model.addAttribute("errorMessage", "Your input needs correction.");
                logger.error("User input validation failed.");
                return VIEW_LOGIN;
            }
            WebAuthnRegistrationRequestValidationResponse registrationRequestValidationResponse;
            try {
                registrationRequestValidationResponse = registrationRequestValidator.validate(
                    request,
                    userCreateForm.getClientDataJSON(),
                    userCreateForm.getAttestationObject(),
                    userCreateForm.getTransports(),
                    userCreateForm.getClientExtensions()
                );
            } catch (WebAuthnException | WebAuthnAuthenticationException e) {
                model.addAttribute("errorMessage", "Authenticator registration request validation failed. Please try again.");
                logger.error("WebAuthn registration request validation failed.", e);
                return VIEW_LOGIN;
            }
            var username = userCreateForm.getUsername();
            var authenticator = new WebAuthnAuthenticatorImpl(
                "authenticator",
                username,
                registrationRequestValidationResponse.getAttestationObject().getAuthenticatorData().getAttestedCredentialData(),
                registrationRequestValidationResponse.getAttestationObject().getAttestationStatement(),
                registrationRequestValidationResponse.getAttestationObject().getAuthenticatorData().getSignCount(),
                registrationRequestValidationResponse.getTransports(),
                registrationRequestValidationResponse.getRegistrationExtensionsClientOutputs(),
                registrationRequestValidationResponse.getAttestationObject().getAuthenticatorData().getExtensions()
            );
            try {
                webAuthnAuthenticatorManager.createAuthenticator(authenticator);
            } catch (IllegalArgumentException ex) {
                model.addAttribute("errorMessage", "Registration failed. The user may already be registered.");
                logger.error("Registration failed.", ex);
                return VIEW_LOGIN;
            }
        } catch (RuntimeException ex) {
            model.addAttribute("errorMessage", "Registration failed by unexpected error.");
            logger.error("Registration failed.", ex);
            return VIEW_LOGIN;
        }
        model.addAttribute("successMessage", "User registration successful. Please login.");
        return VIEW_LOGIN;
    }
}
```

### Client-side configuration

The file `src/main/resources/templates/login.html` handles login and sign-up. The login button will invoke the `navigator.credentials.get()` API and the register button will invoke the `navigator.credentials.create()` API. The buttons submit the corresponding forms with the input data in them. All inputs except the `username` field are hidden as their data will be set using JavaScript.

WebAuthn4j exposes `/webauthn/attestation/options` endpoint in the application to fetch the registration options. Some of the option parameters need to be decoded from base64URL. The [base64url-arraybuffer](https://github.com/deepu105/base64url-arraybuffer) library is used for this. The options are then passed to the `navigator.credentials.create()` API. The response from the API is then updated to the form fields and submitted to the `/signup` endpoint.

```js
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userHandle = document.getElementById('userHandle').value;
    const username = document.getElementById('username').value;
    try {
        const optionsRes = await fetch('/webauthn/attestation/options');
        const options = await optionsRes.json();
        const publicKey = {
            ...options,
            challenge: base64url.decode(options.challenge, true),
            user: {
                id: base64url.decode(userHandle, true),
                name: username,
                displayName: username,
            },
            excludeCredentials: options.excludeCredentials.map((credential) => ({
                ...credential,
                id: base64url.decode(credential.id, true),
            })),
            authenticatorSelection: {
                requireResidentKey: true,
                userVerification: 'discouraged',
            },
        };
        const credential = await navigator.credentials.create({ publicKey });
        document.getElementById('clientDataJSON').value = base64url.encode(credential.response.clientDataJSON);
        document.getElementById('attestationObject').value = base64url.encode(credential.response.attestationObject);
        document.getElementById('clientExtensions').value = JSON.stringify(credential.getClientExtensionResults());
        document.getElementById('signup-form').submit();
    } catch (error) {
        console.error('Error:%s, Message:%s', error.name, error.message);
    }
});
```

WebAuthn4j exposes `/webauthn/assertion/options` endpoint in the application to fetch the authentication options. Some of the option parameters need to be decoded from base64URL. The options are then passed to the `navigator.credentials.get()` API. The response from the API is then updated to the form fields and submitted to the `/login` endpoint.

```js
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const optionsRes = await fetch('/webauthn/assertion/options');
        const options = await optionsRes.json();
        const publicKey = {
            ...options,
            challenge: base64url.decode(options.challenge, true),
            userVerification: 'preferred',
        };
        const credential = await navigator.credentials.get({ publicKey });
        document.getElementById('credentialId').value = credential.id;
        document.getElementById('loginClientDataJSON').value = base64url.encode(credential.response.clientDataJSON);
        document.getElementById('authenticatorData').value = base64url.encode(credential.response.authenticatorData);
        document.getElementById('signature').value = base64url.encode(credential.response.signature);
        document.getElementById('loginClientExtensions').value = JSON.stringify(credential.getClientExtensionResults());
        document.getElementById('login-form').submit();
    } catch (error) {
        console.error('Error:%s, Message:%s', error.name, error.message);
    }
});
```

## Conclusion

You have now learned:

-   How to implement passkeys using an IdP like Auth0.
-   You also learned how to configure the application to use Auth0 as the Identity Provider and how to configure Auth0 for passkey support.
-   Roll your own passkey solution using WebAuthn4j and Spring Security.

Passkeys are the future of authentication. They are more secure and convenient than traditional passwords and OTPs. Though you could roll your own solution using WebAuthn4j, it is always better to use an IdP like Auth0 to handle the heavy lifting for you and take care of all the security best practices.

## Resources

I hope that you found this article helpful. Here are some additional resources to learn more about WebAuthn and passkeys.

-   [learnpasskeys.io](https://learnpasskeys.io)
-   [webauthn.me](https://webauthn.me)
-   [passkeys.dev](https://passkeys.dev)
-   [fidoalliance](https://fidoalliance.org/passkeys/)

---

If you like this article, please leave a like or a comment.

You can follow me on [Mastodon](https://mastodon.social/@deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

