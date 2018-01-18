import RetirementCalculator from './calculations';

it('should work with group 2', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2045,
			day: 1,
			month: 1 // jan
		},
		birthDate: {
			year: 1988,
			day: 1,
			month: 1
		},
		
		beneficiaryAge: {
			years: 55,
			months: 3
		},
		fiveYearsCompensation: 123456,
		isVeteran: false,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 10,

		serviceMonths: 0,
		group: 2
	}


	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});

it('should work with group 4', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2045,
			day: 1,
			month: 1 // jan
		},
		birthDate: {
			year: 1988,
			day: 1,
			month: 1
		},
		
		beneficiaryAge: {
			years: 55,
			months: 3
		},
		fiveYearsCompensation: 123456,
		isVeteran: false,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 10,

		serviceMonths: 0,
		group: 4
	}

	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});

it('should work with group 2 with different dates', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2088,
			day: 2,
			month: 5 // jan
		},
		birthDate: {
			year: 2000,
			day: 4,
			month: 5
		},
		
		beneficiaryAge: {
			years: 70,
			months: 3
		},
		fiveYearsCompensation: 555555,
		isVeteran: false,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 10,

		serviceMonths: 0,
		group: 2
	}

	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});

it('should work with group 4 with different dates', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2088,
			day: 2,
			month: 5 // jan
		},
		birthDate: {
			year: 2000,
			day: 4,
			month: 5
		},
		
		beneficiaryAge: {
			years: 70,
			months: 3
		},
		fiveYearsCompensation: 555555,
		isVeteran: false,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 10,

		serviceMonths: 0,
		group: 4
	}

	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});

it('should work for veterans', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2088,
			day: 2,
			month: 5 // jan
		},
		birthDate: {
			year: 2000,
			day: 4,
			month: 5
		},
		
		beneficiaryAge: {
			years: 70,
			months: 3
		},
		fiveYearsCompensation: 555555,
		isVeteran: true,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 10,

		serviceMonths: 0,
		group: 4
	}

	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});

it('should work for veterans that have served for a while and are in group 4', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2088,
			day: 2,
			month: 5 // jan
		},
		birthDate: {
			year: 2000,
			day: 4,
			month: 5
		},
		
		beneficiaryAge: {
			years: 70,
			months: 3
		},
		fiveYearsCompensation: 80000,
		isVeteran: true,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 20,

		serviceMonths: 0,
		group: 4
	}

	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});


it('should work for veterans that have served for a while and are in group 2', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2088,
			day: 2,
			month: 5 // jan
		},
		birthDate: {
			year: 2000,
			day: 4,
			month: 5
		},
		
		beneficiaryAge: {
			years: 70,
			months: 3
		},
		fiveYearsCompensation: 90000,
		isVeteran: true,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 20,

		serviceMonths: 3,
		group: 2
	}

	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});

it('should work for veterans that have served for a while and have beneficiaries that are 50', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2015,
			day: 2,
			month: 5 // jan
		},
		birthDate: {
			year: 1950,
			day: 4,
			month: 5
		},
		
		beneficiaryAge: {
			years: 50,
			months: 8
		},
		fiveYearsCompensation: 60000,
		isVeteran: false,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 10,

		serviceMonths: 5,
		group: 2
	}

	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});


it('should work if service years is less than 10', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2015,
			day: 2,
			month: 5 // jan
		},
		birthDate: {
			year: 1950,
			day: 4,
			month: 5
		},
		
		beneficiaryAge: {
			years: 50,
			months: 8
		},
		fiveYearsCompensation: 60000,
		isVeteran: false,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 0,

		serviceMonths: 5,
		group: 2
	}

	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});


it('should work if service years is >= 30 and 36 < ya < 67 and group is 1', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2015,
			day: 2,
			month: 5 // jan
		},
		birthDate: {
			year: 1960,
			day: 4,
			month: 5
		},
		
		beneficiaryAge: {
			years: 50,
			months: 8
		},
		fiveYearsCompensation: 60000,
		isVeteran: true,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 30,

		serviceMonths: 5,
		group: 1
	}

	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});


it('should work if service years is >= 30 and 36 < ya < 67 and group is 2', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2015,
			day: 2,
			month: 5 // jan
		},
		birthDate: {
			year: 1960,
			day: 4,
			month: 5
		},
		
		beneficiaryAge: {
			years: 50,
			months: 8
		},
		fiveYearsCompensation: 60000,
		isVeteran: true,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 30,

		serviceMonths: 5,
		group: 2
	}

	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});


it('should work if service years is >= 30 and 36 < ya < 67 and group is 4', function() {
	
	let retirementCalculator = new RetirementCalculator()

	let config = {
		retirementDate: { // change this into a moment() instance
			year: 2015,
			day: 2,
			month: 5 // jan
		},
		birthDate: {
			year: 1960,
			day: 4,
			month: 5
		},
		
		beneficiaryAge: {
			years: 50,
			months: 8
		},
		fiveYearsCompensation: 60000,
		isVeteran: true,

		// Service years cannot be less than 10. This variable is used even if you weren't in the army. 
		serviceYears: 30,

		serviceMonths: 5,
		group: 4
	}

	let retVal  = retirementCalculator.computeForm(config)
	expect(retVal).toMatchSnapshot()

});