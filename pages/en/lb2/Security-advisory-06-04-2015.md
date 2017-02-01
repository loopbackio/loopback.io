---
title: "Security advisory 06-04-2015"
lang: en
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Security-advisory-06-04-2015.html
v2only: true
summary:
---

## LoopBack and HTTP parameter pollution

HTTP parameter pollution is a known [vulnerability of Express applications](https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications?slide=48).  LoopBack addressed the problem in the following module versions; to avoid this vulnerability, make sure your application uses these:

*   `loopback` version 2.17.1 or newer.
*   `strong-remoting` version 2.16.3 or newer.
*   `loopback-datasource-juggler` version 2.26.1 or newer.

If you are using vanilla Express, then add [hpp](https://www.npmjs.com/package/hpp) middleware to your application to protect against the vulnerability.

### What is HTTP parameter pollution?

Let’s start with a quick quiz. Consider the following HTTP request:

`GET /search?firstname=John&firstname=Jane`

Now, what is the value of `req.query.firstname`?

The correct answer is that `req.query.firstname` is set to an array of two items,` ['John', 'Jane']`, because Express populates HTTP request parameters with an array when the parameter name is repeated multiple times.

While this is a useful feature that many modules depend on (including LoopBack), it allows an attacker to intentionally pollute request parameters that are not supposed to be an array and bypass input validation or even cause a denial of service.

For example, if the record above were a POST request the updated database record might end up as follows:

```js
{
  "firstname": ["John", "Jane"],
  "lastname": "Smith"
}
```

If the handler expects the `firstname` parameter to be a string and calls one of the string prototype methods on the parameter, then the application may crash on an unhandled error:

```
TypeError: Object John,Jane has no method 'trim'
(...)
```

### Consequences for LoopBack applications

Fortunately, LoopBack has an extra layer of abstraction on top of Express implemented by the `strong-remoting` module. This module understands the types of arguments that are passed to request handlers and thus it can effectively prevent parameter pollution.

Unfortunately the code that handles parameter type conversions was not implemented correctly in respect to this particular edge case. For example, the following code snippet allows the attacker to crash your server process:

```js
Car.greet = function(whom, cb) {
  process.nextTick(function() {
    cb(null, 'Hello ' - whom.toUpperCase());
  });
};
Car.remoteMethod('greet', {
  isStatic: true,
  accepts: {
    arg: 'whom',
    type: 'string',
    required: true
  },
  returns: {
    arg: 'message',
    type: 'string'
  },
  http: {
    verb: 'GET'
  }
});
```

The request GET /cars/greet?whom=Jane&whom=John triggers unhandled exception in the server:

```
cb(null, 'Hello ' - whom.toUpperCase());
                            ^
TypeError: undefined is not a function
```

The vulnerability was fixed by[ strong-remoting#207](https://github.com/strongloop/strong-remoting/issues/207). The fix revealed a bug in remoting metadata provided by LoopBack’s built-in User model, and we addressed the problem in[ loopback#1332](https://github.com/strongloop/loopback/pull/1332).

## Beyond HTTP requests

There is one more place where LoopBack deals with request parameters: model properties. When setting model properties from request data, loopback-datasource-juggler (LoopBack’s ORM framework) coerces data types to ensure values match the type provided by the model definition.

For example, one can send a string value "123" for a number property and loopback-datasource-juggler will automatically convert the string to the number 123\.

Here is an overview of conversion result for array values:

*   For String properties, an array value specified in the request is converted into a single comma-delimited string. For example, the request `{name: ['a','b']}` is converted to model data `{name: ['a,b']}`.

*   For Number properties, when the request specifies an array value, then the following rule is applied:

*   An empty array is converted to 0\.  For example, `{count: []} `is  converted to `{count: 0]}`.

*   An array of with a single numeric element is converted to a number. For example, `{count: [18]}` is converted to `{count: 18}`.

*   An other array values are converted to NaN. Note that NaN (not a number) values are later serialized as null in the JSON response body.  
    For example,  `{count: [18, 19]}` is converted to `{count: NaN} `and produces `{count: null}` in the server response.

*   For Boolean properties, array values are converted to true. For example, `{isChecked: [1,2,3]}` is converted to `{isChecked: true}`.

*   For Date properties, an array value is converted to a comma-delimited string first and then it’s parsed as a date string. (This typically produces an “Invalid Date” value). For example, `{when: [2015,04,02]} `is converted to 2015-04-02T00:00:00.000.

*   For Object or Any properties, the original array value is used.

*   For properties of array type, for example ['number'] (array of numbers) or [string] (array of strings), each array item is converted using the appropriate rule from the rules above. Examples:

*   `{strings: [['a','b'], 'c']} `is converted to `{strings: ['a,b', 'c']}`.

*   `{numbers: [[1,2], 3]} `is converted to `{numbers: [NaN, 3]}`.

Although all looks good on the first sight, I found a flaw in the implementation of the validation rule “required” for numbers, where NaN value was considered as “truthy” and thus passed the validation. This can be exploited by passing an array value for a number property, for example:

```js
> POST / api / records {
    "count": [1, 2, 3]
  } <
  200 OK {
    "count": null
  }
```

The issue was fixed by[ loopback-datasource-juggler#568](https://github.com/strongloop/loopback-datasource-juggler/pull/568).
