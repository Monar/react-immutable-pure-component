/* eslint-env node, jest */
import { ImmutablePureComponent } from './src';

jest.mock('immutable', () => ({ is: () => true }));

const getTestComponent = (props = {}, state) => {
  const Component = new ImmutablePureComponent();
  Component.props = props;
  Component.state = state;
  return Component;
};

describe('check when immutable does not have getIn', () => {
  it('should throw when prop name is not a string', () => {
    const Component = getTestComponent({ a: 1 });
    Component.updateOnProps = [[]];
    expect(() =>
      Component.shouldComponentUpdate({ a: 1 }),
    ).toThrowErrorMatchingSnapshot();
  });

  it('should throw when state name is not a string', () => {
    const Component = getTestComponent({}, { a: 1 });
    Component.updateOnStates = [[]];
    expect(() =>
      Component.shouldComponentUpdate({}, { a: 1 }),
    ).toThrowErrorMatchingSnapshot();
  });
});
