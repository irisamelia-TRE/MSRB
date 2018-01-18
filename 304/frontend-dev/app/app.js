'use strict';
/* Helpers */

// merge properties of obj2 into obj1
function merge(obj1, obj2) {
  for (var attrname in obj2) {
    obj1[attrname] = obj2[attrname];
  }
  return obj1;
};

// Declare app level module which depends on views, and components
angular.module('calculatorApp', [
  'ngRoute',
  'calculatorApp.disclaimerView',
  'calculatorApp.formView',
  'calculatorApp.resultsView'
])
  // sets app-level configurations
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    // use hashbang routing
    $locationProvider.hashPrefix('!');
    // set default view to disclaimer
    $routeProvider.otherwise({
      redirectTo: '/disclaimer'
    });
  }])
  // creates a service which saves retirement calculator estimates (A, B, C)
  .service("UserResults", function () {
    var user = {};
    return {
      getProperty: function () {
        return user;
      },
      setProperty: function (value) {
        user = value;
      }
    }
  })
  // creates a service which saves user information, such as DOB, etc.
  .service("UserData", function () {
    var user = {};
    return {
      getProperty: function () {
        return user;
      },
      setProperty: function (value) {
        user = value;
      }
    }
  });
