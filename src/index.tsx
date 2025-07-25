import ReactDOM from 'react-dom/client';
import './index.scss';
import { MainApp } from './apps/MainApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <MainApp />

);


