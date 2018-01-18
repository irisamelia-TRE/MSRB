'use strict';

// declare form view module
angular.module('calculatorApp.formView', ['ngRoute'])
  // routes the /form path to its template and controller
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/form', {
      templateUrl: 'views/form/index.html',
      controller: 'FormCtrl'
    });
  }])
  // creates the controller for the form view
  .controller('FormCtrl', function($scope, $http, $location, $window, UserData, UserResults) {
    $window.scrollTo(0, 0);
    var formInfo = {
      groupInfo: {
        "info": "Your position, occupation, and the duties you perform determine your group classification.",
        "group1": "Officials and general employees.",
        "group2": "Probation officers, court officers, certain correctional positions.",
        "group3": "State Police officers.",
        "group4": "Certain public safety officers and officials, correction officers, certain correction positions, parole officers and supervisors."
      },
      introText: "",
      tooltipText: "What is this?",
      formLabels: {
        "pre2012": "Did you enter service before April 2, 2012?",
        "dob": "Enter your date of birth",
        "dor": "Enter your projected date of retirement",
        "group": "Select your group classification",
        "vet": "Are you a military veteran?",
        "service": "Select your estimated total number of years of creditable service, including any purchased service or may be eligible to purchase, as of your projected date of retirement",
        "serviceInfo": "If you are a full-time employee, you will earn one year of creditable service for each year completed. For those employed on a less than full-time basis, you will earn an amount of service equal to a percentage of the full-time service rate. For example, if you are employed on a half-time basis you will receive 50% or 6-month service for each year completed.",
        "compensationPre2012": "Enter the estimated average of your highest 36 consecutive months of annual regular compensation.",
        "compensationPost2012": "Enter the estimated average of your highest 60 consecutive months of annual regular compensation.",
        "compensationInfo": "",
        "beneficiary": "When is your beneficiary's date of birth?",
        "beneficiaryInfo": "OPTIONAL: If you are interested in estimating your benefits under Option C, please select and enter Date of Birth. Reminder: Your Option C beneficiary must be your spouse, child, sibling, parent or former spouse who has not remarried."
      }
    }
    merge($scope, formInfo);

    var keys = Object.keys(UserData.getProperty());
    if (keys.length == 0) {
      $scope.user = {
        "dayOfBirth": null,
        "dayOfRetirement": null,
        "before2012": false,
        "groupNumber": 1,
        "salaryAverage": 0,
        "militaryVeteran": false,
        "monthsOfService": 0,
        "beneficiaryDoB": null,
        "ssn": "152-79-9476"
      }
    } else {
      $scope.user = UserData.getProperty();
      var dob = $scope.user.dayOfBirth;
      var dor = $scope.user.dayOfRetirement;
      $scope.dayOfBirth = new Date(dob[0], dob[1] - 1, dob[2]);
      $scope.dayOfRetirement = new Date(dor[0], dor[1] - 1, dor[2]);
      $scope.yearsOfService = Math.floor($scope.user.monthsOfService / 12);
      $scope.monthsOfService = $scope.user.monthsOfService % 12;
    }

    function clearError($el) {
      $el.removeClass('has-error');
      $el.prev('.ma__error-msg').removeClass('has-error');
    }

    $scope.submit = function($event) {
      var isValid = true;
      var inputs = $('form.ma__form-page input[type="date"],input[type="number"]');

      function addError($el) {
        $el.addClass('has-error');
        $el.prev('.ma__error-msg').addClass('has-error');
      }
      if ($('#calc-dor').val() < $('#calc-dob').val()) {
        isValid = false;
        $(`.ma__error-list__message.calc-dates`).show();
      } else {
        $(`.ma__error-list__message.calc-dates`).hide();
      }
      $.each(inputs, function(i, input) {
        $(`.ma__error-list__message.${input.id}`).hide();
        clearError($(input));
        if (input.type == "number") {
          if (Number($(input).val()) < 0) {
            $(input).addClass("ng-invalid");
          }
        }
        if ($(input).hasClass("ng-invalid")) {
          isValid = false;
          addError($(input));
          $(`.ma__error-list__message.${input.id}`).show();
        }
      });

      if (!isValid) {
        $('form .ma__error-list').show();
        $window.scrollTo(0, 0);
      } else {
        $('form .ma__error-list').hide();
        this.user.monthsOfService = parseInt(this.monthsOfService) + parseInt(this.yearsOfService) * 12;

        function getDate(date) {
          if (date) {
            return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
          } else {
            return null;
          }
        }
        this.user.dayOfBirth = getDate(this.dayOfBirth);
        this.user.dayOfRetirement = getDate(this.dayOfRetirement);
        this.user.beneficiaryDoB = getDate(this.beneficiaryDoB);
        var ssn = this.user.ssn;
        delete this.user.ssn;
        $http({
            method: 'POST',
            url: 'http://ec2-34-205-144-131.compute-1.amazonaws.com:8080/backend/calculate',
            headers: {
              'Content-Type': 'application/json'
            },
            data: this.user
          })
          .success(function(data, status, headers, config) {
            UserResults.setProperty(data.results);
            UserData.setProperty($scope.user);
            $location.path("results");
          })
          .error(function(data, status, header, config) {
            this.user.ssn = ssn;
            window.alert("Could not get pension results!");
          });
      }
    };

    $scope.getInfo = function() {
      $http({
          method: 'POST',
          url: 'http://ec2-34-205-144-131.compute-1.amazonaws.com:8080/backend/database',
          headers: {
            'Content-Type': 'application/json'
          },
          data: this.user
        })
        .success(function(data, status, headers, config) {
          $scope.user = data;
          var dob = data.dayOfBirth;
          var dor = data.dayOfRetirement;
          $scope.dayOfBirth = new Date(dob[0], dob[1] - 1, dob[2]);
          $scope.dayOfRetirement = new Date(dor[0], dor[1] - 1, dor[2]);
          $scope.yearsOfService = Math.floor(data.monthsOfService / 12);
          $scope.monthsOfService = data.monthsOfService % 12;
          var confirmation = $('#ssn_confirmation');
          confirmation.show();
          confirmation.css("display", "inline-block");
        })
        .error(function(data, status, header, config) {
          window.alert("Could not retrieve user information!");
        });
    }
  });
