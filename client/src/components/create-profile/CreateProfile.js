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
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault();

    }


    render () {

        const { displaySocial, 
                errors: { handle, status, company, website, skills, github, 
                    bio, location, twitter, facebook, linkedin, youtube, instagram } } = this.state;

        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];

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
                                <i className="fas fa-star fa-xs" /> = required fields
                            </small>
                            <form action={this.handleSubmit}>
                                <TextFieldGroup
                                    name="handle"
                                    placeholder="* Profile Handle"
                                    value={this.state.handle}
                                    onChange={this.handleChange}
                                    error={handle}
                                    info="Create a unique username/handle so you can be found by friends and other developers"
                                />
                                <SelectList
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.handleChange}
                                    error={status}
                                    info="Job Title"
                                    options={options}
                                />
  <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={github}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaField
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                <button type="button" 
                        className="btn btn-light" 
                        onClick={() => {
                            this.setState(prevState => ({
                                displaySocial: !prevState.displaySocial
                            }));
                }}>Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
                    </div>
                    {displaySocial && 
                                    <div>
                                        <InputGroup
                                            placeholder="Twitter Profile URL"
                                            name="twitter"
                                            icon="fab fa-twitter"
                                            value={this.state.twitter}
                                            onChange={this.handleChange}
                                            error={twitter}
                                        />

                                        <InputGroup
                                            placeholder="Facebook Page URL"
                                            name="facebook"
                                            icon="fab fa-facebook"
                                            value={this.state.facebook}
                                            onChange={this.handleChange}
                                            error={facebook}
                                        />

                                        <InputGroup
                                            placeholder="Linkedin Profile URL"
                                            name="linkedin"
                                            icon="fab fa-linkedin"
                                            value={this.state.linkedin}
                                            onChange={this.handleChange}
                                            error={linkedin}
                                        />

                                        <InputGroup
                                            placeholder="YouTube Channel URL"
                                            name="youtube"
                                            icon="fab fa-youtube"
                                            value={this.state.youtube}
                                            onChange={this.handleChange}
                                            error={youtube}
                                        />

                                        <InputGroup
                                            placeholder="Instagram Page URL"
                                            name="instagram"
                                            icon="fab fa-instagram"
                                            value={this.state.instagram}
                                            onChange={this.handleChange}
                                            error={instagram}
                                        />
                                    </div>
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

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);