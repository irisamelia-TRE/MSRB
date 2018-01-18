/* eslint max-len: 0 */  // --> OFF

import React, { Component } from 'react';
import styles from '../../style/agreement.scss';

/**
 * Render the agreement
 * Pass onClick prop
 */
export default class Agreement extends Component {
    render() {
        const {onClick} = this.props;
        return (
            <div>
                <h3>Please Read and Agree Before Filling Out the Form:</h3>
                <p>
                    I understand that the information and/or calculations displayed on this site do not necessarily reflect the actual amount of my retirement allowance.
                    The results provided by this calculator are approximations and should not be considered as the final determination of my retirement benefit.
                    They should not be relied upon for planning purposes.
                </p>
                <h3>
                    You must agree to use the calculator.
                    I <input type='button' value='Agree' className={styles['agree-button']} onClick={onClick}></input>.
                </h3>
            </div>
        );
    }
}
