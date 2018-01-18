'use strict';

// declare results view module
angular.module('calculatorApp.resultsView', ['ngRoute'])
  // routes the /results path to its template and controller
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/results', {
      templateUrl: 'views/results/index.html',
      controller: 'ResultsCtrl'
    });
  }])
  // creates the controller for the results view
  .controller('ResultsCtrl', function ($scope, $location, $window, UserResults) {
    $window.scrollTo(0, 0);
    $scope.resultsInfo = "";
    $scope.optionsInfo = {
      "A": "Full retirement allowance, all benefits stop upon your death.",
      "B": "Reduced (1-5% less than Option A) retirement allowance, beneficiary receives lump sum payment of the balance of your annuity upon your death.",
      "C": "Reduced (approximately 7-15% less than Option A) retirement allowance. However, this reduction could be greater depending on the age difference between you and your beneficiary. Upon your death, your designated beneficiary will be paid a monthly allowance for the remainder of his or her life. The survivor benefit will be equal to two-thirds of the allowance that was being paid to you at the time of your death."
    };
    $scope.user = UserResults.getProperty();
    $scope.optionA = $scope.user[0];
    $scope.optionB = $scope.user[1];
    $scope.optionC = $scope.user[2];
    $scope.go = function () {
      $location.path("form");
    };
  });
