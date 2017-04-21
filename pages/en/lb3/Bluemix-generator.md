---
title: "Bluemix generator"
lang: en
layout: page
keywords: LoopBack
tags: [bluemix, cloudfoundry, docker]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Bluemix-generator.html
summary:
---

{% include content/generator-create-app.html lang=page.lang %}

### Synopsis

Generate Bluemix artifacts in a LoopBack application directory.

```
lb bluemix [options]
```

With IBM API Connect developer toolkit:

```
apic create --type bluemix [options]
```

With legacy StrongLoop tools:

```
slc loopback:bluemix [options]
```

### Options

`--manifest`
Generate or re-generate the `manifest.yml` file.

`--docker`
Generate Docker related files.

`--toolchain`
Generate the Bluemix tool chain files.

### Interactive Prompts

If you run the generator without any options, the tool will prompt you for:

* Amount of memory to allocate for the app.
* Number of app instances to run.
* Domain name of the app.
* Subdomain name of the app.
* Disk space to allocate for the app.
* Whether you'd want to generate Docker related files.
* Whether you'd want to generate toolchain files.
* Whether you'd want to enable autoscaling.
* Whether you'd want to enable appmetrics.

If you run the generator with the `--manifest` option, only the first five prompts will be presented.

If you run the generator with the `--docker` option, Docker related files will be generated without any prompts.

If you run the generator with the `--toolchain` option, toolchain files will be generated without any prompts.

### Output

Running the generator without any options, will generate the [manifest.yml](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) file, if it doesn't exist already; if it exist, the configurations will be updated.

If you answered "Y" to the prompt about generating Docker related files, or ran the generator with the `--docker` option, Docker files will be generated.

If you answered "Y" to the prompt about generating toolchain files, or ran the generator with the `--toolchain` option, Docker files will be generated.

If you answered "Y" to the prompt about enabling autoscaling, the server file will be updated to include `bluemix-autoscaling-agent` and the `package.json` file updated to include it in the dependecies.

If you answered "Y" to the prompt about enabling appmetrics, the server file will be updated to include `appmetrics-dash` and the `package.json` file updated to include it in the dependecies.
