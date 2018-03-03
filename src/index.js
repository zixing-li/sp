import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './containers/App';

import Home from './components/Home';
import Industry from './components/Industry';
import Analytics from './components/Analytics';

import { Provider } from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    {/* <Provider store={store}> */}
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/industry" component={Industry} />
        <Route path="/analytics" component={Analytics} />
      </App>
    {/* </Provider> */}
  </BrowserRouter>
), document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
