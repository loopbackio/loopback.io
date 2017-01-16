# loopback-example-app-logic

```
$ git clone https://github.com/strongloop/loopback-example-app-logic.git
$ cd loopback-example-app-logic
$ npm install
$ node .
# then in a different tab, run ./bin/remote-method-request or ./bin/datetime-request
```

In this example, we demonstrate remote methods, remote hooks, model operation hooks, boot scripts, middleware, and email-connector as solutions for integrating user-defined logic into a LoopBack application.


## Prerequisites

Tutorials:

- [Getting started with LoopBack](http://loopback.io/doc/en/lb2/Getting-started-with-LoopBack.html)
- [Tutorial series - step 1](https://github.com/strongloop/loopback-example#step-one---the-basics)
- [Tutorial series - step 2](https://github.com/strongloop/loopback-example#step-two---relations-and-filter)

Knowledge:

- [LoopBack models](http://loopback.io/doc/en/lb2/Defining-models.html)
- [LoopBack adding application logic](http://loopback.io/doc/en/lb2/Adding-application-logic.html)

## Procedure

### Create the application

Application information:

- Name: `loopback-example-app-logic`
- Directory to contain the project: `loopback-example-app-logic`

```
$ slc loopback loopback-example-app-logic
... # follow the prompts
$ cd loopback-example-app-logic
```

### Add a model

Model information:

- Name: `car`
  - Datasource: `db (memory)`
  - Base class: `PersistedModel`
  - Expose via REST: `Yes`
  - Custom plural form: *Leave blank*
  - Properties
    - `make`
      - String
      - Not required
    - `model`
      - String
      - Not required

```
$ slc loopback:model car
... # follow the prompts
```

### Define a remote method

Define a [remote method in `car.js`](https://github.com/strongloop/loopback-example-app-logic/blob/master/common/models/car.js#L2-L13).

> The remote method takes a "sound" and repeats it three times.

Test it by starting the server (using `node .`) and running `curl -XPOST localhost:3000/api/cars/rev-engine -H 'content-type:application/json' -d '{"sound":"vroom"}'`.

>If you are using Windows, single quotes are treated as backticks in `cmd`. This means you will have to modify the `curl` command to use and escape double quotes instead: `curl -XPOST localhost:3000/api/cars/rev-engine -H "content-type:application/json" -d "{\"sound\":\"vroom\"}"`.

You should see:

```
...
{"engineSound":"vroom vroom vroom"}
```

### Define a remote method before hook

Define a [remote method before hook in `car.js`](https://github.com/strongloop/loopback-example-app-logic/blob/master/common/models/car.js#L15-L19).

> The second parameter `unused` must be provided for legacy reasons. You may simply ignore it, but you must declare it to ensure `next` is the third parameter. This is a side effect of inheriting from the [`jugglingdb`](https://github.com/1602/jugglingdb) library.

> `context` contains the [Express](http://expressjs.com/) request and response objects (ie. `context.req` and `context.res`).

This method is triggered right before `revEngine` is called and prints a message to the console.

Restart the server.

```
$ ./bin/remote-method-request
```

You should see:

```
...
Putting in the car key, starting the engine.
```

### Define a remote method after hook

Define a [remote method after hook in `car.js`](https://github.com/strongloop/loopback-example-app-logic/blob/master/common/models/car.js#L21-L25).

This method is triggered after `revEngine` finishes execution and prints a message to the console.

Restart the server.

```
$ ./bin/remote-method-request
```

You should see:

```
...
Turning off the engine, removing the key.
```

### Create a boot script

Create [`print-models.js`](https://github.com/strongloop/loopback-example-app-logic/blob/master/server/boot/print-models.js) in the [`boot` directory](/server/boot).

> NOTE: The [`app` argument](https://github.com/strongloop/loopback-example-app-logic/blob/master/server/boot/print-models.js#L1) is provided by LoopBack. You can use it to access the application context, which is required when you want to retrieve models, configs, and so on.

#### Asynchronous boot scripts

To use asynchronous boot scripts, you have to modify [`boot`](https://github.com/strongloop/loopback-example-app-logic/blob/master/examples/async-boot-scripts/server.js#L1) to take  callback. You will also need to provide an additional [`callback` argument](https://github.com/strongloop/loopback-example-app-logic/blob/master/examples/async-boot-script/create-car.js#L1) in your boot scripts.

Restart the server.

In the server output, you should see:

```
...
Models:  [ 'User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'car' ]
...
```

### Define a model operation hook

Define [a model operation hook in `car.js`](https://github.com/strongloop/loopback-example-app-logic/blob/master/common/models/car.js#L27-L35).

Copy the `create-car.js` script to the `server/boot` directory.

```
$ cp examples/async-boot-script/create-car.js server/boot/
```

Restart the server.

You should see:

```
...
About to save a car instance: { make: 'honda', model: 'civic' }
A `car` instance has been created from a boot script: { make: 'honda', model: 'civic', id: 1 }
...
```

This model operation hook is triggered **before** saving any `car` model instance.

> Many other operation hooks are available, such as `access`, `before save`, `after save`, `before delete`, and `after delete`. See the [model operation hooks documentation](http://docs.strongloop.com/display/public/LB/Operation+hooks) for more information.

### Add pre-processing middleware

Create the [`middleware` directory](/server/middleware) to store middleware
files.

```
$ mkdir server/middleware
```

Create the [`tracker` middleware](https://github.com/strongloop/loopback-example-app-logic/blob/master/server/middleware/tracker.js) to respond with
the request processing time.

Register the `tracker` middleware in [`middleware.json`](https://github.com/strongloop/loopback-example-app-logic/blob/master/server/middleware.json#L7).

> We register `tracker` in the `initial` phase because we want it configured before other middleware. See the [official middleware phases documentation](http://docs.strongloop.com/display/LB/Defining+middleware#Definingmiddleware-Middlewarephases).

Restart the server.

```
$ ./bin/remote-method-request
```

You should see:

```
...
The request processing time is 28.472051 ms.
```

> Your time will be different.

### Add post-processing middleware

Create the [`datetime` middleware](https://github.com/strongloop/loopback-example-app-logic/blob/master/server/middleware/datetime.js), which responds with the current date and time when a request is made to [`localhost:3000/datetime`](http://localhost:3000/datetime).

Register the `datetime` middleware in [`middleware.json`](https://github.com/strongloop/loopback-example-app-logic/blob/master/server/middleware.json#L19-L21).

[Create a shell script](https://github.com/strongloop/loopback-example-app-logic/blob/master/bin/datetime-request) to test the middleware.

Restart the server.

```
$ ./bin/datetime-request
```

You should see:

```
...
{"started":"2015-01-14T22:54:35.708Z","uptime":3.494}
```

> Your date and time will be different.

### Add an email connector

How do you send email?

1. Configure an [email datasource](https://github.com/strongloop/loopback-example-app-logic/blob/master/server/datasources.json#L6-L21)
2. Map the built-in `Email` model to the [the email datasource](https://github.com/strongloop/loopback-example-app-logic/blob/master/server/model-config.json#L33-L35)
3. Send an email using the [configured model](https://github.com/strongloop/loopback-example-app-logic/blob/master/server/boot/send-email.js#L6-L16)

Notes:

- This example contains a boot script that sends an email every time you start the application.
- Be sure to use **YOUR** email configurations in [`datasources.json`](https://github.com/strongloop/loopback-example-app-logic/blob/master/server/datasources.json#L18-L19)
- You will need to [configure `boot()` in `server.js` to take a callback](https://github.com/strongloop/loopback-example-app-logic/blob/master/server/server.js#L8) for the application to start up properly because we use an [asynchronous boot script](https://github.com/strongloop/loopback-example-email/blob/master/server/boot/send-email.js#L3) for this example

---

[More LoopBack examples](https://github.com/strongloop/loopback-example)
