---
lang: en
title: 'Reserved binding keys'
keywords: LoopBack 4.0, LoopBack-Next
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Reserved-binding-keys.html
summary:
---
Since [Dependency Injection](Dependency-injection.html) was introduced in LoopBack-Next, here some things to keep in mind when using it with regards to binding keys.

Different packages and components for LoopBack-Next may have some binding already defined. You can change the default behaviour by overriding the default binding, but you must ensure the interface of the new Binding is the same as the default (but behaviour can be different).

Following is a list that documents the binding keys in use by various `@loopback` packages and their `Type` so you can easily look at their interface in the [API Docs]().

It is recommended to use the CONSTANT defined for each Binding Key in it's respective namespace. You can import a namespace and access the binding key in your application as follows:

```
import { BindingKeyNameSpace } from 'package-name';
app.bind(BindKeyNameSpace.KeyName).to('value');
```

**Note for declaring new binding keys**

For component developers creating new Binding, to avoid conflict with other packages, it is recommended that the binding key start with the package name as the prefix. Example: `@loopback/authentication` component uses the prefix `authentication` for it's binding keys.

---

# Package: authentication
## Reserved Prefix
* `authentication.*`

## CONSTANT Namespace
`import { AuthenticationBindings } from '@loopback/authentication'`

## Binding Keys
### Sequence Actions Bindings Keys
|Name|CONSTANT|Type|Description|
|---|---|---|---|
|`authentication.actions.authenticate`|`AUTH_ACTION`|`AuthenticateFn`|Provides the authenticate function to be called in Sequence action.|

### Other Binding Keys
|Name|CONSTANT|Type|Description|
|---|---|---|---|
|`authentication.currentUser`|`CURRENT_USER`|`UserProfile`|Authenticated user profile for the current request|
|`authentication.operationMetadata`|`METADATA`|`AuthenticationMetadata`|Authentication Metadata|
|`authentication.strategy`|`STRATEGY`|`Strategy`|Provider for a [passport](http://passportjs.org/) strategy|

# Package: context
## Reserved Prefix
* `context.*`

## Binding Keys
_None_

# Package: core
## Reserved Prefixes
* `core.*`
* `controllers.*`

## CONSTANT Namespace
`import { CoreBindings } from '@loopback/authentication'`

## Binding Keys
### Sequence Actions Binding Keys
To use the Sequence Actions CONSTANT's, bind/inject to `CoreBindings.SequenceActions.CONSTANT` *OR*
```
const SequenceActions = CoreBindings.SequenceActions;
SequenceActions.CONSTANT // CONSTANT to bind/inject
```
|Name|CONSTANT|Type|Description|
|---|---|---|---|
|`sequence.actions.findRoute`|`FIND_ROUTE`|`FindRoute`|Sequence action to find the route for a given request|
|`sequence.actions.invokeMethod`|`INVOKE_METHOD`|`InvokeMethod`|Sequence action to invoke the operation method defined for the requested route|
|`sequence.actions.logError`|`LOG_ERROR`|`LogError`|Sequence action to log information about a failed request|
|`sequence.actions.parseParams`|`PARSE_PARAMS`|`ParseParams`|Sequence action to parse a request for arguments to be passed to the controller|
|`sequence.actions.reject`|`REJECT`|`Reject`|Sequence action to reject the request with an error|
|`sequence.actions.send`|`SEND`|`Send`|Sequence action to send the response back to client|

### Other Binding Keys
|Name|CONSTANT|Type|Description|
|---|---|---|---|
|`application.apiSpec`|`API_SPEC`|`OpenApiSpec`|OpenAPI Specification describing your application's routes|
|`bindElement`|`BIND_ELEMENT`|`BindElement`|Convenience provider function to bind value to `Context`|
|`components.${component.name}`||`Component`|Components used by your application|
|`controllers.${controller.name}`||`ControllerClass`|The controller's bound to the application|
|`controller.current.ctor`|`CONTROLLER_CLASS`|`ControllerClass`|The controller for the current request|
|`controller.current.operation`|`CONTROLLER_METHOD_NAME`|`string`|Name of the operation for the current request|
|`controller.method.meta`|`CONTROLLER_METHOD_META`|ControllerMetaData|Metadata for a given controller|
|`getFromContext`|`GET_FROM_CONTEXT`|`GetFromContext`|Convenience provider function to return the `BoundValue` from the `Context`|
|`http.handler`|`HTTP_HANDLER`|`HttpHandler`|The HTTP Request Handler|
|`http.port`|`HTTP_PORT`|`number`|HTTP Port the application will run on|
|`http.request`|`Http.REQUEST`|`ServerRequest`|The raw `http` request object|
|`http.request.context`|`Http.CONTEXT`|`Context`|Request level context|
|`http.response`|`Http.RESPONSE`|`ServerResponse`|The raw `http` response object|
|`routes.${route.verb}.${route.path}`||`RouteEntry`|Route entry specified in api-spec|
|`sequence`|`SEQUENCE`|`SequenceHandler`|Class that implements the sequence for your application|

# Package: openapi-spec
## Reserved Prefix
* `api-spec.*`

## Binding Keys
_None_

# Package: openapi-spec-builder
## Reserved Prefix
* `spec-builder.*`

## Binding Keys
_None_

# Package: repository
## Reserved Prefixes
* `repository.*`
* `repositories.*`
* `datasources.*`
* `models.*`

## Binding Keys
|Name|CONSTANT|Type|Description|
|---|---|---|---|
|`datasources.${dataSourceName}`||`DataSource`|Instance of a given datasource|
|`models.${modelName}`||`Model`|Instance of a given model|
|`repositories.${repositoryName}`||`Repository`|Instance of a given repository|

# Package: testlab
## Reserved Prefix
* `testlab.*`

## Binding Keys
_None_
