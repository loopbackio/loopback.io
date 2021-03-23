---
title: "Create a simple API"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Create-a-simple-API.html
summary: Use the application generator tool to quickly create a LoopBack application, models, and data sources.
---

{% include content/gs-prereqs.html lang=page.lang %}

## Create new application

To create a new application, run the LoopBack [application generator](Application-generator).

If you're using IBM API Connect tools, the command is:

```sh
$ apic loopback
```

If using StrongLoop tools:

```sh
$ slc loopback
```

The LoopBack generator will greet you with some friendly ASCII art and prompt you for the name of the application.

Enter `loopback-getting-started`. Then the generator will prompt you for the name of the directory to contain the project; press Enter to accept the default (the same as the application name):

```
     _-----_
    |       |    .--------------------------.
    |--(o)--|    |  Let's create a LoopBack |
   `---------´   |       application!       |
    ( _´U`_ )    '--------------------------'
    /___A___\
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
[?] What's the name of your application? loopback-getting-started
[?] Enter name of the directory to contain the project: loopback-getting-started
```

{% include note.html content="You can use a different name for the application, but if you do, be sure to substitute your name for \"loopback-getting-started\" throughout the rest of this tutorial.
" %}

Then the tool will ask you what kind of application to create:

```
? What kind of application do you have in mind? (Use arrow keys)
❯ api-server (A LoopBack API server with local User auth)
  empty-server (An empty LoopBack API, without any configured models or datasources)
  hello-world (A project containing a controller, including a single vanilla Message and
    a single remote method)
  notes (A project containing a basic working example, including a memory database)
```

Press **Enter** to accept the default selection, `api-server`.

The generator will then display messages as it scaffolds the application including:

1.  Initializing the [project folder structure](Project-layout-reference).
2.  Creating default JSON files.
3.  Creating default JavaScript files.
4.  Downloading and installing dependent Node modules (as if you had manually done `npm install`).

## Create models

Now that you've scaffolded the initial project, you're going to create a _CoffeeShop_ model that will automatically have REST API endpoints.

Go into your new application directory, then run the LoopBack [model generator](Model-generator):

```sh
$ cd loopback-getting-started
```

Then, using IBM API Connect developer toolkit:
```sh
$ apic create --type model
```

Or, using StrongLoop tools:
```sh
$ slc loopback:model
```

The generator will prompt for a model name.  Enter **CoffeeShop**:

`[?] Enter the model name: CoffeeShop`

It will ask if you want to attach the model to any data sources that have already been defined.  

At this point, only the default in-memory data source is available.  Press **Enter** to select it:

```
...
[?] Select the data-source to attach CoffeeShop to: (Use arrow keys)
❯ db (memory)
```

Then the generator will prompt you for the base class to use for the model.  Since you will eventually connect this model to a persistent data source in a database, press down-arrow to choose **PersistedModel**, then press** Enter**:

```
[?] Select model's base class: (Use arrow keys)
  Model
❯ PersistedModel
  ACL
  AccessToken
  Application
  Change
  Checkpoint
```

[PersistedModel ](http://apidocs.strongloop.com/loopback/#persistedmodel)is the base object for all models connected to a persistent data source such as a database.  See [LoopBack core concepts](LoopBack-core-concepts) for an overview of the model inheritance hierarchy.

One of the powerful advantages of LoopBack is that it automatically generates a REST API for your model.  The generator will ask whether you want to expose this REST API.

Hit **Enter** again to accept the default and expose the Person model via REST:

`[?] Expose CoffeeShop via the REST API? (Y/n) Y`

LoopBack automatically creates a REST route associated with your model using the _plural_ of the model name.  By default, it pluralizes the name for you (by adding "s"), but you can specify a custom plural form if you wish.  See [Exposing models over REST](Exposing-models-over-REST) for all the details.  

Press **Enter** to accept the default plural form (CoffeeShops):

`[?] Custom plural form (used to build REST URL): `

Next, you'll be asked whether you want to create the model on the server only or in the `/common` directory, where it can potentially be used by both server and [client LoopBack APIs](LoopBack-in-the-client).  Keep, the default, common, even though in this application you'll only be working with server-side models:

```
? Common model or server only?
❯ common
  server
```

Every model has properties.  Right now, you're going to define one property, "name," for the CoffeeShop model.  

Select **`string`** as the property type (press **Enter**, since string is the default choice):

```
Let's add some CoffeeShop properties now.
Enter an empty property name when done.
[?] Property name: name
   invoke   loopback:property
[?] Property type: (Use arrow keys)
❯ string
  number
  boolean
  object
  array
  date
  buffer
  geopoint
  (other)
```

Each property can be optional or required. Enter **`y`** to make `name` required:

`[?] Required? (y/N)`

Then you'll be prompted to enter a default value for the property; press Enter for no default value:

`? Default value[leave blank for none]: `

Then, you'll be prompted to add another property.  Follow the prompts to add a required property named "city."

```
Let's add another CoffeeShop property.
? Property name: city
? Property type: string
? Required? Yes
? Default value[leave blank for none]:
```

End the model creation process by pressing **Enter** when prompted for the name of the next property.

The model generator will create two files in the application's `common/models` directory that define the model: `coffee-shop.json` and `coffee-shop.js`.

{% include important.html content="The LoopBack [model generator](Model-generator.html), automatically converts camel-case model names (for example MyModel) to lowercase dashed names (my-model).  For example, if you create a model named \"FooBar\" with the model generator, it creates files `foo-bar.json` and `foo-bar.js` in `common/models`.  However, the model name (\"FooBar\") will be preserved via the model's name property.
" %}

## Check out the project structure

For all the details of the canonical LoopBack application structure, see [Project layout reference](Project-layout-reference).

## Run the application (API Connect toolkit)

If you are using the `apic` command-line tool, follow the instructions in
[Testing a LoopBack project](https://www.ibm.com/support/knowledgecenter/en/SSFS6T/com.ibm.apic.toolkit.doc/tutorial_cli_project_test.html?view=kc#topic_qt2_kqz_2v__explorer) to run the project locally and
explore the API.

## Run the application (StrongLoop tools)

If you are using the `slc` command-line tool, follow the steps below to to run the project locally and explore the API.

First, start the application:

```
$ node .
...
Browse your REST API at http://0.0.0.0:3000/explorer
Web server listening at: http://0.0.0.0:3000/
```

{% include note.html content="Running your app with the `node` command is appropriate when you're developing on your local machine.   In production, consider using [API Connect](https://developer.ibm.com/apiconnect/) or a [process manager](http://strong-pm.io/) for scalability and reliability.
" %}

Open your browser to [http://0.0.0.0:3000/](http://0.0.0.0:3000/) (on some systems, you may need to use [http://localhost:3000](http://localhost:3000/) instead).  You'll see the default application response that displays some JSON with some status information; for example:

`{"started":"2017-03-10T21:59:47.155Z","uptime":42.054}`

Now open your browser to [http://0.0.0.0:3000/explorer](http://0.0.0.0:3000/explorer) or [http://localhost:3000/explorer](http://localhost:3000/explorer).  You'll see the StrongLoop API Explorer:

{% include image.html file="5570638.png" alt="" %}

Through a set of simple steps using LoopBack, you've created a CoffeeShop model, specified its properties and then exposed it through REST. 

{% include next.html content= "
In [Use API Explorer](Use-API-Explorer.html), you'll explore the REST API you just created in more depth and exercise some of its operations.
" %}
