# loopback-datatype-geopoint

## Overview

The Geopoint object is a LoopBack data type that represents a physical location.

[loopback-datasource-juggler](https://github.com/strongloop/loopback-datasource-juggler) and [strong-remoting](https://github.com/strongloop/strong-remoting) modules use this object to facilitate use of `GeoPoint` data type in a LoopBack model properties and remote methods.

### Create a new GeoPoint object:
For example, to create a GeoPoint object in LoopBack:

```javascript
var loopback = require(‘loopback’);
var here = new loopback.GeoPoint({lat: 10.32424, lng: 5.84978});
```

The constructor requires two values:

 - `lat`: Latitude point in degrees. **Range: -90 to 90**.
 - `lng`: Longitude point in degrees. **Range: -180 to 180**

Call the constructor with any of the following arguments:

 - Two numbers, for example `new GeoPoint(10.32, 5.84)`
 - Number string of form "_lat_, _lng_", for example `new GeoPoint('10.32, 5.84')`
 - Array with two number elements: `[lat, lng]`, for example `new GeoPoint([10.32, 5.84])`
 - Object with two number properties: `lat` and `lng`, for example `new GeoPoint({ lat: 10.32, lng: 5.84})`

### Using GeoPoint type

In a LoopBack model, declare a GeoPoint property in the model JSON file, for example:

```javascript
...
"properties": {
    "location": {
      "type": "GeoPoint"
    },
  ...
}
...
```

Or programmatically:

```javascript
var CoffeeShop = loopback.createModel('coffee-shop', {
  location: 'GeoPoint'
});
```

In [remote methods](http://loopback.io/doc/en/lb2/Remote-methods.html), set 'accepts' and 'returns' argument types for remote method to `GeoPoint` type; for example, in a remote method `getNearbyLocation` for model `MyModel`:

*common/models/my-model.js*

```javascript
 MyModel.remoteMethod('getNearbyLocation', {
        accepts: {arg: 'loc', type: 'GeoPoint'},
        returns: {arg: 'location', type: 'GeoPoint'}
  });
```

## API

### GeoPoint.distanceBetween(pointA, pointB [, options])

This static method returns the spherical distance between two GeoPoints.
The `options` object is optional.

For example:

```javascript
loopback = require('loopback');
var here = new loopback.GeoPoint({ lat: 40.77492964101182, lng: -73.90950187151662});
var there = new loopback.GeoPoint({ lat: 40.7753227, lng: -73.909217 });

var distance = loopback.GeoPoint.distanceBetween(here, there);  // 0.03097916611592679
```

**Arguments:**

| Name | Type | Description   |
|----------|-------------|-----------|
| pointA | GeoPoint | Point A|
| pointB | GeoPoint | Point B|
| options | Object | Options object with one key, 'type'. See below.|

**Options:**

| Name | Type | Description |
|:---------:|:------:|-----------|
| type | String | Unit of measurement, one of:<br> miles (default)<br>radians<br>kilometers<br>meters<br>miles<br>feet<br>degrees |

### geoPoint.distanceTo(point, options)

This instance method returns the spherical distance to the given point.
NOTE: The `options` object is required.

For example:

```javascript
var loopback = require('loopback');

var here = new loopback.GeoPoint( {lat: 10, lng: 10} );
var there = new loopback.GeoPoint( {lat: 5, lng: 5} );

console.log( here.distanceTo( there, {type: 'miles'} ) ); // result: 486.3956513042483
```

**Arguments:**

| Name&nbsp;&nbsp;&nbsp;&nbsp; | Type | Description   |
|----------|-------------|-----------|
| point | GeoPoint | GeoPoint object to which to measure distance. |
| options | Object | Required options object with one key, 'type'. Same as `options` in `distanceBetween()`|

### geoPoint.toString()

This instance method returns a simple serialization of `geoPoint`.

For example:

```javascript
var here = new loopback.GeoPoint({lat: 8, lng: 9});
console.log(here.toString());  
```

Output is:

```
8,9
```
