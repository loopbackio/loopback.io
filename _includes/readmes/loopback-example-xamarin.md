# LoopBack Xamarin SDK example application 

This repository contains a mobile app that demonstrates the Loopback Xamarin SDK.  It contains:

* `Server` directory: Loopback server application.
* `Client` directory: The ToDo client app, created in Xamarin Studio with Xamarin Forms for iOS.

## Prerequisites

- Install [Xamarin Studio](http://xamarin.com/studio).  **NOTE**: You must get the full Studio (trial) license, not just the "starter" license.
- Install [Xamarin Forms](http://xamarin.com/forms)
- Install [LoopBack](http://loopback.io/)

## Download

```
$ git clone https://github.com/strongloop/loopback-example-xamarin.git
```

##  Run the server app

You can either run the LoopBack server app yourself, or connect to the demo app running at http://xamarindemo.strongloop.com.

### Run your own server app

1. Go to server folder: 
  ```$ cd server```
1. Install dependencies:
  ```$ npm install```
1.  Run the application:
  ```$ node .```

### Use StrongLoop's server app

Alternatively, you can run the Xamarin client app against http://xamarindemo.strongloop.com.

Edit [LBXamarinSDK.cs](https://github.com/strongloop/loopback-example-xamarin/blob/master/Client/Todo%20App/TodoApp/TodoApp/LBXamarinSDK.cs) and change BASE_URL to `http://xamarindemo.strongloop.com/api`.

## Run the client app

Open the client app solution with Xamarin Studio: `loopback-example-xamarin/Client/Todo App/TodoApp.sln`.

In Xamarin Studio, build and run the app:

![Xamarin demo - build app](https://raw.githubusercontent.com/strongloop/loopback-example-xamarin/master/images/xamarin-build-app.png)

The iOS Simulator will appear running the client app.  It may take a moment or two.

![Xamarin demo app login](https://raw.githubusercontent.com/strongloop/loopback-example-xamarin/master/images/xamarin-login.png)

In the iOS Simulator:

2. The first time you run the app, click **Sign Up**:
   - Enter an email address and password (they are not validated).
   - Click **Sign Up**
   - If you already signed up in this session, click **Login** with the credentials you entered previously.  
3. You'll see the app home page: <br/>
![Xamarin demo app home page](https://raw.githubusercontent.com/strongloop/loopback-example-xamarin/master/images/xamarin-todo-app.png)
3. Enter a "To Do" item: <br/>
![Xamarin demo - adding a To Do item](https://raw.githubusercontent.com/strongloop/loopback-example-xamarin/master/images/xamarin-add-todo-item.png)
   - Click **+**
   - Click **Add a task + **
   - Enter a description of the task in the top (red) text field
   - Change the date, time, category and mark as a favorite if you wish.
   - Click **Create** to add the item.

You'll see the item appear in the "To Do" list.
![Xamarin demo app - To Do item added](https://raw.githubusercontent.com/strongloop/loopback-example-xamarin/master/images/xamarin-todo-added.png)

You can confirm that the data is also added to the LoopBack model using LoopBack API Explorer.

### Links 

* [LoopBack](http://loopback.io)
* [Perfected Tech](http://perfectedtech.com)
* [Xamarin Studio](http://xamarin.com)

---

[More LoopBack examples](https://github.com/strongloop/loopback-example)
