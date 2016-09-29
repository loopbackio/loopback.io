---
title: "AngularJS Grunt plugin"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/AngularJS-Grunt-plugin.html
summary:
---

## Overview

If you prefer, you can use a [Grunt](http://gruntjs.com/) plugin to auto-generate Angular $resource services instead of the LoopBack Angular tool, `lb-ng`.   You can then use [grunt-docular.com](http://grunt-docular.com/) to generate client API docs.

## Installation

```
$ npm install grunt-loopback-sdk-angular --save-dev
$ npm install grunt-docular --save-dev
```

## How to use the plugin

The Grunt plugin provides a single task, `loopback_sdk_angular`. To use this task in your project's Gruntfile, add a section named `loopback_sdk_angular` to the data object passed into `grunt.initConfig()`.  

```js
grunt.initConfig({
  loopback_sdk_angular: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      options: {  // Target-specific options go here.
         }
    },
  },
});
```

### Options

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>
        <p>Description</p>
      </th>
    </tr>
    <tr>
      <td><code>input</code></td>
      <td><code>String</code></td>
      <td>&nbsp;</td>
      <td>
        <p>Path to the main file of your LoopBack server (usually <code>server.js</code>).</p>
      </td>
    </tr>
    <tr>
      <td><code>output</code></td>
      <td><code>String</code></td>
      <td>&nbsp;</td>
      <td>
        <p>Path to the services file you want to generate, e.g. <code>js/lb-service.js</code>.</p>
      </td>
    </tr>
    <tr>
      <td><pre>ngModuleName</pre></td>
      <td><code>String</code></td>
      <td><code>lbServices</code></td>
      <td>
        <p>Name for the generated AngularJS module.</p>
      </td>
    </tr>
    <tr>
      <td><pre>apiUrl</pre></td>
      <td><code>String</code>&nbsp;</td>
      <td>
        <p>The value configured in the LoopBack application via <code>app.set('restApiRoot')</code> or <code>/api</code>.</p>
      </td>
      <td>
        <p>URL of the REST API endpoint. Use a relative path if your AngularJS front-end is running on the same host as the server. Use a full URL including hostname when your AngularJS application is served from a different address, e.g. when bundled as
          a Cordova application.</p>
      </td>
    </tr>
  </tbody>
</table>

## Example

For example, extend your existing Gruntfile as follows:

1.  Add plugin configuration to Gruntfile:

    ```js
    grunt.loadNpmTasks('grunt-loopback-sdk-angular');
    grunt.loadNpmTasks('grunt-docular');

    grunt.initConfig({
      loopback_sdk_angular: {
        services: {
          options: {
            input: '../server/server.js',
            output: 'js/lb-services.js'
          }
        }
      },
      docular: {
        groups: [{
          groupTitle: 'LoopBack',
          groupId: 'loopback',
          sections: [{
            id: 'lbServices',
            title: 'LoopBack Services',
            scripts: ['js/lb-services.js']
          }]
        }]
      },
      // config of other tasks
    });
    ```

    Visit [grunt-docular.com](http://grunt-docular.com/) to learn more about the Docular configuration.

2.  Register sub-tasks:

    ```js
    grunt.registerTask('default', [
      'jshint',
      'loopback_sdk_angular', 'docular', // newly added
      'qunit', 'concat', 'uglify'
    ]);
    ```

3.  Run Grunt to (re)generate files:

    `$ grunt`

4.  Include the generated file in your web application.

    `<script src="js/lb-services.js"></script>`

5.  Start the docular server to view the documentation:

    `$ grunt docular-server`

<div class="sl-hidden"><strong>Non-public Information</strong><br>
  <p>The&nbsp;<a class="external-link" href="https://github.com/strongloop/loopback-example-full-stack" rel="nofollow">LoopBack Full Stack example application</a>&nbsp;provides an example of using AngularJS SDK with Loopback. &nbsp;Get the example application
    as follows:</p>
  <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">$ git clone https://github.com/strongloop/loopback-example-full-stack.git
$ cd loopback-example-full-stack/server
$ npm install grunt-docular
$ npm install</pre></div>
  </div>
  <p>Now run the gruntfile:</p>
  <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">$ grunt</pre></div>
  </div>
  <p>You'll see some output. In particular, note:</p>
  <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">&gt;&gt; Generated Angular services file "../client/js/lb-services.js"</pre></div>
  </div>
  <p>This is the client JavaScript file that has the AngularJS services.</p>
  <p>Run the example as follows:</p>
  <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">$ slc run</pre></div>
  </div>
  <p>The app's home screen looks as shown below. it's a very simple banking app. You can also view the API explorer at <a href="http://0.0.0.0:3000/explorer.å" class="external-link" rel="nofollow">http://0.0.0.0:3000/explorer.å</a></p>
  <p><img class="confluence-embedded-image confluence-external-resource" src="http://docs.strongloop.com/download/attachments/3836213/angular1.png?version=1&amp;modificationDate=1405990842000&amp;api=v2" data-image-src="http://docs.strongloop.com/download/attachments/3836213/angular1.png?version=1&amp;modificationDate=1405990842000&amp;api=v2"></p>
</div>
