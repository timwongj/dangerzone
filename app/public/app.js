(function() {

  'use strict';

  var app = angular.module('dangerZoneApp', ['ngResource']);

  app.controller('DangerZoneController', function($scope, $resource) {

    var Crimes = $resource('/crimes');

    $scope.loaded = false;

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.lat = pos.coords.latitude;
      $scope.long = pos.coords.longitude;
      $scope.crimes = Crimes.query({ lat: $scope.lat, long: $scope.long }, function() {
        $scope.loaded = true;
      });
    }, function() {}, {});

  });

})();