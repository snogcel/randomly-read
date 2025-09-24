import React, { useEffect } from 'react';
import { Field } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import categories from '../../categories';
import Form from '../shared/form/Form';
import renderField from '../shared/form/renderField';
import SubmitButton from '../shared/form/SubmitButton';

const postTypes = [
  {
    label: 'link',
    value: 'link'
  },
  {
    label: 'text',
    value: 'text'
  }
];

const CreatePostForm = (props) => {
  const navigate = useNavigate();
  const { token, post, isFetching, handleSubmit, attemptCreatePost, form } = props;

  useEffect(() => {
    if (!token) navigate('/');
    if (post) navigate(`/a/${post.category}/${post.id}`);
  }, [token, post, navigate]);

  const onSubmit = post => attemptCreatePost(post);

  const mapCategories = () =>
    categories.map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
    ));

  return (
    <Form
      loading={isFetching}
      onSubmit={handleSubmit(onSubmit)}
      wide
    >
      <Field
        name='type'
        label='type'
        type='radiogroup'
        component={renderField}
        options={postTypes}
      />
      <Field
        name='category'
        label='category'
        type='select'
        component={renderField}
      >
        {mapCategories()}
      </Field>
      <Field name='title' label='title' type='text' component={renderField} />
      {form.values.type === 'link' && (
        <Field name='url' label='url' type='url' component={renderField} />
      )}
      {form.values.type === 'text' && (
        <Field
          name='text'
          label='text'
          type='textarea'
          component={renderField}
        />
      )}
      <SubmitButton type='submit'>create post</SubmitButton>
    </Form>
  );
};

export default CreatePostForm;
