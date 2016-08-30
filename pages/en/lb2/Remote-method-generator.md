---
title: "Remote method generator"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Remote-method-generator.html
summary:
---

{% include important.html content="
Before running this generator, you must create an application using the [Application generator](Application-generator.html).

Then you must run the command from the root directory of the application."
%}

### SYNOPSIS

Adds a new remote method to an existing application.

```shell
[slc | apic] loopback:remote-method [options] [<modelName>] [<methodName>]
```

### OPTIONS

`-h, --help`  
Print the generator's options and usage.

`--skip-cache`  
Do not remember prompt answers. Default is false.

`--skip-install`  
Do not automatically install dependencies. Default is false.

### ARGUMENTS

All arguments are optional.

<table>
  <tbody>
    <tr>
      <th>Argument</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
    <tr>
      <td>modelName</td>
      <td>Name of the model</td>
      <td>String</td>
    </tr>
    <tr>
      <td>methodName</td>
      <td>Name of the remote method</td>
      <td>String</td>
    </tr>
  </tbody>
</table>

### INTERACTIVE PROMPTS

The tool will prompt you for:

*   Name of the model to which to add the remote method.
*   Name of the remote method.
*   Whether the method is static (or an instance method).
*   Description of the method.
*   One or more HTTP endpoints, with corresponding accept and return arguments and their types.
