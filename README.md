[![npm version](https://badge.fury.io/js/react-immutable-pure-component.svg)](https://badge.fury.io/js/react-immutable-pure-component)

# ImmutablePureComponent

Unfortunately `React.PureComponent` is not embracing `Immutable.js` to it full
potential. While `Immutable.js` provides [hash value](https://facebook.github.io/immutable-js/docs/#/ValueObject/hashCode),
witch allows for fast comparison of two different instances
`React.PureComonent` is only comparing addresses of those instances.

The `ImmutablePureComponent` uses
[is](https://facebook.github.io/immutable-js/docs/#/is) to compare values and
extends component functionality by introducing:
* `updateOnProps`
* `updateOnStates`

With those properties you can specify list of props or states that will be
checked for changes. If value is `undefined` (default) then all `props` and
`state` will be checked, otherwise array of keys or paths is expected. The path
is an iterator (eg. Array) of keys like in the example below. Checking values
under path is working for `Immutable` data structures as well as for plain js
data structures. To benefit from this feature `immutable@4` is required
otherwise non `string` values will throw a `TypeError`.

Under the hood version 2 is 'optionally' using
[getIn](https://facebook.github.io/immutable-js/docs/#/getIn) which is new
addition to `Immutable@4` and all non `string` values are passed as an argument
to `Immutable.getIn`.

### Example
In this example component will update when value of `me` is change and will
ignore changes of `data`, `check` or any other property. Component will also
update on change of first element of `buzz` or change to `type` and will ignore
changes to the rest of the state. 

```js
class Example extends ImmutablePureComponent {
  state = {
    fis: { 
      buzz: [10, 11]
      ignore: 'this',
    },
    type: undefined,
  };

  updateOnStates = [
    ['fis', 'buzz', 0],
    'type',
  ];

  updateOnProps = [
    ['data', 'check', 'me'],
  ];

  render() {...}
}

let data = Immutable.fromJS({ check: { me: true } })

ReactDOM.render(<Example data={data} onChange={() => {}}, root);
```

To check what its all about checkout the interactive example :D
### [Interactive example](https://codesandbox.io/s/github/Monar/react-immutable-pure-component/tree/master/example).
