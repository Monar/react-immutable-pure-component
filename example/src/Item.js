import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { RenderCount } from './RenderCount';
import { withStyles } from '@material-ui/core/styles';
// eslint-disable-next-line
import ImmutablePureComponent from 'react-immutable-pure-component';
import BaseComponent from './Base';

const styles = theme => ({
  tag: {
    margin: theme.spacing.unit,
  },
  tagList: {
    textAlign: 'right',
  },
});

// export class Item extends React.Component {
// export class Item extends React.PureComponent {
// export class Item extends ImmutablePureComponent {
export class Item extends BaseComponent {
  static propTypes = {
    onDelete: PropTypes.func,
    classes: PropTypes.object.isRequired,
    data: ImmutablePropTypes.mapContains({
      name: PropTypes.string.isRequired,
      tags: ImmutablePropTypes.setOf(PropTypes.string).isRequired,
    }).isRequired,
  };

  updateOnProps = ['data'];

  render() {
    const { data, classes, onDelete } = this.props;
    return (
      <ListItem key={data.get('name')}>
        <ListItemText>
          {data.get('name')}
          <RenderCount name="item" />
        </ListItemText>
        <ListItemText className={classes.tagList}>
          {data.get('tags').map(t => (
            <Chip key={t} label={t} className={classes.tag} />
          ))}
        </ListItemText>
        {onDelete && (
          <ListItemSecondaryAction>
            <IconButton onClick={onDelete} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}

export default withStyles(styles)(Item);
