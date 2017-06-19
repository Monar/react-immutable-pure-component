import React from 'react';
import { Map } from 'immutable';
import renderer from 'react-test-renderer';
import ImmutablePureComponent from '../index';

test('Do not render when props does not change', () => {
  let renders = 0;
  class Component extends ImmutablePureComponent {

    render() {
      renders++;
      return <div />;
    }
  }

  const component = renderer.create(
    <Component map={Map({ count: 1 })} />
  );
  let tree;

  tree = component.toJSON();
  expect(renders).toBe(1);

  tree = component.toJSON(); // re-render
  expect(renders).toBe(1);
});

test('Render when props change', () => {
  let renders = 0;
  class Component extends ImmutablePureComponent {

    render() {
      renders++;
      return <div />;
    }
  }

  const component = renderer.create(
    <Component map={Map({ count: 1 })} />
  );
  let tree;

  tree = component.toJSON();
  expect(renders).toBe(1);

  component.update(
    <Component map={Map({ count: 2 })} />
  );

  tree = component.toJSON(); // re-render
  expect(renders).toBe(2);
});

test('Do not render when props change to same value', () => {
  let renders = 0;
  class Component extends ImmutablePureComponent {

    render() {
      renders++;
      return <div />;
    }
  }

  const component = renderer.create(
    <Component map={Map({ count: 1 })} />
  );
  let tree;

  tree = component.toJSON();
  expect(renders).toBe(1);

  component.update(
    <Component map={Map({ count: 1 })} />
  );

  tree = component.toJSON(); // re-render
  expect(renders).toBe(1);
});

class MockComponent extends ImmutablePureComponent {

  constructor(...args) {
    super(...args);
    this.state = {
      map: Map({
        count: 0,
      }),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { count } = this.props;
    this.setState(({ map }) => ({
      map: map.update('count', () => map.get('count') + count),
    }));
  }
}

test('Do not render when state does not change', () => {
  let renders = 0;
  class Component extends MockComponent {

    render() {
      renders++;
      return <div onClick={this.handleClick} />;
    }
  }

  const component = renderer.create(
    <Component count={1} />
  );
  let tree;

  tree = component.toJSON();
  expect(renders).toBe(1);

  tree = component.toJSON(); // re-render
  expect(renders).toBe(1);
});

test('Render when state change', () => {
  let renders = 0;
  class Component extends MockComponent {

    render() {
      renders++;
      return <div onClick={this.handleClick} />;
    }
  }

  const component = renderer.create(
    <Component count={1} />
  );
  let tree;

  tree = component.toJSON();
  expect(renders).toBe(1);

  tree.props.onClick();

  tree = component.toJSON(); // re-render
  expect(renders).toBe(2);
});

test('Do not render when state change to same value', () => {
  let renders = 0;
  class Component extends MockComponent {

    handleClick() {
      this.setState(({ map }) => ({
        map: map.update('count', () => map.get('count') + 0),
      }));
    }

    render() {
      renders++;
      return <div onClick={this.handleClick} />;
    }
  }

  const component = renderer.create(
    <Component count={0} />
  );
  let tree;

  tree = component.toJSON();
  expect(renders).toBe(1);

  tree.props.onClick();

  tree = component.toJSON(); // re-render
  expect(renders).toBe(1);
});
