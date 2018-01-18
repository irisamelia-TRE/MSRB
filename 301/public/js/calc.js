/*

dob: date of birth
ssd: service start date
adr: anticipated date of retirement
eys: estimated total # years of service
arc: annual regular compensation
group: 1, 2 or 4. Your position, occupation, and the duties you perform determine your group classifcation. The group classification applicable to your specific position at the time of retirement may be reviewed by the State Retirement Board for determination pursuant to its Group Classifcation Policy.
veteran: true/false
oc-date: option c birthdate


expected data format

{
	dob: Date
	ssd: Date
	adr: Date
	eys: Number
	arc: Number
	group: Number (1, 2 or 3)
	veteran: Boolean
	oc-date: Date
}

output:
{
	optionA: Number
 	optionB: Number
 	optionC: Number

*/

//final calculator output
function calculate(data) {
	var {dob, ssd, adr, eys, arc, group, veteran, ocDate} = data;
	if(eys < 0) {
		eys = 0;
	}

	var baseBenefit;

//calculate based on if users service start date was pre or post 2012
	if(ssd.getFullYear() > 2012) {
        baseBenefit = getBenefitRate(eys, dob, group)/100 * arc * eys;
	} else {
		if(ssd.getFullYear() == 2012) {
			if(ssd.getMonth() > 3) {
                baseBenefit = getBenefitRate(eys, dob, group)/100 * arc * eys;
			} else {
				if(ssd.getMonth() == 3) {
                    if(ssd.getDate() < 2) {
                        baseBenefit = getBenefitRatePre2012(eys, dob, group)/100 * arc * eys;
                    } else {
                        baseBenefit = getBenefitRate(eys, dob, group)/100 * arc * eys;
                    }
                } else {
                    baseBenefit = getBenefitRatePre2012(eys, dob, group)/100 * arc * eys;
				}
			}
		} else {
            baseBenefit = getBenefitRatePre2012(eys, dob, group)/100 * arc * eys;
		}
	}

	if(baseBenefit > arc) {
		baseBenefit = arc * .8;
	}

//Factor in if user was veteran
	var veteranEarnings = 0;
	if(veteran) {
		veteranEarnings = eys * 15;
		if(veteranEarnings > 300) {
			veteranEarnings = 300;
		}
	}

	//For Option A
	const optionA =  Number((baseBenefit + veteranEarnings).toFixed(2));
	//For Option B
	const optionB = optionA * (getOptionBenefitRate('B', dob) / 100);
	//For Option C
  const optionC = optionA * (getOptionBenefitRate('C', dob) / 100);

    return {
    	'optionA': parseInt(optionA),
		'optionB': parseInt(optionB),
		'optionC': parseInt(optionC)
    }
}

//Benefit rate chart for users who have worked for more than 30 years
const benefitRateChartLessThan30Years = {
	group1: {'60': 1.45, '61': 1.60, '62': 1.75, '63': 1.9, '64': 2.05, '65': 2.20, '66': 2.35, '67': 2.50},
	group2: {'55': 1.45, '56': 1.60, '57': 1.75, '58': 1.9, '59': 2.05, '60': 2.20, '61': 2.35, '62': 2.50},
	group4: {'50': 1.45, '51': 1.60, '52': 1.75, '53': 1.9, '54': 2.05, '55': 2.20, '56': 2.35, '57': 2.50}
};

//Benefit rate chart for users who have worked for more than 30 years
const benefitRateChartMoreThan30Years = {
	group1: {'60': 1.625, '61': 1.750, '62': 1.875, '63': 2.00, '64': 2.125, '65': 2.250, '66': 2.375, '67': 2.5},
	group2: {'55': 1.625, '56': 1.750, '57': 1.875, '58': 2.00, '59': 2.125, '60': 2.250, '61': 2.375, '62': 2.5},
	group4: {'50': 1.625, '51': 1.750, '52': 1.875, '53': 2.00, '54': 2.125, '55': 2.250, '56': 2.375, '57': 2.5}
};

//Benefit rate chart for users who began service before 2012
const benefitRateChartPre2012 = {
    group1: {
        '45': .05, '46': .06, '47': .07, '48': .08, '49': .09,
        '50': 1, '51': 1.1, '52': 1.2, '53': 1.3, '54': 1.4,
        '55': 1.5, '56': 1.6, '57': 1.7, '58': 1.8, '59': 1.9,
        '60': 2, '61': 2.1, '62': 2.2, '63': 2.3, '64': 2.4, '65': 2.5
    },
    group2: {
        '40': .05, '41': .06, '42': .07, '43': .08, '44': .09,
        '45': 1, '46': 1.1, '47': 1.2, '48': 1.3, '49': 1.4,
        '50': 1.5, '51': 1.6, '52': 1.7, '53': 1.8, '54': 1.9,
        '55': 2, '56': 2.1, '57': 2.2, '58': 2.3, '59': 2.4, '60': 2.5
    },
    group4: {
        '35': .05, '36': .06, '37': .07, '38': .08, '39': .09,
        '40': 1, '41': 1.1, '42': 1.2, '43': 1.3, '44': 1.4,
        '45': 1.5, '46': 1.6, '47': 1.7, '48': 1.8, '49': 1.9,
        '50': 2, '51': 2.1, '52': 2.2, '53': 2.3, '54': 2.4, '55': 2.5
    }

};

const beneficiaryRates = {
	optionB: {'50': 99, '60': 97, '70': 95},
	optionC: {'50': 94, '60': 89, '70': 86}
};

/*
Get Benefit Rate of a person based on age adn group number if post 2012
yos: years of service
dob: date of birth
*/
function getBenefitRate(yos, dob, group) {
	if(!yos || !dob || !group || yos < 0 || (group != 1 && group != 2 && group != 4)) {
	}
	var age = getAge(dob);

	if(group == 1 && age > 67) {
		age = 67;
	} else if(group == 1 && age < 60) {
		age = 60;
	}

	if(group == 2 && age > 62) {
		age = 62;
	} else if(group == 2 && age < 55) {
        age = 55;
    }

    if(group == 4 && age > 57) {
		age = 57;
	} else if(group == 4 && age > 50) {
        age = 50;
    }


	if(yos < 30) {
		return Number(benefitRateChartLessThan30Years['group' + group]['' + age]);
	} else {
		return Number(benefitRateChartMoreThan30Years['group' + group]['' + age]);
	}
}

//Get Benefit Rate of a person based on age adn group number if person started before 2012
function getBenefitRatePre2012(yos, dob, group) {
    if(!yos || !dob || !group || yos < 0 || (group != 1 && group != 2 && group != 4)) {

    }
    var age = getAge(dob);

    if(group == 1 && age > 65) {
        age = 65;
    } else if(group == 1 && age < 45) {
        age = 45;
    }

    if(group == 2 && age > 60) {
        age = 60;
    } else if(group == 2 && age < 40) {
        age = 40;
    }

    if(group == 4 && age > 55) {
        age = 55;
    } else if(group == 4 && age > 35) {
        age = 35;
    }


    return Number(benefitRateChartPre2012['group' + group]['' + age]);
}

//Calculate benefit rate for option C
function getOptionBenefitRate(option, dob) {
	var age = getAge(dob);
	if(age < 50) {
		age = 50;
	} else if(age > 70) {
		age = 70;
    }

    age = Math.ceil(age / 10) * 10;

	return Number(beneficiaryRates['option' + option]['' + age]);
}

//Calculate user age from birthday
function getAge(date) {
    var today = new Date();
    var birthDate = date;
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}
