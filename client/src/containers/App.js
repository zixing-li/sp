import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';
// import '../assets/styles/App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <Navigation/>      
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default connect(null, actions)(App);