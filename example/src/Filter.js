import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
import { RenderCount } from './RenderCount';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// eslint-disable-next-line
import ImmutablePureComponent from 'react-immutable-pure-component';
import BaseComponent from './Base';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
  },
  tag: {
    margin: theme.spacing.unit,
  },
});

// export class Filter extends React.Component {
// export class Filter extends React.PureComponent {
// export class Filter extends ImmutablePureComponent {
export class Filter extends BaseComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    selected: ImmutablePropTypes.setOf(PropTypes.string).isRequired,
    tags: ImmutablePropTypes.setOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    let { tags, selected, onChange, classes } = this.props;
    return (
      <Paper className={classes.root}>
        {tags.map(i => (
          <Chip
            key={i}
            label={i}
            clickable
            className={classes.tag}
            color={selected.has(i) ? 'primary' : undefined}
            onClick={() => onChange(i)}
            icon={selected.has(i) ? <DoneIcon /> : undefined}
          />
        ))}
        <RenderCount name="filter" />
      </Paper>
    );
  }
}

export default withStyles(styles)(Filter);
