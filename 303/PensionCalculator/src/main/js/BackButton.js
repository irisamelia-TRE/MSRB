import React from 'react';

class BackButton extends React.Component {
  //Expects onClick function to be defined
  render() {
    return (
      <a className="ma__arrow-button ma__arrow-button--left"
        title="Navigation to previous page" onClick={this.props.onClick}>
      </a>
    );
  }
}

export default BackButton;
