;(function(module, angular, undefined) {
'use strict';

angular.module('ngIntercom', ['angular-intercom']);

module.provider('Intercom', function() {

  this.$get = ['$window', 'IntercomSettings', function($window, IntercomSettings) {
      var _options = {};
      var _intercom = $window.Intercom;

      angular.extend(_options, IntercomSettings);

      return {
        boot: function(options) {
          _intercom('boot', _options);
        },
        update: function(data) {
          if (data) _intercom('update', data);
          else _intercom('update')
        },
        shutdown: function() {
          _intercom('shutdown')
        },
        hide: function() {
          _intercom('hide');
        },
        show: function() {
          _intercom('Show');
        }
      }
  }]; // end $get
})

}(angular.module('angular-intercom',[]), angular));
