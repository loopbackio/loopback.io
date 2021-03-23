---
title: "Building a real-time app using socket.io and AngularJS"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Realtime-socket-io.html
summary:
---

[Angular LiveSet](https://github.com/strongloop/angular-live-set) is the preferred way to create to create real-time apps for LoopBack.

For an introduction, see [Build Real-Time Node.js Apps with Angular LiveSet and LoopBack](https://strongloop.com/strongblog/build-real-time-apps-with-angular-liveset-and-loopback/).


This tutorial describes how you can build a LoopBack server with the capability to "push" live updates to connected AngularJS clients.

## Installing Socket.io

First, install [Socket.IO](http://socket.io/) as follows:

```js
$ npm install socket.io
```

Now install [socketio-auth](https://github.com/invisiblejs/socketio-auth) for making authenticated requests:

```js
$ npm install socketio-auth
```

## Configuring Socket.io

### On the server

```js
if (require.main === module) {
  //Comment this app.start line and add following lines
  //app.start();
  app.io = require('socket.io')(app.start());
  require('socketio-auth')(app.io, {
    authenticate: function (socket, value, callback) {

        var AccessToken = app.models.AccessToken;
        //get credentials sent by the client
        var token = AccessToken.find({
          where:{
            and: [{ userId: value.userId }, { id: value.id }]
          }
        }, function(err, tokenDetail){
          if (err) throw err;
          if(tokenDetail.length){
            callback(null, true);
          } else {
            callback(null, false);
          }
        }); //find function..    
      } //authenticate function..
  });

  app.io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
  });
}
```

### On the client

Now in `index.html` add the following snippet before the `</body>` tag:

```html
<script src="/socket.io/socket.io.js"></script>
```

{% include note.html content="You must have AngularJS to follow rest of this article.
" %}

{% include code-caption.html content="socket.js" %}

```js
'use strict';
angular.module('LoopbackSocketIntegration')

//Here LoopBackAuth service must be provided as argument for authenticating the user
.factory('socket', function(LoopBackAuth){
    //Creating connection with server
    var socket = io.connect('http://localhost:3000');

    //This part is only for login users for authenticated socket connection between client and server.
    //If you are not using login page in you website then you should remove rest piece of code..
    var id = LoopBackAuth.accessTokenId;
    var userId = LoopBackAuth.currentUserId;
    socket.on('connect', function(){
        socket.emit('authentication', {id: id, userId: userId });
        socket.on('authenticated', function() {
            // use the socket as usual
            console.log('User is authenticated');
        });
    });
  return socket;

});
```

## Writing publish and subscribe module

### On the server

Now create modules both on the server and client to push data from the server to support live updates.Create a file named `server/pubsub.js`. Add the following code to define a publish function:

{% include code-caption.html content="server/pubsub.js" %}

```js
'use strict';
//Writing pubsub module for socket.io
module.exports = {
    //Publishing a event..
    publish: function(socket, options ){
        if(options){
            var collectionName = options.collectionName;
            var method         = options.method;
            var data           = options.data;
            var modelId        = options.modelId;
            if(method === 'POST'){
                //console.log('Posting new data');
                var name = '/' + collectionName + '/' + method;
                socket.emit(name, data);
            }
            else{
                var name = '/' + collectionName + '/' + modelId + '/' + method;
                socket.emit(name, data);
            }  
        }else{
            throw 'Error: Option must be an object type';
        }
    }, //End Publish..

    isEmpty:function (obj) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        // null and undefined are "empty"
        if (obj == null) return true;
        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;
        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (this.hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    } //isEmpty function..
}
```

### On the client

On the client side, define a subscribe function as follows:

{% include code-caption.html content="pubsub.js" %}

```js
'use strict';
angular.module('LoopbackSocketIntegration')
.factory('PubSub', function (socket) {
    var container =  [];
    return {
        subscribe: function(options, callback){
            if(options){
                var collectionName = options.collectionName;
                var modelId = options.modelId;
                var method = options.method;
                if(method === 'POST'){
                    var name = '/' + collectionName + '/' + method;
                    socket.on(name, callback);
                }
                else{
                    var name = '/' + collectionName + '/' + modelId + '/' + method;
                    socket.on(name, callback);
                }
                //Push the container..
                this.pushContainer(name);
            }else{
                throw 'Error: Option must be an object';
            }
        }, //end subscribe

        pushContainer : function(subscriptionName){
            container.push(subscriptionName);
        },

        //Unsubscribe all containers..
        unSubscribeAll: function(){
            for(var i=0; i<container.length; i++){
                socket.removeAllListeners(container[i]);   
            }
            //Now reset the container..
            container = [];
        }

    };
});
```

## Defining the route for safe unsubscribing

{% include note.html content=" Here **angular-ui ui-router** module is used for defining of routes as it supports [onExit](https://github.com/angular-ui/ui-router/wiki) function.
" %}

{% include code-caption.html content="app.js" %}

```js
'use strict';
var app = angular.module('LoopbackSocketIntegration', ['lbServices', 'ui-router' ]);

.config(function ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginControl',
        //Here unsubscribe function must be called to unsubcribe all events on state change
        onExit: unSubscribeAll
    })

    .state('orders', {
        url: '/',
        templateUrl: 'views/orders.html',
        controller: 'OrdersPage',
        //Here unsubscribe function must be called to unsubcribe all events on state change
        onExit: unSubscribeAll
    });
});


//Function for unsubscribing..
var unSubscribeAll = function(PubSub){
    //Unsubscribe all listeners..
    PubSub.unSubscribeAll();
}
```

## Subscribing to models

Always subscribe to models when they are fetched.

Define three different types of subscriptions for each collection with a callback function called based on the HTTP method invoked:

1.  PUT -> `onModelUpdate()`
2.  POST -> `onModelCreate()`
3.  DELETE -> `onModelDelete()`

Suppose there is an **Order** **model**.

{% include code-caption.html content="orders.js" %}

```js
'use strict';
angular.module('LoopbackSocketIntegration')

.controller('OrdersPage', function(PubSub, Order){
        Order.find({}, function(orderList,  httpHeader){
            //Success callback
            //Subscribe to orders methods here..
            PubSub.subscribe({
                collectionName: 'Order',
                method : 'POST'
            }, onOrderCreate);

            for(var i=0; i<orderList.length; i++){
                PubSub.subscribe({
                    collectionName: 'Order',
                    method : 'PUT'
                    modelId : orderList[i].id
                }, onOrderUpdate);  

                PubSub.subscribe({
                    collectionName: 'Order',
                    method : 'DELETE'
                    modelId : orderList[i].id
                }, onOrderDelete);    
            }

        }, //Error
            function(httpResp){
            console.log(httpResp);
        });

        var onOrderCreate = function(){
            //Logic for callback function on new orders
        }

        var onOrderUpdate = function(){
            //Logic for callback function on updated orders
        }

        var onOrderUpdate = function(){
            //Logic for callback function on delete orders
        }
});
```

## Publishing updates on the server

Now finally pushing the data from server to all connected clients that have subscribed to the model for updates.

{% include code-caption.html content="common/models/Order.js" %}

```js
var pubsub = require('../../server/pubsub.js');
var loopback = require('loopback');
module.exports = function(Order) {
    //Order after save..
    Order.observe('after save', function (ctx, next) {
        var socket = Order.app.io;
        if(ctx.isNewInstance){
            //Now publishing the data..
            pubsub.publish(socket, {
                collectionName : 'Order',
                data: ctx.instance,
                method: 'POST'
            });
        }else{
            //Now publishing the data..
            pubsub.publish(socket, {
                collectionName : 'Order',
                data: ctx.instance,
                modelId: ctx.instance.id,
                method: 'PUT'
            });
        }
        //Calling the next middleware..
        next();
    }); //after save..
    //OrderDetail before delete..
    Order.observe("before delete", function(ctx, next){
            var socket = Order.app.io;
            //Now publishing the data..
            pubsub.publish(socket, {
                collectionName : 'Order',
                data: ctx.instance.id,
                modelId: ctx.instance.id,
                method: 'DELETE'
            });
            //move to next middleware..
            next();
    }); //before delete..
}; //Module exports..
```
