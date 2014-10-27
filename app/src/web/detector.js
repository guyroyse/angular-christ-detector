var app = angular.module('antichristDetectorApp', []);

app.controller('DetectorController', function($scope, $http) {

  $scope.detect = function() {
    $http.get('/detect/' + $scope.enteredName).success(function(data) {
      $scope.detection = data.detection;
    });
  };

});
