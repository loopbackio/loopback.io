---
lang: en
title: 'Schemas'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Schemas.html
summary:
---
{% include content/tbd.html %}

## Overview
A `schema` represents the definition of a model in LoopBack, with respect to
the [datasource juggler](https://github.com/strongloop/loopback-datasource-juggler).
Currently, we provide the `@loopback/repository` module, which provides special
decorators for adding metadata to your TypeScript/JavaScript
classes in order to use them with the legacy implementation of the Juggler.

## Using Legacy Juggler
Defining a schema for use with the legacy juggler involves decorating your
classes with the `@model` and `@property` decorators.

```ts
import { model, property } from '@loopback/repository';

@model()
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    description: 'The unique identifier for a product',
  })
  id: number;

  @property({type: 'string'})
  name: string;

  @property({type: 'string'})
  slug: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}
```

### Model Decorator
The model decorator can be used without any additional parameters, or can take
in a ModelDefinitionSyntax object which follows the general format provided in
LoopBack 3:
```ts
{
@model({
  name: "Category",
  properties: {
    // define properties here.
  },
  settings: {
    // etc...
  }
})
class Category extends Entity {
  // etc...
}
}
```

### Property Decorators
The property decorator takes in the same arguments used in LoopBack 3 for
individual property entries:
```ts
@model()
class Product extends Entity {
  @property({
    name: "name",
    description: "The product's common name.",
    type: "string",
  })
  public name: string;
}
```

The complete list of valid attributes for property definitions can be found in
LoopBack 3's [Model definition section](https://loopback.io/doc/en/lb3/Model-definition-JSON-file.html#properties)

### Defining Metadata By Hand?
You might be wondering why we have to redefine the type information when
it's already a part of the class definition.

The property type data isn't available at runtime, only at compile time.
This means that LoopBack Next would have to handle this metadata and retrieve
it at runtime to define your types for you.

While this could be written to work with primitive types, more complex objects
would require a vastly more involved form of compile-time parsing to build all
of the metadata required to reconstruct your complex object relationships at
runtime.

Additionally, even the primitive type handling wouldn't be able to
determine connector-specific properties you might want to apply to your
individual types.

```ts
export class Category extends Entity {
  @property() name: string; // This would be easy.
  @property() products : Product[]; // This would be a lot more difficult!
  constructor(data?: Partial<Category>) {
    super(data);
  }
}
```

## Other ORMs
You might decide to use an alternative ORM/ODM in your LoopBack application.
Loopback v4 no longer expects you to provide your data in its own custom Model
format for routing purposes, which means you are free to alter your classes
to suit these ORMs/ODMs.

However, this also means that the provided schema decorators will serve no
purpose for these ORMs/ODMs. Some of these frameworks may also provide
decorators with conflicting names (ex. another `@model` decorator), which might
warrant avoiding the provided juggler decorators.

