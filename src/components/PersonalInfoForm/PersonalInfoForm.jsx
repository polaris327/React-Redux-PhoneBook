import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { addPersonalInfo } from '../../store/actions';
import './PersonalInfoForm.css';

class PersonalInfoForm extends Component {

  onClickAddInfo = (formValues, formDispatch) => {
    formDispatch(addPersonalInfo(formValues));
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onClickAddInfo)}>
        <h2>Add personal Info</h2>
        <div className="field-container">
          <span>
            First Name: 
          </span>
          <Field name="firstName"
                 component="input"
                 type="text" />
        </div>
        <div className="field-container">
          <span>
            Last Name: 
          </span>
          <Field name="lastName"
                 component="input"
                 type="text" />
        </div>
        <div className="field-container">
          <span>
            BirthDay Name: 
          </span>
          <Field name="birthDate"
                 component="input"
                 type="date" />
        </div>
        <div className="field-container">
          <span>
            Phone Name: 
          </span>
          <Field name="phoneNumber"
                 component="input"
                 type="number" />
        </div>
        <div className="field-container">
          <button type="submit">Add Personal Info</button>
        </div>
      </form>
    );
  }
};

PersonalInfoForm.propTypes = {
};

export default reduxForm({ form: 'personalInfoForm' })(PersonalInfoForm);