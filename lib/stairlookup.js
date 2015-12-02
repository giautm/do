"use strict";
/* global module */

module.exports = function stairLookup(stair, value) {
/*
    if (!stair.sorted) {
        stair.levels.sort((lhs, rhs) => lhs.level - rhs.level);
        stair.sorted = true;
    }
*/

    let currentUpper = 0;
    let currentValue = 0;

    for (let l of stair.levels) {

        switch (l.type) {
            case 'fixed':
                currentUpper = l.upper;
                currentValue = l.value;
                break;
            case 'added':
            {
                if (!l.step || l.step <= 0) {
                    throw new Error('Invalid level step');
                }

                let upper = (l.upper && l.upper < value) ? l.upper : value;
                let steps = Math.ceil((upper - l.lower) / l.step);

                currentUpper += steps * l.step;
                currentValue += steps * l.value;

                break;
            }
            case 'percent':
            {
                let upper = (l.upper && l.upper < value) ? l.upper : value;

                currentUpper = upper;
                currentValue = upper * l.value;

                break;
            }
            default:
                console.log('Unsupported: ' + l.type);
        }

        if (l.bound && l.bound.lower) {
            currentValue = Math.max(currentValue, l.bound.lower);
        }
        if (l.bound && l.bound.upper) {
            currentValue = Math.min(currentValue, l.bound.upper);
        }

        if (value <= currentUpper) {
            return {
                level: l.level,
                upper: currentUpper,
                value: currentValue
            };
        }
    }

    return undefined;
};