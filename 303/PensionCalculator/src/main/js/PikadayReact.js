import React from 'react';
import Pikaday from 'pikaday';

var ReactPikaday = React.createClass({

  propTypes: {
    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func,
    initialOptions: React.PropTypes.object,
    inputRel: React.PropTypes.func,

    valueLink: React.PropTypes.shape({
      value: React.PropTypes.instanceOf(Date),
      requestChange: React.PropTypes.func.isRequired,
    }),
  },

  getDefaultProps: function () {
    return {
      initialOptions: {},
    };
  },

  getValueLink: function (props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange,
    };
  },

  refreshMinMaxDate: function refreshMinMaxDate(){
    if (!(this._picker === undefined)) {
      this._picker.setMinDate(this.props.initialOptions.minDate);
      this._picker.setMaxDate(this.props.initialOptions.maxDate);
    }
  },

  setDateIfChanged: function (newDate, prevDate) {
    let newTime = newDate ? newDate.getTime() : null;
    let prevTime = prevDate ? prevDate.getTime() : null;

    this.refreshMinMaxDate();

    if (newTime !== prevTime) {
      if (newDate === null) {
        // Workaround for pikaday not clearing value when date set to falsey
        this.refs.pikaday.value = '';
      }
      this._picker.setDate(newDate, true); // 2nd param = don't call onSelect
    }
  },

  // user props to pass down to the underlying DOM node
  getDomProps: function () {
    let restProps = {};
    for (let propKey in this.props) {
      if (this.props.hasOwnProperty(propKey) && !ReactPikaday.propTypes[propKey]) {
        restProps[propKey] = this.props[propKey];
      }
    }
    return restProps;
  },

  componentDidMount: function () {
    let el = this.refs.pikaday;

    this._picker = new Pikaday({
      field: el,
      onSelect: this.getValueLink(this.props).requestChange,
      ...this.props.initialOptions,
    });

    this.setDateIfChanged(this.getValueLink(this.props).value);
  },

  componentWillReceiveProps: function (nextProps) {
    let newDate = this.getValueLink(nextProps).value;
    let lastDate = this.getValueLink(this.props).value;

    this.setDateIfChanged(newDate, lastDate);
  },

  componentDidUpdate(prevProps, prevState) {
    this.props.inputRel(this.refs.pikaday)
  } ,

  render: function () {
    this.refreshMinMaxDate();
    return (
      <input type='text' ref='pikaday' { ...this.getDomProps() } />
    );
  },
});

export default ReactPikaday;
