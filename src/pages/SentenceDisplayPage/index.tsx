import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { ComplexSentencePane } from '../../components/complex-sentence-pane';
import { AppContext } from '../../services/context';

const SentenceDisplayPage = () => {
  const { originalText, sentenceParseProps } = useContext(AppContext);
  const { text, chinese } = originalText;
  return (
    <Box p={2}>
      <div
        style={{
          color: '#555',
          height:
            24 * text.split('\n').length + 14 * chinese.split('\n').length + 8,
          whiteSpace: 'nowrap',
          fontFamily: '"M PLUS Rounded 1c"',
          transformOrigin: 'left top',
        }}
      >
        {text.split('\n').map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        <div style={{ height: 4 }} />
        {chinese.split('\n').map((chineseLine, index) => (
          <div
            key={index}
            style={{
              color: '#52a2aa',
              fontSize: 14,
              lineHeight: 1,
            }}
          >
            {chineseLine}
          </div>
        ))}
      </div>
      <div style={{ height: 8 }} />

      {!!sentenceParseProps.sentenceArrays.length && (
        <ComplexSentencePane
          Cursor={null}
          units={sentenceParseProps.units}
          sentences={sentenceParseProps.sentences}
          sentenceArrays={sentenceParseProps.sentenceArrays}
        />
      )}

      <Box height={600} />
    </Box>
  );
};

export default SentenceDisplayPage;
