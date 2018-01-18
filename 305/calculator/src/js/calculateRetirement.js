/**
 * Computes the age factor
 *
 * @param {Integer} group - the entered group of the user
 * @param {Date} birthDate - the birth date if the user
 * @param {Date} startDate - the job start date
 * @param {Integer} serviceYears - the ammount of years at the job
 *
 * @return {Integer} the age factor as percentage
 * **/
function computeAgeFactor(group, birthDate, startDate, serviceYears) {
    let ageFactor = 1;
    const aprilSwitchDate = new Date('04/12/2012');
    const age = startDate.getFullYear() +
          serviceYears - birthDate.getFullYear();
    // accomidate for pre-april2012 age factors
    if (startDate < aprilSwitchDate) {
        if (group === 1) {
            if (age >= 55 && age <= 65) {
                ageFactor = 2.5 - .1 * (65-age);
            }
        } else if (group === 2) {
            if (age >= 55 && age <= 60) {
                ageFactor = 2.5 - .1 * (60-age);
            }
        } else if (group === 4) {
            if (age >= 45 && age <= 55) {
                ageFactor  = 2.5 - .1*(55-age);
            }
        }
    } else if (startDate >= aprilSwitchDate) { //post april2012
        if (group === 1) {
            if (age >= 60 && age <= 67) {
                ageFactor = 2.5 - .15 * (67-age);
            }
        } else if (group === 2) {
            if (age >= 55 && age <= 62) {
                ageFactor = 2.5 - .15 * (62-age);
            }
        } else if (group === 4) {
            if (age >= 50 && age <= 57) {
                ageFactor = 2.5 - .15 * (57-age);
            }
        }
    }
    // accomodate for people starting after 2012 with a long service time
    if (startDate >= aprilSwitchDate && serviceYears >= 30) {
        if (group === 1) {
            if (age >= 60 && age <= 67) {
                ageFactor = 2.5 - .125 * (67-age);
            }
        }
        if (group === 2) {
            if (age >= 55 && age <=62) {
                ageFactor = 2.5 - .15 * (62-age);
            }
        }
        if (group === 4) {
            if (age >= 50 && age <= 57) {
                ageFactor = 2.5 - .15 * (57-age);
            }
        }
    }
    return ageFactor / 100.0; // return the age factor as a percentage
}

/** Computes the annual retirement benefits from the group number, birth
   date, average salary, service years, and veteran status

   @param {Integer} group - the group number of the user
   @param {Date} birthDate - the birth date of the user
   @param {Date} startDate - the start date of the job
   @param {Integer} salaryAverage - the average salary of the job
   @param {Date} retirementDate - date the user retired from the job
   @param {Boolean} veteran - whether the user is a veteran or not

   @return {Integer} the calculated retirement benefits

   **/
function computeRetirementBenefits (group, birthDate, startDate,
    salaryAverage, retirementDate, veteran) {
    if (birthDate === null || startDate === null ||
        retirementDate === null || salaryAverage === null) {
        return null;
    }
    // calculate the service years
    const serviceYears = new Date(retirementDate).getFullYear() -
        new Date(startDate).getFullYear();

    // calculate raw annual benefit ageFactor * serviceYears * averageSalary
    const annualBenefit = computeAgeFactor(group, new Date(birthDate),
        new Date(startDate), serviceYears) * serviceYears * salaryAverage;

    // adjust for veteran benefit
    if (veteran) {
        return annualBenefit + 15 * serviceYears;
    } else {
        return annualBenefit;
    }
}

export {computeRetirementBenefits};
