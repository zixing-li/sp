import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './containers/App';

import Home from './components/Home';
import Industry from './components/Industry';
import Package from './components/Package';
import Analytics from './components/Analytics';
import SignIn from './components/SignIn';

import { Provider } from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/industry" component={Industry} />
        <Route path="/package" component={Package} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/signin" component={SignIn} />
      </App>
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
