---
lang: en
title: 'Defining the API using bottom up approach'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Defining-the-API-using-bottom-up-approach.html
summary:
---

## Define the API from bottom to top

### Start with LoopBack artfiacts

Sometimes, it's hard to know what your API is going to look like without
writing out your application first. It also might be difficult to adjust your
API as plans change or as features need to be reworked.

With TypeScript's [experimental decorator](https://www.typescriptlang.org/docs/handbook/decorators.html)
feature, APIs can be automatically built and exposed as your application
continues development. Some key concepts utilize decorators to gather
'metadata' about your code and then assemble them into a valid OpenAPI spec.
These concepts and their decorators include:

- [Model](Model.html)
  - `@model()`
  - `@property()`
- [Routes](Routes.html)
  - `@operation()`
  - `@param()`

### Define your models

Your models will be used to provide schemas to validate against the data
your API will intercept and consequently are likely to be referenced as
argument types in your controllers, so they should be the first to be defined.

{% include note.html content="
  `Todo` model from [tutorial](TUTORIAL LINK) is used for demonstration here.
" %}

First, write a simple TypeScript class describing your model and its
properties.

```ts
export class Todo {
  id?: number;
  title: string;
  desc?: string;
  isComplete: boolean;
}
```

This model is just a TypeScript class without any decorators in its current
form, so features such as automatic schema generation are not available to it
yet.

Now decorate the class with `@model` and `@property`.

```ts
import {model, property} from '@loopback/repository';

@model()
export class Todo {
  @property() id?: number;
  @property({
    required: true
  })
  title: string;
  @property() desc?: string;
  @property() isComplete: boolean;
}
```

Once the model has been decorated with these decorators,
its metadata is made available to the app and the model is ready to have its
corresponding OpenAPI schema generated.

### Define your routes

{% include note.html content="
  `TodoController` from [tutorial](TUTORIAL LINK) is used for
  demonstration here.
" %}

Once your models are defined, create a controller to host your routes
for each categories of your API.

```ts
class TodoController {
  constructor() {}

  async createTodo(todo: Todo) {
    // data creating logic goes here
  }

  async findTodoById(id: number, items?: boolean): Promise<Todo> {
    // data retrieving logic goes here
  }

  // ...
}
```

The controller's routes in their current state has no information on which
API endpoints they belong to. Add them in by using `@operation` and `@param`
decorators.

```ts
class TodoController {
  constructor() {}

  @post('/todo') // sugar for @operation('post', '/todo');
  async createTodo(@param.body('todo') todo: Todo) {
    // data creating logic goes here
  }

  @get('/todo/{id}')
  async findTodoById(
    @param.path.number('id') id: number,
    @param.query.boolean('items') items?: boolean
  ): Promise<Todo> {
    // data retrieving logic goes here
  }

  // ...
}
```

Once your routes have been decorated, your application is ready to serve
its API; when an instance of `RestServer` is run, an OpenAPI specification
representing your application's API is built. The spec is generated
entirely from the decorated elements' metadata, which in turn provides
routing logic for your API when your application is running.

### Reviewing your API specification

To review your complete API specification, run your application with the
decorated controllers registered. Once it is running, visit `/swagger.json`
endpoint to see your API specification. Alternatively, the specification file
can also be accessed in code through the `getApiSpec()` function from your
`RestServer` instance.

For a complete walkthrough of developing an application with the bottom-up
approach, see our [Todo application](LINK TO TUTORIAL)
tutorial.

{% include note.html content="
  If you would like to create your API manually or already have one designed,
  refer to [Defining the API using top-down approach](Defining-the-API-using-top-down-approach)
  page for best practices.
" %}

{% include next.html content= "
[Defining your testing strategy](./Defining-your-testing-strategy.html)
" %}
