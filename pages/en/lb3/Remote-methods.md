---
title: "Remote methods"
lang: en
layout: navgroup
toc_level: 2
navgroup: app-logic
keywords: LoopBack
tags: [models, application_logic]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Remote-methods.html
summary: A remote method is a static method of a model, exposed over a custom REST endpoint.

---
## Overview

A _remote method_ is a method of a model, exposed over a custom REST endpoint.
Use a remote method to perform operations not provided by LoopBack's [standard model REST API](PersistedModel-REST-API.html).

{% include note.html content="The easiest way to define a remote method is by using the command-line [remote method generator](Remote-method-generator.html).  For an introductory example of defining a remote method, see [Extend your API](Extend-your-API.html) in Getting Started.
" %}

## How to add a remote method to a model

To add a remote method to a model:

1.  Create a function in the [model extension file](Model-extension-file.html). The method name determines whether a remote method is static or an instance method.  A method name starting with `prototype.` indicates an instance method; otherwise, it's a static method. **NOTE**: By default, a remote method is static.  You must specify `prototype.` in the method name to create an instance method.

1.  Register the remote method one of these two ways:
   - Register using JSON in the [model definition JSON file](Model-definition-JSON-file.html).
   For more information, see [Registering a remote method in JSON](#registering-a-remote-method-in-json).
   - Register using JavaScript code in the [model extension file](Model-extension-file.html)  calling [`remoteMethod()`](http://apidocs.loopback.io/loopback/#model-remotemethod).
   For more information, see [Registering a remote method in code](#registering-a-remote-method-in-code).

### Example

{% include tip.html content="See another example of a remote method in [Extend your API](Extend-your-API.html).
" %}

Suppose you have a Person model and you want to add a REST endpoint at `/greet` that returns a greeting with a name provided in the request.
You add this code to `/common/models/person.js`:

{% include code-caption.html content="/common/models/person.js" %}
```javascript
module.exports = function(Person){

    Person.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Person.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};
```

Now, for example, a request to

```
POST /api/people/greet
```

with data `{"msg": "John"}` will return:

```
Greetings... John!
```

{% include note.html content="Notice the REST API request above uses the plural form \"people\" instead of \"person\". LoopBack exposes the
[plural form of model names for REST API routes](Exposing-models-over-REST.html#REST-paths).
" %}

### Using async/await

Remote methods can also return a promise instead of using the callback parameter.

{% include code-caption.html content="/common/models/person.js" %}
```javascript
module.exports = function(Person){

    Person.greet = async function(msg) {
        return 'Greetings... ' + msg;
    }

    Person.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};
```

## Registering a remote method

There are two ways to register a remote method:
- [In code](#registering-a-remote-method-in-code), in the [model extension file](Model-extension-file.html)  (`modelName.js`).
- [In JSON](#registering-a-remote-method-in-json), in the [model definition JSON file](Model-definition-JSON-file.html#methods) (`modelName.json`).

### Registering a remote method in code

LoopBack models have a [`remoteMethod()`](http://apidocs.loopback.io/loopback/#model-remotemethod) static method that you use to register a remote method:

```javascript
Model.remoteMethod(requestHandlerFunctionName, [options])
```

Where:

* _`model`_ is the model object to which you're adding the remote method. In our example, `Person`.
* _`requestHandlerFunctionName`_ is a string that specifies name of the remote method, for example `'greet'`.
* _`options`_ is an object that specifies parameters to configure the REST endpoint; see [Options](#options) below.

### Registering a remote method in JSON

To register a remote method in the [model definition JSON file](Model-definition-JSON-file.html#methods),
add the method name as a key under `methods`.  To define an instance method, prepend `prototype.` to the method name.

```
"methods": {
    "prototype.getProfile": {
      "accepts": [],
      "returns": { "arg": "data", "type": "User", "root": true},
      "http": {"verb": "get", "path": "/profile"},
      "accessScopes": ["read", "read:profile"]
    },
    "someStaticMethod" : { ... }
```

The value of each key under `methods` is the options object described below.

## Options

The options argument is a Javascript object that defines how the remote method works.

{% include content/rm-options.md %}

## Setting a remote method route

By default, a remote method is exposed at:

<pre><code>POST http://<i>apiRoot</i>/<i>modelName</i>/<i>methodName</i></code></pre>

Where

* _apiRoot_ is the application API root path.
* _modelName_ is the plural name of the model.
* _methodName_ is the function name.

Following the above example, by default the remote method is exposed at:

```
POST /api/people/greet
```

To change the route, use the `http.path` and` http.verb` properties of the options argument to `remoteMethod()`, for example:

{% include code-caption.html content="/common/models/model.js" %}
```javascript
Person.remoteMethod('greet',{
  accepts: {arg: 'msg', type: 'string'},
  returns: {arg: 'greeting', type: 'string'},
  http: {path: '/sayhi', verb: 'get'}
});
```

This call changes the default route to 

```
GET /api/people/sayhi
```

So a GET request to `http://localhost:3000/api/people/sayhi?msg=LoopBack%20developer` returns:

```javascript
{"greeting": "Greetings... LoopBack developer"}
```

## Adding ACLs to remote methods

To constrain access to custom remote methods, use the [ACL generator](ACL-generator.html) in the same way you control access to any model API.
The access type for custom remote methods is Execute.

### Basic use

For example, to deny invocation of the `greet` method used in the examples above:

```shell
$ lb acl
[?] Select the model to apply the ACL entry to: Person
[?] Select the ACL scope: A single method
[?] Enter the method name: greet
[?] Select the access type: Execute
[?] Select the role: All users
[?] Select the permission to apply: Explicitly deny access
```

The tool then creates the following access control specification:

{% include code-caption.html content="/common/models/person.json" %}
```javascript
...
"acls": [{
  "principalType": "ROLE",
  "principalId": "$everyone",  // apply the ACL to everyone
  "permission": "DENY",        // DENY attempts to invoke this method
  "property": "greet"          // applies the access control to the greet() method
}],
...
```

### Advanced use

Another example, to allow invocation of the a remote method only for the `$owner` of that model object:

{% include code-caption.html content="/common/models/YourModel.js" %}
```javascript
module.exports = function(YourModel) {
  //...
  YourModel.remoteMethod(
    'someRemoteMethod',
    {
      accepts: [
        {arg: 'id', type: 'number', required: true}
      ],
      // mixing ':id' into the rest url allows $owner to be determined and used for access control
      http: {path: '/:id/some-remote-method', verb: 'get'}
    }
  );
};
```

## Formatting remote method responses

You can reformat the response returned by all remote methods by adding a [boot script](Defining-boot-scripts.html) 
that modifies the object returned by [`app.remotes()`](http://apidocs.loopback.io/loopback/#app-remotes) as follows:

{% include code-caption.html content="/server/boot/hook.js" %}
```javascript
module.exports = function(app) {
  var remotes = app.remotes();
  // modify all returned values
  remotes.after('**', function (ctx, next) {
    ctx.result = {
      data: ctx.result
    };

    next();
  });
};
```

## Disabling a remote method

To disable a remote method use `Model.disableRemoteMethod(name, isStatic)` and `Model.disableRemoteMethodByName(name)`.  For more information, see:

- [Model.disableRemoteMethod](http://apidocs.loopback.io/loopback/#model-disableremotemethod)
- [Model.disableRemoteMethodByName](http://apidocs.loopback.io/loopback/#model-disableremotemethodbyname)
