import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';

class Payments extends Component {
  render() {
    // debugger;

    return (
      <StripeCheckout
        name="SP"
        description="$5 for package"
        amount={500}
        token={token=>this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn btn-primary">
        {/* <button className="btn btn-lg btn-primary btn-block" type="submit"> */}
          Pay with Card
        </button>
      </StripeCheckout>
    )
  }
}

export default connect(null, actions)(Payments); // no mapStateToProps therefore null