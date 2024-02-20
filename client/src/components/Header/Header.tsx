import React from 'react';
import './Header.scss';
import { NavBar } from '../NavBar/NavBar';

export const Header: React.FC = () => {
  return (
    <header className="header" data-testid="header">
      <div className="container">
        <NavBar />
      </div>
    </header>
  );
};
