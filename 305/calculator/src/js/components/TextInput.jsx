import React, { Component } from 'react';
import styles from '../../style/text-input.scss';

/**
 * Render a text input field
 */
export default class TextInput extends Component {
    render() {
        return (
            <input
                className={styles['text-input']}
                type='text'
                {...this.props} />
        );
    }
}
