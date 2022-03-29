import { css } from '@emotion/css';
import React from 'react';
import hinshiColors from 'hinshi-colors';
import Tail from './components.tsx/Tail';

const HEIGHT = 32;

export type WordPaneProps = {
  text: string;
  hinshi: string;
  cursor?: string;
  isBuntou?: boolean;
  handleClick?: () => void;
};

export function WordPane({
  text,
  hinshi,
  cursor,
  isBuntou,
  handleClick,
}: WordPaneProps) {
  const color = hinshi === 'sentence' ? 'white' : '#555';
  const border = !hinshiColors[hinshi] || isBuntou ? '1px solid #ccc' : 'none';
  const backgroundColor = hinshiColors[hinshi] || '';
  return (
    <div
      className={css({
        cursor: cursor || 'auto',
        pointerEvents: !!handleClick ? 'auto' : 'none',
      })}
      onClick={handleClick}
    >
      <div className={css({ display: 'flex', flexWrap: 'nowrap' })}>
        <div
          className={css({
            color,
            border,
            fontWeight: 400,
            backgroundColor,
            height: HEIGHT,
            padding: '6px 10px',
            fontSize: 12,
            boxSizing: 'border-box',
            userSelect: 'none',
            lineHeight: '20px',
            whiteSpace: 'nowrap',
          })}
        >
          {text || '　'}
        </div>
        {[
          'doushi',
          'sentence',
          'ikeiyoushi',
          'nakeiyoushi',
          'meishibunmatsu',
        ].includes(hinshi) && <Tail color={backgroundColor} height={HEIGHT} />}
      </div>
    </div>
  );
}
