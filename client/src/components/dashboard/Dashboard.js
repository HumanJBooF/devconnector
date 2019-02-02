import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends React.Component {
    componentDidMount = () => {
        this.props.getCurrentProfile();
    }

    setUpProfile = user => {
        return (
            <div>
                <p className="lead text-muted">
                    Welcome {user.name}
                </p>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-lg btn-info">
                    Create Profile
            </Link>
            </div>
        )
    }

    render () {
        const {
            profile: { profile, loading },
            auth: { user }
        } = this.props;

        let content;
        if (!profile || loading) {
            content = <Spinner />
        } else {
            (!Object.keys(profile).length)
                ? content = this.setUpProfile(user)
                : content = <h4>Display Profile</h4>
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">
                                Dashboard
                            </h1>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
