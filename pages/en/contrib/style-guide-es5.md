---
title: Code style guide (2.x/ES5)
lang: en
toc: false
tags: [contributing, community]
keywords:
summary: "These are LoopBack's general coding style guidelines for pre-ES6 branches, e.g. 2.x release lines."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/style-guide-es5.html
---
<!--
Style conventions for this document:
 - Each rule has a level2 heading (##)
 - For each rule, provide examples of what's good and what's bad - use level4 heading `##### Good` and `##### Bad`
 - level3 headings are reserved to subsections within rules, e.g. `#### Exceptions`
-->

{% include important.html content="

This document describes the coding style we were using in EcmaScript5 code base
before upgrading to EcmaScript6 in LoopBack 3.0. Follow these rules when
back-porting bug fixes to older versions.

See the [current style guide](style-guide.html) for up-to-date conventions
used for new development.

" %}

{% include see-also.html content="
- [ES6 style guide for LoopBack 3.x](style-guide-es5.html)
- [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
- [Google Javascript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
" %}

{% include toc.html %}

## General guidelines

### One argument per line

Once you cannot fit all arguments into a single line shorter than 80 chars, it's better to place each argument on a new line.

Good:

```js
TestModel.find(
  {where: {id: '1'}},
  {notify: false},
  function(err, list) {
    ...
  });
```

Bad:

```js
TestModel.find(
  {where: {id: '1'}}, {notify: false},
  function(err, list) {
    ...
  });
```

```js
TestModel.find({where: {id: '1'}},
  {notify: false},
  function(err, list) {
    ...
  });
```

### Exception

When the callback function is the only argument that overflows char limit, you can put only this argument on a new line.

Good:

```js
TestModel.find({where: {id: '1'}},
  function(err, list) {
    ...
  });
```

When fixing existing code, it's better to preserve indentation of the inner function body and do not indent the second line:

```js
TestModel.find({where: {id: '1'}},
function(err, list) {
  ...
});
```

### Exception

When the arguments are only short primitive values (strings, numbers) or short variable/property references, one can collapse them on the same line.

Good:

```js
console.error('Unhandled array of errors for request %s %s\n',
  req.method, req.url, errors);

console.error(
  'Unhandled array of errors for request %s %s\n',
  req.method, req.url, errors);
```

Bad:

```js
console.error(
  'Unhandled array of errors for request %s %s\n',
  req.method,
  req.url,
  errors);
```

### Indentation of multi-line expressions in `return`

Indent the second and all next lines by one level.

Good:

```js
return (testInEquality({gte: example.between[0]}, value) &&
  testInEquality({lte: example.between[1]}, value) &&
  testInEquality({lte: example.between[2]}, value));
```

Bad:

```js
return (testInEquality({gte: example.between[0]}, value) &&
       testInEquality({lte: example.between[1]}, value) &&
       testInEquality({lte: example.between[2]}, value));
```

### Indentation of multi-line expressions in `if`

Prefer to extract the multi-line expression to a variable, as it is easiest to read. Use a good variable name to describe the condition you are building.

When not feasible, then indent the second and next lines by two levels.

Good:
(?)

Best:

```js
var matchesInEquality = testInEquality({ gte: example.between[0] }, value) &&
    testInEquality({lte: example.between[1]}, value) &&
    testInEquality({lte: example.between[2]}, value);
if (matchesInEquality) {
  handleInEquality();
}
```

Still acceptable:

```js
if (testInEquality({gte: example.between[0]}, value) &&
    testInEquality({lte: example.between[1]}, value) &&
    testInEquality({lte: example.between[2]}, value)) {
  handleInEquality();
}
```

Bad:

One level of indentation makes it difficult to tell the difference between the condition and the branch body.

```js
if (testInEquality({gte: example.between[0]}, value) &&
  testInEquality({lte: example.between[1]}, value) &&
  testInEquality({lte: example.between[2]}, value)) {
  handleInEquality();
}
```

### Multiline Array

Good:

```
 var titles = [
  {title: 'Title A', subject: 'B'},
  {title: 'Title Z', subject: 'A'},
  {title: 'Title M', subject: 'C'},
  {title: 'Title A', subject: 'A'},
  {title: 'Title B', subject: 'A'},
  {title: 'Title C', subject: 'D'},
];
```

Bad:

```
  var titles = [{title: 'Title A', subject: 'B'},
                {title: 'Title Z', subject: 'A'},
                {title: 'Title M', subject: 'C'},
                {title: 'Title A', subject: 'A'},
                {title: 'Title B', subject: 'A'},
                {title: 'Title C', subject: 'D'}];
```

```
  var titles = [{ title: 'Title A', subject: 'B' },
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

var cat = new Cat();
cat.eat();
cat.meow();
cat.sleep();

return cat;
```

However, if the method is short (3-5 lines) then just group it all together.

Good:

```
if (err) return done(err);
expect(result).to...;
done();
```

Bad:

```
if (err) return done(err);

expect(result).to...;

done();
```

## Testing-related

### Sandbox directories

- All test-related sandbox directories should be inside the `test` dir (ie.
  `./test/sandbox`)
- Do not use directories like `/tmp/sandbox` as you will run into
  permission issues on CI for directories that are not in the project

### Email examples

- All test-related email examples should be of the format `email@example.com`.
- The `example.com` domain was created to be used for examples in documents, and could be used without prior coordination or asking for permission.

Good:
```js
var validCredentials = {email: `original@example.com`, password: 'bar'}
```

Bad:

```js
var validCredentials = {email: `updated@bar.com`, password: 'bar'}
```

### Hooks

Good:

```js
beforeEach(namedFunction);

beforeEach(function namedFunction() {
  // ...
});
```

Shows up in stack traces, but not test output. In the second style, it's better to move the named function to the bottom of the file and call it using the first style instead.

```js
beforeEach('some description', function() {
});

beforeEach('some description', namedFunction);

beforeEach('some description', function namedFunction() {
  // ...
});
```

The first example shows up in test output, but not stack traces. The second and third example shows up in test output and stack traces, but is a bit redundant to type two descriptions (one in the string and a duplicate in the function name)

> Each of the above styles are acceptable and a decision will be made in the future as to which one is preferred. For now, feel free to pick the one that suits you.

Bad:

```js
beforeEach(function() {
  ...
});
```

### Layout of test files

When using hooks like beforeEach/before, it's best to use named functions that are then defined at the bottom of the test file. The idea is to make it easy to find the meat of a test file, which are the unit-tests. The method names used for hooks should make it clear enough what's their purpose, allowing most readers to not need to know implementation details and skip directly to unit-tests.

Good:

```js
describe('strong-error-handler', function() {
  before(setupHttpServerAndClient);
  beforeEach(resetRequestHandler)

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
describe('strong-error-handler', function() {
  before(setupHttpServerAndClient);
  beforeEach(resetRequestHandler)

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
  before(function(done)
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

  beforeEach(function(done) {
    // reset
  });

  it('handles error like this');
  it('handles error like that');
 });
```

### Exception

Variables initialized by helpers and used from tests should be declared
at the top of the `describe` block. Variables shared by multiple `describe`
blocks may be placed in the outer scope.

Good:

```js
describe('my class', function() {
  var app;
  beforeEach(function setupApp);

  it('does something');

  function setupApp() {
    app = loopback();
    // ...
  }
});
```

### Test naming

Test names should describe the expected outcome under certain conditions. They should read like an English sentence, where `it` stands for the subject stated in `describe` argument.

Use imperative mood, **do not** start test names with `should`.

The test name should make it clear:
 - what is being tested, what are the conditions specific to this test case
 - what is the expected outcome

Run `mocha -R spec` to review test names.

Good:

```js
describe('strong-error-handler', function() {
  it('returns status 500 by default');
  // reads as: strong-error-handler returns status 500 by default
 });

describe('User', function() {
  describe('login()', function() {
    it('accepts valid credentials');
    // reads as: User login() accepts valid credentials
    it('creates an access token');
    // reads as: User login() creates an access token
  });
);
```

Bad:

```js
describe('strong-error-handler', function() {
  it('default status');
  it('should return status 500 by default');
});

describe('User', function() {
  describe('login()', function() {
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

##### Good

```js
describe('Model', function() {
  describe('find()', function() {
    context('with "include" filter', function() {
      it('adds related models to the result', function() {
        // Model find() returns filtered results
      });
    });
  });

  ...
});
```

Bad:

```js
describe('Model', function() {
  describe('find()', function() {
    describe('with "include" filter', function() {
      it('adds related models to the result', function() {
        // Model find() returns filtered results
      });
    });
  });

  ...
});
```

```js
context('Model', function() {
  context('find()', function() {
    context('with "include" filter', function() {
      it('adds related models to the result', function() {
        // Model find() returns filtered results
      });
    });
  });

  ...
});
```
