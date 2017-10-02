import React from 'react';
import { Map, List } from 'immutable';
import ImmutablePureComponent from '../index';


const testProps = {
  someMap: Map({key: 'value'}),
  someList: List([1,'elo', 2]),
  name: 'superComponent',
  other: 123,
  isOk: true,
}

const testState = {
  someMap: Map({key: 'value'}),
  someList: List([1,'elo', 2]),
  name: 'superComponent',
  other: 123,
  isOk: true,
}

const getTestComponent = (props = {}, state) => {
  const Component = new ImmutablePureComponent();
  Component.props = props;
  Component.state = state;
  return Component;
}

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
    const Component = getTestComponent(testProps, testState);
    const newTestProps = {
      someMap: Map({key: 'value'}),
      someList: List([1,'elo', 2]),
      name: 'superComponent',
      other: 123,
      isOk: true,
    }
    const newTestState = {
      someMap: Map({key: 'value'}),
      someList: List([1,'elo', 2]),
      name: 'superComponent',
      other: 123,
      isOk: true,
    }
    const result = Component.shouldComponentUpdate(newTestProps, newTestState);
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
    const Component = getTestComponent({elo: 'elo' }, undefined);

    const result = Component.shouldComponentUpdate({}, undefined);
    expect(result).toBe(true);
  });

  it('when remove state', () => {
    const Component = getTestComponent({}, {elo: 'elo' });

    const result = Component.shouldComponentUpdate({}, {});
    expect(result).toBe(true);
  });

  it('when modify any of the properties', () => {
    const Component = getTestComponent(testProps);

    expect(Component.shouldComponentUpdate({...testProps, someMap: Map({key: 'key'})})).toBe(true, 'Map');
    expect(Component.shouldComponentUpdate({...testProps, someList: List([1, 2])})).toBe(true, 'List');
    expect(Component.shouldComponentUpdate({...testProps, name: 'otherName'})).toBe(true, 'string');
    expect(Component.shouldComponentUpdate({...testProps, other: 321})).toBe(true, 'number');
    expect(Component.shouldComponentUpdate({...testProps, isOk: false})).toBe(true, 'boolean');
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
    const result = Component.shouldComponentUpdate({ test: () => {} }, { test: () => {} });
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
    const Component = getTestComponent({elo: 'elo', isOk: false});
    Component.updateOnProps = ['elo', 'fis', 'buss'];

    const result = Component.shouldComponentUpdate({ elo: 'elo', isOk: true });
    expect(result).toBe(false);
  });

  it('when defined and prop changes', () => {
    const Component = getTestComponent({elo: 'elo', isOk: false});
    Component.updateOnProps = ['elo', 'fis', 'buss'];

    const result = Component.shouldComponentUpdate({ elo: 'elo2', isOk: false });
    expect(result).toBe(true);
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

    const result = Component.shouldComponentUpdate( { elo: 'elo' }, {});
    expect(result).toBe(true);
  });

  it('when defined and other state changes', () => {
    const Component = getTestComponent({}, {elo: 'elo', isOk: false});
    Component.updateOnStates = ['elo', 'fis', 'buss'];

    const result = Component.shouldComponentUpdate({}, { elo: 'elo', isOk: true });
    expect(result).toBe(false);
  });

  it('when defined and state changes', () => {
    const Component = getTestComponent({}, {elo: 'elo', isOk: false});
    Component.updateOnProps = ['elo', 'fis', 'buss'];

    const result = Component.shouldComponentUpdate({}, { elo: 'elo2', isOk: false });
    expect(result).toBe(true);
  });
});
