angular.module('hygge.contextServices', ['ionic'])

.factory('contextLocations', function ($ionicPlatform) {

  var locations = [];

  // Mock data for console UI debug
  if (!window.cordova) {
    locations = [{
      major: 13,
      minor: 1,
      floor: 13,
      x: 50,
      y: 50,
      message: 'test beacon 1'
    },{
      major: 13,
      minor: 2,
      floor: 13,
      x: 100,
      y: 100,
      message: 'test beacon 2'
    }];
  }

  // Return context data to controllers
  return {
    all: function () {
      return locations;
    }
  };
});
