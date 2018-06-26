import React from 'react';
import { GridCell } from 'rmwc/Grid';
import { Typography } from 'rmwc/Typography';
import { Item } from './Item';

export const Adding = ({ adding }) => (
  <GridCell span="12">
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography use="headline4" style={{ marginRight: '1rem' }}>
        Adding next:
      </Typography>
      <Item color={adding} />
    </div>
  </GridCell>
);
