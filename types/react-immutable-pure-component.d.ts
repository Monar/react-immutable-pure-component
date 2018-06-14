import * as React from 'react';
declare module 'react-immutable-pure-component' {
  export class ImmutablePureComponent<P,S> extends React.Component<P,S> {
      updateOnProps: string[];
      updateOnStates: string[];
      shouldComponentUpdate(nextProps: any, nextState?: {}): boolean;
  }
}
