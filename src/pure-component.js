import React from 'react';
import { check } from './check';

export class ImmutablePureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState = {}) {
    return (
      !check(this.updateOnProps, this.props, nextProps, 'updateOnProps') ||
      !check(this.updateOnStates, this.state, nextState, 'updateOnStates')
    );
  }
}
