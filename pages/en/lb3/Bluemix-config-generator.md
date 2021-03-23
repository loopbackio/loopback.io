---
title: "IBM Cloud configuration generator"
lang: en
layout: page
keywords: LoopBack
tags: [tools]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Bluemix-config-generator.html
summary:
---

### Synopsis

Add IBM Cloud deployment artifacts to a LoopBack application.

{% include note.html content="You must run this command from a LoopBack project directory.
" %}

```
$ lb bluemix [options]
```

The IBM Cloud artifacts consists of:

- `manifest.yml`, for configuring deployment to IBM Cloud.
- `.cfignore`, for configuring which files and directories not to upload to IBM Cloud when deploying an app.
- `Dockerfile`, for generating Docker container image of the app.
- `.dockerignore`, for configuring which files and directories not to include in the Docker image.
- `.bluemix`, a hidden directory for containing IBM Cloud-related files which should ideally not be manually tampered with.
- `.bluemix/datasources-config.json`, for configuring data sources set up on IBM Cloud.
- `.bluemix/deploy.json`, for defining custom form/fields in toolchain configuration.
- `.bluemix/pipeline.yml`, for describing stages of input/trigger/job.
- `.bluemix/toolchain.yml`, for descibing git repos, builds, and deployment for multiple pipelines.

### Options

`--docker`        
: Generate Dockerfile.  For more information on using Dockerfiles with IBM Cloud, see
[Adding Docker images to your organization's private IBM Cloud images registry](https://console.ng.bluemix.net/docs/containers/container_images_adding_ov.html)

`--manifest`      
: Generate IBM Cloud manifest file.  For more information on manifests, see [IBM Cloud docs - manifest](https://console.ng.bluemix.net/docs/manageapps/depapps.html#appmanifest).

`--toolchain`     
: Set up IBM Cloud toolchain. Creates a `.bluemix` directory containing the toolchain file.
For more information on IBM Cloud toolchains, see [Working with toolchains](https://console.ng.bluemix.net/docs/services/ContinuousDelivery/toolchains_working.html).

`--login`
: Log in to IBM Cloud by either specifying your email and password, or by providing a one-time password via single sign-on (SSO). Required only if you don't have the Cloud Foundry  [`cf`](https://docs.cloudfoundry.org/cf-cli/) command-line tool installed and authenticated.

`--sso`
: Log in to IBM Cloud with SSO. Required only if you don't have the Cloud Foundry  [`cf`](https://docs.cloudfoundry.org/cf-cli/) command-line tool installed and authenticated.

`--provision`
: Provision an IBM Cloud data service.

{% include_relative includes/CLI-std-options.md %}

### Arguments

None.

### Interactive Prompts

The generator will prompt you for:

- Amount of memory to allocate for the app, in MB (default is 256MB).
- Number of instances of app to run (default is one).
- Domain name of the app (default is `mybluemix.net`).
- Subdomain of the app (default is the app name).
- Amount of disk space to allocate for the app (default is 1GB).
- Whether to create a Dockerfile (default is yes).
- Whether to create toolchain files (default is yes). For more information, see [Working with toolchains](https://console.ng.bluemix.net/docs/services/ContinuousDelivery/toolchains_working.html).
- Whether to enable autoscaling (default is yes).  For more information, see [Bluemix autoscaling agent](https://www.npmjs.com/package/bluemix-autoscaling-agent).
- Whether to enable Node application metrics (default is yes). For more information, see [Node application metrics dashboard](https://www.npmjs.com/package/appmetrics-dash).

If you run the generator with the `--manifest` option, the tool presents only the first five prompts above.

If you run the generator with the `--docker` option, the tool creates Docker-related files without any prompts.

If you run the generator with the `--toolchain` option, the tool creates IBM Cloud toolchain files without any prompts.

If you run the generator with the `--provision` option, you will be prompted for a name and asked to select a plan for the service; none of the artifacts will be generated with this option.

### Output

Without any options, the tool will create a [manifest.yml](https://console.bluemix.net/docs/manageapps/depapps.html#appmanifest) file, if it doesn't exist already; if it does exist, it will update the configurations based on your responses to the prompts.

If you answered "Y" to the prompt about generating [Docker-related files](https://docs.docker.com/engine/reference/builder/), or ran the generator with the `--docker` option, the tool will create Docker files.

If you answered "Y" to the prompt about generating toolchain files, or ran the generator with the `--toolchain` option, the tool will create [IBM Cloud toolchain files](https://console.bluemix.net/docs/services/ContinuousDelivery/toolchains_working.html#toolchains_getting_started).

If you answered "Y" to the prompt about enabling autoscaling, the tool will add `[bluemix-autoscaling-agent](https://www.npmjs.com/package/bluemix-autoscaling-agent)` to `server.js`  add the dependency to the `package.json` file.

If you answered "Y" to the prompt about enabling appmetrics, the tool will add `[appmetrics-dash](https://www.npmjs.com/package/appmetrics-dash)` to `server.js` and add the dependency to `package.json`.

- `server/datasources.bluemix.js` - to discover and load data sources configured on IBM Cloud.
- `.bluemix/datasource-config.json` - configuration for data sources on IBM Cloud.
