---
lang: en
title: 'Testing your application'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Testing-your-application.html
summary:
---

## Setup

### With LoopBack CLI

{% include note.html content="Currently the LoopBack CLI does not yet support LoopBack 4.
" %}

If you are just getting started with LoopBack, use the LoopBack command-line tool (CLI)  `loopback-cli`. It's ready to use and installs simply by `npm install -g loopback-cli`. You don't need to do any extra steps for setup, and can head straight to the [next section](Testing-Your-Application#acceptance-testing.html).

### Without LoopBack CLI

If you have an existing application you'll need to install a few packages to make everything work well together. Minimally, you will need `@loopback/testlab` and `mocha`.

```
npm i -D @loopback/testlab mocha
```

Your `package.json` should look something like:

```js
  ...
  "devDependencies": {
    "@loopback/testlab": "<current-version>",
    "mocha": "<current-version>"
  },
  "scripts": {
    "test": "mocha"
  }
  ...
```

## Acceptance testing

Create an application that returns "hello world" for GET / requests.

Start by writing an acceptance test that ensures the application you're creating returns "hello world". Create the `test` directory and a file inside that looks like:

{% include code-caption.html content= "test/acceptance.js" %}
```js
import {app} from './application';
import {Client, expect} from '@loopback/testlab');

describe('application', () => {
  let client;
  before(createClient);

  it('returns "hello world" for GET requests to /', async () => {
    const res = await client.get('/');
    expect(res.statusCode).to.equal({statusCode: 200, body: 'hello world'});
  });

  function createClient() {
    client = new Client(app); // missing
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
const Application = require('@loopback/core'); // npm install -S @loopback/core

exports.createApp = () => {
  const app = new Application();
  app.sequence(sequence => sequence.send(200, 'hello world')); // missing
};
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

Now decouple the business logic from the sequence through some refactoring by moving the hardcoded "hello world" to its own route handling library.  Start by writing a unit test:

{% include code-caption.html content= "test/unit.js" %}
```js
import {routeHandler} from '../route-handler';
import {expect} from '@loopback/testlab';

describe('routeHandler.greet()', () => {
  it('returns "hello bob"', () => {
    const result = routeHandler.greet('bob');
    expect(result).to.equal('hello bob');
  });
});
```

Notes:

1. There is no mention of application or sequence anywhere.
1. The code to test this new library is very minimal (just ensure "hello world" is returned).

Run this code and see what happens:

```
...
Error: Cannot find module 'route-handler'
```

Great, you've seen the code fail. Fix this by implementing the `route-handler` library:

{% include code-caption.html content= "route-handler.js" %}
```js
exports.greet = (params) => {
  return `hello ${params.name}`;
};
```

Run the tests again:

```
...
  routeHandler.greet(name)
    ✓ returns "hello bob"


  1 passing (7ms)
```

Now you can guarantee your `route-handler` library returns the correct results as long as you call the `greet()` function. The power of unit testing is that you can test this in isolation, independent from the other moving parts of the application such as sequence. Now that you extracted the business logic into a separate library, register this route handler into the existing application.

{% include code-caption.html content="application.js" %}
```js
import {routeHandler} from './route-handler';
...

exports.createApp = () => {
  const app = new Application();
  app.get('/greet', {params: {name: {source: 'query'}}}, routeHandler.greet); // missing
  app.sequence((sequence, ctx, req) => { // missing
    const {handler, spec, pathParams} = sequence.findRoute(request); // missing
    const params = sequence.parseParams(spec, request, pathParams); // was parseArgs, change to parseParams
    const result = sequence.invoke(handler, params); // missing
    sequence.send(200, result);
  });
};
```

Notes:

1. You created a mapping between the `app` instance and the `routeHandler` via `app.get`.
1. You let the application know when to invoke the `greet` by getting some extra information from the context (`ctx`) and routing information (`route`).

Run the tests again via `npm test` again to make sure you didn't break anything!

```
  application
    ✓ returns "hello world" for GET requests to /
  routeHandler.greet()
    ✓ returns "hello world"


  2 passing (15ms)
```

As you can see from the example, you could "safely" refactor your code (extract out the hard-coded "hello world" into a separate library) by ensuring the application behaves in the exact same way (thanks to the acceptance test to confirm this). The unit test  ensured the `route-handler` library returned results in an expected way, independent of the application or sequence.

Takeaways:

1. Always write the tests first.
1. Run the tests immediately and make sure they fail (to prevent false positives).
1. Unit tests are good enough to ensure isolated code works alone.
1. Acceptance tests help ensure everything continues to work together (and to ensure you don't accidentally break or change existing functionality).

<!-- The code for this example is available at [[examples/unit-testing]]. -->

## Integration testing

While acceptance tests and unit tests get you most of the way there, sometimes you only want to test a few units together in isolation. As long as those units together, you can be fairly sure the entire application will continue to work as expected.

To show an example of this, say you want to organize your routes into a [Controller](Controllers.html). In this case, you only need a few units working together (for example, a controller that works together with the route handler above to return "hello world"). As long as the controller method being called returns the expected values and the sequence calls the correct method, you can be fairly sure the entire app will still work as expected (the acceptance tests will ensure this).

Begin by refactoring the application to use a [Controller](Controllers.html) together with the route handler. As usual, start by writing a test:

{% include code-caption.html content="prod.comproot.json" %}
```json
{
  capitalize: '/path/to/capitalize.js#capitalize',
  controller: {
    GreetController: '/path/to/greet-controller.js',
    InvitationController: '/path/to/invitation,
  },
  controllers: 'controllers.*'
}
```

{% include warning.html content= "Below doesn't seem right... " %}

{% include code-caption.html content="test.comproot.json" %}
```js
{
  capitalize: '/path/to/mock-capitalize.js'
}

(greetController) => {

ctx.get('GreetController');
```

{% include code-caption.html content="test/integration.js" %}
```js
describe('title', ['capitalize', 'controller', (formatter, {GreetController}) { // missing
  it('returns "Hello BOB"', () => {
     const greetController = new GreetController(formatter);
     expect(greetController.greet().to.equal('hello BOB');
  });
});

describe('GreetController.greet()', () => {
  it('returns "Hello BOB"', () => {
     const greetController = new GreetController(capitalize);
     expect(greetController.greet()).to.equal('hello BOB');
  });
});

export default class Test {
  const capitalize = this.capitalize;

  constructor(capitalize) {
    this.capitalize = capitalize;
  }

  run() {
    this.capitalize();
  }
}
```

Notes:

1. you only import the unit(s) (in this case only the `GreetController` and not the `routeHandler`) that are needed to make the test pass

Run the tests:

```
...
Error: Cannot find module 'greet-controller'
```

This is expected.  Fix the failing test by creating the missing controller that uses the `route-handler`:

{% include code-caption.html content="capitalize.js" %}
```js
module.exports = str => str.toUppercase();
```

{% include code-caption.html content="controller.js" %}
```js
class GreetController {
  constructor(capitalize) {
    this.capitalize = capitalize;
  }

  @get('/greet', {params: {name: {source: 'query'}}}) // missing
  greet(params) {
    return capitalize(params.name);
  }
}
```

- **a** - route handler isolation unit
- **b** - greet isolation unit

This is fairly straight-foward. Run the tests again:

```
  application
    ✓ returns "hello world" for GET requests to /
  routeHandler.greet()
    ✓ returns "hello world"
  GreetController.greet()
    ✓ returns "hello world"


  3 passing (24ms)
```

Notes:

1. `@get` is a "decorator". For now, just think of it as an easy way to provide routing metadata to any method you want to add to a class.
1. Assume all the other units do their work properly to get to your result.
1. The test is an integration test because `GreetController.greet` called `routeHandler.greet` under the hood to get the "hello world" string (hence testing both units "working together").

The important point is that you are testing **two** units together (without any reference or dependency on the application or sequence). This allows you to make specific parts of your system more robust by picking a few units and providing additional tests to address your concerns.

That said, just because the two units above work together, it doesn't mean the application still works as a whole. You still need the acceptance test to make sure regressions weren't introduced as part of refactoring. Use the controller instead of the routing handler in the existing application:

{% include code-caption.html content="application.js" %}
```js
...
const GreetController = require('./greet-controller');

exports.createApp = () => {
  const app = new Application();
  app.controller(GreetController);
};
```

Notice how the code is much simpler. By providing a [Controller](Controllers.html) directly, LoopBack can figure out how to respond to requests based on the routing metadata you provided via `@get` in the Controller implementation (i.e. `@get('/'` for HTTP GET / requests, call the corresponding controller method).

Run tests to make sure everything works as expected:

```
  application
    ✓ returns "hello world" for GET requests to /
  routeHandler.greet()
    ✓ returns "hello world"
  GreetController.greet()
    ✓ returns "hello world"


  3 passing (20ms)
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
