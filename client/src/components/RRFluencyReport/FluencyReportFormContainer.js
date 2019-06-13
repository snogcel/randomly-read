import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import withAuth from '../../util/withAuth';
import MyFluencyForm from './FluencyReportForm';
import validate from './validate'
import { attemptCreateInteraction } from '../../actions/interactions';

const mapStateToProps = state => ({
   
  });
  
  const mapDispatchToProps = { attemptCreateInteraction };

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
