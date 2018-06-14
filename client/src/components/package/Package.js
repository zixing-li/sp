import React, { Component } from "react";
import { Link } from "react-router-dom";

class Package extends Component {
  render() {
    return (
      <div>
        {/* <div><PackageListWrapper/></div> */}
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Package</h1>
            <p className="lead text-muted mb-0">
              Le Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en page avant impression. Le Lorem Ipsum
              est le faux texte standard de l'imprimerie depuis les années
              1500...
            </p>
          </div>
        </section>
        <div className="container">
          <div className="row">
            {/* <!-- Image --> */}
            <div className="col-12 col-lg-6">
              <div className="card bg-light mb-3">
                <div className="card-body">
                  <a href="" data-toggle="modal" data-target="#productModal">
                    <img
                      className="img-fluid"
                      src="https://dummyimage.com/800x800/55595c/fff"
                    />
                    <p className="text-center">Zoom</p>
                  </a>
                </div>
              </div>
            </div>

            {/* <!-- Add to cart --> */}
            <div className="col-12 col-lg-6 add_to_cart_block">
              <div className="card bg-light mb-3">
                <div className="card-body">
                  <p className="price">$5.00</p>
                  <p className="price_discounted">$15.00</p>
                  <form method="get" action="cart.html">
                    <a
                      href="cart.html"
                      className="btn btn-success btn-lg btn-block text-uppercase">
                      <i className="fa fa-shopping-cart" /> Add To Cart
                    </a>
                  </form>
                  <div className="product_rassurance">
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <i className="fa fa-graduation-cap fa-2x" />
                        <br />Peer reviewed
                      </li>
                      <li className="list-inline-item">
                        <i className="fa fa-credit-card fa-2x" />
                        <br />Secure payment
                      </li>
                      <li className="list-inline-item">
                        <i className="fa fa-phone fa-2x" />
                        <br />+33 1 22 54 65 60
                      </li>
                    </ul>
                  </div>
                  <div className="reviews_product p-3 mb-2 ">
                    3 reviews
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    (4/5)
                    <a className="pull-right" href="#reviews">
                      View all reviews
                    </a>
                  </div>
                  <div className="datasheet p-3 mb-2 bg-info text-white">
                    <a href="" className="text-white">
                      <i className="fa fa-file-text" /> See Preview
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* <!-- Description --> */}
            <div className="col-12">
              <div className="card border-light mb-3">
                <div className="card-header bg-primary text-white text-uppercase">
                  <i className="fa fa-align-justify" /> Description
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Le Lorem Ipsum est simplement du faux texte employé dans la
                    composition et la mise en page avant impression. Le Lorem
                    Ipsum est le faux texte standard de l'imprimerie depuis les
                    années 1500, quand un peintre anonyme assembla ensemble des
                    morceaux de texte pour réaliser un livre spécimen de polices
                    de texte. Il n'a pas fait que survivre cinq siècles, mais
                    s'est aussi adapté à la bureautique informatique, sans que
                    son contenu n'en soit modifié. Il a été popularisé dans les
                    années 1960 grâce à la vente de feuilles Letraset contenant
                    des passages du Lorem Ipsum, et, plus récemment, par son
                    inclusion dans des applications de mise en page de texte,
                    comme Aldus PageMaker.
                  </p>
                  <p className="card-text">
                    Contrairement à une opinion répandue, le Lorem Ipsum n'est
                    pas simplement du texte aléatoire. Il trouve ses racines
                    dans une oeuvre de la littérature latine classique datant de
                    45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du
                    Hampden-Sydney College, en Virginie, s'est intéressé à un
                    des mots latins les plus obscurs, consectetur, extrait d'un
                    passage du Lorem Ipsum, et en étudiant tous les usages de ce
                    mot dans la littérature classique, découvrit la source
                    incontestable du Lorem Ipsum. Il provient en fait des
                    sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et
                    Malorum" (Des Suprêmes Biens et des Suprêmes Maux) de
                    Cicéron. Cet ouvrage, très populaire pendant la Renaissance,
                    est un traité sur la théorie de l'éthique. Les premières
                    lignes du Lorem Ipsum, "Lorem ipsum dolor sit amet...",
                    proviennent de la section 1.10.32.
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- Reviews --> */}
            <div className="col-12" id="reviews">
              <div className="card border-light mb-3">
                <div className="card-header bg-primary text-white text-uppercase">
                  <i className="fa fa-comment" /> Reviews
                </div>
                <div className="card-body">
                  <div className="review">
                    <span
                      className="glyphicon glyphicon-calendar"
                      aria-hidden="true"
                    />
                    <meta itemprop="datePublished" content="01-01-2016" />January
                    01, 2018 <span className="fa fa-star" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" /> by Paul Smith
                    <p className="blockquote">
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                      </p>
                    </p>
                    <hr />
                  </div>
                  <div className="review">
                    <span
                      className="glyphicon glyphicon-calendar"
                      aria-hidden="true"
                    />
                    <meta itemprop="datePublished" content="01-01-2016" />January
                    01, 2018 <span className="fa fa-star" aria-hidden="true" />
                    <span className="fa fa-star" aria-hidden="true" />
                    <span className="fa fa-star" aria-hidden="true" />
                    <span className="fa fa-star" aria-hidden="true" />
                    <span className="fa fa-star" aria-hidden="true" /> by Paul
                    Smith
                    <p className="blockquote">
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                      </p>
                    </p>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Package;
