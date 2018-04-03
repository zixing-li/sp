import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './containers/App';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store }  from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

import Home from './components/Home';
import Industry from './components/Industry';
import Package from './components/Package';
import Analytics from './components/Analytics';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import SurveyNew from './components/surveys/SurveyNew';
const Profile = () => <h2>Profile</h2>
const AddPackage = () => <h2>Add Package</h2>

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}>  */}
        <App>
          <Route exact path="/" component={Home} />
          <Route path="/i/:industryName" component={Industry} />
          <Route exact path="/p/packages" component={Package} />
          <Route path="/p/packages/new" component={AddPackage} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
          <Route path="/profile" component={Profile} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/signin" component={SignIn} />
        </App>
      {/* </PersistGate> */}
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();

console.log('Environment is', process.env.NODE_ENV);