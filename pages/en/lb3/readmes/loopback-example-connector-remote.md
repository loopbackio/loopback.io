# loopback-example-connector (remote)

This is a very simple example of using the LoopBack [remote connector](http://loopback.io/doc/en/lb3/Remote-connector.html), [loopback-connector-remote](https://github.com/strongloop/loopback-connector-remote).

## Overview

The example has the following structure:

* `server`: A LoopBack application that connects to a backend data source (just the in-memory data source here) and provides a CRUD API (both Node and REST) to interact with the data source.  
* `client`: A Node application that connects to the LoopBack server application using the [remote connector](https://github.com/strongloop/loopback-connector-remote).  This acts as a very simple Node client SDK for LoopBack.
* `common/models`: Model definitions shared between client and server applications.  Using a shared model definition ensures that client and server expect the same model structures.  This simple example defines only
one model: `Person`, with a single property, `name`.
* `examples`: Contains examples of using the Node SDK in `client` to connect to the server API.
 * `create.js`: A simple example script that creates a new Person record (instance).

## How to run the examples

**Clone the repo**

```
$ git clone https://github.com/strongloop/loopback-example-connector.git
$ cd loopback-example-connector
$ git checkout remote
```

**Starting the Server**

Initially, you need to run `npm install` to install all the dependencies for both client and server.   
Then, start the server application.

```
$ cd client
$ npm install
$ cd ../server
$ npm install
$ node . 
```

**Basic CRUD Example**

Now in another shell, run an example that uses the client "SDK."

```
$ node examples/create.js
Created Person...
{ name: 'Fred', id: 1 }
```

Now open LoopBack Explorer at http://0.0.0.0:3001/explorer/.  This provides a view into the server application REST API. 

Go to http://0.0.0.0:3001/explorer/#!/People/find to expand the `GET /People` operation.
Then click **Try it!**.

In **Response Body**, you will see the record that `create.js` created via the Node client SDK:

```
[
  {
    "name": "Fred",
    "id": 1
  }
]
```

**Auth Example**

This example demonstrates the following basic tasks (using the remote connector):

 - Registering a user 
 - Logging in as a user
 - Defining a custom remote method
 - Securing access to custom methods

After running the server, you can run the `examples/auth.js` example in a 
separate shell.

```
$ node examples/auth.js
Got error (Authorization Required) when trying to call method without auth
Registered a user
Logged in as foo@bar.com
Set access token for all future requests. (MGd...JMA==)
Called a custom method (myMethod) as a logged in user
Logged out and unset the acces token for future invocations
Got error (Authorization Required) when trying to call method without auth
```

