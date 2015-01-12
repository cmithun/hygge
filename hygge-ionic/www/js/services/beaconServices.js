angular.module('hygge.beaconServices', ['ionic'])

.factory('beaconScan', function ($ionicPlatform, $q) {

  var beacons = [];

  // Mock data for console UI debug
  if (!window.cordova) {
    console.log("No Cordova! Defaulting to hard-coded beacon list.");
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
        console.log("BEACONRESULT: " + JSON.stringify(beaconResult));
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
