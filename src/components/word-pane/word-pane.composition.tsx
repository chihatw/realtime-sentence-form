import React from 'react';
import { WordPane } from './word-pane';

const props = {
  text: 'なりました',
  hinshi: 'doushi',
};

export const BasicWordPane = () => <WordPane {...props} />;

export const Clickable = () => (
  <WordPane {...props} handleClick={() => console.log('!')} cursor="pointer" />
);
