---
title: "Bluemix configuration generator"
lang: en
layout: page
keywords: LoopBack
tags: [tools]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Bluemix-config-generator.html
summary:
---

### Synopsis

Add Bluemix deployment artifacts to a LoopBack application.

{% include note.html content="You must run this command from a LoopBack project directory.
" %}

```
$ lb bluemix [options]
```

### Options

`--docker`        
: Generate Dockerfile.  For more information on using Dockerfiles with Bluemix, see
[Adding Docker images to your organization's private Bluemix images registry](https://console.ng.bluemix.net/docs/containers/container_images_adding_ov.html)

`--manifest`      
: Generate Bluemix manifest file.  For more information on manifests, see [Bluemix docs - manifest](https://console.ng.bluemix.net/docs/manageapps/depapps.html#appmanifest).

`--toolchain`     
: Set up Bluemix toolchain. Creates a `.bluemix` directory containing the toolchain file.
For more information on Bluemix toolchains, see [Working with toolchains](https://console.ng.bluemix.net/docs/services/ContinuousDelivery/toolchains_working.html).

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

If you run the generator with the `--manifest` option, only the first five prompts will be presented.

If you run the generator with the `--docker` option, Docker related files will be generated without any prompts.

If you run the generator with the `--toolchain` option, toolchain files will be generated without any prompts.

### Output

Running the generator without any options, will generate the [manifest.yml](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) file, if it doesn't exist already; if it exist, the configurations will be updated.

If you answered "Y" to the prompt about generating Docker related files, or ran the generator with the `--docker` option, Docker files will be generated.

If you answered "Y" to the prompt about generating toolchain files, or ran the generator with the `--toolchain` option, Docker files will be generated.

If you answered "Y" to the prompt about enabling autoscaling, the server file will be updated to include `bluemix-autoscaling-agent` and the `package.json` file updated to include it in the dependecies.

If you answered "Y" to the prompt about enabling appmetrics, the server file will be updated to include `appmetrics-dash` and the `package.json` file updated to include it in the dependecies.
