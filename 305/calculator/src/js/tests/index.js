import Adapter from 'enzyme-adapter-react-16';
import Agreement from '../components/Agreement';
import AppBody from '../components/AppBody';
import assert from 'assert';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

// this must be present in each test file that uses Enzyme
Enzyme.configure({adapter: new Adapter()});

describe('Agree button', () => {
    it('handles click events', () => {
        const onClick = sinon.spy();
        const wrapper = shallow(<Agreement onClick={onClick} />);
        wrapper.find('input').simulate('click');
        assert.equal(onClick.callCount, 1);
    });
});

function changeValue(input, value) {
    return input.simulate('change', { target: { value: value } });
}

describe('App', () => {
    const wrapper = mount(<AppBody />);
    it('hides agreement on agree', () => {
        const container = wrapper.find('#agree-container');
        assert.equal(container.prop('style').display, 'block');
        const button = wrapper.find('Agreement input');
        assert(button.exists());
        button.simulate('click');
        assert.equal(
            wrapper.find('#agree-container').prop('style').display,
            'none'
        );
    });
    it('shows entry form', () => {
        const container = wrapper.find('#entry-container');
        assert.equal(container.prop('style').display, 'block');
    });
    it('updates salary', () => {
        const newVal = '70000';
        changeValue(wrapper.find('NumberInput#salary-input'), newVal);
        assert.equal(wrapper.state('salary'), newVal);
    });
    it('generates and renders correct output', () => {
        const dob = '1990';
        const startYear = '2006';
        const retire = '2056';
        const annualOptA = 35000;
        changeValue(wrapper.find('YearInput#year-input'), dob);
        changeValue(wrapper.find('YearInput#start-input'), startYear);
        changeValue(wrapper.find('YearInput#retire-input'), retire);
        assert.equal(
            wrapper.find('#retirement-a-annual').text(),
            '$' + annualOptA.toLocaleString()
        );
    });
});
