import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login';
import Home from './components/home';

const app = () => (
  <Switch>
    <Route path="/" component={Home} exact/>
    <Route path="/login" component={Login} exact/>
  </Switch>
);

export default app;