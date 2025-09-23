import React from 'react';
import PostTable from './PostTable';
import PostListItem from './Item';
import LoadingIndicatorBox from '../shared/LoadingIndicator/Box';
import Empty from '../shared/Empty';

class PostList extends React.Component {
  loadPosts = () => {
    const { username, category, startDate, endDate } = this.props;
    console.log("username: ", username);
    if (username && startDate && endDate && category === "all") return this.props.fetchPostsByDate(username, startDate, endDate);
    if (username && category) return this.props.fetchProfile(username, category);
    return this.props.fetchPosts(category);
  };

  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.category !== prevProps.category ||
      this.props.username !== prevProps.username ||
      this.props.startDate !== prevProps.startDate ||
      this.props.endDate !== prevProps.endDate
    )
      this.loadPosts();
  }

  mapPosts = () =>
    this.props.posts.map((post, index) => (
      <PostListItem key={index} {...post} />
    ));

  displayWords() {

    return <PostTable posts={this.props.posts} />;

  }

  render() {
    if (this.props.isFetching) return <LoadingIndicatorBox />;
    if (!this.props.posts || this.props.posts.length === 0) return <Empty />;
    return this.displayWords();
  }
}

export default PostList;
