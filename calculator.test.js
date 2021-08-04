const { expect } = require('@jest/globals');
const calculator = require('./calculator');

test('evaluates to 22', () => expect(calculator('3 * 7 +1')).toBe(22));

test('evaluates to 9.5', () => expect(calculator('3 * 7 / 2 - 1')).toBe(9.5));

test('evalutes to 21', () => expect(calculator('3 * 7 / (2 - 1)')).toBe(21));

test('evaluates to 3', () => expect(calculator('(1) + (2)')).toBe(3));

test('evaluates to 11', () => expect(calculator('(7)-(0)+(4)')).toBe(11));

test('evaluates to 0.8', () => expect(calculator('2 / (3 + 2) * 2')).toBe(0.8));

test('evaluates to 14.8', () => expect(calculator('((10+16)-(2*3))+((9/5)-7)')).toBe(14.8));

test('evaluates to Infinity', () => expect(calculator('(2 + 6) * 5 / (1-1) * 2')).toBe(Infinity));

test('throws invalid expression error', () => {
  function validateError() {
    calculator('(1 + 3)(2 - 4)');
  }
  expect(validateError).toThrowError('Invalid expression');
});

test('throws invalid expression when brackets are not in order', () => {
  function validateError() {
    calculator(') * (1 + 3)');
  }
  expect(validateError).toThrowError('Invalid expression');
});

test('evaluates to 21.2', () => expect(calculator('((10.8 + 16.7) - (2 * 3.15))')).toBe(21.2));
