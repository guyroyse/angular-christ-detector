var app = angular.module('antichristDetectorApp', []);

app.controller('DetectorController', function($scope, $http) {

  $http.get('/detect/Bob Villa').success(function(data) {
    $scope.detection = data.detection;
  });

});
