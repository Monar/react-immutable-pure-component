import React from 'react';
import { is, getIn } from 'immutable';

export class ImmutablePureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState = {}) {
    const state = this.state || {};
    const props = this.props;

    function checkProps(name) {
      return is(getIn(nextProps, name), getIn(props, name));
    }

    function checkStates(name) {
      return is(getIn(nextState, name), getIn(state, name));
    }

    const onProps =
      this.updateOnProps || Object.keys({ ...nextProps, ...this.props });

    const onState =
      this.updateOnStates || Object.keys({ ...nextState, ...state });

    return (
      !onProps.map(guardArray).every(checkProps) ||
      !onState.map(guardArray).every(checkStates)
    );
  }
}

function guardArray(value) {
  return Array.isArray(value) ? value : [value];
}

export default ImmutablePureComponent;
