import React from 'react';
import { Field } from 'redux-form';
import Form from '../shared/form/Form';
import renderField from '../shared/form/renderField';
import { usernameValidator, passwordValidator, emailValidator, firstNameValidator, lastNameValidator, addressValidator, cityValidator, stateProvinceValidator, postalCodeValidator, countryValidator, genderValidator, ageValidator } from '../../util/validators';
import SubmitButton from '../shared/form/SubmitButton';

class SignupForm extends React.Component {
  componentDidMount() {
    this.redirectIfLoggedIn();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.token) this.props.history.push('/');
  }

  onSubmit = ({ username, password, email, firstName, lastName, address, city, stateProvince, postalCode, country, gender, age }) => {
    this.props.attemptSignup(username, password, email, firstName, lastName, address, city, stateProvince, postalCode, country, gender, age);
  };

  render() {
    return (
      <Form
        loading={this.props.loading}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name='username'
          label='username'
          type='text'
          component={renderField}
          validate={usernameValidator}
        />
        <Field
          name='email'
          label='email'
          type='text'
          component={renderField}
          validate={emailValidator}
        />
        <Field
          name='firstName'
          label='first name'
          type='text'
          component={renderField}
          validate={firstNameValidator}
        />
        <Field
          name='lastName'
          label='last name'
          type='text'
          component={renderField}
          validate={lastNameValidator}
        />
        <Field
          name='address'
          label='address'
          type='text'
          component={renderField}
          validate={addressValidator}
          />
          <Field
            name='city'
            label='city'
            type='text'
            component={renderField}
            validate={cityValidator}
          />
        <Field
          name='stateProvince'
          label='state / province'
          type='select'
          component={renderField}
          validate={stateProvinceValidator}
        >
          <option key="AL" value="AL">Alabama</option>
          <option key="AK" value="AK">Alaska</option>
          <option key="AZ" value="AZ">Arizona</option>
          <option key="AR" value="AR">Arkansas</option>
          <option key="CA" value="CA">California</option>
          <option key="CO" value="CO">Colorado</option>
          <option key="CT" value="CT">Connecticut</option>
          <option key="DE" value="DE">Delaware</option>
          <option key="FL" value="FL">Florida</option>
          <option key="GA" value="GA">Georgia</option>
          <option key="HI" value="HI">Hawaii</option>
          <option key="ID" value="ID">Idaho</option>
          <option key="IL" value="IL">Illinois</option>
          <option key="IN" value="IN">Indiana</option>
          <option key="IA" value="IA">Iowa</option>
          <option key="KS" value="KS">Kansas</option>
          <option key="KY" value="KY">Kentucky</option>
          <option key="LA" value="LA">Louisiana</option>
          <option key="ME" value="ME">Maine</option>
          <option key="MD" value="MD">Maryland</option>
          <option key="MA" value="MA">Massachusetts</option>
          <option key="MI" value="MI">Michigan</option>
          <option key="MN" value="MN">Minnesota</option>
          <option key="MS" value="MS">Mississippi</option>
          <option key="MO" value="MO">Missouri</option>
          <option key="MT" value="MT">Montana</option>
          <option key="NE" value="NE">Nebraska</option>
          <option key="NV" value="NV">Nevada</option>
          <option key="NH" value="NH">New Hampshire</option>
          <option key="NJ" value="NJ">New Jersey</option>
          <option key="NM" value="NM">New Mexico</option>
          <option key="NY" value="NY">New York</option>
          <option key="NC" value="NC">North Carolina</option>
          <option key="ND" value="ND">North Dakota</option>
          <option key="OH" value="OH">Ohio</option>
          <option key="OK" value="OK">Oklahoma</option>
          <option key="OR" value="OR">Oregon</option>
          <option key="PA" value="PA">Pennsylvania</option>
          <option key="RI" value="RI">Rhode Island</option>
          <option key="SC" value="SC">South Carolina</option>
          <option key="SD" value="SD">South Dakota</option>
          <option key="TN" value="TN">Tennessee</option>
          <option key="TX" value="TX">Texas</option>
          <option key="UT" value="UT">Utah</option>
          <option key="VT" value="VT">Vermont</option>
          <option key="VA" value="VA">Virginia</option>
          <option key="WA" value="WA">Washington</option>
          <option key="WV" value="WV">West Virginia</option>
          <option key="WI" value="WI">Wisconsin</option>
          <option key="WY" value="WY">Wyoming</option>
          <option key="DC" value="DC">District of Columbia</option>
        </Field>
        <Field
          name='postalCode'
          label='postal code'
          type='text'
          component={renderField}
          validate={postalCodeValidator}
        />
        <Field
          name='country'
          label='country'
          type='select'
          component={renderField}
          validate={countryValidator}
        >
          <option key="USA" value="USA">United States of America</option>
        </Field>
        <Field
          name='gender'
          label='gender'
          type='select'
          component={renderField}
          validate={genderValidator}
        >
          <option key="male" value="male">Male</option>
          <option key="female" value="female">Female</option>
        </Field>
        <Field
          name='age'
          label='age'
          type='text'
          component={renderField}
          validate={ageValidator}
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
    );
  }
}

export default SignupForm;
