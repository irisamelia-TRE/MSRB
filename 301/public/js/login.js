$(document).ready(function() {
  localStorage = window.localStorage;

    //Upon clicking login, get all information about the user for the output page
    $('#btn--login').click(function() {
      var userSsn = $("input[name=ssn]").val();
      getUser(userSsn)
    });

    //Upon clicking submit on anticipated date of retirment for login users input page,
    //set to local storage
    $('#btn--adr').click(function() {
      var userADR = $("input[name=adr]").val();

      if (userADR.length > 0 ) {
      localStorage.setItem('adr', userADR);
      window.location.href='output.html';
    } else {
        $('#error-adr').show();
    }
    });

    //Upon clicking submit on anticipated date of retirment for login users input page,
    //set to local storage
    $('#btn--agree').click(function() {
      var userAgree = $("input[name=agree]").is(':checked');
      if (userAgree) {
        localStorage.setItem('agree', 'true');
        window.location.href='login-adr.html';
      } else {
        $('#error-agree').show();
      }

    });

    //Get all neccessary information about users from api endpoint
    function getUser(ssn) {
      userUrl = '/api/users/' + ssn;
      $.get(userUrl)
        .done(function (body) {
          const person = jQuery.parseJSON(JSON.stringify(body));
          const employments = person.employments;
          const numEmployments = employments.length;
          var group = 1;
          var serviceStartDate = new Date();

          //Get values from each employment
          var totalYearsEmployment = 0;
          var totalSalary = 0;
          for(i=0; i < numEmployments; i++) {

            //Calculate Total Number Months/Years of Employment from
            var employmentStart = new Date(employments[i].startDate);
            var endDate = employments[i].endDate;
            var groupNum = employments[i].groupClassification;
            var startDate = new Date(employments[i].startDate);

            //Calculate Group Number
            if (groupNum > group) {
              group = groupNum;
            }

            //Check Earliest Start Dates
            if (startDate < serviceStartDate) {
              serviceStartDate = startDate;
            }

            //Check End Dates
            if(endDate != '') {
              var employmentEnd = new Date(employments[i].endDate);
            } else {
              var employmentEnd = new Date();
            }
            var monthDifference = monthDiff(employmentStart, employmentEnd);
            var yearDifference = monthDifference / 12;
            totalYearsEmployment += yearDifference;

            //Calculate Total Salary across all employments
            salary = employments[i].salary;
            totalSalary += salary;
          }

          //Calculate Average Salary across all employments
          var averageSalary = totalSalary / numEmployments;

          //Calulate User DOB in correct information
          var myDOB = new Date(person.dob);
          var userDOB = myDOB.getFullYear() + '-' + ('0' + (myDOB.getMonth()+1)).slice(-2) + '-' + ('0' + myDOB.getDate()).slice(-2);

          //Calculate Beneficiary DOB in correct format
          if (person.beneficiaryDOB != null) {
            var myDate = new Date(person.beneficiaryDOB);
            var benDOB = myDate.getFullYear() + '-' + ('0' + (myDate.getMonth()+1)).slice(-2) + '-' + ('0' + myDate.getDate()).slice(-2);
          }


          //Calculate Service Start Date in correct information
          var myStartDate = serviceStartDate.getFullYear() + '-' + ('0' + (serviceStartDate.getMonth()+1)).slice(-2) + '-' + ('0' + serviceStartDate.getDate()).slice(-2);

          //Set Items in Local Storage
          localStorage.setItem('ssd', myStartDate);
          localStorage.setItem('eys', totalYearsEmployment);
          localStorage.setItem('arc', averageSalary);
          localStorage.setItem('oc-date', benDOB);
          localStorage.setItem('dob', userDOB);
          localStorage.setItem('group', group);

          window.location.href='login-agree.html';

          //ADD YOS


        })
        .fail(function(error, status) {
          $('#error').show();
        })
    }

    //Calculate the difference in month between two dates
    function monthDiff(d1, d2) {
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth() + 1;
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    }

});
