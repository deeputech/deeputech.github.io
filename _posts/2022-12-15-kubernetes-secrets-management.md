---
title: Shhhh... Kubernetes Secrets Are Not Really Secret!
published: true
description: >-
  Learn how to setup secure secrets on Kubernetes using Sealed Secrets, External
  Secrets Operator, and Secrets Store CSI driver.
tags:
  - devops
  - kubernetes
  - devsecops
cover_image: >-
  https://images.ctfassets.net/23aumh6u8s0i/5sGRuNiW4fSPVSoZjbwkK0/f505f0bdf239fd84fc6b4d128a48d4ed/Deepu_a_container_ship_entering_a_door_lock_lens_flare_photorea_66931d74-fd55-456a-93e0-48e0ad9e927b.png
canonical_url: 'https://auth0.com/blog/kubernetes-secrets-management/'
devto_id: 1297422
devto_url: 'https://dev.to/deepu105/shhhh-kubernetes-secrets-are-not-really-secret-3h38'
---

Kubernetes has become an inevitable part of the modern software infrastructure. Hence managing sensitive data on Kubernetes is also an essential aspect of modern software engineering so that you can put the security back into DevSecOps. Kubernetes offers a way to store sensitive data using the [Secret](https://kubernetes.io/docs/concepts/configuration/secret/) object. While it's better than nothing, it is not really a secret, as it is just [base64](https://en.wikipedia.org/wiki/Base64) encoded strings that anyone with access to the cluster or the code can decode.

> **Caution:**
> Kubernetes Secrets are, by default, stored unencrypted in the API server's underlying data store (etcd). Anyone with API access can retrieve or modify a Secret, and so can anyone with access to etcd. Additionally, anyone authorized to create a Pod in a namespace can use that access to read any Secret in that namespace; this includes indirect access, such as the ability to create a Deployment.
> — [Kubernetes docs](https://kubernetes.io/docs/concepts/configuration/secret/)

The problem of reading secrets from the cluster can be fixed using proper [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) configuration and by securing the API server, check out [How to Secure Your Kubernetes Clusters With Best Practices](https://developer.okta.com/blog/2021/12/02/k8s-security-best-practices) to learn more about RBAC and cluster API security. Securing secrets on the source code is the bigger problem. Everyone who has access to the repositories containing those secret definitions can also decode them. This makes it quite tricky to manage Kubernetes secrets in Git, like every other resource.

Let's see how to setup more secure secrets using the;

- Sealed Secrets,
- External Secrets Operator,
- Secrets Store CSI driver.

You would need a Kubernetes cluster to run the samples. I used [k3d](https://k3d.io/) to create a local cluster. You can also use [kind](https://kind.sigs.k8s.io/) or [minikube](https://minikube.sigs.k8s.io/docs/) for this purpose.

## Sealed Secrets

[Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets) is an open-source Kubernetes controller and a client-side CLI tool from Bitnami that aims to solve the "**storing secrets in Git**" part of the problem, using asymmetric crypto encryption. Sealed Secrets with an RBAC configuration preventing non-admins from reading secrets is an excellent solution for the entire problem.

![Sealed Secrets Architecture](https://images.ctfassets.net/23aumh6u8s0i/5Ku8H6vSbhV1rECmEYV3q7/07b8d6a66aabff4534d84095d0d1687a/sealed-secrets-architecture.jpg)

It works as below;

1. Encrypt the secret on the developer machine using a public key and the `kubeseal` CLI. This encodes the encrypted secret into a Kubernetes Custom Resource Definition (CRD)
2. Deploy the CRD to the target cluster
3. The Sealed Secret controller decrypts the secret using a private key on the target cluster to produce a standard Kubernetes secret.

The private key is only available to the Sealed Secrets controller on the cluster, and the public key is available to the developers. This way, **only the cluster can decrypt the secrets, and the developers can only encrypt them**.

### Advantages

- Supports template definition so that metadata can be added to the unsealed secrets. For example, you can add labels and annotations to the unsealed secrets using the template definition.
- The unsealed secrets will be owned by the sealed secret CRD and updated when the sealed secrets are updated.
- Certificates are rotated every 30 days by default, and this can be customized.
- Secrets are encrypted using unique keys for each cluster, namespace, and secret combination (private key + namespace name + secret name), preventing any loopholes in decryption. This behavior is configurable using scopes `strict`, `namespace-wide`, and `cluster-wide` during the sealing process.
- Can be used to manage existing secrets in the cluster.
- Has a [VSCode extension](https://marketplace.visualstudio.com/items?itemName=codecontemplator.kubeseal) to make it easier to use.

### Disadvantages

- Since it unseals the sealed secrets into regular secrets, you can still decode them if you have access to the cluster and namespace.
- Requires resealing for each cluster environment, as the key pair will be unique for each cluster.

### Installation

Install the controller on the cluster and the CLI on the local machine.

1. Download the `controller.yaml` manifest file from the [release](https://github.com/bitnami-labs/sealed-secrets/releases) page.
2. Deploy the controller using `kubectl apply -f controller.yaml` to your cluster. The controller will be installed on the `kube-system` namespace. The controller will start and be ready in a few moments.
3. Install the CLI on your local machine using `brew install kubeseal` (Linux & macOS) or using the pre-built binaries on the [release](https://github.com/bitnami-labs/sealed-secrets/releases) page.

### Usage

Let's create a sealed secret.

1. Create a secret using the `kubectl create secret` command or by hand coding a YAML file as follows:

```bash
echo -n secretvalue | kubectl create secret generic mysecret \
  --dry-run=client \
  --from-file=foo=/dev/stdin -o yaml > my-secret.yaml
```

This will produce a secret definition like the one below;

```yaml
# my-secret.yaml

apiVersion: v1
data:
  foo: c2VjcmV0dmFsdWU=
kind: Secret
metadata:
  creationTimestamp: null
  name: mysecret
```

2. Seal the secret using the `kubeseal` CLI. This will encrypt the secret using the public key fetched from the server and produce a sealed secret definition. The `my-secret.yaml` file can be discarded now. You can also download the public key and use it locally in offline mode.

```bash
kubeseal --format yaml < my-secret.yaml > my-sealed-secret.yaml
```

This will produce a sealed secret definition, `my-sealed-secret.yaml`, like the one below;

```yaml
# my-sealed-secret.yaml

apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  creationTimestamp: null
  name: mysecret
  namespace: default
spec:
  encryptedData:
    foo: AgA6a4AGzd7qzR8mTPqTPFNor8tTtT5...==
  template:
    metadata:
      creationTimestamp: null
      name: mysecret
      namespace: default
```

This file is safe to commit to Git or to share with other developers.

3. Finally, you can deploy this to the cluster to be unsealed.

```bash
kubectl apply -f my-sealed-secret.yaml
```

4. Now, you can see the unsealed secret in the cluster.

```bash
kubectl describe secret mysecret
```

You can use this secret in deployments like any other Kubernetes secret.

## External Secrets Operator

Sealed Secrets are a great starting point for securing secrets, but there is an even better way. Using the [External Secrets Operator (ESO)](https://external-secrets.io/) and an external secret management system like [HashiCorp Vault](https://www.vaultproject.io/), [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/), [Google Secrets Manager](https://cloud.google.com/secret-manager), or [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/). While this is a bit more involved to set up, it is a better approach if you use a cloud provider to host your Kubernetes cluster. ESO supports many such secret managers and watches for changes to external secret stores, and keeps Kubernetes secrets in sync.

![External Secrets Operator Architecture](https://images.ctfassets.net/23aumh6u8s0i/3zlSSXIMQQq0lhw19cY5Me/42782ce30606ff156b49e6879de3b589/external-secrets-operator-architecture.jpg)

ESO provides four CRDs to manage secrets. The `ExternalSecret` and `ClusterExternalSecret` CRD define what data needs to be fetched and how it should be transformed. The `SecretStore` and `ClusterSecretStore` CRD define the connection details to the external secret stores. The `Cluster` variations can be used cluster-wide.

It works as below;

1. Create a `SecretStore` CRD to define the connection details to the external secret store.
2. Create secrets in the external secret store.
3. Create an `ExternalSecret` CRD to define what data needs to be fetched from the external secret store.
4. Deploy the CRDs to the target cluster.
5. The ESO controller will fetch the data from the external secret store and create a Kubernetes secret.

### Advantages

- Secrets are stored in a secure external secret manager, not the code repository.
- Keeps secrets in sync with the external secret manager.
- Works with many external secret managers.
- Can use multiple secret stores in the same cluster.
- Provides [Prometheus](https://prometheus.io/) metrics for monitoring.

### Disadvantages

- Needs an elaborate setup to use.
- Creates a Kubernetes secret object which can be decoded if you have access to the cluster and namespace.
- Relies on the external secret manager and its access policies to be secure.

### Installation

ESO can be installed via [Helm](https://helm.sh/) using the following commands:

```bash
helm repo add external-secrets https://charts.external-secrets.io

helm install external-secrets \
  external-secrets/external-secrets \
  --namespace external-secrets \
  --create-namespace
```

If you want to include ESO in your Helm releases, add the `--set installCRDs=true` flag to the above command.

Let's see how you can use ESO with different secret managers.

### Using HashiCorp Vault

[HashiCorp Vault](https://www.vaultproject.io/) is a popular secret manager providing different secret engines. ESO can only be used with the [KV Secrets Engine](https://www.vaultproject.io/docs/secrets/kv) offered by Vault. Vault provides a free and open-source version that you can self-manage and a managed version with a free tier on the HashiCorp Cloud Platform (HCP).

Make sure you have a Key-value secret store setup in [your local Vault instance](https://developer.hashicorp.com/vault/tutorials/getting-started) or on the [HCP cloud](https://developer.hashicorp.com/vault/tutorials/cloud). You can also [deploy Vault to your Kubernetes cluster](https://blog.container-solutions.com/tutorialexternal-secrets-with-hashicorp-vault) using the [Vault Helm chart](https://www.vaultproject.io/docs/platform/k8s/helm)

1. Create a new `SecretStore` CRD, `vault-backend.yaml`, to define the connection details to Vault.

```yaml
# vault-backend.yaml

apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "YOUR_VAULT_ADDRESS"
      path: "secret"
      version: "v2"
      namespace: "admin" # required for HCP Vault
      auth:
        # points to a secret that contains a vault token
        # https://www.vaultproject.io/docs/auth/token
        tokenSecretRef:
          name: "vault-token"
          key: "token"
```

2. Create a secret resource to hold the Vault token. Use a token that has [policies](https://www.vaultproject.io/docs/concepts/policies) with read access to the `secret/` path in the Vault KV store.

```bash
kubectl create secret generic vault-token \
  --dry-run=client \
  --from-literal=token=YOUR_VAULT_TOKEN
```

3. Create a secret in Vault. If you are using the Vault CLI, you can use the below command to create a secret. Make sure you are logged in to the vault instance from the CLI with appropriate policies.

```bash
vault kv put secret/mysecret my-value=supersecret
```

3. Create an `ExternalSecret` CRD to define what data needs to be fetched from Vault.

```yaml
# vault-secret.yaml

apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: vault-example
spec:
  refreshInterval: "15s"
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: vault-example-sync
  data:
    - secretKey: secret-from-vault
      remoteRef:
        key: secret/mysecret
        property: my-value
```

4. Apply the above CRDs to the cluster, and it should create a Kubernetes secret named `vault-example-sync` with the data fetched from Vault.

```bash
kubectl apply -f vault-backend.yaml
kubectl apply -f vault-secret.yaml
```

You can see the secret in the cluster using the `kubectl describe` command.

```bash
kubectl describe secret vault-example-sync

# output should have the below data
Name:         vault-example-sync
Namespace:    default
Labels:       <none>
Annotations:  reconcile.external-secrets.io/data-hash: ...

Type:  Opaque

Data
====
secret-from-vault:  16 bytes
```

**If you have issues creating the secret**, check the events section of the describe output of the `ExternalSecret` resource.

```bash
kubectl describe externalsecret vault-example
```

If you see permission errors, make sure you use tokens with the right policies.

### Other secret managers

Setting up other secret managers is similar to the above steps. The only difference would be the `SecretStore` CRD and the `remoteRef` section in the `ExternalSecret` CRD. You can find official guides for different providers in the [ESO documentation](https://external-secrets.io/).

## Secrets Store CSI Driver

The [Secrets Store CSI Driver](https://secrets-store-csi-driver.sigs.k8s.io/) is a native upstream Kubernetes driver that can be used to abstract where the secret is stored from the workload. If you want to use a cloud provider's secret manager without exposing the secrets as Kubernetes Secret objects, you can use the CSI Driver to mount secrets as volumes in your pods. This is a great option if you use a cloud provider to host your Kubernetes cluster. The driver supports many cloud providers and can be used with different secret managers.

![Secrets Store CSI Driver Architecture](https://images.ctfassets.net/23aumh6u8s0i/20smaU4zvY0Wt4WKeYTrXu/bdf68ba47b6b630a0ed162fd12ff5f0f/secret-csi-driver.jpg)

The Secrets Store CSI Driver is a daemonset that communicates with the secret provider to retrieve secrets specified in a `SecretProviderClass` custom resource.

It works as below;

1. Create a `SecretProviderClass` CRD to define the details of the secret to be fetched from the secret provider.
2. Create deployments and reference the `SecretProviderClass` in the pod's volume spec.
3. The driver will fetch the secret from the secret provider and mount it as a `tmpfs` volume in the pod during pod startup. This volume will be removed during pod deletion.

The driver can also sync changes to secrets. The driver currently supports [Vault](https://github.com/hashicorp/secrets-store-csi-driver-provider-vault), [AWS](https://github.com/aws/secrets-store-csi-driver-provider-aws), [Azure](https://github.com/Azure/secrets-store-csi-driver-provider-azure), and [GCP](https://github.com/GoogleCloudPlatform/secrets-store-csi-driver-provider-gcp) providers. Secrets Store CSI Driver can also sync provider secrets as Kubernetes secrets; if required, this behavior needs to be explicitly enabled during installation.

### Advantages

- Secrets are stored in a secure external secret manager, not the code repository.
- Keeps secrets in sync with the external secret manager. It also supports the rotation of secrets.
- Works with all major external secret managers.
- Mounts secrets as volumes in the pod so they are not exposed as Kubernetes secrets. It can be configured to create Kubernetes secrets as well.

### Disadvantages

- Needs an elaborate setup to use and is more complex than ESO.
- Uses more resources than ESO as this needs to run in every node.
- Relies on the external secret store and its access policies to be secure.

### Using Google Secret Manager provider

Let us see how to configure the driver to use Google Secret Manager (GSM) as the secret provider.

Make sure you are using a Google Kubernetes Engine (GKE) cluster with the [Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) feature enabled. Workload Identity allows workloads in your GKE clusters to impersonate Identity and Access Management (IAM) service accounts to access Google Cloud services. You would also need to enable Kubernetes Engine API, Secret Manager API, and Billing for the project. The `gcloud` CLI should prompt you to enable these APIs if they are not enabled.

The below command can be used to create a new cluster with Workload Identity enabled using the `gcloud` CLI.

```bash
export PROJECT_ID=<your gcp project>
gcloud config set project $PROJECT_ID

gcloud container clusters create hello-hipster \
  --workload-pool=$PROJECT_ID.svc.id.goog
```

#### Install the Secrets Store CSI Driver

Secrets Store CSI Driver can be installed on the cluster with Helm using the following commands:

```bash
helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts

helm install csi-secrets-store \
    secrets-store-csi-driver/secrets-store-csi-driver \
    --namespace kube-system
```

This will install the driver and CRDs on the `kube-system` namespace. You also need to install the provider required into the cluster.

#### Install the GSM provider

Let us install the GSM provider into the cluster. The provider can be installed using the following command:

```bash
kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/secrets-store-csi-driver-provider-gcp/main/deploy/provider-gcp-plugin.yaml
```

#### Create a Secret

First, you need to setup a workload identity service account.

```bash
# Create a service account for workload identity
gcloud iam service-accounts create gke-workload

# Allow "default/mypod" to act as the new service account
gcloud iam service-accounts add-iam-policy-binding \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:$PROJECT_ID.svc.id.goog[default/mypodserviceaccount]" \
    gke-workload@$PROJECT_ID.iam.gserviceaccount.com
```

Now let's create a secret that this service account can access.

```bash
# Create a secret with 1 active version
echo "mysupersecret" > secret.data
gcloud secrets create testsecret --replication-policy=automatic --data-file=secret.data
rm secret.data

# grant the new service account permission to access the secret
gcloud secrets add-iam-policy-binding testsecret \
    --member=serviceAccount:gke-workload@$PROJECT_ID.iam.gserviceaccount.com \
    --role=roles/secretmanager.secretAccessor
```

Now you can create a `SecretProviderClass` resource that will be used to fetch the secret from GSM. Remember to replace `$PROJECT_ID` with your GCP project ID.

```yaml
# secret-provider-class.yaml

apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: app-secrets
spec:
  provider: gcp
  parameters:
    secrets: |
      - resourceName: "projects/$PROJECT_ID/secrets/testsecret/versions/latest"
        path: "good1.txt"
      - resourceName: "projects/$PROJECT_ID/secrets/testsecret/versions/latest"
        path: "good2.txt"
```

#### Create a Pod

Now you can create a pod that will use the `SecretProviderClass` resource to fetch the secret from GSM. Remember to replace `$PROJECT_ID` with your GCP project ID.

```yaml
# my-pod.yaml

apiVersion: v1
kind: ServiceAccount
metadata:
  name: mypodserviceaccount
  namespace: default
  annotations:
    iam.gke.io/gcp-service-account: gke-workload@$PROJECT_ID.iam.gserviceaccount.com
---
apiVersion: v1
kind: Pod
metadata:
  name: mypod
  namespace: default
spec:
  serviceAccountName: mypodserviceaccount
  containers:
    - image: gcr.io/google.com/cloudsdktool/cloud-sdk:slim
      imagePullPolicy: IfNotPresent
      name: mypod
      resources:
        requests:
          cpu: 100m
      stdin: true
      stdinOnce: true
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      tty: true
      volumeMounts:
        - mountPath: "/var/secrets"
          name: mysecret
  volumes:
    - name: mysecret
      csi:
        driver: secrets-store.csi.k8s.io
        readOnly: true
        volumeAttributes:
          secretProviderClass: "app-secrets"
```

Apply the above resources to the cluster.

```bash
kubectl apply -f secret-provider-class.yaml
kubectl apply -f my-pod.yaml
```

Wait for the pod to start, and then `exec` into the pod and check the contents of the mounted files.

```bash
kubectl exec -it mypod /bin/bash
# execute the below command in the pod to see the contents of the mounted secret file
root@mypod:/# cat /var/secrets/good1.txt
```

### Other secret managers

You can find similar guides for the [AWS CSI provider](https://github.com/aws/secrets-store-csi-driver-provider-aws), [Azure CSI provider](https://azure.github.io/secrets-store-csi-driver-provider-azure/docs/getting-started/usage/) and [Vault CSI provider](https://developer.hashicorp.com/vault/tutorials/kubernetes/kubernetes-secret-store-driver).

## Conclusion

Sealed Secrets are a great solution for small teams and projects to secure secrets in Git. For larger teams and projects, the External Secrets Operator or the Secrets Store CSI Driver is a better solution to manage secrets securely. The External Secrets Operator can be used with many secret management systems and is not limited to the ones mentioned above. Of course, this should be used with RBAC to prevent non-admins from reading secrets in the cluster. The Secrets Store CSI Driver might be more involved than ESO, but it is a more native solution.

Cover image created using [Midjourney](https://midjourney.gitbook.io/) under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

---

If you like this article, please leave a like or a comment.

You can follow me on [Mastodon](https://mastodon.social/@deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

