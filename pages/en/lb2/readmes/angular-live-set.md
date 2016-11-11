# Angular Live Set

Display changes as they are made to a collection of objects.

[**View the examples**](https://github.com/strongloop/angular-live-set-example)

## Requirements

 - AngularJS
 - `ChangeStream` server (eg. LoopBack)

## Usage

You can get it from [Bower](http://bower.io/)

```sh
bower install angular-live-set
```

This will copy the `angular-live-set` files into a `bower_components` folder, along with its dependencies. Load the script files in your application:

```html
<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="bower_components/angular-live-set/angular-live-set.js"></script>
```

Add the module to your dependencies:

```javascript
angular.module('myApp', ['ls.LiveSet', 'ls.ChangeStream'])
```

## Docs

### API

#### LiveSet(data, changes, options)

A `LiveSet` applies a `ChangeStream`, or a continuous stream of changes, to an array of objects. The set itself is **read only** and can only be modified by sending a change through the change stream.

**Note:** Updates to the `LiveSet` will trigger a `$rootScope.$apply()`.

**data**

An `Array` of initial data.

**changes**

A `ChangeStream` to be applied continuously to the set.

**options**

Customize the `LiveSet`.

**options.id**

A `String` defining the **id** property for objects in the set. Default: `'id'`.

**Example**

```js
// objects in the set must include some identifying property (customizable)
var data = [{id: 1, val: 'foo'}, {id: 2, val: 'bar'}];
var src = new EventSource('/changes');
var changes = createChangeStream(src);
var set = new LiveSet(data, changes);

// bind to the set from a template
// like you would an array
// note: the data in the array will be updated
// changes come in (from the ChangeStream)
$scope.values = set.toLiveArray();
```

#### ChangeStream(eventSource)

```js
function MyController($scope, createChangeStream) {
  // create a change stream
  var changes = createChangeStream();
}
```

**eventSource**

An `EventSource` emitting the following events:

 - `data` - contains a `Change` object
 - `error` - contains an `Error` object
 - `end` - the stream has ended on the server

A continuous stream of `Change` objects. Each `Change` represents a modification to an object. Changes are applied to a set in the order they flow in the stream.

#### Change

A chunk in a `ChangeStream`.

**change.target**

This change applies to an object with this identifier.

**change.type**

 - `create`
 - `update`
 - `remove`

**change.data**

 - `create` - the entire object
 - `update` - the entire object
 - `remove` - `null`

**change.optimistic**

`true` when a change is likely to be made, but has not completed.

**Only supported for changes of type `update` and `remove`.**

A change has not been made to an object, but it has a very high likelyhood of being made. For example, a user modifies data locally and sends it to a server. This change
has not actually been made to the definitave state on the server. Unless
something unexpected happens, the change will be made and sent through a `ChangeStream`.

In cases like this, it is appropriate to send an "optimistic" change that will be
immediately applied. These changes should be reverted after a specified period unless
another (non-optmisitic) change with the same target is written to the `ChangeStream`.

#### Error

**error.message**

An error message.

**error.status**

An HTTP like status code.

### Concurrency

`Change` streams are applied in order. This means the set can only be modified synchronously. The last change wins.
