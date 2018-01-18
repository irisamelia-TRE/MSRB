(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("retirementCalculator")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/calculator.view.client.html",
                controller: "calculatorController",
                controllerAs: "model"
            });
    }
})();