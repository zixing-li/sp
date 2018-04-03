// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => { // all these arguments are provided by its parent(eg. label) or props of redux-form
  return (
    <div className="form-group">
      <label>{label}</label>
      <input className="form-control" {...input} style={{ marginBottom: '5px' }} />
      <small className="form-text text-muted" style={{ marginBottom: '20px' }}>
        {touched && error}
        {/* // if touch is true (the field is touched/clicked on) then evaluate error, if false the error will not be evaluated */}
      </small>
    </div>
  );
};