(function () {
    angular
        .module("retirementCalculator")
        .controller("calculatorController", calculatorController);

    // A dummy service has been added and can be referenced for API requests using the EXPRESS library
    function calculatorController(calculatorService) {
        var model = this;
        // our main method for handling user input and output to the visual HTML
        model.calculate = calculate;
        // model values similar to a scope used to initialize the state of potential error messages.
        model.veteran_check = veteran_check;
        model.change_display_month = change_display_month;
        model.change_display_group = change_display_group;
        model.change_months_served = change_months_served;
        model.change_months_age = change_months_age;
        // a default value for the calculator to use when initialized, which is set with a user input
        var beforeApril = true;

        // Initializing the calculator fields, including the arrays used in NG-repeat for more compact code
        // and some default values to render the input and dropdown strings, due to the Mayflower library utilizing
        // direct changes to the dom.
        function init() {
            model.array = [];
            model.days_month = [];
            for (var i = 0; i < 60; i++) {
                model.array.push(i);
            }
            for (var j = 0; j < 31; j++) {
                model.days_month.push(j);
            }
            model.display_month = "Month";
            model.veteran_display = "Veteran?";
            model.display_group = "Group Class";
            model.months_served = "Months Served";
            var nullString = "Please enter values above to estimate";
            model.display_months_age = "Month";
            model.fund_A = nullString;
            model.fund_B = nullString;
            model.fund_C = nullString;
            model.fund_A_month = nullString;
            model.fund_B_month = nullString;
            model.fund_C_month = nullString;
        }

        init();

        // A function to reflect the string select in the dropdown when selected
        // in accordance with how the Mayflower library handles new values.
        function change_months_served(data) {
            var month = data.months;
            if (month == "") {
                model.months_served = "Months Served";
            } else {
                model.months_served = data.months;
            }
        }

        // A function to reflect the string select in the dropdown when selected
        // in accordance with how the Mayflower library handles new values.
        function change_display_group(data) {
            var group = data.group;
            switch (group) {
                case "1":
                    model.display_group = "Group 1";
                    break;
                case "2":
                    model.display_group = "Group 2";
                    break;
                case "4":
                    model.display_group = "Group 4";
                    break;
                default:
                    model.display_group = "Group Class";
                    break;
            }
        }

        // A function to reflect the string select in the dropdown when selected
        // in accordance with how the Mayflower library handles new values.
        function change_months_age(data) {
            var month = data.age_month;
            switch (month) {
                case "1":
                    model.display_months_age = "January";
                    break;
                case "2":
                    model.display_months_age = "February";
                    break;
                case "3":
                    model.display_months_age = "March";
                    break;
                case "4":
                    model.display_months_age = "April";
                    break;
                case "5":
                    model.display_months_age = "May";
                    break;
                case "6":
                    model.display_months_age = "June";
                    break;
                case "7":
                    model.display_months_age = "July";
                    break;
                case "8":
                    model.display_months_age = "August";
                    break;
                case "9":
                    model.display_months_age = "September";
                    break;
                case "10":
                    model.display_months_age = "October";
                    break;
                case "11":
                    model.display_months_age = "November";
                    break;
                case "12":
                    model.display_months_age = "December";
                    break;
                default:
                    model.display_months_age = "Month";
            }
        }

        // A function to reflect the string select in the dropdown when selected
        // in accordance with how the Mayflower library handles new values.
        function change_display_month(data) {
            var month = data.retire_month;
            switch (month) {
                case "1":
                    model.display_month = "January";
                    break;
                case "2":
                    model.display_month = "February";
                    break;
                case "3":
                    model.display_month = "March";
                    break;
                case "4":
                    model.display_month = "April";
                    break;
                case "5":
                    model.display_month = "May";
                    break;
                case "6":
                    model.display_month = "June";
                    break;
                case "7":
                    model.display_month = "July";
                    break;
                case "8":
                    model.display_month = "August";
                    break;
                case "9":
                    model.display_month = "September";
                    break;
                case "10":
                    model.display_month = "October";
                    break;
                case "11":
                    model.display_month = "November";
                    break;
                case "12":
                    model.display_month = "December";
                    break;
                default:
                    model.display_month = "Month";
            }
        }

        // A function to reflect the string select in the dropdown when selected
        // in accordance with how the Mayflower library handles new values.
        function veteran_check(data) {
            if (data.veteran == "yes") {
                model.veteran_display = "Yes";
            } else {
                model.veteran_display = "No";
            }
        }

        // The actual calculation method, using the age factor.
        // Handles bad inputs, blank inputs, and invalid inputs.
        function calculate(data) {
            // If we hit any input error, we flag it, break and return, having displayed the user errors.
            var error_prompt = false;
            // User input checking
            if (!data.agreement) {
                model.agreement_error = true;
                window.scrollTo(0, 0);
                return;
            } else {
                model.agreement_error = null;
            }

            if (data.group == null) {
                model.group_error = true;
                error_prompt = true;
            } else {
                model.group_error = null;
            }

            if (data.compensation == null) {
                model.salary_error = true;
                error_prompt = true;
            } else {
                model.salary_error = null;
            }

            if (data.veteran == null) {
                model.veteran_error = true;
                error_prompt = true;
            } else {
                model.veteran_error = null;
            }

            if (!data.years || !data.months) {
                model.service_error = true;
                error_prompt = true;
            } else {
                model.service_error = null;
            }

            var DOB = new Date(data.age_years, data.age_month - 1, data.age_days, 0, 0, 0, 0);
            var retireAge = new Date(data.retire_year, data.retire_month - 1, data.retire_day, 0, 0, 0, 0);

            if (DOB == "Invalid Date") {
                model.DOB_error = true;
                error_prompt = true;
            }  else {
                model.DOB_error = null;
            }

            if (retireAge == "Invalid Date") {
                model.retire_error = true;
                error_prompt = true;
            }  else {
                model.retire_error = null;
            }

            if (error_prompt) {
                window.scrollTo(0, 0);
                return;
            }

            var options = calculatorService.calculateData(data);

            if (typeof options === 'string' || options instanceof String) {
                model.invalid_error = options;
                window.scrollTo(0, 0);
                return;
            } else {
                model.invalid_error = null;
            }

            // The calculations per type
            model.fund_A = options[0];
            model.fund_A_month = Math.round(model.fund_A / 12);

            model.fund_B = options[1];
            model.fund_B_month = Math.round(model.fund_B / 12);

            if (options[2] > 0) {
                model.fund_C = options[2];
                model.fund_C_month = (model.fund_C / 12).toFixed(2);

            } else {
                model.fund_C = "Please enter beneficiary age to estimate Option C";
                model.fund_C_month = "Please enter beneficiary age to estimate Option C";
            }

        }
    }
})();
