---
title: "Running LoopBack in the browser"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Running-LoopBack-in-the-browser.html
summary:
---

In the browser, the main application file must call the function exported by the `loopback-boot` module to setup the LoopBack application by executing the instructions contained in the browser bundle:

{% include code-caption.html content="browser-app.js" %}
```javascript
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
boot(app);
```

The app object created above can be accessed via `require('loopback-app')`, where `loopback-app` is the identifier used for the main app file in the Browserify build shown above.

Here is a simple example demonstrating the concept:

{% include code-caption.html content="index.html" %}
```javascript
<script src="app.bundle.js"> </script> 
<script> 
  var app = require('loopback-app'); 
  var User = app.models.User;
  User.login({
    email: 'test@example.com',
    password: '12345'
  }, function(err, res) {
    if (err) {
      console.error('Login failed: ', err);
    } else {
      console.log('Logged in.');
    }
  });
</script>
```