angular.module('hygge.beaconServices', ['ionic'])

.factory('beaconScan', function ($ionicPlatform, $log) {

  var region = '113F44CF-4850-4891-B48C-0E5A337DF580';
  var beacons = {};

  // Mock data for console UI debug
  if (!window.cordova) {
    beacons = [{
      uuid: '113F44CF-4850-4891-B48C-0E5A337DF580',
      major: 13,
      minor: 1,
      proximity: 0,
      accuracy: 0,
      rssi: 0
    },{
      uuid: '113F44CF-4850-4891-B48C-0E5A337DF580',
      major: 13,
      minor: 2,
      proximity: 0,
      accuracy: 0,
      rssi: 0
    }];
  }

  // Cordova Plugin calls
  $ionicPlatform.ready(function() {

    if (window.cordova) {

      window.locationManager = cordova.plugins.locationManager;
      console.log('init locationManager');

      var delegate = new locationManager.Delegate();
      console.log('init delegate');

      // Called continuously when ranging beacons.
      delegate.didRangeBeaconsInRegion = function(pluginResult)
      {
        console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
        for (var i in pluginResult.beacons )
        {
          // Insert beacon into table of found beacons.
          var beacon = pluginResult.beacons[i];
          beacon.timeStamp = Date.now();
          var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
          beacons[key] = beacon;
        }
      };

      locationManager.setDelegate(delegate);
      console.log('setDelegate');

      locationManager.requestAlwaysAuthorization();
      console.log('Request iOS Auth');

      locationManager.startRangingBeaconsInRegion(region)
        .fail(console.error)
        .done();

    }

  });

  // Return beacon data to controllers
  return {
    all: function () {
      return beacons;
    }
  };

});
