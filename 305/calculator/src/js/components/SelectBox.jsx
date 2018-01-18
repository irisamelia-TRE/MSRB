import React, { Component } from 'react';
import styles from '../../style/select-box.scss';

/**
 * Render a select box option
 */
export default class SelectBox extends Component {
    render() {
        const {options, ...others} = this.props;
        const optionItems = options.map(({value, label}, index) =>
            <option key={index} value={value}>{label}</option>
        );

        return (
            <select className={styles['select-box']}
                {...others}>{optionItems}</select>
        );
    }
}
