import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { TickerCheckBoxes } from './TickerCheckBoxes';
import { actions } from '../../features/tickers';

const mockStore = configureStore([]);

describe('TickerCheckBoxes component', () => {
  test('renders checkboxes for each ticker name', () => {
    const mockTickersNames = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA'];
    const initialState = {
      tickers: {
        tickersNames: mockTickersNames,
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <TickerCheckBoxes />
      </Provider>,
    );

    mockTickersNames.forEach((name) => {
      const checkboxElement = screen.getByLabelText(name);

      expect(checkboxElement).toBeInTheDocument();
    });
  });

  test('dispatches removeTickers action when checkbox is clicked', () => {
    const mockTickersNames = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA'];
    const initialState = {
      tickers: {
        tickersNames: mockTickersNames,
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <TickerCheckBoxes />
      </Provider>,
    );

    mockTickersNames.forEach((name) => {
      const checkboxElement = screen.getByLabelText(name);

      fireEvent.click(checkboxElement);

      expect(store.getActions()).toContainEqual(actions.removeTickers(name));
    });
  });
});
