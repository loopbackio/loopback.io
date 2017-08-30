---
title: "Create AngularJS client"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started, angularjs]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Create-AngularJS-client.html
summary: The LoopBack AngularJS SDK enables you to easily create a client JavaScript API to consume your LoopBack REST API.
---

{% include content/gs-prereqs.html two="true" lang=page.lang %}

{% include important.html content="To follow this step, you should have a basic understanding of [AngularJS](https://angularjs.org/).
" %}


{% include note.html content="
If you followed the previous step in the tutorial, go to [Introducing the AngularJS SDK](#introducing-the-angularjs-sdk).

If you're just jumping in, follow the steps below to catch up...
" %}

Get the app (in the state following the last article plus all the client files) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started-intermediate.git
$ cd loopback-getting-started-intermediate
$ git checkout step6
$ npm install
```

## Introducing the AngularJS SDK

[AngularJS](http://angularjs.org/)  is an open-source JavaScript [model–view–controller](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (MVC) framework for browser-based applications.  LoopBack provides an [AngularJS JavaScript SDK](AngularJS-JavaScript-SDK) to facilitate creating AngularJS clients for your LoopBack API server-side apps.  The SDK is installed when you install StrongLoop.

The SDK provides auto-generated AngularJS services, compatible with [`ngResource.$resource`](http://docs.angularjs.org/api/ngResource.%24resource), that provide client-side representation of the models and remote methods in the LoopBack server application.  The SDK also includes some command-line tools, including `lb-ng` that generates Angular $resource services for your LoopBack application, creating in effect a dynamic client that automatically includes client-side APIs to access your LoopBack models and methods.  You don't have to manually write any static code.

For more information, see [AngularJS JavaScript SDK](AngularJS-JavaScript-SDK).

## Generate lb-services.js

To generate the Angular services for a LoopBack application, use the AngularJS SDK `lb-ng` command-line tool.  You may need to install `lb-ng` with the following command.  

```
$ npm install -g loopback-sdk-angular-cli
```

Next, create the `client/js/services` directory, if you don't already have it (by using the `mkdir` command, for example), then in the project root directory, enter the `lb-ng` command as follows:

```
$ mkdir -p client/js/services
$ lb-ng server/server.js client/js/services/lb-services.js
```

This command creates `client/js/services/lb-services.js`.

## Copy the other client files

{% include note.html content="
The `lb-ng` tool does the \"heavy lifting\" of creating the client JavaScript API that works with your LoopBack back-end. However, you still need to create the HTML/CSS and client JavaScript code that actually calls into this AngularJS API and defines the client-side functionality and appearance of your app. In general, creating this part of the app is entirely up to you. This tutorial includes an example of such a client implementation that you can use to understand the process.
" %}

If you've been following the entire tutorial (and didn't jump in and clone the project mid-way through), then you'll need to clone it now to get the client files required for this step.  Then copy the `client` sub-directory to your project directory:

```
$ git clone https://github.com/strongloop/loopback-getting-started-intermediate.git
$ cp -r loopback-getting-started-intermediate/client <your-app-dir>/client
```

Now let's take a look at what you now have in the `client` directory:

*   `index.html`
*   **css** - stylesheets
    *   `style.css`
*   **js** - application JavaScript files
    *   `app.js`
    *   **controllers** - AngularJS controllers 
        *   `auth.js`
        *   `review.js`
    *   **services** - AngularJS services 
        *   `auth.js`
        *   `lb-services.js`
*   **vendor** - AngularJS libraries (dependencies)
    *   `angular-resource.js `

    *   `angular-ui-router.js `

    *   `angular.js`

*   **views** - HTML view files
    *   `all-reviews.html `

    *   `forbidden.html  `

    *   `my-reviews.html  `

    *   `sign-up-form.html`

    *   `login.html  `

    *   `review-form.html `

    *   `sign-up-success.html`

Each file and directory is briefly described below

### index.html

The `index.html` file is the only file in the top level of the `/client` directory, and defines the application's main landing page.  Open it in your editor:

**client/index.html**  

```
<!DOCTYPE html>
<html lang="en" ng-app="app">
  <head>
    <meta charset="utf-8">
    <title>loopback-getting-started-intermediate</title>
    <link href="css/style.css" rel="stylesheet">
  </head>
  <body>
    <header>
      <h1>Coffee shop reviews</h1>
      <h2 ng-show="currentUser">Hello {{currentUser.email}}</h2>
      <nav>
        <ul>
          <li>
            <a ui-sref="all-reviews" ui-sref-active="active">All reviews</a>
          </li>
          <li ng-hide="currentUser">
            <a ui-sref="sign-up" ui-sref-active="active">Sign up</a>
          </li>
          <li ng-show="currentUser">
            <a ui-sref="my-reviews" ui-sref-active="active">My Reviews</a>
          </li>
          <li ng-show="currentUser">
            <a ui-sref="add-review" ui-sref-active="active">Add Review</a>
          </li>
          <li ng-hide="currentUser">
            <a ui-sref="login" ui-sref-active="active">Log in</a>
          </li>
          <li ng-show="currentUser">
            <a ui-sref="logout" ui-sref-active="active">Log out</a>
          </li>
        </ul>
      </nav>
    </header>
    <main ui-view></main>
    <script src="vendor/angular.js"></script>
    <script src="vendor/angular-resource.js"></script>
    <script src="vendor/angular-ui-router.js"></script>
    <script src="js/app.js"></script>
    <script src="js/services/lb-services.js"></script>
    <script src="js/controllers/auth.js"></script>
    <script src="js/controllers/review.js"></script>
    <script src="js/services/auth.js"></script>
  </body>
</html>
```

Perusing the file, you can see the references to the stylesheet in the `/css` directory and client JavaScript files in the `/vendor` and `/js` directories.

### Main client JavaScript files (app.js)

The `js/app.js` file defines application configurations.

{% include code-caption.html content="client/js/app.js" %} 
```js
angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
    $urlRouterProvider) {
    $stateProvider
      .state('add-review', {
        url: '/add-review',
        templateUrl: 'views/review-form.html',
        controller: 'AddReviewController',
        authenticate: true
      })
      .state('all-reviews', {
        url: '/all-reviews',
        templateUrl: 'views/all-reviews.html',
        controller: 'AllReviewsController'
      })
      .state('edit-review', {
        url: '/edit-review/:id',
        templateUrl: 'views/review-form.html',
        controller: 'EditReviewController',
        authenticate: true
      })
      .state('delete-review', {
        url: '/delete-review/:id',
        controller: 'DeleteReviewController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('my-reviews', {
        url: '/my-reviews',
        templateUrl: 'views/my-reviews.html',
        controller: 'MyReviewsController',
        authenticate: true
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      });
    $urlRouterProvider.otherwise('all-reviews');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
```

Lines 2 - 4 include dependencies `app`, `ui.router`, and `lbServices`.  The latter is the AngularJS services library you generated previously using `lb-ng`.

Lines 61 - 66 define an interceptor that triggers when a state change happens: If the user is not logged in, then redirect to the forbidden page.

The other lines define application states.  _States_ determine which pages appears when the user navigates, changes URLs, or clicks on a link.  Any state for which  `authenticate` is `true` requires you to log in first.  If you navigate directly to one of these URLs, you will see a forbidden access page (state = `forbidden`, url = `/forbidden`.  Each call to `state()` specifies the template to use for the state, the controller to use, and whether authentication is required.  

The following table summarizes the states, and how the correspond to controllers, templates, and URLs.

<table id="state-summary">
  <tbody>
    <tr>
      <th>State</th>
      <th>URL</th>
      <th>Description</th>
      <th>Controller</th>
      <th>View / Template</th>
      <th>Must be logged in?</th>
    </tr>
    <tr>
      <td>'add-review'</td>
      <td>
        <div style="width: 120px;">
          <p style="line-height: 1.4285715;"><span>/add-review</span></p>
        </div>
      </td>
      <td>Add a new coffee shop review.</td>
      <td>AddReviewController</td>
      <td>
        <div style="width: 120px;">
          <p><span>review-form.html</span></p>
        </div>
      </td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>'all-reviews'</td>
      <td>/all-reviews</td>
      <td>List all reviews.</td>
      <td>AllReviewsController</td>
      <td>all-reviews.html</td>
      <td>No</td>
    </tr>
    <tr>
      <td>'edit-review'</td>
      <td>/edit-review/:id</td>
      <td>Edit selected review.</td>
      <td>EditReviewController</td>
      <td>review-form.html</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>'delete-review'</td>
      <td>/delete-review/:id</td>
      <td>Delete selected review.</td>
      <td><span>DeleteReviewController</span></td>
      <td>None</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>'forbidden'</td>
      <td>/forbidden</td>
      <td>
        <p>Forbidden URL error.</p>
        <ul>
          <li>Notifies user they can't perform the action.</li>
          <li>Displays link to login page.</li>
        </ul>
      </td>
      <td><span>EditReviewController</span></td>
      <td>forbidden.html</td>
      <td>No</td>
    </tr>
    <tr>
      <td>'login'</td>
      <td>/login</td>
      <td>
        <p>Login</p>
        <p>Redirects to add-review page upon successfully login</p>
      </td>
      <td><span>AuthLoginController</span></td>
      <td>login.html</td>
      <td>No</td>
    </tr>
    <tr>
      <td>'logout'</td>
      <td>/logout</td>
      <td>
        <p>Logout</p>
        <ul>
          <li>Notifies user they've logged out.</li>
          <li>Display link to to the all-reviews page.</li>
        </ul>
      </td>
      <td>AuthLogoutController</td>
      <td>None</td>
      <td>No</td>
    </tr>
    <tr>
      <td>'my-reviews'</td>
      <td>/my-reviews</td>
      <td>List only reviews of the logged-in user.</td>
      <td>MyReviewsController</td>
      <td>my-reviews.html</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>'sign-up'</td>
      <td>/sign-up</td>
      <td>Sign up for account.</td>
      <td>SignUpController</td>
      <td>sign-up-form.html</td>
      <td>No</td>
    </tr>
    <tr>
      <td>'sign-up-success'</td>
      <td>/sign-up/success</td>
      <td>
        <p>Successful sign-up.</p>
        <p>Display link to /all-reviews page.</p>
      </td>
      <td>None</td>
      <td>sign-up-success.html</td>
      <td>No</td>
    </tr>
  </tbody>
</table>

### Controllers

In Angular, a _controller_ is a JavaScript constructor function that is used to augment the [Angular Scope](https://docs.angularjs.org/guide/scope).

When a controller is attached to the DOM via the [ng-controller](https://docs.angularjs.org/api/ng/directive/ngController) directive, Angular will instantiate a new Controller object, using the specified constructor function. A new child scope will be available as an injectable parameter to the controller's constructor function as `$scope`.  For more information on controllers, see [Understanding Controllers](https://docs.angularjs.org/guide/controller) (AngularJS documentation).

The `client/js/controllers `directory contains two files that define controllers: `auth.js` and `review.js`.

The controller in `auth.js` handles user registration, login, and logout.  When the user is logged in, a `currentUser` object is set in the root scope.  Other parts of the app check the `currentUser` object when performing actions.  When logging out, the `currentUser` object is destroyed.

{% include code-caption.html content="js/controllers/auth.js" %}
```js
angular
  .module('app')
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state) {
      $scope.user = {
        email: 'foo@bar.com',
        password: 'foobar'
      };
      $scope.login = function() {
        AuthService.login($scope.user.email, $scope.user.password)
          .then(function() {
            $state.go('add-review');
          });
      };
    }
  ])
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state) {
      AuthService.logout()
        .then(function() {
          $state.go('all-reviews');
        });
    }
  ])
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state) {
      $scope.user = {
        email: 'baz@qux.com',
        password: 'bazqux'
      };
      $scope.register = function() {
        AuthService.register($scope.user.email, $scope.user.password)
          .then(function() {
            $state.transitionTo('sign-up-success');
          });
      };
    }
  ]);
```

The other file, `review.js`, defines controllers for review actions.

```js
angular
  .module('app')
  .controller('AllReviewsController', ['$scope', 'Review', function($scope,
    Review) {
    $scope.reviews = Review.find({
      filter: {
        include: [
          'coffeeShop',
          'reviewer'
        ]
      }
    });
  }])
  .controller('AddReviewController', ['$scope', 'CoffeeShop', 'Review',
    '$state',
    function($scope, CoffeeShop, Review, $state) {
      $scope.action = 'Add';
      $scope.coffeeShops = [];
      $scope.selectedShop;
      $scope.review = {};
      $scope.isDisabled = false;
      CoffeeShop
        .find()
        .$promise
        .then(function(coffeeShops) {
          $scope.coffeeShops = coffeeShops;
          $scope.selectedShop = $scope.selectedShop || coffeeShops[0];
        });
      $scope.submitForm = function() {
        Review
          .create({
            rating: $scope.review.rating,
            comments: $scope.review.comments,
            coffeeShopId: $scope.selectedShop.id
          })
          .$promise
          .then(function() {
            $state.go('all-reviews');
          });
      };
    }
  ])
  .controller('DeleteReviewController', ['$scope', 'Review', '$state',
    '$stateParams',
    function($scope, Review, $state, $stateParams) {
      Review
        .deleteById({
          id: $stateParams.id
        })
        .$promise
        .then(function() {
          $state.go('my-reviews');
        });
    }
  ])
  .controller('EditReviewController', ['$scope', '$q', 'CoffeeShop', 'Review',
    '$stateParams', '$state',
    function($scope, $q, CoffeeShop, Review,
      $stateParams, $state) {
      $scope.action = 'Edit';
      $scope.coffeeShops = [];
      $scope.selectedShop;
      $scope.review = {};
      $scope.isDisabled = true;
      $q
        .all([
          CoffeeShop.find().$promise,
          Review.findById({
            id: $stateParams.id
          }).$promise
        ])
        .then(function(data) {
          var coffeeShops = $scope.coffeeShops = data[0];
          $scope.review = data[1];
          $scope.selectedShop;
          var selectedShopIndex = coffeeShops
            .map(function(coffeeShop) {
              return coffeeShop.id;
            })
            .indexOf($scope.review.coffeeShopId);
          $scope.selectedShop = coffeeShops[selectedShopIndex];
        });
      $scope.submitForm = function() {
        $scope.review.coffeeShopId = $scope.selectedShop.id;
        $scope.review
          .$save()
          .then(function(review) {
            $state.go('all-reviews');
          });
      };
    }
  ])
  .controller('MyReviewsController', ['$scope', 'Review', '$rootScope',
    function($scope, Review, $rootScope) {
      $scope.reviews = Review.find({
        filter: {
          where: {
            publisherId: $rootScope.currentUser.id
          },
          include: [
            'coffeeShop',
            'reviewer'
          ]
        }
      });
    }
  ]);
```

The following table describes the controllers defined in `review.js`.

<table>
  <tbody>
    <tr>
      <th>Controller</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>AllReviewsController</td>
      <td>Performs a&nbsp;<code>Review.find()</code>&nbsp;to fetch reviews. &nbsp;Uses an include filter to add coffeeShop and review models. &nbsp;This is possible due the relations previously defined.</td>
    </tr>
    <tr>
      <td>AddReviewController</td>
      <td>
        <p>Coffee shops are populated from the server when the page first loads via CoffeeShop.find() down menu.</p>
        <p>When the form is submitted, we create a review and change to the <code>all-reviews</code>&nbsp;page when the promise resolves.</p>
      </td>
    </tr>
    <tr>
      <td>DeleteReviewController</td>
      <td>There is no view corresponding to this state when triggered; the corresponding review is deleted by ID. &nbsp;The ID is in the URL.</td>
    </tr>
    <tr>
      <td>EditReviewController</td>
      <td>
        <p>Similar to&nbsp;AddReviewController&nbsp;when the page is first loaded. &nbsp;</p>
        <p>The app&nbsp;performs two requests at the same time using $q to get the required models. With these models, it then populates the dropdown menu with the available coffee shops. &nbsp;Once the app has displayed the coffee shops in the dropdown,
          it selects the coffee shop previously chosen in the original review. &nbsp; Then the app sets&nbsp;<code style="line-height: 1.4285715;">coffeeShopId</code>&nbsp;to the selected coffee shop.</p>
      </td>
    </tr>
    <tr>
      <td>MyReviewController</td>
      <td>Similar to AllReviewsController, this controller uses a "where" filter to restrict the result set based on the publisherId, where&nbsp;publisherId is set from the currently logged-in user. &nbsp;It then uses an&nbsp;include filter to include coffeeShop
        and reviewer models.</td>
    </tr>
  </tbody>
</table>

### Services

Angular _services_ are substitutable objects that you connect  together using [dependency injection (DI)](https://docs.angularjs.org/guide/di). You can use services to organize and share code across your app.

The `js/services` directory contains two AngularJS services libraries: `auth.js` and `lb-services.js`.

You generated the l`b-services.js` previously, and it's described in [Generate lb-services.js](#generate-lb-servicesjs). 

The other file, `auth.js`, provides a simple interface for low-level authentication mechanisms.  It uses the `Reviewer` model (that extends the base `User` model) and defines the following services:

*   `login`: logs a user inLoopback automatically manages the authentication token is stored in browser HTML5 localstorage.
*   `logout`: logs a user out.  Stores the token in browser HTML5 localstorage.
*   `register`: registers a new user with the provided email and password, the mininum requirements for creating a new user in LoopBack.

{% include code-caption.html content="js/services/auth.js" %} 
```js
angular
  .module('app')
  .factory('AuthService', ['Reviewer', '$q', '$rootScope', function(User, $q,
    $rootScope) {
    function login(email, password) {
      return User
        .login({
          email: email,
          password: password
        })
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email
          };
        });
    }

    function logout() {
      return User
        .logout()
        .$promise
        .then(function() {
          $rootScope.currentUser = null;
        });
    }

    function register(email, password) {
      return User
        .create({
          email: email,
          password: password
        })
        .$promise;
    }
    return {
      login: login,
      logout: logout,
      register: register
    };
  }]);
```

### Views

The `client/views` directory contains seven "partial" view templates loaded by `client/index.html` using the [ngView](https://docs.angularjs.org/api/ngRoute/directive/ngView) directive  A "partial" is a segment of a template in its own HTML file. 

The [table above](#state-summary) describes how the views correspond to states and controllers.

## Run the application

Now you can run the Coffee Shop Reviews application:

```
$ node .
...
Browse your REST API at http://0.0.0.0:3000/explorer
Web server listening at: http://0.0.0.0:3000/
> models created sucessfully
```

Now load [http://0.0.0.0:3000/client/](http://0.0.0.0:3000/client/) in your browser.  You should see the application home page:

{% include image.html file="5570658.png" alt="" %}

You should be able to run the application through its paces, as described in [Introducing the Coffee Shop Reviews app](Introducing-the-Coffee-Shop-Reviews-app.html).

{% include next.html content="See [Learn more](Learn-more.html) for pointers to learn more about LoopBack."
%}
