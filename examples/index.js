class ImmutablePureComponent extends React.PureComponent {

  shouldComponentUpdate(nextProps, nextState) {
    const checkStates = this.updateOnStates || Object.keys(nextState || {});
    const checkProps = this.updateOnProps || Object.keys(nextProps);
    const state = this.state || {};

    return !checkStates.every((s) => Immutable.is(nextState[s], state[s]))
      || !checkProps.every((p) => Immutable.is(nextProps[p], this.props[p]));
  }
}

class StackExample extends React.Component {

  constructor(props) {
    super(props);

    state = {
      one: Immutable.List(),
      two: Immutable.List(),
    }

    handlePop = (stack) => { this.setState({ [stack]: this.state[stack].unshift() }); };

    handlePush = (stack, value) => {
      this.setState({ [stack]: this.state[stack].shift(value) });
    };
  }

  render() {
    return (
      <Stack
        onPush={(v) => this.handlePush('one', v)}
        onPop={() => this.handlePop('one')}
        items={this.state['one'].take(3)}
      />
    )

  }
}

class Stack extends ImmutablePureComponent {
  constructor(props) {
    super(props);

    handleAdd = () => this.props.onPush(this.input.value);
  }

  render() {
    return (
      <div className="container">
        <form className="form-inline" onSubmit={this.handleAdd}>
          <input ref={(n) => this.input = n} className="from-control" type="text"/>
          <button type="submit" className="btn btn-default">Push</button>
          <button onClick={this.props.onPop} className="btn btn-danger">Pop</button>
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
    return React.createElement( "div", null, "Hello ", this.props.name);
  }
}

ReactDOM.render(<StackExample/>, document.getElementById('app'));

