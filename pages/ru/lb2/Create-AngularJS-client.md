---
title: "Создание клиентского AngularJS"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Create-AngularJS-client.html
summary:
---

{% include important.html content="
**Необходимое условие**:Установите StrongLoop, как описано в [Установка StrongLoop](Installing-StrongLoop.html).

**Рекомендации**: Прочитайте [Основные понятия LoopBack](LoopBack-core-concepts.html).
" %}

{% include note.html content="
Чтоб выполнить данный шаг, у вас должно быть базовое понимание [AngularJS](https://angularjs.org/).
" %}

LoopBack AngularJS SDK автоматически создает клиентский API, который позволяет вам вызывать ваш LoopBack Node API.

## Генерация lb-services.js

Для генерации Angular сервисов для LoopBack приложения, используйте инструмент командной строки AngularJS SDK `lb-ng`. В корневой директории проекта, введите следующую команду:

`$ lb-ng server/server.js client/js/services/lb-services.js`

Это команда создает `client/js/services/lb-services.js`.

## Получение других клиентских файлов

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Need to set up a release in the repo, where the client directory contains everything BUT lb-services.js, since they generate it themselves.</div>

Если выполнили все предыдущие шаги из [Введение в Coffee Shop Reviews приложение](-Coffee-Shop-Reviews-.html), то вы наверное уже клонировали себе репозиторий  loopback-getting-started-intermediate.  Если нет, то сделайте это сейчас.

Затем скопируйте `client` подпапку в папку вашего проекта:

```
$ git clone https://github.com/strongloop/loopback-getting-started-intermediate.git
$ cp -r loopback-getting-started-intermediate/client <your-app-dir>
```

Теперь давайте посмотрим на то, что теперь у вас есть в папке client:

*   `index.html`
*   **css** - стили
    *   `style.css`
*   **js** - JavaScript файлы приложения
    *   `app.js`
    *   **controllers** - AngularJS контролеры 
        *   `auth.js`
        *   `review.js`
    *   **services** - AngularJS сервисы
        *   `auth.js`
        *   `lb-services.js`
*   **vendor** - AngularJS библиотеки (зависимости)
    *   `angular-resource.js `

    *   `angular-ui-router.js `

    *   `angular.js`

*   **views** - HTML файлы
    *   `all-reviews.html `

    *   `forbidden.html  `

    *   `my-reviews.html  `

    *   `sign-up-form.html`

    *   `login.html  `

    *   `review-form.html `

    *   `sign-up-success.html`

Каждый файл и каталог кратко описан ниже.

### index.html

Файл `index.html` единственный файл в верхнем уровне папки `/client`, и определяет основную целевую страницу приложенияand.  Давайте откроем его в редакторе:

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

Просматривая файл вы можите увидеть ссылки на стили в папке `/css, файлы клиентского` JavaScript в папке `/vendor` и `/js`.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Do we need to go over the CSS file?</div>

### Основной клиентский JavaScript файл (app.js)

В `js/app.js` файле определяется конфигурация приложения.

**js/app.js**  

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

Строки 2 - 4 включают в себя зависимости приложения:  `ui.router `и `lbServices`.  Последний является сервисом AngularJS библиотеки который вы сгенерировали ранее используя `lb-ng`.

Строки 61 - 66 определения перехватчика, который вызывается когда происходит изменения состояния: если пользователь не авторизован его перенаправит на страницу с запретом.

Остальные строки определяют состояние приложения. Состоянием определяться какие страницы будут видны, когда пользователь будет переходить по URLs или нажмет на ссылку. Любое состояние для которого  `authenticate` является `true,` требует, чтоб вы авторизовались сначала. Если вы перейдете по одному из этих адресов непосредственно то вы увидите страницу с ошибкой запрета доступа (state = `forbidden`, url = `/forbidden)`. Каждый вызов `state()` задает шаблон  для состояния и контролера и вызывает проверку на требование авторизации.  

В следующей таблице приведены состояния и как они соответствуют контролерам, шаблонам и URL.

<table>
  <tbody>
    <tr>
      <th>Состояние</th>
      <th>URL</th>
      <th>Описнаие</th>
      <th>Контроллер</th>
      <th>Просмотр/ Шаблон</th>
      <th>Должен ли быть авторизованым?</th>
    </tr>
    <tr>
      <td>'add-review'</td>
      <td>
        <div style="width: 120px;">
          <p style="line-height: 1.4285715;"><span>/add-review</span></p>
        </div>
      </td>
      <td>Добавление отзыва.</td>
      <td>AddReviewController</td>
      <td>
        <div style="width: 120px;">
          <p><span>review-form.html</span></p>
        </div>
      </td>
      <td>Да</td>
    </tr>
    <tr>
      <td>'all-reviews'</td>
      <td>/all-reviews</td>
      <td>Список отзывов.</td>
      <td>AllReviewsController</td>
      <td>all-reviews.html</td>
      <td>Нет</td>
    </tr>
    <tr>
      <td>'edit-review'</td>
      <td>/edit-review/:id</td>
      <td>Редактирование выбранного отзыва</td>
      <td>EditReviewController</td>
      <td>review-form.html</td>
      <td><span>Да</span></td>
    </tr>
    <tr>
      <td>'delete-review'</td>
      <td>/delete-review/:id</td>
      <td>Удаление выбранного отзыва</td>
      <td><span>DeleteReviewController</span></td>
      <td>None</td>
      <td><span>Да</span></td>
    </tr>
    <tr>
      <td>'forbidden'</td>
      <td>/forbidden</td>
      <td>
        <p>Ошибка запрещенного URL.</p>
        <ul>
          <li>Уведомляет пользователя, что он не может выполнить данное действие</li>
          <li>Отображает ссылку на страницу входа в ситсему</li>
        </ul>
      </td>
      <td><span>EditReviewController</span></td>
      <td>forbidden.html</td>
      <td><span>Нет</span></td>
    </tr>
    <tr>
      <td>'login'</td>
      <td>/login</td>
      <td>
        <p>Авторизация</p>
        <p>Перенаправляет на страницу добавления отзыва после авторизации</p>
      </td>
      <td><span>AuthLoginController</span></td>
      <td>login.html</td>
      <td><span>Нет</span></td>
    </tr>
    <tr>
      <td>'logout'</td>
      <td>/logout</td>
      <td>
        <p>Выйти</p>
        <ul>
          <li>Уведомляет пользователя что он вышел из системы</li>
          <li>Отображает ссылку на страницу всех отзывов</li>
        </ul>
      </td>
      <td>AuthLogoutController</td>
      <td>Нет</td>
      <td><span>Нет</span></td>
    </tr>
    <tr>
      <td>'my-reviews'</td>
      <td>/my-reviews</td>
      <td>Список юзера который авторизовался</td>
      <td>MyReviewsController</td>
      <td>my-reviews.html</td>
      <td><span>Да</span></td>
    </tr>
    <tr>
      <td>'sign-up'</td>
      <td>/sign-up</td>
      <td>Регестрация</td>
      <td>SignUpController</td>
      <td>sign-up-form.html</td>
      <td><span>Нет</span></td>
    </tr>
    <tr>
      <td>'sign-up-success'</td>
      <td>/sign-up/success</td>
      <td>
        <p>Успешная регистрация.</p>
        <p>Отображает ссылку на страницу всех отзывов.</p>
      </td>
      <td>Нет</td>
      <td>sign-up-success.html</td>
      <td><span>Нет</span></td>
    </tr>
  </tbody>
</table>

### Контроллеры

ВAngular, контроллер  это функция JavaScript конструктора которая используется для усиления [Angular Scope](https://docs.angularjs.org/guide/scope).

Когда контролер подключен к DOM через директивы [ng-controller](https://docs.angularjs.org/api/ng/directive/ngController), Angular будет создавать новый Controller  объект, используя функцию конструктора. Новый дочерняя область (scope) будут доступны в виде инъекционного параметра функции конструктора `$scope`. Для получения более, see [Understanding Controllers](https://docs.angularjs.org/guide/controller) (AngularJS documentation).

`client/js/controllers папка содержит два файла которые определяют контролеры`: `auth.js и ``review.js`.

Контролер `auth.js обрабатывает регистрацию пользователей, авторизацию и выход`.  Когда пользователь входит в систему, в `currentUser` объект установлен в корневой области (scope).  Другие части приложения проверяют `currentUser` объект при выполнении действии.  Когда пользователь выходит, `currentUser объект разрушается`.

**js/controllers/auth.js**  

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

Другой файл, `review.js`, определяет контролеры для действий отзывов (review).

 Expand source

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

Следующая таблица описывает контроллеры, определенные в review.js.

<table>
  <tbody>
    <tr>
      <th>Контролеры</th>
      <th>Описание</th>
    </tr>
    <tr>
      <td>AllReviewsController</td>
      <td>Выполняет <code>Review.find() для получение отзывов</code>. Использует включаемый модуль для добавления coffeeShop и модели отзыва. &nbsp;Это возможно из-за связи определенной выше.</td>
    </tr>
    <tr>
      <td>AddReviewController</td>
      <td>
        <p>Кофейни заполняются с сервера при первой загрузке странице, через CoffeeShop.find() меню.</p>
        <p>Когда форма будет отправлена, мы создаем отзыв и изменяем страницу всех отзывов когда права позволяют.</p>
      </td>
    </tr>
    <tr>
      <td>DeleteReviewController</td>
      <td>Не отображает при соответствии этому состоянию, когда вызывается; соответствующий данному ID отзыв удаляется. &nbsp;ID находится в URL.</td>
    </tr>
    <tr>
      <td>EditReviewController</td>
      <td>
        <p>Похож на &nbsp;AddReviewController&nbsp;когда страница первый раз загружается. &nbsp;</p>
        <p>Приложение выполнит два запроса одновременно используя <span>$q, чтобы получить необходимые модели. С помощью этих модели мы получаем выпадающее меню с доступными кофейнями. После того, как приложение отображает кофейне в выпадающем списке, и выбирает кофейню ранее выбранную в первоначальном обзоре. Затем приложение компонует <code>coffeeShopId</code><span>&nbsp; с выбранной кофейней</span></span>.</p>
      </td>
    </tr>
    <tr>
      <td>MyReviewController</td>
      <td>
        <p>Как AllReviewsController, этот контроллер использует "<span>where</span>" фильтр, чтобы ограничить результирующий набор, основанный на publisherId, где publisherId определяется текущим вошедшим в систему пользователем. &nbsp;Затем он использует
          подключаемый фильтр включающий Coffeeshop и модель рецензент (<span>reviewer )</span>.</p>
      </td>
    </tr>
  </tbody>
</table>

### Сервисы

Anоgular _сервисы_ взаимозаменяемые объекты, которые соединены друг с другом с помощью [зависимых иньекций (DI)](https://docs.angularjs.org/guide/di). Вы можете воспользоваться сервисами чтоб организовать совместное использование кода посредством вашего приложения.

Папка `js/services` содержит две AngularJS сервис библиотеки: `auth.js` и `lb-services.js`.

Вы сгенерировали l`b-services.js` ранее, и это описано в  [Генерация lb-services.js](-AngularJS.html). 

Другой файл, auth.js, предоставляет простой интерфейс для механизмов аутентификации низкого уровня. Он использует модель  `Reviewer (`рецензент)  (которая расширяет базовую User модель ) и определяет следующие сервисы:

*   `login`: регистрирует пользователя в  inLoopback автоматически управляет ключом безопасности (authentication token), который хранится в локальном HTML5 хранилище  браузера.
*   `logout`: регистрирует выход пользователя.  Сохраняет ключ в локальном HTML5 хранилище браузера localstorage.
*   `register`: регистрирует нового пользователя с помощью прилагаемого email и пароля, с минимальными требованиями для создания нового пользователя LoopBack.

**js/services/auth.js**  Expand source

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

### Вид

Папка `client/views` содержит семь "partial" шаблонов для просмотра, которые `client/index.html` использует [ngView](https://docs.angularjs.org/api/ngRoute/directive/ngView) директиве. "partial" сегмент шаблона в самом файле HTML. 

Приведенная  [выше таблица](-AngularJS.html)  описывает, каким образом вид соответствует состояниям и контроллерам.
