import React from 'react';
import { Field } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Form from '../shared/form/Form';
import renderField from '../shared/form/renderField';
import { usernameValidator, passwordValidator, emailValidator } from '../../util/validators';
import SubmitButton from '../shared/form/SubmitButton';

const SignupForm = (props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.token) {
      navigate('/');
    }
  }, [props.token, navigate]);

  const onSubmit = ({ username, password, email, firstName, lastName, address, city, stateProvince, postalCode, country, gender, age }) => {
    props.attemptSignup(username, password, email, firstName, lastName, address, city, stateProvince, postalCode, country, gender, age);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <br />
        <Form
          loading={props.loading}
          onSubmit={props.handleSubmit(onSubmit)}
        >
          <Field
            name='email'
            label='email'
            type='text'
            component={renderField}
            validate={emailValidator}
          />
          <Field
            name='username'
            label='username'
            type='text'
            component={renderField}
            validate={usernameValidator}
          />
          <Field
            name='password'
            label='password'
            type='password'
            component={renderField}
            validate={passwordValidator}
          />
          <Field
            name='password2'
            label='confirm password'
            type='password'
            component={renderField}
          />
          <SubmitButton type='submit'>sign up</SubmitButton>
        </Form>
      </Grid>
    </Grid>
  );
};

export default SignupForm;
