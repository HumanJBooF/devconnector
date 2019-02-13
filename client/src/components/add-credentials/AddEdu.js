import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEdu, getCurrentProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaField from '../common/TextAreaField';


class AddEdu extends React.Component {

    state = {
        school: '',
        degree: '',
        studied: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    }

    componentDidMount = () => this.props.getCurrentProfile();

    componentWillReceiveProps = nextProps => {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const eduData = { ...this.state };
        // Remove errors from object
        delete eduData.errors;
        this.props.addEdu(eduData, this.props.history)
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onCheck = event => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }

    render () {
        const { errors } = this.state;
        const { profile: { profile: { handle } } } = this.props;
        const info = [
            { placeholder: '* School', name: 'school' },
            { placeholder: '* Degree or Certification', name: 'degree' },
            { placeholder: '* Field of Study', name: 'studied' }
        ];

        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go to the dashboard
                            </Link>
                            <Link to={`/profile/${handle}`} className="btn btn-light float-right">
                                Go to your profile
                            </Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">
                                Add any school, bootcamp, classes, etc you may have taken
                            </p>
                            <small className="d-block pb-3">
                                <i className="fas fa-star fa-xs" /> = required fields
                            </small>
                            <form onSubmit={this.handleSubmit}>
                                {info.map(obj =>
                                    <TextFieldGroup
                                        key={obj.name}
                                        name={obj.name}
                                        placeholder={obj.placeholder}
                                        value={this.state[obj.name]}
                                        onChange={this.handleChange}
                                        error={errors[obj.name]}
                                    />
                                )}
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.handleChange}
                                    error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.handleChange}
                                    error={errors.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current School/Program
                                    </label>
                                </div>
                                <TextAreaField
                                    placeholder="Program Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    error={errors.description}
                                    info="Tell us about the the program you attended"
                                />
                                <input
                                    type="submit"
                                    value="submit"
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

AddEdu.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    AddEdu: PropTypes.func
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addEdu, getCurrentProfile })(AddEdu);