import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaField from '../common/TextAreaField';
import InputGroup from '../common/InputGroup';
import SelectList from '../common/SelectList';

class CreateProfile extends React.Component {
    state = {
        displaySocial: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        bio: '',
        github: '',
        status: '',
        skills: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
        errors: {}
    }

    render () {
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Create Your Profile
                            </h1>
                            <p className="lead text-center">
                                Share your information with out like minded developers.
                            </p>
                            <small className="d-block pb-3">
                                <i class="fas fa-star fa-2x" /> = required fields
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);