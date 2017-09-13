---
title: "LoopBack types"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/LoopBack-types.html
summary:
---

## Overview

Various LoopBack methods accept type descriptions, for example [remote methods](Remote-methods.html) and 
[dataSource.createModel()](http://apidocs.loopback.io/loopback-datasource-juggler/#datasource-prototype-createmodel).

The following table summarizes LoopBack's data types.

<table>
  <tbody>
    <tr>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>any</td>
      <td>Any type, including array, object, Date, or GeoPoint</td>
      <td>Any of: <code>true</code>, <code>123</code>, <code>"foo"</code>, <code>[ "one", 2, true ]</code></td>
    </tr>
    <tr>
      <td>array</td>
      <td>
        <p>JSON array</p>
        <p>See <a href="LoopBack-types.html#array-types">Array types</a> below.</p>
      </td>
      <td><code>[ "one", 2, true ]</code></td>
    </tr>
    <tr>
      <td>Boolean</td>
      <td>JSON Boolean</td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td>buffer</td>
      <td>Node.js <a href="http://nodejs.org/api/buffer.html" class="external-link" rel="nofollow">Buffer object</a></td>
      <td>
        <pre>new Buffer(42);</pre>
      </td>
    </tr>
    <tr>
      <td>date</td>
      <td>JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date" class="external-link" rel="nofollow">Date object</a></td>
      <td>
        <p><code>new Date("December 17, 2003 03:24:00");</code></p>
      </td>
    </tr>
    <tr>
      <td>GeoPoint</td>
      <td>
        <p>LoopBack <a href="http://apidocs.loopback.io/loopback-datasource-juggler/#geopoint" class="external-link" rel="nofollow">GeoPoint</a> object</p>
      </td>
      <td>
        <pre>new GeoPoint({lat: 10.32424, lng: 5.84978});</pre>
      </td>
    </tr>
    <tr>
      <td>DateString</td>
      <td>
        <p>LoopBack<a href="http://apidocs.loopback.io/loopback-datasource-juggler/#datestring" class="external-link" rel="nofollow"> DateString</a> object</p>
      </td>
      <td>
        <p><code>"2000-01-01T00:00:00.000Z"</code></p>
        <p><code>"2000-01-01"</code></p>
        <p><code>"2000-01-01 12:00:00"</code></p>
      </td>
    </tr>
    <tr>
      <td>null</td>
      <td>JSON null</td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td>number</td>
      <td>JSON number</td>
      <td>
        <p><code>3.1415</code></p>
      </td>
    </tr>
    <tr>
      <td>Object</td>
      <td>
        <p>JSON object or any type</p>
        <p>See <a href="LoopBack-types.html#object-types">Object types</a> below.</p>
      </td>
      <td>
        <pre class="de1">{ "firstName": "John", "lastName": "Smith", "age": 25 }</pre>
      </td>
    </tr>
    <tr>
      <td>String</td>
      <td>JSON string</td>
      <td><code>"StrongLoop"</code></td>
    </tr>
  </tbody>
</table>

In general, a property will have `undefined` value if no explicit or default value is provided.

{% include important.html content="
 The type name is case-insensitive; so for example you can use either \"Number\" or \"number\".
" %}

## Array types

LoopBack supports array types as follows:

* `{emails: [String]}`
* `{"emails": ["string"]}`
* `{"emails": [{"type": "string", "length": 64}]}`
* `{"emails": "array"}` (a shorthand notation for `{"emails": ["any"]}`)

### Array of objects

Define an array of objects as follows (for example):

```javascript
...
"Address": {
  "type": [
    "object"
  ],
  "required": true
}
...
```

## Object types

Use the Object type when you need to be able to accept values of different types, for example a string or an array.

A model often has properties that consist of other properties.
For example, the user model can have an `address` property that in turn has properties such as `street`, `city`, `state`, and `zipCode`.
LoopBack allows inline declaration of such properties, for example:

```javascript
var UserModel = {
    firstName: String,
    lastName: String,
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    ...
}
```

The value of the address is the definition of the `address` type, which can be also considered an "anonymous" model.

If you intend to reuse the address model, define it independently and reference it in the user model. For example:

```javascript
var AddressModel = {
    street: String,
    city: String,
    state: String,
    zipCode: String
};

var Address = ds.define('Address', AddressModel);

var UserModel = {
        firstName: String,
        lastName: String,
        address: 'Address',  // or address: Address
        //...
}

var User = ds.define('User', UserModel);
```

{% include important.html content="
The user model has to reference the Address constructor or the model name - `'Address'`.
" %}
