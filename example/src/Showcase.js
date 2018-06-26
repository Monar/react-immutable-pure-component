import * as React from 'react';
import { ImmutablePureComponent } from 'react-immutable-pure-component';
import { List } from 'immutable';
import { Grid, GridCell } from 'rmwc/Grid';

import { Colors } from './colors';
import { Example } from './Example';
import { Adding } from './Adding';

const colorsItr = genColor();

class PureExample extends React.PureComponent {
  render() {
    return <Example {...this.props} />;
  }
}

class ImmutablePureExample extends ImmutablePureComponent {
  render() {
    return <Example {...this.props} />;
  }
}

class ImmutablePureExample2 extends ImmutablePureComponent {
  updateOnProps = ['items'];
  render() {
    return <Example {...this.props} />;
  }
}

export class Showcase extends React.Component {
  state = {
    items: List(),
    adding: colorsItr(),
  };

  componentDidMount() {
    setInterval(
      () =>
        this.setState({
          adding: colorsItr(),
          items: this.state.items.push(this.state.adding),
        }),
      500,
    );
  }

  handleClean = color => {
    this.setState({
      items: this.state.items.filter(i => i !== color),
    });
  };

  render() {
    const { items, adding } = this.state;
    return (
      <Grid>
        <Adding adding={adding} />
        <GridCell span="4">
          <Example
            title="Component"
            items={items.filter(i => i === Colors.red)}
            onClean={() => this.handleClean(Colors.red)}
          />
        </GridCell>
        <GridCell span="4">
          <PureExample
            title="PureComponent"
            items={items.filter(i => i === Colors.blue)}
            onClean={() => this.handleClean(Colors.blue)}
          />
        </GridCell>
        <GridCell span="4">
          <PureExample
            title="PureComponent"
            items={items.filter(i => i === Colors.teal)}
          />
        </GridCell>
        <GridCell span="4">
          <ImmutablePureExample
            title="ImmutablePureComponent"
            items={items.filter(i => i === Colors.green)}
            onClean={() => this.handleClean(Colors.green)}
          />
        </GridCell>
        <GridCell span="4">
          <ImmutablePureExample
            title="ImmutablePureComponent"
            items={items.filter(i => i === Colors.lime)}
          />
        </GridCell>
        <GridCell span="4">
          <ImmutablePureExample2
            title="ImmutablePureComponent with updateOnProps"
            items={items.filter(i => i === Colors.orange)}
            onClean={() => this.handleClean(Colors.orange)}
          />
        </GridCell>
      </Grid>
    );
  }
}

function genColor() {
  let itr = -1;
  const colors = Object.keys(Colors);
  return () => {
    itr = (itr + 1) % colors.length;
    return Colors[colors[itr]];
  };
}
