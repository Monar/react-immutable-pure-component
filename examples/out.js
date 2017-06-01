'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Immutable = Immutable,
    is = _Immutable.is;

var ImmutablePureComponent = function (_React$PureComponent) {
  _inherits(ImmutablePureComponent, _React$PureComponent);

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
        return is(nextProps[p], _this2.props[p]);
      }) || !(this.updateOnStates || Object.keys(nextState || {})).every(function (s) {
        return is(nextState[s], state[s]);
      });
    }
  }]);

  return ImmutablePureComponent;
}(React.PureComponent);

var StackExample = function (_React$Component) {
  _inherits(StackExample, _React$Component);

  function StackExample(props) {
    _classCallCheck(this, StackExample);

    var _this3 = _possibleConstructorReturn(this, (StackExample.__proto__ || Object.getPrototypeOf(StackExample)).call(this, props));

    _this3.state = {
      one: Immutable.List(),
      two: Immutable.List()
    };

    _this3.handlePop = function (stack) {
      _this3.setState(_defineProperty({}, stack, _this3.state[stack].shift()));
    };

    _this3.handlePush = function (stack, value) {
      _this3.setState(_defineProperty({}, stack, _this3.state[stack].unshift(value)));
    };
    return _this3;
  }

  _createClass(StackExample, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      return React.createElement(Stack, {
        onPush: function onPush(v) {
          return _this4.handlePush('one', v);
        },
        onPop: function onPop() {
          return _this4.handlePop('one');
        },
        items: this.state['one'].take(3)
      });
    }
  }]);

  return StackExample;
}(React.Component);

var Stack = function (_ImmutablePureCompone) {
  _inherits(Stack, _ImmutablePureCompone);

  function Stack(props) {
    _classCallCheck(this, Stack);

    var _this5 = _possibleConstructorReturn(this, (Stack.__proto__ || Object.getPrototypeOf(Stack)).call(this, props));

    _this5.handleAdd = function (event) {
      event.preventDefault();
      _this5.props.onPush(_this5.input.value);
    };
    return _this5;
  }

  _createClass(Stack, [{
    key: 'render',
    value: function render() {
      var _this6 = this;

      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'form',
          { className: 'form-inline', onSubmit: this.handleAdd },
          React.createElement('input', { ref: function ref(n) {
              return _this6.input = n;
            }, className: 'from-control', type: 'text' }),
          React.createElement(
            'button',
            { type: 'submit', className: 'btn btn-default' },
            'Push'
          ),
          React.createElement(
            'button',
            { type: 'button', onClick: this.props.onPop, className: 'btn btn-danger' },
            'Pop'
          )
        ),
        React.createElement(
          'div',
          { className: 'container' },
          this.props.items.map(function (i) {
            return React.createElement(
              'p',
              null,
              i
            );
          })
        )
      );
    }
  }]);

  return Stack;
}(ImmutablePureComponent);

var Hello = function (_ImmutablePureCompone2) {
  _inherits(Hello, _ImmutablePureCompone2);

  function Hello() {
    _classCallCheck(this, Hello);

    return _possibleConstructorReturn(this, (Hello.__proto__ || Object.getPrototypeOf(Hello)).apply(this, arguments));
  }

  _createClass(Hello, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        'Hello ',
        this.props.name
      );
    }
  }]);

  return Hello;
}(ImmutablePureComponent);

ReactDOM.render(React.createElement(StackExample, null), document.getElementById('app'));
