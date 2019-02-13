import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaField from '../common/TextAreaField';
import { addExp, getCurrentProfile } from '../../actions/profileActions';


class AddExp extends React.Component {

    state = {
        company: '',
        title: '',
        location: '',
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
        const expData = { ...this.state };
        delete expData.errors;
        this.props.addExp(expData, this.props.history)
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
            { placeholder: '* Company', name: 'company' },
            { placeholder: '* Job Title', name: 'title' },
            { placeholder: 'Location', name: 'location' }
        ]

        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go to the dashboard
                            </Link>
                            <Link to={`/profile/${handle}`} className="btn btn-light float-right">
                                Go to your profile
                            </Link>

                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">
                                Add any job or postion that you have had or currently have.
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
                                        Current Job
                                    </label>
                                </div>
                                <TextAreaField
                                    placeholder="Job Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    error={errors.description}
                                    info="Tell us about the the position"
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

AddExp.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExp: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addExp, getCurrentProfile })(AddExp);