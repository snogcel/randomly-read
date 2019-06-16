import { connect } from 'react-redux';
import FluencyReportHistory from './FluencyReportHistory'
import { addFormData } from '../../actions/formData';
import { resetFormData } from '../../actions/formData';
import { addInitialFormData } from '../../actions/formData';
const mapStateToProps = state => ({
    formData: state.formData.formData
});

const mapDispatchToProps = { addFormData, resetFormData, addInitialFormData};

const FluencyReportHistoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(FluencyReportHistory);

export default FluencyReportHistoryContainer;