var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Immutable = Immutable,
    List = _Immutable.List;
var ImmutablePureComponent = ImmutablePureComponent.ImmutablePureComponent;

var Example = function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example(props) {
    _classCallCheck(this, Example);

    var _this = _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).call(this, props));

    _this.state = {
      items: List(),
      current: 'square'
    };

    _this.handleAdd = function () {
      var _this$state = _this.state,
          items = _this$state.items,
          current = _this$state.current;

      _this.setState({
        items: items.push(current),
        current: current === 'circle' ? 'square' : 'circle'
      });
    };

    return _this;
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
