import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "../../assets/styles/Home.css";
import { Link } from "react-router-dom";
import {
  selectCategory,
  updateCategoryList
} from "../../actions/actionCreators";

class Home extends Component {
  componentWillUnmount() {
    this.props.updateCategoryList(this.props.categoryList);
  }

  filterCategoryList = event => {
    console.log("event", event.target.value.toLowerCase());
    let updatedList = this.props.categoryList;
    updatedList = updatedList.filter(function(category) {
      return (
        category.name.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1
      );
    });
    this.props.updateCategoryList(updatedList);
  };

  renderCategoryThumbnails = () => {
    const filteredCategoryList = this.props.filteredCategoryList;
    if (!filteredCategoryList) {
      return;
    }

    const categoryThumbnails = filteredCategoryList.map((obj, i) => {
      return (
        <div className="col-md-4" key={`thumbnail${i}`}>
          <div className="card mb-4 box-shadow">
            <Link
              to={`/c/${obj.name}`}
              onClick={() => this.props.selectCategory(obj)}>
              <img
                className="card-img-top"
                src="https://dummyimage.com/600x400/55595c/fff"
                alt="Card image cap"
              />
              <div className="img-title">
                <h3>{obj.name}</h3>
              </div>
            </Link>
          </div>
        </div>
      );
    });

    return <div className="row">{categoryThumbnails}</div>;
  };

  render() {
    return (
      <main role="main">
        <div
          id="myCarousel"
          className="carousel slide full-width"
          data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#myCarousel"
              data-slide-to="0"
              className="active"
            />
            <li data-target="#myCarousel" data-slide-to="1" className="" />
            <li data-target="#myCarousel" data-slide-to="2" className="" />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="first-slide"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                alt="First slide"
              />
              <div className="container">
                <div className="carousel-caption">
                  <h1 className="display-3 mb-4">StarterPack</h1>
                  <p className="lead">
                    {" "}
                    A community where people share their experience and
                    knowledge.
                  </p>
                  <p>
                    <Link to="/register" className="btn btn-lg btn-info mr-2">
                      Sign Up
                    </Link>
                    <Link to="/login" className="btn btn-lg btn-light">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="second-slide"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                alt="Second slide"
              />
              <div className="container">
                <div className="carousel-caption">
                  <h1>Get advise from people who's been there</h1>
                  <p>
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Donec id elit non mi porta gravida at eget metus. Nullam id
                    dolor id nibh ultricies vehicula ut id elit.
                  </p>
                  <p>
                    <Link to="/register" className="btn btn-lg btn-info mr-2">
                      Sign Up
                    </Link>
                    <Link to="/login" className="btn btn-lg btn-light">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="third-slide"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                alt="Third slide"
              />
              <div className="container">
                <div className="carousel-caption">
                  <h1>Contribute to the community</h1>
                  <p>
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Donec id elit non mi porta gravida at eget metus. Nullam id
                    dolor id nibh ultricies vehicula ut id elit.
                  </p>
                  <p>
                    <Link to="/register" className="btn btn-lg btn-info mr-2">
                      Sign Up
                    </Link>
                    <Link to="/login" className="btn btn-lg btn-light">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#myCarousel"
            role="button"
            data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#myCarousel"
            role="button"
            data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
        <div className="album py-5 bg-light">
          <div className="container">
            {/* Search Bar */}
            <div className="row">
              <div className="input-group col-md-8 offset-md-2">
                <input
                  className="form-control py-2 border-right-0 border"
                  type="search"
                  placeholder="search"
                  id="example-search-input"
                  onChange={event => this.filterCategoryList(event)}
                />
                <span className="input-group-append">
                  <button
                    className="btn btn-outline-secondary border-left-0 border"
                    type="button">
                    <i className="fa fa-search" />
                  </button>
                </span>
              </div>
            </div>
            <br />
            <br />
            {this.renderCategoryThumbnails()}
          </div>
        </div>
      </main>
    );
  }
}

export default connect(
  state => ({
    categoryList: state.categories.categoryList,
    filteredCategoryList: state.categories.filteredCategoryList,
    selectedCategory: state.categories.selectedCategory
  }),
  dispatch =>
    bindActionCreators(
      {
        selectCategory,
        updateCategoryList
      },
      dispatch
    )
)(Home);
