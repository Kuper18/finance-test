import React from 'react';
import { NavBar } from '../NavBar/NavBar';

import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <NavBar />
      </div>
    </footer>
  );
};
