import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import TextAreaField from '../common/TextAreaField';

class PostForm extends React.Component {
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
        const newPost = { text };
        this.props.addPost(newPost);
        if (this.state.text.length > 10) this.setState({ text: '' })
    }

    render () {
        const { errors } = this.state;
        return (
            <div>
                <div className="post-form mb-3">
                    <div className="card card-info">
                        <div className="card-header bg-dark text-white">
                            Write a post...
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <TextAreaField
                                        placeholder="Create a post"
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

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors,
})

export default connect(mapStateToProps, { addPost })(PostForm);
