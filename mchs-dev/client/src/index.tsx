import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { ConfigProvider } from 'antd';
//import ruRu from 'antd/es/locale/ru_Ru';
import { Provider } from 'react-redux';
import { store } from './store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
   
      <AppRouter/>
  </Provider>
  
  
);

