const assert = require('assert');

const api = require('../public/js/user-service');
const app = require('../app');

describe('app', function () {
    describe('server start', function () {
        it('should start the server without any errors', function () {
            const a = app;
        })
    })
});

const helper = function(arg) {
    return arg;
};

describe('API', function () {
    describe('getUsers', function () {
        it('should get all users from db', function () {
            api.setTest(false);
            api.getUsers({}, {json: helper, sendStatus: helper});
        })
    })
});

describe('API', function () {
    describe('getUsersBySSN', function () {
        it('should get a user from db', function () {
            api.setTest(false);
            api.getUserBySSN({params: {SSN: '385171583'}}, {json: helper, sendStatus: helper});
        })
    })
});

describe('API', function () {
    describe('error cases', function () {
        it('should handle errors', function () {
            api.setTest(true);
            api.getUsers({}, {json: helper, sendStatus: helper});
            api.getUserBySSN({params: {SSN: '385171583'}}, {json: null, sendStatus: helper});
            api.getUserBySSN({params: {SSN: '38517158'}}, {json: null, sendStatus: helper});
        })
    })
});

var calculator = require('./../public/js/importablecalc.js');

describe('Calculator', function () {
    describe('test calc', function () {
        it('tests all cases of calculator logic based on examples from PDF', function () {
            const out1 = calculator({
                eys: 15.5,
                dob: new Date('November 10, 1957'),
                ssd: new Date('May 1, 2013'),
                group: 1,
                arc: 42000
            });
            assert.equal(out1['optionA'], 9439.5);

            const out2 = calculator({
                eys: 32,
                dob: new Date('November 10, 1949'),
                ssd: new Date('May 1, 2012'),
                group: 1,
                arc: 36000
            });
            assert.equal(out2['optionA'], 28800);

            const out3 = calculator({
                eys: 41,
                dob: new Date('November 10, 1952'),
                ssd: new Date('April 2, 2012'),
                group: 4,
                arc: 58833,
                veteran: true
            });
            assert.equal(out3['optionA'], 47366.4);

            const out4 = calculator({
                eys: 15,
                dob: new Date('November 10, 1962'),
                ssd: new Date(),
                group: 2,
                arc: 35000,
                veteran: true
            });
            assert.equal(out4['optionA'], 7837.5);

            const out5 = calculator({
                eys: 15.5,
                dob: new Date('November 30, 1961'),
                ssd: new Date('February 10, 2012'),
                group: 1,
                arc: 24333
            });
            assert.equal(out5['optionA'], 6034.58);

            const out6 = calculator({
                eys: 15,
                dob: new Date('November 10, 1942'),
                ssd: new Date('April 1, 2012'),
                group: 2,
                arc: 25000,
                veteran: true
            });
            assert.equal(out6['optionA'], 9600);

            const out7 = calculator({
                eys: 15,
                dob: new Date('November 10, 1942'),
                ssd: new Date('November 10, 1982'),
                group: 4,
                arc: 25000,
                veteran: false
            });
            assert.equal(out7['optionA'], 9375);

            const out8 = calculator({
                eys: 15,
                dob: new Date('November 10, 1982'),
                ssd: new Date('November 10, 1982'),
                group: 2,
                arc: 25000,
                veteran: true
            });
            assert.equal(out8['optionA'], 412.5);

            const out9 = calculator({
                eys: 15.5,
                dob: new Date('November 30, 1941'),
                ssd: new Date('November 10, 1982'),
                group: 1,
                arc: 24333
            });
            assert.equal(out9['optionA'], 9429.04);

            const out10 = calculator({
                eys: -1,
                dob: new Date('November 30, 1941'),
                ssd: new Date('November 10, 1982'),
                group: 1,
                arc: 24333
            });
            assert.equal(out10['optionA'], -608.33);

            const out11 = calculator({
                eys: 41,
                dob: new Date('November 10, 1966'),
                ssd: new Date('April 3, 2012'),
                group: 4,
                arc: 58833,
                veteran: true
            });
            assert.equal(out11['optionA'], 39497.49);

            const out12 = calculator({
                eys: 41,
                dob: new Date('November 10, 1982'),
                ssd: new Date('April 3, 2012'),
                group: 2,
                arc: 58833,
                veteran: true
            });
            assert.equal(out12['optionA'], 39497.49);

            const out13 = calculator({
                eys: 41,
                dob: new Date('November 10, 1942'),
                ssd: new Date('April 3, 2012'),
                group: 2,
                arc: 58833,
                veteran: true
            });
            assert.equal(out13['optionA'], 47366.4);

            const out14 = calculator({
                eys: 41,
                dob: new Date('November 10, 1982'),
                ssd: new Date('April 3, 2012'),
                group: 1,
                arc: 58833,
                veteran: true
            });
            assert.equal(out14['optionA'], 39497.49);

            const out15 = calculator({
                eys: -1,
                dob: new Date('November 10, 1982'),
                ssd: new Date('April 3, 2012'),
                group: 1,
                arc: 58833,
                veteran: true
            });
            assert.equal(out15['optionA'], -868.08);

            const out16 = calculator({
                eys: 15.5,
                dob: new Date('November 30, 1982'),
                ssd: new Date('November 10, 1982'),
                group: 1,
                arc: 24333
            });
            assert.equal(out16['optionA'], 188.58);

            const out17 = calculator({
                eys: 15.5,
                dob: new Date('November 30, 1982'),
                ssd: new Date('November 10, 1982'),
                group: 4,
                arc: 24333
            });
            assert.equal(out17['optionA'], 188.58);

            const out18 = calculator({
                eys: 15.5,
                dob: new Date('December 30, 1982'),
                ssd: new Date('November 10, 1982'),
                group: 4,
                arc: 24333
            });
            assert.equal(out18['optionA'], 188.58);
        })
    })
});