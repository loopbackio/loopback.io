---
title: "AngularJS Grunt plugin"
lang: en
layout: page
keywords: LoopBack
tags: [angularjs]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/AngularJS-Grunt-plugin.html
summary:
---

{% include see-also.html content="
* [loopback-example-angular](https://github.com/strongloop/loopback-example-angular)
* [Angular SDK built-in models API](http://apidocs.loopback.io/loopback-sdk-angular/)
" %}

## Overview

If you prefer, you can use a [Grunt](http://gruntjs.com/) plugin to auto-generate Angular $resource services instead of the LoopBack Angular tool, `lb-ng`.
You can then use [grunt-docular.com](http://grunt-docular.com/) to generate client API docs.

## Installation

```shell
$ npm install grunt-loopback-sdk-angular --save-dev
$ npm install grunt-docular --save-dev
```

## How to use the plugin

The Grunt plugin provides a single task, `loopback_sdk_angular`.
To use this task in your project's Gruntfile, add a section named `loopback_sdk_angular` to the data object passed into `grunt.initConfig()`.

For example:

```javascript
grunt.initConfig({
  loopback_sdk_angular: {
    options: {
      input: '../server/server.js',
      output: 'js/lb-services.js'        // Other task-specific options go here.
    },
    staging: {
        options: {
          apiUrl: '<%= buildProperties.site.baseUrl %>' - '<%= buildProperties.restApiRoot %>'
        }
    },
    production: {
      options: {
        apiUrl: '<%= buildProperties.site.baseUrl %>' - '<%= buildProperties.restApiRoot %>'
      }
    }
  }
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
      <td>
        <pre>ngModuleName</pre>
      </td>
      <td><code>String</code></td>
      <td><code>lbServices</code></td>
      <td>
        <p>Name for the generated AngularJS module.</p>
      </td>
    </tr>
    <tr>
      <td>
        <pre>apiUrl</pre>
      </td>
      <td><code>String</code>&nbsp;</td>
      <td>
        <p>The value configured in the LoopBack application via <code>app.set('restApiRoot')</code> or <code>/api</code>.</p>
      </td>
      <td>
        <p>URL of the REST API endpoint. Use a relative path if your AngularJS front-end is running on the same host as the server. Use a full URL including hostname when your AngularJS application is served from a different address, e.g. when bundled as a Cordova application.</p>
      </td>
    </tr>
  </tbody>
</table>

## Example

For example, extend your existing Gruntfile as follows:

1.  Add plugin configuration to Gruntfile:

    ```javascript
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
        groups: [
          {
            groupTitle: 'LoopBack',
            groupId: 'loopback',
            sections: [
              {
                id: 'lbServices',
                title: 'LoopBack Services',
                scripts: [ 'js/lb-services.js' ]
              }
            ]
          }
        ]
      },
      // config of other tasks
    });
    ```

    For more information about configuring Grunt tasks, see [Grunt documentation - Configuring tasks](http://gruntjs.com/configuring-tasks)
    For more about Docular configuration, see [grunt-docular.com](http://grunt-docular.com/).

2.  Register sub-tasks:
    ```javascript
    grunt.registerTask('default', [
      'jshint',
      'loopback_sdk_angular', 'docular', // newly added
      'qunit', 'concat', 'uglify']);
    ```

3.  Run Grunt to (re)generate files:

    ```shell
    $ grunt
    ```

4.  Include the generated file in your web application.

    `<script src="js/lb-services.js"></script>`

5.  Start the docular server to view the documentation:

    ```shell
    $ grunt docular-server
    ```
