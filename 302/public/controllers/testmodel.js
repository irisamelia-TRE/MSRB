describe('modelTest', function() {
  var calculatorService;
  var g1Data = {
    age_days: "30",
    age_month: "10",
    age_years: "1960",
    agreement: "true",
    before: false,
    compensation: 42000,
    group: "1",
    years: "30",
    months: "6",
    retire_day:"30",
    retire_month:"10",
    retire_year:"2027",
    veteran: "no",
    option_c: "58"
  };

  var g2Data = {
    age_days: "23",
    age_month: "4",
    age_years: "1970",
    agreement: "true",
    before: false,
    compensation: 30000,
    group: "2",
    years: "30",
    months: "6",
    retire_day:"23",
    retire_month:"4",
    retire_year:"2032",
    veteran: "no",
    option_c: "20"
  };
  var g4Data = {
    age_days: "10",
    age_month: "2",
    age_years: "1980",
    agreement: "true",
    before: false,
    compensation: 55000,
    group: "4",
    years: "30",
    months: "6",
    retire_day:"10",
    retire_month:"2",
    retire_year:"2037",
    veteran: "no",
    option_c: "73"
  };


var g1ErrAA = "You must be at least 60 years of age to qualify for Group 1";
var g2ErrAA = "You must be at least 55 years of age to qualify for Group 2";
var g4ErrAA = "You must be at least 50 years of age to qualify for Group 4";

var g1ErrBA = "You must be at least 55 years of age to qualify for Group 1";
var g2ErrBA = "You must be at least 55 years of age to qualify for Group 2";
var g4ErrBA = "You must be at least 45 years of age to qualify for Group 4";


  beforeEach(module('retirementCalculator', function ($provide) {
    productGroupFactory = jasmine.createSpyObj("productGroupFactory", ['save']);
    $provide.value('ProductGroupFactory', productGroupFactory);
  }));

  beforeEach(inject(function(_calculatorService_) {
    calculatorService = _calculatorService_;
  }));

  it('should exist', function() {
  expect(calculatorService).toBeDefined();
  });

  it('should test Group 1 age 67', function() {
    var data = Object.assign(g1Data);
    var answers = [32025 , 31064.25, 26420.62];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });
  it('should test Group 1 age 66', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2026";
    var answers = [30423.75 , 29511.04, 25403.83];

    var result = calculatorService.calculateData(g1Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });
  it('should test Group 1 age 80', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2040";
    data.months = 0;
    var answers = [31500 , 30555, 21577.5];

    var result = calculatorService.calculateData(g1Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });
  it('should test Group 1 age 60', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2020";
    data.months = 0;
    var answers = [20475 , 19860.75, 18325.13];

    var result = calculatorService.calculateData(g1Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 1 age 59', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2019";
    data.months = 0;

    var result = calculatorService.calculateData(g1Data);
    expect(result).toEqual(g1ErrAA);
  });

  it('should test Group 1 age 67', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2027";
    data.years = 7;
    data.months = 11;
    data.option_c = 58;
    var answers = [8312.5 , 8063.13, 6857.81];

    var result = calculatorService.calculateData(g1Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 1 age 66', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2026";
    data.years = 7;
    data.months = 11;
    var answers = [7813.75, 7579.34, 6524.48];

    var result = calculatorService.calculateData(g1Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 1 age 80 after April', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2040";
    data.years = 7;
    data.months = 11;
    var answers = [8312.5 , 8063.13, 5694.06];

    var result = calculatorService.calculateData(g1Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 1 age 60', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2020";
    data.years = 7;
    data.months = 11;
    var answers = [4821.25 , 4676.61, 4315.02];

    var result = calculatorService.calculateData(g1Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 1 age 59', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2019";
    data.years = 7;
    data.months = 11;

    var result = calculatorService.calculateData(g1Data);
    expect(result).toEqual(g1ErrAA);
  });

  it('should test Group 1 age 65 Before', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2025";
    data.years = 7;
    data.months = 11;
    data.before = "true";
    var answers = [8312.5, 8063.13, 7024.06];

    var result = calculatorService.calculateData(g1Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 1 age 64 Before', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2024";
    data.years = 7;
    data.months = 11;
    data.before = "true";
    var answers = [7980, 7740.6,6822.9];

    var result = calculatorService.calculateData(g1Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 1 age 68 Before', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2028";
    data.years = 7;
    data.months = 11;
    data.before = "true";
    var answers = [8312.5, 8063.13, 6774.69];

    var result = calculatorService.calculateData(g1Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });
  it('should test Group 1 age 55 Before', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2015";
    data.years = 7;
    data.months = 11;
    data.before = "true";
    var answers = [4987.5, 4837.88, 4563.56];

    var result = calculatorService.calculateData(g1Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });
  it('should test Group 1 age 54 Before', function() {
    var data = Object.assign(g1Data);
    data.retire_year = "2014";
    data.years = 7;
    data.months = 11;
    data.before = "true";

    var result = calculatorService.calculateData(g1Data);
    expect(result).toEqual(g1ErrBA);
  });



// GROUP 2 Tests
  it('should test Group 2 age 62', function() {

    var answers = [22875 ,22188.75, 16470];

    var result = calculatorService.calculateData(g2Data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 2 age 61', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2031";
    var answers = [21731.25 , 21079.31, 15755.16];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 2 age 67', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2045";
    data.months = 0;
    var answers = [22500, 21825, 14625];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 2 age 55', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2025";
    data.months = 0;
    var answers = [14625, 14186.25, 11041.88];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 2 age 54', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2024";

    var result = calculatorService.calculateData(data);
      expect(result).toEqual(g2ErrAA);
  });

  it('should test Group 2 age 62', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2032";
    data.months = 0;
    data.years = 10
    var answers = [7500, 7275, 5400];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });
  it('should test Group 2 age 62', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2031";
    data.years = 10;
    data.months = 0;
    var answers = [7050, 6838.5, 5111.25];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });
  it('should test Group 2 age 75', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2045";
    data.months = 0;
    data.years = 10;
    var answers = [7500, 7275, 4875];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });
  it('should test Group 2 age 55', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2025";
    data.months = 0;
    data.years = 10;
    var answers = [4350, 4219.5, 3284.25];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 2 age 54', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2024";
    data.months = 0;
    data.years = 10;
    var answers = [4350, 4219.5, 3284.25];

    var result = calculatorService.calculateData(data);
      expect(result).toEqual(g2ErrAA)
  });

  it('should test Group 2 age 60 before April', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2030";
    data.months = 0;
    data.years = 10;
    data.before = "true";
    var answers = [7500, 7275, 5475];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });
  it('should test Group 2 age 59 before April', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2029";
    data.months = 0;
    data.years = 10;
    data.before = "true";
    var answers = [7200, 6984, 5292];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });
  it('should test Group 2 age 75 before April', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2045";
    data.months = 0;
    data.years = 10;
    data.before = "true";
    var answers = [7500, 7275, 4875];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 2 age 55 before April', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2025";
    data.months = 0;
    data.years = 10;
    data.before = "true";
    var answers = [6000, 5820, 4530];

    var result = calculatorService.calculateData(data);
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).toEqual(answers[i]);
    }
  });

  it('should test Group 2 age 54 before April', function() {
    var data = Object.assign(g2Data);
    data.retire_year = "2024";
    data.months = 0;
    data.years = 10;
    data.before = "true";

    var result = calculatorService.calculateData(data);
      expect(result).toEqual(g2ErrBA);
  });

//GROUP 4
it('should test Group 4 age 57', function() {
  var data = Object.assign(g4Data);
  var answers = [41937.5, 40679.38, 32501.56];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});

it('should test Group 4 age 56', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2036";
  var answers = [39840.63, 38645.41, 30478.08];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});
it('should test Group 4 age 66', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2046";
  data.months = 0;
  var answers = [41250, 40012.5, 33618.75];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});
it('should test Group 4 age 50', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2030";
  data.months = 0;
  var answers = [26812.5, 26008.13, 19707.19];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});

it('should test Group 4 age 48', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2028";
  data.months = 0;

  var result = calculatorService.calculateData(data);
    expect(result).toEqual(g4ErrAA);
});

it('should test Group 4 age 57', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2037";
  data.months = 3;
  data.years = 20;
  var answers = [27843.75, 27008.44, 21578.91];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});
it('should test Group 4 age 56', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2036";
  data.months = 3;
  data.years = 20;
  var answers = [26173.12, 25387.93, 20022.44];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});

it('should test Group 4 age 66', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2046";
  data.months = 3;
  data.years = 20;
  var answers = [27843.75, 27008.44, 22692.66];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});


it('should test Group 4 age 50', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2030";
  data.months = 3;
  data.years = 20;
  var answers = [16149.38, 15664.89, 11869.79];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});

it('should test Group 4 age 48', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2028";
  data.months = 3;
  data.years = 20;

  var result = calculatorService.calculateData(data);
    expect(result).toEqual(g4ErrAA);
});

it('should test Group 4 age 55 before April', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2035";
  data.months = 3;
  data.years = 20;
  data.before = "true";
  var answers = [27843.75, 27008.44, 21161.25];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});

it('should test Group 4 age 54 before April', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2034";
  data.months = 3;
  data.years = 20;
  data.before = "true";
  var answers = [26730, 25928.1, 20181.15];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});

it('should test Group 4 age 63 before April', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2043";
  data.months = 3;
  data.years = 20;
  data.before = "true";
  var answers = [27843.75, 27008.44, 22275];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});

it('should test Group 4 age 45 before April', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2025";
  data.months = 3;
  data.years = 20;
  data.before = "true";
  var answers = [17820, 17285.4, 12741.3];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});

it('should test Group 4 age 44 before April', function() {
  var data = Object.assign(g4Data);
  data.retire_year = "2024";
  data.months = 3;
  data.years = 20;
  data.before = "true";

  var result = calculatorService.calculateData(data);
    expect(result).toEqual(g4ErrBA);
});



//OTHER

it('should test Veteran Status', function() {
  var data = {
    age_days: "6",
    age_month: "6",
    age_years: "1990",
    agreement: "true",
    before: false,
    compensation: 60000,
    group: "2",
    years: "40",
    months: "11",
    retire_day:"6",
    retire_month:"6",
    retire_year:"2045",
    veteran: "yes",
    option_c: "39"
  };
  var answers = [40193.75, 38996.94, 34209.69];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});

it('should test over 80%', function() {
  var data = {
    age_days: "6",
    age_month: "6",
    age_years: "1990",
    agreement: "true",
    before: false,
    compensation: 60000,
    group: "2",
    years: "40",
    months: "11",
    retire_day:"6",
    retire_month:"6",
    retire_year:"2052",
    veteran: "no",
    option_c: "39"
  };
  var answers = [48000, 46560, 39120];

  var result = calculatorService.calculateData(data);
  for (var i = 0; i < result.length; i++) {
    expect(result[i]).toEqual(answers[i]);
  }
});






});
