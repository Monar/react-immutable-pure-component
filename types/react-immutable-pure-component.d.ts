export as namespace ImmutablePureComponent;

import { Component } from 'react';

export class ImmutablePureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> {
      updateOnProps: Array<keyof P | string[]> ;
      updateOnStates: Array<keyof S | string[]>;
}
