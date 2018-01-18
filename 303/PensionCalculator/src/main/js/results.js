import React from 'react';
import moment from 'moment';
import RetirementOptionResults from './RetirementOptionResults';
import HiddenKeyValueTable from './HiddenKeyValueTable';
import calculations from './calculations/calculations';
import PensionOverTimeChart from './PensionOverTimeChart';

class Results extends React.Component {

  constructor(props) {
    super(props);
    this.onPrintClicked = this.onPrintClicked.bind(this);
    this.onRecalculateClicked = this.onRecalculateClicked.bind(this);
    this.state = {
      birthDate: this.props.birthDate,
      retirementDate: this.props.retirementDate,
      highestConsecutiveSalary: this.props.highestConsecutiveSalary,
      creditableServiceYears: this.props.creditableServiceYears,
      creditableServiceMonths: this.props.creditableServiceMonths,
      group: this.props.group,
      beneficiaryAgeYears: this.props.beneficiaryAgeYears,
      beneficiaryAgeMonths: this.props.beneficiaryAgeMonths,
      veteranStatus: this.props.veteranStatus,
    }
  }

  onPrintClicked() {
    window.print();
  }

  onRecalculateClicked() {
    this.props.onSubmit();
  }

  render() {
    let birthDateMoment = moment(this.state.birthDate);
    let retirementDateMoment = moment(this.state.retirementDate);
    let inputCreditableYearsOfService = this.state.creditableServiceYears;
    let creditableServiceMonths = this.state.creditableServiceMonths;
    let isVeteran = this.state.veteranStatus === 'Veteran'
    if (!isVeteran) {
      inputCreditableYearsOfService = 10;
      creditableServiceMonths = 0;
    }

    let calculatorInput = {
      fiveYearsCompensation: this.state.highestConsecutiveSalary,
      serviceYears: inputCreditableYearsOfService,
      serviceMonths: creditableServiceMonths,
      group: this.state.group,
      beneficiaryAge: {
        years: this.state.beneficiaryAgeYears,
        months: this.state.beneficiaryAgeMonths,
      },
      birthDate: {
        year: birthDateMoment.year(),
        month: birthDateMoment.month() + 1,
      },
      retirementDate: {
        year: retirementDateMoment.year(),
        month: retirementDateMoment.month() + 1,
      }
    }
    calculatorInput.isVeteran = isVeteran;

    const output = calculations.computeForm(calculatorInput);

    let ageAtRetirementInYears = retirementDateMoment.diff(birthDateMoment, 'year');
    let creditableServiceString = null;
    if (this.state.creditableServiceYears === 1) {
      creditableServiceString = `${this.state.creditableServiceYears} year`;
    } else {
      creditableServiceString = `${this.state.creditableServiceYears} years`;
    }
    const averageAnnualSalary = this.state.highestConsecutiveSalary;

    const topLevelPensionEstimateResults = [
      {
        fieldElementName: 'Age at retirement:',
        valueString: ageAtRetirementInYears,
      },
      {
        fieldElementName: 'Years of Creditable Service:',
        valueString: creditableServiceString,
      },
      {
        fieldElementName: 'Average Allowable Percentage of Salary:',
        valueString: output.allowablePercentageOfSalaryAverage,
      },
      {
        fieldElementName: 'Average Annual Salary:',
        valueString: averageAnnualSalary,
      },
      {
        fieldElementName: 'Veteran Bonus (if applicable):',
        valueString: output.veteranBonus,
      },
    ];

    let shouldEstimateOptionC = this.props.estimateOptionC;
    let optionCEstimatePanel = null;
    if (shouldEstimateOptionC) {
      optionCEstimatePanel = (
        <RetirementOptionResults optionName='C'
          optionDesc="Reduced (approximately 7-15% less than Option A) retirement allowance. However, this reduction could be greater depending on the age difference between you and your beneficiary. Upon your death, your designated beneficiary will be paid a monthly allowance for the remainder of his or her life. The survivor benefit will be equal to two-thirds of the allowance that was being paid to you at the time of your death."
          annualAllowance={output.optionCAnnualAllowance}
          monthlyAllowance={output.optionCMonthlyAllowance}
          beneficiaryAnnualAllowance={output.optionCBeneficiaryAnnualAllowance}
          beneficiaryMonthlyAllowance={output.optionCMonthlyAllowance} />
      );
    }
    return (
      <span>
        <main className='ma__form-page' id='main-content' tabIndex='-1'>
          <div className='pre-content'>
            <h4 className='ma__colored-heading ma__colored-heading--green'>Pension Estimate Calculator (MSRB)</h4>
          </div>
          <div className='main-content main-content--two'>
            <h2 className="ma__comp-heading" tabIndex="-1">
              Pension Estimate Results
            </h2>

            <HiddenKeyValueTable elementArray={topLevelPensionEstimateResults} />
            <h3 className="ma__comp-heading" tabIndex="-1">
              Retirement Estimates
            </h3>
            <RetirementOptionResults optionName='A'
              optionDesc="Full retirement allowance, all benefits stop upon your death."
              annualAllowance={output.optionAAnnualAllowance}
              monthlyAllowance={output.optionAMonthlyAllowance}
              beneficiaryAnnualAllowance={null} />
            <RetirementOptionResults optionName='B'
              optionDesc="Reduced (1-5% less than Option A) retirement allowance, beneficiary receives lump sum payment of the balance of your annuity upon your death."
              annualAllowance={output.optionBAnnualAllowance}
              monthlyAllowance={output.optionBMonthlyAllowance}
              beneficiaryAnnualAllowance={null} />

            {optionCEstimatePanel}
            
            <PensionOverTimeChart calculatorInput={calculatorInput} estimateOptionC={shouldEstimateOptionC} maxAge={100} ageStride={1} />

            <div className='btn-toolbar'>
              <button type='button' className='ma__button ma__button--small' aria-label='' onClick={this.onPrintClicked} >
                Print
              </button>
              &nbsp; &nbsp; &nbsp;
              <button type='button' className='ma__button ma__button--small ma__button--secondary ma__button--minor' aria-label='' onClick={this.onRecalculateClicked} >
                Recalculate
              </button>
            </div>
          </div>
        </main>
      </span >
    );
  }
}

export default Results;
