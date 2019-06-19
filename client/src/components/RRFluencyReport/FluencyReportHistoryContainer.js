 import { connect } from 'react-redux';
import FluencyReportHistory from './FluencyReportHistory'
import { resetFormData } from '../../actions/formData';
import { addInitialFormData } from '../../actions/formData';
import { addSetting1FormData } from '../../actions/formData';
import { addSetting2FormData } from '../../actions/formData';
import { addSetting3FormData } from '../../actions/formData';
import { addSetting4FormData } from '../../actions/formData';
import { addSetting5FormData } from '../../actions/formData';
import { addSetting6FormData } from '../../actions/formData';
import { deleteSetting1FormData } from '../../actions/formData';
import { deleteSetting2FormData } from '../../actions/formData';
import { deleteSetting3FormData } from '../../actions/formData';
import { deleteSetting4FormData } from '../../actions/formData';
import { deleteSetting5FormData } from '../../actions/formData';
import { deleteSetting6FormData } from '../../actions/formData';
import { loadSetting1FormData } from '../../actions/formData';
import { loadSetting2FormData } from '../../actions/formData';
import { loadSetting3FormData } from '../../actions/formData';
import { loadSetting4FormData } from '../../actions/formData';
import { loadSetting5FormData } from '../../actions/formData';
import { loadSetting6FormData } from '../../actions/formData';
import { mutateCombinedData } from '../../actions/formData';

const mapStateToProps = state => ({
    formData: state.formData,
    setting1: state.formData.setting1,
    setting2: state.formData.setting2,
    setting3: state.formData.setting3,
    setting4: state.formData.setting4,
    setting5: state.formData.setting5,
    setting6: state.formData.setting6,
    combinedData: state.formData.combinedData
});

const mapDispatchToProps = { 
  loadSetting1FormData,
  loadSetting2FormData,
  loadSetting3FormData,
  loadSetting4FormData,
  loadSetting5FormData,
  loadSetting6FormData,
  addSetting1FormData, 
  addSetting2FormData, 
  addSetting3FormData,
  addSetting4FormData, 
  addSetting5FormData, 
  addSetting6FormData, 
  deleteSetting1FormData,
  deleteSetting2FormData,
  deleteSetting3FormData,
  deleteSetting4FormData,
  deleteSetting5FormData,
  deleteSetting6FormData,
  mutateCombinedData,
  resetFormData, 
  };

const FluencyReportHistoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(FluencyReportHistory);

export default FluencyReportHistoryContainer; 