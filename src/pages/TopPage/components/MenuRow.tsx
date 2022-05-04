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
        padding: 8,
        display: 'flex',
      }}
    >
      <div style={{ display: 'flex' }}>
        {buttons.map((button, index) => (
          <Button
            key={index}
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
