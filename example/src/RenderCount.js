import React from 'react';
import Typography from '@material-ui/core/Typography';
export class RenderCount extends React.Component {
  count = 0;
  render() {
    return (
      <Typography style={{ margin: 4 }} variant="caption">
        {`${this.props.name || ''}: ${++this.count}`}
      </Typography>
    );
  }
}
