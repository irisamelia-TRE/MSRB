(function () {
    angular
        .module('Main')
        .controller('formController', formController);

    function formController($location, $http, $rootScope, $scope, $uibModal) {
        var idCounter = 1;
        var model = this;

        model.createNewJob = createNewJob;
        model.saveJob = saveJob;
        model.deleteJob = deleteJob;
        model.setJobForEdit = setJobForEdit;

        model.doneAddingJobs = doneAddingJobs;
        model.submitData = submitData;

        model.getEmployeeInfo = getEmployeeInfo;

        init();

        function createNewJob() {
            model.data.job = {};
        }

        function isValidJob(job) {
            if (job.groupNumber === undefined) {
                return false;
            }
            return true;
        }

        function saveJob(job) {
            if(!isValidJob(job)) {
                return;
            }

            if(!job.id) {
                job.id = idCounter++;
                addToJobsAndCopy(job);
            } else {
                updateJob(job);
            }

            model.data.job = {};
        }

        function updateJob(job) {
            for(var i = 0;  i < model.data.jobs.length; i++) {
                if(model.data.jobs[i] && model.data.jobs[i].id === job.id) {
                    model.data.jobs[i] = job;
                }
            }
            updateJobsCopy();
            model.data.job = {};
        }

        function addToJobsAndCopy(job) {
            model.data.jobs.push(job);
            updateJobsCopy();
        }

        function setJobForEdit(job) {
            model.data.job = {
                'id': job.id,
                'name': job.name,
                'groupNumber': job.groupNumber,
                'startDate': job.startDate,
                'endDate': job.endDate
            };
        }

        function deleteJob(jobId) {
            for(var i = 0;  i < model.data.jobs.length; i++) {
                if(model.data.jobs[i] && model.data.jobs[i].id === jobId) {
                    model.data.jobs.splice(i, 1)[0];
                }
            }
            updateJobsCopy();
            model.data.job = {};
        }

        function doneAddingJobs() {
            model.data.job = model.data.jobs[model.data.jobs.length - 1];
            $location.url('/calculate/c');
        }

        function updateJobsCopy() {
            model.data.jobsCopy = angular.copy(model.data.jobs);
        }

        function submitData() {
            var formattedJobs = completeJobs(model.data.jobs);

            var dataModel = {
                "birthDate": truncateToDateString(model.data.birthDate),
                "isVeteran": model.data.isVeteran,
                "highestAverageSalary": model.data.highestAverageSalary,
                "beneficiaryBirthDate": model.data.beneficiaryBirthDate ? truncateToDateString(model.data.beneficiaryBirthDate) : null,
                "employments": formattedJobs
            };

            if (filterValidDates(dataModel.employments, dataModel.birthDate) === 0) {
                model.error = undefined;
                $http.post("/calculate", dataModel)
                    .then(function (response) {
                        model.error = null;
                        model.answered.optionAAllowance = response.data.optionAAllowance.toFixed(2);
                        model.answered.optionAAllowanceMonth = (response.data.optionAAllowance / 12).toFixed(2);
                        model.answered.optionBAllowance = response.data.optionBAllowance.toFixed(2);
                        model.answered.optionBAllowanceMonth = (response.data.optionBAllowance / 12).toFixed(2);

                        if (response.data.optionCAllowance) {
                            model.answered.optionCAllowance = response.data.optionCAllowance.toFixed(2);
                            model.answered.optionCAllowanceMonth = (response.data.optionCAllowance / 12).toFixed(2);
                            model.answered.beneficiaryYearlyAllowance = (model.answered.optionCAllowance / 3 * 2).toFixed(2);
                            model.answered.beneficiaryMonthlyAllowance = (model.answered.beneficiaryYearlyAllowance / 12).toFixed(2);
                        }
                        $location.url('/calculate/final');
                    }, function (error) {
                        console.log(error);
                        if (status === 404) {
                            model.error = "Page Not Found, Try Again Later"
                        } else {
                            model.error = error.data;
                        }
                    });
            } else {
                model.error = "Invalid Dates, Please check your Birthday and Job Dates";
            }
        }

        function filterValidDates(loe, birthday) {
            return loe.filter(function (e) {return e.startDate < birthday && e.endDate < birthday}).length;
        }

        function getEmployeeInfo(employeeId) {
            $http.post("/getEmployee", employeeId)
                .then(function(response) {
                   var employeeInfo = response.data;

                    populateBasicData(employeeInfo);
                    populateJobs(employeeInfo.list_of_employment);
                    model.data.beneficiaryBirthDate =
                        employeeInfo.beneficiary_dob ?
                        parseDateString(employeeInfo.beneficiary_dob) : null;

                    $location.url("/calculate/check");
                });
        }

        function populateBasicData(employeeInfo) {
            model.data.firstName = employeeInfo.first_name;
            model.data.lastName = employeeInfo.last_name;
            model.data.birthDate = parseDateString(employeeInfo.dob);
            model.data.isVeteran = employeeInfo.veteran_status.toString();
            model.isThreeYear = findStartDate(employeeInfo.list_of_employment) < parseDateString("2012-04-12");
            model.data.highestAverageSalary = employeeInfo.highest_pay;
        }

        function findStartDate(employments) {
            var earliestDate = parseDateString("10000-01-01");
            for(var i = 0; i < employments.length; i++) {
                var curEmployment = employments[i];
                var curEmploymentDate = parseDateString(curEmployment.start_date);
                if(curEmploymentDate < earliestDate) {
                    earliestDate = curEmploymentDate;
                }
            }
            return earliestDate;
        }

        function populateJobs(employments) {
            var idCounter = 1;
            model.data.jobs = [];
            for(var i = 0; i < employments.length; i++) {
                var curEmployment = employments[i];
                model.data.jobs.push({
                                         'id': idCounter,
                                         'name': "Job " + (idCounter++),
                                         'groupNumber': curEmployment.group_classification.toString(),
                                         'startDate': parseDateString(curEmployment.start_date),
                                         'endDate': parseDateString(curEmployment.end_date)
                                     });
            }
            updateJobsCopy();
        }

        function parseDateString(dateString) {
            var dateArray = dateString.split("-");
            var year = dateArray[0];
            var month = dateArray[1] - 1;
            var day = dateArray[2];

            var resultDate = new Date();
            resultDate.setHours(0,0,0,0);
            resultDate.setFullYear(year);
            resultDate.setMonth(month);
            resultDate.setDate(day);

            return resultDate;
        }

        function completeJobs(jobs) {
            return jobs.map(function (job) {
                return {
                    "startDate":truncateToDateString(job.startDate),
                    "endDate":truncateToDateString(job.endDate),
                    "groupNumber": job.groupNumber}
            });
        }

        function padToTwoDigits(n) {
            return n < 10 ? '0' + n : '' + n;
        }

        function truncateToDateString(d) {
            d = new Date(d);
            return d.getFullYear() + "-" + padToTwoDigits(d.getMonth() + 1) + "-" + padToTwoDigits(d.getDate());
        }

        function init() {
            $rootScope.agreedToDisclaimer = false;
            $scope.$on('$routeChangeStart', updateJobsCopy);

            model.data = {
                job: {},
                jobs: [],
                jobsCopy: []
            };
            model.answered = {};
            model.isThreeYear = 0;
            model.answer = 1;
            model.error = undefined;
        }


    }
})();