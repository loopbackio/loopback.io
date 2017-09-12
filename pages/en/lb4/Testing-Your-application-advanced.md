---
lang: en
title: 'Testing your application (advanced)'
keywords: LoopBack 4.0, LoopBack-Next
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Testing-your-app-advanced.html
summary:
---

## Dependency injection

Dependency Injection is a technique where the construction of dependencies of a class or function is separated from its behavior, in order to keep the code loosely coupled. See [[Dependency Injection]] for a longer introduction.

- Introduce TypeScript as it is needed here to get the benefits of DI via decorators
- Build on top of the last step of the hello world application
- Inject the routeHandler in the constructor
- Introduce about test doubles (spies, stubs)
- Swap the routeHandler with a stub (also mention stub is also a spy)
- Go into mocking, swap the routeHandler with mockHandler

## Overview

Testing is important to ensure your apps work as expected (before deployment).

Thorough testing:
- Prevents regressions for new features/bug fixes (code introductions and refactorings) (after deployment)
- Helps new and existing users understand different parts of the codebase (knowledge sharing)
- Speeds up development over the long run (the code writes itself!)
- And much more. See [benefits of software testing](http://lmgtfy.com/?q=benefits+of+software+testing)

## Types of tests

We encourage writing tests from a few perspectives, mainly [black-box testing](https://en.wikipedia.org/wiki/Black-box_testing) (acceptance) and [white-box testing](https://en.wikipedia.org/wiki/White-box_testing) (integration and unit). Tests are usually written using typical patterns such as [`act/arrange/assert`](https://msdn.microsoft.com/en-us/library/hh694602.aspx#Anchor_3) or [`given/when/then`](https://martinfowler.com/bliki/GivenWhenThen.html). While both styles work well, just pick one that you're comfortable with and start writing tests! Let's compare some types of software testing you'll encounter when building LoopBack-next apps:

### Acceptance testing

- Black-box
- Can be thought of as an "outside-in" approach (you do not know about the internals of the system, just simply do what you intend to do in a production app and verify the results returned by the system under test)

```js
// arrange
const Application = require('@loopback/core').Application;
const http = require('http');
const request = require('request');
const app = new Application();
http.createServer(app.handleHttp).listen(3000);
// act
request.get('/hello-world').on('response', (response) => {
  // assert
  expect(response.statusCode).to.equal(200);
});
```

In this case, we set up all things need to get a server up an running, then make a request to the server, and ensure the response is equal to what we expect. We do not care about how the application returns the response, as long as the response is what we expect (ie. HTTP 200).

### Unit testing

- White-box
- Can be thought of as an "inside-out" approach (you know all about the internals and control all the variables of the system under test)
- Used to test independent parts of an application in isolation
- [Test doubles](https://en.wikipedia.org/wiki/Test_double) are typically used to help ensure the isolation

```js
// my-controller.js - an independent "unit" we want to test in insolation
class MyController {
  helloWorld() {
    return 'Hello world!';
  }
}
// arrange
const myController = require('my-controller');
// act
const myController = new Controller();
// assert
expect(myController.helloWorld()).to.equal('Hello world!');
```

When unit testing, we usually want to test the smallest piece of code possible in isolation. This is to ensure other variables and state changes are not polluting our results. In this case, we are simply ensuring that a controller we created returns `Hello world!` when the controller's `helloWorld()` method is called. In this case, we know all about the internals of the controller and should modify the internal code to match our expectations to get the test to pass.

### Integration testing

- White-box
- Can be thought of an "inside-out" approach that tests compatibility between multiple units.
- Test double are also typically used to isolate the units under test from external variables/state

```js
// two "units" we want to make sure work together with each other properly
class Home {
  registerOwner(firstName, lastName) {
    this.owner = new Person(firstName, lastName);
  }
}
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
// arrange
const Home = require('home');
const home = new Home();
//act
const home.registerOwner('John', 'Doe');
expect(home.owner).to.be.type(Person);
expect(home.owner.fullName()).to.equal('John Doe');
```

As you can see here, we're testing two separate units to make sure that Home and Person classes work together. When a home owner is registered, a new Person should be instantiated and we should be able to get relevant information about the home owner (ie. `home.owner.fullName`).

## Testing process

The testing process is:

1. Write a failing acceptance test(s).
1. Write a failing unit test(s).
1. Write just enough code to make the failing unit test(s) pass.
1. Run the unit test(s).
1. Write more unit tests until satisfied.
1. Write write some integration tests if you have multiple units to test together.
1. Write just enough code to make the integration tests pass.
1. Run the integration tests(s).
1. Write more integration tests until satisfied.
1. Run the acceptance test(s) (should pass if all the tests in your unit/integration tests pass).

The unit tests ensure each individual piece of code in the system works correctly in isolation. The acceptance tests ensure the system works together as a whole to return the correct result. Integration tests can be added on anytime to ensure compatiblity between units.

## How many tests to write?

The more tests you have, the more confident you can be with your solution. We typically recommend "enough" to ensure the app works the way you expect. A good guideline to follow is the "[Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)", where you have a lot of unit tests, less integration and even less acceptance (ie. %50 unit, %30 integration, 20% acceptance, etc). You decide the split that works for your situation.

## What next?

- Setting up a project and running a basic smoke test
- Setting up tests to recognize TypeScript
- Your first LoopBack.next app test

- We use [TDD](https://en.wikipedia.org/wiki/Test-driven_development) and [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development).
- We opinionate our practices and standards through @loopback/testlab (a library that make testing LBN apps easy)


### Setting up the project and running a basic smoke test

- Create a new project
- Install a test runner (mocha)
- Install testlab (includes testing helpers such as an assertion library, spies, stubs, mocking, etc)
  - Maybe link to should.js + sinon here
- Run our first test

```
mkdir loopback-next-quick-start
cd loopback-next-quick-start
npm init -y
npm install -D mocha
npm install -D testlab
```

We now have an empty project with a basic `package.json`, run `npm test` and we should see an error:

```
> loopback-next-quick-start@1.0.0 test .../loopback-next-quick-start
> echo "Error: no test specified" && exit 1
```

Open up `package.json`, you should see our NPM `test` script is not connected to a test runner:

```js
{
  ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1" // no test runner set up by default
  },
  ...
}
```

Let's install one:

```
npm install -D mocha
```

Then edit the `test` script in package.json:

```
"scripts": {
  "test": "mocha"
},
```

Now try running the tests again via `npm test` and you should see:

```
> loopback-next-quick-start@1.0.0 test .../loopback-next-quick-start
> mocha

Warning: Could not find any test files matching pattern: test
No test files found
```

Great! The test runner is working now, but we don't have any tests to run. First create a directory to store the tests:

```
mkdir test // mocha automatically looks in $PROJECT_ROOT/test for test files
```

Let's create a basic [smoke-test](https://en.wikipedia.org/wiki/Smoke_testing_(software)) to make sure the runner is working. First, install some testing helpers provided by @loopback/testlab:

```
npm install -D @loopback/testlab
```

Then create a file in the `test` directory named `smoke.js`:

```js
// .../loopback-next-quick-start/test/smoke.js
const expect = require('@loopback/testlab').expect;

describe('smoke test', () => {
  it('passes', () => {
    expect(1).to.equal(2);
  });
});
```

Notice we say "expect 1 to equal 2" in the actual contents of the test. It is recommended to start with a failing test. In typical [red-green-refactor](https://en.wikipedia.org/wiki/Test-driven_development#Test-driven_development_cycle) fashion, let's make this pass by changing the following:

```
expect(1).to.equal(1); // 2 has been changed to 1
```

Run the tests again via `npm test`, you should see:

```
> loopback-next-quick-start@1.0.0 test /Users/simonho/tmp/loopback-next-quick-start
> mocha

  smoke test
    ✓ passes

  1 passing (7ms)
```

Give yourself a pat on the back, you've now set up your first test environment and run your first test!

```
// TODO (superkhau) lb new-project should scaffold most of the above automatically
```

## Setting up tests to recognize TypeScript

{% include content/tbd.html %}

Making tests work with a LoopBack-next Typescript project.
