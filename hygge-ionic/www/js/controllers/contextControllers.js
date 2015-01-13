angular.module('hygge.contextControllers', ['ngResource'])

.controller('ContextCtrl', function($scope, contextLocations) {

  //$scope.locations = contextLocations.query();
  $scope.locations = contextLocations.all();
  //$scope.getLocation = function(major, minor){ return contextLocations.get(major, minor);}
});
