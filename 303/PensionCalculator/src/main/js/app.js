import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

import client from './client';
import Homepage from './homepage';
import { HashRouter } from 'react-router-dom';
import Form_1 from './form_1';
import Form_2 from './form_2';
import Results from './results';

class App extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      // 0 = homepage,
      // 1 = first form page
      // 2 = second page
      // 3 = results page
      viewingPage: 0,

      // If set to true, will show the results under the second form page. 
      showResults: false,

      pageOneState: undefined,
      pageTwoState: undefined,
    };


    this.onHomepageSubmit = this.onHomepageSubmit.bind(this);
    this.onPageOneSubmit = this.onPageOneSubmit.bind(this);
    this.onPageTwoSubmit = this.onPageTwoSubmit.bind(this);
    this.onResultsSubmit = this.onResultsSubmit.bind(this);
    this.onBackButtonPressed = this.onBackButtonPressed.bind(this);
  }

  onHomepageSubmit(authenticatedUserData) {
    console.log('onHomepageSubmit called');
    this.setState({
      viewingPage: 1,
      authenticatedUserData: authenticatedUserData,
    });
  }

  onPageOneSubmit(pageOneDetails) {
    console.log('onPageOneSubmit called', pageOneDetails);
    this.state.pageOneState = pageOneDetails;
    this.state.viewingPage = 2;
    this.setState(this.state);
  }

  onPageTwoSubmit(pageTwoDetails) {
    console.log('onPageTwoSubmit called', pageTwoDetails);
    // Transition to viewing the results page
    this.state.pageTwoState = pageTwoDetails;
    this.state.viewingPage = 3;
    this.setState(this.state);
  }

  onResultsSubmit() {
    console.log('onResultsSubmit called');
    this.state.viewingPage = 1;
    this.setState(this.state);
  }

  onBackButtonPressed() {
    console.log('On back button pressed');
    this.state.viewingPage = Math.max(this.state.viewingPage - 1, 0);
    this.setState(this.state);
  }

  render() {
    if (this.state.viewingPage === 0) {
      return <Homepage onSubmit={this.onHomepageSubmit} />;
    } else if (this.state.viewingPage === 1) {
      return <Form_1 onSubmit={this.onPageOneSubmit}
      onBackButtonPressed={this.onBackButtonPressed}
      authenticatedUserData={this.state.authenticatedUserData}
      initialState={this.state.pageOneState} />;
    } else if (this.state.viewingPage === 2) {
      return <Form_2 onSubmit={this.onPageTwoSubmit}
      onBackButtonPressed={this.onBackButtonPressed}
      authenticatedUserData={this.state.authenticatedUserData}
      initialState={this.state.pageTwoState} />;
    } else if (this.state.viewingPage === 3) {
      const mergedState = Object.assign(this.state.pageOneState, this.state.pageTwoState);
      return <Results onSubmit={this.onResultsSubmit} { ...mergedState } />;
    }

    console.error('Invalid state', this.state.viewingPage);
    // To silence ESLint
    return undefined;
  }
}

ReactDOM.render(
  (
    <HashRouter>
      <App />
    </HashRouter>),
  document.getElementById('react'),
);
