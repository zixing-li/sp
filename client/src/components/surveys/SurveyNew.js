// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; // redux-form's biggest strength is that it provides a lot of useful event-handlers
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  // classical way:
  // constructor(props) {
  //   super(props);
  //   this.state = { showFormReview: false };
  // }

  // same effect as above 
  state = { showFormReview: false }; // not making a separate route for FormReview page because users can paste url to bypass to review page

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    
    return ( // else reutrn SurveyForm
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm' 
  // no destoryOnUnmount so that if naviagtes away from SurveyNew, clear out fields
})(SurveyNew);