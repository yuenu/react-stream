import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ touched, error}) {
    if(error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({input, label, meta}) => {
    const fieldClassName = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={fieldClassName}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button type="submit" className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const error = {}
  if(!formValues.title) {
    error.title = 'You must enter a title'
  }

  if(!formValues.description) {
    error.description = 'You must enter a description'
  }

  return error
}

const formWrapped = reduxForm({
  form: "streamForm",
  validate
})(StreamForm);

export default formWrapped
