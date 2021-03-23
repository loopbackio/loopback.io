---
title: "Generating Angular API docs"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Generating-Angular-API-docs.html
summary:
---

{% include warning.html content="
This  tool was removed from the SDK.
" %}

To generate API documentation for the Angular services, enter this command:

```shell
$ lb-ng-doc js/lb-services.js
```

The auto-generated source includes ngdoc directives describing all API methods.
The comments include as much information from the model definition as possible.
For example, the `description` property is copied to the comment, the `accepts` property is converted to a list of input parameters.

Use your favourite `ngdoc` tool to view this documentation; for example, [docular](http://grunt-docular.com/).

### Example

See the [loopback-example-angular](https://github.com/strongloop/loopback-example-angular) 
for a complete application with a LoopBack server application and an AngularJS client app.

Add the following Gruntfile in the application root directory:

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    loopback_sdk_angular: {
      services: {
        options: {
          input: 'server/server.js',
          output: 'client/js/lb-services.js'
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
          scripts: ['client/js/lb-services.js']
        }]
      }]
    }
  });

  // Load the plugin that provides the "loopback-sdk-angular" and "grunt-docular" tasks.
  grunt.loadNpmTasks('grunt-loopback-sdk-angular');
  grunt.loadNpmTasks('grunt-docular');
  // Default task(s).
  grunt.registerTask('default', ['loopback_sdk_angular', 'docular']);
};
```

Run the gruntfile as follows:

```shell
$ cd <app-dir>
$ grunt
Running "loopback_sdk_angular:services" (loopback_sdk_angular) task
...
```

This generates the file `client/js/lb-services.js`. Now, run the application:

```shell
$ node .
```
