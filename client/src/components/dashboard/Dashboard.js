import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import ProfileActions from './ProfileActions';
import Spinner from '../common/Spinner';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends React.Component {

    componentDidMount = () => this.props.getCurrentProfile();

    onDelete = () => this.props.deleteAccount();

    createProfile = user => {
        return (
            <>
                <p className="lead text-muted">
                    Welcome {user.name}
                </p>
                <p>You have not yet create a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-lg btn-info">
                    Create Profile
                </Link>
            </>
        )
    }

    displayProfile = (user, profile) => {
        return (
            <>
                <p className="lead text-muted">
                    Welcome <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
                </p>
                <ProfileActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div style={{ marginBottom: '60px' }} />
                <button className="btn btn-danger" onClick={this.onDelete}>
                    Delete My Account
                </button>
            </>
        )
    }

    render () {
        const {
            profile: { profile, loading },
            auth: { user }
        } = this.props;
        console.log(profile)
        let content;
        if (!profile || loading) {
            content = <Spinner />
        } else {
            (!Object.keys(profile).length)
                ? content = this.createProfile(user)
                : content = this.displayProfile(user, profile)
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
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
