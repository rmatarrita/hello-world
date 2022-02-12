//initial text

const { test } = require('@jest/globals');
const powerModule = require('./power');
const power = powerModule.power;
const pow = powerModule.powerLogN;
//import { powerLogN as pow} from './power.js';

test('elevates 2 to the power of 10 and gets 1024', () => {
  expect(pow(2, 10)).toBe(1024);
});

test('expect 3^2 to give 9', () => {
    expect(pow(3,0)).toBe(1);
});

test('elevates 2 to the power of 10 and gets 1024', () => {
    expect(power(2, 10)).toBe(1024);
  });

test('expect 3^2 to give 9', () => {
    expect(power(3,0)).toBe(1);
});