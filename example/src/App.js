import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import ImmutablePureComponent from 'react-immutable-pure-component';
import BaseComponent from './Base';
import { fromJS, Set } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExampleList from './ExampleList';
import ItemsEditor from './ItemsEditor';
import Introduction from './Introduction';
import { RenderCount } from './RenderCount';

const styles = theme => ({
  grid: {
    minWidth: 1200,
    margin: '0 auto',
  },
  item: {
    padding: theme.spacing.unit,
  },
  paragraph: {
    paddingBottom: theme.spacing.unit * 2,
  },
});

// class App extends React.Component {
// class App extends React.PureComponent {
// class App extends ImmutablePureComponent {
class App extends BaseComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    items: fromJS([
      { name: 'Item 1', tags: Set(['blue', 'red']) },
      { name: 'Item 2', tags: Set(['green']) },
      { name: 'Item 3', tags: Set(['blue', 'green']) },
      { name: 'Item 4', tags: Set(['green', 'red']) },
    ]),
  };

  handleChange = items => {
    this.setState({ items });
  };

  render() {
    const { classes } = this.props;
    const { items } = this.state;
    return (
      <>
        <Introduction />
        <Grid container className={classes.grid}>
          <Grid item xs={4} className={classes.item}>
            <ItemsEditor items={items} onChange={this.handleChange} />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <ExampleList items={items} />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <ExampleList items={items} />
          </Grid>
        </Grid>
        <RenderCount name="app" />
      </>
    );
  }
}

export default withStyles(styles)(App);
