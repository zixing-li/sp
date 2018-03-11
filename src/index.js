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
import configureStore  from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

// import { PersistGate } from 'redux-persist/integration/react'

const { persistor, store } = configureStore()

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}>  */}
        <App>
          <Route exact path="/" component={Home} />
          <Route path="/i/:industryName" component={Industry} />
          <Route path="/package" component={Package} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/signin" component={SignIn} />
        </App>
      {/* </PersistGate> */}
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
