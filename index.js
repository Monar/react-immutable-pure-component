import React, { Component } from 'react';
import Immutable from 'immutable';

export default class ImmutablePureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.length !== this.state.length || Object.keys(nextState).some(s => !Immutable.is(nextStates[s], this.states[s]))) {
      return true;
    }

    if(nextProps.length !== this.props.length || Object.keys(nextProps).some(p => !Immutable.is(nextProps[p], this.props[p]))) {
      return true
    }

    return false;
  }
}
