**PLEASE CREATE ISSUES AT https://github.com/strongloop/loopback/issues**

---

# loopback-connector-mqlight

Loopback connector for MQ Light

[IBM MQ Light®]() is a simple yet powerful AMQP based messaging API.  The loopback-connector-mqlight module is the Loopback Connector for IBM MQ Light.

The LoopBack MQ Light connector supports:

- All [CRUD operations](https://docs.strongloop.com/display/LB/Creating%2C+updating%2C+and+deleting+data).
- Sending/Receiving message from IBM MQ Light.

## Installation

Enter the following in the top-level directory of your LoopBack application:

```
$ npm install loopback-connector-mqlight --save
```

The `--save` option adds the dependency to the applications `package.json` file.

## Configuration

Use the [data source generator](https://docs.strongloop.com/display/APIC/Data+source+generator) to add the data source to your application. The entry in the application's `server/datasources.json` will look something like this:

```
"mymq": {
  "name": "mymq",
  "connector": "mqlight"
}
```

Edit `server/datasources.json to add other supported properties as required:

```
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
