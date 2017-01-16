---
title: "PersistedModel REST API"
lang: en
layout: navgroup
navgroup: models
toc_level: 1
keywords: LoopBack
tags: models
sidebar: lb3_sidebar
permalink: /doc/en/lb3/PersistedModel-REST-API.html
summary: PersistedModel is the base class for models connected to persistent data sources such as databases and is also the base class for all built-in models (except Email).
---

{% include content/API-Explorer.md %}

## Overview

[PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel) is the base class for models connected to persistent data sources
such as databases and is also the base class for all built-in models (except [Email](https://apidocs.strongloop.com/loopback/#email)).
It provides all the standard create, read, update, and delete (CRUD) operations and exposes REST endpoints for them.

By default, LoopBack uses `/api` as the URI root for the REST API. You can change this by changing the `restApiRoot` property in the application `/server/config.json` file.
See [config.json](config.json.html) for more information.

Model REST API endpoints are generally the plural form of the model name. By default this is simply the name with an "s" appended.
For example, if the model is "car" then "cars" is the plural form.
You can customize the plural form in the [model definition JSON file](Model-definition-JSON-file.html#top-level-properties).

{% include note.html content="
You can't customize the routes to PersistedModel REST API endpoints.
However, you can control how REST API endpoints are constructed from custom models with the `rest.normalizeHttpPath` property in `server/config.json`.
For more information, see [config.json (Remoting properties)](config.json.html#remoting-properties).
" %}

## Create model instance

Create a new instance of the model and persist it to the data source.

`POST /_modelName_`

### Arguments

* Form data - Model instance data. Can be JSON representing a single model instance or an array of model instances.

### Example

**Request URL**: `POST  http://localhost:3000/api/locations`

**Request body**: `{"name": "L1", "street": "107 S B St", "city": "San Mateo", "zipcode": "94401"}`

**Response status code**: `200`

**Response body**:

```javascript
{
  "id": "96",
  "street": "107 S B St",
  "city": "San Mateo",
  "zipcode": 94401,
  "name": "L1"
}
```

## Update / insert instance

Update an existing model instance or insert a new one into the data source. 
The update will override any specified attributes in the request data object.
It won't remove  existing ones unless the value is set to null.

Performs [upsert](http://apidocs.strongloop.com/loopback/#persistedmodelupsert)to detect if there is a matching instance.
If not, then inserts (creates) a new instance. If there is a matching instance, updates it.

`PUT /_modelName_`

### Arguments

* Form data - model instance data in JSON format.

### Examples

#### Insert

**Request URL**: `PUT  http://localhost:3000/api/locations`

**Request body**: `{"name": "L1", "street": "107 S B St", "city": "San Mateo", "zipcode": "94401"}`

**Response status code**: `200`

**Response body**:

```javascript
{
  "id": 98,
  "street": "107 S B St",
  "city": "San Mateo",
  "zipcode": 94401,
  "name": "L1"
}
```

#### Update

**Request URL**: `PUT  http://localhost:3000/api/locations`

**Request body**: `{"id": "98", "name": "L4", "street": "107 S B St", "city": "San Mateo", "zipcode": "94401"}`

**Response status code**: `200`

**Response body**:
```javascript
{
  "id": 98,
  "street": "107 S B St",
  "city": "San Mateo",
  "zipcode": 94401,
  "name": "L4"
}
```

## Check instance existence

Check whether a model instance exists by ID in the data source.

`GET /_modelName_/_modelID_/exists`

### Arguments

* _modelID_ - model instance ID

### Example

**Request URL**: `GET http://localhost:3000/api/locations/88/exists`

**Response status code**: `200`

**Response body**:
```javascript
{"exists": true}
```

## Find instance by ID

Find a model instance by ID from the data source.

`GET /modelName/modelID?filter=[filterType1]=<val1>&filter[filterType2]=<val2>...`

See also [Accessing related models](Accessing-related-models.html) for an example of fetching data from related models.

### Arguments

* **modelID** - Model instance ID
* _filterType1, _filterType2_, and so on, are the filter types. This operation supports only include and fields filters.
  See [Include filter](Include-filter.html) and [Fields filter](Fields-filter.html) for more information.
* _val1_, _val2_ are the corresponding values.

### Example

**Request URL**: `GET  http://localhost:3000/api/locations/88`

**Response status code**: `200`

**Response body**:

```javascript
{
    "id": 88,
    "street": "390 Lang Road",
    "city": "Burlingame",
    "zipcode": 94010,
    "name": "Bay Area Firearms"
}
```

## Find matching instances

Find all instances of the model matched by filter from the data source.

`GET /modelName?filter=[filterType1]=<val1>&filter[filterType2]=<val2>...`

### Arguments

Pass the arguments as the value of the `filter` HTTP query parameters, where:

* _filterType1_, _filterType2_, and so on, are the filter types.
* _val1_, _val2_ are the corresponding values.

See [Querying data](Querying-data.html) for an explanation of filter syntax.

**Example**

Request without filter:

**Request URL**: `GET  http://localhost:3000/api/locations`

Request with a filter to limit response to two records:

**Request URL**: `GET  http://localhost:3000/api/locations?filter[limit]=2`

**Response status code**: `200`

**Response body**:
```javascript
[
  {
    "id": "87",
    "street": "7153 East Thomas Road",
    "city": "Scottsdale",
    "zipcode": 85251,
    "name": "Phoenix Equipment Rentals"
  },
  {
    "id": "88",
    "street": "390 Lang Road",
    "city": "Burlingame",
    "zipcode": 94010,
    "name": "Bay Area Firearms"
  }
]
```

## Find first instance

Find first instance of the model matched by filter from the data source.

`GET /modelName/findOne?filter=[filterType1]=<val1>&filter[filterType2]=<val2>...`

### Arguments

Query parameters:

* **filter** - Filter that defines where, order, fields, skip, and limit. It's same as find's filter argument. See [Querying data](Querying-data.html) details.

### Example

**Request URL**: `GET  http://localhost:3000/api/locations/findOne?filter[where][city]=Scottsdale`

**Response status code**: `200`

**Response body**:

```javascript
{
  "id": "87",
  "street": "7153 East Thomas Road",
  "city": "Scottsdale",
  "zipcode": 85251,
  "name": "Phoenix Equipment Rentals"
}
```

## Delete model instance

Delete a model instance by ID from the data source

`DELETE /modelName/modelID`

### Arguments

* **modelID**  - model instance ID

### Example

**Request URL**: `DELETE  http://localhost:3000/api/locations/88`

**Response status code**: `204`

## Delete all matching instances

{% include warning.html content="By default, this operation is not exposed over REST to prevent deleting data unintentionally.
" %}

Delete model instanced from the data source that match the specified where clause.

`DELETE /modelName?filter=[filterType1]=<val1>&filter[filterType2]=<val2>...`

### Arguments

* **filter** - Filter that defines where, order, fields, skip, and limit. It's same as find's filter argument. See [Querying data](Querying-data.html) details.

### Example

**Request URL**: `DELETE  http://localhost:3000/api/locations?[where][city]=Dallas`

**Response status code**: `200`

## Get instance count

Count instances of the model  from the data source matched by where clause.

`GET /modelName/count?where[property]=value`

### Arguments

* **where** - criteria to match model instances. See [Where filter](Where-filter.html) for more information.

### Example

Count without "where" filter

**Request URL**: `GET  http://localhost:3000/api/locations/count`

Count with a "where" filter

**Request URL**: `GET  http://localhost:3000/api/locations/count?where[city]=Burlingame`

**Response status code**: `200`

**Response body**:

```javascript
{count: 6}
```

## Update model instance attributes

Update attributes of a model instance and persist into the data source.

`PUT /model/modelID`

### Arguments

* data - An object containing property name/value pairs
* _modelID_ - The model instance ID

### Example

**Request URL**: `PUT  http://localhost:3000/api/locations/88`

**Request body**:

```javascript
{"name": "L2"}
```

**Response status code**: `200`

**Response body**:

```javascript
{
  "id": "88",
  "street": "390 Lang Road",
  "city": "Burlingame",
  "zipcode": 94010,
  "name": "L2"
}
```

## Update matching model instances

Update attributes of matching model instances and persist into the data source.

`POST /modelName/update?where[property]=value`

### Arguments

* data - An object containing property name/value pairs.
* _where_ - The where object to select matching instances. See [Where filter](Where-filter.html) for more information.

### Example

**Request URL**: `POST  http://localhost:3000/api/locations/update?where[city]=Burlingame`

**Request body**:

```javascript
{"city": "San Jose"}
```

**Response status code**: `200`

## Create Change Stream

Create a new change stream.

`POST /modelName/change-stream?format=event-stream`

### Arguments

* Form data - Model instance data. JSON representing a single model instance or an array of model instances.

### Example

**Request URL**: `POST  http://localhost:3000/api/locations/`

**Request body**:

```javascript
{"city": "San Jose"}
```

## Get Change Stream

Fetch a change stream.

`GET /modelName/change-stream?format=event-stream`
