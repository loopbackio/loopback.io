---
title: "Xamarin example app"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Xamarin-example-app.html
summary:
---

{% include note.html content="

This article is reproduced from [loopback-example-xamarin](https://github.com/strongloop/loopback-example-xamarin)

" %}

# LoopBack Xamarin SDK example application

This repository contains a mobile app that demonstrates the Loopback Xamarin SDK. It contains:

* `Server` directory: Loopback server application.
* `Client` directory: The ToDo client app, created in Xamarin Studio with Xamarin Forms for iOS.

## Prerequisites

* Install [Xamarin Studio](http://xamarin.com/studio). **NOTE**: You must get the full Studio (trial) license, not just the "starter" license.
* Install [Xamarin Forms](http://xamarin.com/forms)
* Install [LoopBack](http://loopback.io/)

## Download

```shell
$ git clone https://github.com/strongloop/loopback-example-xamarin.git
```

## Run the server app

You can either run the LoopBack server app yourself, or connect to the demo app running at [http://xamarindemo.strongloop.com](http://xamarindemo.strongloop.com/).

### Run your own server app

1.  Go to server folder:
    ```shell
    $ cd server
    ```
2.  Install dependencies:
    ```shell
    $ npm install
    ```
3.  Run the application:
    ```shell
    $ node .
    ```

### Use StrongLoop's server app

Alternatively, you can run the Xamarin client app against [http://xamarindemo.strongloop.com](http://xamarindemo.strongloop.com/).

Edit [LBXamarinSDK.cs](https://github.com/strongloop/loopback-example-xamarin/blob/master/Client/Todo%20App/TodoApp/TodoApp/LBXamarinSDK.cs)
and change BASE_URL to `http://xamarindemo.strongloop.com/api`.

## Run the client app

Open the client app solution with Xamarin Studio: `loopback-example-xamarin/Client/Todo App/TodoApp.sln`.

In Xamarin Studio, build and run the app:

{% include image.html file="https://raw.githubusercontent.com/strongloop/loopback-example-xamarin/master/images/xamarin-build-app.png" alt="Xamarin demo - build app" %}

The iOS Simulator will appear running the client app. It may take a moment or two.

{% include image.html file="https://raw.githubusercontent.com/strongloop/loopback-example-xamarin/master/images/xamarin-login.png" alt="Xamarin demo app login" %}

In the iOS Simulator:

1.  The first time you run the app, click **Sign Up**:

    * Enter an email address and password (they are not validated).
    * Click **Sign Up**
    * If you already signed up in this session, click **Login** with the credentials you entered previously.

1.  You'll see the app home page:
    {% include image.html file="https://raw.githubusercontent.com/strongloop/loopback-example-xamarin/master/images/xamarin-todo-app.png" alt="Xamarin demo app home page" %}

2.  Enter a "To Do" item:
    {% include image.html file="https://raw.githubusercontent.com/strongloop/loopback-example-xamarin/master/images/xamarin-add-todo-item.png" alt="Xamarin demo - adding a To Do item" %}

    * Click **-**
    * Click **Add a task - **
    * Enter a description of the task in the top (red) text field
    * Change the date, time, category and mark as a favorite if you wish.
    * Click **Create** to add the item.

You'll see the item appear in the "To Do" list.

{% include image.html file="https://raw.githubusercontent.com/strongloop/loopback-example-xamarin/master/images/xamarin-todo-added.png" alt="Xamarin demo app - To Do item added" %}

You can confirm that the data is also added to the LoopBack model using LoopBack API Explorer.

### Links

* [LoopBack](http://loopback.io/)
* [Perfected Tech](http://perfectedtech.com/)
* [Xamarin Studio](http://xamarin.com/)

* * *

[More LoopBack examples](https://github.com/strongloop/loopback-example)