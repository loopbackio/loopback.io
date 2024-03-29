---
lang: en
title: 'API docs: metadata'
keywords: LoopBack 4.0, LoopBack 4, Node.js, TypeScript, OpenAPI
sidebar: lb4_sidebar
editurl: https://github.com/loopbackio/loopback-next/tree/master/packages/metadata
permalink: /doc/en/lb4/apidocs.metadata.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/metadata](./metadata.md)

## metadata package

A package with utilities to help developers implement [TypeScript decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)<!-- -->, define/merge metadata, and inspect metadata.

## Remarks

Utilities:

- Reflector: Wrapper of [reflect-metadata](https://github.com/rbuckton/reflect-metadata)<!-- -->. - Decorator factories: A set of factories for class/method/property/parameter decorators to apply metadata to a given class and its static or instance members. - MetadataInspector: High level APIs to inspect a class and/or its members to get metadata applied by decorators.

## Classes

|  Class | Description |
|  --- | --- |
|  [ClassDecoratorFactory](./metadata.classdecoratorfactory.md) | Factory for class decorators |
|  [DecoratorFactory](./metadata.decoratorfactory.md) | Base factory class for decorator functions |
|  [MetadataAccessor](./metadata.metadataaccessor.md) | A strongly-typed metadata accessor via reflection |
|  [MetadataInspector](./metadata.metadatainspector.md) | Inspector for metadata applied by decorators |
|  [MethodDecoratorFactory](./metadata.methoddecoratorfactory.md) | Factory for method decorators |
|  [MethodMultiDecoratorFactory](./metadata.methodmultidecoratorfactory.md) | Factory for an append-array of method-level decorators The <code>@response</code> metadata for a method is an array. Each item in the array should be a single value, containing a response code and a single spec or Model. This should allow: |
|  [MethodParameterDecoratorFactory](./metadata.methodparameterdecoratorfactory.md) | Factory for method level parameter decorator. |
|  [NamespacedReflect](./metadata.namespacedreflect.md) |  |
|  [ParameterDecoratorFactory](./metadata.parameterdecoratorfactory.md) | Factory for parameter decorators |
|  [PropertyDecoratorFactory](./metadata.propertydecoratorfactory.md) | Factory for property decorators |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [DecoratorOptions](./metadata.decoratoroptions.md) | Options for a decorator |
|  [DesignTimeMethodMetadata](./metadata.designtimemethodmetadata.md) | Design time metadata for a method. |
|  [InspectionOptions](./metadata.inspectionoptions.md) | Options for inspection |
|  [MetadataMap](./metadata.metadatamap.md) | An object mapping keys to corresponding metadata |

## Variables

|  Variable | Description |
|  --- | --- |
|  [Reflector](./metadata.reflector.md) |  |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [DecoratorType](./metadata.decoratortype.md) | Decorator function types |
|  [MetadataKey](./metadata.metadatakey.md) | Key for metadata access via reflection |


