import { is, isImmutable, isOrdered } from 'immutable';

const NOT_SET = {};

export function check(config, prev = {}, next = {}, label) {
  let checkItem = createChecker(prev, next, label);
  let checklist = config || Object.keys({ ...next, ...prev });

  return checklist.every(checkItem);
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

function get(collection, key, notSetValue) {
  return isImmutable(collection)
    ? collection.get(key, notSetValue)
    : typeof collection.get === 'function'
    ? collection.get(key, notSetValue)
    : hasOwnProperty.call(collection, key)
    ? collection[key]
    : notSetValue;
}

function coerceKeyPath(keyPath) {
  if (Array.isArray(keyPath) && typeof keyPath !== 'string') {
    return keyPath;
  }
  if (isOrdered(keyPath)) {
    return keyPath.toArray();
  }
  throw new TypeError(
    'Invalid keyPath: expected Ordered Collection or Array: ' + keyPath,
  );
}

function getIn(collection, searchKeyPath, notSetValue) {
  const keyPath = coerceKeyPath(searchKeyPath);
  let i = 0;
  while (i !== keyPath.length) {
    collection = get(collection, keyPath[i++], NOT_SET);
    if (collection === NOT_SET) {
      return notSetValue;
    }
  }
  return collection;
}
