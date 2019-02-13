import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import { Link } from 'react-router-dom';


class PostItem extends React.Component {

    onDelete = id => this.props.deletePost(id);

    handleLike = id => this.props.addLike(id);

    handleUnlike = id => this.props.removeLike(id);

    findLike = likes => {
        const { auth: { user } } = this.props;
        const check = likes.filter(like => like.user === user.id);
        return !check.length ? false : true;
    }

    render () {
        const { post, auth: { user }, showActions } = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <img className="rounded-circle d-none d-md-block"
                            src={post.avatar}
                            alt="avatar"
                        />
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">
                            {post.text}
                        </p>
                        {showActions
                            ? (<span>
                                <button onClick={() => this.handleLike(post._id)} type="button" className="btn btn-light mr-1">
                                    <i className={this.findLike(post.likes)
                                        ? "text-info fas fa-thumbs-up"
                                        : "fas fa-thumbs-up"
                                    }>
                                    </i>
                                    <span className="badge badge-light">{post.likes.length}</span>
                                </button>
                                <button onClick={() => this.handleUnlike(post._id)} type="button" className="btn btn-light mr-1">
                                    <i className="text-secondary fas fa-thumbs-down"></i>
                                </button>
                                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                                    Comments
                                </Link>
                                {post.user === user.id
                                    ? <button type="button" onClick={() => this.onDelete(post._id)} className="btn btn-danger mr-1">
                                        <i className="fas fa-times" />
                                    </button>
                                    : null
                                }
                            </span>)
                            : null
                        }
                    </div>
                </div>
            </div >


        )
    }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
}

PostItem.defaultProps = {
    showActions: true
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);