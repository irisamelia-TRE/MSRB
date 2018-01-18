(function () {
    angular
        .module("retirementCalculator")
        .factory("calculatorService", calculatorService);

    function calculatorService($http) {

        var api = {
            "retrieveInfo": retrieveInfo,
            "getAgeFactor": getAgeFactor,
            "calculateData": calculateData
        };

        return api;

        function retrieveInfo() {
            // url we want to send our request to
            return $http.post("");
        }

        function calculateData(data) {

          //Results for each Option
          var results = new Array(3);
          // Initializing the data into variables we can use from the user data passed to the controller
          var beforeApril = data.before == "true";
          var DOB = new Date(data.age_years, data.age_month - 1, data.age_days, 0, 0, 0, 0);
          var retireAge = new Date(data.retire_year, data.retire_month - 1, data.retire_day, 0, 0, 0, 0);
          var curAge = Math.abs(new Date(DOB.getTime() - retireAge.getTime()).getUTCFullYear() - 1970);
          var group = data.group;
          var yrsServed = parseFloat(data.years);
          var mnthsServed = parseFloat(data.months);
          var avgComp = data.compensation;
          var vet = data.veteran == "yes";
          var option_C = data.option_c;
          var timeServed = yrsServed + (mnthsServed / 12);
          var ageFact = getAgeFactor(curAge, group, timeServed, beforeApril);

          if (typeof ageFact === 'string' || ageFact instanceof String) {
              results = ageFact;
              return results;
          }

          var perc = ((((ageFact * timeServed) / 100) > .8) ? .8 : ((ageFact * timeServed) / 100));

          var optionA = perc * avgComp;
          var optionBLower = optionA * 0.95;
          var optionBUpper = optionA * 0.99;

          var optCDiffPercent = Math.abs((curAge - option_C) / 2);
          var optCDiff = 93;
          if(option_C <= 55){
              optCDiff = (93 - optCDiffPercent) / 100;
          } else if(option_C >= 70){
              optCDiff = (85 - optCDiffPercent) / 100;
          } else {
              optCDiff = ((optCDiff - Math.abs((curAge - 55) / 2)) - optCDiffPercent) / 100;
          }
          var vetPay = 0;

          if (vet) {
              vetPay = yrsServed * 15;
              if (vetPay > 300) {
                  vetPay = 300;
              }
          }
          //Option A
          results[0] = +((optionA + vetPay).toFixed(2));
          //Option B
          results[1] = +(((optionBLower + vetPay) + (optionBUpper + vetPay)) / 2).toFixed(2);
          //Option C
          if (option_C != null) {
            results[2] =+((optionA * optCDiff) + vetPay).toFixed(2);
          }
          return results;
        }


        function getAgeFactor(age, group, years, beforeApril) {
            var ageFact = 0;

            if (beforeApril == false && years >= 30) {
                if (group == "1") {
                    if (age >= 67) {
                        ageFact = 2.5;
                    } else if (age >= 60) {
                        ageFact = (age - 60) * .125 + 1.625;
                    } else {
                        ageFact = "You must be at least 60 years of age to qualify for Group 1";
                        return ageFact;
                    }
                } else if (group == "2") {
                    if (age >= 62) {
                        ageFact = 2.5;
                    } else if (age >= 55) {
                        ageFact = (age - 55) * .125 + 1.625;
                    } else {
                        ageFact = "You must be at least 55 years of age to qualify for Group 2";
                        return ageFact;
                    }
                } else {
                    if (age >= 57) {
                        ageFact = 2.5;
                    } else if (age >= 50) {
                        ageFact = (age - 50) * .125 + 1.625;
                    } else {
                        ageFact = "You must be at least 50 years of age to qualify for Group 4";
                        return ageFact;
                    }
                }
            }
            else if (beforeApril == false) {
                if (group == "1") {
                    if (age >= 67) {
                        ageFact = 2.5;
                    } else if (age >= 60) {
                        ageFact = (age - 60) * .15 + 1.45;
                    } else {
                        ageFact = "You must be at least 60 years of age to qualify for Group 1";
                        return ageFact;
                    }
                } else if (group == "2") {
                    if (age >= 62) {
                        ageFact = 2.5;
                    } else if (age >= 55) {
                        ageFact = (age - 55) * .15 + 1.45;
                    } else {
                        ageFact = "You must be at least 55 years of age to qualify for Group 2";
                        return ageFact;
                    }
                } else {
                    if (age >= 57) {
                        ageFact = 2.5;
                    } else if (age >= 50) {
                        ageFact = (age - 50) * .15 + 1.45;
                    } else {
                        ageFact = "You must be at least 50 years of age to qualify for Group 4";
                        return ageFact;
                    }
                }
            }
            else {
                if (group == "1") {
                    if (age >= 65) {
                        ageFact = 2.5;
                    } else if (age >= 55) {
                        ageFact = (age - 55) * .1 + 1.5;
                    } else {
                        ageFact = "You must be at least 55 years of age to qualify for Group 1";
                        return ageFact;
                    }
                } else if (group == "2") {
                    if (age >= 60) {
                        ageFact = 2.5;
                    } else if (age >= 55) {
                        ageFact = (age - 55) * .1 + 2.0;
                    } else {
                        ageFact = "You must be at least 55 years of age to qualify for Group 2";
                        return ageFact;
                    }
                } else {
                    if (age >= 55) {
                        ageFact = 2.5;
                    } else if (age >= 45) {
                        ageFact = (age - 45) * .1 + 1.5;
                    } else {
                        ageFact = "You must be at least 45 years of age to qualify for Group 4";
                        return ageFact;
                    }
                }
            }

            return ageFact;
        }
    }

})();
