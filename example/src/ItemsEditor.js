import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, Set } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { RenderCount } from './RenderCount';
import { List } from './List';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// eslint-disable-next-line
import ImmutablePureComponent from 'react-immutable-pure-component';
import BaseComponent from './Base';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    background: theme.palette.background.default,
  },
  form: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  text: {
    padding: theme.spacing.unit,
  },
});

// class ItemsEditor extends React.Component {
// class ItemsEditor extends React.PureComponent {
// class ItemsEditor extends ImmutablePureComponent {
class ItemsEditor extends BaseComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    items: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        name: PropTypes.string.isRequired,
        tags: ImmutablePropTypes.setOf(PropTypes.string).isRequired,
      }).isRequired,
    ),
  };

  handleChange = event => {
    event.preventDefault();
    const { target } = event;
    let name = target.name.value;
    let tags = Set(target.tags.value.split(','));
    target.name.value = '';
    target.tags.value = '';
    this.props.onChange(this.props.items.push(Map({ name, tags })));
  };

  handleDelete = item => {
    this.props.onChange(this.props.items.filter(i => !i.equals(item)));
  };

  render() {
    const { classes, items } = this.props;
    return (
      <Paper className={classes.root}>
        <form className={classes.form} onSubmit={this.handleChange}>
          <TextField
            name="name"
            label="Name"
            required
            className={classes.text}
          />
          <TextField
            name="tags"
            label="Tags"
            required
            placeholder="tag1,tag2"
            className={classes.text}
          />
          <Button type="submit">Add</Button>
        </form>
        <List items={items} onDelete={this.handleDelete} />
        <RenderCount name="itemsEditor" />
      </Paper>
    );
  }
}

export default withStyles(styles)(ItemsEditor);
