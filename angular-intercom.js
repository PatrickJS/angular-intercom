!function(global, angular, undefined) {
  'use strict';


  function _capitalize_(string) {
    return (!string) ? '' : string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }

  // if intercom exist then reattach
  var intercom_exist = false;
  if (angular.isFunction(global.Intercom)) {
    global.Intercom('reattach_activator');
    global.Intercom('update', global.intercomSettings );
    intercom_exist = true;
  } else {
    // build Intercom for async loading
    var build_intercom = function() {
      build_intercom.c(arguments);
    };
    build_intercom.q = [];
    build_intercom.c = function(args) {
      build_intercom.q.push(args);
    };
    global.Intercom = build_intercom;
  }

  angular.module('angular-intercom', []);
  angular.module('ngIntercom', ['angular-intercom'])
  .value('IntercomSettings', {})
  .provider('$intercom', function() {

    var provider = this;
    var config = {
      'asyncLoading': false,
      'scriptUrl': 'https://widget.intercom.io/widget/',// <INSERT APP_ID HERE>
      'appID': '',
      'development': false
    };
    angular.forEach(config, function(val, key) {
      provider[key] = function(newValue) {
        config[key] = newValue || val;
        return provider;
      };
    });

    // Create a script tag with moment as the source
    // and call our onScriptLoad callback when it
    // has been loaded
    function createScript(url, appID) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = url+appID;
      // Attach the script tag to the document body
      var s = document.getElementsByTagName('head')[0];
      s.appendChild(script);
    }

    provider.$get = ['$rootScope', 'IntercomSettings', function($rootScope, IntercomSettings) {
      var _options = {};

      if (config.appID) {
        _options.app_id = _options.app_id || config.appID;
      }
      angular.extend(_options, IntercomSettings);

      if (intercom_exist) {
        global.Intercom('reattach_activator');
        global.Intercom('update', _options );
      }

      if (config.asyncLoading) {
        createScript(config.scriptUrl, config.appID);
      }


      function $intercom() {
        global.Intercom.apply(global.Intercom, arguments);
        return this;
      }

      var methods = {
        boot: function(options) {
          angular.extend(_options, options || {});
          if (!_options.app_id && config.appID) {
            _options.app_id = config.appID;
          }
          if (options.app_id && options.app_id !== _options.app_id) {
            _options.app_id = options.app_id;
          }
          global.Intercom('boot', _options);
          return $intercom;
        },
        update: function(data) {
          if (data) {
            if (!data.app_id && config.appID) {
              data.app_id = config.appID;
            }
            if (data.app_id && data.app_id !== config.app_id) {
              config.app_id = data.app_id;
            }
            global.Intercom('update', data);
          } else {
            global.Intercom('update');
          }
          console.log('update data', data);
          return $intercom;
        },
        trackEvent: function(eventName, data) {
          global.Intercom('trackEvent', eventName, data);
          return $intercom;
        },
        showMessages: function(data) {
          if (data) {
            global.Intercom('showMessages', data);
          } else {
            global.Intercom('showMessages');
          }
          return $intercom;
        },
        hideMessages: function() {
          global.Intercom('hideMessages');
          return $intercom;
        },
        shutdown: function() {
          global.Intercom('shutdown');
          return $intercom;
        },
        hide: function() {
          global.Intercom('hide');
          return $intercom;
        },
        show: function() {
          global.Intercom('show');
          return $intercom;
        },
        reattachActivator: function() {
          global.Intercom('reattach_activator');
          return $intercom;
        }
      };

      function buildMethod(func, method) {
        $intercom[method] = func;
        $intercom['$'+method] = function() {
          func.apply(global.Intercom, arguments);
          if (!$rootScope.$$phase) { $rootScope.$apply(); }
          return $intercom;
        };
      }

      angular.forEach(methods, buildMethod);

      var isEvent = {
        'show': true,
        'hide': true,
        'activatorClick': true
      };

      $intercom.$on = function(event, callback) {
        if (!isEvent[event]) { return; }
        global.Intercom('on'+_capitalize_(event), function() {
          console.log('on', event);
          if ($rootScope.$$phase) {
            callback();
          } else {
            $rootScope.$apply(callback);
          }
        });
        return $intercom;
      };

      $intercom.on = function(event, callback) {
        if (!isEvent[event]) { return; }
        global.Intercom('on'+_capitalize_(event), callback);
        return $intercom;
      };

      $intercom._extend = function(method) {
        if (!method) { return; }
        buildMethod(method, function() {
          var args = Array.prototype.slice.call(arguments);
          global.Intercom.apply(global.Intercom, args.unshift(method));
          return $intercom;
        });
      };

      return $intercom;
    }]; // end $get
  }) // end provider
  .factory('Intercom', ['$intercom', function($intercom) {
    return $intercom;
  }]);

  // Intercom's script break down
  /*
  (function(){
    // if intercom exist then reattach
    var _intercom = window.Intercom;
    if (typeof _intercom === "function" ) {
      _intercom('reattach_activator');
      _intercom('update', window.intercomSettings );
    } else {

      // build Intercom for async loading
      var intercom = function() {
        intercom.c(arguments);
      };
      intercom.q = [];
      intercom.c = function(args) {
        intercom.q.push(args);
      };
      window.Intercom = intercom;

      function listener() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src='https://widget.intercom.io/widget/<INSERT APP_ID HERE>';
        var $script = document.getElementsByTagName('script')[0];
        $script.parentNode.insertBefore(script, $script);
      }

      if (window.attachEvent) {
        window.attachEvent('onload',listener);
      } else {
        window.addEventListener('load',listener,false);
      }
    }
  })();
  */

}(this, angular);

