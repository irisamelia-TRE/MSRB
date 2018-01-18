
import aryC from './aryC';
import ARRY from './ARRY';
import plus30Yos from './plus30Yos';

const lessThan10YearsInService = 'You entered creditable service is less than 10, please check the benefit quide for more detail.';

class RetirementCalculator {

  error(msg) {
    if (!(typeof process) || process.env.NODE_ENV !== 'test') {
      console.error(msg);
    }
  }

  custRound(x, places) {
    return (Math.round(x * 10 ** places)) / 10 ** places;
  }

  CurrencyFormatted(amount) {
    let n = parseFloat(amount);
    if (isNaN(n)) {
      n = 0.00;
    }
    let minus = '';
    if (n < 0) {
      minus = '-';
    }
    n = Math.abs(n);
    n = parseInt((n + 0.005) * 100, 10);
    n /= 100;
    let s = new String(n);
    if (s.indexOf('.') < 0) {
      s += '.00';
    }
    if (s.indexOf('.') === (s.length - 2)) {
      s += '0';
    }
    s = minus + s;
    return s;
  } // funct

  CommaFormatted(amount) {
    const delimiter = ',';
    let a = amount.split('.', 2);
    const d = a[1];
    let i = parseInt(a[0], 10);
    if (isNaN(i)) {
      return '';
    }
    let minus = '';
    if (i < 0) {
      minus = '-';
    }
    i = Math.abs(i);
    let n = new String(i);
    a = [];
    while (n.length > 3) {
      const nn = n.substr(n.length - 3);
      a.unshift(nn);
      n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) {
      a.unshift(n);
    }
    n = a.join(delimiter);
    if (d.length < 1) {
      amount = n;
    } else {
      amount = `${n}.${d}`;
    }
    amount = minus + amount;
    return amount;
  } // function this.CommaFormatted()


  //Question 7. OPTIONAL: If you are interested in estimating your benefits under Option C, please select and enter Date of Birth or select your beneficiary's age on the birthdays that are closest to your date of retirement. Reminder: Your Option C beneficiary must be your spouse, child, sibling, parent or former spouse who has not remarried.
  //  or  Check here to calculate by Age

  // Calculate by AGE and months //Example rowC = ya = 36 , colC = BenefAge = 30
  //=============================================================================
  //getArrayOptionC(yaC6690.value, BenefAgeYY.value, BenefAgeMM.value, yaAdisplayonly.value)
  getArrayOptionC(rowCvar_yaC6690, colCvar_BenefAgeYY, colCMMvar_BenefAgeMM) {
    const retVal = {};

    let rowC = parseInt(rowCvar_yaC6690, 10);
    let colC = parseInt(colCvar_BenefAgeYY, 10);
    const colCMM = parseInt(colCMMvar_BenefAgeMM, 10);
    if (((rowC > 0) && (colC > 0)) || ((rowC > 0) && ((colC > 0) || (colCMM > 0)))) {
      if (colC < 0) { // negative number age

      } else if ((colC === 0) && (colCMM === 0)) { // both YY and MM is 0

      } else {
        //modified 6-15-2017
        if (colCMM >= 6) { // If month >= 6 then around to 1 year. Age 13 and 6 months then will = 14 (age)
          colC += 1;
        }
        if (colC > 90) {
          colC = 90;
        }
        if (rowC >= 1 && rowC <= 90) {
        } else if (rowC > 90) {
          rowC = 90;
        } else {
          rowC = 0;
        } //if ((rowC >= 6) && (rowC <=90)){

        //After 4/2/2012 beneficiary's age start from age 1 so no need to do the match just block the code ///colC = (colC - 5)
        // Change on 6-15-2017

        /**
         * Main formulas matrix
         * for hired after 04-02-2012
         ***/

        const benefAryCfactor = aryC[rowC].substr(((colC - 1) * 6) + 2, 6); //// Change on 6-15-2017
        //Example 1: Member's Age = 60(rowC), Beneficiary's Age = 1(colC)  then Factor = 0.8152  factor
        //rowC = 60  is the retiree Member's age. Excel Row# 60
        //colC = 1   is the beneficiary's age. Excel column#  1
        //Table look up: Row is 60, Column = 1. Factor is = 0.8152

        //Example 1 of the fomulas:  let benefAryCfactor = ary[60].substr((1-1)*6+2,6) = 0.8152
        //(Option C beneficiary's table at array age 60).(select six string from position 2 which is = 0.8152 factor)
        //ary[60].substr(((1-1)*6)+2, 6)=  ary[60].substr(2, 6)  = 0.8152  factor

        //Example 2: Member's Age = 60(rowC), Beneficiary's Age = 8(colC)  then Factor = 0.8173  factor
        //rowC = 60  is Retiree Member's age. Excel Row# 60
        //colC = 8   is Beneficiary's age. Excel column# 1
        //Table look up: Row is 60, Column = 8. Factor is = 0.8173
        //Example of the fomulas:  ary[60].substr((8-1)*6+2,6)
        //(Option C beneficiary's table at array age 60).(select six string from position 44 which is = 0.8173 factor)


        retVal.myResultOptionCfator = benefAryCfactor;

        if (colC >= 90) {
          colC += '+';
        }
        retVal.OptCbenfAge = colC;
      } //if (colC < 0)
    }//if ( ((rowC > 0) && (colC > 0)) || ( (rowC > 0) && ((colC > 0) || (colCMM > 0)) ) )

    return retVal;
  } //function getArrayOptionC(rowCvar_yaC6690, colCvar_BenefAgeYY, colCMMvar_BenefAgeMM, OptC_OptionA_yaA)


  //Option A factor calculation function(?,?,?,?)
  //Added on 6-13-2017 varYRofS
  f_calOptionA(OptA, varGroup, varVeteran, varYRofS) {
    //YRofS
    const YRofS = varYRofS;
    let ya = OptA;
    const varGroupmember = varGroup;
    if (ya >= 55 && varGroupmember === 2) {
      ya += 5; //add 5 years for option A group #2
    }
    if (ya >= 50 && varGroupmember === 4) {
      ya += 10; //add 10 years for option A group #4
    }

    if (ya >= 67) { //Change on 6/19/2017
      ya = 67; //Change on 6/19/2017
      return '0.025'; //Option A age factor array
    } else if (ya < 36) { //less than 36
      this.error('Sorry, your age entered is less than the minimum age of 36. Please check the date or the Benefit Guide for more details.');
      return null;
    }  // between age 36 and 67
    if (!isNaN(ya)) {
        // 5-30-2017
        // Substring 7 string after the age and Age factor Ex. Age 36 and 0.00000

        // if Year of Service YRofS >= 30 then use 2nd set of Array
      if (ya >= 50 && YRofS >= 30) { //Change on 6-13-2017
        if (varGroupmember === 1) {
          return plus30Yos.ARRY_30plusYOS_Group1[ya].substr(2, 7); // using Option A   ARRY = new Array(ya.value)
        } else if (varGroupmember === 2) {
          return plus30Yos.ARRY_30plusYOS_Group2[ya].substr(2, 7); // using Option A   ARRY = new Array(ya.value)
        } else if (varGroupmember === 4) {
          return plus30Yos.ARRY_30plusYOS_Group4[ya].substr(2, 7); // using Option A   ARRY = new Array(ya.value)
        }

        this.error(`Invalid group!${varGroupmember}`); // ryan added this
        return null;
      }

      return ARRY[ya].substr(2, 7); // using Option A   ARRY = new Array(ya.value)
         //end of if (ya >= 46 && YRofS >= 30){ //Change on 6-13-2017
    } //if (!isNaN(ya))

    this.error('ya is null?');
    return null;
     //if (ya >= 67){ //Change on 6/19/2017
  } //function f_calOptionA(OptA, varGroup, varVeteran, varYRofS){

  //Option C factor calculation function
  f_calOptionC(yrAforC, varGroup, OptC_ma) {
    let ya = yrAforC;
    let ma = OptC_ma;

    ma /= 12;
    ya = this.custRound((ya + ma), 0);
    if (ya >= 90) {
      ya = 90;
    }

    return ya;
  } //function f_calOptionC(yrAforC, varGroup, OptC_ma, OptC_OptionA_yaA)

  //===


  //function computeForm(form) { ===============================================================
  //Now put all the form values, functions and formulas to work
  computeForm(config) {
    const retVal = {};

    if ((config.retirementDate.year === '' || config.retirementDate.year.length === 0) ||
      (config.retirementDate.month === null || config.retirementDate.month.length === 0) ||
      (config.retirementDate.month === null || config.retirementDate.month === 0) ||
      (config.birthDate.year === '' || config.birthDate.year.length === 0) ||
      (config.birthDate.month === null || config.birthDate.month.length === 0)) {
      const error = 'Missing input values';
      this.error(error);
      return {
        error: error,
      };
    }

    //1) Enter your date of birth (mm/dd/yyyy)
    const yb = config.birthDate.year;
    const mb = config.birthDate.month;

    //2) Enter your projected date of retirement (mm/dd/yyyy)
    const yp = config.retirementDate.year;
    const mp = config.retirementDate.month;
    // Month length 0->use calendar length
    // 0 if Gregorian, 1 is Julian

    const ma = mp - mb; //retiree's age of month //WJL

    let ya = yp - yb; //7-1: This is Retiree's age in hidden Textbox: ya, ma, da

    //retiree's age of year //WJL

    const varVeteran = config.isVeteran;
    const varGroup = config.group;

    //Begin calculator formulas //////////////////////////////////////////////////
    /// SERVICE and VETERAN

    let YRofS = config.serviceYears; // 5) Enter your estimated total number of years of creditable service,
    let varyrserMM = config.serviceMonths;

    let vetbenefitperyear = 15; //$15 for each Mil. service until 20 yrs and add $300 after each yr
    let varYRofS;
    let varYRofSAddoneyear;

    // disabled the document set call here (ryan)
    if (YRofS >= 50 && varyrserMM >= 1) {
      varyrserMM = 0;
    }

    if (!varVeteran && ya >= 36) {
      varYRofS = YRofS;
      if (YRofS >= 10 && varyrserMM === 0) {

      } else if (YRofS >= 10 && varyrserMM >= 1) {
        YRofS = this.custRound((YRofS + (varyrserMM / 12)), 5);
      } else {
        this.error(lessThan10YearsInService);
        return {
          error: lessThan10YearsInService,
        };
      }

      retVal.creditableServiceYears = `${varYRofS}.${varyrserMM}`; // varyrserMM //varYRofS ; ///802 wjl

      retVal.veteranBonus = '0.00';
    }

    if (varVeteran && ya >= 36) {
      varYRofS = YRofS;
      if (varYRofS >= 10 && varyrserMM === 0) {
        if (varYRofS <= 20) {
          YRofS += varyrserMM;
          vetbenefitperyear *= YRofS;
        } else {
          YRofS += varyrserMM;
          vetbenefitperyear = 300;
        }
        retVal.veteranBonus = vetbenefitperyear;

        config.creditableServiceYears = `${varYRofS}.${varyrserMM}`;
      } else if (varYRofS >= 10 && varyrserMM >= 1) {
        YRofS = this.custRound((varYRofS + (varyrserMM / 12)), 5);
        varYRofSAddoneyear = varYRofS;
        if (varYRofS < 20) {
          varYRofSAddoneyear += 1;
          vetbenefitperyear *= varYRofSAddoneyear;
        } else {
          varYRofSAddoneyear = YRofS;
          vetbenefitperyear = 300;
        }
        retVal.veteranBonus = vetbenefitperyear;
        config.creditableServiceYears = `${varYRofS}.${varyrserMM}`;
      } else {
        this.error(lessThan10YearsInService);
        return {
          error: lessThan10YearsInService,
        };
      }
    } else {
      retVal.veteranBonus = 0;
    } //if ((varVeteran === "Yes") && (ya >= 36))
    // END OF SERVICE and VETERAN

    const OptA = ya;
    let ageFactor = this.f_calOptionA(OptA, varGroup, varVeteran, varYRofS); // Option A factor
    const OptC = ya;
    const OptC_ma = ma;
    const var_yaC6690 = this.f_calOptionC(OptC, varGroup, OptC_ma); // Option C factor

    const var_BenefAgeYY = config.beneficiaryAge.years;
    const var_BenefAgeMM = config.beneficiaryAge.months;
    const rowCvar_yaC6690 = var_yaC6690;
    const colCvar_BenefAgeYY = var_BenefAgeYY;
    const colCMMvar_BenefAgeMM = var_BenefAgeMM;

    //display alert
    const YRA = config.fiveYearsCompensation; // 4) Enter your highest 3-year salary average (Example: 30000 without '$' or ',')

    let i = ageFactor; // 1. Enter AgeFactor
    if (i > 1.0) {
      i /= 100.0;
      ageFactor = i;
    }

    //Percentage factor round to 2 decimal places
    const PF = this.custRound((i * YRofS), 5);

    //end of display alert

    let getArrayOptionCValues = {};

    if (((rowCvar_yaC6690 > 0) && (colCvar_BenefAgeYY > 0)) || ((rowCvar_yaC6690 > 0) && ((colCvar_BenefAgeYY > 0) || (colCMMvar_BenefAgeMM > 0)))) {
      getArrayOptionCValues = this.getArrayOptionC(rowCvar_yaC6690, colCvar_BenefAgeYY, colCMMvar_BenefAgeMM, ya);
    } else {
      const error = "could not get beneficiary's age, missing some values";
      this.error(error);
      return {
        error: error,
      };
    }
    // } //if (varR7q === varV1){

    const MaxPF = 0.80; // Yearly Benefit Amount if PF>=80% then use 80% only
    let Max_YRA; // for calculation Max Yearly Average
    let Max_YRATotal;

    //let optA; //for Option B
    let Max_YRAOptionB99; //for Option B
    let Max_YRAOptionBTotal; //for Option B

    let Max_YRAyOptionCfactor; // for Option C
    let Max_YRAOptionC; // for Option C

    let NonMax_YRA; // for Option A calculation Non Max Yearly Average
    let NonMax_YRAOptionB99; //for Option B
    let NonMax_YRA_Total; // for calculation Non Max Yearly Average
    let NonMax_YRAOptionBTotal; //for calculation Non Max Option B  Yearly Average total
    let PFparseFloat36;
    const varzerotext = '0';
    if (PF >= MaxPF) { // Option A PecentFactor reach to Maxium 80%
      //for Option A
      retVal.allowablePercentageOfSalaryAverage = `${0.80 * 100}%`;
      if (varVeteran) { // for Option A
        Max_YRA = (MaxPF * YRA); // for calculation (Ex. 0.20 * 10000.00 = 2000.00 )
        Max_YRATotal = (Max_YRA + vetbenefitperyear);
        //Line 5. = 3. x 4. for display on the AmountOptionA text field (Ex. $2,000.00)
      } else {
        Max_YRA = (MaxPF * YRA);
        Max_YRATotal = (MaxPF * YRA); // for calculation (0.80 * 10,000.00)
        //5. for display on the AmountOptionA text field
      } //if (varVeteran === "Yes"){// for Option A
      ///Max_YRA = (MaxPF * YRA); // for calculation (0.80 * 10,000.00)
      //for display on the AmountOptionA text field

      if (varyrserMM < 10) {
        varyrserMM = varzerotext + varyrserMM;
      }
      retVal.optionAAnnualAllowance = this.CommaFormatted(this.CurrencyFormatted(Max_YRATotal));


      //Option A Monthly Benefit Amount = (Max_YRA/12);
      // document.frmCal.MonthlyBenefit.value
      retVal.optionAMonthlyAllowance = this.CommaFormatted(this.CurrencyFormatted(Max_YRATotal / 12));

      //for Option B
      //Option B Pension Yearly
      //retVal.optionBAnnualAllowance = this.CommaFormatted(this.CurrencyFormatted(Max_YRATotal * 0.99));
      // yearofage => 50 and < 60  then .99 of option A
      // yearofage => 60 and <70   then .97 of option A
      // yearofage => 70 then .95 of option A
      if (varVeteran) { //for Option B
        Max_YRAOptionB99 = (Max_YRA * 0.99); // for calculation (Ex. 0.20 * 10000.00 = 2000.00 )
        Max_YRAOptionBTotal = (Max_YRAOptionB99 + vetbenefitperyear);
        //Line 5. = 3. x 4. for display on the AmountOptionA text field (Ex. $2,000.00)
      } else {
        Max_YRAOptionB99 = (Max_YRA * 0.99);
        Max_YRAOptionBTotal = (Max_YRA * 0.99); // for calculation (0.80 * 10,000.00)
        //5. for display on the AmountOptionA text field
      } //if (varVeteran === "Yes"){//for Option B
      retVal.optionBAnnualAllowance = this.CommaFormatted(this.CurrencyFormatted(Max_YRAOptionBTotal));
      //Option B txtOptionBmonthly
      retVal.optionBMonthlyAllowance = this.CommaFormatted(this.CurrencyFormatted((Max_YRAOptionBTotal) / 12));

      // for Option C
      const yOptionCfactor = getArrayOptionCValues.myResultOptionCfator; //Option C chart

      if (yOptionCfactor > 0 && yOptionCfactor <= 1) {
        if (varVeteran) { //for Option C
          Max_YRAOptionC = (Max_YRA * yOptionCfactor); // for calculation (Ex. 0.20 * 10000.00 = 2000.00 )
          Max_YRAyOptionCfactor = (Max_YRAOptionC + vetbenefitperyear);
          //Line 5. = 3. x 4. for display on the AmountOptionA text field (Ex. $2,000.00)
        } else {
          Max_YRAyOptionCfactor = (Max_YRA * yOptionCfactor); // for calculation (0.80 * 10,000.00)
          //5. for display on the AmountOptionA text field
        } //if (varVeteran === "Yes"){//for Option C
        retVal.optionCAnnualAllowance = this.CommaFormatted(this.CurrencyFormatted(Max_YRAyOptionCfactor)); // Yearly document.arrayForm.myResult2.value=MultiArray[row];
        retVal.optionCMonthlyAllowance = this.CommaFormatted(this.CurrencyFormatted((Max_YRAyOptionCfactor) / 12)); //monthly
        //2/3 of the Option C in yearly
        retVal.optionCBeneficiaryAnnualAllowance = this.CommaFormatted(this.CurrencyFormatted((Max_YRAyOptionCfactor * 2) / 3)); // 2/3 in Yearly
        //2/3 of the Option C in monthly
        retVal.beneficiaryMonthlyAllowance = this.CommaFormatted(this.CurrencyFormatted(((Max_YRAyOptionCfactor * 2) / 3) / 12)); // 2/3 in monthly
      }  //if (yOptionCfactor > 0 )
    } else if (ya >= 36) {
      // Lease than 80% PercentFactor
      // greater than and equal to 36
      PFparseFloat36 = parseFloat(PF);
      if (PFparseFloat36 < 1) {
        PFparseFloat36 = this.custRound(PFparseFloat36 * 100, 2); //WJL 2
      }
      retVal.allowablePercentageOfSalaryAverage = `${PFparseFloat36}%`;
      if (varVeteran) { // for Option A
        NonMax_YRA = (PF * YRA); // for calculation (Ex. 0.20 * 10000.00 = 2000.00 )
        NonMax_YRA_Total = (NonMax_YRA + vetbenefitperyear);
        //Line 5. = 3. x 4. for display on the AmountOptionA text field (Ex. $2,000.00)
      } else {
        NonMax_YRA = (PF * YRA); // for calculation (Ex. 0.20 * 10000.00 = 2000.00 )
        NonMax_YRA_Total = (PF * YRA); // for calculation (0.80 * 10,000.00)
        //5. for display on the AmountOptionA text field
      } //if (varVeteran === "Yes"){// for Option A

      if (varyrserMM < 10) {
        varyrserMM = varzerotext + varyrserMM;
      }
      //config.creditableServiceYears = (parseInt(YRofS) + "." + varyrserMM) // varyrserMM //varYRofS ; ///802 wjl
      retVal.optionAAnnualAllowance = this.CommaFormatted(this.CurrencyFormatted(NonMax_YRA_Total)); //WJL
      //Option A Monthly Benefit Amount = (Max_YRA/12);
      retVal.optionAMonthlyAllowance = this.CommaFormatted(this.CurrencyFormatted(NonMax_YRA_Total / 12));

      //for Option B
      //Option B Pension Yearly
      //retVal.optionBAnnualAllowance = this.CommaFormatted(this.CurrencyFormatted(Max_YRATotal * 0.99));
      // yearofage => 50 and < 60  then .99 of option A
      // yearofage => 60 and <70   then .97 of option A
      // yearofage => 70 then .95 of option A
      if (varVeteran) { //for Option B
        NonMax_YRAOptionB99 = NonMax_YRA * 0.99; // for calculation (Ex. 0.20 * 10000.00 = 2000.00 )
        NonMax_YRAOptionBTotal = NonMax_YRAOptionB99 + vetbenefitperyear;
        //Line 5. = 3. x 4. for display on the AmountOptionA text field (Ex. $2,000.00)
      } else {
        NonMax_YRAOptionB99 = NonMax_YRA * 0.99;
        NonMax_YRAOptionBTotal = NonMax_YRA * 0.99; // for calculation (0.80 * 10,000.00)
      } //if (varVeteran === "Yes"){//for Option B
      retVal.optionBAnnualAllowance = this.CommaFormatted(this.CurrencyFormatted(NonMax_YRAOptionBTotal));
      //Option B txtOptionBmonthly
      retVal.optionBMonthlyAllowance = this.CommaFormatted(this.CurrencyFormatted((NonMax_YRAOptionBTotal) / 12));

      // for Option C
      const yOptionCfactor = getArrayOptionCValues.myResultOptionCfator; //Option C chart
      if (yOptionCfactor > 0 && yOptionCfactor <= 1) {
        //for Option C
        if (varVeteran) {
          //from option A NonMax_YRA = (PF * YRA);
          NonMax_YRAOptionBTotal = NonMax_YRA * yOptionCfactor + vetbenefitperyear; //for calculation (Ex. 0.20 * 10000.00 = 2000.00 ) + vetbenefitperyear
        } else {
          NonMax_YRAOptionBTotal = NonMax_YRA * yOptionCfactor; // for calculation (0.80 * 10,000.00)
          //5. for display on the AmountOptionA text field
        }
        //from option A NonMax_YRA = (PF * YRA);
        retVal.optionCAnnualAllowance = this.CommaFormatted(this.CurrencyFormatted(NonMax_YRAOptionBTotal)); // Yearly document.arrayForm.myResult2.value=MultiArray[row];
        retVal.optionCMonthlyAllowance = this.CommaFormatted(this.CurrencyFormatted((NonMax_YRAOptionBTotal) / 12)); //monthly
        //2/3 of the Option C in yearly
        retVal.optionCBeneficiaryAnnualAllowance = this.CommaFormatted(this.CurrencyFormatted((NonMax_YRAOptionBTotal * 2) / 3)); // 2/3 in Yearly
        //2/3 of the Option C in monthly
        retVal.beneficiaryMonthlyAllowance = this.CommaFormatted(this.CurrencyFormatted(((NonMax_YRAOptionBTotal * 2) / 3) / 12)); // 2/3 in monthly
      } //if ((yOptionCfactor > 0) && (yOptionCfactor <= 1))
    } // if (ya < 36){ //less than 36 year of age

    return retVal;
  } // function computeForm(form)

}

export default new RetirementCalculator();
