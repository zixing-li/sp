import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { selectCategory } from "../../actions/actionCreators";

class Subscription extends Component {
  render() {
    const subscription = this.props.subscription.subscribedCategories.map(
      sub => (
        <tr key={sub._id}>
          <td>
            <Link
              to={`/c/${sub.name}`}
              onClick={() => this.props.selectCategory(sub)}
              className="btn btn-light">
              {sub.name}
            </Link>
          </td>
        </tr>
      )
    );
    return (
      // To Do - change from table to span
      <div>
        <h4 className="mb-4">Subscriptions</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Subscribed to:</th>
              <th />
            </tr>
            {subscription}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch =>
    bindActionCreators(
      {
        selectCategory
      },
      dispatch
    )
)(Subscription);
