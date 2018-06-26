import * as React from 'react';
declare module 'react-immutable-pure-component' {
  export class ImmutablePureComponent<P,S> extends React.Component<P,S> {
      updateOnProps: Array<keyof P>;
      updateOnStates: Array<keyof S>;
      shouldComponentUpdate(nextProps: P, nextState?: S): boolean;
  }
}
