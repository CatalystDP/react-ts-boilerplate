import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { configureStore } from 'app/store';
import { Router } from 'react-router';
import { MainApp } from './app';
// prepare store
const history = createBrowserHistory();
const store = configureStore({
  mainAppState: {
    text: 'hello world'
  }
});

function Root() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <MainApp />
      </Router>
    </Provider>
  );
}
function render() {
  ReactDOM.render(<Root />, document.getElementById('root'));
}
render();
