import React from 'react';
import Moment from 'react-moment';

const ProfileCreds = props => {
    const { education, experience } = props;

    const expItems = experience.map(exp =>
        <li key={exp._id} className="list-group-item">
            <h4>{exp.company}</h4>
            <p>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
                {!exp.to
                    ? 'Current'
                    : <Moment format="YYYY/MM/DD">${exp.to}</Moment>
                }
            </p>
            <p>
                <strong>Postion: </strong>{exp.title}
            </p>
            <p>
                {!exp.location
                    ? null
                    : <span><strong>Location: </strong>{exp.location}</span>
                }
            </p>
            <p>
                {!exp.description
                    ? null
                    : <span><strong>Description: </strong>{exp.description}</span>
                }
            </p>
        </li>
    );

    const eduItems = education.map(edu =>
        <li key={edu._id} className="list-group-item">
            <h4>{edu.school}</h4>
            <p>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
                {!edu.to
                    ? 'Current'
                    : <Moment format="YYYY/MM/DD">${edu.to}</Moment>
                }
            </p>
            <p>
                <strong>Degree:</strong> {edu.degree}
            </p>
            <p>
                <strong>Field Of Study:</strong> {edu.studied}
            </p>
            <p>
                {!edu.description
                    ? null
                    : <span><strong>Description: </strong>{edu.description}</span>
                }
            </p>
        </li>
    )
    return (
        <div className="row">
            <div className="col-md-6">
                <h3 className="text-center text-info">Experience</h3>
                {!expItems.length
                    ? <p className="text-center">No Experience Listed</p>
                    : <ul className="list-group">{expItems}</ul>
                }
            </div>
            <div className="col-md-6">
                <h3 className="text-center text-info">Education</h3>
                {!eduItems.length
                    ? <p className="text-center">No Education Listed</p>
                    : <ul className="list-group">{eduItems}</ul>
                }
            </div>
        </div>
    )

}

export default ProfileCreds;
