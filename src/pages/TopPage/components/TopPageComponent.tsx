import React from 'react';
import { Container } from '@mui/material';

import MenuRow from './MenuRow';
import { MenuButton } from '..';

const TopPageComponent = ({
  menuButtons,
  handleSignOut,
  handleNavigate,
}: {
  menuButtons: MenuButton[];
  handleSignOut: () => void;
  handleNavigate: (value: string) => void;
}) => (
  <Container maxWidth='sm'>
    <div style={{ paddingTop: 16, display: 'grid', rowGap: 16 }}>
      <MenuRow buttons={menuButtons} handleNavigate={handleNavigate} />
      <MenuRow
        buttons={[{ label: 'sign out' }]}
        handleSignOut={handleSignOut}
      />
    </div>
  </Container>
);

export default TopPageComponent;
