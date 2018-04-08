// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom'; // In this app only App and SurveyNewy know about react router. withRouter teaches components that aren't included in react-router index.js how to use react-router. It gives access to these props: { match, location, history }
import * as actions from '../../actions/actionCreators';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => { // history is provided by withRouter
  const reviewFields = _.map(formFields, ({ name, label }) => { // this map is a lodash helper function
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="btn btn-primary"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)} // use arrow function to delay action so it doesn't get called immediately
        className="btn btn-primary pull-right"
      >
        Send Survey
        <span className="glyphicon glyphicon-ok">email</span>
      </button>
    </div>
  );
};

function mapStateToProps(state) { // calls entire state object from redux store
  return { formValues: state.form.surveyForm.values }; // form reducer provided by redux form
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));