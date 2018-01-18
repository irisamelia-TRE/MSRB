import moment from 'moment';
import BackButton from './BackButton';
import Pikaday from './PikadayReact';
import RequiredFields from './RequiredFields';
import PreprocessDateForCallback from './Utils';

const React = require('react');

class Form_2 extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.initialState === undefined) {
      if (this.props.authenticatedUserData === undefined) {
        //Assign defaults to uninitialized state
        this.state = {
          veteranStatus: 'Please Select',
          estimateOptionC: false,
          highestConsecutiveSalary: '',
          beneficiaryAgeMonths: '',
          beneficiaryAgeYears: '',
          creditableServiceMonths: '',
          creditableServiceYears: '',
          beneficiaryBirthDate: null,
        };
      } else {
        let veteranStatus = 'Non-Veteran';
        if (this.props.authenticatedUserData.veteran) {
          veteranStatus = 'Veteran';
        }
        const beneficiaryAge = this.convertBirthDateToAgeMonthsAndDays(this.props.authenticatedUserData.beneficiaryBirthdate);
        //Convert both beneficiary years and months to integers (seems to be the preffered way in javascript)
        const beneficiaryAgeYears = beneficiaryAge.years;
        const beneficiaryAgeMonths = beneficiaryAge.months;
        this.state = {
          veteranStatus: veteranStatus,
          estimateOptionC: false,
          highestConsecutiveSalary: this.props.authenticatedUserData.salary,
          beneficiaryAgeYears: beneficiaryAgeYears,
          beneficiaryAgeMonths: beneficiaryAgeMonths,
          beneficiaryBirthDate: moment(this.props.authenticatedUserData.beneficiaryBirthdate).toDate(),
          creditableServiceMonths: '',
          creditableServiceYears: '',
        };
      }
    } else {
      this.state = this.props.initialState;
      if (!this.state.estimateOptionC) {
        this.state.creditableServiceMonths = '';
        this.state.creditableServiceYears = '';
        this.state.beneficiaryBirthDate = null;
      }
    }
    this.state.hasAttemptedSubmission = false;

    this.beneficiaryBirthDateEle = null;

    this.handleVeteranChange = this.handleVeteranChange.bind(this);

    this.modifyPreviousSalary = this.modifyPreviousSalary.bind(this);
    this.increaseConsecutiveSalary = this.increaseConsecutiveSalary.bind(this);
    this.decreaseConsecutiveSalary = this.decreaseConsecutiveSalary.bind(this);
    this.setConsecutiveSalary = this.setConsecutiveSalary.bind(this);

    this.incrementCreditableServiceYears = this.incrementCreditableServiceYears.bind(this);
    this.decrementCreditableServiceYears = this.decrementCreditableServiceYears.bind(this);
    this.setCreditableServiceYears = this.setCreditableServiceYears.bind(this);

    this.incrementCreditableServiceMonths = this.incrementCreditableServiceMonths.bind(this);
    this.decrementCreditableServiceMonths = this.decrementCreditableServiceMonths.bind(this);
    this.setCreditableServiceMonths = this.setCreditableServiceMonths.bind(this);

    this.incrementBeneficiaryMonths = this.incrementBeneficiaryMonths.bind(this);
    this.decrementBeneficiaryMonths = this.decrementBeneficiaryMonths.bind(this);
    this.setBeneficiaryMonths = this.setBeneficiaryMonths.bind(this);

    this.incrementBeneficiaryYears = this.incrementBeneficiaryYears.bind(this);
    this.decrementBeneficiaryYears = this.decrementBeneficiaryYears.bind(this);
    this.setBeneficiaryYears = this.setBeneficiaryYears.bind(this);

    this.makeBeneficiaryBirthDateConsistentWithYearsMonths = this.makeBeneficiaryBirthDateConsistentWithYearsMonths.bind(this);

    this.setEstimateOptionC = this.setEstimateOptionC.bind(this);
    this.handleBeneficiaryBirthDayChange = this.handleBeneficiaryBirthDayChange.bind(this);

    this.isFormComplete = this.isFormComplete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  isFormComplete() {
    const isVeteranStatusComplete = this.state.veteranStatus === 'Non-Veteran' ||
      (this.state.creditableServiceYears !== '' && this.state.creditableServiceMonths !== '' &&
        this.state.creditableServiceYears >= 10);
    let isBeneficiaryDataComplete = !this.state.estimateOptionC ||
      (this.state.beneficiaryAgeYears !== '' && this.state.beneficiaryAgeMonths !== '' && this.state.beneficiaryBirthDate);
    if (isBeneficiaryDataComplete){
      isBeneficiaryDataComplete = this.state.beneficiaryAgeYears > 0 || this.state.beneficiaryAgeMonths > 0;
    }
    return isVeteranStatusComplete && isBeneficiaryDataComplete && this.state.highestConsecutiveSalary !== '';
  }

  convertBirthDateToAgeMonthsAndDays(date) {
    const dateMoment = moment(date);
    const differenceInMs = moment().diff(dateMoment);
    const dateInMS = moment.duration(differenceInMs);

    //Convert both beneficiary years and months to integers (seems to be the preffered way in javascript)
    const yearPart = dateInMS.asYears() | 0;
    const monthPart = (dateInMS.asMonths() | 0) % 12;
    return {
      years: yearPart,
      months: monthPart,
    };
  }

  convertAgeYearsMonthsToBirthDate(years, months) {
    const nowMoment = moment();
    const daysIntoMonth = nowMoment.date();
    const adjustedMoment = nowMoment.subtract(years, 'y').subtract(months, 'months').subtract(daysIntoMonth - 1, 'days');
    return adjustedMoment.toDate();
  }

  onSubmit() {
    this.state.hasAttemptedSubmission = true;
    if (this.beneficiaryBirthDateEle && !this.beneficiaryBirthDateEle.value) {
      this.state.beneficiaryBirthDate = null;
    }

    this.setState(this.state);
    if (this.isFormComplete()) {
      if (!this.state.estimateOptionC) {
        //Default these to arbitrary values so that the js calculator works correctly. The results will not be rendered.
        this.state.beneficiaryAgeYears = 1;
        this.state.beneficiaryAgeMonths = 1;
      }
      this.props.onSubmit(this.state);
    }
  }

  handleVeteranChange(event) {
    const newVal = event.target.value;
    this.state.veteranStatus = newVal;
    this.setState(this.state);
  }

  modifyPreviousSalary(amount) {
    if (this.state.highestConsecutiveSalary === '') {
      this.state.highestConsecutiveSalary = 0;
    }
    const previousSalary = parseInt(this.state.highestConsecutiveSalary, 10);
    let newSalary = previousSalary + amount;
    if (newSalary < 0) {
      newSalary = 0;
    }
    this.state.highestConsecutiveSalary = newSalary;
    this.setState(this.state);
  }

  increaseConsecutiveSalary() {
    this.modifyPreviousSalary(1000);
  }

  decreaseConsecutiveSalary() {
    this.modifyPreviousSalary(-1000);
  }

  setConsecutiveSalary(event) {
    this.state.highestConsecutiveSalary = event.target.value;
    this.setState(this.state);
  }

  constrainAgeYearsToBounds(creditableServiceYears) {
    if (creditableServiceYears < 0) {
      creditableServiceYears = 0;
    }

    //It is unlikely that someone has served for more than 150 years
    if (creditableServiceYears > 150) {
      creditableServiceYears = 150;
    }
    return creditableServiceYears;
  }

  constrainMonthsToBounds(creditableMonths) {
    if (creditableMonths < 0) {
      creditableMonths = 0;
    }
    if (creditableMonths > 11) {
      creditableMonths = 11;
    }
    return creditableMonths;
  }

  updateCreditableServiceYears(newYears) {
    this.state.creditableServiceYears = this.constrainAgeYearsToBounds(newYears);
    this.setState(this.state);
  }

  incrementCreditableServiceYears() {
    if (this.state.creditableServiceYears === '') {
      this.state.creditableServiceYears = 0;
    }
    this.updateCreditableServiceYears(this.state.creditableServiceYears + 1);
  }

  decrementCreditableServiceYears() {
    if (this.state.creditableServiceYears === '') {
      this.state.creditableServiceYears = 0;
    }
    this.updateCreditableServiceYears(this.state.creditableServiceYears - 1);
  }

  setCreditableServiceYears(event) {
    this.updateCreditableServiceYears(parseInt(event.target.value, 10));
  }

  updateCreditableServiceMonths(newMonths) {
    this.state.creditableServiceMonths = this.constrainMonthsToBounds(newMonths);
    this.setState(this.state);
  }

  incrementCreditableServiceMonths() {
    if (this.state.creditableServiceMonths === '') {
      this.state.creditableServiceMonths = 0;
    }
    this.updateCreditableServiceMonths(this.state.creditableServiceMonths + 1);
  }
  decrementCreditableServiceMonths() {
    if (this.state.creditableServiceMonths === '') {
      this.state.creditableServiceMonths = 0;
    }
    this.updateCreditableServiceMonths(this.state.creditableServiceMonths - 1);
  }
  setCreditableServiceMonths(event) {
    this.updateCreditableServiceMonths(parseInt(event.target.value, 10));
  }

  setEstimateOptionC() {
    this.state.estimateOptionC = !this.state.estimateOptionC;
    this.setState(this.state);
  }

  makeBeneficiaryBirthDateConsistentWithYearsMonths() {
    const updatedDate = this.convertAgeYearsMonthsToBirthDate(this.state.beneficiaryAgeYears, this.state.beneficiaryAgeMonths);
    this.state.beneficiaryBirthDate = updatedDate;
    this.setState(this.state);
  }

  updateBenificiaryMonths(newMonths) {
    newMonths = this.constrainMonthsToBounds(newMonths);
    this.state.beneficiaryAgeMonths = newMonths;
    this.makeBeneficiaryBirthDateConsistentWithYearsMonths();
    this.setState(this.state);
  }

  incrementBeneficiaryMonths() {
    if (this.state.beneficiaryAgeMonths === '') {
      this.state.beneficiaryAgeMonths = 0;
    }
    this.updateBenificiaryMonths(this.state.beneficiaryAgeMonths + 1);
  }

  decrementBeneficiaryMonths() {
    if (this.state.beneficiaryAgeMonths === '') {
      this.state.beneficiaryAgeMonths = 0;
    }
    this.updateBenificiaryMonths(this.state.beneficiaryAgeMonths - 1);
  }

  setBeneficiaryMonths(event) {
    const newMonths = parseInt(event.target.value, 10);
    this.updateBenificiaryMonths(newMonths);
  }

  updateBeneficiaryYears(newYears) {
    newYears = this.constrainAgeYearsToBounds(newYears);
    this.state.beneficiaryAgeYears = newYears;
    this.makeBeneficiaryBirthDateConsistentWithYearsMonths();
    this.setState(this.state);
  }

  incrementBeneficiaryYears() {
    if (this.state.beneficiaryAgeYears === '') {
      this.state.beneficiaryAgeYears = 0;
    }
    this.updateBeneficiaryYears(this.state.beneficiaryAgeYears + 1);
  }

  decrementBeneficiaryYears() {
    if (this.state.beneficiaryAgeYears === '') {
      this.state.beneficiaryAgeYears = 0;
    }
    this.updateBeneficiaryYears(this.state.beneficiaryAgeYears - 1);
  }

  setBeneficiaryYears(event) {
    const newYears = parseInt(event.target.value, 10);
    this.updateBeneficiaryYears(newYears);
  }

  handleBeneficiaryBirthDayChange(date) {
    this.state.beneficiaryBirthDate = date;
    const yearsMonths = this.convertBirthDateToAgeMonthsAndDays(date);
    this.state.beneficiaryAgeYears = yearsMonths.years;
    this.state.beneficiaryAgeMonths = yearsMonths.months;
    this.setState(this.state);
  }

  render() {
    let totalYearsOfCreditableServiceDisplay = null;
    let optionCDisplay = null;
    if (this.state.veteranStatus === 'Veteran') {
      let creditableSerivceYearsErrorMsg = null;
      if (this.state.creditableServiceYears !== '' && this.state.creditableServiceYears < 10) {
        creditableSerivceYearsErrorMsg = (
          <div className='ma__error-msg has-error'>Creditable service years must be greater than or equal to 10</div>
        );
      }
      totalYearsOfCreditableServiceDisplay = (
        <section>
          <label htmlFor='creditable-years-input' className='ma__select-box__label'>
            <h6>
              4a. Select your estimated total number of years of creditable service
            </h6>
          </label>
          <div className='ma__input-group__items ma__input-group__items--inline'>
            <div className='ma__input-group__item'>
              <div>
                <label htmlFor='creditable-years-input'><span>Years:</span></label>
                <span className='ma__input-number'>
                  <RequiredFields hasSubmittedForm={this.state.hasAttemptedSubmission} defaultElements={['', 'Years']}>
                    <input className='ma__input js-is-required' style={{ backgroundImage: 'none' }} onChange={this.setCreditableServiceYears} value={this.state.creditableServiceYears} id='creditable-years-input' placeholder='Years' data-type='number' maxLength='3' pattern='[0-9]*' required='' type='number' />
                    <button type='button' aria-label='increase value' className='ma__input-number__plus' onClick={this.incrementCreditableServiceYears} />
                    <button type='button' aria-label='decrease value' className='ma__input-number__minus' onClick={this.decrementCreditableServiceYears} />
                  </RequiredFields>
                </span>
              </div>
              {creditableSerivceYearsErrorMsg}
            </div>
            <div className='ma__input-group__item'>
              <div>
                <label htmlFor='creditable-months-input'><span>Months:</span></label>
                <span className='ma__input-number'>
                  <RequiredFields hasSubmittedForm={this.state.hasAttemptedSubmission} defaultElements={['', 'Months']}>
                    <input className='ma__input js-is-required' style={{ backgroundImage: 'none' }} onChange={this.setCreditableServiceMonths} value={this.state.creditableServiceMonths} name='number-input' id='creditable-months-input' placeholder='Months' data-type='number' maxLength='2' pattern='[0-9]*' required='' type='number' />
                    <button type='button' aria-label='increase value' className='ma__input-number__plus' onClick={this.incrementCreditableServiceMonths} />
                    <button type='button' aria-label='decrease value' className='ma__input-number__minus' onClick={this.decrementCreditableServiceMonths} />
                  </RequiredFields>
                </span>
              </div>
            </div>
          </div>
        </section>
      );
    }
    if (this.state.estimateOptionC) {
      let initialOptions = {
        maxDate: new Date(),
      };

      let ageMustBeNonzeroMsg = null;
      if (this.state.beneficiaryAgeMonths !== '' && this.state.beneficiaryAgeMonths == 0 && 
        this.state.beneficiaryAgeYears !== '' && this.state.beneficiaryAgeYears == 0) {
        ageMustBeNonzeroMsg = (
          <div className='ma__error-msg has-error'>Beneficiary age must be greater than zero</div>
        )
      }
      optionCDisplay = (
        <section>
          <label htmlFor='date-input'>
            <h6>
              a. Enter Either Beneficiary Date of Birth
            </h6>
          </label>
          <RequiredFields hasSubmittedForm={this.state.hasAttemptedSubmission}>
            <Pikaday inputRel={(ele) => {this.beneficiaryBirthDateEle = ele;}}  value={this.state.beneficiaryBirthDate} onChange={this.handleBeneficiaryBirthDayChange} initialOptions={initialOptions} />
          </RequiredFields>
          <label htmlFor='beneficiary-age-options'>
            <h6>
              <br /> OR Beneficiary Age
            </h6>
          </label>
          <div className='ma__input-group__items ma__input-group__items--inline' id='beneficiary-age-options'>
            <div className='ma__input-group__item'>
              <div>
                <label htmlFor='creditable-years-input'>
                  <span>
                    <h8>
                      Years:
                    </h8>
                  </span>
                </label>
                <span className='ma__input-number'>
                  <RequiredFields hasSubmittedForm={this.state.hasAttemptedSubmission} defaultElements={['', 'Years']}>
                    <input className='ma__input js-is-required' style={{ backgroundImage: 'none' }} onChange={this.setBeneficiaryYears} value={this.state.beneficiaryAgeYears} placeholder='Years' data-type='number' maxLength='3' pattern='[0-9]*' required='' type='number' />
                    <button type='button' aria-label='increase value' className='ma__input-number__plus' onClick={this.incrementBeneficiaryYears} />
                    <button type='button' aria-label='decrease value' className='ma__input-number__minus' onClick={this.decrementBeneficiaryYears} />
                  </RequiredFields>
                </span>
              </div>
            </div>
            <div className='ma__input-group__item'>
              <div>
                <label htmlFor='creditable-months-input'>
                  <span>
                    <h8>
                      Months:
                    </h8>
                  </span>
                </label>
                <span className='ma__input-number'>
                  <RequiredFields hasSubmittedForm={this.state.hasAttemptedSubmission} defaultElements={['', 'Months']}>
                    <input className='ma__input js-is-required' style={{ backgroundImage: 'none' }} onChange={this.setBeneficiaryMonths} value={this.state.beneficiaryAgeMonths} name='number-input' placeholder='Months' data-type='number' maxLength='2' pattern='[0-9]*' required='' type='number' />
                    <button type='button' aria-label='increase value' className='ma__input-number__plus' onClick={this.incrementBeneficiaryMonths} />
                    <button type='button' aria-label='decrease value' className='ma__input-number__minus' onClick={this.decrementBeneficiaryMonths} />
                  </RequiredFields>
                </span>
              </div>
            </div>
          </div>
          {ageMustBeNonzeroMsg}
        </section>
      );
    }
    return (
      <span>
        <main className='ma__form-page' id='main-content' tabIndex='-1'>
          <div className='pre-content'>
            <h4 className='ma__colored-heading ma__colored-heading--green'>Pension Estimate Calculator (MSRB)</h4>
            <BackButton onClick={this.props.onBackButtonPressed} />
          </div>
          <div className='main-content main-content--two'>
            <div className='page-content'>
              <fieldset>
                <section className='ma__select-box js-dropdown ma__select-box'>
                  <label htmlFor='veteran-select' className='ma__select-box__label'>
                    <h4>
                      4. Are you a military veteran?
                    </h4>
                  </label>
                  <div className='ma__select-box__field'>
                    <RequiredFields hasSubmittedForm={this.state.hasAttemptedSubmission} defaultElements={['Please Select']}>
                      <select value={this.state.veteranStatus} onChange={this.handleVeteranChange} name='veteran-select' id='veteran-select' className='ma__select-box__select js-dropdown-select '>
                        <option value='Please Select'>Unspecified</option>
                        <option value='Veteran'>Veteran</option>
                        <option value='Non-Veteran'>Non-Veteran</option>
                      </select>
                      <div className='ma__select-box__link'>
                        <span className='js-dropdown-link'>{this.state.veteranStatus}</span>
                        <span className='ma__select-box__icon' />
                      </div>
                    </RequiredFields>
                  </div>
                </section>
                {totalYearsOfCreditableServiceDisplay}
              </fieldset>
              <fieldset>
                <label className='ma__label ma__label--required ' htmlFor='highest-consecutive-salary'>
                  <h4>
                    5. Enter your highest consecutive 5 year compensation ($)
                  </h4>
                </label>
                <div className='ma__error-msg'>
                  This value is required
                </div>
                <div className='ma__input-number'>
                  <RequiredFields hasSubmittedForm={this.state.hasAttemptedSubmission} defaultElements={['']}>
                    <input className='ma__input js-is-required' style={{ backgroundImage: 'none' }} onChange={this.setConsecutiveSalary} value={this.state.highestConsecutiveSalary} name='number-input' id='highest-consecutive-salary' data-type='number' maxLength='16' pattern='[0-9]*' required='' type='number' />
                    <button type='button' aria-label='increase value' className='ma__input-number__plus' onClick={this.increaseConsecutiveSalary} />
                    <button type='button' aria-label='decrease value' className='ma__input-number__minus' onClick={this.decreaseConsecutiveSalary} />
                  </RequiredFields>
                </div>

                <label className='ma__helper-text' htmlFor='highest-consecutive-salary'>
                  The estimated average of your highest thirty-six consecutive months (5 consecutive years)
                                of annual regular compensation in USD.
                </label>
              </fieldset>
              <fieldset>
                <span className='ma__input-checkbox'>
                  <input value='checkbox' id='checkbox-test' checked={this.state.estimateOptionC} type='checkbox' onClick={this.setEstimateOptionC} />
                  <label htmlFor='checkbox-test'>
                    <span>
                      <h4>
                        Estimate benefits under option C
                      </h4>
                    </span>
                  </label>
                </span>
                {optionCDisplay}
              </fieldset>
              <div className='btn-toolbar'>
                <a className='ma__button' onClick={this.onSubmit}>
                  Submit
                </a>
              </div>
            </div>
          </div>
        </main>
      </span>
    );
  }
}

export default Form_2;
