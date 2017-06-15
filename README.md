[![npm version](https://badge.fury.io/js/react-immutable-pure-component.svg)](https://badge.fury.io/js/react-immutable-pure-component)

# ImmutablePureComponent

Unfortunately `React.PureComponent` is not embracing `Immutable.js` to it full potential. So here is my solution to this problem.
[npm package](https://www.npmjs.com/package/react-immutable-pure-component) is
parsed with babel so feel safe to use it from package repository or just copy
it to your project and go from here.

[Here](https://monar.github.io/react-immutable-pure-component/) you will find a simple example of a problem it's solving.

```js

/*
  Copyright (C) 2017 Piotr Tomasz Monarski.
  Licensed under the MIT License (MIT), see
  https://github.com/Monar/react-immutable-pure-component
*/

import React from 'react';
import { is } from 'immutable';


export class ImmutablePureComponent extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    const state = this.state || {};

    return !(this.updateOnProps || Object.keys(nextProps)).every((p) => is(nextProps[p], this.props[p]))
      || !(this.updateOnStates || Object.keys(nextState || {})).every((s) => is(nextState[s], state[s]));
  }
}

export default ImmutablePureComponent;
```

