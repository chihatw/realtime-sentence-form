import { Button } from '@mui/material';
import React from 'react';
import { MenuButton } from '..';

const MenuRow = ({
  buttons,
  handleSignOut,
  handleNavigate,
}: {
  buttons: MenuButton[];
  handleSignOut?: () => void;
  handleNavigate?: (value: string) => void;
}) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        display: 'flex',
        padding: 8,
        borderRadius: 4,
      }}
    >
      <div
        style={{
          display: 'grid',
          columnGap: 16,
          gridTemplateColumns: 'auto auto',
        }}
      >
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant='contained'
            onClick={() => {
              !!handleSignOut && handleSignOut();
              !!button.pathname &&
                !!handleNavigate &&
                handleNavigate(button.pathname);
            }}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MenuRow;
