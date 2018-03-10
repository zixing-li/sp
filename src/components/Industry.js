import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../assets/styles/Industry.css';
import { Link } from 'react-router-dom';

class Industry extends Component {
  renderPackageThumbnails = () => {
    const packages = this.props.packages;
    if (!packages) {return;}

    const packageThumbnails = packages.map((obj, i) => {
      return (
        <div className="col-md-4" key={`thumbnail${i}`}>
          <div className="card mb-4 box-shadow">
            <Link to="/package"><img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=PackageThumbnail" alt="Card image cap" /></Link>
            <div className="card-body">
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small className="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        {packageThumbnails}
      </div>
    );
  }

  render() {
    return (
      <main role="main">
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Example Industry</h1>
            {/* <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
            <p>
              <a href="#" className="btn btn-primary my-2">Main call to action</a>
            </p> */}
          </div>
        </section>

        <div className="album py-5 bg-light">
          {/* Search Bar */}
          <div className="container"> 
            <div className="row">
              <div className="input-group col-md-8 offset-md-2">
                <input className="form-control py-2 border-right-0 border" type="search" defaultValue="search" id="example-search-input" />
                <span className="input-group-append">
                  <button className="btn btn-outline-secondary border-left-0 border" type="button">
                      <i className="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
            <br/>
            <br/>
            {this.renderPackageThumbnails()}
          </div>
        </div>
      </main>
    )
  }
}

export default connect(
  (state) => ({
    packages: state.packages.packageList
  }),
  (dispatch) => bindActionCreators({ 

   }, dispatch)
)(Industry);