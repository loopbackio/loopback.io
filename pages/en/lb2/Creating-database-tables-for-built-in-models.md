---
title: "Creating database tables for built-in models"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Creating-database-tables-for-built-in-models.html
summary:
---

LoopBack applications come with a small set of [built-in models](Using-built-in-models.html).
To create database tables for these models, follow the general procedure for 
[creating a database schema from models](Creating-a-database-schema-from-models.html) using _auto-migration_.

{% include important.html content="
If the database has existing tables, running `automigrate()` will drop and re-create the tables and thus may lead to loss of data.
To avoid this problem use `autoupdate()`.
See [Creating a database schema from models](Creating-a-database-schema-from-models.html) for more information.
" %}

To create tables for LoopBack [built-in models](Using-built-in-models.html), follow this procedure:

1.  Follow the basic procedure in [Attaching models to data sources](Attaching-models-to-data-sources.html)
    to change from the in-memory data source to the  database you want to use.

2.  Create `server/create-lb-tables.js` file with the following:

    ```javascript
    var server = require('./server');
    var ds = server.dataSources.db;
    var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
    ds.automigrate(lbTables, function(er) {
      if (er) throw er;
      console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
      ds.disconnect();
    });
    ```

3.  Run the script manually:

    ```shell
    $ cd server
    $ node create-lb-tables.js
    ```
