import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // browser router mimics server

import { Provider } from "react-redux";
import store from "./store";

// import Navigation from "./components/Navigation";
// import Footer from "./components/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import { connect } from "react-redux";
import * as actions from "./actions/actionCreators";
import "./assets/styles/App.css";
import { withRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            {/* {this.props.children} */}
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

// export default connect(null, actions)(App);
export default withRouter(connect(null, actions)(App));
