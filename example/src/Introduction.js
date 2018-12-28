import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  item: {
    padding: theme.spacing.unit,
  },
  paragraph: {
    paddingBottom: theme.spacing.unit * 2,
  },
});

export const Introduction = ({ classes }) => (
  <Grid className={classes.item}>
    <Typography component="p" variant="title">
      Welcome every one to this example and encourage you to tinker around the
      code to explore what this is all about :D
    </Typography>

    <Typography
      component="p"
      variant="subheading"
      className={classes.paragraph}
    >
      - You can change base class of all component modyfing <b>./Base.js</b>{' '}
      file.
    </Typography>

    <Typography component="p" variant="title">
      Sample test scenario:
    </Typography>

    <Typography component="ol">
      <li> Deselect green in one of exampleLists</li>
      <li>{'Delete "Item 2"'}</li>
      <li>Create any item with single tag: {'"green"'}</li>
      <li>
        Change BaseComponent in <b>./Base.js</b> file
      </li>
      <li>
        Observer the difference in render counts for Componet, PureComponent and
        ImmutablePureComponent
      </li>
    </Typography>
  </Grid>
);
Introduction.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Introduction);
