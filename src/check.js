import { is } from 'immutable';
import { getIn } from './utils';

export function check(config, prev = {}, next = {}, label) {
  let checkItem = createChecker(prev, next, label);
  let checklist = config || Object.keys({ ...next, ...prev });

  return checklist.every(checkItem);
}

function createChecker(prev, next) {
  return function(name) {
    if (typeof name === 'string') {
      return is(next[name], prev[name]);
    } else if (Array.isArray(name)) {
      return is(getIn(next, name), getIn(prev, name));
    }

    throw new TypeError('Invalid key: expected Array or string: ' + name);
  };
}
