# loopback-connector-mqlight

<p class="gh-only">
<b>PLEASE CREATE ISSUES AT https://github.com/strongloop/loopback/issues</b>.
</p>

[IBM MQ Light®](https://developer.ibm.com/messaging/mq-light/) is a simple yet powerful AMQP-based messaging API.  The `loopback-connector-mqlight` module is the Loopback connector for IBM MQ Light.  

The LoopBack MQ Light connector supports:

- All [create, retrieve, update, and delete operations](http://loopback.io/doc/en/lb2/Creating-updating-and-deleting-data.html).
- Sending messages to and receiving messages from IBM MQ Light.

## Installation

Enter the following in the top-level directory of your LoopBack application:

```
$ npm install loopback-connector-mqlight --save
```

The `--save` option adds the dependency to the applications `package.json` file.

## Configuration

Use the [data source generator](http://loopback.io/doc/en/lb2/Data-source-generator.html) to add the MQ Light data source to your application. The resulting entry in the application's `server/datasources.json` will look something like this:

```js
"mymq": {
  "name": "mymq",
  "connector": "mqlight"
}
```

Edit `server/datasources.json` to add other supported properties as required:

```js
"mydb": {
  "name": "mymq",
  "connector": "mqlight",
  "username": <username>,
  "password": <password>,
  "service": <service URI>
}
```

The following table describes the connector properties.

Property       | Type    | Description
---------------| --------| --------
service        | String  | Connection URI for MQ Light service
username       | String  | MQ Light service username
password       | String  | MQ Light service password associated with the username above

Examples can be found in the test directory.

## Testing

Start a local MQ Light server:

```shell
$ $MQLIGHT_HOME/mqlight-start
```

> You can download a free copy at https://developer.ibm.com/messaging/mq-light/.

Then run the tests:

```shell
$ npm test
```

> We run tests against the latest developer builds. Early access builds are not
> guaranteed to pass (use at your own risk).
