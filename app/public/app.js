(function() {

  'use strict';

  var app = angular.module('dangerZoneApp', ['ngResource']);

  app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://maps.google.com/**']);
  });

  app.controller('DangerZoneController', function($scope, $resource) {

    var Crimes = $resource('/crimes');
    $scope.inputType = 'auto';

    $scope.loaded = false;

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.lat = parseFloat(pos.coords.latitude.toFixed(4));
      $scope.long = parseFloat(pos.coords.longitude.toFixed(4));
      $scope.search($scope.lat, $scope.long, false);
    }, function() {}, {});

    $scope.search = function(lat, long, refresh) {
      $scope.mapLink = 'https://maps.google.com/maps?q=' + lat + ',' + long + '&output=embed';
      if (refresh) {
        var iframe = document.getElementById('map');
        iframe.src = iframe.src;
      }
      $scope.crimes = Crimes.query({ lat: lat, long: long }, function() {
        $scope.loaded = true;
      });
    }

  });

})();