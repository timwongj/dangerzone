(function() {

  'use strict';

  var app = angular.module('dangerZoneApp', ['ngResource']);

  app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://maps.google.com/**']);
  });

  app.controller('DangerZoneController', function($scope, $resource, $http) {

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
      $http.get('https://apis.solarialabs.com/shine/v1/total-home-scores/reports', {
        params: {
          apikey: '7q4owDuo4dGQLG796GGkDIP3eeCzS5vo',
          lat: lat,
          lon: long
        }}).then(function(response) {
        $scope.safetyRating = response.data.totalHomeScores.safety.value.toFixed(2);
      });
    };

  });

})();