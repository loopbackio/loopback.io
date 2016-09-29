---
title: "LoopBack example app extra material"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/LoopBack-example-app-extra-material.html
summary:
---

## Overview

LoopBack example app is a mobile app for i-Cars, an (imaginary) car rental dealer with outlets in major cities around the world.

The application enables customers to find the closest available cars using the i-Car app on a smartphone.  The app shows a map of nearby rental locations and lists available cars in the area shown on the map. In addition, the customer can filter the list of cars by make, model, class, year and color.  The customer can then select the desired car and reserve it via the app. If not logged in the app prompts the customer to login or register. The app indicates if the desired car is available and if so, confirms the reservation.

Note that the example app is the backend functionality only; that is, the app has a REST API, but no client app or UI to consume the interface.

### Prerequisites

{% include important.html content="

You must first install StrongLoop software as described in [LoopBack初级教程](/doc/{{page.lang}}/lb2/6095006.html).

If you don't have a C compiler installed, you will see error messages when you create or run the example application.  You'll still be able to run it, but you won't be able to connect to Oracle or view certain strong agent metrics.  See [Installing compiler tools](https://docs.strongloop.com/display/SL/Installing+compiler+tools) for more information.

" %}

### Creating the example app

You can create the LoopBack example app:

*   By cloning it from GitHub: 

    ```
    $ git clone https://github.com/strongloop/loopback-example-app.git
    $ cd loopback-example-app
    $ npm install
    ```

*   By using `slc loopback:example`, as described below.   This is the [Example generator](/doc/{{page.lang}}/lb2/Example-generator.html) that uses [Yeoman](http://yeoman.io/) under the hood.

### Creating the example app using slc

Follow these steps:

1.  Create the example app with this command:

    `$ slc loopback:example`

    You'll be prompted for the name of the directory in which to create the application.  The default is the current directory.

    `[?] Enter a directory name where to create the project: (.) my-lb-example`

    For example, suppose you create the app in `my-lb-example`.

2.  Run the example application by entering these commands: 

    ```
    $ cd my-lb-example
    $ slc run
    ```

3.  To view the application in a browser, load [http://localhost:3000](http://localhost:3000/). The homepage (illustrated below) lists sample requests you can make against the LoopBack REST API. Click the GET buttons to see the JSON data returned.  You can also see the API explorer at [http://localhost:3000/explorer](http://localhost:3000/explorer).
    {% include image.html file="6258769.png" alt="" %} 

## Connecting to other data sources

By default, the LoopBack example app connects to the in-memory data source.  To connect to other data sources, use the following command to run the application:

`$ DB=<datasource> slc run`

where `<datasource>` is either "mongodb", "mysql", or "oracle".  The example app will connect to the specified database running on [demo.strongloop.com](http://demo.strongloop.com/).

## Using the API Explorer

Follow these steps to explore the example app's REST API:

1.  Open your browser to [http://localhost:3000/explorer](http://localhost:3000/explorer). You'll see a list of REST API endpoints as illustrated below. 
    {% include image.html file="6258775.png" alt="" %}

    The endpoints are grouped by the model names. Each endpoint consists of a list of operations for the model.
2.  Click on one of the endpoint paths (such as /locations) to see available operations for a given model. You'll see the CRUD operations mapped to HTTP verbs and paths. 
    {% include image.html file="6258772.png" alt="" %}

3.  Click on a given operation to see the signature; for example, as shown below for `GET /locations/{id}`. Notice that each operation has the HTTP verb, path, description, response model, and a list of request parameters.
     {% include image.html file="6258771.png" alt="" %}
4.  Now, invoke the GET locations operation: click the **Try it out!** button.  Just leave the filter field blank, to get all the locations.  You'll see something like this:
    {% include image.html file="6258774.png" alt="" %} 

You can see the request URL, the JSON in the response body, and the HTTP response code and headers.
