import React from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';

class Profiles extends React.Component {

    componentDidMount = () => this.props.getProfiles();

    render () {
        const { profile: { profiles, loading } } = this.props;
        let profileItems;

        if (!profiles || loading) {
            profileItems = <Spinner />
        } else {
            (!Object.keys(profiles).length)
                ? profileItems = <h1>Profiles</h1>
                : profileItems = profiles.map(profile =>
                    <ProfileItem key={profile._id} profile={profile}
                    />)
        }
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
                            {profileItems}
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