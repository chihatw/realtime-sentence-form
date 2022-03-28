import React from 'react';
import { signOut } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import { auth } from '../../repositories/firebase';

const TopPage = () => {
  const navigate = useNavigate();
  const onSignOut = () => {
    signOut(auth);
  };
  const itemsArray: { label: string; onClick: () => void }[][] = [
    [
      {
        label: '複文入力',
        onClick: () => navigate('/sentenceInput'),
      },
      {
        label: '複文表示',
        onClick: () => navigate('/sentenceDisplay'),
      },
    ],
    [{ label: 'Sign Out', onClick: () => onSignOut() }],
  ];
  return (
    <Container maxWidth='sm'>
      <div style={{ height: 16 }} />
      {itemsArray.map((items, index) => (
        <div key={index}>
          <div
            style={{ border: '1px solid #ccc', borderRadius: 4, padding: 8 }}
          >
            <div style={{ display: 'flex' }}>
              {items.map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex' }}>
                    <Button variant='contained' onClick={item.onClick}>
                      {item.label}
                    </Button>
                    {!!items[i + 1] && <div style={{ width: 16 }} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!!itemsArray[index + 1] && <div style={{ height: 16 }} />}
        </div>
      ))}
    </Container>
  );
};
export default TopPage;
