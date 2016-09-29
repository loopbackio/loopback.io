---
title: "Sync example app"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Sync-example-app.html
summary:
---

{% include warning.html content="

This feature is in beta. Documentation is still a work in progress. 

" %}

This example application is a simple "To Do" list that illustrates LoopBack synchronization using isomorphic LoopBack.  It is based on the well-known [TodoMVC](http://todomvc.com/) example.

## Prerequisites

You must install the following:

*   Node.js.  See [LoopBack初级教程](/doc/{{page.lang}}/lb2/6095006.html).
*   [Git](http://git-scm.com/downloads) 

*   [MongoDB](http://www.mongodb.org/) - if you want to be able to preserve state between application restarts.

*   The application uses [Grunt](http://gruntjs.com/) to generate the isomorphic client-side JavaScript API.
    If you have not already done so, install Grunt:

    `$ npm install grunt-cli -g`

## Run the application

Follow these steps to build and run the example application. 

1.  Clone the repository and change your current directory:

    ```
    $ git clone https://github.com/strongloop/loopback-example-full-stack.git
    $ cd loopback-example-full-stack
    ```

2.  Install the root package dependencies:

    `$ npm install `

3.  Run Bower to install the client scripts:

    `$ bower install`

4.  **Optional**: If you want to run MongoDB, then:

    `$ mongod`

    <div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>What does this buy you?</div>

    {% include important.html content="

    Make sure you have set the environment variable `NODE_ENV=production`.

    " %}
5.  Build and run the entire project in development mode 

    `$ grunt serve`

6.  Open [`http://localhost:3000`](http://localhost:3000/) in your browser to view the running app.

7.  Click [View your todo list](http://localhost:3000/my/todos) to see the main screen: 
    {% include image.html file="6258816.png" alt="" %} 

## Try it out

First, add a couple of "To Do" items: click [View your todo list](http://localhost:9000/my/todos) then in the "What needs to be done" field enter a short text item and hit RETURN.  

Then you can use the API Explorer to check out the LoopBack API: [http://localhost:3000/explorer/](http://localhost:3000/explorer/).

Follow these steps to see the synchronization API in action.

1.  Create a new todo item.
2.  Find the ID of the todo: In the API explorer, go to [http://localhost:3000/explorer/#!/Todos/Todo_findOne_get_5](http://localhost:3000/explorer/#!/Todos/Todo_findOne_get_5), then click **Try it out!  **You'll see a JSON response that looks something like this:

    ```js
    {
      "id": "t-2562",
      "title": "Spackle the den",
      "completed": false,
      "created": 1404245971346
    }
    ```

3.  Update the To Do item: In the API explorer, go to [http://localhost:3000/explorer/#!/Todos/Todo_upsert_put_1](http://localhost:3000/explorer/#!/Todos/Todo_upsert_put_1).

4.  In the data field, enter JSON such as the following, but change the value of the id field to the value returned in step 2.

    `{"id": "t-2562", "title": "zarflag"}`

    Where the id is the actual ID of the To Do item. 

5.  Make a change in the browser (against the stale local data / without syncing).
6.  The conflict GUI pops up and you can choose how to resolve the conflict.
