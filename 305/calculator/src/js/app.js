import AppBody from './components/AppBody';
import React from 'react';
import { render } from 'react-dom';
import '../style/app.scss';

/**
 * Render the calculator application
 */
render(<AppBody />, document.getElementById('app'));
