!function(module, angular, undefined) {
  'use strict';

  angular.module('ngIntercom', ['angular-intercom']);

  module.value('IntercomSettings', {});

  module.provider('IntercomService', function() {
    var _asyncLoading = false;
    var _scriptUrl = '//static.intercomcdn.com/intercom.v1.js';

    this.asyncLoading = function(config) {
      _asyncLoading = config || _asyncLoading;
      return this;
    };

    this.scriptUrl = function(url) {
      _scriptUrl = url || _scriptUrl;
      return this;
    };

    // Create a script tag with moment as the source
    // and call our onScriptLoad callback when it
    // has been loaded
    function createScript($document, callback) {
      var scriptTag = $document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      scriptTag.src = _scriptUrl;
      scriptTag.onreadystatechange = function () {
        if (this.readyState === 'complete') {
          callback();
        }
      };
      // Set the callback to be run
      // after the scriptTag has loaded
      scriptTag.onload = callback;
      // Attach the script tag to the document body
      var s = $document.getElementsByTagName('body')[0];
      s.appendChild(scriptTag);
    }

    this.$get = ['$document', '$timeout', '$q', '$window',
      function($document, $timeout, $q, $window) {
      var deferred = $q.defer();
      var _intercom = angular.isFunction($window.Intercom) ? $window.Intercom : angular.noop;

      if (_asyncLoading) {
        // Load client in the browser
        var onScriptLoad = function(callback) {
          $timeout(function() {
            // Resolve the deferred promise
            // as the Intercom object on the window
            deferred.resolve($window.Intercom);
          });
        };
        createScript($document[0], onScriptLoad);
      }

      return (_asyncLoading) ? deferred.promise: _intercom;
    }];
  });

  module.provider('Intercom', function() {

    this.$get = ['IntercomService', 'IntercomSettings', function(IntercomService, IntercomSettings) {
        var _options = {};

        angular.extend(_options, IntercomSettings);

        return {
          boot: function(options) {
            if (IntercomService.then) {
              IntercomService.then(function(intercom) {
                intercom('boot', options || _options);
              });
            } else {
              IntercomService('boot', options || _options);
            }
          },
          update: function(data) {
            if (IntercomService.then) {
              IntercomService.then(function(intercom) {
                if (data) {
                  intercom('update', data) ;
                } else {
                  intercom('update');
                }
              });
            } else {
              if (data) {
                IntercomService('update', data);
              } else {
                IntercomService('update');
              }
            }

          },
          shutdown: function() {
            if (IntercomService.then) {
              IntercomService.then(function(intercom) {
                intercom('shutdown');
              });
            } else {
              IntercomService('shutdown');
            }

          },
          hide: function() {
            if (IntercomService.then) {
              IntercomService.then(function(intercom) {
                intercom('hide');
              });
            } else {
              IntercomService('hide');
            }

          },
          show: function() {
            if (IntercomService.then) {
              IntercomService.then(function(intercom) {
                intercom('show');
              });
            } else {
              IntercomService('Show');
            }
          }
        }; // end return
    }]; // end $get
  });

}(angular.module('angular-intercom',[]), angular);
