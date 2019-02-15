import React from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';

class Profiles extends React.Component {

    componentDidMount = () => this.props.getProfiles();

    noProfiles = () => {
        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <h4 className="mt-5 mb-3">Be the first to create a profile!</h4>
                    <Link to="/register" className="btn btn-lg btn-info mr-2">
                        Sign Up
                                </Link>
                    <Link to="/login" className="btn btn-lg btn-light">
                        Login
                        </Link>
                </div>
            </div>
        )
    }

    render () {
        const { profile: { profiles, loading } } = this.props;

        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">
                                Developer Profiles
                            </h1>
                            <p className="lead text-center">
                                Browse and connect with other developers!
                            </p>
                            {!profiles || loading
                                ? <Spinner />
                                : (profiles === null)
                                    ? this.noProfiles()
                                    : profiles.map(profile =>
                                        <ProfileItem
                                            key={profile._id}
                                            profile={profile}
                                        />
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);