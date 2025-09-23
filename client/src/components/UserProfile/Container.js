import { connect } from 'react-redux';

import UserProfile from './Component.js';

import {compose} from "redux";
import withAuth from "../../util/withAuth";

const mapStateToProps = state => ({

});

const mapDispatchToProps = { };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const UserProfileContainer = enhance(UserProfile);

export default UserProfileContainer;
