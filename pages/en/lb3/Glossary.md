---
title:  Glossary
toc: false
lang:  en
keywords:  LoopBack
tags:  [reference]
sidebar:  lb3_sidebar
permalink:  /doc/en/lb3/Glossary.html
summary: Definitions of common LoopBack terms.
---
<div style="float:right; width: 80px;">
{% include toc.html %}
</div>

## A
ACL
: Access control list, a list associated with an object that identifies all the subjects that can access the object and their access rights.  See [Authentication, authorization, and permissions](Authentication-authorization-and-permissions.html).

API
: Application Programming Interface.  An interface that allows an application program that is written in a high-level language to use specific data or functions of the operating system or another program.

apic
: The IBM API Connect command-line tool.  It provides commands to scaffold LoopBack applications. For more information, see [Command-line tools](Command-line-tools.html).  

adapter
: Provides the transport-specific mechanisms to make remote objects (and collections thereof) available over their transport.  See [Strong remoting](Strong-Remoting.html).

Android
: A mobile operating system created by Google, most of which is released under the Apache 2.0 and GPLv2 open source licenses.

AngularJS
: Open-source client JavaScript framework.

API Connect
: IBM product that incorporates StrongLoop and LoopBack technology for creating, running, managing, and securing APIs.  See [DeveloperWorks &gt; API Connect](https://developer.ibm.com/apiconnect/).

Arc
: StrongLoop graphical tool suite for the API lifecycle, including tools for building, profiling and monitoring Node apps. StrongLoop Arc is no longer under active development, and will soon be deprecated.

## B

boot script
: A JavaScript function that runs automatically when an application starts, by default in the <code>/server/boot</code> directory.  See [Defining boot scripts](Defining-boot-scripts.html).

built-in model
:  One of the predefined models that every LoopBack application has by default.  See [Using built-in models](Using-built-in-models.html).

## C

cluster
: A set of identical Node worker processes all receiving requests on the same port. See also:  _worker_.

component
: A predefined package that extend a basic LoopBack application.  Fundamentally, a component is related code bundled together as a unit to enable LoopBack applications for easy reuse.  See [LoopBack components](LoopBack-components.html).

connector
: See _LoopBack connector_.

## D

data source
: A data source connects with specific database or other back-end system using a connector.   See [Connecting models to data sources](Connecting-models-to-data-sources.html).

## E

endpoint
: See _route_.

enterprise connector
: A module that connects to back-end data sources such as Oracle, MySQL, or MongoDB.

environment variable
: A variable that defines an aspect of the operating environment for a process. For example, environment variables can define the home directory, the command search path, the terminal in use, or the current time zone.

event loop
: Single-threaded execution process that runs a Node.js application, typically making a series of asynchronous function calls.

## G

generator
: Interactive command-line tool that scaffolds all or part of a LoopBack application.  See [command-line tools](Command-line-tools.html).

## I

iOS
: A closed source, proprietary mobile operating system for Apple devices.

## J

JSON
: JavaScript Object Notation; a lightweight data-interchange format that is based on the object-literal notation of JavaScript. JSON is programming-language neutral but uses conventions from various languages.

## L

lb
: The LoopBack command-line interface (CLI) tool for scaffolding and developing LoopBack applications.
Replaces the legacy `slc` tool.

LDL
: LoopBack Definition Language, a form of JSON used to define LoopBack models and other configurations.

load balancer
: Software or hardware that distributes workload across a set of servers to ensure that servers are not overloaded. The load balancer also directs users to another server if the initial server fails.

LoopBack connector
: A connector that provides access to a back-end system such as a database, REST API, or other service.

LoopBack DataSource Juggler
: An object-relational mapping that provides a common set of interfaces for interacting with databases, REST APIs, and other data sources.

LoopBack model
: A model that consists of application data, validation rules, data access capabilities, and business logic that provides a REST API by default.

## M

MBaaS
: Mobile backend as a service. A computing model that connects mobile applications to cloud computing services and provides features such as user management, push notifications, and integration with social networks through a unified API and SDK.

middleware function
: A function executed when an HTTP request is made to a specified REST endpoint. Since LoopBack is based on Express, LoopBack middleware is the same as Express middleware.  See [Defining middleware](Defining-middleware.html).

middleware phase
: A stage in application execution when you can call a middleware function.  See [Defining middleware](Defining-middleware.html).

model
: See _LoopBack model_.

model property
: A value attached to a model; for persisted models, corresponds to a database column or field.

## N

npm
: Node package manager, the command-line tool for installing applications and managing dependencies using the npm registry.

## O

on-premises
: Pertaining to software that is installed and run on the local computers of a user or organization.

operation hook
: Code that is triggered by a model's high-level create, retrieve, update, or delete (CRUD) operations.  See [Operation hooks](Operation-hooks.html).

## P

Persisted model
: A LoopBack model attached to a persistent data source that automatically gets basic create, read, update, and delete methods.

production
: The stage in the software lifecycle when an application or API is generally available to its end-users or consumers.  Contrast with &quot;development&quot; and &quot;testing&quot;.  Also referred to as &quot;deployment&quot;.

production host
: A server running a production application.

property
: See model property.

push notification
: An alert or message to a mobile app.  See [Push notifications](Push-notifications.html).

## R

remote object
: A JavaScript object exported over the network by a StrongLoop application in the same way you export functions from a module. You can invoke methods on remote objects locally in JavaScript.

REST
: A software architectural style for distributed hypermedia systems like the World Wide Web. The term is also often used to describe any simple interface that uses XML (or YAML, JSON, plain text) over HTTP without an additional messaging layer such as SOAP.

route
: Part of a URL that identifies a resource. For example, in <code><span class="nolink">http: //foo.com/products/id</code>, the route is <code>/products/id</code>.

runtime
: Pertaining to the time period during which a computer program is running.

## S

SDK
: Software development kit.  A set of tools, APIs, and documentation to assist with the development of software in a specific computer language or for a particular operating environment.

slc
: The legacy StrongLoop command-line tool for development and operations. It's replaced by the LoopBack CLI tool, `lb`.

synchronization
: The process by which data consistency is achieved between two endpoints such as a provider application and a mobile application. During this process, at either endpoint, data can be updated, created, or deleted.  See [Synchronization](Synchronization.html).

## W

worker
: A Node.js child process.
