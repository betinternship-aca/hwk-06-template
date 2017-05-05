'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');
const fs = require('fs');

global.window = global;

suite('map', () => {
    require('../solutions/map');

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const code = fs.readFileSync('solutions/map.js', {encoding: 'utf8'});

    test(`should work as Array's map method`, () => {
        const context = {};
        const identity = a => a;
        const increase = 7;
        const valueMap = a => a + increase;

        const clone = Array.map(numbers, identity);
        const changed = Array.map(numbers, valueMap);

        Array.map(numbers, function() {
            expect(this).to.equal(context);
        }, context);

        expect(clone).to.deep.equal(numbers);
        expect(changed.every((item, ind) => item - numbers[ind] === increase)).to.be.true;
    });

    test(`should work also for arrayLike objects`, () => {
        const identity = a => a;

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

        expect(Array.map(str, identity)).to.deep.equal(strArray);
        expect(Array.map(args, identity)).to.deep.equal(strArray);
        expect(Array.map(myArrayLike, identity)).to.deep.equal(Array.from(myArrayLike));
    });

    test(`should use native map`, () => {
        expect(/Array\s*\.\s*prototype\s*\.\s*map/.test(code)).to.be.true;
    });
});
