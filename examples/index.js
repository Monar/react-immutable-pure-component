const { is } = Immutable;

class ImmutablePureComponent extends React.PureComponent {

  shouldComponentUpdate(nextProps, nextState) {
    const state = this.state || {};

    return !(this.updateOnProps || Object.keys(nextProps)).every((p) => is(nextProps[p], this.props[p]))
      || !(this.updateOnStates || Object.keys(nextState || {})).every((s) => is(nextState[s], state[s]));
  }
}

class StackExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      one: Immutable.List(),
      two: Immutable.List(),
    };

    this.handlePop = (stack) => { this.setState({ [stack]: this.state[stack].shift() }); };

    this.handlePush = (stack, value) => {
      this.setState({ [stack]: this.state[stack].unshift(value) });
    };
  }

  render() {
    return (
      <Stack
        onPush={(v) => this.handlePush('one', v)}
        onPop={() => this.handlePop('one')}
        items={this.state['one'].take(3)}
      />
    );
  }
}

class Stack extends ImmutablePureComponent {

  constructor(props) {
    super(props);

    this.handleAdd = (event) => {
      event.preventDefault();
      this.props.onPush(this.input.value);
    };
  }

  render() {
    return (
      <div className="container">
        <form className="form-inline" onSubmit={this.handleAdd}>
          <input ref={(n) => this.input = n} className="from-control" type="text"/>
          <button type="submit" className="btn btn-default">Push</button>
          <button type="button" onClick={this.props.onPop} className="btn btn-danger">Pop</button>
        </form>
        <div className="container">
          { this.props.items.map((i) => <p>{i}</p>) }
        </div>
      </div>
    );
  }
}

class Hello extends ImmutablePureComponent {

  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(<StackExample/>, document.getElementById('app'));

