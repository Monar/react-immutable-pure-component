'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Immutable = Immutable,
    is = _Immutable.is,
    List = _Immutable.List;

var ImmutablePureComponent = function (_React$Component) {
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
        return is(nextProps[p], _this2.props[p]);
      }) || !(this.updateOnStates || Object.keys(nextState || {})).every(function (s) {
        return is(nextState[s], state[s]);
      });
    }
  }]);

  return ImmutablePureComponent;
}(React.Component);

var Example = function (_React$Component2) {
  _inherits(Example, _React$Component2);

  function Example(props) {
    _classCallCheck(this, Example);

    var _this3 = _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).call(this, props));

    _this3.state = {
      items: List(),
      current: 'square'
    };

    _this3.handleAdd = function () {
      var _this3$state = _this3.state,
          items = _this3$state.items,
          current = _this3$state.current;

      _this3.setState({
        items: items.push(current),
        current: current === 'circle' ? 'square' : 'circle'
      });
    };

    return _this3;
  }

  _createClass(Example, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          items = _state.items,
          current = _state.current;

      return React.createElement(
        'div',
        { className: 'example' },
        React.createElement(
          'div',
          { className: 'add-section' },
          React.createElement('div', { className: current }),
          React.createElement(
            'button',
            {
              type: 'button',
              onClick: this.handleAdd,
              className: 'add-button btn btn-secondary'
            },
            'Add ',
            current
          )
        ),
        React.createElement(ItemList, { items: items.filter(function (i) {
            return i === 'square';
          }) }),
        React.createElement(ItemList2, { items: items.filter(function (i) {
            return i === 'circle';
          }) })
      );
    }
  }]);

  return Example;
}(React.Component);

var ItemsListRenders = 0;
var ItemsList2Renders = 0;

var mapItem = function mapItem(item) {
  return React.createElement('div', { className: item });
};

var ItemList = function (_React$PureComponent) {
  _inherits(ItemList, _React$PureComponent);

  function ItemList() {
    _classCallCheck(this, ItemList);

    return _possibleConstructorReturn(this, (ItemList.__proto__ || Object.getPrototypeOf(ItemList)).apply(this, arguments));
  }

  _createClass(ItemList, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      ItemsListRenders += 1;
    }
  }, {
    key: 'render',
    value: function render() {
      var items = this.props.items.map(mapItem);
      return React.createElement(
        'div',
        { className: 'item-list' },
        React.createElement(
          'div',
          { className: 'counter' },
          'Render count: ',
          ItemsListRenders
        ),
        React.createElement(
          'div',
          { className: 'items' },
          items
        )
      );
    }
  }]);

  return ItemList;
}(React.PureComponent);

var ItemList2 = function (_ImmutablePureCompone) {
  _inherits(ItemList2, _ImmutablePureCompone);

  function ItemList2() {
    _classCallCheck(this, ItemList2);

    return _possibleConstructorReturn(this, (ItemList2.__proto__ || Object.getPrototypeOf(ItemList2)).apply(this, arguments));
  }

  _createClass(ItemList2, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      ItemsList2Renders += 1;
    }
  }, {
    key: 'render',
    value: function render() {
      var items = this.props.items.map(mapItem);
      return React.createElement(
        'div',
        { className: 'item-list' },
        React.createElement(
          'div',
          { className: 'counter' },
          'Render count: ',
          ItemsList2Renders
        ),
        React.createElement(
          'div',
          { className: 'items' },
          items
        )
      );
    }
  }]);

  return ItemList2;
}(ImmutablePureComponent);

ReactDOM.render(React.createElement(Example, null), document.getElementById('example'));
