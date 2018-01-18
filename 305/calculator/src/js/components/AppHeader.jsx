/* eslint max-len: 0 */  // --> OFF

import React, { Component } from 'react';
import styles from '../../style/header.scss';

/**
 * The mayflower header
 */
export default class AppBody extends Component {
    hack() {
        return {__html: `
<span>Search</span>
<svg aria-hidden='true' width='20' height='20' viewBox='0 0 20 20'><path d='M1424.99 107.4L1419.66 102.105C1420.44 100.884 1420.89 99.4383 1420.89 97.8892C1420.89 93.54 1417.3300000000002 90 1412.95 90C1408.57 90 1405.01 93.54 1405.01 97.89C1405.01 102.241 1408.57 105.781 1412.95 105.781C1414.43 105.781 1415.82 105.375 1417.01 104.67L1422.3799999999999 110ZM1407.97 97.89C1407.97 95.1625 1410.2 92.9416 1412.95 92.9416C1415.7 92.9416 1417.93 95.1617 1417.93 97.89C1417.93 100.619 1415.7 102.839 1412.95 102.839C1410.2 102.839 1407.97 100.619 1407.97 97.89Z ' transform='matrix(1,0,0,1,-1405,-90)'></path></svg>`
        };
    }

    /**
     * Render the header
     */
    render() {
        return (
            <header className={styles['header']}>
                <div className={styles['utility-nav']}></div>
                <div className={styles['header-container']}>
                    <div className={styles['header-logo']}>
                        <a href='http://mayflower.digital.mass.gov/' title='mass.gov home page'>
                            <img src='http://mayflower.digital.mass.gov/assets/images/pilot-logo.png' alt='mass.gov' width='164' height='75'></img>
                        </a>
                    </div>
                    <section className={styles['search']}>
                        <form action='#'>
                            <label htmlFor='header-search' className='visually-hidden'>Search terms</label>
                            <input id='header-search' className={styles['search-input']} placeholder='Search Mass.gov' type='text'>
                            </input>
                            <button type='submit' className={styles['search-button']} dangerouslySetInnerHTML={this.hack()}>
                            </button>
                        </form>
                    </section>
                </div>
                <nav>
                    <h2 id='main_navigation' className='visually-hidden'>Main Navigation</h2>
                    <section className={styles['main-nav']}>
                        <ul className={styles['nav-items']}>
                            <li className={styles['main-nav-item']}>
                                <button className={styles['main-nav-top-link']}>Living</button>
                            </li>
                            <li className={styles['main-nav-item']}>
                                <button className={styles['main-nav-top-link']}>Working</button>
                            </li>
                            <li className={styles['main-nav-item']}>
                                <button className={styles['main-nav-top-link']}>Learning</button>
                            </li>
                            <li className={styles['main-nav-item']}>
                                <button className={styles['main-nav-top-link']}>Visiting & Exploring</button>
                            </li>
                            <li className={styles['main-nav-item']}>
                                <button className={styles['main-nav-top-link']}>Your Government</button>
                            </li>
                        </ul>
                    </section>
                </nav>
            </header>
        );
    }
}
