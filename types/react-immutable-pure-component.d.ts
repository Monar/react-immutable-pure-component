export as namespace ImmutablePureComponent;

import { Component, NamedExoticComponent } from 'react';

function immutableMemo<P extends object>( Component: SFC<P>, updateOnProps?: Array<keyof P | Iterable<any>>): NamedExoticComponent<P>;
function immutableMemo<T extends ComponentType<any>>( Component: T, updateOnProps?: Array<keyof P | Iterable<any>>): MemoExoticComponent<T>;

export class ImmutablePureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> {
      updateOnProps: Array<keyof P | Iterable<any>> ;
      updateOnStates: Array<keyof S | Iterable<any>>;
}
