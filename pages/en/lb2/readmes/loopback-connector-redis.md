# EXPERIMENTAL

![StrongLoop Labs](http://docs.strongloop.com/download/thumbnails/5310165/StrongLoop%20Labs%20Logo%20Cropped.png "StrongLoop Labs")

StrongLoop Labs provides early access to pre-release or experimental projects.
In general, these projects may lack functionality, usability, completeness,
documentation, robustness and may be outdated. StrongLoop considers this project
under active development and fully supports this project. Paying customers may
open issues using the StrongLoop customer support system (Zendesk) while
community users are encouraged to submit feature requests/bugs reports using
GitHub issues.

---

# loopback-connector-redis

The official Redis connector for the LoopBack framework.

## Usage


### 1. Install dependencies

Install the required dependencies via NPM:

```
npm install --save loopback-connector-redis
npm install --save loopback-datasource-juggler
```

> This connector depends on [`loopback-datasource-juggler`](https://github.com/strongloop/loopback-datasource-juggler).

### 2. Configure a Redis datasource

In your code, declare redis as a datasource:

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
