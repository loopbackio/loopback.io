# loopback-connector-mongodb

The official MongoDB connector for the LoopBack framework.

## Installation

In your application root directory, enter this command to install the connector:

```sh
npm install loopback-connector-mongodb --save
```

This installs the module from npm and adds it as a dependency to the application's `package.json` file.

If you create a MongoDB data source using the data source generator as described below, you don't have to do this, since the generator will run `npm install` for you.

## Supported versions

**Starting from the version 6.0.0, this connector is no longer compatible with LoopBack 3. Please use the latest 5.x version in your LoopBack 3 applications.**

This module adopts the [Module Long Term Support (LTS)](http://github.com/CloudNativeJS/ModuleLTS) policy, with the following End Of Life (EOL) dates:

| Version    | Status               | Published | EOL                  | LoopBack | Juggler  |
| ---------- | -------------------- | --------- | -------------------- | ---------|----------|
| 6.x        | Current              | Mar 2021  | Apr 2024 _(minimum)_ | 4        | 4.x      |
| 5.x        | Active LTS           | Jun 2019  | Apr 2023             | 3, 4     | 3.x, 4.x |
| 4.x        | Maintenance LTS      | Nov 2018  | Apr 2021             | 3, 4     | 3.x, 4.x |

## Creating a MongoDB data source

For LoopBack 4 users, use the LB4 [Command-line interface](https://loopback.io/doc/en/lb4/Command-line-interface.html) to generate a DataSource with MongoDB connector to your LB4 application. Run [`lb4 datasource`](https://loopback.io/doc/en/lb4/DataSource-generator.html), it will prompt for configurations such as host, post, etc. that are required to connect to a MongoDB database.

After setting it up, the configuration can be found under `src/datasources/<DataSourceName>.datasource.ts`, which would look like this:

```ts
const config = {
  name: 'db',
  connector: 'mongodb',
  url: '',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'testdb',
};
```

If your username or password contains special characters like `@`, `$` etc, encode the whole
username or password using [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).

Eg: `pa$$wd` would become `pa%24%24wd`.

### Connection properties

| Property   | Type&nbsp;&nbsp; | Description                                                                                                |
| ---------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| connector  | String           | Connector name, either `"loopback-connector-mongodb"` or `"mongodb"`.                                      |
| database   | String           | Database name                                                                                              |
| host       | String           | Database host name                                                                                         |
| name       | String           | Name of the datasource in the app                                                                          |
| password   | String           | Password to connect to database                                                                            |
| port       | Number           | Database TCP port                                                                                          |
| url        | String           | Connection URL of form `mongodb://user:password@host/db`. Overrides other connection settings (see below). |
| user       | String           | Username to connect to database                                                                            |
| authSource | String           | Optional. Authentification database name. Usually `"admin"` value.                                         |

If you run a MongoDB with authentification ([Docker's example here](https://github.com/docker-library/docs/tree/master/mongo#mongo_initdb_root_username-mongo_initdb_root_password)), you need to specify which database to authenticate against. More details can be found in [MongoDB documentation on Authentification Methods](https://docs.mongodb.com/manual/core/authentication/#authentication-methods). The default value is usually `"admin"`, like in the official docker image.

**NOTE**: In addition to these properties, you can use additional Single Server Connection parameters supported by [`node-mongodb-native`](http://mongodb.github.io/node-mongodb-native/core/driver/reference/connecting/connection-settings/).

### Additional properties

<table>
  <thead>
  <tr>
    <th width="160">Property</th>
    <th width="90">Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>allowExtendedOperators</td>
      <td>Boolean</td>
      <td><code>false</code></td>
      <td>Set to <code>true</code> to enable using MongoDB operators such as <code>$currentDate, $inc, $max, $min, $mul, $rename, $setOnInsert, $set, $unset, $addToSet, $pop, $pullAll, $pull, $push</code>, and <code>$bit</code>. See <a href="https://loopback.io/doc/en/lb4/MongoDB-connector.html#update-operators" class="external-link" rel="nofollow">Update Operators</a> section below</td>
    </tr>
    <tr>
      <td>enableGeoIndexing</td>
      <td>Boolean</td>
      <td><code>false</code></td>
      <td>Set to <code>true</code> to enable 2d sphere indexing for model properties of type <code>GeoPoint</code>. This allows for indexed <code>near</code> queries.</td>
    </tr>
    <tr>
      <td>lazyConnect</td>
      <td>Boolean</td>
      <td><code>false</code></td>
      <td>When set to <code>true</code>, the database instance will not be attached to the datasource and the connection is deferred. It will try to establish the connection automatically once users hit the endpoint. If the MongoDB server is offline, the app will start, however, the endpoints will not work.</td>
    </tr>
    <tr>
      <td>disableDefaultSort</td>
      <td>Boolean</td>
      <td><code>false</code></td>
      <td>Set to <code>true</code> to disable the default sorting behavior on <code>id</code> column, this will help performance using indexed columns available in MongoDB.</td>
    </tr>
    <tr>
      <td>collation</td>
      <td>String</td>
      <td>N/A</td>
      <td>Specify language-specific rules for string comparison, such as rules for letter-case and accent marks. See <a href="https://docs.mongodb.com/manual/reference/collation/">MongoDB documentation</a> for details. It can also be used to create <a href="https://docs.mongodb.com/manual/core/index-case-insensitive/">case insensitive indexes</a>.</td>
    </tr>
  </tbody>
</table>

### Setting the url property in datasource.ts

You can set the `url` property to a connection URL in `<datasourceName>.datasources.ts` to override individual connection parameters such as `host`, `user`, and `password`. E.g `loopback:pa55w0rd@localhost:27017/testdb`.

### Using the mongodb+srv protocol

MongoDB supports a protocol called `mongodb+srv` for connecting to replica sets without having to give the hostname of every server in the replica set.
To use `mongodb+srv` as the protocol set the `protocol` connection property in the datasource.json to `mongodb+srv`. For example:

```ts
const config = {
  name: 'db',
  connector: 'mongodb',
  host: 'myserver',
  database: 'testdb',
  protocol: 'mongodb+srv',
};
```

Note: the port is not specified when using the `mongodb+srv` protocol and will be ignored if given.

### TLS/SSL Connections

Note: SSL options deprecated since MongoDB 4.2

```ts
const config = {
  name: 'db',
  connector: 'mongodb',
  url: '',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'testdb',
  tls: true,
  tlsCertificateKeyFile: '/local/path/to/pem-file',
  tlsCAFile: '/local/path/to/ca-file',
};
```

## Security Considerations

MongoDB Driver allows the `$where` operator to pass in JavaScript to execute on the Driver which can be used for NoSQL Injection. See [MongoDB: Server-side JavaScript](https://docs.mongodb.com/manual/core/server-side-javascript/) for more on this MongoDB feature.

To protect users against this potential vulnerability, LoopBack will automatically **remove** the `$where` and `mapReduce` operators from a query before it's passed to the MongoDB Driver. If you need to use these properties from within LoopBack programmatically, you can disable the sanitization by passing in an `options` object with `disableSanitization` property set to `true`.

**Example:**

```ts
await PostRepository.find(
  { where: { $where: "function() { /*JS function here*/}" } },
  { disableSanitization: true }
);
```

## Type mappings

See [LoopBack 4 types](http://loopback.io/doc/en/lb4/LoopBack-types.html) (or [LoopBack 3 types](http://loopback.io/doc/en/lb3/LoopBack-types.html)) for details on LoopBack's data types.

### LoopBack to MongoDB types

Type conversion is mainly handled by MongoDB. See ['node-mongodb-native'](http://mongodb.github.io/node-mongodb-native/) for details.

## Update Operators

Except the comparison and logical operators LoopBack supports in the [operator list](https://loopback.io/doc/en/lb4/Where-filter.html#operators) of `Where` filter, you can also enable [MongoDB update operators](https://docs.mongodb.com/manual/reference/operator/update/) for `update*` methods by setting the flag `allowExtendedOperators` to `true` in the datasource configuration.

Here is an example of updating the price for all the products under category `furniture` if their current price is lower than 100:

```
await productRepo.updateAll({ $max: { price: 100 }}, { category: {eq: 'furniture'} // where clause goes in here });
```

{% include tip.html content="you **will not** need the dollar sign `'$'` for operators in the Where
clause." %}

## Handling ObjectId

MongoDB uses `ObjectId` for its primary key, which is an object instead of a
string. In queries, string values must be cast to `ObjectId`, otherwise they are
not considered as the same value. Therefore, you might want to specify the data
type of properties to enforce `ObjectId` coercion. Such coercion would make sure
the property value converts from ObjectId-like string to `ObjectId` when it
accesses to the database and converts `ObjectId` to ObjectId-like string when
the app gets back the value. (An ObjectId-like string is a string that has length 12 or 24 and has the format of an `ObjectId` i.e /^[0-9a-fA-F]{24}\$/.)

LoopBack provides two scopes to handle such coercion: per model or per property. Please check the following to see which configuration meets your requirements.

{% include important.html content="please make sure you are using `loopback-connector-mongodb` package version 5.2.1
or above to handle `ObjectId` properly." %}

- No `ObjectId` coercion: CRUD operations can be operated with non-ObjectId-like
  string or ObjectId-like string ids.

- Enforce `ObjectId` coercion: the property value can only be `ObjectId` or
  ObjectId-like string, otherwise it will be rejected.

Enforcing `ObjectId` coercion can be done by setting the flag
`strictObjectIDCoercion` in the **model definition** or by specifying
`dataType: ObjecId` in the **property definition**.

### Model scope

This scope would do the conversion for all properties in the model.

```ts
@model({settings: {
  strictObjectIDCoercion: true
}})
export class User extends Entity {
@property({
    type: 'string',
    id: true,
  })
  id: string;
...
}
```

### Property scope

This scope would only convert an ObjectId-like string to `ObjectId` with a certain property in the model.

```ts
@property({
    type: 'string',
    id: true,
    mongodb: {dataType: 'ObjectId'}
  }
  id: string;
```

Also notice that for RELATIONS, if the primary key/source key has set to enforce ObjectId coercion
(no matter by `strictObjectIDCoercion: true` or `dataType: 'ObjectId'`). The corresponding foreign key will need to have it
set as well to make sure relations work smoothly.

```ts
@model()
export class User extends Entity {
// source key
@property({
    type: 'string',
    id: true,
    mongodb: {dataType: 'ObjectId'}
  })
  id: string;
...
}

@model(// )
export class Address extends Entity {
  ...
  // foreign key
  @belongsTo(() => User,
   {}, //relation metadata goes in here
   {// property definition goes in here
    mongodb: {dataType: 'ObjectId'}
  })
  UserId: string;
}
```

## Customize collection/field names

`loopback-connector-mongodb` allows you to have different collection and field names from the models. Such configurations can be added to the model definition and the property definition respectively as `mongodb:{ <field>: <customValue>}`. For example, the following setting would define a collection with custom name `Custom_Collection_User`, and it has a custom field name `Custom_Name` in the database:

{% include code-caption.html content="/src/models/User.model.ts" %}

```ts
@model({
  settings: {
    // model definition goes in here
    mongodb: { collection: "Custom_Collection_User" },
  },
})
export class User extends Entity {
  @property({
    type: "string",
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: "string",
    mongodb: {
      fieldName: "Custom_Name",
    },
  })
  name?: string;
}
```

{% include important.html content="Since in MongoDB `_id` is reserved for the primary key, LoopBack **does not** allow customization of the field name for the id property. Please use `id` as is. Customizing the id property would cause errors." %}

## Running tests

### Own instance

If you have a local or remote MongoDB instance and would like to use that to run the test suite, use the following command:

- Linux

```bash
MONGODB_HOST=<HOST> MONGODB_PORT=<PORT> MONGODB_DATABASE=<DATABASE> CI=true npm test
```

- Windows

```bash
SET MONGODB_HOST=<HOST> SET MONGODB_PORT=<PORT> SET MONGODB_DATABASE=<DATABASE> SET CI=true npm test
```

### Docker

If you do not have a local MongoDB instance, you can also run the test suite with very minimal requirements.

- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn a MongoDB instance on your local:

```bash
source setup.sh <HOST> <PORT> <DATABASE>
```

where `<HOST>`, `<PORT>` and `<DATABASE>` are optional parameters. The default values are `localhost`, `27017` and `testdb` respectively.

- Run the test:

```bash
npm test
```

### Leak detection

Tests run for 100 iterations by default, but can be increased by setting the
env var `ITERATIONS`.

```
make leak-detection # run 100 iterations (default)
```

or

```
ITERATIONS=1000 make leak-detection # run 1000 iterations
```

## Running benchmarks

**Benchmarks must be run on a Unix-like operating system.**

```
make benchmarks
```

The results will be output in `./benchmarks/results.md`.

## Release notes

- 1.1.7 - Do not return MongoDB-specific `_id` to client API, except if specifically specified in the model definition
