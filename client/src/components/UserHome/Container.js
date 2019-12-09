import { connect } from 'react-redux';
import {compose} from "redux";
import { fetchPosts, fetchProfile } from '../../actions/posts';
import withAuth from '../../util/withAuth';
import UserHome from './Component';

export const mapStateToProps = state => ({
  posts: state.posts.items,
  isFetching: state.posts.isFetching
});

const mapDispatchToProps = { fetchPosts, fetchProfile };

const enhance = compose(
  withAuth,
  connect(mapStateToProps, mapDispatchToProps)
);

const UserHomeContainer = enhance(UserHome);

export default UserHomeContainer;
