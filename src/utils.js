const NOT_SET = {};

export function isMapLike(collection) {
  return (
    collection !== null &&
    typeof collection === 'object' &&
    typeof collection.get === 'function' &&
    typeof collection.has === 'function'
  );
}

function isInvalid(collection) {
  return collection === null || collection === undefined;
}

export function get(collection, key, notSetValue) {
  if (isInvalid(collection)) {
    return notSetValue;
  }

  if (isMapLike(collection)) {
    return collection.has(key) ? collection.get(key) : notSetValue;
  }

  return hasOwnProperty.call(collection, key) ? collection[key] : notSetValue;
}

export function getIn(collection, keyPath, notSetValue) {
  let i = 0;
  while (i !== keyPath.length) {
    collection = get(collection, keyPath[i++], NOT_SET);
    if (collection === NOT_SET) {
      return notSetValue;
    }
  }
  return collection;
}
