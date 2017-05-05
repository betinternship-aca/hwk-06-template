'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');
const fs = require('fs');

global.window = global;

suite('filter', () => {
    require('../solutions/filter');

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const code = fs.readFileSync('solutions/filter.js', {encoding: 'utf8'});

    test(`should work as Array's filter method`, () => {
        const context = {};

        const clone = Array.filter(numbers, () => true);
        const empty = Array.filter(numbers, function() {
            expect(this).to.equal(context);
        }, context);

        expect(empty).to.be.empty;
        expect(clone).to.deep.equal(numbers);
    });

    test(`should work also for arrayLike objects`, () => {
        const str = 'the example string';
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

        expect(Array.filter(str, () => true)).to.deep.equal(Array.from(str));
        expect(Array.filter(args, () => true)).to.deep.equal(Array.from(args));
        expect(Array.filter(myArrayLike, () => true)).to.deep.equal(Array.from(myArrayLike));
    });

    test(`should use native filter`, () => {
        expect(/Array\s*\.\s*prototype\s*\.\s*filter/.test(code)).to.be.true;
    });
});
