import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // wraps all privateRoutes in switch to prevent strange redirect issues
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";
// import configureStore from "./store";
// import { persistor, store } from "./store";

import { PersistGate } from "redux-persist/integration/react";

import PrivateRoute from "./components/common/PrivateRoute";

// import Navigation from "./components/Navigation";
// import Footer from "./components/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import PostForm from "./components/posts/PostForm";
import Post from "./components/post/Post";
import SurveyNew from "./components/surveys/SurveyNew";
import NotFound from "./components/not-found/NotFound";

import Home from "./components/layout/Home";
import Category from "./components/category/Category";
import Package from "./components/package/Package";

import { connect } from "react-redux";
// import * as actions from "./actions/actionCreators";
import "./assets/styles/App.css";
// import { withRouter } from "react-router-dom";

// const { persistor, store } = configureStore();

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  // componentDidMount() {
  //   this.props.fetchUser();
  // }

  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={<div>LOADING</div>} persistor={persistor}> */}
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Home} />
            <div className="mt-4">
              <Route path="/c/:categoryName" component={Category} />
              <Route exact path="/p/packages" component={Package} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/posts/new" component={PostForm} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/surveys/new" component={SurveyNew} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            {/* {this.props.children} */}
            <Footer />
          </div>
        </Router>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

// export default connect(
//   null,
//   actions
// )(App);

// export default withRouter(
//   connect(
//     null,
//     actions
//   )(App)
// );

export default App;
