import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

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
import PostListContainer from '../PostList/Container';

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
    const { user } = this.props;
    const { selectedUserId, selectedUsername, selectedFirstName, selectedLastName, selectedActive, mode } = this.props;

    const { width } = this.props;

    console.log(width);

    let userSelectContainerWidth = 12;
    let userAdministrationContainerWidth = 12;

    // laptop or desktop
    if (width === "xl" || width === "lg") {
      userSelectContainerWidth = 3;
      userAdministrationContainerWidth = 9;
    }

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
    }

    if (firstNameValidation.indexOf(errorString) > -1) {
      firstNameError = errorString.replace("firstName", "First Name");
    }

    if (lastNameValidation.indexOf(errorString) > -1) {
      lastNameError = errorString.replace("lastName", "Last Name");
    }

    if (passwordValidation.indexOf(errorString) > -1) {
      passwordError = errorString;
    }

    return (

      <Grid className={classes.root}>

        {user ? (
          <>

          <Grid container spacing={0}>

            <Grid item xs={userSelectContainerWidth}>

              <div className={classes.userSelectCard}>

                <Grid container spacing={0}>

                  <Grid item xs={8}>

                    <UserSelect action={this.userSelectHandler} options={availableUsers} user={selectedUserObj} />

                  </Grid>

                  <Grid item xs={2}>

                    <CreateButton action={this.props.createNewUser} />

                  </Grid>

                </Grid>

              </div>

            </Grid>

            {(mode === 'create') ? (
              <>

              <Grid item xs={userAdministrationContainerWidth}>

                <Card className={classes.userAdminCard}>

                  <CardHeader
                    titleTypographyProps={{color:"textSecondary"}}
                    title="Create User"
                  />

                  <CardContent>

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

                  </CardContent>
                </Card>

              </Grid>


              </> ) : (
                <>

                  <Grid item xs={userAdministrationContainerWidth}>

                    <Card className={classes.userAdminCard}>

                      <CardHeader
                        titleTypographyProps={{color:"textSecondary"}}
                        title="User Details"
                      />

                      <CardContent>

                        <Grid container>

                          <Grid item xs={6} sm={4} lg={2}>
                            <EditUsername action={this.props.updateUsername} username={selectedUsernameObj} />
                          </Grid>

                          <Grid item xs={6} sm={4} lg={2}>

                            {(mode === 'view' || mode === 'edit') ? (
                              <>

                                <ChangePassword action={this.props.changePassword} />

                              </> ) : ( <> <EditPassword action={this.props.updatePassword} error={passwordError} /> </> )}

                          </Grid>

                        </Grid>


                        <Grid container>

                          <Grid item xs={6} sm={4} lg={2}>
                            <EditFirstName action={this.props.updateFirstName} firstname={selectedFirstNameObj} error={firstNameError} />
                          </Grid>

                          <Grid item xs={6} sm={4} lg={2}>
                            <EditLastName action={this.props.updateLastName} lastname={selectedLastNameObj} error={lastNameError} />
                          </Grid>

                          <Grid item xs={12} sm={4} lg={2}>
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

                            </> ) : ( <>  </> )}

                        </Grid>

                      </CardContent>
                    </Card>

                    {(selectedUserId) ? (
                      <>
                      <Card className={classes.userAdminCard}>

                        <CardContent>

                          <Grid container>

                            <Grid item xs={12}>

                              <ViewHistoryContainer userId={selectedUserId} />

                            </Grid>

                          </Grid>

                        </CardContent>
                      </Card>


                      <Card className={classes.userAdminCard}>
                        <CardContent>

                          <Grid container>

                            <Grid item xs={12}>

                              <PostListContainer username={selectedUsername} category={"adjectives"} />

                            </Grid>

                          </Grid>

                        </CardContent>
                      </Card>
                      </>
                    ) : ( <> </> )}

                  </Grid>

                </> )}

          </Grid>

          </>
        ) : ( this.props.history.push("/login") )}

      </Grid>

    )

  }

}

Administration.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const AdministrationWrapped = withStyles(styles)(Administration);

export default withWidth()(AdministrationWrapped);
