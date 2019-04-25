import { hot } from 'react-hot-loader';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App } from 'app/containers/App';

export const MainApp = hot(module)(() => (
  <Switch>
    <Route path="/" component={App} />
  </Switch>
));
