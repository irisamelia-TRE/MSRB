/* eslint max-len: 0 */  // --> OFF
/* eslint brace-style: 0 */  // --> OFF

import YearInput from './YearInput';
import NumberInput from './NumberInput';
import TextInput from './TextInput';
import AppHeader from './AppHeader';
import SelectBox from './SelectBox';
import Agreement from './Agreement';
import {Tooltip} from 'react-lightweight-tooltip';
import RetirementGraph from './RetirementGraph';
import {computeRetirementBenefits} from '../calculateRetirement';
import {numberToDollarString} from '../numberHelpers';
import React, { Component } from 'react';
import styles from '../../style/app-body.scss';

/**
 * The body display of the calculator
 */
export default class AppBody extends Component {
    /**
     * Build the body
     *
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {
            veteran: false,
            retirementYear: '', // the text in the retirement date field
            retirementDate: null,
            birthYear: '', // the text in the birth date field
            birthDate: null,
            startYear: '', // the text in the start date field
            startDate: null,
            group: '1',
            salary: '',
            agreed: false
        };
    }

    /**
     * Update the date based on year entered
     *
     * @param {String} yearFieldName
     * @param {String} dateFieldName
     */
    updateDate(yearFieldName, dateFieldName) {
        return (event) => {
            const updateStateValue = {};
            const year = event.target.value;
            updateStateValue[yearFieldName] = year;
            if (year.length === 4) {
                updateStateValue[dateFieldName] = new Date(year, 0, 1);
            } else {
                updateStateValue[dateFieldName] = null;
            }
            this.setState(updateStateValue);
        };
    }

    /**
     * Displays the calculator body
     */
    render() {
        const veteranOptions = [
            { value: false, label: 'am not' },
            { value: true, label: 'am' }
        ];
        const groupOptions = [
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 4, label: '4'}
        ];

        let salary = Number.parseInt(this.state.salary);
        if (Number.isNaN(salary)) {
            salary = null;
        }
        const group = Number.parseInt(this.state.group);

        // calculate the retirement value based on the inputted data
        let retirementValueA = computeRetirementBenefits(group,
            this.state.birthDate, this.state.startDate, salary,
            this.state.retirementDate, this.state.veteran);
        if (retirementValueA === null) {
            retirementValueA = 0;
        }

        // show ranges for Option B
        const retirementValueBMin = retirementValueA * .95;
        const retirementValueBMax = retirementValueA * .99;

        // show ranges for Option C
        const retirementValueCMin = retirementValueA * .83;
        const retirementValueCMax = retirementValueA * .93;

        return [
            <AppHeader key='0'></AppHeader>,
            <main key='1' className={styles['main']}>
                <form className={styles['form-section']}>
                    <div id="agree-container" style={{display: this.state.agreed ? 'none' : 'block'}}>
                        <Agreement onClick={(event) => this.setState({agreed: true})}></Agreement>
                    </div>
                    <div id="entry-container" style={{display: this.state.agreed ? 'block' : 'none'}}>
                        <p>
                            I was born in <YearInput id="year-input" value={this.state.birthYear} onChange={this.updateDate('birthYear', 'birthDate')}></YearInput>.
                        </p>
                        <div className={styles['div-paragraph']}>
                            <p className={styles['inline-p']}>I am in Group</p>
                            <SelectBox options={groupOptions} value={this.state.group} onChange={event => this.setState({group: event.target.value})}> </SelectBox>
                            <Tooltip content='Your position, occupation, and the duties you perform determine your group classification.'>
                                <div className={styles['help-tip']}></div>
                            </Tooltip>
                        </div>
                        <p>
                            In <YearInput id="start-input" value={this.state.startYear} onChange={this.updateDate('startYear', 'startDate')}></YearInput>
                            I started work as a <TextInput placeholder='job title'></TextInput>.
                        </p>
                        <p>
                            My Average Salary during this time was: <NumberInput id="salary-input" value={this.state.salary}
                                onChange={event => this.setState({salary: event.target.value})}></NumberInput>
                        </p>
                        <p>
                            I plan to retire in <YearInput id="retire-input" value={this.state.retirementYear} onChange={this.updateDate('retirementYear', 'retirementDate')}></YearInput>
                        </p>
                        <p>
                            I <SelectBox options={veteranOptions} value={this.state.veteran} onChange={event => this.setState({veteran: event.target.value === 'true'})}></SelectBox> a veteran.
                        </p>
                        <div>
                            <strong>Under Option A (No Survivor Benefit)</strong>
                            <Tooltip content='Full retirement allowance, all benefits stop upon your death.'>
                                <div className={styles['help-tip']}></div>
                            </Tooltip>
                            your annual benefit is <span id="retirement-a-annual">{numberToDollarString(retirementValueA)}</span>, and monthly benefit is {numberToDollarString(retirementValueA / 12)}
                            <br></br>
                            <strong>Under Option B (Protects your Annuity)</strong>
                            <Tooltip content='Reduced (1-5% less than Option A) retirement allowance, beneficiary receives lump sum payment of the balance of your annuity upon your death.'>
                                <div className={styles['help-tip']}></div>
                            </Tooltip>
                            your annual benefit ranges from {numberToDollarString(retirementValueBMin)} to {numberToDollarString(retirementValueBMax)} depending on the age of your beneficiary
                            <br></br>
                            <strong>Under Option C (Joint Survivor Allowance)</strong>
                            <Tooltip content='Reduced (approximately 7-15% less than Option A) retirement allowance. However, this reduction could be greater depending on the age difference between you and your beneficiary. Upon your death, your designated beneficiary will be paid a monthly allowance for the remainder of his or her life. The survivor benefit will be equal to two-thirds of the allowance that was being paid to you at the time of your death.'>
                                <div className={styles['help-tip']}></div>
                            </Tooltip>
                            your annual benefit ranges from {numberToDollarString(retirementValueCMin)} to {numberToDollarString(retirementValueCMax)} depending on the age of your beneficiary. Upon your death, your beneficiary would receive two-thirds of your allowance monthly for the rest of their life.
                        </div>
                    </div>
                </form>
                <section className={styles['graph-section']}>
                    <RetirementGraph style={{display: this.state.agreed ? 'block' : 'none'}} retirementFunction={(retirementDate) => computeRetirementBenefits(group, this.state.birthDate, this.state.startDate, salary, retirementDate, this.state.veteran)} retirementDate={this.state.retirementDate} jobStartDate={this.state.startDate} birthDate={this.state.birthDate}></RetirementGraph>
                </section>
            </main>
        ];
    }
}
