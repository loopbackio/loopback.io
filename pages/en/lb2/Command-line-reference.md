---
title: "Command-line reference"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Command-line-reference.html
summary:
---

## Overview

Use the `apic loopback` command to create and _scaffold_ applications.
Scaffolding simply means generating the basic code for your application.
You can then extend and modify the code as desired for your specific needs.

The `apic loopback` command is an [application generator](/doc/en/lb2/Application-generator.html) that creates a new LoopBack application. 
There are a number of additional generators to scaffold an application, as described in the following table.
The commands are listed roughly in the order that you would use them.

## Command summary


| Command                         | See                                                                   | Description |
|---------------------------------|-----------------------------------------------------------------------|-------------|
| `apic loopback`                 | [Application generator](/doc/en/lb2/Application-generator.html)       | Create a new LoopBack application.                                                                                                          |
| `apic create --type datasource` | [Data source generator](/doc/en/lb2/Data-source-generator.html)       | Add a new data source to a LoopBack application                                                                                             |
| `apic create --type model`      | [Model generator](/doc/en/lb2/Model-generator.html)                   | Add a new model to a LoopBack application.                                                                                                  |
| `apic loopback:property`        | [Property generator](/doc/en/lb2/Property-generator.html)             | Add a new property to an existing model.                                                                                                    |
| `apic loopback:acl`             | [ACL generator](/doc/en/lb2/ACL-generator.html)                       | Add a new access control list (ACL) entry to the LoopBack application.                                                                      |
| `apic loopback:relation`        | [Relation generator](/doc/en/lb2/Relation-generator.html)             | Add a new model relationship.                                                                                                               |
| `apic loopback:remote-method`   | [Remote method generator](/doc/en/lb2/Remote-method-generator.html)   | Add a new [remote method.](/doc/en/lb2/Remote-methods.html)                                                                                 |
| `apic loopback:middleware`      | [Middleware generator](/doc/en/lb2/Middleware-generator.html)         | Add a new [middleware](/doc/en/lb2/Defining-middleware.html) configuration.                                                                 |
| `apic loopback:boot-script`     | [Boot script generator](/doc/en/lb2/Boot-script-generator.html)       | Add a new [boot scripts](/doc/en/lb2/Defining-boot-scripts.html).                                                                           |
| `apic loopback:export-api-def`  | [API definition generator](/doc/en/lb2/API-definition-generator.html) | Export OpenAPI (Swagger) API definition.                                                                                                    |
| `apic loopback:swagger`         | [Swagger generator](/doc/en/lb2/Swagger-generator.html)               | Generates a fully-functional application that provides the APIs conforming to the OpenAPI [Swagger](http://swagger.io/) 2.0 specification.  |
| `apic loopback:refresh`         |                                                                       | Generate a product and an OpenAPI (Swagger) definition                                                                                      |


## Correspondence between StrongLoop commands to API Connect commands

Every StrongLoop `slc loopback` command has a corresponding API Connect `apic` command.
The following table provides the `apic` command corresponding to each `slc loopback` command. 

| StrongLoop&nbsp;Command       | API Connect Command             |
|-------------------------------|---------------------------------|
| `slc loopback`                | `apic loopback`                 |
| `slc loopback:datasource`     | `apic create --type datasource` |
| `slc loopback:model`          | `apic create --type model`      |
| `slc loopback:property`       | `apic loopback:property`        |
| `slc loopback:acl`            | `apic loopback:acl`             |
| `slc loopback:relation`       | `apic loopback:relation`        |
| `slc loopback:remote-method`  | `apic loopback:remote-method`   |
| `slc loopback:middleware`     | `apic loopback:middleware`      |
| `slc loopback:boot-script`    | `apic loopback:boot-script`     |
| `slc loopback:export-api-def` | `apic loopback:export-api-def`  |
| `slc loopback:swagger`        | `apic loopback:swagger`         |
