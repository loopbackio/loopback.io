# loopback-datatype-geopoint

## Overview

The Geopoint object is a LoopBack data type that represents a physical location.

[loopback-datasource-juggler](https://github.com/strongloop/loopback-datasource-juggler) and [strong-remoting](https://github.com/strongloop/strong-remoting) modules use this object to facilitate use of `GeoPoint` data type in a LoopBack model properties & remote methods.

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
- in a LoopBack Model:

 Declare a GeoPoint property in the model JSON file, for example:

  ```json
  ...
  "properties": {
      "location": {
        "type": "GeoPoint"
      },
    ...
  }
  ...
  ```

  or programtically:

  ```javascript
  var CoffeeShop = loopback.createModel('coffee-shop', {
    location: 'GeoPoint'
  });
  ```

- in [remote methods](http://loopback.io/doc/en/lb2/Remote-methods.html):

  'accepts' & 'returns' argument types, for remote method, can be set to `GeoPoint` type, for example, in a remote method `getNearbyLocation` for model `MyModel`:

  *common/models/my-model.js*
  ```javascript
   MyModel.remoteMethod('getNearbyLocation', {
          accepts: {arg: 'loc', type: 'GeoPoint'},
          returns: {arg: 'location', type: 'GeoPoint'}
    });
  ```

### Static Method:
- `distanceBetween(pointA, pointB, options)`:

  Determine the spherical distance between two GeoPoints

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

### Instance Methods:
- `geoPoint.distanceTo(point, options)`:

  Determine the spherical distance to the given point.

  For example:
  ```javascript
  var loopback = require(‘loopback’);

  var here = new loopback.GeoPoint({lat: 10, lng: 10});
  var there = new loopback.GeoPoint({lat: 5, lng: 5});

  console.log(here.distanceTo(there, {type: 'miles'})); // result: 438
  ```

  **Arguments:**

  | Name | Type | Description   |
  |----------|-------------|-----------|
  | point | GeoPoint | GeoPoint object to which to measure distance. |
  | options | Object | Options object with one key, 'type'. Same as `options` in `distanceBetween()`|

- `geoPoint.toString()`:
  Simple serialization of `geoPoint`.
