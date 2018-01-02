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
```

However, the Model decorator already knows the name of your model class, so you
can omit it.
```ts
@model()
class Product extends Entity {
  name: string;
  // other properties...
}
```

### Property Decorator
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

<!-- NOTE(kjdelisle): Until we have a metadata docs section, link to the
package in the repository. -->
The property decorator leverages LoopBack's [metadata package](https://github.com/strongloop/loopback-next/tree/master/packages/metadata)
to determine the type of a particular property.

```ts
@model()
class Product extends Entity {
  @property()
  public name: string; // The type information for this property is String.
}
```

### Array Property Decorator

Unfortunately, there is a limitation to the metadata that can be automatically
inferred by LoopBack. In JavaScript, arrays do not possess any information about
the types of their members. Technically, it is possible to inspect the
members of an array to determine if they are of a primitive type
(string, number, array, boolean), object or function, but this would not tell us
anything about what the value would be if it were an object or function, and
would require traversal of the array.

For consistency, we have chosen to require use of the `@property.array`
decorator, which will add the appropriate metadata for type inference of
your array properties.

```ts
@model()
class Order extends Entity {
  @property.array(Product) items: Product[];
}

@model()
class Thread extends Entity {
  // Note that we still require it, even for primitive types!
  @property.array(String) posts: string[];
}
```

Additionally, the `@property.array` decorator can still take an optional 2nd
parameter to define or override metadata in the same fashion as the `@property`
decorator.
```ts
@model()
class Customer extends Entity {
  @property.array(String, {
    name: 'names',
    required: true,
  }) aliases: string[];
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

