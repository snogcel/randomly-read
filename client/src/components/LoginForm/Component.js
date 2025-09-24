import React from 'react';
import { Field } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Form from '../shared/form/Form';
import renderField from '../shared/form/renderField';
import { usernameValidator, passwordValidator } from '../../util/validators';
import SubmitButton from '../shared/form/SubmitButton';

const LoginForm = (props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.token) {
      navigate('/home');
    }
  }, [props.token, navigate]);

  const onSubmit = ({ username, password }) => {
    props.attemptLogin(username, password);
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
          <SubmitButton type='submit'>log in</SubmitButton>
        </Form>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
