'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmutablePureComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Copyright (C) 2017 Piotr Tomasz Monarski.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Licensed under the MIT License (MIT), see
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 https://github.com/Monar/react-immutable-pure-component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var ImmutablePureComponent = exports.ImmutablePureComponent = function (_React$Component) {
  _inherits(ImmutablePureComponent, _React$Component);

  function ImmutablePureComponent() {
    _classCallCheck(this, ImmutablePureComponent);

    return _possibleConstructorReturn(this, (ImmutablePureComponent.__proto__ || Object.getPrototypeOf(ImmutablePureComponent)).apply(this, arguments));
  }

  _createClass(ImmutablePureComponent, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this2 = this;

      var state = this.state || {};

      return !(this.updateOnProps || Object.keys(nextProps)).every(function (p) {
        return (0, _immutable.is)(nextProps[p], _this2.props[p]);
      }) || !(this.updateOnStates || Object.keys(nextState || {})).every(function (s) {
        return (0, _immutable.is)(nextState[s], state[s]);
      });
    }
  }]);

  return ImmutablePureComponent;
}(_react2.default.Component);

exports.default = ImmutablePureComponent;