import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaField from '../common/TextAreaField';
import InputGroup from '../common/InputGroup';
import SelectList from '../common/SelectList';
import info from '../common/info.profile';

class EditProfile extends React.Component {
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

    componentDidMount = () => this.props.getCurrentProfile();

    componentWillReceiveProps = nextProps => {
        if (nextProps.errors) this.setState({ errors: nextProps.errors });

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;
            const skillsCSV = profile.skills.join(',');
            const {
                company = '',
                website = '',
                location = '',
                github = '',
                bio = '',
                handle = '',
                status = '',
                social: { twitter = '', facebook = '', instagram = '', youtube = '', linkedin = '' } = {}
            } = profile;

            this.setState({
                handle, company, website, location, status, skills: skillsCSV,
                github, bio, twitter, facebook, linkedin, youtube, instagram
            })
        }

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault();
        const profileData = { ...this.state }
        this.props.createProfile(profileData, this.props.history)
    }


    render () {
        const { textField, inputField, options } = info;
        const { displaySocial, errors } = this.state;

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">
                                Edit Your Profile
                            </h1>
                            <small className="d-block pb-3">
                                <i className="fas fa-star fa-xs" /> = required fields
                            </small>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    name="handle"
                                    placeholder="* Profile Handle"
                                    value={this.state.handle}
                                    onChange={this.handleChange}
                                    error={errors.handle}
                                    info="Create a unique username/handle so you can be found by friends and other developers"
                                />
                                <SelectList
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.handleChange}
                                    error={errors.status}
                                    info="Job Title"
                                    options={options}
                                />
                                {textField.map(obj =>
                                    <TextFieldGroup
                                        key={obj.name}
                                        placeholder={obj.placeholder}
                                        name={obj.name}
                                        value={this.state[obj.name]}
                                        onChange={this.handleChange}
                                        info={obj.info}
                                        error={errors[obj.name]}
                                    />
                                )}
                                <TextAreaField
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />
                                <div className="mb-3">
                                    <button type="button"
                                        className="btn btn-light"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocial: !prevState.displaySocial
                                            }));
                                        }}>Add Social Network Links</button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {displaySocial &&
                                    <>
                                        {inputField.map(obj =>
                                            <InputGroup
                                                key={obj.name}
                                                placeholder={obj.placeholder}
                                                name={obj.name}
                                                icon={obj.icon}
                                                value={this.state[obj.name]}
                                                onChange={this.handleChange}
                                                error={errors[obj.name]}
                                            />
                                        )}
                                    </>
                                }
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile);