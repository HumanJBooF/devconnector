import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

const ProfileItem = props => {

    const { profile: { user, status, company, location, handle, skills } } = props;

    return (
        <div className="card card-body bd-light mb-3">
            <div className="row">
                <div className="col-2">
                    <img src={user.avatar} alt="" className="rounded-circle" />
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <h3>{user.name}</h3>
                    <p>
                        {status} {isEmpty(company ? null : (<span>at {company}</span>))}
                    </p>
                    <p>
                        {isEmpty(location ? null : (<span>{location}</span>))}
                    </p>
                    <Link to={`/profile/${handle}`} className="btn btn-info">
                        View Profile
                    </Link>
                </div>
                <div className="col-md-4 d-none d-md-block">
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                        {skills.slice(0, 4).map((skill, i) =>
                            <li key={i} className="list-group-item">
                                <i className="fa fa-check pr-1" />
                                {skill}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}


ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;

