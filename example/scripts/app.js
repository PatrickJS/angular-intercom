angular.module('intercomApp', [
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      template: '/views/main',
      controller: 'MainCtrl'
    });
})
