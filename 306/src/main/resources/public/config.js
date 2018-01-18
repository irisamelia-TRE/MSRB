(function () {
    angular
        .module('Main')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html'
            })
            .when('/calculate/basic', {
                templateUrl: 'views/form-basic.html',
                resolve: {
                    check: didAgreeDisclaimer
                }
            })
            .when('/calculate/job', {
                templateUrl: 'views/form-job-1.html',
                resolve: {
                    check: didAgreeDisclaimer
                }
            })
            .when('/calculate/c', {
                templateUrl: 'views/option-c.html',
                resolve: {
                    check: didAgreeDisclaimer
                }
            })
            .when('/calculate/job/c', {
                templateUrl: 'views/form-option-c.html',
                resolve: {
                    check: didAgreeDisclaimer
                }
            })
            .when('/calculate/check', {
                templateUrl: 'views/check-forms.html',
                resolve: {
                    check: didAgreeDisclaimer
                }
            })
            .when('/calculate/final', {
                templateUrl: 'views/final.html',
                resolve: {
                    check: didAgreeDisclaimer
                }
            });
    }

    function didAgreeDisclaimer($rootScope, $location) {
        if(!$rootScope.agreedToDisclaimer) {
            $location.url("/");
        }
        return $rootScope.agreedToDisclaimer;
    }

})();