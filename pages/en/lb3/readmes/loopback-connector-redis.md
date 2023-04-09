![StrongLoop Labs](http://loopback.io/images/9830552.png "StrongLoop Labs")

This project provides early access to advanced or experimental functionality. 
It may lack usability, completeness, documentation, and robustness, and may be outdated.

However, StrongLoop supports this project. Community users, please report bugs on GitHub.

# loopback-connector-redis

The official Redis connector for the LoopBack framework.

## Usage

### Install dependencies

Install the required dependencies via NPM:

```
npm install --save loopback-connector-redis
npm install --save loopback-datasource-juggler
```

> This connector depends on [`loopback-datasource-juggler`](https://github.com/strongloop/loopback-datasource-juggler).

### Configure a Redis datasource

In your code, declare Redis as a datasource:

```
var DataSource = require('loopback-datasource-juggler).DataSource;

var ds = new DataSource('redis');
...
```

## Testing

1. Start the Redis server (using the default port)
2. Run `npm test`

> WARNING
> 
> Existing data in database 0 may be deleted
