import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../assets/styles/Home.css';
import { Link } from 'react-router-dom';
import { 
  selectIndustry,
 } from '../actions/actionCreators';

class Home extends Component {

  renderIndustryThumbnails = () => {
    const industryList = this.props.industryList;
    if (!industryList) {return;}

    const industryThumbnails = industryList.map((obj, i) => {
      return (
        <div className="col-md-4" key={`thumbnail${i}`}>
          <div className="card mb-4 box-shadow">
            <Link to={`/i/${obj.name}`} onClick={()=>this.props.selectIndustry(obj)}><img className="card-img-top" data-src={"holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text="+obj.name} alt="Card image cap" /></Link>
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        {industryThumbnails}
      </div>
    );
  }

  render() {
    return (
      <main role="main">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className=""></li>
            <li data-target="#myCarousel" data-slide-to="1" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="2" className=""></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item">
              <img className="first-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="First slide" />
              <div className="container">
                <div className="carousel-caption text-left">
                  <h1>Example headline.</h1>
                  <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                  <p><Link to="/signin" className="btn btn-lg btn-primary" href="#" role="button">Sign up today</Link></p>
                </div>
              </div>
            </div>
            <div className="carousel-item active">
              <img className="second-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Second slide" />
              <div className="container">
                <div className="carousel-caption">
                  <h1>Another example headline.</h1>
                  <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                  <p><a className="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="third-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Third slide" />
              <div className="container">
                <div className="carousel-caption text-right">
                  <h1>One more for good measure.</h1>
                  <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                  <p><a className="btn btn-lg btn-primary" href="#" role="button">Browse gallery</a></p>
                </div>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <div className="album py-5 bg-light">
          <div className="container">
            {/* Search Bar */}
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
            {this.renderIndustryThumbnails()}
          </div>
        </div>
      </main>
    )
  }
}

export default connect(
  (state) => ({
    industryList: state.industries.industryList,
    selectedIndustry: state.industries.selectedIndustry,
  }),
  (dispatch) => bindActionCreators({ 
    selectIndustry
  }, dispatch)
)(Home);