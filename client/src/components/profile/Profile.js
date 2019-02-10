import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';

class Profile extends React.Component {

    componentDidMount = () => {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    }

    render () {
        const { profile: { profile, loading } } = this.props;
        let profileContent;
        if (!profile || loading) {
            profileContent = <Spinner />
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back To Profiles
              </Link>
                        </div>
                        <div className="col-md-6" />
                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds
                        education={profile.education}
                        experience={profile.experience}
                    />
                    {profile.github
                        ? <ProfileGithub username={profile.github} />
                        : <h2 className="text-center">Add you Github username to your profile to see your repos</h2>
                    }
                </div>
            );
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);