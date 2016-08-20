---
title: "Tutorial: Offline Synchronization"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Tutorial-Offline-Synchronization.html
summary:
---

{% include note.html content="

This article is reproduced from [https://github.com/strongloop/loopback-example-offline-sync](https://github.com/strongloop/https://github.com/strongloop/loopback-example-offline-sync)

" %}

# loopback-example-offline-sync

**Note: This example uses `loopback@2.0.0` and `loopback-boot@2.0.0`!**

An example running LoopBack in the browser and server, demonstrating the
following features:

* offline data access and synchronization
* routes shared between the AngularJS app and the HTTP server

## Install and Run

1.  You must have `node` and `git` installed. it's recommended to have `mongod` installed too, so that the data is preserved across application restarts.
2.  Clone the repo.
3.  `cd loopback-example-offline-sync`
4.  `npm install` - install the root package dependencies.
5.  `npm install grunt-cli -g` - skip if you have Grunt CLI already installed.
6.  `npm install bower -g` - skip if you already have Bower installed.
7.  `bower install` - install front-end scripts
8.  `mongod` - make sure mongodb is running if you want to run with `NODE_ENV=production`.
9.  `grunt serve` - build and run the entire project in development mode.
10.  open `http://localhost:3000` - point a browser at the running application.

## Project layout

The project is composed from multiple components.

* `common/models/` contains definition of models that are shared by both the server and the client.

* `client/lbclient/` provides an isomorphic loopback client with offline synchronization.
  The client needs some client-only models for data synchronization. These models are defined in `client/lbclient/models/`.

* `client/ngapp/` is a single-page AngularJS application scaffolded using `yo angular`,
  with a few modifications to make it work better in the full-stack project.

* `server/` is the main HTTP server that brings together all other components.
  Also contains the REST API server; it exposes the shared models via REST API.

## Build

This project uses [Grunt](http://gruntjs.com/) for the build, since that's what
`yo angular` creates.

There are three major changes from the generic Gruntfile required for this
full-stack example:

* `grunt serve` uses the `server/` component instead of `grunt connect`.

* `lbclient` component provides a custom build script (`lbclient/build.js`) which runs `browserify` to produce a single js file to be used in the
  browser. The Gruntfile contains a custom task to run this build.

* The definition of Angular routes is kept in a standalone JSON file that is used by the `server/` component too.
  To make this JSON file available in the browser, there is a custom task that builds `ngapp/config/bundle.js`.

### Targets

* `grunt serve` starts the application in development mode, watching for file changes and automatically reloading the application.
* `grunt test` runs automated tests (only the front-end has tests at the moment).
* `grunt build` creates the bundle for deploying to production.
* `grunt serve:dist` starts the application serving the production bundle of the front-end SPA.
* `grunt jshint` checks consistency of the coding style.

## Adding more features

### Define a new shared model

The instructions assume the name of the new model is `MyModel`.

1.  Create a file `models/my-model.json`, put the model definition there.
    Use `models/todo.json` as an example, see
    [loopback-boot docs](http://apidocs.strongloop.com/loopback-boot) for more details about the file format.

2.  (Optional) Add `models/my-model.js` and implement your custom model methods. See `models/todo.js` for an example.

3.  Add an entry to `rest/models.json` to configure the new model in the REST server:

4.  Define a client-only model to represent the remote server model in the
    client - create `lbclient/models/my-model.json` with the following content:

5.  Add two entries to `lbclient/models.json` to configure the new models for the client:

6.  Register the local model with Angular's injector in `ngapp/scripts/services/lbclient.js`:

### Create a new Angular route

Since the full-stack example project shares the routes between the client and
the server, the new route cannot be added using the yeoman generator.

1.  (Optional) Create a new angular controller using yeoman, for example,

2.  (Optional) Create a new angular view using yeoman, for example,

3.  Add a route entry to `ngapp/config/routes.json`, for example,

* * *

[More LoopBack examples](https://github.com/strongloop/loopback-example)