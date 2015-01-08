angular.module('hygge.contextControllers', [])

.controller('ContextCtrl', function($scope, contextLocations) {

  $scope.locations = contextLocations.all();
  
});
