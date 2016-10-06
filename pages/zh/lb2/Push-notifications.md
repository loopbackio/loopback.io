---
title: "Push notifications"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Push-notifications.html
summary:
---

<div class="aui-message hint shadowed information-macro has-no-icon">

This is a StrongLoop Labs project

{% include image.html file="6258830.png" alt="" %}

This project provides early access to advanced or experimental functionality. It may lack usability, completeness, documentation, and robustness, and may be outdated.

However, StrongLoop supports this project: Paying customers can open issues using the StrongLoop customer support system (Zendesk). Community users, please report bugs on GitHub. For more information, see [StrongLoop Labs](https://docs.strongloop.com/display/zh/StrongLoop+Labs).

</div>

See also:

*   [API reference](http://apidocs.strongloop.com/loopback-component-push)
*   [Example server application](https://github.com/strongloop/loopback-component-push/tree/master/example/server)
*   [Example iOS app](https://github.com/strongloop/loopback-component-push/tree/master/example/ios)
*   [Example Android app](https://github.com/strongloop/loopback-component-push/tree/master/example/android)

## Overview

Push notifications enable server applications (known as _providers_ in push parlance) to send information to mobile apps even when the app isn’t in use.  The device displays the information using a "badge," alert, or pop up message.  A push notification uses the service provided by the device's operating system:

*   **iOS** - Apple Push Notification service (APNS)
*   **Android** - Google Cloud Messaging (GCM)

The following diagram illustrates how it works.

{% include image.html file="9830527.png" alt="" %}

To send push notifications, you'll need to create a LoopBack server application, then configure your iOS and Android client apps accordingly.  You can either use the example LoopBack push application or create your own. Using the example application is a good way to learn about LoopBack push notifications. 

For more information on the architecture of the LoopBack Push Notification component, see [Architecture](/doc/{{page.lang}}/lb2/Push-notifications.html) below.

## Installation

Install the LoopBack push component as usual for a Node package:

`$ npm install loopback-component-push`

## Use the LoopBack push notification sample application

{% include important.html content="

If you are creating your own LoopBack server application, skip this section and go to [Set up your LoopBack application to send push notifications](/doc/zh/lb2/Push-notifications.html).

" %}

First, download the sample app:

`$ git clone https://github.com/strongloop/loopback-component-push.git`

### Set up messaging credentials for Android apps

First, if you haven't already done so, [get your Google Cloud Messaging (GCM) credentials](/doc/{{page.lang}}/lb2/Push-notifications-for-Android-apps.html#PushnotificationsforAndroidapps-GetyourGoogleCloudMessagingcredentials) for Android apps.  After following the instructions, you will have a GCM API key.  Then edit `example/server/config.js` and look for the line:

`exports.gcmServerApiKey = 'Your-server-api-key';`

Replace `Your-server-api-key` with your GCM server API key.  For example:

`exports.gcmServerApiKey = 'AIzaSyDEPWYN9Dxf3xDOqbQluCwuHsGfK4aJehc';    `

### Set up messaging credentials for iOS apps

If you have not already done so, [create your APNS certificates](https://identity.apple.com/pushcert/) for iOS apps. After following the instructions, you will have APNS certificates on your system. Then edit `example/server/config.js` and look for these lines:

```js
exports.apnsCertData = readCredentialsFile('apns_cert_dev.pem');
exports.apnsKeyData = readCredentialsFile('apns_key_dev.pem');
```

Replace the file names with the names of the files containing your APNS certificates.  By deafult, `readCredentialsFile()` looks in the `/credentials` sub-directory for your APNS certificates.

If you don't have a client app yet, leave the default appName in `config.js` for now. Once you have created your client app, update the appName.

Now follow the instructions in: 

*   [Push notifications for Android apps](/doc/{{page.lang}}/lb2/Push-notifications-for-Android-apps.html) to set up Android client apps.
*   [Push notifications for iOS apps](/doc/{{page.lang}}/lb2/Push-notifications-for-iOS-apps.html) to set up iOS client apps

### Run the sample server application

First install all dependencies, then run the Node application as follows:

```
$ cd example/server
$ npm install
...
$ node app
```

You will see the message:

`The server is running at http://127.0.0.1:3010`

## Set up your LoopBack application to send push notifications

Follow the directions in this section to configure your own LoopBack application to send push notifications.  It may be helpful to refer to the [example LoopBack application](https://github.com/strongloop/loopback-push-notification/tree/master/example/server).

### Install Loopback push notification module

`$ npm install loopback-component-push`

### Create a push model

To send push notifications, you must create a push model.  The code below illustrates how to do this with a database as the data source. The database is used to load and store the corresponding application/user/installation models.

```js
var loopback = require('loopback');
var app = loopback();
var Notification = app.models.notification;
var Application = app.models.application;
var PushModel = app.models.push;
```

### Configure the application with push settings

#### Register a mobile application

The mobile application needs to register with LoopBack so it can have an identity for the application and corresponding settings for push services. Use the Application model's `register()` function for sign-up. 

For information on getting API keys, see:

*   [Get your Google Cloud Messaging credentials](http://docs.strongloop.com/display/DOC/Push+notifications+for+Android+apps#PushnotificationsforAndroidapps-GetyourGoogleCloudMessagingcredentials) for Android.
*   [Set up iOS clients](/doc/{{page.lang}}/lb2/Push-notifications.html) for iOS.

```js
Application.register('put your developer id here',
  'put your unique application name here', {
    description: 'LoopBack Push Notification Demo Application',
    pushSettings: {
      apns: {
        certData: readCredentialsFile('apns_cert_dev.pem'),
        keyData: readCredentialsFile('apns_key_dev.pem'),

        pushOptions: {},
        feedbackOptions: {
          batchFeedback: true,
          interval: 300
        }
      },
      gcm: {
        serverApiKey: 'your GCM server API Key'
      }
    }
  },
  function(err, app) {
    if (err) return cb(err);
    return cb(null, app);
  }
); 
function readCredentialsFile(name) {
  return fs.readFileSync(
    path.resolve(__dirname, 'credentials', name),
    'UTF-8'
  );
}
```

#### Register a mobile device

The mobile device also needs to register itself with the backend using the Installation model and APIs. To register a device from the server side, call the `Installation.create()` function, as shown in the following example:

```js
Installation.create({
  appId: 'MyLoopBackApp',
  userId: 'raymond',
  deviceToken: '756244503c9f95b49d7ff82120dc193ca1e3a7cb56f60c2ef2a19241e8f33305',
  deviceType: 'ios',
  created: new Date(),
  modified: new Date(),
  status: 'Active'
}, function(err, result) {
  console.log('Registration record is created: ', result);
});
```

Most likely, the mobile application registers the device with LoopBack using REST APIs or SDKs from the client side, for example:

```js
POST http: //localhost:3010/api/installations
  {
    "appId": "MyLoopBackApp",
    "userId": "raymond",
    "deviceToken": "756244503c9f95b49d7ff82120dc193ca1e3a7cb56f60c2ef2a19241e8f33305",
    "deviceType": "ios"
  }
```

### Send push notifications

#### Send out the push notification immediately

LoopBack provides two Node.js methods to select devices and send notifications to them:

*   [`notifyById()`](http://apidocs.strongloop.com/loopback-component-push/#pushmanagernotifybyidinstallationid-notification-cb): Select a device by registration ID and send a notification to it.
*   [`notifyByQuery()`](http://apidocs.strongloop.com/loopback-component-push/#pushmanagernotifybyqueryinstallationquery-notification-cb): Get a list of devices using a query (same as the **where** property for `Installation.find()`) and send a notification to all of them.

For example, the code below creates a custom endpoint to send out a dummy notification for the selected device:

```js
var badge = 1;
app.post('/notify/:id', function(req, res, next) {
  var note = new Notification({
    expirationInterval: 3600, // Expires 1 hour from now.
    badge: badge++,
    sound: 'ping.aiff',
    alert: '\uD83D\uDCE7 \u2709 ' + 'Hello',
    messageFrom: 'Ray'
  });

  PushModel.notifyById(req.params.id, note, function(err) {
    if (err) {
      // let the default error handling middleware
      // report the error in an appropriate way
      return next(err);
    }
    console.log('pushing notification to %j', req.params.id);
    res.send(200, 'OK');
  });
});
```

To select a list of devices by query, use the `PushModel.notifyByQuery()`, for example:

```js
PushModel.notifyByQuery({
  userId: {
    inq: selectedUserIds
  }
}, note, function(err) {
  console.log('pushing notification to %j', selectedUserIds);
});
```

#### Schedule the push notification request

{% include note.html content="

This feature is not yet available. When you are ready to deploy your app, [contact StrongLoop](mailto:callback@strongloop.com) for more information.

" %}

### Error handling

LoopBack has two mechanisms for reporting push notification errors:

*   Most configuration-related errors are reported to the callback argument of notification functions. These errors should be reported back to the caller (HTTP client) as can be seen in the `notifyById()` code example above.
*   Transport-related errors are reported via "error" events on the push connector. The application should listen for these events and report errors in the same way as other errors are reported (typically via console.error, bunyan, and so forth.).

```js
PushModel.on('error', function(err) {
  console.error('Push Notification error: ', err.stack);
});
```

## Architecture

The following diagram illustrates the LoopBack push notification system architecture.  The components are:

*   Device model and APIs to manage devices with applications and users.
*   Application model to provide push settings for device types such as iOS and Android.
*   Notification model to capture notification messages and persist scheduled notifications.
*   Optional job to take scheduled notification requests.
*   Push connector that interacts with device registration records and push providers APNS for iOS apps and GCM for Android apps.
*   Push model to provide high-level APIs for device-independent push notifications.

{% include image.html file="9830524.png" alt="" %}
