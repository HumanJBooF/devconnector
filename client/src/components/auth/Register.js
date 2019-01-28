import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

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
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={
                                            errors.name
                                                ? "form-control form-control-lg is-invalid"
                                                : "form-control form-control-lg"}
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={
                                            errors.email
                                                ? "form-control form-control-lg is-invalid"
                                                : "form-control form-control-lg"}
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                    <small className="form-text text-muted">
                                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                                    </small>
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={
                                            errors.password
                                                ? "form-control form-control-lg is-invalid"
                                                : "form-control form-control-lg"}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={
                                            errors.password2
                                                ? "form-control form-control-lg is-invalid"
                                                : "form-control form-control-lg"}
                                        placeholder="Confirm Password"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.password2}
                                    </div>
                                </div>
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
