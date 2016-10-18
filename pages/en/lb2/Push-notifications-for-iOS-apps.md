---
title: "Push notifications for iOS apps"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Push-notifications-for-iOS-apps.html
summary:
---

## Overview

This article provides information on creating iOS apps that can get push notifications from a LoopBack application.
See [Push notifications](Push-notifications.html) for information on creating the corresponding LoopBack server application.

The basic steps to set up push notifications for iOS clients are:

1.  Provision an application with Apple and configure it to enable push notifications.

2.  Provide a hook to receive the device token when the application launches and register it with the LoopBack server using the `LBInstallation` class.

3.  Provide code to receive notifications, under three different application modes: foreground, background, and offline.

4.  Process notifications.

For general information on the Apple push notifications,
see [Apple iOS Local and Push Notification Programming Guide](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Introduction.html). 
For additional useful information, see [Delivering iOS Push Notifications with Node.js](https://blog.engineyard.com/2013/developing-ios-push-notifications-nodejs).

## Configure APN push settings in your server application

Please see [Register a mobile application](Push-notifications.html#register-a-mobile-application).

## Add LoopBack iOS SDK as a framework

Open your XCode project, select targets, under build phases unfold **Link Binary with Libraries**, and click on '-' to add LoopBack framework.

{% include image.html file="9830526.png" alt="" %}

The LoopBack iOS SDK provides two classes to simplify push notification programming:

* [LBInstallation](http://apidocs.strongloop.com/loopback-sdk-ios/api/interface_l_b_installation.html) - enables the iOS application to register mobile devices with LoopBack. 
* [LBPushNotification](http://apidocs.strongloop.com/loopback-sdk-ios/api/interface_l_b_push_notification.html) - provides a set of helper methods to handle common tasks for push notifications.

## Initialize LBRESTAdapter

The following code instantiates the shared `LBRESTAdapter`.
In most circumstances, you do this only once; putting the reference in a singleton is recommended for the sake of simplicity.
However, some applications will need to talk to more than one server; in this case, create as many adapters as you need.

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.settings = [self loadSettings];
    self.adapter = [LBRESTAdapter adapterWithURL:[NSURL URLWithString:self.settings[@"RootPath"]]];

    // Reference to Push notifs List VC
    self.pnListVC = (NotificationListVC *)[[(UINavigationController *)self.window.rootViewController viewControllers]
                                           objectAtIndex:0];

    LBPushNotification* notification = [LBPushNotification application:application
                                         didFinishLaunchingWithOptions:launchOptions];

    // Handle APN on Terminated state, app launched because of APN
    if (notification) {
        NSLog(@"Payload from notification: %@", notification.userInfo);
        [self.pnListVC addPushNotification:notification];
    }

    return YES;
}
```

## Register the device

```
- (void)application:(UIApplication*)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken
{
    __unsafe_unretained typeof(self) weakSelf = self;

    // Register the device token with the LoopBack push notification service
    [LBPushNotification application:application
didRegisterForRemoteNotificationsWithDeviceToken:deviceToken
                            adapter:self.adapter
                             userId:@"anonymous"
                      subscriptions:@[@"all"]
                            success:^(id model) {
                                LBInstallation *device = (LBInstallation *)model;
                                weakSelf.registrationId = device._id;
                            }
                            failure:^(NSError *err) {
                                NSLog(@"Failed to register device, error: %@", err);
                            }
     ];
...
}

- (void)application:(UIApplication*)application didFailToRegisterForRemoteNotificationsWithError:(NSError*)error {
    // Handle errors if it fails to receive the device token
        [LBPushNotification application:application didFailToRegisterForRemoteNotificationsWithError:error];
}
```

## Handle received notifications

```
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    // Receive push notifications
    LBPushNotification* notification = [LBPushNotification application:application
                                          didReceiveRemoteNotification:userInfo];
    [self.pnListVC addPushNotification:notification];
}
```
