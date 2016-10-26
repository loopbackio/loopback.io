# loopback-example-database

A tutorial for basic database related features.

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Running the example](#running-the-example)
- [Tutorial - PostgreSQL](#tutorial---postgresql)

## Overview

### Topics covered

- Data sources
  - Creating
  - Configuring
- Models
  - Creating
- Automigration
- Discovery

### Database specific tutorials

Database specific tutorials are on separate branches. The master branch contains
the tutorial for MongoDB.

|Branch|Connector|
|:--|:--|
|[master](https://github.com/strongloop/loopback-example-database)|MongoDB|
|[mssql](https://github.com/strongloop/loopback-example-database/tree/mssql)|Microsoft SQL Server|
|[mysql](https://github.com/strongloop/loopback-example-database/tree/mysql)|MySQL|
|[oracle](https://github.com/strongloop/loopback-example-database/tree/oracle)|Oracle|
|[postgresql](https://github.com/strongloop/loopback-example-database/tree/postgresql)|PostgreSQL|

For example, to view the PostgreSQL example:

```
git clone https://github.com/strongloop/loopback-example-database
cd loopback-example-database
git checkout postgresql
```

## Prerequisites

Before starting this tutorial, make sure you have the following installed:

- Node
- NPM
- [StrongLoop Controller](https://github.com/strongloop/strongloop)

## Running the example

```
git clone https://github.com/strongloop/loopback-example-database
cd loopback-example-database
npm install
npm start
```

## Tutorial - PostgreSQL

### 1. Create a new LoopBack app

#### App info

- Name: `loopback-example-database`
- Dir to contain the project: `loopback-example-database`

```
slc loopback loopback-example-database
... # follow the prompts
```

### 2. Install the LoopBack PostgreSQL connector

```
cd loopback-example-database
npm install --save loopback-connector-postgresql
```

### 3. Create a data source

#### Data source info

- Data source name: `accountDS`
- Select the connector for `accountDS`: `PostgreSQL`

```
slc loopback:datasource accountDS
... # follow the prompts
```

This creates a new data source named `accountDS` that uses the PostgreSQL
connector.

### 4. Configure the data source

For the purposes of this example, we will use a preconfigured StrongLoop
PostgreSQL server. Edit `server/datasources.json` to set the PostgreSQL configs:

```
{
  ...
  "accountDS": {
    "name": "accountDS",
    "connector": "postgresql",
    "host": "demo.strongloop.com",
    "port": 5432,
    "database": "demo",
    "username": "demo",
    "password": "L00pBack"
  }
}
```

> Feel free to use your own local PostgreSQL instance. Simply change the configs
> above to match your own.

### 5. Create a new model

#### Model Info

- Model name: `Account`
- Attach `Account` to: `accountDS (postgresql)`
- Base class: `PersistedModel`
- Expose via REST: `Yes`
- Custom plural form: <press enter> *Leave blank*
- Properties:
  - `email`
    - String
    - Not required
  - `createdAt`
    - Date
    - Not required
  - `lastModifiedAt`
    - Date
    - Not required

```
slc loopback:model Account
... # follow the prompts
```

### 6. Create the collection with sample data - Automigration

With the `account` model configured, we can generate the corresponding
PostgreSQL table using the info from the `Account` metadata in [`common/models/account.json`](common/models/account.json)
via [*auto-migration*](https://docs.strongloop.com/display/public/LB/Implementing+auto-migration).

Start by creating a dir to store general-purpose scripts:

```
mkdir bin
```

Inside that dir, create a script named [`automigrate.js`](bin/automigrate.js).
To create the `Account` collection and create two sample accounts, run:

```
node bin/automigrate.js
```

> **WARNING**
>
> The `automigrate` function creates a new collection if it doesn't exist. If
> the collection already exists, **it will be destroyed and it's data will be
> deleted**. If you want to keep this data, use `autoupdate` instead.

You should see:

```
Created: { email: 'john.doe@ibm.com',
  createdAt: Fri Oct 23 2015 17:14:03 GMT-0700 (PDT),
  lastModifiedAt: Fri Oct 23 2015 17:14:03 GMT-0700 (PDT),
  id: 1 }
Created: { email: 'jane.doe@ibm.com',
  createdAt: Fri Oct 23 2015 17:14:03 GMT-0700 (PDT),
  lastModifiedAt: Fri Oct 23 2015 17:14:03 GMT-0700 (PDT),
  id: 2 }
```

### 7. View data using the explorer

Projects scaffolded via `slc loopback` come with `loopback-component-explorer`
preconfigured. From the project root, start the server:

```
node .
```

Then to view the existing account data, browse to `localhost:3000/explorer` and
click:

- `GET /Accounts`
- `Try it out!`

You should see:

```
[
  {
    "email": "john.doe@ibm.com",
    "createdAt": "2015-10-24T00:14:03.567Z",
    "lastModifiedAt": "2015-10-24T00:14:03.567Z",
    "id": 1
  },
  {
    "email": "jane.doe@ibm.com",
    "createdAt": "2015-10-24T00:14:03.567Z",
    "lastModifiedAt": "2015-10-24T00:14:03.567Z",
    "id": 2
  }
]
```

> Try out some of the other endpoints to get a feel for how explorer works.

### 8. Add a script to perform discover the database schema

> [*Discovery*](https://docs.strongloop.com/display/public/LB/Discovering+models+from+relational+databases)
> is the process of reverse engineering a LoopBack model from an existing
> database schema.

Create a script name [`discover-schema.js`](bin/discover-schema.js). Then run this script to
discover the schema from the existing `Account` table:

```
node bin/discover-schema
```

You should see:

```
{
  "name": "Account",
  "options": {
    "idInjection": false,
    "postgresql": {
      "schema": "public",
      "table": "account"
    }
  },
  "properties": {
    "email": {
      "type": "String",
      "required": false,
      "length": 1024,
      "precision": null,
      "scale": null,
      "postgresql": {
        "columnName": "email",
        "dataType": "character varying",
        "dataLength": 1024,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "YES"
      }
    },
    "createdat": {
      "type": "String",
      "required": false,
      "length": null,
      "precision": null,
      "scale": null,
      "postgresql": {
        "columnName": "createdat",
        "dataType": "timestamp with time zone",
        "dataLength": null,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "YES"
      }
    },
    "lastmodifiedat": {
      "type": "String",
      "required": false,
      "length": null,
      "precision": null,
      "scale": null,
      "postgresql": {
        "columnName": "lastmodifiedat",
        "dataType": "timestamp with time zone",
        "dataLength": null,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "YES"
      }
    },
    "id": {
      "type": "Number",
      "required": true,
      "length": null,
      "precision": 32,
      "scale": 0,
      "id": 1,
      "postgresql": {
        "columnName": "id",
        "dataType": "integer",
        "dataLength": null,
        "dataPrecision": 32,
        "dataScale": 0,
        "nullable": "NO"
      }
    }
  }
}
```

### 9. Add a script to discover and build models

When retrieving the scheme is not enough, you can discover and build LoopBack
models in one step.

Create a sript named [`discover-and-build-models.js`](bin/discover-and-build-models.js).
Then run:

```
node bin/discover-and-build-models
```

You should see:

```
[ { email: 'john.doe@ibm.com',
    createdat: Fri Oct 23 2015 17:39:50 GMT-0700 (PDT),
    lastmodifiedat: Fri Oct 23 2015 17:39:50 GMT-0700 (PDT),
    id: 1 },
  { email: 'jane.doe@ibm.com',
    createdat: Fri Oct 23 2015 17:39:50 GMT-0700 (PDT),
    lastmodifiedat: Fri Oct 23 2015 17:39:50 GMT-0700 (PDT),
    id: 2 } ]
```

> See the [official docs](https://docs.strongloop.com/display/public/LB/Discovering+models+from+relational+databases)
> for more info.

---

[More LoopBack examples](https://github.com/strongloop/loopback-example)
