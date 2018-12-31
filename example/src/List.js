import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MuiList from '@material-ui/core/List';
import { RenderCount } from './RenderCount';
import Item from './Item';
import Paper from '@material-ui/core/Paper';
// eslint-disable-next-line
import ImmutablePureComponent from 'react-immutable-pure-component';
import BaseComponent from './Base';

// export class List extends React.Component {
// export class List extends React.PureComponent {
// export class List extends ImmutablePureComponent {
export class List extends BaseComponent {
  static propTypes = {
    onDelete: PropTypes.func,
    items: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        name: PropTypes.string.isRequired,
        tags: ImmutablePropTypes.setOf(PropTypes.string).isRequired,
      }).isRequired,
    ),
  };

  render() {
    let { items, onDelete } = this.props;

    return (
      <Paper>
        <MuiList dense>
          {items.map(item => (
            <Item
              key={item.get('name')}
              data={item}
              onDelete={onDelete && (() => onDelete(item))}
            />
          ))}
        </MuiList>
        <RenderCount name="list" />
      </Paper>
    );
  }
}
