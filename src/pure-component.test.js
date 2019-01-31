/* eslint-env node, jest */
import { ImmutablePureComponent } from './pure-component';
import * as checkLib from './check';

let checkSpy = jest.spyOn(checkLib, 'check');

const getTestComponent = (props = {}, state) => {
  const Component = new ImmutablePureComponent();
  Component.props = props;
  Component.state = state;
  return Component;
};

describe('ImmutablePureComponent', () => {
  afterEach(() => {
    checkSpy.mockClear();
  });

  it('call check with everything is the same', () => {
    let props = { a: { b: 0 }, c: 10 };
    let state = { a: 'state', c: { d: 0 } };
    let Component = getTestComponent(props, state);
    Component.updateOnProps = ['c', ['a', 'b']];
    Component.updateOnStates = [['c', 'd'], 'a'];

    let result = Component.shouldComponentUpdate({ ...props }, { ...state });

    expect(checkSpy.mock.calls.length).toBe(2);
    expect(result).toBe(false);
    expect(checkSpy.mock.calls[0]).toMatchSnapshot('first call');
    expect(checkSpy.mock.calls[1]).toMatchSnapshot('second call');
  });

  it('call check with props different', () => {
    let props = { a: { b: 0 }, c: 10 };
    let state = { a: 'state', c: { d: 0 } };
    let Component = getTestComponent(props, state);
    Component.updateOnProps = ['c', ['a', 'b']];
    Component.updateOnStates = [['c', 'd'], 'a'];

    let result = Component.shouldComponentUpdate({ a: {} }, { ...state });

    expect(checkSpy.mock.calls.length).toBe(1);
    expect(result).toBe(true);
    expect(checkSpy.mock.calls[0]).toMatchSnapshot();
  });

  it('call check with state different', () => {
    let props = { a: { b: 0 }, c: 10 };
    let state = { a: 'state', c: { d: 0 } };
    let Component = getTestComponent(props, state);
    Component.updateOnProps = ['c', ['a', 'b']];
    Component.updateOnStates = [['c', 'd'], 'a'];

    let result = Component.shouldComponentUpdate(
      { ...props },
      { ...state, a: 'changed' },
    );

    expect(checkSpy.mock.calls.length).toBe(2);
    expect(result).toBe(true);
    expect(checkSpy.mock.calls[0]).toMatchSnapshot('first call');
    expect(checkSpy.mock.calls[1]).toMatchSnapshot('second call');
  });
});
