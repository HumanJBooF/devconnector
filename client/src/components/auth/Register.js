import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/textFieldGroup';

class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    }

    componentDidMount = () => {
        const { history, auth: { isAuthenticated } } = this.props;

        return isAuthenticated
            ? history.push('/dashboard')
            : null;
    }

    static getDerivedStateFromProps = (nextProps, prevProps) => {
        return nextProps.errors !== prevProps.errors
            ? { errors: nextProps.errors }
            : null;
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.errors !== prevState.errors) {
            this.setState({ errors: prevProps.errors });
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { name, email, password, password2 } = this.state;
        const { registerUser, history } = this.props;
        const newUser = { name, email, password, password2 };

        registerUser(newUser, history);
    }

    render () {
        const { errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Sign Up
                            </h1>
                            <p className="lead text-center">
                                Create your DevConnector account
                            </p>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    error={errors.name}
                                />
                                <TextFieldGroup
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    error={errors.email}
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                />
                                <TextFieldGroup
                                    type="password"
                                    name="password"
                                    placeholder="Enter a password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    error={errors.password}
                                />
                                <TextFieldGroup
                                    type="password2"
                                    name="password2"
                                    placeholder="Confirm Password"
                                    value={this.state.password2}
                                    onChange={this.handleChange}
                                    error={errors.password2}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(Register);
