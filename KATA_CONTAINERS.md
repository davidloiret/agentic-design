The simplest answer is: you don’t *have* to give up on microVMs in Kubernetes just because Kata+Firecracker is unhappy with your newer kernel/containerd. You’ve got a few realistic paths:

---

## 1. Easiest: stay on Kata, but switch away from Firecracker

Kata isn’t tied to Firecracker – it supports multiple hypervisors: QEMU, Cloud Hypervisor, Firecracker, Dragonball, etc. ([GitHub][1])

If Firecracker + latest kernel/containerd is flaky, the practical workaround is to:

### Use **Cloud Hypervisor** with Kata

Cloud Hypervisor is a Rust-based, “utility VM / microVM-style” hypervisor, very similar in spirit to Firecracker but more actively integrated with Kata and cgroup v2 / modern kernels. ([Kata Containers][2])
Kata’s own docs show how to deploy microVMs on Kubernetes with Cloud Hypervisor via a `kata-clh` runtime class. ([Kata Containers][3])

High-level steps:

1. **Install Kata with Cloud Hypervisor support**
   Follow Kata’s install docs for your distro, making sure the Cloud Hypervisor hypervisor package is installed and enabled. ([GitHub][4])

2. **Point Kata to Cloud Hypervisor**

   In `configuration.toml` (usually under `/usr/share/defaults/kata-containers/` or `/etc/kata-containers/`), pick the Cloud Hypervisor config section and either:

   * set it as the default hypervisor, or
   * create a separate configuration file that uses `cloud-hypervisor` as the VMM.

3. **Configure containerd**

   In `containerd.toml`, define a runtime that uses the Kata shim v2 and your Cloud Hypervisor config, for example:

   ```toml
   [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.kata-clh]
     runtime_type = "io.containerd.kata.v2"
   ```

4. **Create a Kubernetes RuntimeClass**

   ```yaml
   apiVersion: node.k8s.io/v1
   kind: RuntimeClass
   metadata:
     name: kata-clh
   handler: kata-clh
   scheduling:
     nodeSelector:
       katacontainers.io/kata-runtime: "true"
   ```

   Then in your pod/deployment:

   ```yaml
   spec:
     runtimeClassName: kata-clh
   ```

This gives you **microVM-like isolation** using Kata + Cloud Hypervisor, while avoiding whatever regression you’re hitting in the Kata+Firecracker path on the latest kernel/containerd.
Kata + Cloud Hypervisor is also what Azure AKS uses for their “Kata VM isolated containers” preview, so it’s not an exotic combo. ([TECHCOMMUNITY.MICROSOFT.COM][5])

---

## 2. Use KubeVirt: VMs as first-class Kubernetes workloads

If you’re okay with “full” VMs instead of Firecracker-style microVMs, **KubeVirt** is the most mature “VMs inside K8s” option.

* KubeVirt extends the Kubernetes API with CRDs (VirtualMachine, VirtualMachineInstance, etc.) and runs VMs via KVM/QEMU on your nodes. ([Compile N Run][6])
* You schedule VMs with `kubectl` just like pods, and they can run alongside regular container workloads. ([Virtualization Howto][7])

Rough flow:

1. Install the KubeVirt operator and CRDs (via their manifests or Helm).
2. Define a `VirtualMachine`:

   ```yaml
   apiVersion: kubevirt.io/v1
   kind: VirtualMachine
   metadata:
     name: microvm-like-vm
   spec:
     running: true
     template:
       spec:
         domain:
           cpu:
             cores: 1
           resources:
             requests:
               memory: 512Mi
           devices:
             disks:
               - name: rootdisk
                 disk:
                   bus: virtio
         volumes:
           - name: rootdisk
             containerDisk:
               image: quay.io/kubevirt/cirros-container-disk-demo
   ```

You can use very small images and aggressive resources to get VM footprints close to “microVM style”, though startup time and overhead will still be higher than Firecracker/Kata.

**Pros**

* Very well-documented and actively developed. ([Compile N Run][6])
* No messing with the container runtime – it runs “on top” of your existing K8s.

**Cons**

* Not Firecracker; more traditional VMs.
* Slightly heavier than microVM-based solutions.

---

## 3. Use Firecracker without Kata: firecracker‑containerd (advanced)

If you really want to stick with **Firecracker** as the VMM and are comfortable with more DIY:

* Amazon’s **firecracker-containerd** project lets containerd manage Firecracker microVMs directly. ([brunoscheufler.com][8])
* It plugs into containerd as a special runtime/shim. Kubernetes talks CRI to containerd, and containerd spins up Firecracker microVMs instead of plain runc containers. ([Some Natalie’s corner of the internet][9])

The pattern looks like:

1. Build/deploy `firecracker-containerd` on your nodes.
2. Configure `containerd` with a runtime handler that uses the Firecracker shim.
3. Expose that runtime via a K8s `RuntimeClass`.
4. Schedule pods with `runtimeClassName: firecracker` (or similar) – they’ll run inside microVMs.

**Pros**

* Pure Firecracker; no extra Kata layer.
* Very flexible; you control kernel/guest image layout closely.

**Cons**

* Definitely not plug-and-play; you own more of the integration (networking, storage, logging).
* Documentation/examples are more “infrastructure engineer” level than “drop-in solution”.

If you go this route, it’s worth starting from a simple “Firecracker+containerd” lab *without* Kubernetes, then plugging it into K8s once you understand the pieces. ([devopstales][10])

---

## 4. Flintlock + microVM operator (microVMs as custom resources)

Another emerging pattern is **Flintlock**:

* Flintlock is a service that manages microVM lifecycles on a host, backed by containerd and supporting Firecracker & Cloud Hypervisor. ([GitHub][11])
* There’s a **microvm-operator** that lets you create microVMs from Kubernetes using CRDs and an operator that calls Flintlock. ([GitHub][12])

This is very powerful for “microVM as a resource type” architectures, but:

* It’s more experimental / PoC-ish than Kata or KubeVirt.
* It’s often used for building *Kubernetes clusters on microVMs* (Liquid Metal) rather than running arbitrary app microVMs **inside** an existing cluster.

Still, if you like CRD/Operator-driven design and want microVMs as first‑class objects in K8s, it’s worth a look.

---

## 5. (Optional) Managed-cluster options & gVisor

If you’re on a managed K8s:

* **AKS** has “Kata VM isolated containers” (Cloud Hypervisor under the hood) that give you VM-level isolation via a supported feature, you just choose the isolation profile instead of wiring Kata yourself. ([TECHCOMMUNITY.MICROSOFT.COM][5])
* **GKE** has gVisor sandboxed containers – not microVMs, but extra isolation without changing your kernel/runtime as much.

If isolation is your goal and not specifically “Firecracker microVMs by name”, these managed features can be a lot less painful.

---

## 6. Tiny note on why Kata+Firecracker may have broken

You didn’t ask for debugging, but for context:

* Kata’s Firecracker support is tied to specific Firecracker versions (pinned in `versions.yaml`), and it historically lags upstream Firecracker releases. ([GitHub][13])
* Newer host kernels and cgroup v2 setups can expose bugs/assumptions in Kata’s runtime and hypervisor integrations, especially around cgroup handling and vCPU/thread accounting. ([GitHub][14])
* If you ever want to revive that stack, double-check:

  * `kata-runtime kata-check`
  * Firecracker version vs Kata’s supported list
  * containerd config (`SystemdCgroup`, shim v2 handler, etc.)

---

### TL;DR recommendation

If you want something that:

* **Feels closest to what you have now** and still gives you microVM-style isolation:

  * → **Kata + Cloud Hypervisor** (swap out Firecracker, keep Kata + containerd + RuntimeClass model).

* **Treats VMs as first-class K8s workloads** and you don’t mind heavier VMs:

  * → **KubeVirt**.

* **Keeps Firecracker at all costs and you’re okay with custom plumbing**:

  * → **firecracker-containerd** (possibly with Flintlock/microvm-operator later).

If you tell me what distro/cluster (bare metal vs EKS/GKE/AKS, kernel & containerd versions) you’re on, I can sketch very concrete config snippets for one of these paths.

[1]: https://github.com/kata-containers/kata-containers/blob/main/docs/hypervisors.md?utm_source=chatgpt.com "kata-containers/docs/hypervisors.md at main - GitHub"
[2]: https://katacontainers.io/blog/kata-containers-with-cloud-hypervisor/?utm_source=chatgpt.com "Kata Containers with Cloud Hypervisor | Blog"
[3]: https://katacontainers.io/blog/deploying-microvm-on-top-of-kubernetes/?utm_source=chatgpt.com "Deploying microVM on Top of Kubernetes | Blog - Kata Containers"
[4]: https://github.com/kata-containers/kata-containers/blob/main/docs/Developer-Guide.md?utm_source=chatgpt.com "kata-containers/docs/Developer-Guide.md at main - GitHub"
[5]: https://techcommunity.microsoft.com/blog/appsonazureblog/preview-support-for-kata-vm-isolated-containers-on-aks-for-pod-sandboxing/3751557?utm_source=chatgpt.com "Preview support for Kata VM Isolated Containers on AKS for Pod ..."
[6]: https://www.compilenrun.com/docs/devops/kubernetes/kubernetes-ecosystem/kubernetes-kubevirt/?utm_source=chatgpt.com "Kubernetes KubeVirt: Running Virtual Machines in Kubernetes | Compile N Run"
[7]: https://www.virtualizationhowto.com/2024/01/kubevirt-running-vms-on-a-kubernetes-cluster/?utm_source=chatgpt.com "Kubevirt Running VMs on a Kubernetes Cluster - Virtualization Howto"
[8]: https://brunoscheufler.com/blog/2021-11-20-running-untrusted-workloads-with-firecracker-and-containerd?utm_source=chatgpt.com "Running Untrusted Workloads with Firecracker and containerd"
[9]: https://some-natalie.dev/blog/stop-saying-just-use-firecracker/?utm_source=chatgpt.com "Please stop saying ‘Just use Firecracker’ - do this instead"
[10]: https://devopstales.github.io/kubernetes/firecracker-containerd/?utm_source=chatgpt.com "How to deploy containerd with Firecracker? - devopstales"
[11]: https://github.com/liquidmetal-dev/flintlock?utm_source=chatgpt.com "Flintlock - Create and manage the lifecycle of MicroVMs ... - GitHub"
[12]: https://github.com/liquidmetal-dev/microvm-operator?utm_source=chatgpt.com "Kubernetes Operator to create MicroVMs on Flintlock hosts"
[13]: https://github.com/kata-containers/kata-containers/blob/main/docs/how-to/how-to-use-kata-containers-with-firecracker.md?utm_source=chatgpt.com "Configure Kata Containers to use Firecracker - GitHub"
[14]: https://github.com/kata-containers/kata-containers/blob/main/docs/design/host-cgroups.md?utm_source=chatgpt.com "kata-containers/docs/design/host-cgroups.md at main - GitHub"


====




Yes – **Kata + Cloud Hypervisor is exactly the right combo for “many microVMs on demand”** and it fits a “VM per user” model really well.

### 1. Does it handle many microVMs?

Yes. That’s the core design:

* In Kubernetes, **Kata implements the pod sandbox as a VM** – “in Kata, this sandbox is created using a virtual machine… in Kubernetes and in the Kata implementation, the sandbox is carried out at the pod level.” ([GitHub][1])
* So every time you create a pod with a Kata RuntimeClass (e.g. `kata-clh`), you get **one lightweight VM** (backed by Cloud Hypervisor) for that pod.
* You can have **many such pods per node**, limited only by CPU/RAM and whatever density you’re comfortable with. This is how people use Kata in multi‑tenant clusters and for untrusted workloads. ([DEV Community][2])

Cloud Hypervisor itself is a lean rust‑based VMM, explicitly supported by Kata as a “modern, lean, fast and secure” hypervisor option. ([GitHub][3])

Managed offerings (like AKS pod sandboxing) also use Kata to give **VM‑based isolation with a separate kernel per pod**, which is essentially “lots of small VMs on demand” in a shared cluster. ([Microsoft Learn][4])

So **yes: spinning up many microVMs on demand with Kata+Cloud Hypervisor is a mainstream, supported use case.**

---

### 2. Mapping “VM per user” onto Kubernetes + Kata

Kubernetes doesn’t know about “users → VMs” directly, but you can model it like this:

1. **One pod per user (or per user session)**

   * Each pod uses `runtimeClassName: kata-clh` (or whatever name `kata-deploy` created). ([DeepWiki][5])
   * That pod = **one microVM** (Cloud Hypervisor) hosting that user’s workload.

   Example:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: user-123-vm
     namespace: user-123
   spec:
     runtimeClassName: kata-clh
     containers:
       - name: workspace
         image: your/user-workspace-image:latest
         resources:
           requests:
             cpu: "1"
             memory: "1Gi"
           limits:
             cpu: "1"
             memory: "1Gi"
   ```

2. **Use namespaces and RBAC to bind users to “their” VM(s)**

   * Each user gets their own namespace. ([Kubernetes][6])
   * RBAC only lets that user create/list pods in *their* namespace.
   * You can enforce or default `runtimeClassName: kata-clh` with an admission webhook so every pod they create is automatically a Kata microVM.

3. **If users need multiple VMs**

   * Just let them create multiple pods (or a StatefulSet/Deployment) in their namespace, all with the Kata RuntimeClass.

---

### 3. Can it scale to “lots” of users?

Functionally, yes:

* **No hard limit in Kata** on how many microVMs you can run – it’s bounded by:

  * Node RAM & CPU
  * How big each VM is (default vCPUs/memory in Kata config)
  * Your acceptable performance/oversubscription level
* Kata is explicitly used for **multi‑tenant and untrusted workloads** where you want many isolated sandboxes on the same cluster. ([DEV Community][2])

If you’re spawning *many* microVMs on demand (e.g. dev sandboxes, per‑user code exec, etc.), turn on Kata’s “speed‑up” features:

* **VM templating** – clones new VMs from a pre‑created template, sharing kernel/initramfs and agent memory read‑only; this significantly reduces startup time and memory consumption. ([GitHub][7])
* **VMCache** – keeps a pool of pre‑booted VMs that Kata can hand out when a new sandbox is requested. ([GitHub][8])

Both features are designed exactly for “create lots of VMs quickly and repeatedly”.

---

### 4. Things to watch for in a “VM per user” design

Just so you’re not surprised:

1. **Resource sizing per VM**

   * Tune Kata’s defaults for Cloud Hypervisor (vCPUs, RAM) so a single user VM isn’t too fat or too tiny for your workloads. ([GitHub][3])

2. **Underlying hardware / cloud**

   * Cloud Hypervisor + Kata needs KVM; if your nodes are themselves VMs, make sure nested virtualization is available/enabled.

3. **What “VM per user” means practically**

   * Kata gives users **containers running in their own kernel in a VM**, not a classical IaaS experience.
   * If you want users to SSH into “their OS” and manage packages, you can still do that (e.g., run an SSH server in the container), but the lifecycle is K8S‑style (pods, images, PVCs), not “cloud VM with an admin panel”.

---

### 5. TL;DR

* **Yes**, Kata + Cloud Hypervisor works well for **multiple microVMs on demand**.
* In practice you get **one VM per pod**, so “VM per user” = “pod per user (or per session)” with `runtimeClassName: kata-clh`.
* It’s used in exactly these kinds of multi‑tenant / untrusted scenarios, and you can scale to lots of users as long as you size your nodes and VM defaults appropriately, and optionally enable VM templating/VMCache to improve churn performance.

If you tell me roughly how many users/VMs per node you’re targeting and what your node size looks like (RAM/CPU), I can help sketch some concrete sizing + config knobs to tune.

[1]: https://github.com/kata-containers/documentation/blob/master/design/virtualization.md?utm_source=chatgpt.com "documentation/design/virtualization.md at master · kata-containers ..."
[2]: https://dev.to/kikifachry/kata-containers-lightweight-vms-for-containers-4ine?utm_source=chatgpt.com "Kata Containers: Lightweight VMs for Containers - DEV Community"
[3]: https://github.com/kata-containers/kata-containers/blob/main/docs/hypervisors.md?utm_source=chatgpt.com "kata-containers/docs/hypervisors.md at main - GitHub"
[4]: https://learn.microsoft.com/en-us/azure/aks/use-pod-sandboxing?utm_source=chatgpt.com "Pod Sandboxing with Azure Kubernetes Service (AKS)"
[5]: https://deepwiki.com/kata-containers/kata-containers/4.2-kubernetes-integration?utm_source=chatgpt.com "Kubernetes Integration | kata-containers/kata-containers | DeepWiki"
[6]: https://kubernetes.io/docs/concepts/security/multi-tenancy/?utm_source=chatgpt.com "Multi-tenancy - Kubernetes"
[7]: https://github.com/kata-containers/kata-containers/blob/main/docs/how-to/what-is-vm-templating-and-how-do-I-use-it.md?utm_source=chatgpt.com "kata-containers/docs/how-to/what-is-vm-templating-and-how-do-I-use-it ..."
[8]: https://github.com/kata-containers/documentation/blob/master/how-to/what-is-vm-cache-and-how-do-I-use-it.md?utm_source=chatgpt.com "documentation/how-to/what-is-vm-cache-and-how-do-I-use-it.md ... - GitHub"


=============


Short answer: **for your “VM-per-user in Kubernetes with Kata” use‑case, Cloud Hypervisor is *usually* a better fit than Firecracker.**

But “better” depends on what you care about, so here’s the trade‑off in plain terms.

---

## 1. For K8S + Kata + normal app workloads

**Cloud Hypervisor tends to win:**

* **Designed for general cloud workloads** – full Linux images, virtio‑everything, PCI hotplug, snapshots, VFIO, virtio‑fs, etc. ([Intel Kev Input Nam][1])
* **Firecracker is deliberately very minimal** – no PCI, very limited device model, no built‑in host↔guest file sharing, etc., to keep footprint/attack surface tiny. ([Firecracker][2])

Because of that minimalism, **Kata + Firecracker has (or historically had) real feature gaps**:

* Kata docs/issues explicitly track “Firecracker limitations”: no host→guest file sharing → **volumes, ConfigMaps and Secrets don’t work the usual way**, and CPU/memory resizing and some cgroup constraints are not supported. ([GitHub][3])

Those are exactly the kinds of things you usually need for “VM per user” in K8S (persistent volumes, secrets, etc.). With **Cloud Hypervisor + Kata**, you get the more complete virtio/PCI feature set, so those K8S features work in the normal way.

Given you’re already hitting **compatibility pain on “latest kernel + containerd + Kata + Firecracker”**, moving to Cloud Hypervisor is very likely to *reduce* friction rather than add to it.

---

## 2. Performance & density

For your scenario (microVM-per-user, not millions of Lambdas per second):

* **Both are lean Rust VMMs** that aim for low latency, low memory footprint, and a small attack surface. ([Intel Kev Input Nam][1])
* Firecracker was built for ultra‑high‑churn serverless (Lambda/Fargate). ([CSAIL][4])
* Cloud Hypervisor targets “modern cloud workloads” (longer‑lived VMs with richer device needs). ([Cloud Hypervisor][5])

In practice, for **“start a few to a few hundred user VMs per node”**, Cloud Hypervisor is plenty fast; you’re unlikely to notice a huge difference vs Firecracker, especially once you enable Kata optimizations like VM templating / VM cache.

---

## 3. Security

* Firecracker’s big selling point is a **super‑minimal device model to shrink the attack surface**. ([Firecracker][2])
* Cloud Hypervisor is also **security‑focused**, written in Rust, with seccomp, support for confidential computing (TDX/SGX), etc., and aims for a small attack surface too. ([Intel Kev Input Nam][1])

So from a “multi‑tenant cluster” perspective, both are strong; you’re still fundamentally relying on KVM + Kata’s VM‑per‑pod model either way.

---

## 4. So, what should *you* do?

Given:

* You want **“one microVM per user”** inside K8S,
* You already have **problems with Firecracker on the latest kernel/containerd**, and
* You almost certainly need **volumes / ConfigMaps / Secrets**,

I’d **absolutely try Cloud Hypervisor + Kata first**:

* Switch your Kata runtime to use the `cloud-hypervisor` hypervisor (often exposed as `kata-clh`).
* Expose that via a `RuntimeClass` in K8S.
* Treat each **pod with `runtimeClassName: kata-clh` as “one VM for that user”**.

Firecracker is still great tech, and if you ever build a *pure* serverless platform or go via `firecracker-containerd` directly, it might be the better hammer. But **for “VM per user on Kubernetes with Kata”, Cloud Hypervisor is generally the smoother and more feature‑complete option.**

If you tell me roughly what kernel/containerd versions you’re on and how many “user VMs per node” you’re aiming for, I can suggest some concrete Kata + Cloud Hypervisor tuning knobs (default vCPUs/RAM, VM templating, etc.).

[1]: https://intelkevinputnam.github.io/cloud-hypervisor-docs-HTML/README.html "Cloud Hypervisor — Cloud Hypervisor  documentation"
[2]: https://firecracker-microvm.github.io/?utm_source=chatgpt.com "GitHub Pages - Firecracker"
[3]: https://github.com/kata-containers/documentation/issues/351 "Documentation: Firecracker limitations · Issue #351 · kata-containers/documentation · GitHub"
[4]: https://css.csail.mit.edu/6.858/2024/readings/firecracker.pdf?utm_source=chatgpt.com "Firecracker: Lightweight Virtualization for Serverless Applications"
[5]: https://www.cloudhypervisor.org/?utm_source=chatgpt.com "Cloud Hypervisor - Run Cloud Virtual Machines Securely and Efficiently"
