---
lang: en
title: 'Implementing extension points and extensions pattern'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Extension-points-and-extensions.html
summary:
---
## Introduction

The LoopBack framework consists of components from multiple modules to work
together. Each component contributes various types of constructs and artifacts
to the application. How do we allow the modules built by different individuals
or companies to interact seamlessly, even without their knowing much about one
another? 

When a module wants other modules to extend or customize portions of its 
functionality, it will create an extension point. The extension point declares
an interface or schema as the contract that extensions must conform to. Modules
that connect to an extension point must implement the contract in their
extension. The key benefit is that the extension point and extensions don't have
to know each other beyond the scope of the contract. This allows 
Another category of extension points is for overriding the default behavior of 
a component. For example, user management component allows the password hashing
algorithm to be replaced and the logging component can switch from console to
file for the logs.

Extension points can also be used to group artifacts by type or interest. For
example, a list of artifacts participates in the life cycle (such as start/stop)
events of an application.

`Extension points and extensions` is a common pattern to promote modular design
with loose coupling for great extensibility and pluggability.

## Implement an extension point

- Define the extension point class
- Define the interface for extensions
- Inject config
- Inject extensions
- Delegate

## Implement an extension

## Declare an extension point

## Declare an extension

## Configure an extension point

## Configure an extension

## Resolve an extension point

