import React, { useContext, useEffect, useState } from 'react';
import { TextField } from '@mui/material';

import { AppContext } from '../../../services/context';
import SentenceParser from './SentenceParser';
import useOriginalTexts, {
  INITIAL_ORIGINAL_TEXT,
} from '../../../services/useOriginalTexts';

const TextInputPane = () => {
  const {
    originalText,
    parseInputStr,
    updateOriginalText,
    clearComplexSentence,
  } = useContext(AppContext);

  const [text, setText] = useState('');
  const [chinese, setChinese] = useState('');

  const handleChangeText = (text: string) => {
    setText(text);
    updateOriginalText({ ...originalText, text });
  };
  const handleChangeChinese = (chinese: string) => {
    setChinese(chinese);
    updateOriginalText({ ...originalText, chinese });
  };

  const handleParse = (input: string) => {
    parseInputStr(input);
    const {
      line,
      chinese,
      japanese,
    }: {
      line: number;
      chinese: string;
      japanese: string;
    } = JSON.parse(input);
    const text = [line + '.', japanese].join('\n');
    setText(text);
    setChinese(chinese);
    updateOriginalText({ text, chinese });
  };

  const handleClear = () => {
    setText('');
    setChinese('');
    updateOriginalText(INITIAL_ORIGINAL_TEXT);
    clearComplexSentence();
  };

  return (
    <>
      <SentenceParser handleClear={handleClear} handleParse={handleParse} />
      <TextField
        rows={3}
        size='small'
        value={text}
        label='text'
        variant='outlined'
        onChange={(e) => handleChangeText(e.target.value)}
        fullWidth
        multiline
      />
      <TextField
        rows={3}
        size='small'
        value={chinese}
        label='chinese'
        variant='outlined'
        onChange={(e) => handleChangeChinese(e.target.value)}
        fullWidth
        multiline
      />
    </>
  );
};

export default TextInputPane;
