import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import withAuth from '../../util/withAuth';
import MyFluencyForm from './FluencyReportForm';
import validate from './validate'
import { attemptCreateInteraction } from '../../actions/interactions';
import { addFormData } from '../../actions/formData';
import { resetFormData } from '../../actions/formData';
import { addInitialFormData } from '../../actions/formData';

const mapStateToProps = state => ({
   
  });

const mapDispatchToProps = { attemptCreateInteraction, addInitialFormData, addFormData, resetFormData};

const enhance = compose(
  reduxForm({ form: 'MyFluencyForm' ,
  validate }),
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const MyFluencyFormContainer = enhance(MyFluencyForm);

export default MyFluencyFormContainer;
