---
title: "Connect your API to a data source"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Connect-your-API-to-a-data-source.html
summary: LoopBack enables you to easily persist your data model to a variety of data sources without having to write code.
---

{% include content/gs-prereqs.html lang=page.lang %}

You're going to take the app from the previous section and connect it to MySQL.   

{% include note.html content="
If you followed the previous steps in the tutorial, go to [Add a data source](#add-a-data-source).

If you're just jumping in, follow the steps below to catch up...
" %}

Get the app (in the state following the last article) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout step1
$ npm install
```

## Add a data source

Now you're going to define a data source using the [Data source generator](Data-source-generator):

```
$ lb datasource
```

The generator will prompt you to name the data source:

```
[?] Enter the data-source name:
```

Enter **mysqlDs** and hit **Enter**.

Next, the generator will prompt you for the type of data source:

```
? Select the connector for mysqlDs: (Use arrow keys)
❯ In-memory db (supported by StrongLoop)
  IBM DB2 (supported by StrongLoop)
  IBM DashDB (supported by StrongLoop)
  IBM MQ Light (supported by StrongLoop)
  IBM Cloudant DB (supported by StrongLoop)
  IBM DB2 for z/OS (supported by StrongLoop)
  MongoDB (supported by StrongLoop)
(Move up and down to reveal more choices)
```

Press the down-arrow key to highlight **MySQL (supported by StrongLoop)**, then hit **Enter**.  

Then the tool will prompt you for the data source configuration settings.
For MySQL, you can either enter all the settings in URL format, or individually.

```
Connector-specific configuration:
? Connection String url to override other settings (eg: mysql://user:pass@host/db):
```
Press **Enter** to skip the URL connection string, since you'll enter the settings individually.

{% include important.html content="If you have a MySQL database server that you can use, please use it. Create a new database called \"getting_started.\" If you wish, you can use a different database name. Just make sure the `mysqlDs.database` property in `datasources.json `matches it (see below).

If not, you can use the StrongLoop MySQL server running on `demo.strongloop.com`. However, be aware that it is a shared resource. There is a small chance that two users may run the script that creates sample data (see [Add some test data and view it](#add-some-test-data-and-view-it), below) at the same time and may run into race condition. For this reason, we recommend you use your own MySQL server if you have one.
" %}

To use the StrongLoop MySQL server enter the settings shown below.
To use your own MySQL server, enter the hostname, port number, and login credentials for your server. 

```
? host: demo.strongloop.com
? port: 3306
? user: demo
? password: L00pBack
? database: getting_started
? Install loopback-connector-mysql@^2.2 Yes
```

When the tool prompts you to install the connector, hit **Enter** to make the tool run `npm install loopback-connector-mysql --save`.  The tool will also add the data source definition to the `server/datasources.json` file, which will look as shown below.  Notice the "mysqlDs" data source you just added, as well as in-memory data source named "db," which is there by default.

{% include code-caption.html content="/server/datasources.json" %}
```javascript
{
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mysqlDs": {
      "host": "demo.strongloop.com",
      "port": 3306,
      "url": "",
      "database": "getting_started",
      "password": "L00pBack",
      "name": "mysqlDs",
      "user": "demo",
      "connector": "mysql"
    }
}
```

## Connect CoffeeShop model to MySQL

Now you've created a MySQL data source and you have a CoffeeShop model; you just need to connect them.  LoopBack applications use the [model-config.json](model-config.json) file to link models to data sources.  Edit `/server/model-config.json` and look for the CoffeeShop entry:

{% include code-caption.html content="/server/model-config.json" %}
```javascript
...
  "CoffeeShop": {
    "dataSource": "db",
    "public": true
  }
  ...
```

Change the `dataSource` property from `db` to `mysqlDs`.  This attaches the CoffeeShop model to the MySQL datasource you just created and configured:

{% include code-caption.html content="/server/model-config.json" %}
```javascript
...
  "CoffeeShop": {
    "dataSource": "mysqlDs",
    "public": true
  }
  ...
```

## Add some test data and view it

Now you have a CoffeeShop model in LoopBack, how do you  create the corresponding table in MySQL database?

You could try executing some SQL statements directly...but LoopBack provides a Node API to do it for you automatically using a process called _auto-migration_.  For more information, see [Creating a database schema from models](Creating-a-database-schema-from-models).

The `loopback-getting-started` module contains the `create-sample-models.js` script to demonstrate auto-migration.  If you've been following along from the beginning (and didn't just clone this module), then you'll need to copy it from below or [from GitHub](https://github.com/strongloop/loopback-getting-started/blob/master/server/boot/create-sample-models.js) .  Put it in the application's `/server/boot` directory so it will get executed when the application starts.

{% include note.html content="The auto-migration script below is an example of a _boot script_ that LoopBack executes when an application initially starts up. Use boot scripts for initialization and to perform any other logic your application needs to perform when it starts. See [Defining boot scripts](Defining-boot-scripts) for more information.
" %}

{% include code-caption.html content="/server/boot/create-sample-models.js" %}
```javascript
module.exports = function(app) {
  app.dataSources.mysqlDs.automigrate('CoffeeShop', function(err) {
    if (err) throw err;

    app.models.CoffeeShop.create([{
      name: 'Bel Cafe',
      city: 'Vancouver'
    }, {
      name: 'Three Bees Coffee House',
      city: 'San Mateo'
    }, {
      name: 'Caffe Artigiano',
      city: 'Vancouver'
    }], function(err, coffeeShops) {
      if (err) throw err;

      console.log('Models created: \n', coffeeShops);
    });
  });
};
```

This will save some test data to the data source.

{% include note.html content="The boot script containing the auto-migration command will run _each time_ you run your application. Since [`automigrate()`](http://apidocs.loopback.io/loopback-datasource-juggler/#datasource-prototype-automigrate) first drops tables before trying to create new ones, it won't create duplicate tables.
" %}

Now run the application:

```
$ node .
```

In the console, you'll see this:

```
...
Browse your REST API at http://0.0.0.0:3000/explorer
Web server listening at: http://0.0.0.0:3000/
Models created: [ { name: 'Bel Cafe',
    city: 'Vancouver',
    id: 1 },
  { name: 'Three Bees Coffee House',
    city: 'San Mateo',
    id: 3 },
  { name: 'Caffe Artigiano',
    city: 'Vancouver',
    id: 2 } ]
```

You can also use the API Explorer:

1.  Browse to [http://0.0.0.0:3000/explorer/](http://0.0.0.0:3000/explorer/) (you may need to use [http://localhost:3000/explorer,](http://localhost:3000/explorer,) depending on your browser and OS).
2.  Click **GET  /CoffeeShops  Find all instance of the model matched by filter...**
3.  Click **Try it out!**
4.  You'll see the data for the three coffee shops created in the above script. 

{% include next.html content= "
In [Extend your API](Extend-your-API.html), you'll learn how to add a custom method to your model.
" %}
