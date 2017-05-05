'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');

global.window = global;

suite('from', () => {
    require('../solutions/slice');
    require('../solutions/map');
    require('../solutions/from');

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    test(`should clone array if only an array is passed`, () => {
        const clone = Array.from(numbers);

        expect(clone).to.deep.equal(numbers);
    });

    test(`should accept also arrayLike objects as it's first argument`, () => {
        const str = 'the example string';
        const strArray = [...str];
        const args = (function() {
            return arguments;
        }(...str));
        const myArrayLike = {
            [0]: 'str',
            [1]: 'is',
            [2]: 'empty',
            [3]: 'because',
            [4]: 'i',
            [5]: 'want',
            [6]: 'it',
            [7]: 'to',
            [8]: 'be',
            [9]: 'so',
            length: 10
        };

        expect(Array.from(str)).to.deep.equal(strArray);
        expect(Array.from(args)).to.deep.equal(strArray);
        expect(Array.from(myArrayLike)).to.deep.equal(Array.slice(myArrayLike));
    });

    test(`should work as Array.map if more than one argumet is passed`, () => {
        const context = {};
        const identity = a => a;
        const increase = 7;
        const valueMap = a => a + increase;

        const clone = Array.from(numbers, identity);
        const changed = Array.from(numbers, valueMap);

        Array.map(numbers, function() {
            expect(this).to.equal(context);
        }, context);

        expect(clone).to.deep.equal(numbers);
        expect(changed.every((item, ind) => item - numbers[ind] === increase)).to.be.true;
    });
});
