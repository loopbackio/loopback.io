---
lang: en
title: 'Testing your application'
keywords: LoopBack 4.0, LoopBack-Next
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Testing-your-application.html
summary:
---

## Setup

### With `loopback-cli`

NOTE: Currently loopback-cli does not yet support LoopBack v4.

If you are just getting started with LoopBack, we recommend using `loopback-cli`. It's ready to use and installs simply by `npm install -g loopback-cli`. You don't need to do any extra steps for setup, and can head straight to the [next section](Testing-Your-Application#acceptance-testing.html).

### Without `loopback-cli`

If you have an existing application you'll need to install a few packages to make everything work well together. Minimally, you will need `@loopback/testlab` and `mocha`.

```
npm i -D @loopback/testlab mocha
```

Your package.json should look something like:

```
// package.json
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

And you're good to go.

## Acceptance testing

Let's create an application that returns "hello world" for GET / requests.

Start by writing an acceptance test that ensures the application we're creating returns "hello world". Create the `test` directory and a file inside that looks like:

```
// test/acceptance.js
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

A few things to note here:

1. We write the test first!
1. `@loopback/testlab` provides some utilities to help us with writing tests (`Client`, `expect`).
1. We don't have a `../application` file to import yet.

Either way, let's try running it first to see what happens. In your console, run `npm test` and you should see:

```
...
Error: Cannot find module '../application'
```

Let's create this file at the project root:

```
// application.js
const Application = require('@loopback/core'); // npm install -S @loopback/core

exports.createApp = () => {
  const app = new Application();
  app.sequence(sequence => sequence.send(200, 'hello world')); // missing
};
```

When you run `npm test`, you should see:

```
  application
    ✓ returns "hello world" for GET requests to /


  1 passing (8ms)
```

The side effect of all writing the test first is we created a minimal application that meets our requirements (an app that responds with "hello world") as part of making the test pass. This gives us a way to verify what the application does now and ensure it keeps working this way in the future.

Takeaways:

- We write the test first
- We run the tests immediately and make sure it fails (to prevent false positives)
- Watched the test fail (to prevent false positives)
- Created the minimal code (the application) to make the test pass
- Reran the tests to verify the application returns the expected outcome
- Have something in place to prevent regressions

## Unit testing

Some interesting things to note above is how the business logic of the application is coupled to the sequence.

1. The sequence has to send the same hardcoded "hello world" response for every request made to the application
2. It is hard to test the business logic for the route in isolation
3. It is hard to add new routes without modifying the sequence

Let's decouple the business logic from the sequence through some refactoring by moving the hardcoded "hello world" to it's own route handling library. Let's start by writing a unit test:

```
// test/unit.js
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

1. There is no mention of application or sequence anywhere
1. The code to test this new library is very minimal (just ensure "hello world" is returned)

Let's run this code and see what happens:

```
...
Error: Cannot find module 'route-handler'
```

Great, we've seen the code fail. Let's fix this by implementing our `route-handler` library:

```
// route-handler.js
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

Nice. Now we can guarantee our `route-handler` library returns the correct results as long as we call the `greet()` function. The power of unit testing is that we can test this in isolation, independent from the other moving parts of the application such as sequence. Now that we extracted the business logic into a separate library, let's register this route handler into the existing application.

```
// application.js
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

1. We created a mapping between the `app` instance and the `routeHandler` via `app.get`
1. We let the application know when to invoke the `greet` by getting some extra information from the context (ctx) and routing information (route)

Run the tests again via `npm test` again to make sure we didn't break anything!

```
  application
    ✓ returns "hello world" for GET requests to /
  routeHandler.greet()
    ✓ returns "hello world"


  2 passing (15ms)
```

As you can see from the example, we could "safely" refactor our code (ie. extract out the hardcoded "hello world" into a separate library) by ensure the application behaves in the exact same way (thanks to the acceptance test we had in place to confirm this). The unit test we wrote ensured the `route-handler` library returned results in an expected way, indepedent of the application or sequence.

Takeaways:

1. We write the test first
1. We run the tests immediately and make sure it fails (to prevent false positives)
1. Unit tests are good enough to ensure isolated code works standalone
1. Acceptance tests help us ensure everything continues to work together (and to ensure we don't accidentally break/change existing functionality)

<!-- The code for this example is available at [[examples/unit-testing]]. -->

## Integration testing - WIP

While acceptance tests and unit tests get us most of the way there, sometimes we only want to test a few units together in isolation. As long as those units together, we can be fairly sure the entire application will continue to work as expected.

To show an example of this, say we want to organize our routes into a [Controller](Controllers.html). In this case, we only care about how a few units working together (ie. a controller that works together with the route handler above to return "hello world"). As long as the controller method being called returns the expected values and the sequence calls the correct method, we can be fairly sure the entire app will still work as expected (the acceptance tests will ensure this).

Let's begin by refactoring the application to use a [Controller](Controllers.html) together with the route handler. As usual, start by writing a test:

```
// prod.comproot.json
{
  capitalize: '/path/to/capitalize.js#capitalize',
  controller: {
    GreetController: '/path/to/greet-controller.js',
    InvitationController: '/path/to/invitation,
  },
  controllers: 'controllers.*'
}
// test.comproot.json
{
  capitalize: '/path/to/mock-capitalize.js'
}

(greetController) => {

ctx.get('GreetController');
// test/integration.js
describe('title', ['capitalize', 'controller', (formatter, {GreetController}) { // missing
  it('returns "Hello BOB", () => {
     const greetController = new GreetController(formatter);
     expect(greetController.greet()).to.equal('hello BOB');
  });
});

describe('GreetController.greet()', () => {
  it('returns "Hello BOB", () => {
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

1. We only import the unit(s) (in this case only the `GreetController` and not the `routeHandler`) that are needed to make the test pass

Run the tests:

```
...
Error: Cannot find module 'greet-controller'
```

As expected. Let's fix the failing test by creating the missing controller that uses the `route-handler`:

```
// capitalize.js
module.exports = str => str.toUppercase();

// controller.js
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

- **a** - route handlerisolation unit
- **b** - greet isolation unit

Fairly straightfoward. Run the tests again:

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

1. @get is a "decorator", we'll get into more details into the later sections, for now, just think of it as an easy way to provide routing metadata to any method you want to add to a class
1. We assume all the other units do their work properly to get to our result
1. The test is an integration test because `GreetController.greet` called `routeHandler.greet` underneath the hood to get the "hello world" string (hence testing both units "working together")

The important point to note here is that we are testing **two** units together (ie. without any reference or dependency on the application or sequence). This allows us to make specific parts of our system more robust by picking a few units and providing additional tests to address our concerns.

That said, just because the two units above work together, it doesn't mean the application still works as a whole. You still need the acceptance test to make sure regressions weren't introduced as part of our refactoring. Let's use the controller instead of the routing handler in the existing application:

```
// application.js
...
const GreetController = require('./greet-controller');

exports.createApp = () => {
  const app = new Application();
  app.controller(GreetController);
};
```

Notice how the code is much simpler. By providing a [Controller](Controllers.html) directly, LoopBack can figure out how to respond to requests based on the routing metadata you provided via `@get` in the Controller implementation (ie. `@get('/'` for HTTP GET / requests, call the corresponding controller method).

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

1. We write the test first
1. We run the tests immediately and make sure it fails (to prevent false positives)
1. Add integration tests to ensure compatibility between multiple units in your application
1. Integration tests do not guarantee your application still works as a whole (only the units under test), you still need acceptance tests!
1. Easier to set up and get going than acceptance tests

## Conclusion

That's all there is to it. We can summarize the entire process to:

1. Write a failing acceptance test.
1. Write just enough code to make it pass.
1. Write a failing unit test(s).
1. Write just enough code to make it pass.
1. Rinse and repeat writing unit tests until satisfied.
1. Write integration tests to ensure compatibility between multiple units.
1. Write just enough code to make it pass.
1. Rinse and repeat writing integration tests until satisfied.
1. Run the acceptance test to ensure everything continues to work together as a whole.
1. Rinse and repeat all the above.

The combination of all the testing above will ensure your application is robust and production ready! You've now completed the basics of testing your LoopBack-next application.

For more in-depth recommendations and advanced testing topics, see [Testing Your Application (Advanced)](Testing-your-app-advanced.html).
