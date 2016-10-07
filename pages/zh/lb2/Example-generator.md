---
title: "Example generator"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Example-generator.html
summary:
---

The LoopBack example generator  (technically, sub-generator) creates a LoopBack example application.

`$ slc loopback:example`

Use the `-l` option to list the operations performed.

{% include important.html content="

To connect to a relational or NoSQL database (not just the in-memory connector), you need a correctly configured build environment to install native Node modules. For more information, see [Installing compiler tools](https://docs.strongloop.com/display/SL/Installing+compiler+tools).

" %}

## About the sample app

The StrongLoop sample is a mobile app for i-Cars, an (imaginary) car rental dealer with outlets in major cities around the world.

The application enables customers to find the closest available cars using the i-Car app on a smartphone.  The app shows a map of nearby rental locations and lists available cars in the area shown on the map. In addition, the customer can filter the list of cars by make, model, class, year and color.  The customer can then select the desired car and reserve it via the app. If not logged in the app prompts the customer to login or register. The app indicates if the desired car is available and if so, confirms the reservation.

Note that the sample app is the backend functionality only; that is, the app has a REST API, but no client app or UI to consume the interface.

Explore the sample app REST API at [http://localhost:3000/explorer](http://localhost:3000/explorer).  See [使用API浏览器](/doc/{{page.lang}}/lb2/6095009.html) for more information. 

For more details on the sample app, see [StrongLoop sls-sample-app](https://github.com/strongloop/sls-sample-app) in GitHub.

### Connecting to other data sources

By default, the LoopBack sample app connects to the in-memory data source.  To connect to other data sources, use the following command to run the application:

`$ DB=_datasource_ node app`

where _datasource_ is either "mongodb", "mysql", or "oracle".  The sample app will connect to database servers running on [demo.strongloop.com](http://demo.strongloop.com/).
