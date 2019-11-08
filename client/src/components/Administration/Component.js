import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import { styles } from '../../themeHandler';

import UserSelect from './elements/UserSelect';

import NewUsername from './elements/NewUsername';
import NewPassword from './elements/NewPassword';
import NewFirstName from './elements/NewFirstName';
import NewLastName from './elements/NewLastName';

import EditUsername from './elements/EditUsername';
import EditPassword from './elements/EditPassword';
import EditFirstName from './elements/EditFirstName';
import EditLastName from './elements/EditLastName';
import UserStatus from './elements/UserStatus';

import CreateButton from './elements/CreateButton';
import SaveButton from './elements/SaveButton';
import CancelButton from './elements/CancelButton';
import ChangePassword from './elements/ChangePassword';
import {updateNewLastName} from "../../actions/administration";

class Administration extends React.Component {
  constructor(props) {
    super(props);

    this.userSelectHandler = this.userSelectHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);

    this.createNewHandler = this.createNewHandler.bind(this);
    this.cancelCreateHandler = this.cancelCreateHandler.bind(this);

  }

  componentDidUpdate(prevProps) {

  }

  componentWillMount() {
    this.prepareAdministration();
  }

  prepareAdministration(){
    this.props.fetchUsers();
  }

  componentDidMount() {

  }

  saveHandler() {

    // create user update object
    let userObj = {
      "username": this.props.selectedUsername,
      "firstName": this.props.selectedFirstName,
      "lastName": this.props.selectedLastName,
      "isActive": this.props.selectedActive
    };

    // TODO - include password if mode == 'password'
    if (this.props.mode === "password") {
      userObj.password = this.props.selectedPassword;
    }

    this.props.attemptUpdateUser(this.props.selectedUserId, userObj);

  }

  cancelHandler() {
    this.props.fetchUser(this.props.selectedUserId);
  }

  createNewHandler() {

    let userObj = {
      "username": this.props.newUsername,
      "password": this.props.newPassword,
      "firstName": this.props.newFirstName,
      "lastName": this.props.newLastName,
      "isActive": true
    };

    this.props.attemptCreateUser(userObj);

  }

  cancelCreateHandler() {

    // TODO

  }

  userSelectHandler(id) {
    for (let i = 0; i < this.props.availableUsers.length; i++) {
      if (id === this.props.availableUsers[i].attributes.id) {

        // Fetch Selected User Details
        this.props.fetchUser(this.props.availableUsers[i].attributes.id);

      }
    }
  }

  parseAvailableUsers(users) {
    let availableUsers = [ ]; // list superuser first

    if (typeof users !== "undefined") {

      for (let i = 0; i < users.length; i++) {
        availableUsers.push({
          "id": users[i].attributes.id,
          "name": users[i].attributes.firstName + " " + users[i].attributes.lastName
        });
      }

      // display first user from list by default
      if(typeof availableUsers[0] !== "undefined" && this.props.selectedUserId === null && this.props.mode !== "create") {
        this.userSelectHandler(availableUsers[0].id);
      }

    }

    return availableUsers;
  }

  parseSelectedUser(id, availableUsers) {
    let selectedUserObj = { "user": '' };

    let obj = availableUsers.find(o => o.id === id);
    if (obj) selectedUserObj.user = obj.id;

    return selectedUserObj;
  }

  parseSelectedUsername(selectedUsername) {
    return { "username": selectedUsername };
  }

  parseSelectedFirstName(selectedFirstName) {
    return { "firstname": selectedFirstName };
  }

  parseSelectedLastName(selectedLastName) {
    return { "lastname": selectedLastName };
  }

  parseSelectedActive(selectedActive) {
    return { "active": selectedActive };
  }

  render() {

    const { classes } = this.props;

    const { selectedUserId, selectedUsername, selectedFirstName, selectedLastName, selectedActive, mode } = this.props;

    let availableUsers = this.parseAvailableUsers(this.props.availableUsers);
    let selectedUserObj = this.parseSelectedUser(selectedUserId, availableUsers);

    let selectedUsernameObj = this.parseSelectedUsername(selectedUsername);
    let selectedFirstNameObj = this.parseSelectedFirstName(selectedFirstName);
    let selectedLastNameObj = this.parseSelectedLastName(selectedLastName);
    let selectedActiveObj = this.parseSelectedActive(selectedActive);

    // console.log(this.props);

    // handle "Error: password must be at least 8 characters long"
    // handle "Error: username already exists"

    console.log(this.props.error.toString());

    return (

      <Grid className={classes.root}>

          <Grid container spacing={0}>

            <Grid item xs={3}>

              <Grid container spacing={0}>

                <Grid item xs={7}>

                  <UserSelect action={this.userSelectHandler} options={availableUsers} user={selectedUserObj} />

                </Grid>

                <Grid item xs={2}>

                  <CreateButton action={this.props.createNewUser} />

                </Grid>

              </Grid>

            </Grid>

            {(mode === 'create') ? (
              <>

              <Grid item xs={9}>

                <Grid container>

                  <Grid item xs={2}>

                    <NewUsername action={this.props.updateNewUsername} error={this.props.error.toString()} />

                  </Grid>

                  <Grid item xs={2}>

                    <NewPassword action={this.props.updateNewPassword} error={this.props.error.toString()} />

                  </Grid>

                </Grid>

                <Grid container>

                  <Grid item xs={2}>

                    <NewFirstName action={this.props.updateNewFirstName} />

                  </Grid>

                  <Grid item xs={2}>

                    <NewLastName action={this.props.updateNewLastName} />

                  </Grid>

                  <Grid item xs={1}>
                    <SaveButton action={this.createNewHandler} />
                  </Grid>

                  <Grid item xs={1}>
                    <CancelButton action={this.cancelCreateHandler} />
                  </Grid>

                </Grid>

              </Grid>


              </> ) : (
                <>

                  <Grid item xs={9}>

                    <Grid container>

                      <Grid item xs={2}>
                        <EditUsername action={this.props.updateUsername} username={selectedUsernameObj} />
                      </Grid>

                      <Grid item xs={2}>

                        {(mode === 'view' || mode === 'edit') ? (
                          <>

                            <ChangePassword action={this.props.changePassword} />

                          </> ) : ( <> <EditPassword action={this.props.updatePassword} /> </> )}

                      </Grid>

                      <Grid item xs={2}>

                      </Grid>

                    </Grid>


                    <Grid container>

                      <Grid item xs={2}>
                        <EditFirstName action={this.props.updateFirstName} firstname={selectedFirstNameObj} />
                      </Grid>

                      <Grid item xs={2}>
                        <EditLastName action={this.props.updateLastName} lastname={selectedLastNameObj} />
                      </Grid>

                      <Grid item xs={2}>
                        <UserStatus action={this.props.updateActive} active={selectedActiveObj} />
                      </Grid>

                      {(mode === 'edit' || mode === 'password') ? (
                        <>

                          <Grid item xs={1}>
                            <SaveButton action={this.saveHandler} />
                          </Grid>

                          <Grid item xs={1}>
                            <CancelButton action={this.cancelHandler} />
                          </Grid>

                        </> ) : ( <> </> )}

                    </Grid>

                  </Grid>

                </> )}


          </Grid>

      </Grid>

    )

  }

}

const AdministrationWrapped = withStyles(styles)(Administration);

export default AdministrationWrapped;
