const { is, List } = Immutable;

class ImmutablePureComponent extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    const state = this.state || {};

    return !(this.updateOnProps || Object.keys(nextProps)).every((p) => is(nextProps[p], this.props[p]))
      || !(this.updateOnStates || Object.keys(nextState || {})).every((s) => is(nextState[s], state[s]));
  }
}

class Example extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: List(),
      current: 'square',
    };

    this.handleAdd = () => {
      const { items, current } = this.state;
      this.setState({
        items: items.push(current),
        current: current === 'circle' ? 'square' : 'circle',
      });
    };

  }

  render() {
    const { items, current } = this.state;
    return (
      <div className="example">
        <div className="add-section">
          <div className={current}/>
          <button
            type="button"
            onClick={this.handleAdd}
            className="add-button btn btn-secondary"
          >
            Add { current }
          </button>
        </div>

        <ItemList items={items.filter(i => i === 'square')}/>
        <ItemList2 items={items.filter(i => i === 'circle')}/>
      </div>
    );
  }
}

var ItemsListRenders = 0;
var ItemsList2Renders = 0;

const mapItem = (item) => <div className={item}/>;

class ItemList extends React.PureComponent {

  componentWillUpdate() {
    ItemsListRenders += 1;
  }

  render() {
    const items = this.props.items.map(mapItem);
    return (
      <div className="item-list">
        <div className="counter">
          Render count: { ItemsListRenders }
        </div>
        <div className="items">
          {items}
        </div>
      </div>
    );
  }
}

class ItemList2 extends ImmutablePureComponent {

  componentWillUpdate() {
    ItemsList2Renders += 1;
  }

  render() {
    const items = this.props.items.map(mapItem);
    return (
      <div className="item-list">
        <div className="counter">
          Render count: { ItemsList2Renders }
        </div>
        <div className="items">
          {items}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Example/>, document.getElementById('example'));

