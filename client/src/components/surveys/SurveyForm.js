// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // Field renders any type of html elements of user input
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {/* // same as onSubmit = {this.props.handleSubmit(() => this.props.onSurveySubmit())} */}
        <form style={{ margin: '2rem 10rem 0 10rem' }} onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}> 
          {this.renderFields()}
          <Link to="/surveys" className="btn btn-primary">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary pull-right" >
          {/* this button automatically submits the form that it's inside of */}
            Next
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || ''); // make sure the name (recipients) matches the backend

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({ // this.props.handleSubmit and this.props.onSurveySubmit are provided by this reduxform helper
  validate, // same as validate: validate, this function runs right before the user submit the form
  form: 'surveyForm',
  destroyOnUnmount: false // if component is unmounted, do not clear fields. this makes sure that you can still come back from preview to see and modify the fields if you wish to revise
})(SurveyForm);