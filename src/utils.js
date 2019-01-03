import { is, getIn } from 'immutable';

export function check(config, prev = {}, next = {}, label) {
  let checkItem = createChecker(prev, next, label);
  let checklist = config || Object.keys({ ...next, ...prev });

  return !checklist.every(checkItem);
}

function createChecker(prev, next, checkName) {
  return function(name) {
    if (typeof name === 'string') {
      return is(next[name], prev[name]);
    }

    if (!getIn) {
      let value = JSON.stringify(name);
      throw new TypeError(
        `Not supported value "${value}" provided to ${checkName}, try updating immutable to v4`,
      );
    }

    return is(getIn(next, name), getIn(prev, name));
  };
}
