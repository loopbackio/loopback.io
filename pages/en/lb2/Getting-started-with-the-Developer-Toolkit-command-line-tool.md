---
title: "Getting started with the Developer Toolkit command-line tool"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Getting-started-with-the-Developer-Toolkit-command-line-tool.html
summary:
---

## Introduction

The _API Connect Developer Toolkit_ provides a command-line tool, `apic`, for creating and testing APIs that you can then run, manage, and secure with API Connect.
You can also use the `apic` command-line tool to script devops tasks such as continuous integration and delivery.

To use the `apic` CLI:

1.  Get a [Bluemix IBM id](https://bluemix.net/).
2.  Provision [API Connect in Bluemix (free)](https://new-console.ng.bluemix.net/catalog/services/api-connect).
3.  Install the [API Connect Developer Toolkit](https://www.npmjs.com/package/apiconnect).

Once installed, type `apic -h` to view help (after accepting the licensing agreement).

The tool provides subcommands for the following activities.

Creating and validating artifacts:

* `apic config` - manage configuration variables
* `apic create` - create development artifacts
* `apic edit` - run the API Designer
* apic validate - validate development artifacts

Creating and testing applications:

* apic loopback - create and manage LoopBack applications
* apic microgateway - create Micro Gateway applications
* apic start - start services
* apic stop - stop services
* apic logs - display service logs
* apic props - service propertiesservices service management

Publishing to the cloud:

* apic login - log in to an IBM API Connect cloud
* apic logout - log out of an IBM API Connect cloud
* apic organizations - manage organizations
* apic catalogs - manage catalogs in an organization
* apic publish - publish products and APIs to a catalog
* apic products - manage products in a catalog
* apic apps - manage provider applications
* apic drafts - manage APIs and products in drafts

All the commands use a `_command_:_action_` syntax (for example, `apic apps:publish`).
For the most popular commands, either the command or action portion is optional. For example:

* apic auth:login -> apic login
* apic local:create -> apic create
* apic products:publish -> apic publish
* apic products:list -> apic products

All of the commands have a `-h/--help` option that provides the command help and useful examples.
Some of the subcommands are annotated with "Stability: prototype", which indicates we are in the process of collecting customer feedback on the
command and it will likely evolve before it's certified for production.

### Using API Designer

API Designer is the graphical tool that supports most of the capabilities of the command-line tool. To run the API Designer, enter this command:

`apic edit`

## Creating APIs and applications

### APIs and applications

The developer toolkit supports development of API proxies and API implementations.
In this article we'll use the term _API_ to refer to the API proxy and the term _application_ to refer to the API implementation.
The developer toolkit provides a first-class integrated development environment for developing APIs and applications using the 
[LoopBack framework](https://docs.strongloop.com/display/APIC/Using+LoopBack+with+IBM+API+Connect).

To create a LoopBack application project, use the command:

`apic loopback`

LoopBack is an excellent choice for an interaction-tier framework for APIs and micro-services.
However, you can also use the developer toolkit to create language-independent APIs using 
[OpenAPI (Swagger)](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) to proxy to an existing backend implementation or to
augment applications developed in other languages/frameworks such as [Express](http://expressjs.com/), Java, 
[Swift](https://developer.ibm.com/swift/2016/02/26/video-replay-ibm-announces-new-swift-offerings-tools/), Go, and others.

When using LoopBack projects, the toolkit supports publishing the API to an
[API Connect Catalog](https://www.ibm.com/support/knowledgecenter/SSMNED_5.0.0/com.ibm.apic.apionprem.doc/conref_working_with_env.html)
that supports socialization via the developer portal and policy enforcement via the gateway, and the application to an
API Connect App which provides Node.js runtime capability.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>The following sentence is confusing. Need to clarify.</div>

Developers who want to proxy to existing backend services or who are developing their applications using other languages or frameworks use 
OpenAPI projects that support publishing the OpenAPI (Swagger) definitions to API Connect Catalogs.

### Creating development artifact definitions

Use the `apic create` command to create development artifacts, specifically with the following commands:

* Create OpenAPI (Swagger) definition:` apic create --type api `
* Create API product definition: `apic create --type product `
* Create LoopBack model and add existing LoopBack project: `apic create --type model` (Use in a LoopBack application project.) 
* Create LoopBack data source and add existing LoopBack project: `apic create --type datasource` (Use in a LoopBack application project.)

You can also create Product and API definitions non-interactively by providing the `--title` option
(several values get defaulted from the title that can be customized with additional options).

For example:

```
apic create --type api --title Routes
apic create --type product --title "Climb On"
```

You can also create the API and product definitions at the same time:

`apic create --type api --title Routes --product "Climb On"`

Alternatively, you can create a couple APIs and then reference them when you create a new product; for example:

```
apic create --type api --title Routes
apic create --type api --title Ascents
apic create --type product --title "Climb On" --apis "routes.yaml ascents.yaml"
```

### Validating development artifact definitions

Once you edit the development artifacts or right before you publish the artifacts it's valuable to validate them:

```
apic validate routes.yaml                      # Validate an API
apic validate climb-on.yaml                    # Validate the product and APIs created above
apic validate climb-on.yaml --product-only     # Validate the product only (do not validate the referenced APIs)
```

### Developing LoopBack applications

Once you've created a LoopBack application using `apic loopback`, you can add additional functionality to the application with the following commands:

* `apic loopback:boot-script` : Create a new [boot scripts](https://docs.strongloop.com/display/public/APIC/Defining+boot+scripts).
* `apic loopback:acl` : Define an [access control list](https://docs.strongloop.com/display/public/APIC/Controlling+data+access) for accessing LoopBack models.
* `apic loopback:middleware` : Define and register [Express middleware](https://docs.strongloop.com/display/public/APIC/Defining+middleware) to define the phase of execution.
* `apic loopback:property` : Add [additional properties](https://docs.strongloop.com/display/public/APIC/Customizing+models) to a Loopback model.
* `apic loopback:remote-method` : Add [remote methods](https://docs.strongloop.com/display/APIC/Using+LoopBack+with+IBM+API+Connect) to a LoopBack model.
* `apic loopback:relation` : Add [relationships](https://docs.strongloop.com/display/APIC/Creating+model+relations) between LoopBack models.
* `apic loopback:export-api-def` : Export an OpenAPI (Swagger) definition from LoopBack models.
* `apic loopback:export-api-def` : Export an OpenAPI (Swagger) and a product definition from LoopBack models.
* `apic loopback:swagger` : Generate a LoopBack application from an OpenAPI (Swagger) definition.

 Run these commands the application's project root directory.

Note: These commands are annotated with "Stability: prototype" because we are looking for feedback on them before we certify them for production.

## Testing APIs and applications

Use the following commands to create a LoopBack application project, start the Micro Gateway and the Node.js server running the LoopBack application,
and test the API and application using the endpoint exposed by the Micro Gateway:

```
apic loopback # climbon project name/directory
cd climbon
# update API and/or application development artifacts
apic start
# test the API/application
# update API and/or application development artifacts
# restart the services (result is they run off the latest artifact definitions)
apic start
# test the API/application
apic stop
```

Use the `services` command to manage running processes for testing APIs and applications. 

By default, the actions for the `services` command work on the project or directory relative to where the command was executed
enabling services for multiple projects to be managed concurrently and independently.

Here's a sampling of some useful actions for the services command:

```
apic services     # list the local running services (alias for services:list)
apic start        # start the local services (alias for services:start)
apic stop         # stop the local services (alias for services:stop)
apic stop --all   # stop all services across all projects
```

While running services and testing APIs and applications it's typically useful to tail the Micro Gateway and Node.JS LoopBack
logs using the `apic logs` command. Here's a couple examples:

```
apic logs                         # view the logs for the default service (alias for services:logs)
apic logs --service SERVICE_NAME  # use apic services to list the service names
```

The props command provides a mechanism for managing service properties. Here's a summary of how the props command can be used:

```
apic props                         # List properties for the default service (alias for props:list)
apic props --service SERVICE_NAME  # List properties for the SERVICE_NAME service
apic props:set NAME=VALUE          # Set a property on the default service
apic props:get NAME                # Get the property for the default service
apic props:delete NAME             # Delete the property for the default service
apic props:clear                   # Clear all the properties on the default service
```

## Publishing APIs and applications

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Need intro material here.</div>

### Setting configuration variables

The `apic config` command provides global and project-based configuration variables.
Use these configuration variables to provide the target catalog and app for publishing APIs and applications.
Global configuration is stored in `~/.apiconnect/config` and project/directory level configuration is stored in `PROJECT_DIR/.apiconnect`.

#### Catalog configuration variable

Set the catalog configuration variable to the URI of an API Connect catalog to define a default catalog target for all commands managing catalogs.
The catalog URI has the form:

`apic-catalog://MANAGEMENT_SERVER/orgs/ORGANIZATION_NAME/catalogs/CATALOG_NAME`

You can override the values set by the catalog's URI by using the `--server`, `--organization`, and `--catalog` command-line options. 

#### App configuration variable

Set the app configuration variable to the URI of API Connect app to define the default app target for all commands managing apps.
The app URI has the form:

`apic-app://MANAGEMENT_SERVER/orgs/ORGANIZATION_NAME/apps/APP_NAME`

You can override the values set by the app's URI by using the `--server`, `--organization`, and `--app` command line options. 

The easiest way to determine the values for these configuration variables is to sign in to the API Manager application of your provisioned 
[Bluemix API Connect service](https://new-console.ng.bluemix.net/catalog/services/api-connect) or your on-premises cloud,
and click on the link icon of the catalog or app to which you want to publish your API or application.
The dialog that appears will provide you with the identifier of the catalog or app along with the appropriate `config:set` command.

Although setting these configuration variables is not absolutely required, they simplify all the command actions that interact
with API Connect clouds by providing default values for the `--server`, `--organization`, `--catalog`, and `--app` options.

Here is an example of using `apic publish` with and without the catalog configuration variable begin set:

```
# Without
apic publish climb-on.yaml --server mgmnthost.com --organization climbon --catalog sb

# With
apic config:set catalog=apic-catalog://mgmnthost.com/orgs/climbon/catalogs/sb
apic publish climb-on.yaml
```

A portion of the default values provided by the catalog configuration variable can also be overridden by explicitly providing one of the standard options with a different value.
For example, the `apic publish` command can override the catalog portion of the default to target the Quality Assurance catalog by using the --catalog option:

`apic publish climb-on.yaml --catalog qa`

Don't forget about global configuration variables. If you use the same catalog as the default target for multiple projects set the value globally:

`apic config:set --global catalog=apic-catalog://mgmnthost.com/orgs/climbon/catalogs/sb`

### Logging in to cloud platforms

Use the `apic login` and `apic logout` commands to manage your authentication credentials for IBM API Connect clouds.
Unlike many systems, API Connect enables you to be simultaneously logged in to multiple clouds, enabling you to easily publish and manage APIs and Applications to disparate on premises and Bluemix targets.

Login supports both interactive and non-interactive modes. To login interactively:

```shell
$ apic login
Enter your API Connect credentials
? Server: us.apiconnect.ibmcloud.com
? Username: claussen@us.ibm.com
? Password (typing will be hidden) ****************
Logged into us.apiconnect.ibmcloud.com successfully
```

You can perform scripted non-interactive login by using the `--server`, `--username`, and `--password` options.

### Publishing APIs

Publishing APIs to API catalogs in API Connect clouds enables those APIs to be socialized via developer portals and secured by gateways.

An _API product_ (or simply _product_) is used to compose APIs for publishing.
The product enables API product managers to bundle one or more APIs together, control the visibility of that product in the developer portal
(for example, only allow partners x, y, and z to view and subscribe to the product), and defines one or more plans to provide application developers a set of consumption options.
The products that reference the APIs and define the consumption plans are also the primary unit of lifecycle management for APIs.

The `apic publish` (alias for `apic products:publish`) command is used to publish API products to an API Connect cloud.
The example below demonstrates creation of a couple APIs composed by a product and how to publish that product and its APIs to a catalog:

```
apic create --type api --title Routes
apic create --type api --title Ascents
apic create --type product --title "Climb On" --apis "routes.yaml ascents.yaml"
apic config:set catalog=apic-catalog://mgmnthost.com/orgs/climbon/catalogs/sb
apic login --username some-user --password some-password --server mgmnthost.com
apic publish climb-on.yaml
```

Add the `--stage` option to `apic publish` to stage the product into a catalog instead of publishing it
(products have the states of staged, published, deprecated, retired, or archived in the catalog).

For example:

`apic publish --stage climb-on.yaml`

### Publishing LoopBack APIs and applications

LoopBack application projects contain both APIs and applications. Use the `apic publish` command described above to publish the LoopBack APIs.
Use the `apic apps:publish` command to publish the LoopBack application.

By default, a LoopBack application project has default API and product definitions in the `<_project_dir_>/definitions` directory.
Publishing the API and product artifacts is the same as any other set of API and product artifacts with the notable difference that these artifacts
can be generated directly from the application's LoopBack models.
Here's a sample CLI narrative for developing and publishing LoopBack APIs to illustrate that scenario:

```
apic loopback # climbon project name/directory
cd climbon
apic create --type model           # as many times as required
apic loopback:property             # as many times as required
apic loopback:remote               # as many times as required
apic loopback:relation             # as many times as required
apic loopback:refresh              # (re)generate the product and API artifacts
apic config:set catalog=apic-catalog://mgmnthost.com/orgs/climbon/catalogs/sb
apic login --username some-user --password some-password --server mgmnthost.com
apic publish definitions/climbon-product.yaml
```

In addition to the LoopBack APIs, the LoopBack application itself must also be published to an API Connect app which represents a Node.JS runtime.
Adding the following two commands to the above set will result in publishing the LoopBack application
(Note: apps:publish must be run from within the LoopBack application project directory structure):

```
apic config:set app=apic-app://mgmnthost.com/orgs/climbon/apps/sb-app
apic apps:publish
```

If the LoopBack application is being published to Bluemix, the API Connect app can optionally be created in the organization on the fly as a side effect of `apps:publish`.
In that case, the app configuration variable does not have to be set and the --app option on `apps:publish` is not required.

## Managing API products

The `apic products` and `apic apis` command sets can be used to manage products and APIs that have been published to API Connect catalogs.
Here's a sample for how the `products` and `apis` commands can be used for a cradle-to-grave lifecycle example:

```
apic config:set catalog=apic-catalog://mgmnthost.com/orgs/climbon/catalogs/sb    # set the default catalog
apic login --username some-user --password some-password --server mgmnthost.com  # login into the mgmnthost.com cloud
apic create --type api --title Routes --product "ClimbOn"                        # create the product and API
apic publish --stage climbon.yaml                                                # publish the product to staged status
apic products                                                                    # list the products in the catalog
apic products:get climbon                                                        # get the product's properties
apic apis                                                                        # list the APIs in the catalog
apic apis:get routes                                                             # get the API's properties
apic products:set climbon --status published                                     # publish the product (onlines the API)
apic apis:set routes --status offline                                            # take the API offline
apic apis:set routes --status online                                             # bring the API online
apic products:set climbon --status deprecated                                    # deprecate the product
apic products:set climbon --status retired                                       # retire the product
apic products:set climbon --status archived                                      # archive the product
apic products:delete climbon                                                     # delete the product from the catalog
```

Here's an example of a more complex lifecycle management scenario where a new version of a product and API hot replaces the original version:

```
# Set the default catalog and login to the mgmnthost.com API Connect cloud
apic config:set catalog=apic-catalog://mgmnthost.com/orgs/climbon/catalogs/sb
apic login --username some-user --password some-password --server mgmnthost.com

# Create and publish an initial version
apic create --type api --title Routes --version 1.0.0 --filename routes100.yaml
apic create --type product --title "Climb On" --version 1.0.0 --apis routes100.yaml --filename climbon100.yaml
apic publish climbon100.yaml

# Create a new version to fix a bug in the API, stage it to the catalog
apic create --type api --title Routes --version 1.0.1 --filename routes101.yaml
apic create --type product --title "Climb On" --version 1.0.1 --apis routes101.yaml --filename climbon101.yaml
apic publish --stage climbon101.yaml

# Inspect the catalog
apic products
apic products:get climbon:1.0.0
apic products:get climbon:1.0.1

# Hot replace version 1.0.0 with 1.0.1
apic products:replace climbon:1.0.0 climbon:1.0.1 --plans default:default
```

In addition to the lifecycle management capabilities, products and apis in catalogs can be downloaded via the `pull` and`clone` actions:

```
apic products:clone               # download all products and their APIs from the catalog
apic products:pull climbon:1.0.0  # download the climbon:1.0.0 product and its APIs from the catalog
apic apis:clone                   # dwonload all APIs from the catalog
apic apis:pull routes:1.0.0       # download the routes:1.0.0 API from the catalog
```

It's also sometimes useful to clear all products and their APIs from a catalog particularly for sandbox typed catalogs
(this action requires the name of the catalog as a confirmation parameter):

`apic products:clear --confirm CATALOG_NAME`

## Drafts

Co-locate your APIs and applications in your local source code control systems to support the typical design-time iterative lifecycle activities like commits,
branching, merges, continuous integration, and so on. We believe the developer toolkit provides the bridge from the developer's environment and the API Connect runtime services.

That said, API Connect does provide an online development sandbox capability called _Drafts_ where API and product definitions can be defined.
The toolkit provides the `apic drafts` command set to enable synchronization of product and API artifacts between the developer's local source code control systems and drafts.

Similar to the `products` and `apis` command sets, `drafts` can be used to push, pull, and clone artifacts as follows:

```
apic config:set catalog=apic-catalog://mgmnthost.com/orgs/climbon/catalogs/sb    # set the default catalog
apic login --username some-user --password some-password --server mgmnthost.com  # login into the mgmnthost.com cloud

apic create --type api --title routes --product ClimbOn
apic drafts:push climbon.yaml                             # push climbon:1.0.0 and routes:1.0.0 to drafts
apic drafts                                               # list what is in drafts
apic drafts:get climbon                                   # get climbon:1.0.0
apic drafts:get routes                                    # get routes:1.0.0
apic drafts:pull climbon                                  # pull climbon:1.0.0 and routes:1.0.0 from drafts
apic drafts:clone                                         # pull every product/api from drafts
apic drafts:clear --confirm drafts                        # clear drafts collection
```

In addition to synchronizing data between the developer's source code control systems and drafts, products that are in drafts can be published:

```
apic config:set catalog=apic-catalog://mgmnthost.com/orgs/climbon/catalogs/sb    # set the default catalog
apic login --username some-user --password some-password --server mgmnthost.com  # login into the mgmnthost.com cloud

apic create --type api --title routes --product ClimbOn
apic drafts:push climbon.yaml                             # push climbon:1.0.0 and routes:1.0.0 to drafts
apic drafts:publish climbon
```

Again, although it's possible to develop products and APIs in drafts, and to use the CLI or the drafts user experience to publish products from drafts to a catalog,
our recommendation is to clone all your products and apis from drafts, check them into your local source code control system,
and then publish directly from there to your catalogs using your source code control system, its tags, service branches, et al, as your master of record.