angular.module('hygge.contextServices', ['ionic'])

.factory('contextLocations', function ($ionicPlatform, $http, $resource) {

  // var locations = [];
  //
  // // Mock data for console UI debug
  // if (window.cordova) {
  //   locations = [{
  //     major: 13,
  //     minor: 1,
  //     floor: 13,
  //     x: 50,
  //     y: 50,
  //     message: 'test beacon 1'
  //   },{
  //     major: 13,
  //     minor: 2,
  //     floor: 13,
  //     x: 100,
  //     y: 100,
  //     message: 'test beacon 2'
  //   }];
  // }
  // else {
  //   $http.get("http://mithun-46828.azurewebsites.net/beaconsjson/?json=1")
  //     .success(function(data, status, headers, config){
  //       console.log('Success', status);
  //     })
  //     .error(function(data, status, headers, config){
  //       console.log('Error', status);
  //     })
  //     .then(function(response){
  //       var jsonData = response.data;
  //       console.log(jsonData);
  //     });
  //
  // }
  //
  // // Return context data to controllers
  // return {
  //   all: function () {
  //     return locations;
  //   }
  // };

  return $resource('http://private-bbb5a-contextapi.apiary-mock.com/context');

});
