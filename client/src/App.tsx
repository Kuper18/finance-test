import React from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './components/HomePage/HomePage';

import './App.scss';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main" data-testid="main">
        <div className="container">
          <HomePage />
        </div>
      </main>
      <Footer />
    </>
  );
};
