---
lang: en
title: 'Thinking in LoopBack'
keywords: LoopBack 4.0, LoopBack 4
toc_level: 1
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Thinking-in-LoopBack.html
summary: LoopBack 4 is the easiest way to build complex and scalable APIs.
---
LoopBack 4 is more than just a framework: It's an ecosystem that encourages developers to follow best practices through predefined standards. This article will walk through some important guidelines by building an example API for a catalog of products.

## Define the API

This article will follow an "API first" and test-driven development process.

### Start with data

When building an API, its usually easiest to start by outlining some example data that consumers of the API will need. This can act as the first rough draft of the API specification for smaller applications / APIs. In this tutorial, you'll start by sketching out some example API response data as simple JavaScript objects:

```js
const products = [
  {name: 'Headphones', price: 29.99, category: '/categories/accessories', available: true, deals: ['50% off', 'free shipping']},
  {name: 'Mouse', price: 32.99, category: '/categories/accessories', available: true, deals: ['30% off', 'free shipping']},
  {name: 'yPhone', price: 299.99, category: '/categories/phones', available: true, deals: ['free shipping']},
  {name: 'yBook', price: 5999.99, category: '/categories/computers', available: true}
];
```

With the example data defined, you can start to get an idea of how to separate the data into individual proper nouns, which will eventually be defined in different ways. Either as resources, schemas, models, or repositories.

- `CatalogItem` - Each object in the array above
- `Category` - Has a URL, and more information about the category
- `Product` - The name, price and other product information
- `Inventory` - The product availability
- `Deals` - Information about promotions on a group of products

### Outline the API
With the proper nouns of the API defined, you can now start to think about what the API will look like.

This is where you choose how fine or coarse grain the API will be. You have to decide which proper nouns above will be available as _Resources_. The easiest way to figure out which Resources are needed is by sketching out the URLs (without verbs) for the API:

 - `/products?{query}` - Search for products in the catalog
 - `/product/{slug}` - Get the details for a particular product
 - `/deals?{query}` - Search for deals
 - `/deal/{slug}` - Get the details for a particular deal
 - `/categories?{query}` - Search for categories
 - `/category/{slug}` - Get the details for a particular category
 - `/category/{slug}/products?{query}` - Search for products in a particular category

### Break down the data into resources
With the URLs, defined, its easy to determine which resources you'll need.

 - `ProductResource`
 - `DealResource`
 - `CategoryResource`

This is where it's useful to determine similarities between Resources; for example, the `ProductResource`, `DealResource`, and `CategoryResource` all have the same URL structure, with the exception of `/category/{slug}/products?{query}` path on `CategoryResource`:

 - `/{pluralName}?{query}` - Search with a query and the resource plural name
 - `/{name}/{slug}` - Get details about the resource

### Using patterns to reduce duplication

It can be tricky to determine the patterns on which to base the API, since you'll likely want to change it in the future. To keep the patterns flexible, you can define these patterns via simple TypeScript functions (you can also do it in JavaScript). Start with a `SearchableResource` pattern, since all of the resources must support the same search and listing operations.

The `SearchableResource` pattern will define all of the semantics for an OpenAPI fragment that supports search.

{% include code-caption.html content="/apidefs/templates/searchable-resource.ts" %}

```ts
export let searchableResource = (resource: any, type: string) => ({
  paths: {
    [`/${resource.path}`]: { // pattern
      get: {
        "parameters": [{
          in: "query",
          name: "filter",
          type: "string",
        }],
        "responses": {
          200: {
            description: resource.description ||
              `Result set of type ${type} returned.`,
            schema: {
              $ref: `#/definitions/${type}`,
              type: "array",
            },
          },
        },
        "x-controller-name": resource.controller,
        "x-operation-name": "search",
      },
    },
    [`/${resource.path}/{slug}`]: { // pattern
      get: {
        "parameters": [
          {
            in: "path",
            name: "slug",
            required: true,
            type: "string",
          },
        ],
        "responses": {
          200: {
            description: resource.description ||
              `Result of type ${type} returned.`,
            schema: {
              $ref: `#/definitions/${type}`,
            },
          },
        },
        "x-controller-name": resource.controller,
        "x-operation-name": "getDetails",
      },
    },
  },
});
```

Here's another example for creating a POST template, called `CreatableResource`.

{% include code-caption.html content="/apidefs/templates/creatable-resource.ts" %}

```ts
export let creatableResource = (resource: any, type: string) => ({
  paths: {
    [`/${resource.path}`]: { // pattern
      post: {
        "parameters": [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
                $ref: `#/definitions/${type}`,
            },
          },
        ],
        "responses": {
          201: {
            description: resource.description
              || `The ${type} instance was created.`,
            schema: {
                $ref: `#/definitions/${type}`,
            },
          },
        },
        "x-controller-name": resource.controller,
        "x-operation-name": "create",
      },
    },
  },
});
```

Lastly, you'll create a helper function for generating type definitions in
OpenAPI.

{% include code-caption.html content="/apidefs/templates/type-definition.ts" %}

```ts
import { DefinitionsObject } from "@loopback/openapi-spec";

export let TypeDefinition = (type: any): DefinitionsObject => ({
  definitions: {
    [`${type.name}`]: {
        properties: type.definition,
    },
  },
});
```

Given the pattern function above, you can now create the OpenAPI fragment that
represents the `ProductController` portion of the full specification.
This example, uses [lodash](https://lodash.com/) to help with merging generated definitions together.  Install lodash with this command:

```shell
npm install --save lodash
```

{% include code-caption.html content="/apidefs/product.api.ts" %}

```ts
import * as _ from "lodash";

// Assuming you have created the "base" schema elsewhere.
// If there are no common properties between all of the endpoint objects,
// then you can ignore this.
import BaseSchema from "../BaseSchema";
// Don't forget to export the template functions under a common file!
import { SearchableResource, CreatableResource, TypeDefinition } from "./templates";
let ProductAPI: ControllerSpec = {};

const ProductDefinition = {};
// Build type definition using base schema + additional properties.
_.merge(ProductDefinition, BaseSchema, TypeDefinition({
  price: {
    type: "number",
    minimum: 0,
    exclusiveMinimum: true,
  }
}));

const ProductGetResource = SearchableResource({
  controller: "ProductController",
  operation: "search",
  path: "products",
}, "Product");

const ProductCreateResource = CreatableResource({
  controller: "ProductController",
  operation: "create",
  path: "products",
}, "Product");
// Rinse and repeat for PUT, PATCH, DELETE, etc...

// Merge all of the objects together.
// This will mix the product definition into the "definitions" property of the
// OpenAPI spec, and the resources will be mixed into the "paths" property.
_.merge(ProductAPI, ProductDefinition, ProductGetResource,
  ProductCreateResource);

// And export it!
export default ProductAPI;
```

### Connect OpenAPI fragments to Controllers

By separating each individual "Model"-level API export, you can link
them to their corresponding controllers throughout the application.

{% include code-caption.html content="/controllers/product-controller.ts" %}

```ts
import { api } from "@loopback/core";
import ProductApi from "../apidefs/product.api";

// This decorator binds the Product API to the controller,
// which will establish routing to the specified functions below.
@api(ProductApi)
export class ProductController {

  // Note that the function names here match the strings in the "operation"
  // property you provided to the SearchableResource call in the previous
  // example.
  public search() {
    // your logic here
  }

  // Same goes for this function!
  public create(id: number, name: string, price: number) {
    // your logic here
  }

  // etc...
}
```

### Putting together the final API specification

Now that you've built the OpenAPI fragments for each of the controllers,
you can put them all together to produce the final OpenAPI spec.

{% include code-caption.html content="/apidefs/swagger.ts" %}

```ts
import { ProductAPI, DealAPI, CategoryAPI } from "../apidefs";
import * as OpenApiSpec from "@loopback/openapi-spec";
import * as _ from "lodash";


// Import API fragments here

export let spec = OpenApiSpec.createEmptyApiSpec();
spec.info = {
  title: "Your API",
  version: "1.0",
};
spec.swagger = "2.0";
spec.basePath = "/";

_.merge(spec, ProductAPI);
_.merge(spec, DealAPI);
_.merge(spec, CategoryAPI);

export default spec;
```

You can then bind the full spec to the application using `server.spec()`. This is done on the server level, because each server instance can expose a different (sub)set of API.

You also need to associate the controllers implementing the spec with the app using `app.controller(GreetController)`. This is not done on the server level because a controller may be used with multiple server instances, and types!

```ts
// application.ts
// This should be the export from the previous example.
import spec from "../apidefs/swagger";
import { Application } from "@loopback/core";
import { RestComponent, RestServer } from "@loopback/rest";
import { ProductController, DealController, CategoryController } from "./controllers";
export class YourMicroservice extends Application {

  constructor() {
    super({
      components: [RestComponent],
    });
    const app = this;

    app.controller(ProductController);
    app.controller(DealController);
    app.controller(CategoryController);

  }
  async start() {
    const server = await app.getServer(RestServer);
    // inject your spec here!
    server.api(spec);
    server.bind("rest.port").to(3001);
    await super.start();
  }
  // etc...
}
```

## Validate the API specification

[The OpenAPI Swagger editor](https://editor.swagger.io) is a handy tool for editing OpenAPI specifications that comes with a built-in validator. It can be useful to manually validate an  OpenAPI specification.

However, manual validation is tedious and error prone. It's better to use an automated solution that's run as part of a CI/CD workflow. LoopBack's `testlab` module provides a helper function for checking whether a specification conforms to OpenAPI Spec. Just add a new Mocha test that calls this helper function to the test suite:

```ts
// test/acceptance/api-spec.acceptance.ts

import {validateApiSpec} from '@loopback/testlab';
import {MyApp} from '../..';
import {RestServer} from '@loopback/rest';

describe('API specification', () => {
  it('api spec is valid', async () => {
    const app = new MyApp();
    const server = await app.getServer(RestServer);
    const spec = server.getApiSpec();
    await validateApiSpec(apiSpec);
  });
});
```

See [Validate your OpenAPI specification](Testing-your-application.html#validate-your-openapi-specification) from [Testing your application](Testing-your-application.html) for more details.

## Smoke test API input/output

Once you confirm that the API specification is valid, it's time to verify that the application implements the API as you have specified it.  The input/output testing described below uses [Dredd](https://www.npmjs.com/package/dredd), specifically `hello-world` in this section.  Concrete sample code of `hello-world` can be found in the [hello-world tutorial](https://github.com/strongloop/loopback-next-hello-world) repository.  Although the sample code includes a validated API spec and fully functional `hello-world` controller, let's pretend the controller is completely empty.  Try it yourself by cloning the repository from GitHub.

For input/output testing, you are going to create three parts:
1. Input data definition.
2. Expected output response definition.
3. Test code.  

Parts one and two are included in the API specification.  The input data is given as `x-example` as follows:

```js
"x-example": "Ted"
```

The expected output as `examples`:

```js
"examples": {
  "text/plain": "Hello world Ted."
}
```

The `Dredd` module reserves `x-example` to set the input parameter.  the OpenAPI standard defines the [`examples` object](https://swagger.io/specification/#examples-object-92) as a map from `MIME type` to the content value.  Here, it's `text/plain` MIME type.  As you see, they are a pair: When you change the input value `x-example`, you must change `examples` value as well.

The complete `hello-world` API specification is the following:

```js
export const controllerSpec =
{
  swagger: '2.0',
  basePath: '/',
  info: {
    title: 'LoopBack Application',
    version: '1.0.0',
  },
  "paths": {
    "/helloworld": {
      "get": {
        "x-operation-name": "helloWorld",
        "parameters": [
          {
            "name": "name",
            "in": "query",
            "description": "Your name.",
            "required": false,
            "type": "string",
            "x-example": "Ted"
          }
        ],
        "responses": {
          "200": {
            "description": "Returns a hello world with your (optional) name.",
            "examples": {
              "text/plain": "Hello world Ted."
            }
          }
        }
      }
    }
  }
}
```

The third piece is the test code.  To initialize the test environment, you need to create a `Dredd` instance specifying the configuration. There are two required fields in the configuration object: `server` and `options.path`.
 `localhostAndPort + \'/swagger.json\'` is the predefined end point LoopBack 4 uses for the client to access the API specification of the service API.

```js
  async function initEnvironment() {
    // By default, the port is set to 3000.
    const app: Application = new HelloWorldApp();
    const server = app.getServer(RestServer);
    // For testing, you'll let the OS pick an available port by setting
    // RestBindings.PORT to 0.
    server.bind(RestBindings.PORT).to(0);
    // app.start() starts up the HTTP server and binds the acquired port
    // number to RestBindings.PORT.
    await app.start();
    // Get the real port number.
    const port: number = await server.get(RestBindings.PORT);
    const localhostAndPort: string = 'http://localhost:' + port;
    const config: object = {
      server: localhostAndPort, // base path to the end points
      options: {
        level: 'fail', // report 'fail' case only
        silent: false, // false for helpful debugging info
        path: [localhostAndPort + '/swagger.json'], // to download apiSpec from the service
      }
    };
    dredd = new Dredd(config);
  }
```

Since the specification above includes definition of input data and the expected output, you have all the pieces to write the test code:

```js
describe('Api Spec End Points', () => {
  let dredd: any;
  before(initEnvironment);

  describe('input/output test', () => {

    it('passes match', done => {
      dredd.run((err: Error, stats: object) => {
        if (err) return done(err);
        expect(stats).to.containDeep({
          failures: 0,
          errors: 0,
          skipped: 0,
        });
        done();
      });
    });
  });

  async function initEnvironment() {
    //
    // see initEnvironment defined above.
    //
  });
})
```

Try running the first test:

```shell
$ npm test

  Api Spec End Points
    input/output test
fail: GET /helloworld?name=Ted duration: 26ms
fail: body: Real and expected data does not match.

request:
method: GET
uri: /helloworld?name=Ted
headers:
    User-Agent: Dredd/4.3.0 (Darwin 16.7.0; x64)
    Content-Length: 0
body:

expected:
headers:
    Content-Type: text/plain
body:
Hello world Ted
statusCode: 200

actual:
statusCode: 500
headers:
    date: Wed, 23 Aug 2017 00:17:48 GMT
    connection: close
    content-length: 0
body:

complete: 0 passing, 1 failing, 0 errors, 0 skipped, 1 total
complete: Tests took 27ms
```

The test report correctly shows that the input is `name=Ted` and the expected result is `Hello world Ted`, but the actual result was `statusCode: 500` which does not match the expectation.  When the `hello-world` API is implemented, the result would be something like the following:

```shell
$ npm test

  Api Spec End Points
    input/output test
complete: 1 passing, 0 failing, 0 errors, 0 skipped, 1 total
complete: Tests took 21ms
```

It's a powerful proposition to use the API specification not only for API declaration but for test case declaration.  The discussion so far paves the road to "automated controller wireframe-code generation and test-driven development" based on the OpenAPI standard.

At this point, you are ready to make these tests pass by coding up your business logic.

Please refer to [Perform an auto-generated smoke test of your REST API](Testing-your-application.html#perform-an-auto-generated-smoke-test-of-your-rest-api) from [Testing your application](Testing-your-application.html) for more details.

## Define your testing strategy

It may be tempting to overlook the importance of a good testing strategy when starting a new project. Initially, as the project is small and you mostly keep adding new code, even a  badly-written test suite seems to work well. However, as the project grows and matures, inefficiencies in the test suite can severely slow down progress.

A good test suite has the following properties:

 - **Speed**: The test suite should complete quickly. This encourages short red-green-refactor cycle, which makes it easier to spot problems, because there have been few changes made since the last test run that passed. It also shortens deployment times, making it easy to frequently ship small changes, reducing the risk of major breakages.
 - **Reliability**: The test suite should be reliable. No developer enjoys debugging a failing test only to find out it was poorly written and failures are not related to any problem in the tested code. Flaky tests reduce the trust in your tests, up to point where you learn to ignore these failures, which will eventually lead to a situation when a test failed legitimately because of a bug in the application, but you did not notice.
 - **Isolation of failures**: The test suite should make it easy to isolate the source of test failures. To fix a failing test, developers need to find the specific place that does not work as expected. When the project contains thousands of lines and the test failure can be caused by any part of the system, then finding the bug is very difficult, time consuming and demotivating.
 - **Resilience**: The test implementation should be robust and resilient to changes in the tested code. As the project grows and matures, you may need to change existing behavior. With a brittle test suite, each change may break dozens of tests, for example when you have many end-to-end/UI tests that rely on specific UI layout. This makes change prohibitively expensive, up to a point where you may start questioning the value of such test suite.

References:

- [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html) by Martin Fowler
- [The testing pyramid](http://www.agilenutshell.com/episodes/41-testing-pyramid) by Jonathan Rasmusson
- [Just say no to more end-to-end tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)
- [100,000 e2e selenium tests? Sounds like a nightmare!](https://watirmelon.blog/2014/05/14/100000-e2e-selenium-tests-sounds-like-a-nightmare/)
- [Growing Object-Oriented Software Guided by Tests](http://www.growing-object-oriented-software.com/)

### How to build a great test suite

To create a great test suite, think smaller and favor fast, focused unit-tests over slow application-wide end-to-end tests.

Say you are implementing the "search" endpoint of the Product resource described earlier. You might write the following tests:

 1. One "acceptance test", where you start the application, make an HTTP request to search for a given product name, and verify that expected products were returned. This verifies that all parts of the application are correctly wired together.

 2. Few "integration tests" where you invoke `ProductController` API from JavaScript/TypeScript, talk to a real database, and verify that the queries built by the controller work as expected when executed by the database server.

 3. Many "unit tests" where you test `ProductController` in isolation and verify that the controller handles all different situations, including error paths and edge cases.

### Testing workflow

Here is what your testing workflow might look like:

 1. Write an acceptance test demonstrating the new feature you are going to build. Watch the test fail with a helpful error message. Use this new test as a reminder of what is the scope of your current work. When the new tests passes then you are done.

 2. Think about the different ways how the new feature can be used and pick one that's most easy to implement. Consider error scenarios and edge cases that you need to handle too. In the example above, where you want to search for products by name, you may start with the case when no product is found.

 3. Write a unit-test for this case and watch it fail with an expected (and helpful) error message. This is the "red" step in Test Driven Development ([TDD](https://en.wikipedia.org/wiki/Test-driven_development)).

 4. Write a minimal implementation need to make your tests pass. Building up on the example above, let your search method return an empty array.  This is the "green" step in TDD.

 5. Review the code you have written so far, and refactor as needed to clean up the design. Don't forget to keep your test code clean too! This is the "refactor" step in TDD.

 6. Repeat the steps 2-5 until your acceptance test starts passing.

When writing new unit tests, watch out for situations where your tests are asserting on how the tested objects interacted with the mocked dependencies, while making implicit assumptions about what is the correct usage of the dependencies. This may indicate that you should add an integration test in addition to a unit test.

For example, when writing a unit test to verify that the search endpoint is building a correct database query, you would usually assert that the controller invoked the model repository method with an expected query. While this gives us confidence about the way the controller is building queries, it does not tell us whether such queries will actually work when they are executed by the database server. An integration test is needed here.

To summarize:

- Pay attention to your test code. It's as important as the "real" code you are shipping to production.
- Prefer fast and focused unit tests over slow app-wide end-to-end tests.
- Watch out for integration points that are not covered by unit-tests and add integration tests to verify your units work well together.

See [Testing Your Application](Testing-Your-application.html) for a reference manual on automated tests.

## Incrementally implement features

To recapitulate the status of your new project:

 - You have defined your application's API and described it in an OpenAPI Spec document.
 - You have empty controllers backing your new operations.
 - Our project has a test verifying the validity of your API spec. This test passes.
 - Our test suite includes a smoke test to verify conformance of your implementation
   with the API spec. These checks are all failing now.

Now it's time to put your testing strategy outlined in the previous section into practice. Pick one of the new API operations, preferably the one that's easiest to implement, and get to work!

Start with `GET /product/{slug}` in this guide.

### Write an acceptance test

One "acceptance test", where you start the application, make an HTTP request to search for a given product name, and verify that expected products were returned. This verifies that all parts of your application are correctly wired together.

Create `test/acceptance/product.acceptance.ts` with the following contents:

```ts
import {HelloWorldApp} from '../..';
import {RestBindings, RestServer} from '@loopback/rest';
import {expect, supertest} from '@loopback/testlab';

describe('Product (acceptance)', () => {
  let app: HelloWorldApp;
  let request: supertest.SuperTest<supertest.Test>;

  before(givenEmptyDatabase);
  before(givenRunningApp);

  it('retrieves product details', async () => {
    // arrange
    const product = await givenProduct({
      name: 'Ink Pen',
      slug: 'ink-pen',
      price: 1,
      category: 'Stationery',
      description: 'The ultimate ink-powered pen for daily writing',
      label: 'popular',
      available: true,
      endDate: null,
    });

    // act
    const response = await request.get('/product/ink-pen')

    // assert
    expect(response.body).to.deepEqual({
      id: product.id,
      name: 'Ink Pen',
      slug: 'ink-pen',
      price: 1,
      category: 'Stationery',
      available: true,
      description: 'The ultimate ink-powered pen for daily writing',
      label: 'popular',
      endDate: null,
    });
  });

  async function givenEmptyDatabase() {
    // TODO
  }

  async function givenRunningApp() {
    app = new HelloWorldApp();
    const server = await app.getServer(RestServer);
    server.bind(RestBindings.PORT).to(0);
    await app.start();

    const port: number = await server.get(RestBindings.PORT);
    request = supertest(`http://127.0.0.1:${port}`);
  }

  async function givenProduct(data: Object) {
    // TODO
    return Object.assign({}, data, {id: 1});
  }
});
```

Notice there are few missing pieces annotated with TODO comments. Well come back to them very soon. Remember, when practicing TDD in small steps,
the goal is to add as little test code as needed to uncover a missing piece in the production code, and then add just enough production code to
make your new test pass (while keeping all existing tests passing too).

Run the tests and watch the new test fail:

```
  1) Product (acceptance) retrieves product details:
     Error: expected 200 "OK", got 404 "Not Found"
```

When you scroll up in the test output, you will see more information about the 404 error:

```
Unhandled error in GET /product/ink-pen: 404 Error: Controller method not found: ProductController.getDetails
```

Learn more about acceptance testing in [Test your individual REST API endpoints](./Testing-your-application.html#test-your-individual-rest-api-endpoints) from [Testing your application](./Testing-your-application.html).

### Write a unit-test for the new controller method

The new acceptance test is failing because there is no `getDetails` method implemented by `ProductController`. Start with a unit-test to drive the implementation of this new method. Please refer to [Unit-test your Controllers](./Testing-your-application.html#unit-test-your-controllers) for more details.

Create `tests/unit/product-controller.test.ts` with the following contents:

```ts
import {ProductController} from '../..';
import {expect} from '@loopback/testlab';

describe('ProductController', () => {
  describe('getDetails()', () => {
    it('retrieves details of a given product', async () => {
      const controller = new ProductController();
      const details = controller.getDetails('ink-pen');
      expect(details).to.containDeep({
        name: 'Ink Pen',
        slug: 'ink-pen',
      });
    });
  });
});
```

This test is clearly not describing a final solution, for example there is no Product model and repository involved. However, it's a good first increment that drives enough of the initial controller implementation.
This shows the power of unit testing - you can test this new controller method in isolation, independent from the other moving parts of the
application, even before those other parts are implemented!

Run `npm test` and watch the test fail with a helpful error message:

```
TSError: ⨯ Unable to compile TypeScript
test/unit/product-controller.test.ts (13,40): Property 'getDetails' does not exist on type 'ProductController'. (2339)
```

Now it's time to write the first implementation of the `getDetails` method. Modify the file `src/controllers/product-controller.ts` as follows:

```ts
export class ProductController {
  async getDetails(slug: string) {
    return {
      name: 'Ink Pen',
      slug: 'ink-pen',
    };
  }
}
```

Run `npm test` to see your new test pass. Notice that the Dredd-powered test of `/product/{slug}` is passing too, and your acceptance test is failing
with a different error now - the response does not contain all expected product properties.

While it's possible to further iterate by adding more unit tests, a more valuable next step is to write an integration test to verify that your new API is using data from your backing database.

### Write an integration test for the new controller method

Create `tests/integration/product-controller.integration.ts` with the following contents:

```ts
import {ProductController} from '../..';
import {expect} from '@loopback/testlab';

describe('ProductController (integration)', () => {
  beforeEach(givenEmptyDatabase);

  describe('getDetails()', () => {
    it('retrieves details of the given product', async () => {
      const inkPen = await givenProduct({
        name: 'Ink Pen',
        slug: 'ink-pen',
      });

      const pencil = await givenProduct({
        name: 'Pencil',
        slug: 'pencil',
      });

      const controller = new ProductController();

      const details = await controller.getDetails('pencil');

      expect(details).to.eql(pencil);
    });
  });

  async function givenEmptyDatabase() {
    // TODO
  }

  async function givenProduct(data: Object) {
    // TODO
    return Object.assign({}, data, {id: 1});
  }
});
```

Run `npm test` to see the new test fail.

```
AssertionError: expected Object { name: 'Ink Pen', slug: 'ink-pen' } to equal Object { name: 'Pencil', slug: 'pencil', id: 1 } (at name, Ahas 'Ink Pen' and B has 'Pencil')
+ expected - actual

   {
  -  "name": "Ink Pen"
  -  "slug": "ink-pen"
  +  "id": 1
  +  "name": "Pencil"
  +  "slug": "pencil"
   }
```

Please refer to [Test your Controllers and Repositories together](./Testing-your-application.html#test-your-controllers-and-repositories-together) to learn more about integration testing.

Take a closer look at the new test. To make it fail with the current implementation, you need to find a different scenario compared to what is covered by the unit test. You could simply change the data, but that would add little value to the test suite. Instead, take this opportunity to cover another requirement of "get product details" operation: it should return the details of the product that matches the "slug" parameter passed in the arguments.

The next step is bigger than is usual in an incremental TDD workflow. You need to connect to the database and define classes to work with the data.

### Define Product model, repository, and data source

LoopBack is agnostic when it comes to accessing databases. You can choose any package from the npm module ecosystem. On the other hand, we also want LoopBack users to have a recommended solution that's covered by technical support. Welcome to `@loopback/repository`, a TypeScript facade for the `loopback-datasource-juggler` implementation in LoopBack 3.x.

 1. Define `Product` model in `src/models/product.model.ts`

    ```ts
    import {Entity, model, property} from '@loopback/repository';

    @model()
    export class Product extends Entity {
      @property({
        description: 'The unique identifier for a product',
        type: 'number',
        id: true,
      })
      id: number;

      @property({type: 'string', required: true})
      name: string;

      @property({type: 'string', required: true})
      slug: string;

      @property({type: 'number', required: true})
      price: number;

      // Add the remaining properties yourself:
      // description, available, category, label, endData
    }
    ```

    **TODO(bajtos) Find out how to re-use ProductBaseSchema for the model definition**

 2. Define a data source representing a single source of data, typically a database. This example uses in-memory storage. In real applications, replace the `memory` connector with the actual database connector  (`postgresql`, `mongodb`, etc.).

    Create `src/datasources/db.datasource.ts` with the following content:

    ```ts
    import {juggler, DataSourceConstructor} from '@loopback/repository';

    export const db = new DataSourceConstructor({
      connector: 'memory',
    });
    ```

 3. Define `ProductRepository` in `src/repositories/product.repository.ts`

    ```ts
    import {DefaultCrudRepository, DataSourceType} from '@loopback/repository';
    import {Product} from '../models/product.model';
    import {db} from '../datasources/db.datasource';

    export class ProductRepository extends DefaultCrudRepository<
      Product,
      typeof Product.prototype.id
    > {
      constructor() {
        super(Product, db);
      }
    }
    ```

See [Repositories](Repositories.html) for more details on this topic.

### Update test helpers and the controller use real model and repository

Rework `givenEmptyDatabase` and `givenProduct` as follows:

```ts
async function givenEmptyDatabase() {
  await new ProductRepository().deleteAll();
}

async function givenProduct(data: Partial<Product>) {
  return await new ProductRepository().create(Object.assign({
    name: 'a-product-name',
    slug: 'a-product-slug',
    price: 1,
    description: 'a-product-description',
    available: true,
  }, data));
}
```

Notice that `givenProduct` is filling in required properties with sensible defaults. This is allow tests to provide only a small subset of properties that are strictly required by the tested scenario. This is important for multiple reasons:

 1. It makes tests easier to understand, because it's immediately clear what model properties are relevant to the test. If the test was setting all required properties, it would be difficult to tell whether some of those properties may be actually relevant to the tested scenario.

 2. It makes tests easier to maintain. As the data model evolves, you will eventually need to add more required properties. If the tests were building product instances manually, you would have to fix all tests to set the new required property. With a shared helper, there is only a single place where to add a value for the new required property.

You can learn more about test data builders in [Use test data builders](./Testing-your-application.html#use-test-data-builders) section of [Testing your application](./Testing-your-application.html).

Now that the tests are setting up the test data correctly, it's time to rework `ProductController` to make the tests pass again.

```ts
import {ProductRepository} from '../repositories/product.repository';
import {Product} from '../models/product.model';

export class ProductController {
  repository: ProductRepository = new ProductRepository();

  async getDetails(slug: string): Promise<Product> {
    const found = await this.repository.find({where: {slug}});
    // TODO: handle "not found" case
    return found[0];
  }
}
```

### Run tests

Run the tests again.  These results may surprise you:

 1. The acceptance test is failing: the response contains some expected properties (slug, name),
   but is missing most of other properties.

 2. The API smoke test is failing with a cryptic error.

 3. The unit test is passing, despite the fact that it's not setting up any data at all!

Examine the acceptance test first. A quick review of the source code should tell us what's the problem - the test is relying on `givenEmptyDatabase` and `givenProduct` helpers, but these helpers are not fully implemented yet. Fix that by reusing the helpers from the integration test: Move the helpers to `test/helpers/database.helpers.ts` and update both the acceptance and the integration tests to import the helpers from there.

To find out why the API smoke test is failing, you can start the application via `node .` and request the tested endpoint for example using `curl`. You will see that the server responds with 200 OK and an empty response body. This is because `getDetails` returns `undefined` when no product matching the slug was found. This can be fixed by adding a `before` hook to the smoke test. The hook should populate the database with the test data assumed by the examples in the Swagger specification by leveraging existing helpers `givenEmptyDatabase` and `givenProduct`.

Now back to the first unit test. It may be a puzzle to figure out why the test is passing, although the answer is simple: the integration and acceptance tests are setting up data in the database, the unit test does not clear the database (because it should not use it at all!) and accidentally happen
to expect the same data as one of the other tests.

### Decouple Controller from Repository

This shows us a flaw in the current design of the `ProductController` - it's difficult to test it in isolation. Fix that by making the dependency on `ModelRepository` explicit and allow controller users to provide a custom implementation.

```ts
class ProductController {
  constructor(public repository: ProductRepository) {}

  // ...
}
```

{% include tip.html content="If you wanted to follow pure test-driven development, then you would define a minimal repository interface describing only the methods actually used by the controller. This will allow you to discover the best repository API that serves the need of the controller. However, you don't want to design a new repository API, you want to re-use the repository implementation provided by LoopBack. Therefore using the actual Repository class/interface is the right approach.
" %}

In traditional object-oriented languages like Java or C#, in order to allow the unit tests to provide a custom implementation of the repository API, the controller needs to depend on an interface describing the API, and the repository implementation needs to implement this interface. The situation is easier in JavaScript and TypeScript. Thanks to the dynamic nature of the language, it's possible to mock/stub entire classes. The [sinon](http://sinonjs.org/) testing module, which comes bundled in `@loopback/testlab`, makes this very easy.

Here is the updated unit test leveraging dependency injection:

```ts
import {ProductController, ProductRepository} from '../..';
import {expect, sinon} from '@loopback/testlab';

describe('ProductController', () => {
  let repository: ProductRepository;
  beforeEach(givenStubbedRepository);

  describe('getDetails()', () => {
    it('retrieves details of a product', async () => {
      const controller = new ProductController(repository);
      const findStub = repository.find as sinon.SinonStub;
      findStub.resolves([
        {
          id: 1,
          name: 'Ink Pen',
          slug: 'ink-pen',
        },
      ]);

      const details = await controller.getDetails('ink-pen');

      expect(details).to.containDeep({
        name: 'Ink Pen',
        slug: 'ink-pen',
      });
      expect(findStub).to.be.calledWithMatch({where: {slug: 'ink-pen'}});
    });
  });

  function givenStubbedRepository() {
    repository = sinon.createStubInstance(ProductRepository);
  }
});
```

The new unit test is passing now, but the integration and acceptance tests are broken again!

 1. Fix the integration test by changing how the controller is created - inject `new ProductRepository()` into the repository argument.

 2. Fix the acceptance test by annotating `ProductController`'s `repository` argument with `@inject('repositories.Product')`
    and binding the `ProductRepository` in the main application file where you are also binding controllers.

Learn more about this topic in [Unit-test your Controllers](./Testing-your-application.html#unit-test-your-controllers)
and [Use test doubles](./Testing-your-application.html#use-test-doubles) from [Testing your application](./Testing-your-application.html).

### Handle 'product not found' error

When you wrote the first implementation of `getDetails`, you assumed the slug always refer to an existing product, which obviously is not always true. Fix the controller to correctly handle this error situation.

Start with a failing unit test:

```ts
it('returns 404 Not Found for unknown slug', async () => {
  const controller = new ProductController(repository);
  const findStub = repository.find as sinon.SinonStub;
  findStub.resolves([]);

  try {
    await controller.getDetails('unknown-slug');
    throw new Error('getDetails should have thrown and error');
  } catch (err) {
    expect(err).to.have.property('statusCode', 404);
    expect(err.message).to.match(/not found/i);
  }
});
```

Then fix `getDetails` implementation:

```ts
// ...
import {HttpErrors} from '@loopback/rest';

export class ProductController {
  // ...

  async getDetails(slug: string): Promise<Product> {
    const found = await this.repository.find({where: {slug}});
    if (!found.length) {
      throw new HttpErrors.NotFound(`Slug not found: ${slug}`);
    }
    return found[0];
  }
}
```

More information on `HttpErrors` can be found in [Controllers](./Controllers.html#handling-errors-in-controllers)

### Implement a custom Sequence

LoopBack 3.x is using Express middleware to customize the sequence of actions executed to handle an incoming request: body-parser middleware is converting the request body from JSON to a JavaScript object, strong-error-handler is creating an error response when the request failed.

Express middleware has several shortcomings:
 - It's based on callback flow control and does not support async functions returning Promises.
 - The order in which middleware needs to be registered can be confusing, for example request logging middleware must be registered as the first one, despite the fact that the log is written only at the end, once the response has been sent.
 - The invocation of middleware handlers is controlled by the framework, application developers have very little choices.

LoopBack 4, abandons Express/Koa-like middleware for a different approach that puts the application developer in the front seat. See [Sequence](Sequence.html) documentation to learn more about this concept.

Now you are going to modify request handling in the application to print a line in the [Common Log Format](https://en.wikipedia.org/wiki/Common_Log_Format) for each request handled.

Start by writing an acceptance test, as described in [Test sequence customizations](Testing-your-application.html#test-sequence-customizations) from [Testing your application](Testing-your-application.html). Create a new test file (e.g. `sequence.acceptance.ts`) and add the following test:

```ts
describe('Sequence (acceptance)', () => {
  let app: HelloWorldApp;
  let request: Client;

  before(givenEmptyDatabase);
  beforeEach(givenRunningApp);

  it('prints a log line for each incoming request', async () => {
    const logs: string[] = [];
    const server = await app.getServer(RestServer);
    server.bind('sequence.actions.commonLog').to((msg: string) => logs.push(msg));

    const product = await givenProduct({name: 'Pen', slug: 'pen'});
    await request.get('/product/pen');
    expect(logs).to.have.length(1);
    expect(logs[0]).to.match(
      /^(::ffff:)?127\.0\.0\.1 - - \[[^]+\] "GET \/product\/pen HTTP\/1.1" 200 -$/,
    );
  });
});
```

Run the test suite and watch the test fail.

In the next step, copy the default Sequence implementation to a new project file `src/server/sequence.ts`:

```ts
const RestSequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(RestSequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(RestSequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(RestSequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(RestSequenceActions.SEND) protected send: Send,
    @inject(RestSequenceActions.REJECT) protected reject: Reject,
  ) {}

  async handle(req: ParsedRequest, res: ServerResponse) {
    try {
      const route = this.findRoute(req);
      const args = await this.parseParams(req, route);
      const result = await this.invoke(route, args);
      this.send(res, result);
    } catch (err) {
      this.reject(res, req, err);
    }
  }
}
```

Register your new sequence with your `Server`, for example by calling `server.sequence(MySequence)`. Run your tests to verify that everything works the same way as before and the new acceptance test is still failing.

Now it's time to customize the default sequence to print a common log line. Edit the `handle` method as follows:

```ts
async handle(req: ParsedRequest, res: ServerResponse) {
  try {
    const route = this.findRoute(req);
    const args = await this.parseParams(req, route);
    const result = await this.invoke(route, args);
    this.send(res, result);
    this.log([
      req.socket.remoteAddress,
      '-',
      '-',
      `[${strftime('%d/%b/%Y:%H:%M:%S %z', new Date())}]`,
      `"${req.method} ${req.path} HTTP/${req.httpVersion}"`,
      res.statusCode,
      '-',
    ].join(' '));
  } catch (err) {
    this.reject(res, req, err);
  }
}
```

To inject the new method `log`, add the following line to `MySequence` constructor arguments:

```ts
@inject('sequence.actions.log') protected log: (msg: string) => void
```

When you run the tests now, you will see that the new acceptance tests for logging passes, but some of the older acceptance tests started to fail. This is because `sequence.actions.log` is not bound in the application. Fix that by adding the following line after you've retrieved your rest server instance:

```ts
// assuming you've called `const server = await app.getServer(RestServer)`
server.bind('sequence.actions.log').to((msg: String) => console.log(msg));
```

With this last change in place, your test suite should be all green again.

The next task is left as an exercise for the reader: \Modify the `catch` block to print a common log entry too. Start by writing a unit-test that invokes `MySequence` directly.

## Preparing your API for consumption

{% include content/tbd.html %}

- Documentation
- Public endpoint for the swagger spec (for discovery)
- more?

## Closing thoughts

Congratulations! You now have successfully created and tested an API with LoopBack 4. We hope you enjoy the test-drive. Your feedback matters and please share your thoughts with us.

This is just the beginning of the full LoopBack 4 developer experience. The first beta release lays out the new foundation of LoopBack for extension developers. It also demonstrates a path to create REST APIs from OpenAPI specs together with Controllers and Repositories. More features will be added in the coming weeks and months.

Here is a sneak peek of what's coming:

- More extensions and extension points an: [lopback-next issue #512](https://github.com/strongloop/loopback-next/issues/512)

- Authorization component: [loopback-next issue #538](https://github.com/strongloop/loopback-next/issues/538)

- Fully-fledged API explorer: [loopback-next issue #559](https://github.com/strongloop/loopback-next/issues/559)

- Complete repository/service story for backend interactions
  - [loopback-next issue #419](https://github.com/strongloop/loopback-next/issues/419)
  - [loopback-next issue #537](https://github.com/strongloop/loopback-next/issues/537)
  - [loopback-next issue #522](https://github.com/strongloop/loopback-next/issues/522)

- Declarative support for various constructs
  - [loopback-next issue #441](https://github.com/strongloop/loopback-next/issues/441)
  - [loopback-next issue #461](https://github.com/strongloop/loopback-next/issues/461)

- Alignment of microservices and cloud native experience
  - [loopback-next issue #442](https://github.com/strongloop/loopback-next/issues/442)
  - [loopback-next issue #25](https://github.com/strongloop/loopback-next/issues/25)

- Tooling: [loopback-next issue #361](https://github.com/strongloop/loopback-next/issues/361)

- Plain JavaScript: [loopback-next issue #560](https://github.com/strongloop/loopback-next/issues/560)

The train is moving and welcome on board! Your participation and contribution will make LoopBack 4 an even more powerful framework and greater community/ecosystem. The team is very excited about the new journey. We look forward to working with you on more ideas, more pull requests, and more extension modules. Let's make LoopBack 4 rock together!
