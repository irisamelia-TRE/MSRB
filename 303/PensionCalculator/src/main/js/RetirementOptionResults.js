import React from 'react';
import HiddenKeyValueTable from './HiddenKeyValueTable';

class RetirementOptionResults extends React.Component {

  //Expects optionName (A, B, C or more in the future), 
  // annualAllowance, monthlyAllowance, beneficiaryAnnualAllowance, beneficiaryMonthlyAllowance.
  // If beneficiaryAnnualAllowance is undefined, beneficiaryMonthlyAllowance is not examined
  constructor(props) {
    super(props);
  }

  render() {
    let optionElements = [
      {
        fieldElementName: 'Annual Allowance:',
        valueString: this.props.annualAllowance,
      },
      {
        fieldElementName: 'Monthly Allowance:',
        valueString: this.props.monthlyAllowance,
      },
    ];
    if (this.props.beneficiaryAnnualAllowance) {
      optionElements = optionElements.concat([{
        fieldElementName: 'Beneficiary Annual Allowance',
        valueString: this.props.beneficiaryAnnualAllowance,
      },
      {
        fieldElementName: 'Beneficiary Monthly Allowance',
        valueString: this.props.beneficiaryMonthlyAllowance,
      }]);
    } else {
      optionElements.push({
        fieldElementName: 'Beneficiary Annual Allowance',
        valueString: 'N/A',
      });
    }
    const listTitle = `Option ${this.props.optionName}`;
    return <HiddenKeyValueTable listTitle={ listTitle } listTitleDesc={this.props.optionDesc} elementArray={ optionElements } />;
  }
}

export default RetirementOptionResults;
