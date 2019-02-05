import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaField from '../common/TextAreaField';
import InputGroup from '../common/InputGroup';
import SelectList from '../common/SelectList';
import info from './info';

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
        const { textField, inputField } = info;
        const { displaySocial, errors } = this.state;

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

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);