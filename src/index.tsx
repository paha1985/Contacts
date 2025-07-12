import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {MainApp} from './apps/MainApp';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <MainApp />
  </Provider>
);


