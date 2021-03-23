---
title: "AngularJS JavaScript SDK"
lang: ja
layout: page
keywords: LoopBack
tags: [angularjs]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/AngularJS-JavaScript-SDK.html
summary: The LoopBack AngularJS SDK provides tools to create a client-side representation of your LoopBack models so you can access them directly from client AngularJS code.
---
{% include important.html content="The AngularJS SDK requires Angular version 1.2.0 or newer.

If you wish to use Angular 2, the [LoopBack SDK Builder](/doc/en/community/SDK-builder.html) community project enables you to create an [Angular 2](http://angular.io/) client SDK for a LoopBack application.  
" %}

## Introduction

[AngularJS](http://angularjs.org/) is an open-source JavaScript [model–view–controller](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
(MVC) framework for browser-based applications.

The LoopBack AngularJS SDK has three major components:

* Auto-generated AngularJS services, compatible with [`ngResource.$resource`](http://docs.angularjs.org/api/ngResource.%24resource),
  that provide client-side representation of the models and remote methods in the LoopBack server application.
* The `lb-ng` command-line tool that generates Angular $resource services for your LoopBack application.
* A Grunt plugin ([grunt-loopback-sdk-angular](https://github.com/strongloop/grunt-loopback-sdk-angular)), if you want to use Grunt instead of `lb-ng`.

The client is dynamic, in other words it automatically includes all the LoopBack models and methods you've defined.
You don't have to manually write any static code.

The SDK fits seamlessly into the workflow of a front-end developer:

* The generated Angular objects and methods have [ngdoc](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation) comments.
  Use an ngdoc viewer like [Docular](http://grunt-docular.com/) to view documentation of the client available to your AngularJS client.

* If you wish, you can use the provided Grunt task to generate the client services script,
  which make it easy to include this file in an existing Grunt-based workflow (for example for bundling or "minification").

### How it works

The code generator (either the `lb-ng` tool or a Grunt task) loads your LoopBack server application, walks through all models,
and generates code registering an AngularJS factory for each model.
The factory creates an [`ngResource.$resource`](http://docs.angularjs.org/api/ngResource.%24resource) object,
passing in a description of all public methods the model class exposes.
This way the resource object provides an API very similar to that of your backend Model class.

The rest of the procedure is standard for AngularJS: configure your client app to include and load the `lbServices` module,
and tell Angular's injector which models to use in your code.

{% include note.html content="At runtime, the generated lbServices module (`lb-services.js`) depends on the Angular resource script (`angular-resource.js`), so you must ensure that your client loads this Angular script.
" %}

## Installation

To install the LoopBack AngularJS SDK, enter this command:

```
$ npm install -g loopback-sdk-angular-cli
```

This installs the `lb-ng` command-line tool.

## Generating Angular services

Use the LoopBack Angular command-line tool, `lb-ng`, to generate the Angular client library for your LoopBack application.

{% include tip.html content="
Any time you modify or add models to your LoopBack app, you must re-run `lb-ng` to re-generate the Angular client library to reflect the changes.
" %}

For example, if your application has the [standard LoopBack project layout](Project-layout-reference.html),
then in the `/client` sub-directory, enter these commands:

```shell
$ mkdir js
$ lb-ng ../server/server.js js/lb-services.js
```

In this example:

`../server/server.js` is the relative path to the main LoopBack server script.

`js/lb-services.js` is the name and path to the JavaScript file that the tool generates.

{% include important.html content="
If you want the AngularJS files to be somewhere else at runtime, then after generating the JavaScript file as shown above,
simply copy it to the desired location and reference that location in your `index.html` file or equivalent.
" %}

The SDK also provides a tool to generate API documentation for the AngularJS services;
see [Generating Angular API docs](Generating-Angular-API-docs.html) for more information.

### lb-ng command

The general syntax of the lb-ng command is:

<pre>
lb-ng [options] <em>path-to-server-script</em> [<em>path-to-generated-services</em>]
</pre>

**Arguments:**

_`path-to-server-script`_ - Relative path to the LoopBack application main script.
In the [standard project layout](Project-layout-reference.html), `<app-dir>/server/server.js`. Required.

_`path-to-generated-services`_ - Relative path to the client JavaScript file to be generated containing the AngularJS `$resource` services.
Optional; default is `stdout`.

**Options**:

**`-m, --module-name [_name_]`**  
The name for generated Angular module. Default is "lbServices".

**`-u, --url [_url_]`**
URL of the REST API endpoint.

## Using the SDK

The SDK creates $resource services that you can use in the same way as you would use hand-written ones.
See the [example](http://docs.angularjs.org/api/ngResource.%24resource#example)  in the AngularJS $resource docs.

There is one service for each model class, with the same name as the model name (for example, `User`).
On top of the standard get/save/query/remove methods, the service includes functions for calling every method exposed by the remote model (for example, `User.login()`).

{% include important.html content="AngularJS model names start always with a capital letter, even if your server definition starts with a lower-case letter.
" %}

### Setup

{% include note.html content="The generated lbServices module (`lb-services.js`) depends on the Angular resource script (`angular-resource.js`) so you must ensure that your page has
`<script src=\"angular-resource.js\"></script>` if you don't have it already.
" %}

Follow these steps to use the generated services inside your AngularJS application:

1.  Include `js/lb-services.js` in your `index.html` file

    `<script src="js/lb-services.js"></script>`

    {% include note.html content="You'll need to set up static middleware to serve the client script.
    See [Defining middleware](Defining-middleware.html) for more information.
    " %}

2.  Register the AngularJS module `lbServices` as a dependency of your app.
    Add `'lbServices'` to the `angular.module()` call in  the main JavaScript file of your Angular (client) app, as follows:

    ```javascript
    angular.module('my-app-module',
      ['ngRoute' /* etc */, 'lbServices', 'my-app.controllers'])
    ```

3.  To call a method on a model from your controller, add the model name as a dependency of the controller; for example:

    ```javascript
    // access User model
    module.controller('LoginCtrl', function($scope, User, $location) {
      $scope.login = function() {
        $scope.loginResult = User.login($scope.credentials,
          function() {
            // success
          }, function(res) {
            // error
          });
    ```

### Client configuration

You can configure some aspects of the generated services within the AngularJS client application using the 
[LoopBackResourceProvider](http://apidocs.loopback.io/loopback-sdk-angular/#loopbackresourceprovider) object, as illustrated below.
This object is available to configuration blocks only; for more information, see
[Module Loading & Dependencies](https://docs.angularjs.org/guide/module#module-loading-dependencies) in the AngularJS documentation.

{% include code-caption.html content="app.js" %}
```javascript
angular.module('my-app-module')
  .config(function(LoopBackResourceProvider) {

    // Use a custom auth header instead of the default 'Authorization'
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://api.example.com/');
  });
```

See [LoopBackResourceProvider API docs](http://apidocs.loopback.io/loopback-sdk-angular/#loopbackresourceprovider) for the list of all available options.

### Model resource API

Angular's `$resource` objects have a different API compared to LoopBack's API on the server:

* Method arguments are passed in an object (a key-value map), not positionally.
* Methods accept two optional callbacks (a success callback and an error callback).
* All methods return a special object populated with the response data once it arrives.
* The returned object has a special property `$promise` that you can use for promise-based flow control.

See "Returns" section in [$resource Usage docs](https://docs.angularjs.org/api/ngResource/service/$resource#usage)
for more information about the AngularJS API and 
[AngularJS client API docs](http://apidocs.loopback.io/loopback-sdk-angular/#angular-client-api)
for a reference of methods available on the built-in loopback models.

#### Example

Look at the method `Product.find(filter, callback)` to illustrate the differences.

On the server, one can write the following code to find all products named 'Pen':

{% include code-caption.html content="server-code.js" %}
```javascript
Product.find({ 
    where: {
      name: 'Pen'
    }
  },
  function(err, list) { /*...*/ });
```

The AngularJS code to perform the same operation is:

{% include code-caption.html content="angular-code.js" %}
```javascript
$scope.products = Product.find({
    filter: {
      where: {
        name: 'Pen'
      }
    }
  },
  function(list) { /* success */ },
  function(errorResponse) { /* error */ }
);
```

### CRUD operations

The API for manipulating model instances is similar to the server-side Node API: it provides methods for standard create, read, update, and delete (CRUD) operations.

#### Create

The create method takes an object containing a key-value map of values for the model.

```javascript
$scope.product = Product.create({ name: 'Pen' });
```

#### Read (querying)

You can fetch model data using the usual methods like `find()`, `findOne()` or `findById()`.
Just don't forget to wrap the arguments in a key/value parameters map.

```javascript
$scope.products = Product.find({
  filter: {
    limit: 10
  }
}); 
$scope.pen = Product.findOne({ 
  filter: {
    where: {
      name: 'Pen'
    }
  }
}); 
$scope.prod0 = Product.findById({
  id: 0
});
```

For a description of all query options, see [Querying data](Querying-data.html).
The AngularJS client expects the "Node syntax" of arguments, with the differences noted above.

Also, see [Querying related models](Accessing-related-models.html#querying-related-models).

**Case-insensitive queries**

Let's say you are using AngularJS with `ui-bootstrap`'s `uib-typeahead` component:

```javascript
<input ng-model="vm.chosenMember"
       uib-typeahead="item as item.name for item in vm.getMembers($viewValue)">
angular.module(...).controller(.., function(...) {
...
  vm.getMembers = function(val) {
    ...
    // case-insensitive, match any substring:
    var filter = { where: { name: { like: val, options: 'i'} } };
    return Member.find({filter: filter, ... }).$promise;
  };
...
```

In the example above, the `like` property is an operator that, in its basic form above, matches any substring (for example in the `name` property). The options property set to `'i'` specfies case-insensitive matching on `name`. If you want case-sensitive matching, simply remove the `'i'`, thus:

```js
var filter = { where: { name: { like: val } } };
```

For any other variation (for example, matching only the first part of a name), you need to either use the datasource-specific expression syntax or use the [regular expression operator](Where-filter.html#regular-expressions).

#### Update

After you obtain an instance of a Model resource using one of the query methods described above, persist changes back to the server by calling `$save` method:

```javascript
$scope.product.price = 13.40;
$scope.product.$save();
```

Note that the method returns a promise and it also updates the model instance using the data returned by the server.

You can also perform a (partial) update with `prototype$updateAttributes` method:

```javascript
$scope.product.price = 13.40;
Product.prototype$updateAttributes(
   {id:    $scope.product.id},
   {price: $scope.product.price}
);
```

#### Delete

Use `deleteById()` to remove a model instance with a given ID.

```javascript
Product.deleteById({
    id: $scope.product.id
  })
  .$promise
  .then(function() {
    console.log('deleted');
  });
```

### Working with related models

The AngularJS SDK provides convenient methods for accessing and manipulating related models.

{% include warning.html content="
Currently, the AngularJS SDK does not support polymorphic belongsTo relations; an application with such a relation will display a warning such as this (for example):

```
Warning: scope Picture.imageable is missing _targetClass property.
The Angular code for this scope won't be generated. Please upgrade
to the latest version of loopback-datasource-juggler to fix the problem.
```
" %}
'
For example, consider the two following model definitions:

{% include code-caption.html content="common/models/products.json" %}
```javascript
{
  "name": "Product",
  "properties": { /* ... */ },
  "relations": {
    "category": {
      "type": "belongsTo",
      "model": "Category"
    }
  }
}
```

{% include code-caption.html content="common/models/categories.json" %}
```javascript
{
  "name": "Category",
  "properties": { /* ... */ },
  "relations": {
    "products": {
      "type": "hasMany",
      "model": "Product"
    }
  }
}
```

#### Querying related models

The SDK creates a `Category.products()` method that can be used to list all products in a given category.

```javascript
$scope.products = Category.products({
  id: $scope.category.id,
  filter: {
    where: { name: 'Pen' },
    limit: 10
  }
});
```

#### Creating a related model

To create a new product in a given category, use `Category.products.create()`:

```javascript
$scope.newProduct = Category.products.create(
  {id:   $scope.category.id},
  {name: 'Pen'}
);
```

#### Removing related models

Last but not least, there is also a method to delete all related models (all products in a given category):

```javascript
Category.products.destroyAll({ id: $scope.category.id });
```

### Authentication

The SDK provides first-class support for authenticated requests.

Basic use is simple: Call [`User.login()`](http://apidocs.loopback.io/loopback-sdk-angular/#user-login)
with correct credentials and the SDK will handle everything else for you.
It will store the access token provided in login response and send this token in all subsequent requests.

```javascript
User.login({
  email: 'name@example.com',
  password: 'passwd'
});
```

Other useful methods include [`User.isAuthenticated()`](http://apidocs.loopback.io/loopback-sdk-angular/#user-isauthenticated),
to determine if the current user is logged in, and
[`User.getCurrentId()`](http://apidocs.loopback.io/loopback-sdk-angular/#user-getcurrentid), to get the ID of the currently logged-in user.

#### Persisting the access token

By default, the AngularJS SDK stores the access token in the browser's localStorage, so it is preserved across page reloads and browser (hybrid mobile app) restarts.

While this behavior is useful for hybrid mobile applications, traditional web applications typically need to store the token
only for the duration of a browsing session, unless the user checked a "remember me" option. Fortunately this is easy to implement too:
Just add `rememberMe` parameter to your `User.login()` call.

```javascript
User.login({ rememberMe: $scope.rememberMe }, credentials);
```

#### Handling 401 Unauthorized

When there is no user logged in or the access token expires, requests to the LoopBack server fail with 401 errors.
The application should install a global handler that will allow the user to login and repeat the action.

AngularJS provides HTTP interceptors that can be used to implement this feature.

```javascript
// Inside app config block
$httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
  return {
    responseError: function(rejection) {
      if (rejection.status == 401) {
      // Clearing the loopback values from client browser for safe logout...
        LoopBackAuth.clearUser();
        LoopBackAuth.clearStorage();
        $location.nextAfterLogin = $location.path();
        $location.path('/login');
      }
      return $q.reject(rejection);
    }
  };
});

// In the Login controller
User.login($scope.credentials, function() {
  var next = $location.nextAfterLogin || '/';
  $location.nextAfterLogin = null;
  $location.path(next);
});
```

The `responseError` interceptor saves the current location (line 6) and redirects to the login page (line 7).
The login controller then redirects back to the previous page (lines 16-18) when the login was successful.
