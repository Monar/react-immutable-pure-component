import React from 'react';
import { check } from './utils';

export class ImmutablePureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState = {}) {
    return (
      !check(this.updateOnProps, this.props, nextProps, 'updateOnProps') ||
      !check(this.updateOnStates, this.state, nextState, 'updateOnStates')
    );
  }
}
