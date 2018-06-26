import React from 'react';
import { Card, CardAction, CardActions } from 'rmwc/Card';
import { Typography } from 'rmwc/Typography';
import { ListDivider } from 'rmwc/List';

import { Item } from './Item';

export class Example extends React.Component {
  renderCount = 0;

  render() {
    const { items, onClean, title } = this.props;
    return (
      <Card style={{ width: '100%' }}>
        <Typography
          use="subtitle1"
          tag="div"
          style={{ padding: '0.5rem 1rem' }}
          theme="text-secondary-on-background"
        >
          {title}
        </Typography>
        <ListDivider />
        <div style={{ minHeight: 47, padding: '1rem 1rem 0 1rem' }}>
          {items.map((color, idx) => (
            <Item key={idx} color={color} />
          ))}
        </div>
        <CardActions fullBleed>
          <CardAction disabled={!onClean} onClick={onClean}>
            Clean
          </CardAction>
          <div style={{ padding: '0 1rem' }}>
            <Typography use="body">
              Render&nbsp;count:&nbsp;{++this.renderCount}
            </Typography>
          </div>
        </CardActions>
      </Card>
    );
  }
}
