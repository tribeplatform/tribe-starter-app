import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@client/Home';
import NotFound from '@client/NotFound';

const ClientApp = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="*" component={NotFound} />
  </Switch>
);

export default ClientApp;
