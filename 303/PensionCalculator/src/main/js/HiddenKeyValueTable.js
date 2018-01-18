import React from 'react';

class HiddenKeyValueTable extends React.Component {

  //Expects listTitle, elementArray[{fieldElementName, valueString}]
  constructor(props) {
    super(props);
  }

  render() {
    const tableRows = this.props.elementArray.map(function (elem) {
      return (
        <tr className="is-offset" key={elem.fieldElementName}>
          <td data-label="Name">{elem.fieldElementName}</td>
          <td data-label="Value">{elem.valueString}</td>
        </tr>
      );
    })
    let headingComponent = null;
    if (this.props.listTitle) {
      headingComponent = (
        <h4 className="ma__comp-heading" tabIndex="-1">
          {this.props.listTitle}
        </h4>);
    }
    return (
      <div className="main-content main-content--two">
        {headingComponent}
        <label className="ma__helper-text" style={{width: "calc(100% - 295px)"}}>
          {this.props.listTitleDesc}
        </label>

        <div className="page-content" id='list-content'>
          <table className="ma__table ">
            <thead>
              <tr style={{ display: 'none' }}>
                <th scope='col'>Name</th>        
                <th scope='col'>Value</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default HiddenKeyValueTable;
