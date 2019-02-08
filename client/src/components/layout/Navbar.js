import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearProfile } from '../../actions/profileActions';

class Navbar extends React.Component {

    onLogoutClick = event => {
        event.preventDefault();
        this.props.clearProfile();
        this.props.logoutUser();
    }

    render () {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-items">
                    <Link className="nav-link" to='/dashboard'>
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <div onClick={this.onLogoutClick} className="nav-link">
                        <img src={user.avatar} alt={user.name} className="border rounded-circle"
                            title="You must have a Gravatar connect to you email to display an image"
                            style={{ width: '25px', marginRight: '7.5px' }}
                        />
                        Logout
                    </div>
                </li>
            </ul>
        )

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-items">
                    <Link className="nav-link" to='/register'>
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/login'>
                        Login
                </Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        DevConnector
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/profiles" className="nav-link">
                                    Developers
                                </Link>
                            </li>
                        </ul>
                        {!isAuthenticated ? guestLinks : authLinks}

                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearProfile })(Navbar);
