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

Here is a full example:

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

#### Create a stub Service

To be done. The initial Beta release does not include Services as a first-class feature.

### Unit-test your Controllers

### Unit-test your Models and Repositories

### Unit-test your Sequence

### Unit-test your Services

To be done. The initial Beta release does not include Services as a first-class feature. The following GitHub issues are tracking the related work:

 - Define services to represent interactions with REST APIs, SOAP Web Services, gRPC services, and more: [#522](https://github.com/strongloop/loopback-next/issues/522)
 - Guide: Services [#451](https://github.com/strongloop/loopback-next/issues/451)

## Integration testing

Integration tests are considered as "white-box" too. They use "inside-out" approach that tests how multiple units work together or with external services. Test doubles may be used to isolate tested units from external variables/state that's not part of the tested scenario.

### Use test data builders

### Test your Repositories against a real database

### Test your Controllers and Repositories together

### Test your Services against real backends

To be done, the initial Beta release does not include Services as a first-class feature.

## Acceptance testing

### Validate your OpenAPI specification

### Perform an auto-generated smoke test of your REST API

### Test your individual REST API endpoints


## EVERYTHING BELOW IS LEGACY AND SHOULD BE REMOVED BEFORE LANDING

Create an application that returns "hello world" for GET / requests.

Start by writing an acceptance test that ensures the application you're creating returns "hello world". Create the `test` directory and a file inside that looks like:

{% include code-caption.html content= "test/acceptance.js" %}
```js

const MyApp = require('../application');
const createHandler = require('@loopback/testlab').createClientForRestServer;
const expect = require('@loopback/testlab').expect;
const RestServer = require('@loopback/rest').RestServer;

describe('application', () => {
  let app;
  let client;
  before(createClient);
  after(stopApp);

  it('returns "hello world" for GET requests to /', async () => {
    const res = await client.get('/');
    expect(res.statusCode).to.eql(200);
    expect(res.text).to.eql('hello world');
  });

  // Create our supertest instance and start up the application (and server!)
  async function createClient() {
    app = new MyApp();
    const server = await app.getServer(RestServer);
    await app.start();
    client = await createHandler(server);
  }

  // Shut down the application and its server instance.
  async function stopApp() {
    await app.stop();
  }
});
```

Note:

1. You write the test first!
1. `@loopback/testlab` provides utilities to help with writing tests (`Client`, `expect`).
1. There is no `../application` file to import yet.

Try running it first to see what happens. In your console, run `npm test` and you should see:

```
...
Error: Cannot find module '../application'
```

So now create this file at the project root:

{% include code-caption.html content= "test/application.js" %}
```js
// npm install -S @loopback/core @loopback/rest
const Application = require('@loopback/core').Application;
const RestComponent = require('@loopback/rest').RestComponent;
const RestServer = require('@loopback/rest').RestServer;

class MyApp extends Application {
  constructor() {
    super({
      components: [RestComponent]
    });
  }

  async start() {
    const server = await this.getServer(RestServer);
    server.handler((sequence, request, response) => {
      sequence.send(response, 'hello world');
    });
    return await super.start();
  }
}

module.exports = MyApp;
```

When you run `npm test`, you should see:

```js
  application
    ✓ returns "hello world" for GET requests to /


  1 passing (8ms)
```

The side effect of writing the test first is you create a minimal application that meets the requirements (an app that responds with "hello world") as part of making the test pass. This gives you a way to verify what the application does now and ensure it keeps working this way in the future.

To summarize:

- Write the test first.
- Run the test immediately and make sure it fails (to prevent false positives).
- Watch the test fail (to prevent false positives).
- Create the minimal code (the application) to make the test pass.
- Re-run the tests to verify the application returns the expected outcome.
- Have something in place to prevent regressions.

## Unit testing

Note how the business logic of the application is coupled to the sequence.

1. The sequence has to send the same hard-coded "hello world" response for every request made to the application.
2. It's hard to test the business logic for the route in isolation.
3. It's hard to add new routes without modifying the sequence.

Now decouple the business logic from the sequence through some refactoring by
moving the hardcoded "hello world" to a controller
Start by writing a unit test:

{% include code-caption.html content= "test/controllers/greet-controller.js" %}
```js
// We'll keep our modules in a "src" folder, and put our controller in "controllers"!
const GreetController = require('../../src/controllers/greet.controller');
const expect = require('@loopback/testlab').expect;

describe('greet-controller', () => {
  describe('greet', () => {
    it('uses query param name in hello message', async () => {
      const ctrl = new GreetController();
      expect(await ctrl.greet('bob')).to.equal('hello bob');
    });
  });
});

```

Notes:

1. There is no mention of application or sequence anywhere.
1. The code to test this new library is very minimal (just ensure "hello world" is returned).

Run this code and see what happens:

```
...
Error: Cannot find module '../../src/controllers/greet.controller';
```

Great, you've seen the code fail. Fix this by implementing the `greet.controller.js` file:

{% include code-caption.html content= "src/controllers/greet.controller.js" %}
```js
const get = require('@loopback/rest').get;

class GreetController {
  constructor() {}

  async greet(name) {
    return `hello ${name || 'world'}`;
  }
}
module.exports = GreetController;
```

Run the tests again:

```
...
  routeHandler.greet(name)
    ✓ returns "hello bob"


  1 passing (7ms)
```

Now you can guarantee your `GreetController` returns the correct results as long
as you call the `greet()` function. The power of unit testing is that you can
test this in isolation, independent from the other moving parts of the
application. Now that you've extracted the business logic into a separate
library, we'll add an OpenAPI spec definition to wire up your controller
to the correct route!

{% include code-caption.html content="application.js" %}
```js
const Application = require('@loopback/core').Application;
const RestComponent = require('@loopback/rest').RestComponent;
const RestServer = require('@loopback/rest').RestServer;
const GreetController = require('./src/controllers/greet.controller');

class HelloWorldApp extends Application {
  constructor() {
    super({
      components: [RestComponent]
    });
    this.controller(GreetController);
  }

  async start() {
    const server = await this.getServer(RestServer);
    server.api(require('./src/apidef/swagger.json'));
    await super.start();
  }
}

module.exports = HelloWorldApp;
```

Here is the swagger.json that will hook up your `GreetController` to the
`/greet` path, and associate the `greet` function with a `GET` request.

{% include code-caption.html content="src/apidef/swagger.json" %}
```json
{
  "swagger": "2.0",
  "basePath": "/",
  "info": {
    "title": "Your First App",
    "version": "1.0"
  },
  "paths": {
    "/greet": {
      "get": {
        "parameters": [
          {
            "name": "name",
            "type": "string",
            "in": "query"
          }
        ],
        "responses": {
          "200": {
            "description": "greet successful"
          }
        },
        "x-controller-name": "GreetController",
        "x-operation-name": "greet"
      }
    }
  }
}
```

Now that we've changed it up a bit, we're going to modify our existing
application test so that it uses the `/greet` route for our first test,
and add an additional test to show that it works for custom names as well!

{% include code-caption.html content= "test/controllers/greet.test.js" %}
```js
const App = require('../application');
const createHandler = require('@loopback/testlab').createClientForRestServer;
const expect = require('@loopback/testlab').expect;
const RestServer = require('@loopback/rest').RestServer;

describe('application', () => {
  let app;
  let client;
  before(createClient);
  after(stopServer);

  it('returns "hello world" for GET requests to /greet', async () => {
    const res = await client.get('/greet');
    expect(res.statusCode).to.eql(200);
    expect(res.text).to.eql('hello world');
  });

  it('returns "hello bob" for GET requests to /greet?name=bob', async () => {
    const res = await client.get('/greet?name=bob');
    expect(res.statusCode).to.eql(200);
    expect(res.text).to.eql('hello bob');
  });

  async function createClient() {
    app = new App();
    const server = await app.getServer(RestServer);
    await app.start();
    client = await createHandler(server);
  }

  async function stopServer() {
    await app.stop();
  }
});

```

Notes:

1. You associated the `GreetController` with the app using `app.controller(GreetController)`.
This is not done on the server level because a controller may be used with multiple server
instances, and types!
1. You let the application know when to invoke the `greet` by defining your
REST server's OpenAPI spec with `server.api(require('./src/apidef/swagger.json'))`.
The spec itself lets the RestServer's router reads the `x-controller-name` and
`x-method-name` properties of each route and verb to match up requests with
their handler functions.

Run the tests again via `npm test` again to make sure you didn't break anything!

```
  application
    ✓ returns "hello world" for GET requests to /greet
    ✓ returns "hello bob" for GET requests to /greet?name=bob

  greet-controller
    greet
      ✓ uses query param name in hello message

  3 passing (74ms)
```

As you can see from the example, you could "safely" refactor your code (extract out the hard-coded "hello world" into a separate library) by ensuring the application behaves in the exact same way (thanks to the acceptance test to confirm this). The unit test  ensured the `GreetController` returned results in an expected way, independent of the application or sequence.

Takeaways:

1. Always write the tests first.
1. Run the tests immediately and make sure they fail (to prevent false positives).
1. Unit tests are good enough to ensure isolated code works alone.
1. Acceptance tests help ensure everything continues to work together (and to ensure you don't accidentally break or change existing functionality).

<!-- The code for this example is available at [[examples/unit-testing]]. -->

## Integration testing

While acceptance tests and unit tests get you most of the way there, sometimes you only want to test a few units together in isolation. As long as those units together, you can be fairly sure the entire application will continue to work as expected.

In our previous example, we created a `GreetController` with a `greet` function
to handle the route, but we've coupled our logic with the controller!
First, let's make a more interesting set of requirements for our `/greet`
endpoint:

- We want the endpoint to be able to say "good morning", "good afternoon",
"good evening" and "good night", based on a given time of day (timeOfDay).
- We also want the greeter to be able to do this with the provided name, or
fallback on "world" if none is given!
- It should greet with "hello" if no timeOfDay is given.
- It should add a comma if the greeting is not "hello".

Examples:
```
 GET /greet?timeOfDay=afternoon&name=bob => "good afternoon, bob"
 GET /greet?timeOfDay=morning ==> "good morning, world"
 GET /greet?timeOfDay=evening&name=sarah=> "good evening, sarah"
 GET /greet ==> hello, world!
 // etc...
```

Yikes! That's a lot of cases! If we were to put all of this logic into our
controller, it would quickly become a big mess.

We can split up these requirements into two major sections:
- A set of functions that take the known values like name, timeOfDay and
return greetings
- Handling logic that determines _which_ function to call based on what
we receive from the request

To that end, we'll create a test for a Greeter class that does the parsing of
the inputs into greetings, and then create the Greeter class!

{% include code-caption.html content= "test/util/greeter.test.js" %}
```js
const Greeter = require('../../src/util/greeter');
const expect = require('@loopback/testlab').expect;

describe('greeter', () => {
  const greeter = new Greeter();
  function testGreeterFunctions(fn, name, expected) {
    it(`${fn.name} prints ${expected}`, () => {
      expect(greeter[fn](name)).to.equal(expected);
    });
  }
  // So many cases!
  testGreeterFunctions('morning', null, 'good morning, world');
  testGreeterFunctions('afternoon', null, 'good afternoon, world');
  testGreeterFunctions('evening', null, 'good evening, world');
  testGreeterFunctions('night', null, 'good night, world');

  testGreeterFunctions('morning', 'bob', 'good morning, bob');
  testGreeterFunctions('afternoon', 'bob', 'good afternoon, bob');
  testGreeterFunctions('evening', 'bob', 'good evening, bob');
  testGreeterFunctions('night', 'bob', 'good night, bob');

  it('greet prints hello, world', () => {
    expect(greeter.greet()).to.equal('hello world');
  });
  it('greet prints hello, bob', () => {
    expect(greeter.greet(null, 'bob')).to.equal('hello bob');
  });
});
```

Don't forget to run `npm test`! Making sure that your tests are actually
checking something that will fail without code is important!

Now, let's make them pass!

{% include code-caption.html content= "src/util/greeter.js" %}
```js
class Greeter {
  constructor() {}
  morning(name) {
    return this.greet('good morning', name);
  }

  afternoon(name) {
    return this.greet('good afternoon', name);
  }

  evening(name) {
    return this.greet('good evening', name);
  }

  night(name) {
    return this.greet('good night', name);
  }

  greet(prefix, name) {
    return `${prefix ? prefix + ',' : 'hello'} ${name || 'world'}`;
  }
}

module.exports = Greeter;
```

Run your tests again!

```
  application
    ✓ returns "hello world" for GET requests to /greet (40ms)
    ✓ returns "hello bob" for GET requests to /greet?name=bob

  greet-controller
    greet
      ✓ uses query param name in hello message

  greeter
    ✓ morning prints good morning, world
    ✓ afternoon prints good afternoon, world
    ✓ evening prints good evening, world
    ✓ night prints good night, world
    ✓ morning prints good morning, bob
    ✓ afternoon prints good afternoon, bob
    ✓ evening prints good evening, bob
    ✓ night prints good night, bob
    ✓ greet prints hello, world
    ✓ greet prints hello, bob


  13 passing (86ms)
```

Great! Now that we've got our Greeter class, we can transform our
`GreetController` so that it can deal with deciding _which_ functions to call
on our Greeter!

First, we start with the tests (again, run them when you're done!)

{% include code-caption.html content= "test/controllers/greet.test.js" %}
```js
const GreetController = require('../../src/controllers/greet.controller');
const expect = require('@loopback/testlab').expect;

describe('greet-controller', () => {
  describe('greet', () => {
    const ctrl = new GreetController();
    function greetTest(test, timeOfDay, name, expected) {
      it(`${test} should return ${expected}`, async () => {
        expect(await ctrl.greet(timeOfDay, name)).to.equal(expected);
      });
    }

    greetTest('no params', null, null, 'hello world');
    greetTest('name "bob"', null, 'bob', 'hello bob');

    greetTest('timeOfDay "morning"', 'morning', null, 'good morning, world');
    greetTest('timeOfDay "afternoon"', 'afternoon', null, 'good afternoon, world');
    greetTest('timeOfDay "evening"', 'evening', null, 'good evening, world');
    greetTest('timeOfDay "night"', 'night', null, 'good night, world');

    greetTest('timeOfDay "morning"', 'morning', 'bob', 'good morning, bob');
    greetTest('timeOfDay "afternoon"', 'afternoon', 'bob', 'good afternoon, bob');
    greetTest('timeOfDay "evening"', 'evening', 'bob', 'good evening, bob');
    greetTest('timeOfDay "night"', 'night', 'bob', 'good night, bob');
  });
});

```

Next, the class itself:

{% include code-caption.html content= "src/controllers/greet.controller.js" %}
```js
const Greeter = require('../util/greeter');
const get = require('@loopback/rest').get;

class GreetController {
  constructor() {
    this.greeter = new Greeter();
  }

  async greet(timeOfDay, name) {
    switch (timeOfDay) {
      case 'morning':
        return this.greeter.morning(name);
      case 'afternoon':
        return this.greeter.afternoon(name);
      case 'evening':
        return this.greeter.evening(name);
      case 'night':
        return this.greeter.night(name);
      default:
        return this.greeter.greet(null, name);
    }
  }
}
module.exports = GreetController;
```

After running your tests again, everything should be green!

You are now testing **two** units together (without any references or dependence
on the application or sequence). This allows you to make specific parts of your
system more robust by picking a few units and providing additional tests to
address your concerns.

That said, just because the two units above work together, it doesn't mean the
application still works as a whole. You still need to modify your acceptance
test to make sure regressions weren't introduced as part of refactoring, and to
add some new logic to cover the new functionality.

{% include code-caption.html content="test/application.test.js" %}
```js
const App = require('../application');
const createHandler = require('@loopback/testlab').createClientForRestServer;
const expect = require('@loopback/testlab').expect;
const RestServer = require('@loopback/rest').RestServer;

describe('application', () => {
  let app;
  let client;
  before(createClient);
  after(stopServer);

  it('returns "hello world" for GET requests to /greet', async () => {
    const res = await client.get('/greet');
    expect(res.statusCode).to.eql(200);
    expect(res.text).to.eql('hello world');
  });

  it('returns "hello bob" for GET requests to /greet?name=bob', async () => {
    const res = await client.get('/greet?name=bob');
    expect(res.statusCode).to.eql(200);
    expect(res.text).to.eql('hello bob');
  });

  it('returns "good morning, world" for GET requests to /greet?timeOfDay=morning', async () => {
    const res = await client.get('/greet?timeOfDay=morning');
    expect(res.statusCode).to.eql(200);
    expect(res.text).to.eql('good morning, world');
  });

  it('returns "good morning, bob" for GET requests to /greet?timeOfDay=morning&name=bob', async () => {
    const res = await client.get('/greet?timeOfDay=morning&name=bob');
    expect(res.statusCode).to.eql(200);
    expect(res.text).to.eql('good morning, bob');
  });

  // There are many, many more tests to add here, but we'll omit them
  // for brevity.

  async function createClient() {
    app = new App();
    const server = await app.getServer(RestServer);
    await app.start();
    client = await createHandler(server);
  }

  async function stopServer() {
    await app.stop();
  }
});

```

Run tests to make sure everything works as expected:

```
  application
    ✓ returns "hello world" for GET requests to /greet
    ✓ returns "hello bob" for GET requests to /greet?name=bob
    ✓ returns "good morning, world" for GET requests to /greet?timeOfDay=morning
    ✓ returns "good morning, bob" for GET requests to /greet?timeOfDay=morning&name=bob

  greet-controller
    greet
      ✓ no params should return hello world
      ✓ name "bob" should return hello bob
      ✓ timeOfDay "morning" should return good morning, world
      ✓ timeOfDay "afternoon" should return good afternoon, world
      ✓ timeOfDay "evening" should return good evening, world
      ✓ timeOfDay "night" should return good night, world
      ✓ timeOfDay "morning" should return good morning, bob
      ✓ timeOfDay "afternoon" should return good afternoon, bob
      ✓ timeOfDay "evening" should return good evening, bob
      ✓ timeOfDay "night" should return good night, bob

  greeter
    ✓ morning prints good morning, world
    ✓ afternoon prints good afternoon, world
    ✓ evening prints good evening, world
    ✓ night prints good night, world
    ✓ morning prints good morning, bob
    ✓ afternoon prints good afternoon, bob
    ✓ evening prints good evening, bob
    ✓ night prints good night, bob
    ✓ greet prints hello, world
    ✓ greet prints hello, bob


  24 passing (87ms)
```

Takeaways:

1. Write the test first.
1. Run the tests immediately and make sure it fails (to prevent false positives).
1. Add integration tests to ensure compatibility between multiple units in your application.
1. Integration tests do not guarantee your application still works as a whole (only the units under test), you still need acceptance tests!
1. Easier to set up and get going than acceptance tests.

## Conclusion

That's all there is to it. To summarize the entire process:

1. Write a failing acceptance test.
1. Write just enough code to make it pass.
1. Write a failing unit test(s).
1. Write just enough code to make it pass.
1. Continue writing unit tests until satisfied.
1. Write integration tests to ensure compatibility between multiple units.
1. Write just enough code to make it pass.
1. Continue writing integration tests until satisfied.
1. Run the acceptance test to ensure everything continues to work together as a whole.

The combination of all the testing above will ensure your application is robust and production ready! You've now completed the basics of testing your LoopBack-next application.

For more in-depth recommendations and advanced testing topics, see [Testing Your Application (Advanced)](Testing-your-app-advanced.html).
