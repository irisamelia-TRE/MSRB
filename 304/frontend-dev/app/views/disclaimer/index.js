'use strict';

// declare disclaimer view module
angular.module('calculatorApp.disclaimerView', ['ngRoute'])
  // routes the /disclaimer path to its template and controller
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/disclaimer', {
      templateUrl: 'views/disclaimer/index.html',
      controller: 'DisclaimerCtrl'
    });
  }])
  // creates the controller for the disclaimer view
  .controller('DisclaimerCtrl', function ($scope, $location) {
    $scope.disclaimer = "I understand that the information and/or calculations displayed on this site do not necessarily reflect the actual amount of my retirement allowance. The results provided by this calculator are approximations and should not be considered as the final determination of my retirement benefit. They should not be relied upon for planning purposes.";
    $scope.go = function () {
      $location.path("form");
    };
  });
