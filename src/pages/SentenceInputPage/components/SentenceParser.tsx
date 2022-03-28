import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const SentenceParser: React.FC<{
  handleClear: () => void;
  handleParse: (value: string) => void;
}> = ({ handleParse, handleClear }) => {
  const [input, setInput] = useState('');

  const handleChange = (input: string) => {
    setInput(input);
  };
  const handleClickParse = () => {
    handleParse(input);
  };
  const handleClickClear = () => {
    setInput('');
    handleClear();
  };

  return (
    <div>
      <TextField
        rows={10}
        size='small'
        value={input}
        variant='outlined'
        onChange={(e) => handleChange(e.target.value)}
        multiline
        fullWidth
      />
      <div style={{ height: 16 }} />
      <div style={{ display: 'flex' }}>
        <div>
          <Button variant='contained' onClick={handleClickParse}>
            一括入力
          </Button>
        </div>
        <div style={{ width: 16 }} />
        <div>
          <Button variant='contained' onClick={handleClickClear}>
            クリア
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SentenceParser;
