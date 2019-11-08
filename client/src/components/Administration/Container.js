import { connect } from 'react-redux';

import Administration from './Component.js';
import { fetchUsers, fetchUser, updateUserId, updateUsername, updatePassword, updateFirstName, updateLastName, updateActive, changePassword, attemptUpdateUser } from '../../actions/administration';

import {compose} from "redux";
import withAuth from "../../util/withAuth";

const mapStateToProps = state => ({
  availableUsers: state.administration.availableUsers,
  selectedUserId: state.administration.selectedUserId,
  selectedUsername: state.administration.selectedUsername,
  selectedFirstName: state.administration.selectedFirstName,
  selectedLastName: state.administration.selectedLastName,
  selectedActive: state.administration.selectedActive,
  selectedPassword: state.administration.selectedPassword,
  mode: state.administration.mode,
  isFetching: state.administration.isFetching,
});

const mapDispatchToProps = { fetchUsers, fetchUser, updateUserId, updateUsername, updatePassword, updateFirstName, updateLastName, updateActive, changePassword, attemptUpdateUser };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const AdministrationContainer = enhance(Administration);

export default AdministrationContainer;
