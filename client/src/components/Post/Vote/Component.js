import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components/macro';
import PostVoteUpvote from './Upvote';
import PostVoteDownvote from './Downvote';
// import { makeStyles } from '@material-ui/core/styles';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  padding: 4px;
  font-size: 12px;
  line-height: 25px;
  font-weight: 500;
  text-align: center;
  color: ${props => props.theme.normalText};
`;

/*
const styles = makeStyles(theme => ({
  votingCell: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '30px',
  },
}));
*/

class PostVote extends React.Component {
  constructor(props) {
    super(props);
    const didVote = PostVote.existingVote(props);
    this.state = {
      score: props.score,
      didVote,
      didUpvote: didVote === 1,
      didDownvote: didVote === -1
    };
  }

  static existingVote({ user, author, votes }) {
    const existingVote =
      author && votes && votes.find(vote => vote.user === author.id);
    return existingVote ? existingVote.vote : 0;
  }

  UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.score !== nextProps.score) {
      const didVote = PostVote.existingVote(nextProps);
      this.setState({
        score: nextProps.score,
        didVote,
        didUpvote: didVote === 1,
        didDownvote: didVote === -1
      });
    } else if (this.props.token !== nextProps.token && !nextProps.token) {
      this.setState({
        didVote: false,
        didUpvote: false,
        didDownvote: false
      });
    }
  }

  castVote(vote) {
    const { attemptVote, id, token } = this.props;
    if (token) {
      attemptVote(id, vote);
      this.setState({
        score: this.state.score + vote - this.state.didVote,
        didVote: vote,
        didUpvote: vote === 1,
        didDownvote: vote === -1
      });
    }
  }

  upvote = () => this.castVote(this.state.didUpvote ? 0 : 1);

  downvote = () => this.castVote(this.state.didDownvote ? 0 : -1);

  render() {

    return (
      <TableCell align="center">
        <Wrapper>
          <PostVoteUpvote
            canVote={!!this.props.token}
            didVote={this.state.didUpvote}
            onClick={this.upvote}
          />
          <PostVoteDownvote
            canVote={!!this.props.token}
            didVote={this.state.didDownvote}
            onClick={this.downvote}
          />
        </Wrapper>
      </TableCell>
    );
  }
}

export default PostVote;
