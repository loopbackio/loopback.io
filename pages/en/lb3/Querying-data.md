---
title: "Querying data"
lang: en
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Querying-data.html
summary:
---
{% include content/angular-methods-caveat.html lang=page.lang %}

{% include see-also.html content="
* [Fields filter](Fields-filter.html)
* [Include filter](Include-filter.html)
* [Limit filter](Limit-filter.html)
* [Order filter](Order-filter.html)
* [Skip filter](Skip-filter.html)
* [Where filter](Where-filter.html)
* [Querying related models](Querying-related-models.html).
" %}

{% include toc.html %}

## Overview

A _query_ is a read operation on models that returns a set of data or results.
You can query LoopBack models using a Node API and a REST API, using _filters_, as outlined in the following table. Filters specify criteria for the returned data set.
The capabilities and options of the two APIs are the same–the only difference is the syntax used in HTTP requests versus Node function calls.
In both cases, LoopBack models return JSON.

<table>
  <thead>
    <tr>
      <th>Query</th>
      <th>Model API (Node)</th>
      <th>REST API</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>
        Find all model instances using specified filters.
      </td>
      <td>
        <code><a href="https://apidocs.loopback.io/loopback/#persistedmodel-find" class="external-link">find(filter, callback)</a></code>
        Where filter is a JSON object containing the query filters.
        See <a href="Querying-data.html">Filters</a> below.
      </td>
      <td>
         <code>GET /<em>modelName</em>?filter...</code>
        See <a href="PersistedModel-REST-API.html#find-matching-instances">Model REST API - Find matching instances</a>.
        <span>See </span><a href="Querying-data.html">Filters</a> <span> below.</span>
      </td>
    </tr>
    <tr>
      <td>Find first model instance using specified filters.</td>
      <td>
        <code><a href="https://apidocs.loopback.io/loopback/#persistedmodel-findone" class="external-link">findOne(filter, callback)</a></code>
        Where filter is a JSON object containing the query filters.
        <span>See </span><a href="Querying-data.html">Filters</a> <span> below.</span>
      </td>
      <td>
        <code><span>GET /<em>modelName</em>/findOne?filter...</span></code>
        See <a href="PersistedModel-REST-API.html#find-first-instance">Model REST API - Find first instance</a>.
        <span>See </span><a href="Querying-data.html">Filters</a> <span> below.</span>
      </td>
    </tr>
    <tr>
      <td>Find instance by ID.</td>
      <td>
        <code><a href="https://apidocs.loopback.io/loopback/#persistedmodel-findbyid" class="external-link">findById(id, [filter,] callback)</a></code>
        Where optional filter is a JSON object <span>containing the query filters.</span>
        <span><span>See </span><a href="Querying-data.html">Filters</a> <span> below.</span></span>

      </td>
      <td>
        <code><span>GET /</span><em>modelName</em><span>/</span><em>modelID</em></code>
        See <a href="PersistedModel-REST-API.html#find-instance-by-id">Model REST API - Find instance by ID</a>.
      </td>
    </tr>
  </tbody>
</table>

{% include important.html content="
A REST query must include the literal string \"filter\" in the URL query string.
The Node API call does not include the literal string \"filter\" in the JSON.

[LoopBack API Explorer](Use-API-Explorer.html) adds \"filter\" to the query string,
but you must enter [Stringified JSON](#using-stringified-json-in-rest-queries) in the **filter** field.
Also make sure that the quotes you use are proper straight quotes ( \" ), not curved or typographic quotation marks (  “ or ” ). These can often be hard to distinguish visually.
" %}

{% include tip.html content="
If you are trying [query filters](#filters) with curl, use the `-g` or `--globoff`  option to use brackets `[` and `]` in request URLs.
" %}

LoopBack supports the following kinds of filters:

* [Fields filter](Fields-filter.html)
* [Include filter](Include-filter.html)
* [Limit filter](Limit-filter.html)
* [Order filter](Order-filter.html)
* [Skip filter](Skip-filter.html)
* [Where filter](Where-filter.html)

See [Filters](#filters) below for more information.

### Examples

See additional examples of each kind of filter in the individual articles on filters (for example [Where filter](Where-filter.html)).

An example of using the `find()` method with both a _where_ and a _limit_ filter:

```javascript
Account.find({where: {name: 'John'}, limit: 3}, function(err, accounts) { /* ... */ });
```

Equivalent using REST:

`/accounts?filter[where][name]=John&filter[limit]=3`

## Filters

In both REST and Node API, you can use any number of filters to define a query.

LoopBack supports a specific filter syntax: it's a lot like SQL, but designed specifically to serialize safely without injection and to be native to JavaScript.
Previously, only the [`PersistedModel.find()`](http://apidocs.loopback.io/loopback/#persistedmodel-find) method (and related methods) supported this syntax.

The following table describes LoopBack's filter types:

<table>
  <thead>
    <tr>
      <th>Filter type</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>fields</td>
      <td>Object, Array, or String</td>
      <td>
        Specify fields to include in or exclude from the response.
        See <a href="Fields-filter.html">Fields filter</a>.
      </td>
    </tr>
    <tr>
      <td>include</td>
      <td>String, Object, or Array</td>
      <td>
        Include results from related models, for relations such as<em>belongsTo</em>and<em>hasMany</em>.
        See <a href="Include-filter.html">Include filter</a>.
      </td>
    </tr>
    <tr>
      <td>limit</td>
      <td>Number</td>
      <td>
        Limit the number of instances to return.
        See <a href="Limit-filter.html">Limit filter</a>.
      </td>
    </tr>
    <tr>
      <td>order</td>
      <td>String</td>
      <td>
        Specify sort order: ascending or descending.
        See <a href="Order-filter.html">Order filter</a>.
      </td>
    </tr>
    <tr>
      <td>skip (offset)</td>
      <td>Number</td>
      <td>
        Skip the specified number of instances.
        See <a href="Skip-filter.html">Skip filter</a>.
      </td>
    </tr>
    <tr>
      <td>where</td>
      <td>Object</td>
      <td>
        Specify search criteria; similar to a WHERE clause in SQL.
        See <a href="Where-filter.html">Where filter</a>.
      </td>
    </tr>
  </tbody>
</table>

### REST syntax

Specify filters in the [HTTP query string](http://en.wikipedia.org/wiki/Query_string):

`?filter_filterType_=_spec_&_filterType_=_spec_....`

The number of filters that you can apply to a single request is limited only by the maximum URL length, which generally depends on the client used.

{% include important.html content="
There is no equal sign after `?filter` in the query string; for example
`http://localhost:3000/api/books?filter[where][id]=1` 
" %}

{% include note.html content="See [https://github.com/hapijs/qs](https://github.com/hapijs/qs) for more details.
" %}

### Node syntax

Specify filters as the first argument to `find()` and `findOne()`: 

```javascript
{ filterType: spec, filterType: spec, ... }
```

There is no theoretical limit on the number of filters you can apply.

Where:

* _filterType_ is the filter: [where](Where-filter.html), [include](Include-filter.html), [order](Order-filter.html),
  [limit](Limit-filter.html), [skip](Skip-filter.html), or [fields](Fields-filter.html).
* _spec_ is the specification of the filter: for example for a _where_ filter, this is a logical condition that the results must match.
  For an _include_ filter it specifies the related fields to include.

### Using "stringified" JSON in REST queries

Instead of the standard REST syntax described above, you can also use "stringified JSON" in REST queries.
To do this, simply use the JSON specified for the Node syntax, as follows:

`?filter={ Stringified-JSON }`

where _Stringified-JSON_ is the stringified JSON from Node syntax. However, in the JSON all text keys/strings must be enclosed in quotes (").

{% include important.html content="
When using stringified JSON, you must use an equal sign after `?filter` in the query string.

For example: `http://localhost:3000/api/books?filter={%22where%22:{%22id%22:2}}` 
" %}

For example: `GET /api/activities/findOne?filter={"where":{"id":1234}}`

### Filtering arrays of objects

The [loopback-filters](https://github.com/strongloop/loopback-filters) module implements LoopBack's filter syntax.
Using this module, you can filter arrays of objects using the same filter syntax supported by `MyModel.find(filter)`.

{% include note.html content="
We plan to convert all modules to use `loopback-filter`, so it will become LoopBack's common \"built-in\" filtering mechanism.
" %}

Here is a basic example using the new module.

```javascript
var data = [{n: 1}, {n: 2}, {n: 3, id: 123}];
var filter = {where: {n: {gt: 1}}, skip: 1, fields: ['n']};
var filtered = require('loopback-filters')(data, filter);
console.log(filtered); // => [{n: 3}]
```

For a bit more detail, say you are parsing a comma-separated value (CSV) file, and you need to output all values where the price column is between 10 and 100.
To use the LoopBack filter syntax you would need to either create your own CSV connector or use the memory connector, both of which require some extra work not related to your actual goal.

Once you've parsed the CSV (with a module like `node-csv`) you will have an array of objects like this, for example (but with, say, 10,000 unique items):

```javascript
[
  {price: 85, id: 79},
  {price: 10, id: 380},
  //...
]
```

To filter the rows you could use generic JavaScript like this:

```javascript
data.filter(function(item) {
  return item.price < 100 && item.price >= 10
});
```

This is pretty simple for filtering, but sorting, field selection, and more advanced operations become a bit tricky.
On top of that, you are usually accepting the parameters as input.

For example:

```javascript
var userInput = {min: 10, max: 100}

data.filter(function(item) {
  return item.price < userInput.min && item.price >= userInput.max
});
```

You can rewrite this easily as a LoopBack filter:

```javascript
filter(data, {where: {input: {gt: userInput.min, lt: userInput.max}}})
```

Or if you just adopt the filter object syntax as user input:

```javascript
filter(data, userInput)
```

But `loopback-filter`s supports more than just excluding and including.
It supports field selection (including / excluding fields), sorting, geo/distance sorting, limiting and skipping.
All in a declarative syntax that is easily created from user input.

As a LoopBack user this is a pretty powerful thing.
Typically, you will have learned how to write some complex queries using the `find()` filter syntax; before you would need to figure out how to do the
same thing in JavaScript (perhaps using a library such as underscore). Now with the `loopback-filters` module, in your client application you can re-use
the same exact filter object you were sending to the server to filter the database without having to interact with a LoopBack server at all.

### Filtering nested properties

Loopback supports filtering nested properties in three NoSQL connectors: Mongodb, Cloudant, Memory.

For example, model `User` contains a nested property `user.address.tags.tag`:

```javascript
db.define('User', {
  name: {type: String, index: true},
  email: {type: String, index: true},
  address: {
    street: String,
    city: String,
    tags: [
      {
        tag: String,
      }
    ]
  }
});
```

users can do a nested query like `User.find({where: {'address.tags.tag': 'business'}}`.

Data source connectors for relational databases don't support filtering nested properties.
