import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';


class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errors: {}
    }

    componentDidMount = () => {
        const { history, auth: { isAuthenticated } } = this.props;

        return isAuthenticated
            ? history.push('/dashboard')
            : null;
    }

    static getDerivedStateFromProps = nextProps => {
        return nextProps.errors
            ? { errors: nextProps.errors }
            : null;
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors });
        }

        const { history, auth: { isAuthenticated } } = this.props;

        if (isAuthenticated) {
            this.setState({ isAuthenticated: isAuthenticated });
            history.push('/dashboard');
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        const user = { email, password }
        this.props.loginUser(user)
    }

    render () {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Log In
                            </h1>
                            <p className="lead text-center">
                                Sign in to your DevConnector account
                            </p>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    error={errors.email}
                                />
                                <TextFieldGroup
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    error={errors.password}
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
