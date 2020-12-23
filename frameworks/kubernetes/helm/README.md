# Helm

## [Alibaba Cloud](https://www.alibabacloud.com/blog/helm-charts-and-template-basics---part-2_595490)

Get rif of the first 'useless' lines:

```sh
helm install .\myhelm1\  --name test5 --dry-run --debug | grep -vE 'debug]|NAME|REVIS|RELEA|ART:|OKS:|FEST:'
```

## Other Resources

- https://www.giantswarm.io/blog/application-configuration-management-with-kustomize
  - Looks like we can use `helm template` to render locally:
    - https://helm.sh/docs/helm/helm_template/
- https://jfrog.com/blog/power-up-helm-charts-using-kustomize-to-manage-kubernetes-deployments/
- https://github.com/mgoltzsche/khelm
- https://github.com/thomastaylor312/advanced-helm-demos/tree/master/post-render

## Quickstart

- https://helm.sh/docs/intro/quickstart/

  ```sh
  brew install helm
  helm repo add "stable" "https://charts.helm.sh/stable" --force-update
  ```

- Helm charts: https://charts.helm.sh/stable/

  - List charts that can be installed:

    ```sh
    helm search repo stable
    ```

- Install a chart:

```sh
# Get latest charts:
helm repo update

# Release stable/mysql chart
helm install stable/mysql --generate-name

# Show simple features
helm show chart stable/mysql

# Show all information
helm show all stable/mysql

# See what's been installed with helm
helm ls

# Uninstall a release (remove from k8s, with its resources and release history)
helm uninstall smiling-penguin
# Can use --keep-history to preserve history

# Audit a cluster's history or undelete a release
helm rollback

# See available helm commands
helm get -h
```

## Using Helm

- https://helm.sh/docs/intro/using_helm/
- Chart
  - Hellm package.
- Repository
  - Place for sharing charts.
- Release
  - Instance of a chart running in a k8s cluster.
  - A new release is created with each installation.
- "Helm installs charts into Kubernetes, creating a new release for each installation. And to find new charts, you can search Helm chart repositories."

## Templates

### [Getting started](https://helm.sh/docs/chart_template_guide/getting_started/)

- Helm chart structure:

  ```txt
  mychart/
    Chart.yaml
    values.yaml
    charts/
    templates/
    ...
  ```

- `/templates`
  - Directory for template files.
  - All files in directory get sent through the template rendering engine.
- `values.yaml`
  - Contains default values for a chart.
    - May be overridden during `helm install` or `helm upgrade`.
- `Chart.yaml`
  - Contains a description of the chart.
  - May contain other charts (subcharts).

#### A Starter Chart

- Create a simple `mychart` chart and we'll add some templates.

  ```sh
  helm create mychart
  # Creating mychart
  ```

- Created files in `mychart/templates`:
  - `NOTES.txt`
    - Help text for chart.
    - Displayed for users when they run `helm install`
  - `deployment.yaml`
    - Basic k8s deployment manifest.
  - `service.yaml`
    - Basic k8s service endpoint manifest.
  - `_helpers.tpl`
    - Place to put template helpers (can be reused throughout chart).
- Delete it; then we'll create from scratch.

  ```sh
  rm -rf mychart/templates/*
  ```

#### A First Template

- A ConfigMap
- Create (bare-bones) `mychart/templates/configmap.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mychart-configmap
data:
  myvalue: 'Hello World'
```

- Recommended file extensions:
  - `.yaml`
  - `.tpl`
    - Helpers
- This file will get sent as-is to k8s.
- To install the chart above:

  ```sh
  helm install full-coral ./mychart
  # NAME: full-coral
  # LAST DEPLOYED: Tue Dec 22 12:58:25 2020
  # NAMESPACE: default
  # STATUS: deployed
  # REVISION: 1
  # TEST SUITE: None
  ```

- Retrieve release and see the template that was loaded:

  ```sh
  helm get manifest full-coral
  # ---
  # # Source: mychart/templates/configmap.yaml
  # apiVersion: v1
  # kind: ConfigMap
  # metadata:
  #   name: mychart-configmap
  # data:
  #   myvalue: 'Hello World'
  ```

- Uninstall release:

  ```sh
  helm uninstall full-coral
  ```

#### Adding a Simple Template Call

- Best practice: Don't hard-code `name:`.
  - Names should be unique to a release.
  - `name:` is limited to 63 characters (due to the DNS system).
    - Release names are limited to 53 characters.
- New `mychart/templates/configmap.yaml`:

  ```yaml
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: {{ .Release.Name }}-configmap
  data:
    myvalue: "Hello World"
  ```

- `{{` and `}}` enclose a template directive.

  - `{{ .Release.Name }}` injects the release name into the template.
  - Think of values as namespaced objects separated by `.`s.
    - Leading dot: Indicates that we start with the top-most namespace for this scope.
  - `Release`: A built-in Helm object.
    - Displays the release name that the library assigns to our release.

- Install resource:

  ```sh
  helm install clunky-serval ./mychart
  ```

- Test a template render without installing:

```sh
helm install --debug --dry-run goodly-guppy ./mychart
```

- Note that the `--dry-run` flag doesn't ensure the chart will install.

### [Built-in Objects](https://helm.sh/docs/chart_template_guide/builtin_objects/)

- Built-in objects begin with a capital letter (aligning with Go's naming conventions).
  - One convention: Use lower initial letters to distinguish from built-ins.
- Object examples
  - `Release`
    - `Release.Name`
      - Release name
    - `Release.Namespace`
      - Namespace to be released into.
      - Can be overridden by manifest.
    - `Release.IsUpgrade`
      - `true` if the current operation is an upgrade or rollback.
    - `Release.IsInstall`
      - `true` if the current operation is an install.
    - `Release.Revision`
      - Revision number for this release.
      - `1` for an install; incremented with each upgrade and rollback.
    - `Release.Service`
      - Always `Helm` when using Helm.
  - `Values`
    - Passed into the template via `values.yaml` and user-supplied files.
    - Empty be default.
  - `Chart`
    - Contents of `Chart.yaml`.
    - See https://helm.sh/docs/topics/charts/#the-chartyaml-file
  - `Files`
    - Provides access to all non-special files in the chart.
      - Cannot use to access templates.
    - See https://helm.sh/docs/chart_template_guide/accessing_files/
    - `Files.Get`
      - Function for getting a file by name.
        - Example: `.Files.Get config.ini`
    - `Files.GetBytes`
      - Function for getting contents of a file as an array of bytes (instead of a string).
      - Useful for images.
    - `Files.Glob`
      - Function that returns a list of files matching the glob pattern.
    - `Files.Lines`
      - Function that reads a file line-by-line.
      - Useful for iterating over each line of a file.
    - `Files.AsSecrets`
      - Function that returns the file bodies as Base64-encoded strings.
    - `Files.AsConfig`
      - Function that returns file bodies as a YAML map.
  - `Capabilities`
    - Provides information about the capabilities the k8s cluster supports.
    - `Capabilities.APIVersions`
      - Set of versions
    - `Capabilities.APIVersions.Has $version`
      - Indicates whether a version or resource is available on the cluster.
    - `Capabilities.KubeVersion`
      - K8s version.
      - `Capabilities.KubeVersion.Major`
      - `Capabilities.KubeVersion.Minor`
  - `Template`
    - Contains information about the current template that is being executed.
    - `Template.Name`
      - Namespaced file path to the current template.
    - `Template.BasePath`
      - Namespaced path to the templates directory of the current chart.

### [Values Files](https://helm.sh/docs/chart_template_guide/values_files/)

- `Values` contents come from the following (in order of specificity):
  - `values.yaml` file in the chart.
    - Default
  - If this is a subchart:
    - `values.yaml` file of the parent chart.
  - Values file if passed into `helm install` or `helm upgrade` with -f flag
    - Example: `helm install -f myvals.yaml ./mychart`
  - Individual parameters passed with `--set`
    - Example: `helm install --set foo=bar`
- Set [mychart/values.yaml](mychart/values.yaml) to the following:

  ```yaml
  favoriteDrink: coffee
  ```

- And then add a reference to it in [mychart/templates/configmap.yaml](mychart/templates/configmap.yaml)

  ```yaml
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: {{ .Release.Name }}-configmap
  data:
    myvalue: "Hello World"
    drink: {{ .Values.favoriteDrink }}
  ```

- See how it would render:

  ```sh
  helm install geared-marsupi ./mychart --dry-run --debug
  # install.go:172: [debug] Original chart version: ""
  # install.go:189: [debug] CHART PATH: /Users/ehelande/OneDrive - UHG/notes/healthcare-api-platform/api-data-loader-deployment/helm/mychart

  # NAME: geared-marsuip
  # LAST DEPLOYED: Tue Dec 22 16:01:26 2020
  # NAMESPACE: default
  # STATUS: pending-install
  # REVISION: 1
  # TEST SUITE: None
  # USER-SUPPLIED VALUES:
  # {}

  # COMPUTED VALUES:
  # favoriteDrink: coffee

  # HOOKS:
  # MANIFEST:
  # ---
  # apiVersion: v1
  # kind: ConfigMap
  # metadata:
  #   name: geared-marsuip-configmap
  # data:
  #   myvalue: "Hello World"
  #   drink: coffee
  ```

- We can override it with `--set`:

  ```sh
  helm install solid-vulture ./mychart --dry-run --debug --set favoriteDrink=slurm
  # install.go:172: [debug] Original chart version: ""
  # install.go:189: [debug] CHART PATH: /Users/ehelande/OneDrive - UHG/notes/healthcare-api-platform/api-data-loader-deployment/helm/mychart

  # NAME: solid-vulture
  # LAST DEPLOYED: Wed Dec 23 16:39:02 2020
  # NAMESPACE: default
  # STATUS: pending-install
  # REVISION: 1
  # TEST SUITE: None
  # USER-SUPPLIED VALUES:
  # favoriteDrink: slurm

  # COMPUTED VALUES:
  # favoriteDrink: slurm

  # HOOKS:
  # MANIFEST:
  # ---
  # # Source: mychart/templates/configmap.yaml
  # # apiVersion: v1
  # # kind: ConfigMap
  # # metadata:
  # #   name: mychart-configmap
  # # data:
  # #   myvalue: 'Hello World'

  # apiVersion: v1
  # kind: ConfigMap
  # metadata:
  #   name: solid-vulture-configmap
  # data:
  #   myvalue: "Hello World"
  #   drink: slurm
  ```

- Values files can contain more structured content.

  - Example:

    ```yaml
    favorite:
      drink: coffee
      food: pizza
    ```

    ```sh
    helm install solid-vulture ./mychart --dry-run --debug
    # install.go:172: [debug] Original chart version: ""
    # install.go:189: [debug] CHART PATH: /Users/ehelande/OneDrive - UHG/notes/healthcare-api-platform/api-data-loader-deployment/helm/mychart

    # NAME: solid-vulture
    # LAST DEPLOYED: Wed Dec 23 16:41:20 2020
    # NAMESPACE: default
    # STATUS: pending-install
    # REVISION: 1
    # TEST SUITE: None
    # USER-SUPPLIED VALUES:
    # {}

    # COMPUTED VALUES:
    # favorite:
    #   drink: coffee
    #   food: pizza

    # HOOKS:
    # MANIFEST:
    # ---
    # # Source: mychart/templates/configmap.yaml
    # apiVersion: v1
    # kind: ConfigMap
    # metadata:
    #   name: solid-vulture-configmap
    # data:
    #   myvalue: "Hello World"
    #   drink: coffee
    #   drink: pizza
    ```

  - Recommendation: Keep trees shallow.

#### Deleting a default key

- To delete a key from the default values, override the value with `null`.

### [Template Functions and Pipelines](https://helm.sh/docs/chart_template_guide/functions_and_pipelines/)
