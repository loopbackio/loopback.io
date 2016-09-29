---
title: "PersistedModel REST API"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/PersistedModel-REST-API.html
summary:
---

{% include note.html content="

You can use the **[StrongLoop API Explorer](https://docs.strongloop.com/pages/viewpage.action?pageId=6095009)** to quickly construct and make requests to a LoopBack app running on the server. If a LoopBack app is running on `localhost` at port `3000`, you can find the API Explorer at [http://localhost:3000/explorer/](http://localhost:3000/explorer/).

" %}

**Related articles**

<div class="panelContent" style="background-color: #CCE0CC;">

*   [Creating models](https://docs.strongloop.com/display/zh/Creating+models)
*   [Customizing models](https://docs.strongloop.com/display/zh/Customizing+models)
*   [Creating model relations](https://docs.strongloop.com/display/zh/Creating+model+relations)
*   [Querying data](https://docs.strongloop.com/display/zh/Querying+data)
*   [Model definition JSON file](https://docs.strongloop.com/display/zh/Model+definition+JSON+file)
*   [PersistedModel REST API](https://docs.strongloop.com/display/zh/PersistedModel+REST+API)

</div>

## Overview

[PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel) is the base class for models connected to persistent data sources such as databases and is also the base class for all built-in models (except [Email](/doc/{{page.lang}}/lb2/Email.html)).  It provides all the standard create, read, update, and delete (CRUD) operations and exposes REST endpoints for them.

By default, LoopBack uses `/api` as the URI root for the REST API.  You can change this by changing the `restApiRoot` property in the application `/server/config.json` file.  See [config.json](/doc/{{page.lang}}/lb2/config.json.html) for more information.

The model names in the REST API are generally the plural form of the model name. By default this is simply the name with an "s" appended; for example, if the model is "car" then "cars" is the plural form. The plural form can be customized to be of any value in the [model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html).

## Create model instance

Create a new instance of the model and persist it to the data source.

`POST /_modelName_`

### **Arguments**

*   Form data - Model instance data.  Can be JSON representing a single model instance or an array of model instances.

### **Example**

**Request URL**:   `POST  http://localhost:3000/api/locations`

**Request body**:`{"name": "L1", "street": "107 S B St", "city": "San Mateo", "zipcode": "94401"}`

**Response status code**: `200`

**Response body**:```js
{
  "id": "96",
  "street": "107 S B St",
  "city": "San Mateo",
  "zipcode": 94401,
  "name": "L1"
}
```

## Update / insert instance

Update an existing model instance or insert a new one into the data source. The update will override any specified attributes in the request data object. It won’t remove  existing ones unless the value is set to null.

Performs [upsert ](http://apidocs.strongloop.com/loopback/#persistedmodelupsert)to detect if there is a matching instance; if not, then inserts (creates) a new instance.  If there is a matching instance, updates it.

`PUT /_modelName_`

### **Arguments**

*   Form data - model instance data in JSON format.

### **Examples**

#### **Insert**

**Request URL**:   `PUT  http://localhost:3000/api/locations`

**Request body**:`{"name": "L1", "street": "107 S B St", "city": "San Mateo", "zipcode": "94401"}`

**Response status code**: `200`

**Response body**:```js
{
  "id": 98,
  "street": "107 S B St",
  "city": "San Mateo",
  "zipcode": 94401,
  "name": "L1"
}
```

#### **Update**

**Request URL**:   `PUT  http://localhost:3000/api/locations`

**Request body**:`{"id": "98", "name": "L4", "street": "107 S B St", "city": "San Mateo", "zipcode": "94401"}`

**Response status code**: `200`

**Response body**:```js
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

### **Arguments**

*   _modelID_ - model instance ID

### **Example**

**Request URL**:   `GET  http://localhost:3000/api/locations/88/exists`

**Response status code**: `200`

**Response body**:```js
{
  "exists": true
}
```

## Find instance by ID

Find a model instance by ID from the data source.

`GET /_modelName_/_modelID_`

### **Arguments**

*   **modelID** - Model instance ID

### **Example**

**Request URL**:   `GET  http://localhost:3000/api/locations/88`

**Response status code**: `200`

**Response body**:```js
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

`GET /_modelName_?filter=[_filterType1_]=<_val1_>&filter[_filterType2_]=<_val2_>...`

### **Arguments**

Pass the arguments as the value of the `filter` HTTP query parameters, where:

*   _filterType1_, _filterType2_, and so on, are the filter types.
*   _val1_, _val2_ are the corresponding values.

 See [Querying data](/doc/{{page.lang}}/lb2/Querying-data.html) for an explanation of filter syntax.

**Example**

Request without filter:

**Request URL**:   `GET  http://localhost:3000/api/locations`

Request with a filter to limit response to two records:

**Request URL**:   `GET  http://localhost:3000/api/locations?filter[limit]=2`

**Response status code**: `200`

**Response body**:```js
[{
  "id": "87",
  "street": "7153 East Thomas Road",
  "city": "Scottsdale",
  "zipcode": 85251,
  "name": "Phoenix Equipment Rentals"
}, {
  "id": "88",
  "street": "390 Lang Road",
  "city": "Burlingame",
  "zipcode": 94010,
  "name": "Bay Area Firearms"
}]
```

## Find first instance

Find first instance of the model matched by filter from the data source.

`GET /modelName/findOne?filter=[_filterType1_]=<_val1_>&filter[_filterType2_]=<_val2_>...`

### **Arguments**

Query parameters:

*   **filter** - Filter that defines where, order, fields, skip, and limit. It's same as find's filter argument. See [Querying data](/doc/{{page.lang}}/lb2/Querying-data.html) details.

### **Example**

**Request URL**:   `GET  http://localhost:3000/api/locations/findOne?filter[where][city]=Scottsdale`

**Response status code**: `200`

**Response body**:```js
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

`DELETE /_modelName_/_modelID_`

### **Arguments**

*   **modelID**  - model instance ID

### **Example**

**Request URL**:   `DELETE  http://localhost:3000/api/locations/88`

**Response status code**: `204`

## Get instance count

Count instances of the model  from the data source matched by where clause.

`GET /_modelName_/count?where[_property_]=_value_`

### **Arguments**

*   **where** - criteria to match model instances.  See [Where过滤器](/doc/{{page.lang}}/lb2/6095118.html) for more information.

### **Example**

Count without "where" filter

**Request URL**:   `GET  http://localhost:3000/api/locations/count`

Count with a "where" filter

**Request URL**:   `GET  http://localhost:3000/api/locations/count?where[city]=Burlingame`

**Response status code**: `200`

**Response body**:```js
{
  count: 6
}
```

## Update model instance attributes

Update attributes of a model instance and persist into the data source.

`PUT /_model_/_modelID_`

### **Arguments**

*   data - An object containing property name/value pairs
*   _modelID_ - The model instance ID

### **Example**

**Request URL**:   `PUT  http://localhost:3000/api/locations/88`

**Request body**:`{"name": "L2"}`

**Response status code**: `200`

**Response body**:```js
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

`POST /_model/update?where[property]=value_`

### **Arguments**

*   data - An object containing property name/value pairs.
*   _where_ - The where object to select matching instances.  See [Where过滤器](/doc/{{page.lang}}/lb2/6095118.html) for more information.

### **Example**

**Request URL**:   `POST  http://localhost:3000/api/locations/update?where[city]=Burlingame`

**Request body**:`{"city": "San Jose"}`

**Response status code**: `204`
