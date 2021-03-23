---
title: "Creating a database schema from models"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Creating-a-database-schema-from-models.html
summary:
---

LoopBack _auto-migration_ creates a database schema based on your application's models.
In relational databases, auto-migration creates a table for each model, and a column in the table for each property in the model.
Auto-migration creates tables for all models attached to a data source, including 
[built-in models](Using-built-in-models.html)

Once you have defined a model, LoopBack can create or update (synchronize) the database schemas accordingly, if you need to adjust the database to match the models.
LoopBack provides two ways to synchronize model definitions with table schemas:

* **[Auto-migrate](#auto-migrate)**: Automatically create or re-create the table schemas based on the model definitions. 
* **[Auto-update](#auto-update)**: Automatically alter the table schemas based on the model definitions.

{% include warning.html content="
Auto-migration will drop an existing table if its name matches a model name.
When tables with data exist, use [auto-update](#auto-update) to avoid data loss.
" %}

## Auto-migrate

{% include note.html content="
The API Designer tool in IBM API Connect enables you to perform auto-migration without coding.
For more information, see [Creating a database schema from models](http://www.ibm.com/support/knowledgecenter/SSFS6T/com.ibm.apic.toolkit.doc/tapim-model-update.html).
" %}

**See also**: [automigrate()](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-automigrate) in LoopBack API reference.

The following data sources support auto-migration:

* [Cassandra](Cassandra-connector.html)
* [MongoDB](MongoDB-connector.html)
* [MySQL](MySQL-connector.html)
* [Oracle](Oracle-connector.html)
* [PostgreSQL](PostgreSQL-connector.html)
* [SQL Server](SQL-Server-connector.html)
* [IBM Cloudant](Cloudant-connector.html)
* [IBM DB2](DB2-connector.html)
* [IBM DashDB](DashDB.html)
* [IBM DB2 for z/OS](DB2-for-z-OS.html)

Here's an example of auto-migration. Consider this model definition:

{% include code-caption.html content="/common/models/model.js" %}
```javascript
var schema_v1 = {
  "name": "CustomerTest",
  "options": {
    "idInjection": false,
    "oracle": {
      "schema": "LOOPBACK",
      "table": "CUSTOMER_TEST"
    }
  },
  "properties": {
    "id": {
      "type": "String",
      "length": 20,
      "id": 1
    },
    "name": {
      "type": "String",
      "required": false,
      "length": 40
    },
    "email": {
      "type": "String",
      "required": false,
      "length": 40
    },
    "age": {
      "type": "Number",
      "required": false
    }
  }
};
```

Assuming the model doesn't have a corresponding table in the Oracle database, you can create the corresponding schema objects to reflect the model definition using `autoMigrate()`:

{% include code-caption.html content="/common/models/model.js" %}
```javascript
var ds = Model.app.dataSources.oracle;

ds.createModel(schema_v1.name, schema_v1.properties, schema_v1.options);

ds.automigrate(function () {
  ds.discoverModelProperties('CUSTOMER_TEST', function (err, props) {
    console.log(props);
  });
});
```

This creates the following objects in the Oracle database:

* A table CUSTOMER_TEST.
* A sequence CUSTOMER_TEST_ID_SEQUENCE for keeping sequential IDs.
* A trigger CUSTOMER_ID_TRIGGER that sets values for the primary key.

Now suppose you decide to make some changes to the model. Here is the second version:

{% include code-caption.html content="/common/models/model.js" %}
```javascript
var schema_v2 = {
  "name": "CustomerTest",
  "options": {
    "idInjection": false,
    "oracle": {
      "schema": "LOOPBACK",
      "table": "CUSTOMER_TEST"
    }
  },
  "properties": {
    "id": {
      "type": "String",
      "length": 20,
      "id": 1
    },
    "email": {
      "type": "String",
      "required": false,
      "length": 60,
      "oracle": {
        "columnName": "EMAIL",
        "dataType": "VARCHAR",
        "dataLength": 60,
        "nullable": "Y"
      }
    },
    "firstName": {
      "type": "String",
      "required": false,
      "length": 40
    },
    "lastName": {
      "type": "String",
      "required": false,
      "length": 40
    }
  }
}
```

### MongoDB indexes

Running `autoMigrate()` creates missing indexes but it doesn't modify them if their definitions change.
If a model's index definitions change, you must either modify them via the MongoDB shell, or delete them and re-create them.
For more information, see the [MongoDB documentation](http://docs.mongodb.org/manual/reference/method/db.collection.ensureIndex/#behaviors).

## Auto-update

**See also**: See also [autoupdate()](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-autoupdate) in LoopBack API reference.

If there are existing tables in a database, running `autoMigrate()` will drop and re-create the tables: Therefore, data will be lost.
To avoid this problem use `auto-update()`.
Instead of dropping tables and recreating them, `autoupdate()` calculates the difference between the LoopBack model and the database table
definition and alters the table accordingly. This way, the column data will be kept as long as the property is not deleted from the model.

For example:

{% include code-caption.html content="/server/script.js" %}
```javascript
ds.createModel(schema_v2.name, schema_v2.properties, schema_v2.options);
ds.autoupdate(schema_v2.name, function (err, result) {
  ds.discoverModelProperties('CUSTOMER_TEST', function (err, props) {
    console.log(props);
  });
});
```

To check if database changes are required, use the `isActual()` method.
It accepts a `callback` argument that receives a Boolean value depending on database state:

* False if the database structure outdated
* True when data source and database is in sync

{% include code-caption.html content="/server/script.js" %}
```javascript
dataSource.isActual(models, function(err, actual) {
  if (!actual) {
    dataSource.autoupdate(models, function(err, result) {
      // ...
    });
  }
});
```
