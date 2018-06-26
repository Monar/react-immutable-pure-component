import React from 'react';
import { ShapeContainer } from 'rmwc/Shape';

export const Item = ({ color: backgroundColor }) => (
  <ShapeContainer
    corner="8"
    style={{ backgroundColor, margin: '1px', width: '25px', height: '25px' }}
  />
);
