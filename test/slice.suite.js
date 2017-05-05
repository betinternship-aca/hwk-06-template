'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');
const fs = require('fs');

global.window = global;

suite('slice', () => {
    require('../solutions/slice');

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const code = fs.readFileSync('solutions/slice.js', {encoding: 'utf8'});

    test(`only the first argument should be required`, () => {
        const clone = Array.slice(numbers);

        expect(clone).to.deep.equal(numbers);
    });

    test(`should slice the array like Array.prototype.slice is doing`, () => {
        const startIndex = 3;
        const endIndex = 7;
        const smartEndIndex = endIndex - numbers.length;
        const slice1 = Array.slice(numbers, startIndex);
        const slice2 = Array.slice(numbers, startIndex, endIndex);
        const slice3 = Array.slice(numbers, startIndex, smartEndIndex);

        expect(slice1.length).to.equal(numbers.length - startIndex);
        expect(slice2.length).to.equal(endIndex - startIndex);
        expect(slice3.length).to.equal(slice2.length);

        expect(slice2).to.deep.equal(slice3);
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

        expect(Array.slice(str)).to.deep.equal(strArray);
        expect(Array.slice(args)).to.deep.equal(strArray);
        expect(Array.slice(myArrayLike)).to.deep.equal(Array.from(myArrayLike));
    });

    test(`should use native slice`, () => {
        expect(/Array\s*\.\s*prototype\s*\.\s*slice/.test(code)).to.be.true;
    });
});
