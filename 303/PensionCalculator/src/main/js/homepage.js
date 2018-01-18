
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agreedToTos: false,
      authenticatedUserData: undefined,
    };

    this.onClick = this.onClick.bind(this);
    this.onSSNChange = this.onSSNChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginClicked = this.onLoginClicked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onClick() {
    this.state.agreedToTos = true;
    this.setState(this.state);
  }

  onLoginClicked() {
    const getEmployeeQuery = `/getEmployee?SSN=${this.state.SSN}&password=${this.state.password}`;
    const getEmploymentQuery = `/getEmployment?SSN=${this.state.SSN}`;
    let resultData = {};
    $.ajax({
      url: getEmployeeQuery,
    }).then((employeeData) => {
      resultData = Object.assign(resultData, employeeData);
      $.ajax({
        url: getEmploymentQuery,
      }).then((employmentData) => {
        resultData = Object.assign(resultData, employmentData);
        this.state.authenticatedUserData = resultData;
        console.log('Authenticated user with data: ', this.state.authenticatedUserData);
        this.setState(this.state);
      });
    });
  }

  onSSNChange(newSSN) {
    this.state.SSN = newSSN.target.value;
    this.setState(this.state);
  }
  onPasswordChange(newPassword) {
    this.state.password = newPassword.target.value;
    this.setState(this.state);
  }

  onSubmit() {
    this.props.onSubmit(this.state.authenticatedUserData);
  }

  render() {
    let agreeButton = null;
    let selectDate = null;
    let logIn = null;
    let loginForm = null;

    if (!this.state.agreedToTos) {
      agreeButton = <a href='#' className='ma__button' title='' onClick={this.onClick}>I Agree</a>;
    } else {
      const useOldCalculator = <a onClick={this.onSubmit}>
        <span className='ma__button'>BEFORE April 2, 2012&nbsp;</span>
      </a>;

      const useNewCalculator = <a onClick={this.onSubmit}>
        <span className='ma__button'>AFTER April 2, 2012&nbsp;</span>
      </a>;
      selectDate = (<span>
        <h2>When did you start your service?</h2>
        <div className='btn-toolbar'>
          {useOldCalculator}
          &nbsp; &nbsp; &nbsp;
          {useNewCalculator}
        </div>
      </span>);
    }

    if (this.state.authenticatedUserData === undefined) {
      loginForm = (
        <div>
          <h3>Log In</h3>
          <label
            htmlFor="text-input"
            className="ma__label ma__label--required ">SSN</label>
          <div className="ma__error-msg">Must enter an SSN</div>
          <input
            className="ma__input js-is-required"
            name="text-input"
            id="text-input"
            type="text"
            placeholder="SSN"
            data-type="text"
            onChange={this.onSSNChange}
            required />
          &nbsp;
          <label
            htmlFor="text-input"
            className="ma__label ma__label--required ">Password</label>
          <div className="ma__error-msg">Must enter a password</div>
          <input
            className="ma__input js-is-required"
            name="text-input"
            id="text-input"
            type="password"
            placeholder="Password"
            data-type="password"
            onChange={this.onPasswordChange}
            required /> &nbsp;
          <a href='#' className='ma__button' title='' onClick={this.onLoginClicked}>Log In</a>
        </div>
      );
    } else {
      loginForm = (
        <div>
          <h3>Signed in as {this.state.authenticatedUserData.firstName} {this.state.authenticatedUserData.lastName}</h3>
        </div>
      )
    }
    return (
      <span>
        <main className='ma__form-page' id='main-content' tabIndex='-1'>
          <div className='pre-content'>

            <section className='ma__page-header '>
              <div className='ma__page-header__content'>
                <h1 className='ma__page-header__title'>Pension Estimate Calculator (MSRB)</h1>
              </div>
            </section>
          </div>

          <div className='main-content main-content--two'>
            <div className='page-content'>

              <section className='ma__form-requirements'>
                <div className='ma__form-requirements__container'>
                  <div className='ma__form-requirements__title'>
                    <h2>Please Read and Agree Before Continuing</h2>
                  </div>
                  <section className='ma__rich-text js-ma-rich-text'>
                    <p>I understand that the information and/or calculations displayed on this site do not necessarily reflect the actual amount of my retirement allowance. The results provided by this calculator are approximations and should not be considered as the final determination of my retirement benefit. They should not be relied upon for planning purposes.</p>

                    {agreeButton}
                    {selectDate}

                  </section>
                </div>
              </section>
            </div>
            <aside className='sidebar ' style={{ align: 'right' }}>
              {loginForm}
              <section className='ma__contact-list '>
                <h2 className='ma__sidebar-heading'>Contact</h2>
                <section className='ma__contact-us  '>
                  <h3 className='ma__column-heading'>Massachusetts State Retirement Board</h3>
                  <div className='ma__contact-us__content js-accordion-content'>
                    <div className='ma__contact-group'>
                      <h4 className='ma__contact-group__name'>Phone</h4>
                      <div className='ma__contact-group__item'>
                        <span className='ma__contact-group__label'>Main: &nbsp;</span>
                        <a href='tel:+17817401605' className='ma__content-link ma__content-link--phone'> (617) 367-7770</a>
                      </div>
                    </div>
                    <div className='ma__contact-group'>
                      <h4 className='ma__contact-group__name'><span>Address</span></h4>
                      <div className='ma__contact-group__item'>
                        <span className='ma__decorative-link'>
                          <a href='https://www.google.com/maps?q=1+Winter+Street,+8th+Floor,+Boston,+MA+02108' className='js-clickable-link' title=''>1 Winter Street, 8th Floor, Boston, MA 02108</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </aside>
          </div>
        </main>
      </span>
    );
  }
}
export default Homepage;
