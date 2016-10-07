---
title: "Validating model data"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Validating-model-data.html
summary:
---

A _schema_ imposes restrictions on the model, to ensure (for example) that the model will save data that matches the corresponding database table.

A model can validate data before passing it on to a data store such as a database to ensure that it conforms to the backend schema.

## Adding a schema to a model

Create a model schema to add data validation to a model.

For example, the following code defines a schema and assigns it to the product model. The schema defines two properties: name, a string that's a required property and  price, a number. 

**/common/models/model.js**

```js
var productSchema = {
  "name": {
    "type": "string",
    "required": true
  },
  "price": "number"
};
var Product = Model.extend('product', productSchema);
```

If a client tries to save a product with extra properties (for example, `description`), those properties are removed before the app saves the data in the model. Also, since `name` is a required value, the model will _only_ be saved if the product contains a value for the `name` property.

See also [Validatable class](https://docs.strongloop.com/display/zh/Validatable+class).

## Localizing validation messages

Rather than modifying the error responses returned by the server, you can localize the error message on the client. The validation error response contains error codes in `error.details.codes`, which enables clients to map errors to localized messages.

Here is an example error response:

**error.details.codes**

```js
{
  "name": "ValidationError",
  "status": 422,
  "message": "The Model instance is not valid. See error object `details` property for more info.",
  "statusCode": 422,
  "details": {
    "context": "user",
    "codes": {
      "password": [
        "presence"
      ],
      "email": [
        "uniqueness"
      ]
    },
    "messages": {
      "password": [
        "can't be blank"
      ],
      "email": [
        "Email already exists"
      ]
    }
  }
}
```
