import React from 'react';
import { check } from './check';

export function immutableMemo(Component, updateOnProps) {
  return React.memo(Component, (prev, next) =>
    check(updateOnProps, prev, next, 'immutableMemo'),
  );
}
