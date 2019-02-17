import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import Spinner from '../common/Spinner';
import PostForm from './PostForm';
import PostFeed from './PostFeed';

class Posts extends React.Component {

    componentDidMount = () => this.props.getPosts();

    render () {

        const { post: { posts, loading } } = this.props;
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                            {posts === null || loading
                                ? <Spinner />
                                : <PostFeed posts={posts} />
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);