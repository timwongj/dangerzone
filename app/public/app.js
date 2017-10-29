(function() {

  'use strict';

  var app = angular.module('dangerZoneApp', ['ngResource']);

  app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://maps.google.com/**']);
  });

  app.controller('DangerZoneController', function($scope, $resource, $sce) {

    var Crimes = $resource('/crimes');

    $scope.loaded = false;

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.lat = pos.coords.latitude;
      $scope.long = pos.coords.longitude;
      $scope.mapLink = 'https://maps.google.com/maps?q=' + $scope.lat + ',' + $scope.long + '&output=embed';
      $scope.crimes = Crimes.query({ lat: $scope.lat, long: $scope.long }, function() {
        $scope.loaded = true;
      });
    }, function() {}, {});

  });

})();