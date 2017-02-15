[![npm version](https://badge.fury.io/js/react-immutable-pure-component.svg)](https://badge.fury.io/js/react-immutable-pure-component)

# ImmutablePureComponent

Unfortunately `React.PureComponent` is not embracing `Immutable.js` to it full potential. So here is my solution to this problem.
[npm package](https://www.npmjs.com/package/react-immutable-pure-component) is
parsed with babel so feel safe to use it from package repository or just copy
it to your project and go from here.

```js
/*
  Copyright (C) 2017 Piotr Tomasz Monarski.
  Licensed under the MIT License (MIT), see
  https://github.com/Monar/bem-names
*/

import React from 'react';
import { is } from 'immutable';


export class ImmutablePureComponent extends React.PureComponent {

  shouldComponentUpdate(nextProps, nextState) {
    const checkStates = this.updateOnStates || Object.keys(nextState || {});
    const checkProps = this.updateOnProps || Object.keys(nextProps);
    const state = this.state || {};

    return !checkStates.every((s) => is(nextState[s], state[s]))
      || !checkProps.every((p) => is(nextProps[p], this.props[p]));
  }
}
export default ImmutablePureComponent;
```

