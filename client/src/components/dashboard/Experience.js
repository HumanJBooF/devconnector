import React from 'react';
import { connect } from 'react-redux';
import { deleteExp } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class Experience extends React.Component {

    onDeleteClick = id => this.props.deleteExp(id);

    render () {
        const { experience } = this.props;

        return (
            <div>
                <h4 className="mb-4">Experience</h4>
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Dates</th>
                            <th>About</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {experience.map(exp =>
                            <tr key={exp._id}>
                                <td>{exp.company}</td>
                                <td>{exp.title}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
                                    {
                                        !exp.to
                                            ? 'Current'
                                            : <Moment format="YYYY/MM/DD">${exp.to}</Moment>
                                    }
                                </td>
                                <td>{exp.description}</td>
                                <td>
                                    <button onClick={() => this.onDeleteClick(exp._id)} className="btn btn-danger">
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

Experience.propTypes = {
    deleteExp: PropTypes.func.isRequired
}

export default connect(null, { deleteExp })(Experience);