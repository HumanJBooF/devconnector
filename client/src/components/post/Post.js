import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import Spinner from '../common/Spinner';
import Comments from './CommentsForm';
import CommentFeed from './CommentFeed';


class Post extends React.Component {

    componentDidMount = () => this.props.getPost(this.props.match.params.id);

    render () {
        const { post: { post, loading } } = this.props;
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">
                                Back to Feed
                            </Link>
                            {!post || loading
                                ? <Spinner />
                                : (
                                    <>
                                        <PostItem post={post} showActions={false} />
                                        <Comments postId={post._id} />
                                        <CommentFeed postId={post._id} comments={post.comments} />
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})


export default connect(mapStateToProps, { getPost })(Post)
