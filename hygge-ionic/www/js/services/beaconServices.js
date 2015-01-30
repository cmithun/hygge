angular.module('hygge.beaconServices', ['ionic'])

.service('sharedProperties', function() {
    var mapView = {
        "floor" : "",
        "x" : "",
        "y" : ""
    };
    
    return {
        getFloor: function() {
            return mapView.floor;
        },
        setFloor: function(value) {
            mapView.floor = value;
        },
        getX: function() {
            return mapView.x;
        },
        setX: function(value) {
            mapView.x = value;
        },
        getY: function() {
            return mapView;
        },
        setY: function(value) {
            mapView.y = value;
        }
    }
})

.factory('BeaconPollingService', ['Restangular', 'RootRestangular', '$location', '$http', '$q', '$route', '$window', 'webStorage', function($ionicPlatform, $q){
    function storeBeacons(beacons) {
        webStorage.session.add('Journal_user_token', token);
        webStorage.session.add('Journal_user_email', email);
    }    
    var service = {
        start: function() {
          var user_creds = {'email': email, 'password': password}
          return $http.post('http://localhost:3000/login.json', user_creds)
          .success(function(response, status, headers, config) {
            service.currentUser = response.user;

            if (service.isNewlyAuthenticated()) {
              storeSession(service.currentUser.auth_token, service.currentUser.email, service.currentUser.csrf_token);
            }
          })
          .error(function(response, status, headers, config) {
          });
        },

        stop: function(redirectTo) {
          var headers = { 'X-API-TOKEN': webStorage.session.get('Journal_user_token') };
          $http({
              url: 'http://localhost:3000/logout.json', 
              method: "POST",
              headers: headers})
            .then(function() {
              service.currentUser = null;
              deleteSession();
              redirect();
          });
        },

        register: function(email, password, confirm_password) {
          return baseUsers.post({email: email, password: password, confirm_password: confirm_password})
          .then(function(user) {
            service.currentUser = user;
            if (service.isNewlyAuthenticated()) {
              $location.path('/');
            }
          });
        },

        requestCurrentUser: function() {
          if (service.isNewlyAuthenticated()) {
            return $q.when(service.currentUser);
          } else {
            return $http.get('/current_user').then(function(response) {
              service.currentUser = response.data.user;
              return service.currentUser;
            });
          }
        },

        currentAppUser: getUser(),

        getBeacons: function() {
          return (!!service.beacons);
        }
      };

  return service;
}])

.factory('beaconScan', function ($ionicPlatform, $q) {
  var beacons = [];

  // Mock data for console UI debug
  if (!window.cordova) {
    console.log("No Cordova! Defaulting to hard-coded beacon list.");
    beacons = [{
      uuid: '113F44CF-4850-4891-B48C-0E5A337DF580',
      major: 13,
      minor: 1,
      proximity: 'Near',
      accuracy: 2,
      rssi: 0
    },{
      uuid: '113F44CF-4850-4891-B48C-0E5A337DF580',
      major: 13,
      minor: 2,
      proximity: 'Far',
      accuracy: 5,
      rssi: 0
    }];
  }
  else {
    $ionicPlatform.ready(function() {

      var delegate = new cordova.plugins.locationManager.Delegate();

      // delegate.didDetermineStateForRegion = function (pluginResult) {
      //   console.log('[DOM] didDetermineStateForRegion: '+ JSON.stringify(pluginResult));
      // };
      //
      // delegate.didStartMonitoringForRegion = function (pluginResult) {
      //   console.log('didStartMonitoringForRegion:', pluginResult);
      // };

      var emptyScanTries = 5;

      delegate.didRangeBeaconsInRegion = function (pluginResult) {
        //console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
        //console.log('pluginResult Beacons: ' + JSON.stringify(pluginResult.beacons));
        var beaconResult = pluginResult.beacons || [];

        if (beaconResult.length == 0 && emptyScanTries > 0){
          emptyScanTries--;
        }else{
          emptyScanTries = 5;
          beacons = beaconResult;
        }
        //console.log("BEACONRESULT: " + JSON.stringify(beaconResult));
        console.log("BEACONS: " + JSON.stringify(beacons));
      };

      var identifier = '0';
      var uuid = '113F44CF-4850-4891-B48C-0E5A337DF580';
      var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);

      cordova.plugins.locationManager.setDelegate(delegate);

      cordova.plugins.locationManager.requestWhenInUseAuthorization();

      cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(console.error)
        .done();
    });
  }

  // Return beacon data to controllers
  return {
    all: function () {
      //console.log('*return all*: ' + beacons);
      return beacons;
    }
  };

});