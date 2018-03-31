import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Navigation extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return (
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Signing In</a>
          </li>
        );
      case false:
        return <li className="nav-item"><a href="/auth/google" className="nav-link">Sign In With Google</a></li>;
      default: // logged in
        return (
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              My Account
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/api/logout">Log out</a>
            </div>
          </li>
        );
    }
  }

  render(){
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">SpecialProject</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item active"> */}
            <li className="nav-item">
              <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
            </li>
            {this.renderContent()}
            <li className="nav-item">
              <a className="nav-link" href="#">Shopping Cart</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li> */}
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
        </div>
      </nav>
    )
  }
}

// export default Navigation;

function mapStateToProps({auth}) {
  return { auth };
}

export default connect(mapStateToProps)(Navigation);