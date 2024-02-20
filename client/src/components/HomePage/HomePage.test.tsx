import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';
import store from '../../app/store';

describe('HomePage component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
  });

  test('renders Investing made easy text', () => {
    const textElement = screen.getByText('Investing made easy');

    expect(textElement).toBeInTheDocument();
  });

  test('renders TickerCheckBoxes component', () => {
    const tickerCheckBoxesElement = screen.getByTestId('ticker-checkboxes');

    expect(tickerCheckBoxesElement).toBeInTheDocument();
  });

  test('renders TableTickers component', () => {
    const tableTickersElement = screen.getByTestId('table-tickers');

    expect(tableTickersElement).toBeInTheDocument();
  });

  test('renders News component', () => {
    const newsElement = screen.getByTestId('news');

    expect(newsElement).toBeInTheDocument();
  });
});
