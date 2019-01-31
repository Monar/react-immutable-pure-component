import React from 'react';
import { is, isImmutable, isOrdered } from 'immutable';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var NOT_SET = {};
function check(config) {
  var prev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var label = arguments.length > 3 ? arguments[3] : undefined;
  var checkItem = createChecker(prev, next, label);
  var checklist = config || Object.keys(_objectSpread({}, next, prev));
  return checklist.every(checkItem);
}

function createChecker(prev, next, checkName) {
  return function (name) {
    if (typeof name === 'string') {
      return is(next[name], prev[name]);
    }

    if (!getIn) {
      var value = JSON.stringify(name);
      throw new TypeError("Not supported value \"".concat(value, "\" provided to ").concat(checkName, ", try updating immutable to v4"));
    }

    return is(getIn(next, name), getIn(prev, name));
  };
}

function get(collection, key, notSetValue) {
  return isImmutable(collection) ? collection.get(key, notSetValue) : typeof collection.get === 'function' ? collection.get(key, notSetValue) : hasOwnProperty.call(collection, key) ? collection[key] : notSetValue;
}

function coerceKeyPath(keyPath) {
  if (Array.isArray(keyPath) && typeof keyPath !== 'string') {
    return keyPath;
  }

  if (isOrdered(keyPath)) {
    return keyPath.toArray();
  }

  throw new TypeError('Invalid keyPath: expected Ordered Collection or Array: ' + keyPath);
}

function getIn(collection, searchKeyPath, notSetValue) {
  var keyPath = coerceKeyPath(searchKeyPath);
  var i = 0;

  while (i !== keyPath.length) {
    collection = get(collection, keyPath[i++], NOT_SET);

    if (collection === NOT_SET) {
      return notSetValue;
    }
  }

  return collection;
}

var ImmutablePureComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ImmutablePureComponent, _React$Component);

  function ImmutablePureComponent() {
    _classCallCheck(this, ImmutablePureComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(ImmutablePureComponent).apply(this, arguments));
  }

  _createClass(ImmutablePureComponent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var nextState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return !check(this.updateOnProps, this.props, nextProps, 'updateOnProps') || !check(this.updateOnStates, this.state, nextState, 'updateOnStates');
    }
  }]);

  return ImmutablePureComponent;
}(React.Component);

function immutableMemo(Component, updateOnProps) {
  return React.memo(Component, function (prev, next) {
    return check(updateOnProps, prev, next, 'immutableMemo');
  });
}

export default ImmutablePureComponent;
export { ImmutablePureComponent, immutableMemo };
