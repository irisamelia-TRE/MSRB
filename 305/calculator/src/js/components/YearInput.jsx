import React, { Component } from 'react';
import styles from '../../style/year-input.scss';

/**
 * Render a year input field
 */
export default class YearInput extends Component {
    render() {
        return (
            <input
                className={styles['year-input']}
                type='number'
                {...this.props} />
        );
    }
}
