---
title: Declarative test demo
keywords: automation, e2e, example, loopback, mocha, test
tags: [community_project]
sidebar: community_sidebar
permalink: /doc/en/community/Declarative-test-demo.html
summary: Example LoopBack 3.x application that demonstrates using lb-declarative-e2e-test to write tests in an object definition style.
---

## Links

This demo is available on Github:
[https://github.com/marc-ed-raffalli/loopback-example-tests](https://github.com/marc-ed-raffalli/loopback-example-tests)

Library used:
[https://www.npmjs.com/package/lb-declarative-e2e-test](https://www.npmjs.com/package/lb-declarative-e2e-test)

## Overview

This community-contributed component/example is for LoopBack 3.x

This project showcase the different features of [`lb-declarative-e2e-test`](https://www.npmjs.com/package/lb-declarative-e2e-test):
- Test hooks: `before`, `beforeEach`, `after`, `afterEach`
- Test `only` / `skip`
- Authenticated requests
  - Customizable login endpoint
- Response test:
  - status
  - header
  - body
  - custom (callback)

[`lb-declarative-e2e-test`](https://www.npmjs.com/package/lb-declarative-e2e-test) allows to write tests in an object definition style, 
it combines and exposes API from [Mocha](https://mochajs.org/) and [supertest](https://github.com/visionmedia/supertest)

Authenticated requests are fully supported, testing them becomes a no-brainer:  

```js
{
  name: 'admin CAN create',
  verb: 'post',
  auth: usersCredentials.admin,
  body: {some: 'value'},
  url: '/some/url/',
  expect: 200
}
```

## Demo features

- Tests
  - [x] e2e
  - [ ] model validation (wip)
- Watcher for TDD
- Coverage

## Running the demo

Installing dependencies:

```bash
npm install
```

Run the tests with coverage analysis:

```bash
npm test
```

Run the test with file watcher:

```bash
npm run test-watch
```

## Requirements

- Node >= 8
- LoopBack 3.x
