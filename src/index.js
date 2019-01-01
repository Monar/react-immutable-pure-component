import React from 'react';
import { is, getIn } from 'immutable';

export class ImmutablePureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState = {}) {
    let state = this.state || {};
    let props = this.props;
    let checkProps = createChecker(props, nextProps, 'updateOnProps');
    let checkStates = createChecker(state, nextState, 'updateOnStates');

    const onProps =
      this.updateOnProps || Object.keys({ ...nextProps, ...this.props });

    const onState =
      this.updateOnStates || Object.keys({ ...nextState, ...state });

    return !onProps.every(checkProps) || !onState.every(checkStates);
  }
}

function createChecker(prev, next, checkName) {
  return function(name) {
    if (typeof name === 'string') {
      return is(next[name], prev[name]);
    }

    if (!getIn) {
      let value = JSON.stringify(name);
      throw new TypeError(
        `Not supported value "${value}" provided to ${checkName}, try updating immutable to v4`,
      );
    }

    return is(getIn(next, name), getIn(prev, name));
  };
}

export default ImmutablePureComponent;
