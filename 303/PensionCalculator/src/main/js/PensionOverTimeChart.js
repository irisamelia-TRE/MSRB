import React from 'react';
import { Chart } from 'react-d3-core';
import { LineChart } from 'react-d3-basic';
import calculations from './calculations/calculations';

class PensionOverTimeChart extends React.Component {
  /*
  This component expects calculatorInput (the input json used to compute the displayed results),
  maxAge (integer describing the maximum retirement age to graph), ageStride (generate a data point every ageStride years)
  and estimateOptionC (bool whether or not to display option C estimates)
  */
  constructor(props) {
    super(props);
  }

  render() {
    const x = function (d) {
      return d.age;
    };

    const calculatorInput = this.props.calculatorInput;
    const maxAge = this.props.maxAge;
    const ageStride = this.props.ageStride;

    let data = [];
    for (calculatorInput.retirementDate = {
      year: calculatorInput.birthDate.year + 36,
      month: calculatorInput.birthDate.month,
    }; calculatorInput.retirementDate.year - calculatorInput.birthDate.year < maxAge;
      calculatorInput.retirementDate.year += ageStride) {
      const updatedValues = calculations.computeForm(calculatorInput);
      const currentAge = calculatorInput.retirementDate.year - calculatorInput.birthDate.year;

      updatedValues.optionAAnnualAllowance = updatedValues.optionAAnnualAllowance.replace(',', '');
      updatedValues.optionBAnnualAllowance = updatedValues.optionBAnnualAllowance.replace(',', '');
      let dataToPush = {
        age: currentAge,
        optionA: parseFloat(updatedValues.optionAAnnualAllowance) / 1000,
        optionB: parseFloat(updatedValues.optionBAnnualAllowance) / 1000,
      };
      if (this.props.estimateOptionC) {
        updatedValues.optionCAnnualAllowance = updatedValues.optionCAnnualAllowance.replace(',', '');
        dataToPush.optionC = parseFloat(updatedValues.optionCAnnualAllowance) / 1000;
      }

      data.push(dataToPush);
    }

    let chartSeries = [
      {
        field: 'optionA',
        name: 'Option A',
        color: '#14558f',
        style: {
          "stroke-width": 2,
          "stroke-opacity": .2,
          "fill-opacity": .2
        }
      },
      {
        field: 'optionB',
        name: 'Option B',
        color: '#43956f',
        style: {
          "stroke-width": 2,
          "stroke-opacity": .2,
          "fill-opacity": .2
        }
      },
    ];
    if (this.props.estimateOptionC) {
      chartSeries.push({
        field: 'optionC',
        name: 'Option C',
        color: '#535353',
        style: {
          "stroke-width": 2,
          "stroke-opacity": .2,
          "fill-opacity": .2
        }
      });
    }
    const margins = { top: 50, right: 50, bottom: 50, left: 50 };
    return (
      <div className="main-content main-content--two">
        <h3 className="ma__comp-heading" tabIndex="-1">
          Annual Allowance Per Option for Retirement Age
        </h3>
        <LineChart
          width={600}
          height={400}
          data={data}
          chartSeries={chartSeries}
          margins={margins}
          x={x}
          xLabel='Retirement Age (years)'
          yLabel='Annual Allowance (One Thousand $)'
        />
      </div>
    );
  }
}
export default PensionOverTimeChart;
