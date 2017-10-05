var app = angular.module('myApp', ['ngRoute','ngResource']);

app.config(function($routeProvider) {
  $routeProvider

  .when('/login', {
    templateUrl : '/login.html',
    controller  : 'loginController'
  })

  .when('/blog', {
    templateUrl : 'blog.html',
    controller  : 'BlogController'
  })

  .when('/about', {
    templateUrl : 'about.html',
    controller  : 'AboutController'
  })

  .otherwise({redirectTo: '/'});
});

app.controller('loginController', function($scope) {
  $scope.message = 'Hello from HomeController';
});

app.controller('BlogController', function($scope) {
  $scope.message = 'Hello from BlogController';
});

app.controller('AboutController', function($scope) {
  $scope.message = 'Hello from AboutController';
});
