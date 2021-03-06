// import React, { Component } from "react";

// class Landing extends Component {
//   render() {
//     return (
//       <div className="landing">
//         <div className="dark-overlay landing-inner text-light">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12 text-center">
//                 <h1 className="display-3 mb-4">StarterPack</h1>
//                 <p className="lead">
//                   {" "}
//                   Get your StarterPack from people who's been there
//                 </p>
//                 <hr />
//                 <a href="register.html" className="btn btn-lg btn-info mr-2">
//                   Sign Up
//                 </a>
//                 <a href="login.html" className="btn btn-lg btn-light">
//                   Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Landing;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">StarterPack</h1>
                <p className="lead"> Get advise from people who's been there</p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
