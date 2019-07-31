# loopback-example-database

A tutorial for basic database related features.

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Running the example](#running-the-example)
- [Tutorial - Microsoft SQL Server](#tutorial---microsoft-sql-server)

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

For example, to view the MySQL example:

```
git clone https://github.com/strongloop/loopback-example-database
cd loopback-example-database
git checkout mysql
```

## Prerequisites

Before starting this tutorial, make sure you have the following installed:

- Node.js
- LoopBack CLI tools; see [lb](http://loopback.io/doc/en/lb3/Installation.html)



## Running the example

```
git clone https://github.com/strongloop/loopback-example-database
cd loopback-example-database
npm install
npm start
```

## Tutorial - Microsoft SQL Server (MSSQL)

### 1. Create a new LoopBack app

#### App info

- Name: `loopback-example-database`
- Dir to contain the project: `loopback-example-database`

```
lb app loopback-example-database
... # follow the prompts
```

### 2. Install the LoopBack MSSQL connector

```
cd loopback-example-database
npm install --save loopback-connector-mssql
```

### 3. Create a data source

#### Data source info

- Data source name: `accountDS`
- Select the connector for `accountDS`: `Microsoft SQL`

```
lb datasource accountDS
... # follow the prompts
```

This creates a new data source named `accountDS` that uses the MSSQL connector.

### 4. Configure the data source

For the purposes of this example, we will use a preconfigured StrongLoop MSSQL
server. Edit `server/datasources.json` to set the MSSQL configs:

```
{
  ...
  "accountDS": {
    "name": "accountDS",
    "connector": "mssql",
    "host": "mssql.strongloop.com",
    "port": 1433,
    "database": "demo",
    "username": "demo",
    "password": "L00pBack"
  }
}
```

> Feel free to use your own local MSSQL instance. Simply change the configs
> above to match your own.

### 5. Create a new model

#### Model Info

- Model name: `Account`
- Attach `Account` to: `accountDS (mssql)`
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
lb model Account
... # follow the prompts
```

### 6. Create the collection with sample data - Automigration

With the `account` model configured, we can generate the corresponding
MSSQL table using the info from the `Account` metadata in [`common/models/account.json`](common/models/account.json)
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
  createdAt: Fri Oct 23 2015 16:25:50 GMT-0700 (PDT),
  lastModifiedAt: Fri Oct 23 2015 16:25:50 GMT-0700 (PDT),
  id: 1 }
Created: { email: 'jane.doe@ibm.com',
  createdAt: Fri Oct 23 2015 16:25:50 GMT-0700 (PDT),
  lastModifiedAt: Fri Oct 23 2015 16:25:50 GMT-0700 (PDT),
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
    "createdAt": "2015-10-23T23:25:50.000Z",
    "lastModifiedAt": "2015-10-23T23:25:50.000Z",
    "id": 1
  },
  {
    "email": "jane.doe@ibm.com",
    "createdAt": "2015-10-23T23:25:50.000Z",
    "lastModifiedAt": "2015-10-23T23:25:50.000Z",
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
FIXME
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
Found: [ { id: 1,
    email: 'john.doe@ibm.com',
    createdat: Fri Oct 23 2015 16:25:50 GMT-0700 (PDT),
    lastmodifiedat: Fri Oct 23 2015 16:25:50 GMT-0700 (PDT) },
  { id: 2,
    email: 'jane.doe@ibm.com',
    createdat: Fri Oct 23 2015 16:25:50 GMT-0700 (PDT),
    lastmodifiedat: Fri Oct 23 2015 16:25:50 GMT-0700 (PDT) } ]
```

> See the [official docs](https://docs.strongloop.com/display/public/LB/Discovering+models+from+relational+databases)
> for more info.

---

[More LoopBack examples](https://loopback.io/doc/en/lb3/Tutorials-and-examples.html)
