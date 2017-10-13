---
lang: en
title: 'Testing your application'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Testing-your-application.html
summary:
---

## Overview

An automated test suite is important to ensure your application works as expected, prevent regressions as new features are added and give you confidence to refactor your codebase to keep it easy to further modify.

Thorough automated testing:
- Prevents regressions from new features/bug fixes (code introductions and refactorings) (after deployment)
- Helps new and existing developers understand different parts of the codebase (knowledge sharing)
- Speeds up development over the long run (the code writes itself!)
- And much more. See [benefits of software testing](http://lmgtfy.com/?q=benefits+of+software+testing)

Please refer to [Thinking in LoopBack](./Thinking-in-LoopBack.html) for an introductory text that explains high-level concepts of automated testing in [Define your testing strategy](./Thinking-in-LoopBack.html#define-your-testing-strategy) and provides a step-by-step tutorial in [Incrementally implement features](Thinking-in-LoopBack.html#incrementally-implement-features).

{% include important.html content="A great test suite requires you to think smaller and favor fast, focused unit-tests over slow application-wide end-to-end tests
" %}

## Types of tests

We encourage writing tests from a few perspectives, mainly [black-box testing](https://en.wikipedia.org/wiki/Black-box_testing) (acceptance) and [white-box testing](https://en.wikipedia.org/wiki/White-box_testing) (integration and unit). Tests are usually written using typical patterns such as [`act/arrange/assert`](https://msdn.microsoft.com/en-us/library/hh694602.aspx#Anchor_3) or [`given/when/then`](https://martinfowler.com/bliki/GivenWhenThen.html). While both styles work well, just pick one that you're comfortable with and start writing tests!

The rest of this page contains a reference manual explaining how to write different types of tests.

## Project setup

An automated test suite requires a test runner - a tool that can execute all your tests and produce a test report. We use and recommend [Mocha](https://mochajs.org).

In addition to a test runner, tests need various utilities like an assertion library (we recommend [Should.js](https://shouldjs.github.io)), a library for making HTTP calls and verifying their results (we recommend [supertest](https://github.com/visionmedia/supertest)), a library for creating Test doubles (we recommend [Sinon.JS](http://sinonjs.org/)). While it's possible to install all these tools individually, we found that a good setup requires additional glue to integrate all these individual tools into something that's easy to use. Especially when writing the tests in TypeScript, due to relatively lower quality of official type definitions. We have addressed all these needs by creating our own swiss-army-knife module for testing called [@loopback/testlab](https://www.npmjs.com/package/@loopback/testlab).

### Setup testing infrastructure with LoopBack CLI

{% include note.html content="Currently the LoopBack CLI does not yet support LoopBack 4.
" %}

If you are just getting started with LoopBack, use the LoopBack command-line tool (CLI)  `loopback-cli`. It's ready to use and installs simply by `npm install -g loopback-cli`. You don't need to do any extra steps for setup, and can head straight to the [next section](Testing-Your-Application#acceptance-testing.html).

### Setup testing infrastructure manually

If you have an existing application you'll need to install `mocha` and `@loopback/testlab` to make everything work well together.

```
npm install --save-dev mocha @loopback/testlab
```

Your `package.json` should look something like:

```js
{
  // ...
  "devDependencies": {
    "@loopback/testlab": "^<current-version>",
    "mocha": "^<current-version>"
  },
  "scripts": {
    "test": "mocha"
  }
  // ...
}
```

## Data handling

Tests accessing a real database often require pre-existing data (e.g. a method listing all products need some products to exist in the database) and/or need to create new model instances with valid data (e.g a method creating a new product need to know how to fill in all required properties). There are various approaches for solving these two problems, many of them unfortunately make the test suite difficult to understand, difficult to maintain and prone to test failures unrelated to the changes made.

Based on our experience, we recommend the following approach.

### Clean the database before each test

Always start with a clean database before each test. This may seem counter-intuitive: why not reset the database after the test has finished? When a test fails and the database is cleaned after the test has finished, then it's difficult to observe what was stored in the database, why the test failed. When the database is cleaned in the beginning, then any failing test will leave the database exactly in the state that caused the test to fail.

This is typically achieved by setting up a `beforeEach` hook calling a helper method to clean the database.


```ts
// test/helpers/database.helpers.ts

export async function givenEmptyDatabase() {
  await new ProductRepository().deleteAll();
  await new CategoryRepository().deleteAll();
}

// in your test file
describe('ProductController (integration)', () => {
  before(givenEmptyDatabase);
  // etc.
});
```

### Use Test Data Builders

Avoid duplicating code for creating model data with all required properties filled in, use shared [test data builders](http://www.natpryce.com/articles/000714.html) instead. This is allow tests to provide only a small subset of properties that are strictly required by the tested scenario, which is important for multiple reasons:

1. It makes tests easier to understand, because it’s immediately clear what model properties are relevant to the test. If the test was setting all required properties, it would be difficult to tell whether some of those properties may be actually relevant to the tested scenario.

2. It makes tests easier to maintain. As our data model evolves, we will eventually need to add more required properties. If the tests were building model instance data manually, we would have to fix all tests to set the new required property. With a shared helper, there is only a single place where to add a value for the new required property.

See [@loopback/openapi-spec-builder](https://www.npmjs.com/package/@loopback/openapi-spec-builder) for an example showing how to apply this design pattern for building OpenAPI Spec documents.

In practice, a rich method-based API may be an overkill and a simple function that adds missing required properties is good enough.

```ts
export function givenProductData(data: Partial<Product>) {
  return Object.assign({
    name: 'a-product-name',
    slug: 'a-product-slug',
    price: 1,
    description: 'a-product-description',
    available: true,
  }, data);
}

export async function givenProduct(data: Partial<Product>) {
  return await new ProductRepository().create(
    givenProductData(data));
}
```

### Avoid sharing the same data for multiple tests

It may be tempting to define a small set of data that can be shared by all tests. For example, in a e-commerce application, we may pre-populate the database with few categories, some products, an admin user and a regular user (a customer). Such approach has several downsides:

- When trying to understand any individual test, it's difficult to tell what part of the pre-populated data is essential for the test and what's irrelevant. For example, in a test checking the method counting the number of products in a given category using a pre-populated category "Stationery", is it important that "Stationery" contains nested sub-categories or is that fact irrelevant? If it's irrelevant, then what are the other tests that depend on it?

- As the application grows and new features are added, it's easier to add more properties to existing model instances rather than create new instances using only properties required by the new features. For example, when adding a category image, it's easier to add image to an existing category "Stationery" and perhaps keep another category "Groceries" without any image, rather than create two new categories "CategoryWithAnImage" and "CategoryMissingImage". This further amplifies the previous problem, because it's not clear that "Groceries" is the category that should be used by tests requiring a category with no image - the category name does not provide any hints on that.

- As the shared dataset grows (together with the application), the time required to bring the database into initial state grows too. Instead of running few "DELETE ALL" queries before each test (which is relatively fast), we may end up with running tens to hundreds different commands creating different model instances, triggering slow index rebuilds along the way, and considerably slowing the test suite as a result.

Use the test data builders described in the previous section to populate your database with the data specific to your test only.

Using the e-commerce example described above, this is how integration tests for the CategoryRepository can look like:

```ts
describe('Category (integration)', () => {
  beforeEach(givenEmptyDatabase);

  describe('countProducts()', () => {
    it('returns correct count for an empty', async () => {
      const category = await givenCategory();
      const count = await category.countProducts();
      expect(count).to.equal(0);
    });

    // etc.

    it('includes products in subcategories', async () => {
      const category = await givenCategory({
        products: [await givenProduct()],
        subcategories: [
          givenCategory({
            products: [await givenProduct()]
          })
        ],
      });

      const count = await category.countProducts();
      expect(count).to.equal(2);
    });
  });
});
```

Write higher-level helpers to share the code for re-creating common scenarios. For example, if your application has two kinds of users (admins and customers), then you may write the following helpers to simplify writing acceptance tests checking access control:

```ts
async function givenAdminAndCustomer() {
  return {
    admin: await givenUser({role: Roles.ADMIN}),
    customer: await givenUser({role: Roles.CUSTOMER}),
  };
}
```

## Unit testing

Unit tests are considered as "white-box". They use "inside-out" approach, where the test knows all about the internals and controls all the variables of the system under test. Individual units are tested in isolation, their dependencies are replaced with [Test doubles](https://en.wikipedia.org/wiki/Test_double).

### Use test doubles

Test doubles are functions or objects that look and behave like the real variants used in production, but are actually simplified versions giving the test more control of the behavior. For example, reproducing the situation where reading from a file failed because of a hard-drive error is pretty much impossible, unless we are using a test double that's simulating file-system API and giving us control of how what each call returns.

[Sinon.JS](http://sinonjs.org/) has become the de-facto standard for Test doubles in Node.js and JavaScript/TypeScript in general. We recommend our users to leverage this library, our `@loopback/testlab` package comes with Sinon preconfigured with TypeScript type definitions and integrated with Should.js assertions.

There are three kinds of Test doubles provided by Sinon.JS:

- [Test spies](http://sinonjs.org/releases/v4.0.1/spies/) are functions that record arguments, return value, the value of `this` and exception thrown (if any) for all its calls. There are two types of spies: Some are anonymous functions, while others wrap methods that already exist in the system under test.

- [Test stubs](http://sinonjs.org/releases/v4.0.1/stubs/) are functions (spies) with pre-programmed behavior. As spies, stubs can be either anonymous, or wrap existing functions. When wrapping an existing function with a stub, the original function is not called.

- [Test mocks](http://sinonjs.org/releases/v4.0.1/mocks/)  (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as pre-programmed expectations. A mock will fail your test if it is not used as expected.

{% include note.html content="We recommend against using test mocks. With test mocks, the expectations must be defined before the tested scenario is executed, which breaks the recommended test layout 'arrange-act-assert' (or  'given-when-then') and produces code that's difficult to comprehend.
" %}

#### Create a stub Repository

When writing an application accessing data in a database, it's a best practice to use [Repositories](./Repositories.html) to encapsulate all data-access/persistence-related code and let other parts of the application (typically [Controllers](./Controllers.html)) to depend on these Repositories for data access. In order to test Repository dependants (e.g. Controllers) in isolation, we need to provide a test double, usually as a test stub.

In traditional object-oriented languages like Java or C#, in order to allow the unit tests to provide a custom implementation of the repository API, the controller needs to depend on an interface describing the API, and the repository implementation needs to implement this interface. The situation is easier in JavaScript and TypeScript. Thanks to the dynamic nature of the language, it’s possible to mock/stub entire classes.

Creating a test double for a repository class is very easy with Sinon.JS' utility function `createStubInstance`. It's important to create a new stub instance for each unit test in order to prevent unintended re-use of pre-programmed behaviour between (unrelated) tests.

```ts
describe('ProductController', () => {
  let repository: ProductRepository;
  beforeEach(givenStubbedRepository);

  // your unit tests

  function givenStubbedRepository() {
    repository = sinon.createStubInstance(ProductRepository);
  }
});
```

In your unit-tests, you will usually want to program the behavior of stubbed methods (what should they return) and then verify that the Controller (unit under test) called the right method with the correct arguments.

Configure stub's behavior at the beginning of your unit-test (in the "arrange" or "given" section):

```ts
// repository.find() will return a promise that
// will be resolved with the provided array
const findStub = repository.find as sinon.SinonStub;
findStub.resolves([{id: 1, name: 'Pen'}]);
```

Verify how was the stubbed method executed at the end of your unit-test (in the "assert" or "then" section):

```ts
// expect that repository.find() was called with the first
// argument deeply-equal to the provided object
expect(findStub).to.be.calledWithMatch({where: {id: 1}});
```

See [Unit test your controllers](#unit-test-your-controllers) for a full example.

#### Create a stub Service

To be done. The initial Beta release does not include Services as a first-class feature.

### Unit-test your Controllers

When unit testing, we usually want to test the smallest piece of code possible in isolation. This is to ensure other variables and state changes are not polluting our result. A typical unit-test creates a controller instance with dependencies replaced by test doubles and directly calls the tested method. In the example below, we give the controller a stub implementation of its repository dependency, see [Create a stub repository](#create-a-stub-repository) for a detailed explanation, and then ensure the controller called repository's `find()` method with a correct query and returned back the query results.

```ts
// test/controllers/product.controller.unit.ts
import {ProductController, ProductRepository} from '../..';
import {expect, sinon} from '@loopback/testlab';

describe('ProductController (unit)', () => {
  let repository: ProductRepository;
  beforeEach(givenStubbedRepository);

  describe('getDetails()', () => {
    it('retrieves details of a product', async () => {
      const controller = new ProductController(repository);
      const findStub = repository.find as sinon.SinonStub;
      findStub.resolves([{id: 1, name: 'Pen'}]);

      const details = await controller.getDetails(1);

      expect(details).to.containDeep({name: 'Pen'});
      expect(findStub).to.be.calledWithMatch({where: {id: 1}});
    });
  });

  function givenStubbedRepository() {
    repository = sinon.createStubInstance(ProductRepository);
  }
});
```


### Unit-test your Models and Repositories

In a typical LoopBack appliction, models and repositories are relying mostly on the behavior provided by the framework (`@loopback/repository` package) and there is no need to test the LoopBack's built-in functionality unit-test level (the functionality has been already verified by the tests in the framework). What does need new unit-tests is any additional application-specific API.

For example, if our `Person` Model has properties `firstname`, `middlename` and `surname` and provides a function to obtain the full name, then we should write unit tests to verify the implementation of this additional method.

Remember to use [Test data builders](#use-test-data-builders) whenever you need a valid data to create a new model instance.

```ts
// test/unit/models/person.model.unit.ts
import {Person} from '../../models/person.model'
import {givenPersonData} from '../helpers/database.helpers'
import {expect} from '@loopback/testlab';

describe('Person (unit)', () => {
  // we recommend to group tests by method names
  describe('getFullName()', () => {
    it('uses all three parts when present', () => {
      const person = givenPerson({
        firstname: 'Jane',
        middlename: 'Smith',
        surname: 'Brown'
      }));

      const fullName = person.getFullName();
      expect(fullName).to.equal('Jane Smith Brown');
    });

    it('omits middlename when not present', () => {
      const person = givenPerson({
        firstname: 'Mark',
        surname: 'Twain'
      }));

      const fullName = person.getFullName();
      expect(fullName).to.equal('Mark Twain');
    });
  });

  function givenPerson(data: Partial<Person>) {
    return new Person(givenPersonData(data));
  }
});
```

Writing a unit test for a custom Repository methods is not straightforward because `CrudRepositoryImpl` is based on legacy loopback-datasource-juggler that was not designed with Dependency Injection in mind. We are recommending to use integration tests to verify the implementation of custom Repository methods, see [Test your Repositories against a real database](#test-your-repositories-against-a-real-database) in [Integration Testing](#integration-testing).

### Unit-test your Sequence

While it's possible to test a custom Sequence class in isolation, we think it's better to rely on acceptance-level tests in this exceptional case. The reason is that a custom Sequence class typically has many dependencies (which makes test setup too long and complex), and at the same time it provides very little functionality on top of the injected sequence actions. Bugs are much more likely to caused by the way how the real sequence action implementations interact together (which is not covered by unit tests), instead of the sequence code itself (which is the only thing covered).

See [Test Sequence customizations](#test-sequence-customizations) in [Acceptance Testing](#acceptance-testing).

### Unit-test your Services

To be done. The initial Beta release does not include Services as a first-class feature. The following GitHub issues are tracking the related work:

 - Define services to represent interactions with REST APIs, SOAP Web Services, gRPC services, and more: [#522](https://github.com/strongloop/loopback-next/issues/522)
 - Guide: Services [#451](https://github.com/strongloop/loopback-next/issues/451)

## Integration testing

Integration tests are considered as "white-box" too. They use "inside-out" approach that tests how multiple units work together or with external services. Test doubles may be used to isolate tested units from external variables/state that's not part of the tested scenario.

### Test your repositories against a real database

There are two common reasons for adding repository tests:
 - Your models are using advanced configuration, e.g custom column mapping, and you want to verify this configuration is correctly picked up by the framework.
 - Your repositories have additional methods

Integration tests are one of the places where to put the best practices in [Data handling](#data-handling) to work:

 - clean the database before each test
 - use test data builders
 - avoid sharing the same data for multiple tests

Here is an example showing how to write an integration test for a custom repository method `findByName`:

```ts
// tests/integration/repositories/category.repository.integration.ts
import {givenEmptyDatabase} from '../../helpers/database.helpers.ts';

describe('CategoryRepository (integration)', () => {
  beforeEach(givenEmptyDatabase);

  describe('findByName(name)', () => {
    it('return the correct category', async () => {
      const stationery = await givenCategory({name: 'Stationery'});
      const groceries = await givenCategory({name: 'Groceries'});
      const repository = new CategoryRepository();

      const found = await repository.findByName('Stationery');

      expect(found).to.deepEqual(stationery);
    });
  });
});
```

### Test your Controllers and Repositories together

Integration tests running your controllers with real repositories are important to verify that your controllers are using repository API correctly, that the commands and queries produce expected results when executed on a real database. These tests are similar to repository tests, we are just adding controllers as another ingredient.

```ts
import {ProductController, ProductRepository, Product} from '../..';
import {expect} from '@loopback/testlab';
import {givenEmptyDatabase, givenProduct} from '../helpers/database.helpers';

describe('ProductController (integration)', () => {
  beforeEach(givenEmptyDatabase);

  describe('getDetails()', () => {
    it('retrieves details of the given product', async () => {
      const inkPen = await givenProduct({name: 'Pen', slug: 'pen'});
      const pencil = await givenProduct({name: 'Pencil', slug: 'pencil'});
      const controller = new ProductController(new ProductRepository());

      const details = await controller.getDetails('pen');

      expect(details).to.eql(pencil);
    });
  });
});
```

### Test your Services against real backends

To be done, the initial Beta release does not include Services as a first-class feature.

## Acceptance testing

Acceptance tests are considered as "black-box". They use "outside-in" approach where you do not know about the internals of the system, just simply do the same actions (send the same HTTP requests) as the clients and consumers of your API will do, and verify the results returned by the system under test are matching the expectations.


Typically, acceptance tests start the application, make HTTP requests to the server, and verify the returned response. Internally in LoopBack, we are using [supertest](https://github.com/visionmedia/supertest) to make the test code executing HTTP requests and verifying responses easier to write and read.
Remember to follow the best practices from [Data handling](#data-handling) when setting up your database for tests:

 - clean the database before each test
 - use test data builders
 - avoid sharing the same data for multiple tests

### Validate your OpenAPI specification

OpenAPI specification is a corner-stone of applications building REST APIs, it enables API consumers to leverage a whole ecosystem of related tooling. To make the spec useful, we must ensure it's a valid OpenAPI Spec document, ideally in an automated way that's an integral part of regular CI builds. LoopBack's [testlab](https://www.npmjs.com/package/@loopback/testlab) module provides a helper method `validateApiSpec` that builds on top of popular [swagger-parser](https://www.npmjs.com/package/swagger-parser) package.

Example usage:

```ts
// test/acceptance/api-spec.acceptance.ts
import {validateApiSpec} from '@loopback/testlab';
import {HelloWorldApp} from '../..';
import {RestServer} from '@loopback/rest';

describe('API specification', () => {
  it('api spec is valid', async () => {
    const app = new HelloWorldApp();
    const server = await app.getServer(RestServer);
    const spec = server.getApiSpec();
    await validateApiSpec(apiSpec);
  });
});
```

### Perform an auto-generated smoke test of your REST API

The formal validity of your application's spec does not guarantee that your implementation is actually matching the specified behavior. To keep your spec in sync with your implementation, you should use an automated tool like [Dredd](https://www.npmjs.com/package/dredd) to run a set of smoke tests to verify conformance of your app with the spec.

Automated testing tools usually require little hints in your specification to tell them how to create valid requests or what response data to expect. Dredd in particular relies on response [examples](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#exampleObject) and request parameter [x-example](http://dredd.org/en/latest/how-to-guides.html#example-values-for-request-parameters) fields. Extending your API spec with examples is good thing on its own, developers consuming your API will find them useful too.

Here is an example showing how to run Dredd to test your API against the spec:

```ts
// test/acceptance/api.acceptance.test.ts
describe('API (acceptance)', () => {
  let dredd: any;
  before(initEnvironment);

  it('conforms to the specification', done => {
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

  async function initEnvironment() {
    const app = new HelloWorldApp();
    const server = app.getServer(RestServer);
    // For testing, we'll let the OS pick an available port by setting
    // RestBindings.PORT to 0.
    server.bind(RestBindings.PORT).to(0);
    // app.start() starts up the HTTP server and binds the acquired port
    // number to RestBindings.PORT.
    await app.start();
    // Get the real port number.
    const port = await server.get(RestBindings.PORT);
    const baseUrl = `http://localhost:${port}`;
    const config: object = {
      server: baseUrl, // base path to the end points
      options: {
        level: 'fail', // report 'fail' case only
        silent: false, // false for helpful debugging info
        path: [`${baseUrl}/swagger.json`], // to download apiSpec from the service
      }
    };
    dredd = new Dredd(config);
  });
})
```

The user experience is not as great as we would like it, we are looking into better solutions - see [GitHub issue #644](https://github.com/strongloop/loopback-next/issues/644). Let us know if you can recommend one!

### Test your individual REST API endpoints

You should have at least one acceptace (end-to-end) test for each of your REST API endpoints. Consider adding more tests if your endpoint depends on (custom) sequence actions to modify the behaviour when the corresponding controller method is invoked via REST, compared to behaviour observed when the controller method is invoked directly via JavaScript/TypeScript API. For example, if your endpoint returns different response to regular users and to admin users, then you should have two tests - one test for each user role.

Here is an example of an acceptance test:

```ts
// test/acceptance/product.acceptance.ts
import {HelloWorldApp} from '../..';
import {RestBindings, RestServer} from '@loopback/rest';
import {expect, supertest} from '@loopback/testlab';
import {givenEmptyDatabase, givenProduct} from '../helpers/database.helpers';

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

  async function givenRunningApp() {
    app = new HelloWorldApp();
    const server = await app.getServer(RestServer);
    server.bind(RestBindings.PORT).to(0);
    await app.start();

    const port: number = await server.get(RestBindings.PORT);
    request = supertest(`http://127.0.0.1:${port}`);
  }
});
```

### Test Sequence customizations

Custom sequence behavior is best tested by observing changes in behavior of affected endpoints. For example, if your sequence involves authentication step that rejects anonymous requests for certain endpoints, then you can write a test making an anonymous request to such endpoint to verify that it's correctly rejected. These tests are esssentially the same as the test verifying implementation of individual endpoints as described in the previous section.


