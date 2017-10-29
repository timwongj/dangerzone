(function() {

  'use strict';

  var app = angular.module('dangerZoneApp', []);

  app.controller('DangerZoneController', function($scope) {

    $scope.title = 'heh HEH';
    $scope.message = 'don\'t trigger me cha!';

  });

})();