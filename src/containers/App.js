import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
// import '../assets/styles/App.css';

class App extends Component {
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

export default App;
