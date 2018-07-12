import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "../../assets/styles/Category.css";
import { Link, withRouter } from "react-router-dom";
import { subscribeToCategory } from "../../actions/profileActions";

class Category extends Component {
  onSubmit(e) {
    e.preventDefault();

    const subData = {
      category: this.props.selectedCategory
    };

    this.props.subscribeToCategory(subData, this.props.history);
  }

  renderPackageThumbnails = () => {
    const packageList = this.props.packageList;
    if (!packageList) {
      return;
    }

    const packageThumbnails = packageList.map((obj, i) => {
      return (
        <div className="col-12 col-md-6 col-lg-4" key={`thumbnail${i}`}>
          <div className="card mb-4 box-shadow">
            <Link to="/p/packages">
              <img
                className="card-img-top"
                src="https://dummyimage.com/600x400/55595c/fff"
                alt="Card image cap"
              />
            </Link>
            <div className="card-body">
              <h4 className="card-title">
                <a href="product.html" title="View Product">
                  Package title
                </a>
              </h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <div className="row">
                <div className="col">
                  <p className="btn btn-danger btn-block">$5.00</p>
                </div>
                <div className="col">
                  <a href="#" className="btn btn-success btn-block">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return <div className="row">{packageThumbnails}</div>;
  };

  render() {
    return (
      <main role="main">
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">
              {this.props.selectedCategory.name}
            </h1>
            <button
              onClick={this.onSubmit.bind(this)}
              type="button"
              className="btn btn-info mr-1">
              Subscribe
            </button>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <Link to="/feed">
              <button
                type="button"
                className="btn btn-danger btn-lg fixed-square-button wobble"
                style={{ zIndex: 10 }}>
                {/* <i className="fas fa-plus" /> */}
                Discussions
              </button>
            </Link>
            {/* Search Bar */}
            <div className="input-group col-md-8 offset-md-2">
              <input
                className="form-control py-2 border-right-0 border"
                type="search"
                defaultValue="search"
                id="example-search-input"
              />
              <span className="input-group-append">
                <button
                  className="btn btn-outline-secondary border-left-0 border"
                  type="button">
                  <i className="fa fa-search" />
                </button>
              </span>
            </div>
            <br />
            <br />
            <div className="row">
              {this.renderPackageThumbnails()}
              <div className="col-12">
                <nav aria-label="...">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex="-1">
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        2 <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  packageList: state.packages.packageList,
  selectedCategory: state.categories.selectedCategory
});

export default connect(
  mapStateToProps,
  { subscribeToCategory }
)(withRouter(Category));
