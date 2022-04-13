import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ClientApp from '@client/App';

hydrate(
  <BrowserRouter>
    <ClientApp />
  </BrowserRouter>,
  document.getElementById('root'),
);
