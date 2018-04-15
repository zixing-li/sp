import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/actionCreators';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => { // reverse so the lastest is on the top
      return (
        <div className="card mb-4" key={survey._id}>
          <div className="card-header">
            <span>{survey.title}</span>
          </div>
          <div className="card-body">
            <p className="card-text">
              {survey.body}
            </p>
            <p className="small text-muted text-right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-body">
            <div className="card-link">
              <a>Yes: {survey.yes}</a>
              <a>No: {survey.no}</a>
            </div>
          </div>
          {/* <div class="card-footer text-muted">
            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
          </div> */}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);