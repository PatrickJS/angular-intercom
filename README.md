# angular-intercom [![Build Status](https://travis-ci.org/gdi2290/angular-intercom.png?branch=master)](https://travis-ci.org/gdi2290/angular-intercom)
An Angular.js wrapper for Intercom.io


#How do I add this to my project?
You can download angular-intercom by:

* (prefered) Using bower and running `bower install angular-intercom --save`
* Using npm and running `npm install angular-intercom --save`
* Downloading it manually by clicking [here to download development unminified version](https://raw.github.com/gdi2290/angular-intercom/master/angular-intercom.js)


````html
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.js"></script>
<script src="app/bower_components/angular-intercom/angular-intercom.js"></script>

<script>
  angular.module('YOUR_APP', [
    'ngIntercom', // or you can use 'angular-intercom'
    'controllers'
  ]);
</script>

````
