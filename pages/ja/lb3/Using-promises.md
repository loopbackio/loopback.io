---
title: "Using promises"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Using-promises.html
summary:
---

{% include warning.html content="

Promise support in LoopBack is not complete. See [LoopBack issue #418](https://github.com/strongloop/loopback/issues/418#issue-38984704) for current status.

PLEASE NOTE: This documentation is a work in progress. The API documentation does not yet reflect promise support.

" %}

Promises are an alternative for asynchronous operations that can be simpler to write and understand than traditional callback-based approaches.
Promises also enable you to handle asynchronous errors with something similar to a synchronous `try/catch` block.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <p><span>See </span><a href="https://github.com/strongloop/loopback/issues/1409" class="external-link" rel="nofollow">#1409</a><span>,</span> <a href="https://github.com/strongloop/loopback/issues/1575" class="external-link" rel="nofollow">#1575</a> <span>and </span>
    <a
      href="https://github.com/strongloop/loopback/issues/418" class="external-link" rel="nofollow">#418</a><span>.</span></p>
  <p>Add explanation of why you might want to use Promises in LB, e.g. remote method</p>
</div>

## What is a promise?

A promise represents the result of an asynchronous operation. A promise is in one of the following states:

* **pending** - The initial state of a promise (neither fulfilled nor rejected).

* **fulfilled** - The action relating to the promise succeeded.
  When a successful promise is fulfilled, all of the pending callbacks are called with the value.
  If more callbacks are registered in the future, they will be called with the same value. Fulfillment is the asynchronous analog for returning a value.

* **rejected** - The action relating to the promise failed.
  When a promise is rejected it invokes the errbacks that are waiting and remembers the error that was rejected for future errbacks that are attached.
  Rejection is the asynchronous analog for throwing an exception.

* **settled** - The promise has been fulfilled or rejected. Once a promise is settled, it is immutable (it can never change again).

Additional terminology:

* _Callback_: A function executed if a a promise is fulfilled with a value.
* _Errback_: A function executed if a promise is rejected, with an exception.
* _Progressback_: A function executed to show that progress has been made toward resolution of a promise.

For more general information on promises, see:

* [Understanding JavaScript Promises](https://spring.io/understanding/javascript-promises)
* [JavaScript Promises: There and Back Again](http://www.html5rocks.com/en/tutorials/es6/promises/)
* [Promises (by Forbes Lindsay)](https://www.promisejs.org/)
* [Promise (Mozilla Developer Network)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## LoopBack support for promises

Promise support in LoopBack is still in progress. The following are complete:

* [Strong Remoting](Strong-Remoting.html)
* [Operation hooks](Operation-hooks.html)
* DAO and relation methods  
* loopback-datasource-juggler methods like `automigrate`, `autoupdate`, `discover*`, etc.
* The following [built-in models](Using-built-in-models.html) support the promises API:

    * [User](https://apidocs.loopback.io/loopback/#user) 
    * [Application](https://apidocs.loopback.io/loopback/#application) 
    * [PersistedModel](https://apidocs.loopback.io/loopback/#persistedmodel) 

See [LoopBack issue #418](https://github.com/strongloop/loopback/issues/418#issue-38984704) for details.

## Setup

When using Node v0.12- or io.js 1.0-, you can use the native [global Promise object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

With earlier versions of Node, use [Bluebird](https://www.npmjs.com/package/bluebird).
When running in an environment that supports native promises, Bluebird will automatically "fall back" to use them, so typically,
it's easier to set up Bluebird so you don't need to be concerned with platform support.
Simply, enter this command to update your application's dependencies in `package.json`:

```shell
$ npm install -save bluebird
```

Then, in your code:

```javascript
var Promise = require('bluebird');
...
```

## Using promises in LoopBack

{% include tip.html content="

If using CoffeeScript, make sure your models don't accidentally return a Promise.

" %}

For example, here is how you would call a CRUD operation on a model that extends [PersistedModel](https://apidocs.loopback.io/loopback/#persistedmodel) with standard callbacks:

```javascript
MyModel.find(function(err, result){
  ...
  if (err) cb(err)
})
```

With promises, you would instead do the following:

```javascript
MyModel.find()
.then(function(result){
  ... // Called if the operation succeeds.
})
.catch(function(err){
  ... // Called if the operation encounters an error.
})
```

Another example:

```javascript
var Promise = require('bluebird');
CoffeeShop.status = function() {
  var currentDate = new Date();
  var currentHour = currentDate.getHours();
  var OPEN_HOUR = 6;
  var CLOSE_HOUR = 20;
  console.log('Current hour is ' - currentHour);
  var response;
  if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
    response = 'We are open for business.';
  } else {
    response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
  }

  return Promise.resolve(response);
};
```

Promises can simplify, for example, defining asynchronous remote methods. Instead of:

{% include code-caption.html content="common/models/my-model.js" %}
```javascript
module.exports = function(MyModel) {
 MyModel.myFunc = function(input, cb) {
   Todo.find(function(err, data) {
     if(err) return cb(err);
     cb(null, generateStats(input, data));
   });
 };
```

With promises, this is reduced to:

{% include code-caption.html content="common/models/my-model.js" %}
```javascript
MyModel.myFunc = function(input, cb) {
   return Todo.find()
     .map(generateStats(input));
 };
 MyModel.remoteMethod('myFunc', ...);
}
```
