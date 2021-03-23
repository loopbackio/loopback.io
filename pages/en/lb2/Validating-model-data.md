---
title: "Validating model data"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Validating-model-data.html
summary:
---

A _schema_ imposes restrictions on the model, to ensure (for example) that the model will save data that matches the corresponding database table.

A model can validate data before passing it on to a data store such as a database to ensure that it conforms to the backend schema.

## Adding a schema to a model

One way to validate data is to create a model schema; LoopBack will then ensure that data conforms to that schema definition.

For example, suppose your app has a product model. The following code defines a schema and assigns it to the product model.
The schema defines two properties: name, a required string property and price, an optional number property. 

{% include code-caption.html content="common/models/product.js" %}
```javascript
var productSchema = {
  "name": { "type": "string", "required": true },
  "price": "number"
};
var Product = Model.extend('product', productSchema);
```

If a client tries to save a product with extra properties (for example, `description`), those properties are removed before the app saves the data in the model.
Also, since `name` is a required value, the model will _only_ be saved if the product contains a value for the `name` property.

## Using validation methods

Every model attached to a persistent data source has validations methods mixed in from [Validatable](http://apidocs.strongloop.com/loopback-datasource-juggler/#validatable).

<table>
  <tbody>
    <tr>
      <th>Method</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><a href="https://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-validatesabsenceof" class="external-link" rel="nofollow">validatesAbsenceOf</a></td>
      <td>Validate absence of one or more specified properties. A model should not include a property to be considered valid; fails when validated field not blank.</td>
    </tr>
    <tr>
      <td><a href="https://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-validatesexclusionof" class="external-link" rel="nofollow">validatesExclusionOf</a></td>
      <td>Validate exclusion. Require a property value not be in the specified array.</td>
    </tr>
    <tr>
      <td><a href="https://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-validatesformatof" class="external-link" rel="nofollow">validatesFormatOf</a></td>
      <td>
        <p>Validate format. Require a model to include a property that matches the given format.</p>
      </td>
    </tr>
    <tr>
      <td><a href="https://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-validatesinclusionof" class="external-link" rel="nofollow">validatesInclusionOf</a></td>
      <td>Validate inclusion in set. Require a value for property to be in the specified array.</td>
    </tr>
    <tr>
      <td><a href="https://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-validateslengthof" class="external-link" rel="nofollow">validatesLengthOf</a></td>
      <td>
        <p>Validate length. Require a property length to be within a specified range. Three kinds of validations: "min," "max," and "is." Default error messages are:</p>
        <ul>
          <li>min: too short</li>
          <li>max: too long</li>
          <li>is: length is wrong</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href="https://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-validatesnumericalityof" class="external-link" rel="nofollow">validatesNumericalityOf</a></td>
      <td>Validate numericality. Requires a value for property to be either an integer or number.</td>
    </tr>
    <tr>
      <td><a href="https://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-validatespresenceof" class="external-link" rel="nofollow">validatesPresenceOf</a></td>
      <td>Validate presence of one or more specified properties. Requires a model to include a property to be considered valid; fails when validated field is blank.</td>
    </tr>
    <tr>
      <td><a href="https://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-validatesuniquenessof" class="external-link" rel="nofollow">validatesUniquenessOf</a></td>
      <td>
        <p>Validate uniqueness. Ensure the value of the property is unique for the model. Not available for all connectors. Currently supported with these connectors:</p>
        <ul>
          <li>In Memory</li>
          <li>Oracle</li>
          <li>MongoDB</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Use these methods to perform specific data validation, as shown in the examples below.

### Options object

Most of the validation methods accept an `options` argument whose properties depend on the specific method being used; however it does have two properties common to all the methods:

- `message` - Error message to use instead of the default message, if validation fails.
- `allowNull` - Whether null values are allowed.

### Examples

{% include code-caption.html content="common/models/user.js" %}
```javascript
module.exports = function(user) {
  user.validatesPresenceOf('name', 'email');
  user.validatesLengthOf('password', {min: 5, message: {min: 'Password is too short'}});
  user.validatesInclusionOf('gender', {in: ['male', 'female']});
  user.validatesExclusionOf('domain', {in: ['www', 'billing', 'admin']});
  user.validatesNumericalityOf('age', {int: true});
  user.validatesUniquenessOf('email', {message: 'email is not unique'});
};
```

{% include tip.html content="
The validation methods are invoked when you call the 
[`isValid()`](http://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-prototype-isvalid) method on a model instance, and automatically each time model instance is created or updated. You don't have to call `isValid()` to validate data.

To enforce validation constraints when calling 
[`upsert()`](http://apidocs.strongloop.com/loopback/#persistedmodel-upsert), ensure that `validateUpsert` option is set to `true` in the [model definition JSON file](Model-definition-JSON-file.html). 
By default, the [model generator](Model-generator.html) sets this property to true.
" %}

To invoke the validation constraints explicitly, call [`isValid()`](http://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-prototype-isvalid).

For example:

```javascript
user.isValid(function (valid) {
  if (!valid) {
    user.errors // hash of errors {attr: [errmessage, errmessage, ...], attr: ...}
  }
```

Another example of defining validation constraints, this time using a regular expresson:

{% include code-caption.html content="common/models/user.js" %}
```javascript
var re = /^(([^<>()[\]\\.,;:\s@\"]-(\.[^<>()[\]\\.,;:\s@\"]-)*)|(\".-\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]-\.)-[a-zA-Z]{2,}))$/;

UserModel.validatesFormatOf('email', {with: re, message: 'Must provide a valid email'});
if (!(UserModel.settings.realmRequired || UserModel.settings.realmDelimiter)) {
  UserModel.validatesUniquenessOf('email', {message: 'Email already exists'});
  UserModel.validatesUniquenessOf('username', {message: 'User already exists'});
}
```

To add validation to model for creating a new model instance, you _do not_ need to call `isValid()`.
You can add validation by simply adding the validator calls:

{% include code-caption.html content="common/models/MyModel.js" %}
```javascript
module.exports = function(MyModel) {
  MyModel.validatesLengthOf('name', { min: 5, message: { min: 'Name should be 5- characters' } });
  //...
};
```

Use `isValid()` as an additional _ad-hoc _way to check validity.
You can also call [`validate()`](https://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-validate)
or [`validateAsync()`](https://apidocs.strongloop.com/loopback-datasource-juggler/#validatable-validateasync) with custom validation functions.

## Localizing validation messages

Rather than modifying the error responses returned by the server, you can localize the error message on the client.
The validation error response contains error codes in `error.details.codes`, which enables clients to map errors to localized messages.

Here is an example error response:

{% include code-caption.html content="error.details.codes" %}
```javascript
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
