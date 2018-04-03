// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => { // all these arguments are provided by its parent(eg. label) or props of redux-form
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
        {/* // if touch is true (the field is touched/clicked on) then evaluate error, if false the error will not be evaluated */}
      </div>
    </div>
  );
};