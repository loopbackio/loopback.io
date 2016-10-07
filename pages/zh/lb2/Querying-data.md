---
title: "Querying data"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Querying-data.html
summary:
---

{% include warning.html content="

Methods of models in the [AngularJS client](https://docs.strongloop.com/display/zh/AngularJS+JavaScript+SDK) have a different signature than those of the Node API. For more information, see [AngularJS SDK API](http://apidocs.strongloop.com/loopback-sdk-angular/).

" %}

**See also**: See also: [Querying related models](/doc/{{page.lang}}/lb2/Querying-related-models.html).

## Overview

A _query_ is a read operation on models that returns a set of data or results.   You can query LoopBack models using a Node API and a REST API, using _filters_, as outlined in the following table.  Filters specify critera for the returned data set. The capabilities and options of the two APIs are the same–the only difference is the syntax used in HTTP requests versus Node function calls.  In both cases, LoopBack models return JSON.

<table>
  <tbody>
    <tr>
      <th>Query</th>
      <th>Model API (Node)</th>
      <th>REST API</th>
    </tr>
    <tr>
      <td>
        <p>Find all model instances using specified filters.&nbsp;</p>
        <p>&nbsp;</p>
      </td>
      <td>
        <p><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodelfindfilter-callback" class="external-link" rel="nofollow">find(filter, callback)</a></code></p>
        <p>Where filter is a JSON object containing the query filters.</p>
        <p>See <a href="/doc/{{page.lang}}/lb2/Querying-data.html">Filters</a> below.</p>
      </td>
      <td>
        <p><span>&nbsp;</span><code>GET /<em>modelName</em>?filter...</code></p>
        <p>See <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Findmatchinginstances">Model REST API - Find matching instances</a>.</p>
        <p><span>See </span><a href="/doc/{{page.lang}}/lb2/Querying-data.html">Filters</a><span>&nbsp;</span><span> below.</span></p>
      </td>
    </tr>
    <tr>
      <td>Find first model instance using specified filters.</td>
      <td>
        <p><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodelfindoneparams-cb" class="external-link" rel="nofollow">findOne(filter, callback)</a></code></p>
        <p>Where filter is a JSON object containing the query filters.</p>
        <p><span>See </span><a href="/doc/{{page.lang}}/lb2/Querying-data.html">Filters</a><span>&nbsp;</span><span> below.</span></p>
      </td>
      <td>
        <p><code><span>GET /<em>modelName</em>/findOne?filter...</span></code></p>
        <p>See <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Findfirstinstance">Model REST API - Find first instance</a>.&nbsp;</p>
        <p><span>See </span><a href="/doc/{{page.lang}}/lb2/Querying-data.html">Filters</a><span>&nbsp;</span><span> below.</span></p>
      </td>
    </tr>
    <tr>
      <td>Find instance by ID.</td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodelfindbyidid-cb" class="external-link" rel="nofollow">findById()</a></code><code><a href="http://docs.strongloop.com/display/DOC/DataModel+class#datamodelfindbyidid-cb" class="external-link" rel="nofollow">&nbsp;</a></code></td>
      <td>
        <p><code><span>GET /</span><em>modelName</em><span>/</span><em>modelID</em></code></p>
        <p>See <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-FindinstancebyID">Model REST API - Find instance by ID</a>.</p>
      </td>
    </tr>
  </tbody>
</table>

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Consider adding something like this <a href="http://docs.mongodb.org/manual/reference/sql-comparison/" class="external-link" rel="nofollow">http://docs.mongodb.org/manual/reference/sql-comparison/</a></div>

{% include important.html content="

A REST query must include the literal string \"filter\" in the URL query string. The Node API call does not include the literal string \"filter\" in the JSON.

" %}

LoopBack supports the following kinds of filters:

*   [fields（字段）过滤器](/doc/{{page.lang}}/lb2/6095114.html)
*   [Include（加载导航属性）过滤器](/doc/{{page.lang}}/lb2/6095115.html)
*   [Limit（返回结果数限制）过滤器](/doc/{{page.lang}}/lb2/6095117.html)
*   [Order（排序）过滤器](/doc/{{page.lang}}/lb2/6095116.html)
*   [Skip过滤器](/doc/{{page.lang}}/lb2/6095119.html)
*   [Where过滤器](/doc/{{page.lang}}/lb2/6095118.html)

See [Filters](/doc/{{page.lang}}/lb2/Querying-data.html) below for more information.

### Examples

See additional examples of each kind of filter in the individual articles on filters (for example [Where过滤器](/doc/{{page.lang}}/lb2/6095118.html)).

An example of using the `find()` method with both a _where_ and a _limit_ filter:

`Account.find({where: {name: 'John'}, limit: 3}, function(err, accounts) { ... });`

Equivalent using REST:

`/accounts?filter[where][name]=John&filter[limit]=3`

## Filters

In both REST and Node API, you can use any number of filters to define a query.  The following table describes the filter types:

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
        <p>Specify fields to include in or exclude from the response.</p>
        <p>See <a href="/doc/{{page.lang}}/lb2/6095114.html">fields（字段）过滤器</a>.</p>
      </td>
    </tr>
    <tr>
      <td>include</td>
      <td>String, Object, or Array</td>
      <td>
        <p>Include results from related models, for relations such as&nbsp;<em>belongsTo</em>&nbsp;and&nbsp;<em>hasMany</em>.</p>
        <p>See <a href="/doc/{{page.lang}}/lb2/6095115.html">Include（加载导航属性）过滤器</a>.</p>
      </td>
    </tr>
    <tr>
      <td>limit</td>
      <td>Number</td>
      <td>
        <p>Limit the number of instances to return.</p>
        <p>See <a href="/doc/{{page.lang}}/lb2/6095117.html">Limit（返回结果数限制）过滤器</a>.</p>
      </td>
    </tr>
    <tr>
      <td>order</td>
      <td>String</td>
      <td>
        <p>Specify sort order: ascending or descending.</p>
        <p>See <a href="/doc/{{page.lang}}/lb2/6095116.html">Order（排序）过滤器</a>.</p>
      </td>
    </tr>
    <tr>
      <td>skip (offset)</td>
      <td>Number</td>
      <td>
        <p>Skip the specified number of instances.</p>
        <p>See <a href="/doc/{{page.lang}}/lb2/6095119.html">Skip过滤器</a>.</p>
      </td>
    </tr>
    <tr>
      <td>where</td>
      <td>Object</td>
      <td>
        <p>Specify search criteria; similar to a WHERE clause in SQL.</p>
        <p>See <a href="/doc/{{page.lang}}/lb2/6095118.html">Where过滤器</a>.</p>
      </td>
    </tr>
  </tbody>
</table>

### REST syntax

Specify filters in the [HTTP query string](http://en.wikipedia.org/wiki/Query_string):

```
?filter_filterType_=_spec_&_filterType_=_spec_....

See [https://github.com/hapijs/qs](https://github.com/hapijs/qs) for more details.
```

The number of filters that you can apply to a single request is limited only by the maximum URL length, which generally depends on the client used.

{% include important.html content="

There is no equal sign after `?filter` in the query string; for example
`http://localhost:3000/api/books?filter[where][id]=1` 

" %}

### Node syntax

Specify filters as the first argument to `find()` and `findOne()`: 

`{ _filterType_: _spec_, _filterType_: _spec_, ... }`

There is no theoretical limit on the number of filters you can apply.

Where:

*   _filterType_ is the filter: [where](/doc/{{page.lang}}/lb2/6095118.html), [include](/doc/{{page.lang}}/lb2/6095115.html), [order](/doc/{{page.lang}}/lb2/6095116.html), [limit](/doc/{{page.lang}}/lb2/6095117.html), [skip](/doc/{{page.lang}}/lb2/6095119.html), or [fields](/doc/{{page.lang}}/lb2/6095114.html).
*   _spec_ is the specification of the filter: for example for a _where_ filter, this is a logical condition that the results must match; for an _include_ filter it specifies the related fields to include.

### Using "stringified" JSON in REST queries

Instead of the standard REST syntax described above, you can also use "stringified JSON" in REST queries.  To do this, simply use the JSON specified for the Node syntax, as follows:

`?filter={ _Stringified-JSON_ } `

where _Stringified-JSON_ is the stringified JSON from Node syntax.  However, in the JSON all text keys/strings must be enclosed in quotes (").

{% include important.html content="

When using stringified JSON, you must use an equal sign after `?filter` in the query string; for example
`http://localhost:3000/api/books?filter={%22where%22:{%22id%22:2}}` 

" %}

For example:

`GET /api/activities/findOne?filter={"where":{"id":1234}}`
