import React from 'react';
import moment from 'moment';

import client from './client';
import BackButton from './BackButton';
import Pikaday from './PikadayReact';
import RequiredFields from './RequiredFields';
import PreprocessDateForCallback from './Utils';

class Form_1 extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.initialState === undefined) {
      //Only initialize from authenticated user data if the form state is null.
      // If the state is not null, the user might have modified the data from the data loaded from the database.
      if (this.props.authenticatedUserData === undefined) {
        //The state must not have any of the required information, so init empty state
        this.state = {};
      } else {
        // Initialize from authenticated user data
        const birthDateMoment = moment(this.props.authenticatedUserData.birthdate);
        const defaultRetirementMoment = birthDateMoment.add(65, 'years');
        this.state = {
          birthDate: moment(this.props.authenticatedUserData.birthdate).toDate(),
          group: this.props.authenticatedUserData.groupClassification,
          retirementDate: defaultRetirementMoment.toDate(),
        };
      }
    } else {
      this.state = this.props.initialState;
    }
    this.state.hasAttemptedSubmit = false;

    this.birthDateEle = null;
    this.retirementEle = null;

    this.minYearsUntilRetirementDateOffset = 36;

    this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
    this.handleRetirementChange = this.handleRetirementChange.bind(this);
    this.onGroupSelect = this.onGroupSelect.bind(this);
    this.isisFormComplete = this.isFormComplete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onGroupSelect(event) {
    this.setState({
      group: parseInt(event.target.value)
    });
  }

  onSubmit() {
    this.state.hasAttemptedSubmit = true;

    if (this.birthDateEle && !this.birthDateEle.value) {
      this.state.birthDate = null;
    }

    if (this.retirementEle && !this.retirementEle.value) {
      this.state.retirementDate = null;
    }

    this.setState(this.state);
    if (this.isFormComplete()) {
      this.props.onSubmit(this.state);
    }
  }

  isFormComplete() {
    return this.state.birthDate && this.state.group && this.state.retirementDate;
  }

  handleBirthDateChange(date) {
    this.state.birthDate = date;
    this.setState(this.state);
  }

  handleRetirementChange(date) {
    this.state.retirementDate = date;
    this.setState(this.state);
  }

  render() {
    let birthDateDropdownOptions = {
      maxDate: Date(),
    };

    let retirementDateDropdownOptions = {
      minDate: Date(),
    };
    if (!(this.state.retirementDate === undefined && this.state.birthDate === undefined)) {
      const retirementDateMoment = moment(this.state.retirementDate);
      const birthDateMoment = moment(this.state.birthDate);
      const nowMoment = moment();
      let retirementOffsetByMinYearsInService = retirementDateMoment.subtract(this.minYearsUntilRetirementDateOffset, 'years');
      if (nowMoment < retirementOffsetByMinYearsInService) {
        retirementOffsetByMinYearsInService = nowMoment;
      }
      let birthDateOffsetByMinYearsInService = birthDateMoment.add(this.minYearsUntilRetirementDateOffset, 'years');
      if (nowMoment > birthDateOffsetByMinYearsInService) {
        birthDateOffsetByMinYearsInService = nowMoment;
      }

      if (!(this.state.retirementDate === undefined)) {
        birthDateDropdownOptions = {
          maxDate: retirementOffsetByMinYearsInService.toDate(),
        };
      }
      if (!(this.state.birthDate === undefined)) {
        retirementDateDropdownOptions = {
          minDate: birthDateOffsetByMinYearsInService.toDate(),
        };
      }
    }

    return (
      <span>
        <main className='ma__form-page' id='main-content' tabIndex='-1'>
          <div className='pre-content'>
            <h2 className='ma__colored-heading ma__colored-heading--green'>Pension Estimate Calculator (MSRB)</h2>
            <BackButton onClick={this.props.onBackButtonPressed} />
          </div>
          <div className='page-content'>
            <div className='main-content main-content--two'>
              <form className='ma__form-page' action='#'>
                <div className='ma__error-list js-error-list' tabIndex='-1'>
                  <div className='ma__error-list__container'>
                    <div className='ma__error-list__header'>
                      <span className='ma__error-list__icon' />
                      <span className='ma__error-list__title'>Sorry, please correct the indicated errors</span>
                    </div>
                    <ul className='ma__error-list__messages'>
                      <li className='ma__error-list__message'>
                        <label className='ma__error-list__label' htmlFor='dob' aria-label=''>Please fill in the first field</label>
                      </li>
                    </ul>
                  </div>
                </div>
                <section>
                  <label htmlFor='date-input'><h4>Date of Birth</h4></label>
                  <RequiredFields hasSubmittedForm={this.state.hasAttemptedSubmit}>
                    <Pikaday inputRel={(ele) => {this.birthDateEle = ele;}} value={this.state.birthDate} onChange={this.handleBirthDateChange} initialOptions={birthDateDropdownOptions} />
                  </RequiredFields>
                </section>
                <section>
                  <label htmlFor='date-input'><h4>Projected Date of Retirement</h4></label>
                  <RequiredFields hasSubmittedForm={this.state.hasAttemptedSubmit}>
                    <Pikaday inputRel={(ele) => {this.retirementEle = ele;}} value={this.state.retirementDate} onChange={this.handleRetirementChange} initialOptions={retirementDateDropdownOptions} />
                  </RequiredFields>
                </section>
                <section>
                  <label htmlFor='date-input'><h4>Select Group Classification</h4>
                    <label className='ma__helper-text'>
                      <p>Group 1: Members are officials and general employees (clerical, administrative, technical workers, laborers, etc). </p>
                      <p> Group 2: Members are probation officers, court officers, and certain correctional positions. </p>
                      <p> Group 4: Members are public safety officers and officials, and correction officers</p>
                    </label>
                  </label>
                  <div className='ma__select-box__field'>
                    <RequiredFields hasSubmittedForm={this.state.hasAttemptedSubmit}>
                      <select onChange={this.onGroupSelect} value={this.state.group} name='color-select' id='color-select' className='ma__select-box__select js-dropdown-select'>
                        <option value='1'>Group 1</option>
                        <option value='2'>Group 2</option>
                        <option value='4'>Group 4</option>
                      </select>
                      <div className='ma__select-box__link'>
                        <span className='js-dropdown-link'>Group {this.state.group}</span>
                        <span className='ma__select-box__icon' />
                      </div>
                    </RequiredFields>
                  </div>
                </section>
                <section>
                  <div className='btn-toolbar'>
                    <a className='ma__button' onClick={this.onSubmit}>
                      Continue
                    </a>
                  </div>
                </section>
              </form>
            </div>
          </div>
        </main>
      </span >
    );
  }
}

export default Form_1;
