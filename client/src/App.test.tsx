import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { App } from './App';
import store from './app/store';

describe('App component', () => {
  test('renders header, main content, and footer', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const headerElement = screen.getByTestId('header');
    const footerElement = screen.getByTestId('footer');

    expect(headerElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });
});
