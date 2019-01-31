/* eslint-env node, jest */
import { check } from './utils';

jest.mock('immutable', () => ({ is: () => true }));

describe('Test check when immutable does not have getIn', () => {
  xit('should throw when item to check is not a string', () => {
    let config = [['should', 'not', 'work'], 'this', "doesn't", 'matter'];
    expect(() => check(config, {}, {}, 'test')).toThrowErrorMatchingSnapshot();
  });
});
