---
title: "Using Cocoapods in Swift with iOS SDK"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Using-Cocoapods-in-Swift-with-iOS-SDK.html
summary:
---

## Overview

[CocoaPods](https://cocoapods.org/about) manages library dependencies for your Xcode projects using a single text file called a Podfile. 

## Install Cocoapods

You can skip this step if you already have cocoapods installed on your Mac. Otherwise simply open your terminal and run the following command:

`sudo gem install cocoapods`

That's it, you're now ready to use Cocoapods!

## Create a podfile

Close your XCode project and in the main folder create a new file named "Podfile".

Insert the following:

`pod 'LoopBack', :git => 'https://github.com/strongloop/loopback-sdk-ios.git'`

## Install the SDK

Install the Cocoapods running the following command in your project directory:

```shell
$ pod install
```

Cocoapods will now look for the podspec file in the GitHub repo and download all necessary frameworks.

## Create the Swift bridge

From now on you'll use the xcworkspace file in your project directory to open your app.

So go ahead and open the xcworkspace file to fire up XCode.

Select **File > New > File** and select **Header File**.

{% include image.html file="9830477.png" alt="" %}

Enter S`wift-Bridging-Header.h` as the file name.

{% include image.html file="9830476.png" alt="" %}

Now open the file and simply insert the following line:

`#import <LoopBack/LoopBack.h>`

Afterwards all you need to do is include the bridging file into the Build Settings.

Open your projects Build Settings and look for **Objective-C Bridging Header**.

Ied to insert the path to the file you just created.

{% include image.html file="9830475.png" alt="" %}

You're now ready to use the SDK in your Swift project.