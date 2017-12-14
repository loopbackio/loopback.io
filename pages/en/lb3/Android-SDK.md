---
title: "Android SDK"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [android]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Android-SDK.html
summary: The Android SDK provides a simple Java API that enables an Android app to interact with a LoopBack server application.
---

{% include warning.html content="
As a former StrongLoop Labs project, the Android SDK may lack usability, completeness, documentation, and robustness, and may be outdated. StrongLoop/IBM is no longer maintaining this project actively, however we do provide support for our paying customers through usual IBM support channels.
" %}


{% include see-also.html content="
* [Download Android SDK](http://81b70ddedaf4b27b1592-b5e75689411476c98957e7dab0242f50.r56.cf2.rackcdn.com/loopback-sdk-android-1.5.3-eclipse-bundle.zip)
* [Android SDK API docs](http://apidocs.loopback.io/loopback-sdk-android/api/index.html)
* [loopback-android-getting-started](https://github.com/strongloop-community/loopback-android-getting-started)
" %}

{% include toc.html %}

The Android SDK provides a simple Java API that enables your Android app to access a
LoopBack server application.
It enables you to interact with your models and data sources in a comfortable native manner instead of using clunky interfaces like `AsyncHttpClient`, `JSONObject`. 

<div markdown="1" style="height: 60px; line-height: 60px; margin: 15px auto 0 auto; width: 220px; border: 1px solid #aaa; background-color: #D6E7D6; font-weight: bold;" align="center">
[Download Android SDK](http://81b70ddedaf4b27b1592-b5e75689411476c98957e7dab0242f50.r56.cf2.rackcdn.com/loopback-sdk-android-1.5.3-eclipse-bundle.zip)
</div>

{% include warning.html content="
Please ensure you have the latest version (1.5) of the Android SDK.
If you are using Eclipse, you will have a `lib/loopback-sdk-android-x.y.z.jar` library,
where x.y.z is the version.
If you are using Android Studio with gradle-based builds, then you have a dependency
entry specifying the SDK version.
" %}

<div style="float: right;">
{% include image.html file="9830422.png" alt="" max-width="200" %}
{% include image.html file="9830423.png" alt="" max-width="200" %}
<br/>
{% include image.html file="9830424.png" alt="" max-width="200" %}
{% include image.html file="9830421.png" alt="" max-width="200" %}
<br/>
{% include image.html file="9830420.png" alt="" max-width="200"%}
{% include image.html file="9830419.png" alt="" max-width="200"%}
</div>

## Getting started with the guide app

The easiest way to get started with the LoopBack Android SDK is with the LoopBack Android guide app.
The guide app comes ready to compile with Android Studio and each tab in the app will guide you through the SDK features available to mobile apps.

### Prerequisites

If you haven't already created your application backend, see
[loopback-android-getting-started](https://github.com/strongloop-community/loopback-android-getting-started).
The Android guide app will connect to the this backend sample app.

Before you start, make sure you've installed the [Eclipse Android Development Tools](http://developer.android.com/sdk/index.html) (ADT).

Now make sure you have the necessary SDK tools installed.

1.  In ADT, choose **Window > Android SDK Manager**.
2.  Install the following if they are not already installed:
   * Tools:
     * Android SDK Platform-tools 18 or newer
     * Android SDK Build-tools 18 or newer
   * Android 4.3 (API 18)
     * SDK Platform.
3.  To run the LoopBack Android guide application (see below), also install **Extras > Google Play Services**.

Before you start, make sure you have set up at least one Android virtual device: Choose **Window > Android Virtual Device Manager**.
See [AVD Manager](http://developer.android.com/tools/help/avd-manager.html) for more information.

{% include important.html content="

The guide application uses Google Maps Android API to render a map. As of November 2013, Google Maps are not supported by the Android emulator,
so the application uses a list view of geo-locations.
To see the Google Maps display, run the guide app on a real Android device instead of a virtual device

" %}

### Running the LoopBack server application

Follow the instructions in 
[Getting started with LoopBack](Getting-started-with-LoopBack.html) to create the LoopBack sample backend application.
You can also just clone [https://github.com/strongloop/loopback-getting-started](https://github.com/strongloop/loopback-getting-started).

In the directory where you created the application, enter these commands:

```shell
$ cd loopback-getting-started
$ node .
```

### Downloading LoopBack Android Getting Started app

To get the LoopBack Android Getting Started application, you will need either the [git](http://git-scm.com/) command-line tool or a GitHub account.

To use `git`, enter this command:

```shell
$ git clone git@github.com:strongloop/loopback-android-getting-started.git
```

### Running the LoopBack Android Getting Started app

Follow these steps to run the LoopBack Android guide app:

1.  Open ADT Eclipse.
2.  Import the Loopback Guide Application to your workspace:
    1.  Choose **File > Import**.
    2.  Choose **Android > Existing Android Code into Workspace**.
    3.  Click **Next**.
    4.  Browse to the `loopback-android-getting-started/LoopbackGuideApplication` directory.
    5.  Click **Finish**.

    {% include tip.html content="
    ADT does not take long to import the guide app.
    Don't be misguided by the progress bar at the bottom of the IDE window: it indicates memory use, not loading status.
    " %}

3.  Import Google Play Services library project into your workspace. The project is located inside the directory where you have installed the Android SDK.
    1.  Choose **File > Import**.
    2.  Choose **Android > Existing Android Code into Workspace**.
    3.  Click **Next**.
    4.  Browse to the `<android-sdk>/extras/google/google_play_services/libproject/google-play-services_lib` directory.
    5.  Check **Copy projects into workspace**
    6.  Click **Finish**.

    See [Google Play Services SDK](http://developer.android.com/google/play-services/setup.html) for more details.

4.  Add the imported google-play-services_lib as an Android build dependency of the Guide Application.
    1.  In the Package Explorer frame, select LoopbackGuideApplication
    2.  Choose **File > Project Properties**
    3.  Select **Android**
    4.  In the Library frame, click on **Add...** and select `google-play-services_lib`

5.  Obtain an API key for Google Maps Android API v2 per 
    [Getting Started instructions](https://developers.google.com/maps/documentation/android/start#get_an_android_certificate_and_the_google_maps_api_key)
    and enter it into `AndroidManifest.xml`.

6.  Click the green **Run** button in the toolbar to run the application. Each tab (fragment) shows a different way to interact with the LoopBack server.
    Look at source code of fragments to see implementation details.

It takes some time for the app to initialize: Eventually, you'll see an Android virtual device window.
Click the LoopBack app icon in the home screen to view the LoopBack Android guide app.

#### Troubleshooting

**Problem**: Build fails with the message `Unable to resolve target 'android-18'`.

**Resolution**: You need to install Android 4.3 (API 18) SDK.
See [Prerequisites](https://github.com/strongloop-community/loopback-android/blob/master/docs/GettingStarted.md#prerequisites) 
for instructions on how to install SDK components.

If you don't want to install an older SDK and want to use the most recent one (for example, Android 4.4 API 19), follow these steps:

1.  Close Eclipse ADT.
2.  Edit the file `project.properties` in the `loopback-android-getting-started` directory and change the `target` property to the API version you have installed.
    For example: `target=android-19`.
3.  Open Eclipse ADT again. The project should build correctly now.

## Creating and working with your own app

If you are creating a new Android application or want to integrate an existing application with LoopBack, then follow the steps in this section.

### Eclipse ADT setup

Follow these steps to add LoopBack SDK to your Eclipse project:

1.  Download [LoopBack Android SDK for Eclipse.](http://81b70ddedaf4b27b1592-b5e75689411476c98957e7dab0242f50.r56.cf2.rackcdn.com/loopback-sdk-android-1.5.1-eclipse-bundle.zip)
2.  Extract the content of the downloaded zip file and copy the contents of the `libs` folder into the `libs` folder of your Eclipse ADT project.

### Android Studio setup

1.  Edit your `build.gradle` file.
2.  Make sure you have `mavenCentral()` or `jcenter() `among the configured repositories (jcenter is a superset of mavenCentral).
    Projects created by Android Studio Beta (0.8.1 and newer) have this repository configured for you by default: 

    **build.gradle in project root**

    ```java
    repositories { 
        jcenter() 
    }
    ```

3.  Add `com.strongloop:loopback-sdk-android:1.5.-` to your compile dependencies:

    ```java
    dependencies { 
        compile 'com.strongloop:loopback-sdk-android:1.5.-' 
    }
    ```

### Working with the SDK

For the complete API documentation, see [LoopBack Android API](http://apidocs.loopback.io/loopback-sdk-android/api/index.html).

1.  You need an adapter to tell the SDK where to find the server:

    `RestAdapter adapter = new RestAdapter(getApplicationContext(), "http://example.com/api");`

    This `RestAdapter` provides the starting point for all client interactions with the running server.
    It should be suffixed with "`/api`" in order for the underlying REST method calls to be resolved to your `Model`.

2.  Once you have access to `adapter` (for the sake of example, assume the Adapter is available through our Fragment subclass),
    you can create basic `Model` and `ModelRepository` objects. Assuming you've  previously created a [LoopBack model](Defining-models.html) named "product":

    ```java
    ModelRepository productRepository = adapter.createRepository("product");
    Model pen = productRepository.createObject( ImmutableMap.of("name", "Awesome Pen") );
    ```

    All the normal `Model` and `ModelRepository` methods (for example, `create`, `destroy`, `findById`) are now available through `productRepository` and `pen`!

3.  You can now start working with your model through the generic Model object.
    Continue below to learn how to extend the `Model` Java object to directly match, and thus provide the strongly-typed interface for interaction with, your own `Model`'s members.
    Check out the [LoopBack Android API docs](http://apidocs.loopback.io/loopback-sdk-android/api/index.html) 
    or create more Models with the [Model generator](Model-generator.html).

## Creating your own LoopBack model

Creating a subclass of `Model` enables your class to get the benefits of a Java class; for example, compile-time type checking.

### Prerequisites

* **Knowledge of Java and Android app development**
* **LoopBack Android SDK** - You should have set this up when you followed one of the preceding sections.
* **Schema** - Your data schema must be defined already.

### Define model class and properties

As with any Java class, the first step is to build the interface.
If you leave custom behavior for later, then it's just a few property declarations and you're ready for the implementation.
In this simple example, each widget has a way to be identified and a price.

```java
import java.math.BigDecimal;
import com.strongloop.android.loopback.Model;

/**
 * A widget for sale.
 */
public class Widget extends Model {

  private String name;
  private BigDecimal price;

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public BigDecimal getPrice() {
    return price;
  }
}
```

### Define model repository

The `ModelRepository` is the LoopBack Android SDK's placeholder for what in Node is a JavaScript prototype representing a specific "type" of Model on the server.
In our example, this is the model exposed as "widget" (or similar) on the server:

```javascript
var Widget = app.model('widget', {
  dataSource: "db",
  properties: {
    name: String,
    price: Number
  }
});
```

Because of this the class name (`'widget'`, above) needs to match the name that model was given on the server.
If you don't have a model, [see the LoopBack documentation](https://github.com/strongloop-community/loopback-sdk-android/blob/master/docs/Subclassing.md) for more information. 
The model _must_ exist (even if the schema is empty) before it can be interacted with.

Use this to make creating Models easier. Match the name or create your own.

Since `ModelRepository` provides a basic implementation, you need only override its constructor to provide the appropriate name.

```java
public class WidgetRepository extends ModelRepository<Widget> {
    public WidgetRepository() {
        super("widget", Widget.class);
    }
}
```

### Add a little glue

Just as in using the guide app, you need an `RestAdapter` instance to connect to the server:

`RestAdapter adapter = new RestAdapter("http://myserver:3000/api");`

**Remember:** Replace "[`http://myserver:3000`](http://myserver:3000/)/api" with the complete URL to your server, including the the "`/api`" suffix.

Once you have that adapter, you can create our Repository instance.

`WidgetRepository repository = adapter.createRepository(WidgetRepository.class);`

### Create and modify widgets

Now you have a `WidgetRepository` instance, you can:

Create a `Widget`:

```java
Widget pencil = repository.createObject(ImmutableMap.of("name", "Pencil"));
pencil.price = new BigDecimal("1.50");
```

Save the `Widget`:

```java
pencil.save(new VoidCallback() {
    @Override
    public void onSuccess() {
        // Pencil now exists on the server!
    }

    @Override
    public void onError(Throwable t) {
        // save failed, handle the error
    }
});
```

Find another `Widget`:

```java
repository.findById(2, new ObjectCallback<Widget>() {
    @Override
    public void onSuccess(Widget widget) {
        // found!
    }

    public void onError(Throwable t) {
        // handle the error
    }
});
```

Remove a `Widget`:

```java
pencil.destroy(new VoidCallback() {
    @Override
    public void onSuccess() {
        // No more pencil. Long live Pen!
    }

    @Override
    public void onError(Throwable t) {
        // handle the error
    }
});
```

## Users and authentication

The LoopBack Android SDK provides classes that make it easy to connect an Android client app to a server application using LoopBack's authentication and authorization model: 

* [User](http://apidocs.loopback.io/loopback-sdk-android/api/index.html?com/strongloop/android/loopback/User.html): represents on the client a user instance on the server.
* [UserRepository](http://apidocs.loopback.io/loopback-sdk-android/api/index.html?com/strongloop/android/loopback/UserRepository.html): 
  base class implementing [`ModelRepository`](http://apidocs.loopback.io/loopback-sdk-android/api/com/strongloop/android/loopback/ModelRepository.html) for the built-in User type.

See [Authentication, authorization, and permissions](Authentication-authorization-and-permissions.html) for instructions how to enable authentication in your LoopBack server.

The Android SDK comes with a predefined implementation of UserRepository that provides loginUser and logout methods.
However, you cannot use `UserRepository<User>` directly, because the Java runtime removes types from generic instances and therefore there is no way to pass the
`User` class to the `UserRepository` instance created via `createRepository`. So you must create a specialized subclass:

```java
package com.example.myproject;
// Optional, you can use LoopBack's User class too
public static class User extends com.strongloop.android.loopback.User {
}
public static class UserRepository·
        extends com.strongloop.android.loopback.UserRepository<User> {
    public interface LoginCallback·
        extends com.strongloop.android.loopback.UserRepository.LoginCallback<User> {
    }
    public UserRepository() {
        super("customer", null, User.class);
    }
}
```

Then use it as follows: 

```java
RestAdapter restAdapter = new RestAdapter("http://myserver:3000/api");
import com.example.myproject;
UserRepository userRepo = restAdapter.createRepository(UserRepository.class);
User user = userRepo.createUser("name@example.com", "password");
```

Or, to log in the user:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_login);
    final  RestAdapter  restAdapter = new RestAdapter(getApplicationContext(), "http://myserver:3000");
    final UserRepository  userRepo = restAdapter.createRepository(UserRepository.class);
    loginBtn = (Button) findViewById(R.id.loginButton);
    loginUsername = (EditText) findViewById(R.id.loginUsername);
    loginPassword = (EditText) findViewById(R.id.loginPassword);
    goToCreateAccountBtn = (TextView) findViewById(R.id.createAccount);
    //Login click listener
    loginBtn.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            username = loginUsername.getText().toString();
            password = loginPassword.getText().toString();
            System.out.println(username - " : " - password);
            userRepo.loginUser(username , password , new UserRepository.LoginCallback() {
                @Override
                public void onSuccess(AccessToken token, User currentUser) {
                    Intent goToMain = new Intent(getApplicationContext(), Main.class);
                    startActivity(goToMain);
                    finish();
                    System.out.println(token.getUserId() - ":" - currentUser.getId());
                }

                @Override
                public void onError(Throwable t) {
                    Log.e("Chatome", "Login E", t);
                }
            });
        }
    });

    //Create account listener
    goToCreateAccountBtn.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent goToSignup = new Intent(getApplicationContext(), Signup.class);
            startActivity(goToSignup);
            finish();
        }
    });
}
```

The `loginUser()` method returns an access token.
The `RestAdapter` stores the access token in and uses it for all subsequent requests.
Because it stores the value in `SharedPreferences`, it preserves the value across application restarts.

```java
userRepo.logout(new VoidCallback() {
    @Override
    public void onSuccess() {
        // logged out
    }

    @Override
    public void onError(Throwable t) {
      // logout failed
    }
});
```
The repo can also be used to change the current user's password.

```java
userRepo.changePassword(currentPassword, newPassword, new VoidCallback(){
    @Override
    public void onSuccess() {
        // Password changed
    }

    @Override
    public void onError(Throwable t) {
      // Password change failed
    }
});
```

### Accessing data of the current user

There are two methods to get the `User` object for the currently logged in user:

* `UserRepository.findCurrentUser()` -  performs a request to the server to get the data of the current user and caches the response in memory.
  When no user is logged in, passes null to the callback.
* `UserRepository.getCachedCurrentUser()` - returns the value cached by the last call of `findCurrentUser()` or `loginUser()`.

Call `findCurrentUser` when your application starts. Then you can use the synchronous method `getCachedCurrentUser` in all your Activity classes.

Example of using the `findCurrentUser()` method:

```java
userRepo.findCurrentUser(new ObjectCallback<User>() {
    @Override
    public void onSuccess(User user) {
        if (user != null) {
            // logged in
        } else {
            // anonymous user
        }
    }
});
```

Example of using the `getCachedCurrentUser()` method:

```java
User currentUser = userRepo.getCachedCurrentUser();
if (currentUser != null) {
    // logged in
} else {
    // anonymous user
    // or findCurrentUser was not called yet
}
```

### Extending the pre-defined User model

Most applications will need to extend the built-in User model with additional properties and methods. 
Consider the example of an e-shop, where the user is modeled as a `Customer`, with an additional property `address`.

{% include code-caption.html content="models.json" %}
```javascript
"customer": {
  "properties": {
    "address": "string"
  },
  "options": {
    "base": "user"
  }
}
```

To access your customer model from the Android app,
extend the `UserRepository` and `User` classes as you extend `ModelRepository` and `Model` when creating any other model class.

```java
public class Customer extends User {
    private String address;
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}

public class CustomerRepository extends UserRepository<Customer> {
    public interface LoginCallback extends UserRepository.LoginCallback<Customer> {
    }

     public CustomerRepository() {
        super("customer", null, Customer.class);
     }
}
```

Now you can login a customer and access the corresponding address:

```java
CustomerRepository customerRepo = restAdapter.createRepository(CustomerRepository);

customerRepo.loginUser("user@example.com", "password",
    new CustomerRepository.LoginCallback() {
        @Override
        public void onSuccess(AccessToken token, Customer customer) {
            // customer was logged in
        }

       @Override
       public void onError(Throwable t) {
           // login failed
       }
   }
);

// later in one of the Activity classes
Customer current = customerRepo.getCachedCurrentUser();
if (current != null) {
    String address = current.getAddress();
    // display the address
} else {
    // you have to login first
}
```

<div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>
  <p><strong>Following from blog post needs to be integrated</strong>.</p>
  <p>At application startup, find the currently logged-in user. When no user is logged in and your application requires an authenticated user, instead present the login screen Activity.</p>
  <div class="crayon-syntax crayon-theme-familiar crayon-font-monaco crayon-os-mac print-yes crayon-wrapped">
    <div class="crayon-main">
      <p>&nbsp;</p>
      <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">userRepo.findCurrentUser(new ObjectCallback&lt;User&gt;() {

 @Override public void onSuccess(User user) {
        if (user != null) {
            // logged in
        } else {
            // anonymous user
        }
    }
});</pre></div>
      </div>
      <p>&nbsp;</p>
    </div>
  </div>
  <p>Call the&nbsp;<code>loginUser()</code>&nbsp;method to log in a user; for example:</p>
  <div class="crayon-syntax crayon-theme-familiar crayon-font-monaco crayon-os-mac print-yes crayon-wrapped">
    <div class="crayon-main">
      <p>&nbsp;</p>
      <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">userRepo.loginUser("user@example.com", "password",

 new UserRepository&lt;User&gt;.LoginCallback() {
        @Override public void onSuccess(AccessToken token, User user) {
            // user was logged in
        }
        @Override public void onError(Throwable t) {
            // login failed
        }
    }
);</pre></div>
      </div>
      <p>&nbsp;</p>
    </div>
  </div>
  <p>Use&nbsp;<code>getCachedCurrentUser()</code>&nbsp;in your&nbsp;<code>Activity</code>&nbsp;classes to get the data for the current user.</p>
  <div class="crayon-syntax crayon-theme-familiar crayon-font-monaco crayon-os-mac print-yes crayon-wrapped">
    <div class="crayon-main">
      <p>&nbsp;</p>
      <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">User currentUser = userRepo.getCachedCurrentUser();

if (currentUser != null) {
 // logged in
} else {
 // anonymous user
}</pre></div>
      </div>
    </div>
  </div>
</div>
