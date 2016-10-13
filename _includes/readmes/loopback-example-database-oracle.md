# loopback-example-database

A tutorial for basic database related features.

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Running the example](#running-the-example)
- [Tutorial - Oracle](#tutorial---oracle)

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

## Tutorial - Oracle

### 1. Create a new LoopBack app

#### App info

- Name: `loopback-example-database`
- Dir to contain the project: `loopback-example-database`

```
slc loopback loopback-example-database
... # follow the prompts
```

### 2. Install the LoopBack Oracle connector

```
cd loopback-example-database
npm install --save loopback-connector-oracle
```

> #### Automatic PATH modification
> **⚠️ DEPRECATED loopback 1.x feature**
> During installation, you will see:
>
>     ...
>     ---------------------------------------------------------------------------
>     The node-oracle module and the Oracle specific libraries have been
>     installed in /Users/sh/repos/loopback-example-database/node_modules/loopback-connector-oracle/node_modules/loopback-oracle-installer.
>    
>     The default bashrc (/etc/bashrc) or user's bash_profile (~/.bash_profile)
>     paths have been modified to use this path. If you use a shell other than
>     bash, please remember to set the DYLD_LIBRARY_PATH prior to using node.
>    
>     Example:
>       $ export DYLD_LIBRARY_PATH=":/Users/$USER/repos/loopback-example-database/node_modules/loopback-connector-oracle/node_modules/instantclient:/Users/$USER/repos/loopback-example-database/node_modules/loopback-connector-oracle/node_modules/instantclient"
>     ...
>
>
> This is a **DEPRECATED** feature from LoopBack 1.x (we will remove this
> message in a future update. Due to concerns raised in the past regarding the
> "invasiveness" of automatic PATH modification, we now generate a file in your
> home directory named strong-oracle.rc instead. This file is meant to be
> sourced into your startup file (.bashrc, .bash_profile, etc) **manually**.

Add the following to your startup file (.bashrc, .bash_profile, etc)

```
source $HOME/strong-oracle.rc
```

### 3. Create a data source

#### Data source info

- Data source name: `accountDS`
- Select the connector for `accountDS`: `Oracle`

```
slc loopback:datasource accountDS
... # follow the prompts
```

This creates a new data source named `accountDS` that uses the Oracle
connector.

### 4. Configure the data source

For the purposes of this example, we will use a preconfigured StrongLoop
Oracle server. Edit `server/datasources.json` to set the Oracle configs:

```
{
  ...
  "accountDS": {
    "name": "accountDS",
    "connector": "oracle",
    "host": "demo.strongloop.com",
    "port": 5432,
    "database": "demo",
    "username": "demo",
    "password": "L00pBack"
  }
}
```

> Feel free to use your own local Oracle instance. Simply change the configs
> above to match your own.

### 5. Create a new model

#### Model Info

- Model name: `Account`
- Attach `Account` to: `accountDS (oracle)`
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
Oracle table using the info from the `Account` metadata in [`common/models/account.json`](common/models/account.json)
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
  createdAt: Mon Oct 26 2015 15:56:30 GMT-0700 (PDT),
  lastModifiedAt: Mon Oct 26 2015 15:56:30 GMT-0700 (PDT),
  id: 1 }
Created: { email: 'jane.doe@ibm.com',
  createdAt: Mon Oct 26 2015 15:56:30 GMT-0700 (PDT),
  lastModifiedAt: Mon Oct 26 2015 15:56:30 GMT-0700 (PDT),
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
    "createdAt": "2015-10-26T23:03:19.000Z",
    "lastModifiedAt": "2015-10-26T23:03:19.000Z",
    "id": 1
  },
  {
    "email": "jane.doe@ibm.com",
    "createdAt": "2015-10-26T23:03:19.000Z",
    "lastModifiedAt": "2015-10-26T23:03:19.000Z",
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
    "oracle": {
      "schema": "DEMO",
      "table": "ACCOUNT"
    }
  },
  "properties": {
    "email": {
      "type": "String",
      "required": false,
      "length": 1024,
      "precision": null,
      "scale": null,
      "oracle": {
        "columnName": "EMAIL",
        "dataType": "VARCHAR2",
        "dataLength": 1024,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "Y"
      }
    },
    "createdat": {
      "type": "Date",
      "required": false,
      "length": 7,
      "precision": null,
      "scale": null,
      "oracle": {
        "columnName": "CREATEDAT",
        "dataType": "DATE",
        "dataLength": 7,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "Y"
      }
    },
    "lastmodifiedat": {
      "type": "Date",
      "required": false,
      "length": 7,
      "precision": null,
      "scale": null,
      "oracle": {
        "columnName": "LASTMODIFIEDAT",
        "dataType": "DATE",
        "dataLength": 7,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "Y"
      }
    },
    "id": {
      "type": "Number",
      "required": true,
      "length": 22,
      "precision": null,
      "scale": null,
      "id": 1,
      "oracle": {
        "columnName": "ID",
        "dataType": "NUMBER",
        "dataLength": 22,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "N"
      }
    }
  }
}
```

> Notice the [string params for `discoverSchema` are **capitalized**](bin/discover-schema.js).

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
