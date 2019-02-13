import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';
import TextAreaField from '../common/TextAreaField';

class CommentsForm extends React.Component {
    state = {
        text: '',
        errors: {}
    }

    static getDerivedStateFromProps = nextProps => {
        return nextProps.errors
            ? { errors: nextProps.errors }
            : null;
    }

    componentDidUpdate = prevProps => {
        if (prevProps.errors !== this.props.errors) this.setState({ errors: this.props.errors });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        const { text } = this.state;
        const { postId } = this.props;
        const newComment = { text };
        this.props.addComment(postId, newComment);
        if (this.state.text.length > 10) this.setState({ text: '' })
    }

    render () {
        const { errors } = this.state;
        return (
            <div>
                <div className="post-form mb-3">
                    <div className="card card-info">
                        <div className="card-header bg-dark text-white">
                            Write a comment...
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <TextAreaField
                                        placeholder="Reply to post"
                                        name="text"
                                        value={this.state.text}
                                        onChange={this.handleChange}
                                        error={errors.text}
                                    />
                                </div>
                                <button className="btn btn-dark">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CommentsForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addComment })(CommentsForm);