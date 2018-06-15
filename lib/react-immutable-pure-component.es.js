import React from 'react';
import { is } from 'immutable';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImmutablePureComponent = function (_React$Component) {
  _inherits(ImmutablePureComponent, _React$Component);

  function ImmutablePureComponent() {
    _classCallCheck(this, ImmutablePureComponent);

    return _possibleConstructorReturn(this, (ImmutablePureComponent.__proto__ || Object.getPrototypeOf(ImmutablePureComponent)).apply(this, arguments));
  }

  _createClass(ImmutablePureComponent, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _this2 = this;

      var nextState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var state = this.state || {};

      return !(this.updateOnProps || Object.keys(_extends({}, nextProps, this.props))).every(function (p) {
        return is(nextProps[p], _this2.props[p]);
      }) || !(this.updateOnStates || Object.keys(_extends({}, nextState, state))).every(function (s) {
        return is(nextState[s], state[s]);
      });
    }
  }]);

  return ImmutablePureComponent;
}(React.Component);

export { ImmutablePureComponent };export default ImmutablePureComponent;
