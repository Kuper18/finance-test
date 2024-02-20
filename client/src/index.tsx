import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import store from './app/store';

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />,
);
