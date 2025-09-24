import React, { useEffect } from 'react';
import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


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

import ViewHistoryContainer from '../ViewHistory/Container';

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

  componentDidMount() {
    this.prepareAdministration();
  }

  prepareAdministration() {
    this.props.fetchUsers();
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

    this.props.cancelCreateNewUser();

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
    let availableUsers = []; // list superuser first

    if (typeof users !== "undefined") {

      for (let i = 0; i < users.length; i++) {
        availableUsers.push({
          "id": users[i].attributes.id,
          "name": users[i].attributes.firstName + " " + users[i].attributes.lastName,
          "isActive": users[i].attributes.isActive
        });
      }

      console.log("Available Users: ", availableUsers);

      // display first user from list by default
      if (typeof availableUsers[0] !== "undefined" && this.props.selectedUserId === null && this.props.mode !== "create") {
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
    const { user } = this.props;
    const { selectedUserId, selectedUsername, selectedFirstName, selectedLastName, selectedActive, mode } = this.props;

    // Set responsive grid widths (simplified from withWidth)
    let pageWrapperWidth = 12;
    let userSelectContainerWidth = 3;
    let userAdministrationContainerWidth = 9;

    let availableUsers = this.parseAvailableUsers(this.props.availableUsers);
    let selectedUserObj = this.parseSelectedUser(selectedUserId, availableUsers);

    let selectedUsernameObj = this.parseSelectedUsername(selectedUsername);
    let selectedFirstNameObj = this.parseSelectedFirstName(selectedFirstName);
    let selectedLastNameObj = this.parseSelectedLastName(selectedLastName);
    let selectedActiveObj = this.parseSelectedActive(selectedActive);

    let errorString = this.props.error.toString();
    let usernameError = "";
    let passwordError = "";
    let firstNameError = "";
    let lastNameError = "";

    console.log(errorString);

    // handle validation messages -- this is good enough I guess...
    let usernameValidation = [
      "Error: username already exists",
      "Error: username is required",
      "Error: username cannot be blank",
      "Error: username must be at most 32 characters long",
      "Error: username cannot start or end with whitespace",
      "Error: username contains invalid characters"
    ];

    let firstNameValidation = [
      "Error: firstName is required",
      "Error: firstName cannot be blank",
      "Error: firstName must be at most 32 characters long",
      "Error: firstName cannot start or end with whitespace",
      "Error: firstName contains invalid characters"
    ];

    let lastNameValidation = [
      "Error: lastName is required",
      "Error: lastName cannot be blank",
      "Error: lastName must be at most 32 characters long",
      "Error: lastName cannot start or end with whitespace",
      "Error: lastName contains invalid characters"
    ];

    let passwordValidation = [
      "Error: password is required",
      "Error: password cannot be blank",
      "Error: password must be at least 8 characters long",
      "Error: password must be at most 72 characters long"
    ];

    if (usernameValidation.indexOf(errorString) > -1) {
      usernameError = errorString;
      usernameError = usernameError.replace("Error: u", "U");
    }

    if (firstNameValidation.indexOf(errorString) > -1) {
      firstNameError = errorString.replace("Error: firstName", "First Name");
    }

    if (lastNameValidation.indexOf(errorString) > -1) {
      lastNameError = errorString.replace("Error: lastName", "Last Name");
    }

    if (passwordValidation.indexOf(errorString) > -1) {
      passwordError = errorString;
      passwordError = passwordError.replace("Error: p", "P");
    }

    return (

      <Grid className={classes.root}>

        {user ? (
          <>

            <Grid container spacing={0} justify="center">

              <Grid item xs={pageWrapperWidth}>

                <Card className={classes.userAdminCard}>

                  <CardContent>

                    <Grid container spacing={0} justify="center">


                      <Grid item xs={userSelectContainerWidth}>

                        <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
                          User Administration
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                          Use the menu to select a user.
                        </Typography>
                        <br />

                        <Grid container spacing={0} className={classes.userAdminSelectContainer}>

                          <Grid item>

                            <UserSelect action={this.userSelectHandler} options={availableUsers} user={selectedUserObj} />

                          </Grid>

                          <Grid item>

                            <CreateButton action={this.props.createNewUser} />

                          </Grid>

                        </Grid>

                        <br />

                      </Grid>


                      <Grid item xs={userAdministrationContainerWidth}>


                        {(mode === 'create') ? (
                          <>

                            <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
                              Create New User
                            </Typography>

                            <Grid container>

                              <Grid item xs={6} sm={4} lg={2}>

                                <NewUsername action={this.props.updateNewUsername} error={usernameError} />

                              </Grid>

                              <Grid item xs={6} sm={4} lg={2}>

                                <NewPassword action={this.props.updateNewPassword} error={passwordError} />

                              </Grid>

                            </Grid>

                            <Grid container>

                              <Grid item xs={6} sm={4} lg={2}>

                                <NewFirstName action={this.props.updateNewFirstName} error={firstNameError} />

                              </Grid>

                              <Grid item xs={6} sm={4} lg={2}>

                                <NewLastName action={this.props.updateNewLastName} error={lastNameError} />

                              </Grid>

                              <Grid item xs={4} sm={2} lg={1}>
                                <SaveButton action={this.createNewHandler} />
                              </Grid>

                              <Grid item xs={4} sm={2} lg={1}>
                                <CancelButton action={this.cancelCreateHandler} />
                              </Grid>

                            </Grid>

                          </>) : (<>

                            <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
                              Selected User Details
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">

                            </Typography>
                            <br />

                            <Grid container>

                              <Grid item xs={6} sm={4} lg={2}>
                                <EditUsername action={this.props.updateUsername} username={selectedUsernameObj} />
                              </Grid>

                              <Grid item xs={6} sm={4} lg={2}>

                                {(mode === 'view' || mode === 'edit') ? (
                                  <>

                                    <ChangePassword action={this.props.changePassword} />

                                  </>) : (<> <EditPassword action={this.props.updatePassword} error={passwordError} /> </>)}

                              </Grid>

                            </Grid>

                            <Grid container>

                              <Grid item xs={6} sm={4} lg={2}>
                                <EditFirstName action={this.props.updateFirstName} firstname={selectedFirstNameObj} error={firstNameError} />
                              </Grid>

                              <Grid item xs={6} sm={4} lg={2}>
                                <EditLastName action={this.props.updateLastName} lastname={selectedLastNameObj} error={lastNameError} />
                              </Grid>

                              <Grid item xs={12} sm={12} lg={2} className={classes.isActiveSelector}>
                                <UserStatus action={this.props.updateActive} active={selectedActiveObj} />
                              </Grid>

                              {(mode === 'edit' || mode === 'password') ? (
                                <>

                                  <Grid item xs={4} sm={2} lg={1}>
                                    <SaveButton action={this.saveHandler} />
                                  </Grid>

                                  <Grid item xs={4} sm={2} lg={1}>
                                    <CancelButton action={this.cancelHandler} />
                                  </Grid>

                                </>) : (<>  </>)}

                            </Grid>

                          </>)}

                      </Grid>

                    </Grid>

                  </CardContent>
                </Card>

              </Grid>

              {(selectedUserId) ? (
                <>

                  <br />

                  <Grid item xs={pageWrapperWidth}>

                    <Card className={classes.userAdminCard}>

                      <CardContent>

                        <ViewHistoryContainer userId={selectedUserId} username={selectedUsername} />

                      </CardContent>
                    </Card>

                  </Grid>

                </>
              ) : (<> </>)}

            </Grid>

          </>
        ) : null}

      </Grid>

    )

  }

}

const AdministrationWithStyles = withStyles(styles)(Administration);

const AdministrationWrapper = (props) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!props.user) {
      navigate("/");
    }
  }, [props.user, navigate]);

  if (!props.user) {
    return null;
  }

  return <AdministrationWithStyles {...props} />;
};

export default AdministrationWrapper;
