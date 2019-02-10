import React from 'react';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';

const ProfileAbout = props => {

    const { profile: { user, skills, bio } } = props;
    const firstName = user.name.trim().split(' ')[0];
    const skillsList = skills.map((skill, i) =>
        <div key={i} className="p-3">
            <i className="fa fa-check" /> {skill}
        </div>
    );

    return (
        <div className="row mb-3">
            <div className="col-md-12">
                <div className="card text-center border-dark">
                    <h3 className="card-header text-info">
                        {firstName}
                    </h3>
                    <div className="card card-body bg-light">
                        <p className="lead">
                            {isEmpty(bio)
                                ? <span>{firstName} has no bio at the moment.</span>
                                : <span>{bio}</span>
                            }
                        </p>
                        <h3 className="text-info">Skill Set</h3>
                        <div className="row">
                            <div className="d-flex flex-wrap justify-content-center align-items-center">
                                {skillsList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout;
