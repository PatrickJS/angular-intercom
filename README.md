# angular-intercom [![Build Status](https://travis-ci.org/gdi2290/angular-intercom.png?branch=master)](https://travis-ci.org/gdi2290/angular-intercom)
An Angular.js wrapper for Intercom.io


#How do I add this to my project?
You can download angular-intercom by:

* (prefered) Using bower and running `bower install angular-intercom --save`
* Using npm and running `npm install angular-intercom --save`
* Downloading it manually by clicking [here to download development unminified version](https://cdn.rawgit.com/gdi2290/angular-intercom/master/angular-intercom.js)


````html
<!-- I'm using angular 1.3 but any should work -->
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.js"></script>
<!-- include the script any way you like -->
<script src="app/bower_components/angular-intercom/angular-intercom.js"></script>

<script>
  angular.module('intercomApp', [
    'ngIntercom' // or you can use 'angular-intercom'
  ])
  .value('fakeUser', {
    email: 'john.doe@example.com',
    name: 'John Doe',
    created_at: 1234567890,
    user_id: '9876'
  })

  // inject your app_id anyway you like
  .constant('INTERCOM_APPID', 'd0idn8ii')


  .config(function($intercomProvider, INTERCOM_APPID) {
    $intercomProvider
      .asyncLoading(true) // you can include the script yourself or async load it
      .appID(INTERCOM_APPID); // either include your app id here or later on boot
  })
  .run(function($intercom, fakeUser) {
    $intercom.boot(fakeUser); // app_id not required if set in .config() block
  })
  .controller('MainCtrl', function($scope, $intercom, fakeUser) {

    $scope.user = fakeUser;

    // $on will trigger a safe $apply on $rootScope
    $intercom.$on('show', function() {
      $scope.showing = true; // currently Intercom onShow callback isn't working
    });
    $intercom.$on('hide', function() {
      $scope.showing = false;
    });

    $scope.show = function() {
      $intercom.show();
    };

    $scope.hide = function() {
      $intercom.hide();
    };

    $scope.update = function(user) {
      $intercom.update(user);
    };

  });

</script>
````



