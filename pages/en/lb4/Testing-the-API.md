---
lang: en
title: 'Testing the API'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Testing-the-API.html
summary:
---

{% include note.html content="
This article continues off from [Defining and validating the API](./Defining-and-validating-the-API.html).
" %}

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

{% include next.html content= "
[Implementing features](./Implementing-features.html)
" %}