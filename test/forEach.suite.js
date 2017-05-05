'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');
const fs = require('fs');

global.window = global;

suite('forEach', () => {
    require('../solutions/forEach');

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const code = fs.readFileSync('solutions/forEach.js', {encoding: 'utf8'});

    test(`should work as Array's forEach method`, () => {
        const context = {};
        const clone = new Array(numbers.length);

        Array.forEach(numbers, function(item, ind) {
            clone[ind] = item;
            expect(this).to.equal(context);
        }, context);

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

        Array.forEach(str, (item, ind) => {
            expect(str[ind]).to.equal(item);
        });

        Array.forEach(args, (item, ind) => {
            expect(args[ind]).to.equal(item);
        });

        Array.forEach(myArrayLike, (item, ind) => {
            expect(myArrayLike[ind]).to.equal(item);
        });
    });

    test(`should use native forEach`, () => {
        expect(/Array\s*\.\s*prototype\s*\.\s*forEach/.test(code)).to.be.true;
    });
});
