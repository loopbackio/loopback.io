---
title: "Extend your API"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Extend-your-API.html
summary: In LoopBack, a Node function attached to a custom REST endpoint is called a <i>remote method</i>.
---

{% include content/gs-prereqs.html lang=page.lang %}
 
In this section you're going to add a custom remote method to your API.

{% include note.html content="
If you followed the previous steps in the tutorial, skip down to [Add a remote method](#add-a-remote-method)

If you're just jumping in, follow the steps below to catch up...
" %}

Get the app (in the state following the last article) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout step2
$ npm install
```

## Add a remote method

Follow these steps:

1.  Look in your application's `/common/models` directory.  You'll notice there are `coffee-shop.js` and `coffee-shop.json` files there.  

{% include important.html content="
The LoopBack [model generator](Model-generator.html), automatically converts camel-case model names (for example MyModel) to lowercase dashed names (my-model).  For example, if you create a model named \"FooBar\" with the model generator, it creates files `foo-bar.json` and `foo-bar.js` in `common/models`.  However, the model name (\"FooBar\") will be preserved via the model's name property.
" %}

2.  Open `coffee-shop.js` in your favorite editor.  By default, it contains an empty function: 

    ```js
    module.exports = function(CoffeeShop) {};
    ```

3.  Add the following code to this function to extend the model's behavior with a remote method, so it looks as shown here:

    ```js
    module.exports = function(CoffeeShop) {
      CoffeeShop.status = function(cb) {
        var currentDate = new Date();
        var currentHour = currentDate.getHours();
        var OPEN_HOUR = 6;
        var CLOSE_HOUR = 20;
        console.log('Current hour is %d', currentHour);
        var response;
        if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
          response = 'We are open for business.';
        } else {
          response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
        }
        cb(null, response);
      };
      CoffeeShop.remoteMethod(
        'status', {
          http: {
            path: '/status',
            verb: 'get'
          },
          returns: {
            arg: 'status',
            type: 'string'
          }
        }
      );
    };
    ```

    This defines a simple remote method called "status" that takes no arguments, and checks the time and returns a JSON status message that says either "Open for business" or "Sorry we are closed", depending on the current time.

    Of course, in practice you can do much more interesting and complex things with remote methods such as manipulating input data before persisting it to a database.  You can also change the route where you call the remote method, and define complex arguments and return values.  See [Remote methods](Remote-methods) for all the details.

4.  Save the file.

{% include note.html content="
If you don't want to expose a remote method to everyone, it's easy to constrain access to it using access control lists (ACLs). See [Adding ACLs to remote methods](Remote-methods#adding-acls-to-remote-methods).
" %}

## Try the remote method

1.  Back in the application root directory, run the app: 

    `$ node .`

2.  Go to [http://localhost:3000/explorer](http://localhost:3000/explorer) to see API Explorer.  Then click on CoffeeShops and you'll see there is a new REST endpoint, `GET/CoffeeShop/status` that calls the remote method.
    {% include image.html file="5570643.png" alt="" %} 

3.  Click **Try it Out!**
    You'll see the result of calling your remote method :
    ```js
    {
      "status": "Open for business."
    }
    ```

That's how easy it is to add remote methods with LoopBack! 

For more information, see [Remote methods](Remote-methods).

## Executing create, retrieve, update, and delete methods in a remote method

The `status` remote method is trivial, but a remote method can also access any of the standard model create, retrieve, update, and delete methods to perform data processes and validation.  Here is a simple example (this is not in the `loopback-getting-started` repository):

```js
module.exports = function(CoffeeShop) {
...
  CoffeeShop.getName = function(shopId, cb) {
    CoffeeShop.findById( shopId, function (err, instance) {
        var response = "Name of coffee shop is " + instance.name;
        cb(null, response);
        console.log(response);
    });
  }
...
  CoffeeShop.remoteMethod (
        'getName',
        {
          http: {path: '/getname', verb: 'get'},
          accepts: {arg: 'id', type: 'number', required: true, http: { source: 'query' } },
          returns: {arg: 'name', type: 'string'}
        }
    );
}
```

Then, if you access the remote method at, for example:

`http://0.0.0.0:3000/api/CoffeeShops/getname?id=1`

You'll get the response:

```js
{
  "name": "Name of coffee shop is Bel Cafe"
}
```

{% include next.html content="In [Add a static web page](Add-a-static-web-page.html), you'll add Express middleware to serve static client assets such as HTML/CSS, images, and JavaScript. "
%}
