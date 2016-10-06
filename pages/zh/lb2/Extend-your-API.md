---
title: "Extend your API"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Extend-your-API.html
summary:
---

{% include important.html content="

**Prerequisite**: Install StrongLoop software as described in [安装 StrongLoop](https://docs.strongloop.com/pages/viewpage.action?pageId=6095101).

**Recommended**: Read [LoopBack 核心概念](https://docs.strongloop.com/pages/viewpage.action?pageId=6095111).

" %} 

In LoopBack, a Node function attached to a custom REST endpoint is called a _remote method_.

In this section you're going to add a custom remote method to your API.

{% include note.html content="

If you followed the previous steps in the tutorial, skip down to [Add a remote method](/doc/zh/lb2/Extend-your-API.html)

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

1.  Look in your application's `/common/models` directory.  You'll notice there is a `coffee-shop.js` file there.  

    {% include note.html content="

    The LoopBack [model generator](/doc/zh/lb2/Model-generator.html) (`slc loopback:model`) always creates two files in `/common/models` for each model: a JSON file named `<_model-name_>.json` describing its properties and a JavaScript file named `<_model-name_>.js` where you can extend and override model behavior.

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
        console.log('Current hour is ' + currentHour);
        var response;
        if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
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

    This defines a simple remote method called "status" that takes no arguments, and checks the time and returns a JSON status message that says either "Open for business" or "Sorry we are closed depending on the current time.

    Of course, in practice you can do much more interesting and complex things with remote methods such as manipulating input data before persisting it to a database.  You can also change the route where you call the remote method, and define complex arguments and return values.  See [远程方法（Remote methods）](/doc/{{page.lang}}/lb2/6095040.html) for all the details.

4.  Save the file.

## Try the remote method

1.  Back in the application root directory, run the app: 

    `$ slc run`

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

For more information, see [远程方法（Remote methods）](/doc/{{page.lang}}/lb2/6095040.html).

Next: In [Add a static web page](/doc/{{page.lang}}/lb2/Add-a-static-web-page.html), you'll add Express middleware to serve static client assets such as HTML/CSS, images, and JavaScript.
