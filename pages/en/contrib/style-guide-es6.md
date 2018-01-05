---
title: Code style guide (3.x/ES6)
lang: en
toc: false
tags: [contributing, community]
keywords:
summary: "These are LoopBack's general coding style guidelines for ES6 branches, e.g. 3.x release lines."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/style-guide-es6.html
---
<!--
Style conventions for this document:
 - Each rule has a level2 heading (##)
 - For each rule, provide examples of what's good and what's bad - use level4 heading `##### Good` and `##### Bad`
 - level3 headings are reserved to subsections within rules, e.g. `#### Exceptions`
-->

{% include important.html content="

This document describes the coding style we were using in EcmaScript6 code base
before switching to TypeScript in LoopBack 4.0. Follow these rules when
working in ES6 codebases.

See the [current style guide](style-guide.html) for up-to-date conventions
used for new development.

" %}

{% include see-also.html content="
- [ES5 style guide for LoopBack 2.x](style-guide-es5.html)
- [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
- [Google Javascript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
" %}

{% include toc.html level=2 %}

## General guidelines

{% include important.html content="The rules described in this document are evolving, therefore not all of our
code-base are following them yet. This is expected and OK. Our approach is to
incrementally improve the parts that are changing most often, i.e. fix the
coding style only as part of changes needed for a bug fix/new feature.
" %}

### Variable declarations

Prefer to use immutable variables declared with `const` keyword.

{% include note.html content="`const` makes only the reference immutable, the referenced object is still
mutable.
" %}

**Good**:

```js
const User = app.models.User;
const { saltWorkFactor } = User.settings;
```

**Bad**:

```js
var User = app.models.User;
var saltWorkFactor = user.settings.saltWorkFactor;
```

In the rare cases where you need to split variable declaration and
initialization, prefer to use `let` over `var`:

```js
let discount = 0;

if (customer.isPreferred) {
  discount = 0.1;
} else if (customer.address.state === 'CA') {
  discount = 0.05;
}
```

In most cases, it's possible to rewrite such code by extracting the
conditional logic into a standalone function, which is preferred:

```js
const discount = customer.getDiscount();

// Inside Customer model:
customer.prototype.getDiscount = function() {
  if (customer.isPreferred) {
    return 0.1;
  }

  if (customer.address.state === 'CA') {
    return 0.05;
  }

  return 0;
}
```

{% include important.html content="`let` currently has a small caveat in that using it in loop constructs causes
V8 to deoptimize the function, i.e., for now you should write:

```js
for (var i = 0; i < 42; ++i) doit(i);
```

Instead of:

```js
for (let i = 0; i < 42; ++i) doit(i);
```

This will be fixed in node.js v8.x but probably won't be fixed in v4.x and v6.x.
" %}

### Arrow functions

There are two considerations to keep in mind when deciding whether to use an
arrow function or a regular function:

 - Arrow function preserves `this` from the outer scope. This is much more
   performant than the usual workaround of storing `this` in a `self` variable.

 - If you are accessing `this` provided by Mocha to your test cases and
   before/after hooks, then you cannot use an arrow function.

 - Arrow functions are anonymous by default, which makes it difficult to
   understand stack traces. The workaround is to assign an arrow function
   to a variable, since V8 does a fairly good job of inferring a name
   in such case.

The rules to follow:

 - Always use arrow functions if you need to access `this` from outside.

 - Try to structure your code in such way that your callbacks are short
   (can be written using an arrow function) and delegate most of the work
   to named functions (with a descriptive name).

 - Use arrow functions in your Mocha tests, unless you need to access Mocha's
   `this` context.

**Good**:

```js
class Foo {
  bar(cb) {
    doSomethingElse((err, data) => {
      if (err) return cb(err);
      const result = this.processData(data);
      cb(null, result);
    });
  }
}
```

**Bad**:

```js
class Foo {
  bar(cb) {
    const self = this;
    doSomethingElse(function(err, data) {
      if (err) return cb(err);
      const result = self.processData(data);
      cb(null, result);
    });
  }
}
```

### Classes

ES6 introduced syntax-sugar for defining classes.  Uee this syntax instead of the
old `require('util').inherits` approach.

**Good**:

```js
class MyConnector extends BaseConnector {
  constructor(settings, dataSource) {
    // ...
  }

  set(modelName, key, value, options, callback) {
    // ...
   }
}
```

**Bad**:

```js
function MyConnector(settings, dataSource) {
  // ...
}
util.inherits(MyConnector, BaseConnector);

MyConnector.prototype.set = function(modelName, key, value, options, callback) {
  // ...
};
```

### One argument per line

Once you cannot fit all arguments into a single line shorter than 80 characterss, it's better to place each argument on a new line.

**Good**:

```js
TestModel.find(
  {where: {id: '1'}},
  {notify: false},
  function(err, list) {
    ...
  });
```

**Bad**:

```js
TestModel.find(
  {where: {id: '1'}}, {notify: false},
  function(err, list) {
    ...
  });
```

**Bad**:

```js
TestModel.find({where: {id: '1'}},
  {notify: false},
  function(err, list) {
    ...
  });
```

{% include note.html title="EXCEPTION:" content="When the callback function is the only argument that overflows character limit, you can put only this argument on a new line.
" %}

For example:

```js
TestModel.find({where: {id: '1'}},
  function(err, list) {
    ...
  });
```

{% include note.html title="EXCEPTION:" content="When fixing existing code, it's better to preserve indentation of the inner function body and do not indent the second line.
" %}

For example:

```js
TestModel.find({where: {id: '1'}},
function(err, list) {
  ...
});
```

{% include note.html title="EXCEPTION:" content="When the arguments are only short primitive values (strings, numbers) or short variable/property references, you can collapse them on the same line.
" %}

**Good**:

```js
console.error('Unhandled array of errors for request %s %s\n',
  req.method, req.url, errors);

console.error(
  'Unhandled array of errors for request %s %s\n',
  req.method, req.url, errors);
```

**Bad**:

```js
console.error(
  'Unhandled array of errors for request %s %s\n',
  req.method,
  req.url,
  errors);
```

### Indentation of multi-line expressions in `return`

Indent the second and all next lines by one level.

**Good**:

```js
return (testInEquality({gte: example.between[0]}, value) &&
  testInEquality({lte: example.between[1]}, value) &&
  testInEquality({lte: example.between[2]}, value));
```

**Bad**:

```js
return (testInEquality({gte: example.between[0]}, value) &&
       testInEquality({lte: example.between[1]}, value) &&
       testInEquality({lte: example.between[2]}, value));
```

### Indentation of multi-line expressions in `if`

Prefer to extract the multi-line expression to a variable, as it is easiest to read. Use a good variable name to describe the condition you are building.

When not feasible, then indent the second and next lines by two levels.

**Best**:

```js
const matchesInEquality = testInEquality({ gte: example.between[0] }, value) &&
    testInEquality({lte: example.between[1]}, value) &&
    testInEquality({lte: example.between[2]}, value);
if (matchesInEquality) {
  handleInEquality();
}
```

**Still acceptable**:

```js
if (testInEquality({gte: example.between[0]}, value) &&
    testInEquality({lte: example.between[1]}, value) &&
    testInEquality({lte: example.between[2]}, value)) {
  handleInEquality();
}
```

**Bad**:

One level of indentation makes it difficult to tell the difference between the condition and the branch body.

```js
if (testInEquality({gte: example.between[0]}, value) &&
  testInEquality({lte: example.between[1]}, value) &&
  testInEquality({lte: example.between[2]}, value)) {
  handleInEquality();
}
```

### Multiline Array

**Good**:

```
const titles = [
  {title: 'Title A', subject: 'B'},
  {title: 'Title Z', subject: 'A'},
  {title: 'Title M', subject: 'C'},
  {title: 'Title A', subject: 'A'},
  {title: 'Title B', subject: 'A'},
  {title: 'Title C', subject: 'D'},
];
```

**Bad**:

```
const titles = [{title: 'Title A', subject: 'B'},
                {title: 'Title Z', subject: 'A'},
                {title: 'Title M', subject: 'C'},
                {title: 'Title A', subject: 'A'},
                {title: 'Title B', subject: 'A'},
                {title: 'Title C', subject: 'D'}];
```

```
const titles = [{ title: 'Title A', subject: 'B' },
  {title: 'Title Z', subject: 'A'},
  {title: 'Title M', subject: 'C'},
  {title: 'Title A', subject: 'A'},
  {title: 'Title B', subject: 'A'},
  {title: 'Title C', subject: 'D'}];
```

### Line spacing

In general, group related lines together (with a single empty line in between groups).

```
if (err) return done(err);

const cat = new Cat();
cat.eat();
cat.meow();
cat.sleep();

return cat;
```

However, if the method is short (3-5 lines) then just group it all together.

**Good**:

```
if (err) return done(err);
expect(result).to...;
done();
```

**Bad**:

```
if (err) return done(err);

expect(result).to...;

done();
```

## Style guidelines for tests

### Sandbox directories

- All test-related sandbox directories should be inside the `test` dir (ie.
  `./test/sandbox`)
- Do not use directories like `/tmp/sandbox` as you will run into
  permission issues on CI for directories that are not in the project

### Email examples

- All test-related email examples should be of the format `email@example.com`.
- The `example.com` domain was created to be used for examples in documents, and could be used without prior coordination or asking for permission.

**Good**:

```js
const validCredentials = {email: `original@example.com`, password: 'bar'}
```

**Bad**:

```js
const validCredentials = {email: `updated@bar.com`, password: 'bar'}
```

### Hooks

When writing hooks like `before` and `after`, it's important to prepare for the
situation when the hook fails and make troubleshooting easy in such case. There
are two considerations to keep in mind:

 - What is printed by Mocha in the test output. When a test fails, Mocha prints
   the test name. When a hook fails, Mocha prints the hook name, but only if
   there was one provided!

 - What is reported by Node.js/V8 runtime in the stack trace.

Using named functions to implement hook handlers is the best solution that
yields helpful names in both test output and error stack traces.

**Good**:


```js
beforeEach(namedFunction);

beforeEach(function namedFunction() {
  // ...
});
```

Shows both in stack traces and the test output. In the second style, it's better to move the named function to the bottom of the file and call it using the first style instead (see the next rule below).

```js
beforeEach('some description', function() {
});

beforeEach('some description', namedFunction);

beforeEach('some description', function namedFunction() {
  // ...
});
```

The first example shows up in test output, but not stack traces. The second and third example shows up in test output and stack traces, but is a bit redundant to type two descriptions (one in the string and a duplicate in the function name)

{% include tip.html content="Each of the above styles is acceptable and a decision will be made in the future as to which one is preferred. For now, feel free to pick the one that suits you.
" %}

**Bad**:

```js
beforeEach(function() {
  ...
});
```

### Layout of test files

When using hooks like beforeEach/before, it's best to use named functions that are then defined at the bottom of the test file. The idea is to make it easy to find the meat of a test file, which are the unit-tests. The method names used for hooks should make it clear enough what's their purpose, allowing most readers to not need to know implementation details and skip directly to unit-tests.

**Good**:

```js
describe('strong-error-handler', () => {
  before(setupHttpServerAndClient);
  beforeEach(resetRequestHandler);

  it('handles error like this');
  it('handles error like that');

  function setupHttpServerAndClient(done) {
    // long setup
    // .
    // .
    // .
    // .
    // .
    // .
    // .
    done();
  }

  function resetRequestHandler(done) {
    // reset
  }
 });
```

Bad:

```js
describe('strong-error-handler', () => {
  before(setupHttpServerAndClient);
  beforeEach(resetRequestHandler);

  function setupHttpServerAndClient(done) {
    // long setup
    // .
    // .
    // .
    // .
    // .
    /** where are the tests, are we there yet? **/
    // .
    done();
  }

  /** Another helper... WHERE ARE THE TESTS!? **/
  function resetRequestHandler(done) {
    // reset
  }

  it('handles error like this');
  it('handles error like that');
 });
```

Anonymous functions are even worse

```js
describe('strong-error-handler', function() {
  before((done) => {
    // long setup
    // .
    // .
    /** uff, what are we setting up here? and why? **/
    // .
    // .
    // .
    /** where are the tests, are we there yet? **/
    // .
    done();
  });

  beforeEach((done) => {
    // reset
  });

  it('handles error like this');
  it('handles error like that');
 });
```

{% include note.html title="EXCEPTION:" content="Variables initialized by helpers and used from tests should be declared at the top of the `describe` block. Variables shared by multiple `describe`
blocks may be placed in the outer scope.
" %}

For example:

```js
describe('my class', () => {
  let app;
  beforeEach(function setupApp);

  it('does something');

  function setupApp() {
    app = loopback();
    // ...
  }
});
```
### Callback function moved to the next line

The following examples show the preferred style when callback needs to move to the next line due to line length exceeding max line length defined by eslint:

**Good**:

```js
it('my long test description ...',
function(done) {
  ...
});
```

**Bad**:

```js
it('my long test description ...',
  function(done) {
    …
  });
```

**Bad**:

```js
it('my long test description ...',
  function(done) {
    …
  }
);
```

### Test naming

Test names should describe the expected outcome under certain conditions. They should read like an English sentence, where `it` stands for the subject stated in `describe` argument.

Use imperative mood, **do not** start test names with `should`.

The test name should make clear:

 - What is being tested, and the conditions specific to this test case.
 - Expected outcome.

Run `mocha -R spec` to review test names.

**Good**:

```js
describe('strong-error-handler', () => {
  it('returns status 500 by default');
  // reads as: strong-error-handler returns status 500 by default
 });

describe('User', () => {
  describe('login()', () => {
    it('accepts valid credentials');
    // reads as: User login() accepts valid credentials
    it('creates an access token');
    // reads as: User login() creates an access token
  });
);
```

**Bad**:

```js
describe('strong-error-handler', () => {
  it('default status');
  it('should return status 500 by default');
});

describe('User', () => {
  describe('login()', () => {
    it('works');
    it('should create a token');
  });
});
```

### Test block naming

Use `describe` for the top-level outer blocks and `context` for the inner
blocks. `describe` should be used when we are describing the subject - what is
being tested. In this particular example, both `Model` and `find()` should use
`describe`. The goal is to create a human readable prefix to stand for `it` in the
test cases.

**Good**:

```js
describe('Model', () => {
  describe('find()', () => {
    // Use "context()" to create a logical group of tests
    // executing a similar scenario.
    context('with "include" filter', () => {
      it('adds related models to the result', () => {
        // Model find() returns filtered results
      });
    });
  });

  // ...
});
```

**Bad**:

```js
describe('Model', () => {
  describe('find()', () => {
    // "describe()" is not suitable here, the source code line
    // produces a misleading English sentence: "describe with include filter"
    describe('with "include" filter', () => {
      it('adds related models to the result', () => {
        // Model find() returns filtered results
      });
    });
  });

  // ...
});
```

```js
// Don't overuse "context()", use "describe('Model')" instead
context('Model', () => {
  context('find()', () => {
    context('with "include" filter', () => {
      it('adds related models to the result', () => {
        // Model find() returns filtered results
      });
    });
  });

  ...
});
```

### Asserting a rejected Promise

Checking that a promise was rejected is tricky and makes it easy to introduce
subtle bugs. Always use the following pattern:

**Good**

```js
// use a different test name, one that's appropriate for your test
it('fails when arguments are invalid', () => {
  return doSomethingThatShouldFail().then(
    function onSuccess() {
      throw new Error('doSomething() should have failed');
    },
    function onError(err) {
      // verify that "err" is the expected error
    });
});
```

**Bad**

```js
it('fails when arguments are invalid', () => {
  return doSomethingThatShouldFail()
    .then(result => {
      assert(false);
    })
    .catch(err => {
      // verify that "err" is the expected error
    });
});
```

When `doSomethingThatShouldFail()` passes and `assert(false)` throws an error,
this AssertionError is then handled by the `catch` block. If the "verify" step
is written correctly, then the test fails because the AssertionError was not
the expected error; however the failure message is misleading. If the "verify"
step is not specific enough (e.g. any `Error` is accepted), then the test
incorrectly passes.
