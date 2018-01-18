import assert from 'assert';
import {computeRetirementBenefits} from '../calculateRetirement';

// Functional tests for the retirement benefit calculation Pre-2012 start date
describe('CalculateRetirement Pre 2012', () => {
    it('should properly calculate the annual retirement benefit for veterans', () => {
        assert.equal(computeRetirementBenefits(1, '10/12/1968', '4/4/2008', 0, '4/4/2018', true), 150);
        assert.equal(computeRetirementBenefits(1, '10/12/1968', '4/4/2008', 75000, '4/4/2018', true), 7650);
        assert.equal(computeRetirementBenefits(1, '10/12/1968', '4/4/1998', 75000, '4/4/2018', true), 15300);
        assert.equal(computeRetirementBenefits(2, '10/12/1968', '4/4/2008', 75000, '4/4/2018', true), 7650);
        assert.equal(computeRetirementBenefits(4, '10/12/1968', '4/4/2008', 75000, '4/4/2018', true), 15150);
        assert.equal(computeRetirementBenefits(1, '10/12/1968', '4/4/1973', 75000, '4/4/2018', true), 34425);
    });
    it('should properly calculate the annual retirement benefit for non veterans', () => {
        assert.equal(computeRetirementBenefits(1, '10/12/1968', '4/4/2008', 0, '4/4/2018', false), 0);
        assert.equal(computeRetirementBenefits(1, '10/12/1960', '4/4/1990', 75000, '4/4/2020', false), 45000);
        assert.equal(computeRetirementBenefits(2, '10/12/1960', '4/4/1990', 75000, '4/4/2020', false), 56250);
        assert.equal(computeRetirementBenefits(1, '10/12/1968', '4/4/2008', 75000, '4/4/2018', false), 7500);
        assert.equal(computeRetirementBenefits(4, '10/12/1960', '4/4/2008', 75000, '4/4/2018', false), 7500);
    });
});
// Tests for calculating the retirement benefit with a start date post 2012
describe('CalculateRetirement Post 2012', () => {
    it('should properly calculate the annual retirement benefit for veterans', () => {
        assert.equal(computeRetirementBenefits(1, '10/12/1968', '4/4/2013', 0, '4/4/2023', true), 150);
        assert.equal(computeRetirementBenefits(1, '10/12/1968', '4/4/2013', 75000, '4/4/2023', true), 7650);
        assert.equal(computeRetirementBenefits(2, '10/12/1980', '4/4/2020', 75000, '4/4/2050', true), 22950);
        assert.equal(computeRetirementBenefits(4, '10/12/1980', '4/4/2020', 75000, '4/4/2050', true), 22950);
        assert.equal(computeRetirementBenefits(1, '4/4/1990', '4/4/2020', 75000, '4/4/2050', true), 37012.5);
        assert.equal(computeRetirementBenefits(2, '10/12/1990', '4/4/2020', 75000, '4/4/2050', true), 49950);
        assert.equal(computeRetirementBenefits(4, '10/12/1995', '4/4/2020', 75000, '4/4/2050', true), 49950);

    });
    it('should properly calculate the annual retirement benefit for non veterans', () => {
        assert.equal(computeRetirementBenefits(1, '10/12/1968', '4/4/2013', 0, '4/4/2023', false), 0);
        assert.equal(computeRetirementBenefits(1, '4/4/1950', '4/4/2020', 75000, '4/4/2050', true), 22950);
    });
});
