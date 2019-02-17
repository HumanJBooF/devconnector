import React from 'react';
import { connect } from 'react-redux';
import { deleteEdu } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Spinner from '../common/Spinner';

class Education extends React.Component {

    onDeleteClick = id => this.props.deleteEdu(id);

    render () {
        const { education } = this.props;

        return (
            <div>
                <h4 className="mb-4">Education</h4>
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Studied</th>
                            <th>Dates</th>
                            <th>About</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {!education
                            ? <Spinner />
                            : education.map(edu =>
                                <tr key={edu._id}>
                                    <td>{edu.school}</td>
                                    <td>{edu.degree}</td>
                                    <td>{edu.studied}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
                                        {
                                            !edu.to
                                                ? 'Current'
                                                : <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                                        }
                                    </td>
                                    <td>{edu.description}</td>
                                    <td>
                                        <button onClick={() => this.onDeleteClick(edu._id)} className="btn btn-danger">
                                            Delete
                                    </button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEdu: PropTypes.func.isRequired
}

export default connect(null, { deleteEdu })(Education);