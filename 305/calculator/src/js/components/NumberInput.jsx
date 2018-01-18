import React, { Component } from 'react';
import styles from '../../style/number-input.scss';

/**
 * Render a number input
 */
export default class NumberInput extends Component {
    render() {
        return (
            <input
                className={styles['number-input']}
                type='number'
                {...this.props} />
        );
    }
}
