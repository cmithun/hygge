angular.module('hygge.contextControllers', [])

.controller('ContextCtrl', function($scope, contextLocations) {

  notesData = contextLocations.all();
  console.log(notesData);

});
