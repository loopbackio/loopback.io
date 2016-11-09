# LoopBack Push Notification Component

![StrongLoop Labs](http://docs.strongloop.com/download/thumbnails/5310165/StrongLoop%20Labs%20Logo%20Cropped.png "StrongLoop Labs")

> StrongLoop Labs projects provide early access to advanced or experimental functionality.  In general, these projects may lack usability, completeness, documentation, and robustness, and may be outdated.
However, StrongLoop supports these projects: Paying customers can open issues using the StrongLoop customer support system (Zendesk), and community users can report bugs on GitHub.

This module provides a set of LoopBack models to enable mobile device push notifications.

Please see the full documentation: [Push notifications](http://docs.strongloop.com/display/LB/Push+notifications).

> The loopback-component-push module supersedes [loopback-push-notification](https://www.npmjs.org/package/loopback-push-notification). Please update your package.json accordingly.

## Architecture

![push-notification.png](push-notification.png)

## Key Components

- Device model and APIs to manage devices with applications and users
- Application model to provide push settings for device types such as ios and
android
- Notification model to capture notification messages and persist scheduled
notifications
- Optional Job to take scheduled notification requests
- Push connector that interact with device registration records and push
providers such as APNS, GCM, and MPNS
- Push model to provide high level APIs for device-independent push notifications

## Samples

### Node.js server

This module includes an [example LoopBack server application](https://github.com/strongloop/loopback-component-push/tree/master/example/server-2.0).  

To run it, use these commands:

```shell
$ cd example/server
$ npm install
$ bower install
$ node app
```

Open your browser to [http://127.0.0.1:3010](http://127.0.0.1:3010).

By default, the application uses an in-memory store for the application/installation data.
To change to a MongoDB instance, set the MONGODB environment variable to the MongoDB URL. For example,

```shell
MONGODB=mongodb://localhost/demo node app
```

### iOS client

The [iOS example app](https://github.com/strongloop/loopback-component-push/tree/master/example/ios)
uses the LoopBack iOS SDK to enable and handle push notifications. 

### Android client

The [Android example app](https://github.com/strongloop/loopback-component-push/tree/master/example/android)
uses the LoopBack Android SDK to enable and handle push notifications. 

## References

- https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html
- http://developer.android.com/google/gcm/index.html
- http://msdn.microsoft.com/en-us/library/windowsphone/develop/hh202945(v=vs.105).aspx
- https://github.com/argon/node-apn
- https://github.com/logicalparadox/apnagent-ios
- https://blog.engineyard.com/2013/developing-ios-push-notifications-nodejs
