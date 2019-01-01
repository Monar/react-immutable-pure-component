/* eslint-env node, jest */
import { Map, List, fromJS } from 'immutable';
import { ImmutablePureComponent } from './src';

const testProps = {
  someMap: Map({ key: 'value', deep: Map({ fuz: 'buzz' }) }),
  someList: List([1, 'elo', 2]),
  mixed: [{ test: true }, Map({ key: List(['1', 1, { y: 'z' }]) })],
  name: 'superComponent',
  other: 123,
  isOk: true,
};

const testState = {
  someMap: Map({ key: 'value', deep: Map({ fuz: 'buzz' }) }),
  someList: List([1, 'elo', 2]),
  mixed: [{ test: true }, Map({ key: List(['1', 1, { y: 'z' }]) })],
  name: 'superComponent',
  other: 123,
  isOk: true,
};

const getTestComponent = (props = {}, state) => {
  const Component = new ImmutablePureComponent();
  Component.props = props;
  Component.state = state;
  return Component;
};

describe('should not update', () => {
  it('empty', () => {
    const Component = getTestComponent({}, undefined);

    const result = Component.shouldComponentUpdate({}, undefined);
    expect(result).toBe(false);
  });

  it('same instance of props, no state', () => {
    const Component = getTestComponent(testProps, undefined);
    const result = Component.shouldComponentUpdate(testProps, undefined);
    expect(result).toBe(false);
  });

  it('same instance of state no props', () => {
    const Component = getTestComponent({}, testState);
    const result = Component.shouldComponentUpdate({}, testState);
    expect(result).toBe(false);
  });

  it('same instance of state and props', () => {
    const Component = getTestComponent(testProps, testState);
    const result = Component.shouldComponentUpdate(testProps, testState);
    expect(result).toBe(false);
  });

  it('same props and state but new instances', () => {
    const props = {
      someMap: Map({ key: 'value' }),
      someList: List([1, 'elo', 2]),
      name: 'superComponent',
      other: 123,
      isOk: true,
    };
    const state = {
      someMap: Map({ key: 'value' }),
      someList: List([1, 'elo', 2]),
      name: 'superComponent',
      other: 123,
      isOk: true,
    };
    const newProps = {
      someMap: Map({ key: 'value' }),
      someList: List([1, 'elo', 2]),
      name: 'superComponent',
      other: 123,
      isOk: true,
    };
    const newState = {
      someMap: Map({ key: 'value' }),
      someList: List([1, 'elo', 2]),
      name: 'superComponent',
      other: 123,
      isOk: true,
    };
    const Component = getTestComponent(props, state);
    const result = Component.shouldComponentUpdate(newProps, newState);
    expect(result).toBe(false);
  });

  it('same instance of object in props and state', () => {
    const test = { fis: 'bass' };
    const Component = getTestComponent({ test }, { test });
    const result = Component.shouldComponentUpdate({ test }, { test });
    expect(result).toBe(false);
  });

  it('same instance of object in props and state, but modified', () => {
    const test = { fis: 'bass' };
    const Component = getTestComponent({ test }, { test });

    test['new'] = 'new';

    const result = Component.shouldComponentUpdate({ test }, { test });
    expect(result).toBe(false);
  });

  it('same instance of function in props and state', () => {
    const test = { fis: () => {} };
    const Component = getTestComponent({ test }, { test });
    const result = Component.shouldComponentUpdate({ test }, { test });
    expect(result).toBe(false);
  });
});

describe('should update', () => {
  it('when add new property', () => {
    const Component = getTestComponent({}, undefined);

    const result = Component.shouldComponentUpdate({ elo: 'elo' }, undefined);
    expect(result).toBe(true);
  });

  it('when add new state', () => {
    const Component = getTestComponent({}, undefined);

    const result = Component.shouldComponentUpdate({}, { elo: 'elo' });
    expect(result).toBe(true);
  });

  it('when remove property', () => {
    const Component = getTestComponent({ elo: 'elo' }, undefined);

    const result = Component.shouldComponentUpdate({}, undefined);
    expect(result).toBe(true);
  });

  it('when remove state', () => {
    const Component = getTestComponent({}, { elo: 'elo' });

    const result = Component.shouldComponentUpdate({}, {});
    expect(result).toBe(true);
  });

  it('when modify any of the properties', () => {
    const Component = getTestComponent(testProps);

    expect(
      Component.shouldComponentUpdate({
        ...testProps,
        someMap: Map({ key: 'key' }),
      }),
    ).toBe(true, 'Map');
    expect(
      Component.shouldComponentUpdate({ ...testProps, someList: List([1, 2]) }),
    ).toBe(true, 'List');
    expect(
      Component.shouldComponentUpdate({ ...testProps, name: 'otherName' }),
    ).toBe(true, 'string');
    expect(Component.shouldComponentUpdate({ ...testProps, other: 321 })).toBe(
      true,
      'number',
    );
    expect(Component.shouldComponentUpdate({ ...testProps, isOk: false })).toBe(
      true,
      'boolean',
    );
  });

  it('new instance of object in props', () => {
    const test = { fis: 'bass' };
    const Component = getTestComponent({ test });

    const newTest = { fis: 'bass' };
    const result = Component.shouldComponentUpdate({ test: newTest });
    expect(result).toBe(true);
  });

  it('new instance of object in state', () => {
    const test = { fis: 'bass' };
    const Component = getTestComponent({}, { test });

    const newTest = { fis: 'bass' };
    const result = Component.shouldComponentUpdate({}, { test: newTest });
    expect(result).toBe(true);
  });

  it('new instance of function in props and state', () => {
    const test = { fis: () => {} };
    const Component = getTestComponent({ test }, { test });
    const result = Component.shouldComponentUpdate(
      { test: () => {} },
      { test: () => {} },
    );
    expect(result).toBe(true);
  });
});

describe('updateOnProps', () => {
  it('when empty list, and props change', () => {
    const Component = getTestComponent({});
    Component.updateOnProps = [];

    const result = Component.shouldComponentUpdate({ elo: 'elo' });
    expect(result).toBe(false);
  });

  it('when empty list, and state change', () => {
    const Component = getTestComponent({});
    Component.updateOnProps = [];

    const result = Component.shouldComponentUpdate({}, { elo: 'elo' });
    expect(result).toBe(true);
  });

  it('when defined and other prop changes', () => {
    const Component = getTestComponent({ elo: 'elo', isOk: false });
    Component.updateOnProps = ['elo', 'fis', 'buss'];

    const result = Component.shouldComponentUpdate({ elo: 'elo', isOk: true });
    expect(result).toBe(false);
  });

  it('when defined and prop changes', () => {
    const Component = getTestComponent({ elo: 'elo', isOk: false });
    Component.updateOnProps = ['elo', 'fis', 'buss'];

    const result = Component.shouldComponentUpdate({
      elo: 'elo2',
      isOk: false,
    });
    expect(result).toBe(true);
  });

  it('when given non existing prop should not update', () => {
    const Component = getTestComponent({});
    Component.updateOnProps = ['ghost'];

    const result = Component.shouldComponentUpdate({});
    expect(result).toBe(false);
  });
});

describe('updateOnProps deepCheck', () => {
  it('should throw when prop name is not a string and there is not getIn', () => {
    const Component = getTestComponent({ a: 1 });
    Component.updateOnProps = [[]];

    function getShouldComponentUpdateInNewScope() {
      // eslint-disable-next-line
      let x = Component.shouldComponentUpdate;
      return function(...args) {
        x.getIn = undefined;
        return x(...args);
      };
    }

    let w = getShouldComponentUpdateInNewScope();

    expect(() => w.call(Component, { a: 1 })).toThrowErrorMatchingSnapshot();
  });

  it('only empty array "get props" with same in to instances', () => {
    const Component = getTestComponent({ a: 1 });
    Component.updateOnProps = [[]];

    const result = Component.shouldComponentUpdate({ a: 1 });
    expect(result).toBe(true);
  });

  it('only empty array "get props" with same instances', () => {
    let props = { a: 1 };
    const Component = getTestComponent(props);
    Component.updateOnProps = [[]];

    const result = Component.shouldComponentUpdate(props);
    expect(result).toBe(false);
  });

  it('basic test with mutable data', () => {
    let props = { a: { b: ['0'] } };
    let testProps = { a: { b: ['2'] } };
    const Component = getTestComponent(props);
    Component.updateOnProps = [['a', 'b', 0]];

    const result = Component.shouldComponentUpdate(testProps);
    expect(result).toBe(true);
  });

  it('basic test with immutable data', () => {
    let props = { a: fromJS({ b: ['0'] }) };
    let testProps = { a: fromJS({ b: ['2'] }) };
    const Component = getTestComponent(props);
    Component.updateOnProps = [['a', 'b', 0]];

    const result = Component.shouldComponentUpdate(testProps);
    expect(result).toBe(true);
  });

  it('not existing path', () => {
    let props = { a: { b: ['0'] } };
    let testProps = { a: { b: ['2'] } };
    const Component = getTestComponent(props);
    Component.updateOnProps = [['a', 'c']];

    const result = Component.shouldComponentUpdate(testProps);
    expect(result).toBe(false);
  });
});

describe('updateOnStates', () => {
  it('when empty list, and state change', () => {
    const Component = getTestComponent({});
    Component.updateOnStates = [];

    const result = Component.shouldComponentUpdate({}, { elo: 'elo' });
    expect(result).toBe(false);
  });

  it('when empty list, and prop change', () => {
    const Component = getTestComponent({});
    Component.updateOnStates = [];

    const result = Component.shouldComponentUpdate({ elo: 'elo' }, {});
    expect(result).toBe(true);
  });

  it('when defined and other state changes', () => {
    const Component = getTestComponent({}, { elo: 'elo', isOk: false });
    Component.updateOnStates = ['elo', 'fis', 'buss'];

    const result = Component.shouldComponentUpdate(
      {},
      { elo: 'elo', isOk: true },
    );
    expect(result).toBe(false);
  });

  it('when defined and state changes', () => {
    const Component = getTestComponent({}, { elo: 'elo', isOk: false });
    Component.updateOnProps = ['elo', 'fis', 'buss'];

    const result = Component.shouldComponentUpdate(
      {},
      { elo: 'elo2', isOk: false },
    );
    expect(result).toBe(true);
  });
});

describe('updateOnStates deepCheck', () => {
  it('only empty array "get states" with same in to instances', () => {
    const Component = getTestComponent({}, { a: 1 });
    Component.updateOnStates = [[]];

    const result = Component.shouldComponentUpdate({}, { a: 1 });
    expect(result).toBe(true);
  });

  it('only empty array "get state" with same instances', () => {
    let state = { a: 1 };
    const Component = getTestComponent({}, state);
    Component.updateOnStates = [[]];

    const result = Component.shouldComponentUpdate({}, state);
    expect(result).toBe(false);
  });

  it('basic test with mutable data', () => {
    let state = { a: { b: ['0'] } };
    let testState = { a: { b: ['2'] } };
    const Component = getTestComponent({}, state);
    Component.updateOnStates = [['a', 'b', 0]];

    const result = Component.shouldComponentUpdate({}, testState);
    expect(result).toBe(true);
  });

  it('basic test with immutable data', () => {
    let state = { a: fromJS({ b: ['0'] }) };
    let testState = { a: fromJS({ b: ['2'] }) };
    const Component = getTestComponent({}, state);
    Component.updateOnStates = [['a', 'b', 0]];

    const result = Component.shouldComponentUpdate({}, testState);
    expect(result).toBe(true);
  });

  it('not existing path', () => {
    let state = { a: { b: ['0'] } };
    let testState = { a: { b: ['2'] } };
    const Component = getTestComponent({}, state);
    Component.updateOnStates = [['a', 'c']];

    const result = Component.shouldComponentUpdate({}, testState);
    expect(result).toBe(false);
  });
});

describe('updateOnStates and updateOnProps', () => {
  it('have some values', () => {
    const Component = getTestComponent({ p: 1, x: 1 }, { s: 1, x: 1 });
    Component.updateOnProps = ['p'];
    Component.updateOnStates = ['s'];

    expect(Component.shouldComponentUpdate({ p: 1 }, { s: 1 })).toBe(false);
    expect(Component.shouldComponentUpdate({ p: 2 }, { s: 1 })).toBe(true);
    expect(Component.shouldComponentUpdate({ p: 1 }, { s: 2 })).toBe(true);
    expect(Component.shouldComponentUpdate({ p: 2 }, { s: 2 })).toBe(true);
  });

  it('are both default', () => {
    const Component = getTestComponent({ p: 1, x: 1 }, { s: 1, x: 2 });

    expect(
      Component.shouldComponentUpdate({ p: 1, x: 1 }, { s: 1, x: 2 }),
    ).toBe(false);
    expect(Component.shouldComponentUpdate({ p: 1 }, { s: 1 })).toBe(true);
    expect(Component.shouldComponentUpdate({ p: 1, x: 1 }, { s: 2 })).toBe(
      true,
    );
    expect(Component.shouldComponentUpdate({ p: 2 }, { s: 1, x: 2 })).toBe(
      true,
    );
  });

  it('are both empty', () => {
    const Component = getTestComponent({ p: 1, x: 1 }, { s: 1, x: 2 });
    Component.updateOnProps = [];
    Component.updateOnStates = [];

    expect(
      Component.shouldComponentUpdate({ p: 1, x: 1 }, { s: 1, x: 2 }),
    ).toBe(false);
    expect(Component.shouldComponentUpdate({ p: 1 }, { s: 1 })).toBe(false);
    expect(Component.shouldComponentUpdate({ p: 1, x: 1 }, { s: 2 })).toBe(
      false,
    );
    expect(Component.shouldComponentUpdate({ p: 2 }, { s: 1, x: 2 })).toBe(
      false,
    );
  });
});
