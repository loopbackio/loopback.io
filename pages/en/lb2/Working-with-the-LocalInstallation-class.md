---
title: "Working with the LocalInstallation class"
lang: en
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Working-with-the-LocalInstallation-class.html
summary:
---

{% include see-also.html content="

* [Android SDK API docs](http://apidocs.strongloop.com/loopback-sdk-android/api/index.html)
* [loopback-android-getting-started](https://github.com/strongloop/loopback-android-getting-started)
" %}

{% include toc.html %}

## Overview: Android LocalInstallation class

The `LocalInstallation` class is not a client mirror of the server `Installation` Model.
Instead, it wraps the `Installation` model into an API that makes it easy to implement the correct client semantics.

1.  When `LocalInstallation.save()` is called by the application for the first time, a new `Installation` record is created on the server.
    The data are cached in application's `SharedPreferences`, thus all subsequent calls of `save()` update this existing record.
    That way there is exactly one `Installation` record for each instance of the application (each phone running the app).
2.  It is ok to create a new `LocalInstallation` instance whenever you need to update any of the `Installation` properties.
    Since the data is cached in `SharedPreferences`, all `LocalInstallation` objects are initialized from the same data at the creation time.
    Just don't forget to call `save` to persist your changes both on the server and in the local storage.

## Associating installations with authenticated users

1.  By default, `userId` is `null`, which means the user has not logged in yet (has not created an account yet).
2.  After a successful login, call `LocalInstallation.setUserId()` to update the user relation and save the changes.

    ```java
    userRepository.loginUser(email, password, new UserRepository<User>.LoginCallback() {
        @Override
        public void onSuccess(AccessToken token, User currentUser) {
            final LocalInstallation installation = new LocalInstallation(context, adapter);
            installation.setUserId(currentUser.getId());
            installation.save(/* callback */);
        }

        @Override
        public void onError(Throwable t) {
            // handle the error
        }
    );
    ```

3.  After a logout, set `userId` back to `null` in order to flag the installation as anonymous.

    ```java
    userRepository.logout(new UserRepository<User>.VoidCallback() {
        @Override
        public void onSuccess() {
            final LocalInstallation installation = new LocalInstallation(context, adapter);
            installation.setUserId(null);
            installation.save(/* callback */);
        }

        @Override
        public void onError(Throwable t) {
            // handle the error
        }
    );
    ```

Alternatively, you can use the `status` property to flag the installations where the user was logged out.
This way it is possible to tell which user was the last one logged on the device:

1.  A new installation has `userId: null` and  `status: "Active"`.
2.  Login updates the `userId `with a non-empty id value and sets `status: "Active"`.
3.  Logout keeps the `userId` value but changes the `status` to a differed value, e.g. `"LoggedOut"`.
4.  Subsequent login updates the `userId `to the new id value and sets `status` back to `"Active"`.
