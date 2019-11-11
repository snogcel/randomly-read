import { connect } from 'react-redux';

import Administration from './Component.js';
import { createNewUser, updateNewUsername, updateNewPassword, updateNewFirstName, updateNewLastName, fetchUsers, fetchUser, updateUserId, updateUsername, updatePassword, updateFirstName, updateLastName, updateActive, changePassword, attemptUpdateUser, attemptCreateUser } from '../../actions/administration';

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
  newUsername: state.administration.newUsername,
  newPassword: state.administration.newPassword,
  newFirstName: state.administration.newFirstName,
  newLastName: state.administration.newLastName,
  mode: state.administration.mode,
  error: state.administration.error,
  isFetching: state.administration.isFetching,
});

const mapDispatchToProps = { createNewUser, updateNewUsername, updateNewPassword, updateNewFirstName, updateNewLastName, fetchUsers, fetchUser, updateUserId, updateUsername, updatePassword, updateFirstName, updateLastName, updateActive, changePassword, attemptUpdateUser, attemptCreateUser };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const AdministrationContainer = enhance(Administration);

export default AdministrationContainer;
