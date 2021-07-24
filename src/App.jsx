import React from 'react';
import Router from '@/client/router';
import { Provider } from 'mobx-react';
import stores from '@/client/stores';
import './App.global.css';

export default function App() {
  return (
    <Provider {...stores}>
      <Router />
    </Provider>
  );
}
