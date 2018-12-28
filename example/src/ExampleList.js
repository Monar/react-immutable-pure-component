import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Set } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Filter from './Filter';
import { List } from './List';
import { RenderCount } from './RenderCount';
// eslint-disable-next-line
import ImmutablePureComponent from 'react-immutable-pure-component';
import BaseComponent from './Base';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    background: theme.palette.background.default,
  },
});

// class ExampleList extends React.Component {
// class ExampleList extends React.PureComponent {
// class ExampleList extends ImmutablePureComponent {
class ExampleList extends BaseComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    items: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        name: PropTypes.string.isRequired,
        tags: ImmutablePropTypes.setOf(PropTypes.string).isRequired,
      }).isRequired,
    ),
  };

  state = {
    showTags: extractTags(this.props.items),
    tags: extractTags(this.props.items),
    itemsHash: this.props.items.hashCode(),
  };

  static getDerivedStateFromProps(props, state) {
    if (props.items.hashCode() === state.itemsHash) {
      return null;
    }

    let tags = extractTags(props.items);
    let newTags = tags.subtract(state.tags);
    return {
      itemsHash: props.items.hashCode(),
      showTags: state.showTags.union(newTags),
      tags,
    };
  }

  handleFilterChange = tag => {
    this.setState(({ showTags }) => ({
      showTags: showTags.has(tag) ? showTags.delete(tag) : showTags.add(tag),
    }));
  };

  render() {
    const { classes, items } = this.props;
    const { showTags, tags } = this.state;
    const visibleItems = getVisible(items, showTags);
    return (
      <Paper className={classes.root}>
        <Filter
          tags={tags}
          selected={showTags}
          onChange={this.handleFilterChange}
        />
        <List items={visibleItems} />
        <RenderCount name="exampleList" />
      </Paper>
    );
  }
}

function extractTags(items) {
  return items.reduce((s, item) => s.union(item.get('tags')), Set());
}

function getVisible(items, showTags) {
  return items.filter(
    item =>
      !item
        .get('tags')
        .intersect(showTags)
        .isEmpty(),
  );
}

export default withStyles(styles)(ExampleList);
