import React from 'react';
import isEmpty from '../../validation/is-empty';

const ProfileHeader = props => {

    const { profile: { user, status, company, location, website, social } } = props;
    const socialObj = [
        { link: website, icon: 'fas fa-globe fa-2x' },
        { link: social.twitter, icon: 'fab fa-twitter fa-2x' },
        { link: social.instagram, icon: 'fab fa-instagram fa-2x' },
        { link: social.linkedin, icon: 'fab fa-linkedin fa-2x' },
        { link: social.facebook, icon: 'fab fa-facebook fa-2x' },
        { link: social.youtube, icon: 'fab fa-youtube fa-2x' }
    ]
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-info text-white mb-3">
                    <div className="row">
                        <div className="col-3 col-md-3 m-auto">
                            <img
                                src={user.avatar}
                                alt="user avatar"
                                className="rounded-circle"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="display-4 text-center">
                            {user.name}
                        </h1>
                        <p className="lead text-center">
                            {`${status} `}
                            {isEmpty(company)
                                ? null
                                : <span>at {company}</span>
                            }
                        </p>
                        {isEmpty(location) ? null : <p>{location}</p>}
                        <p>
                            {socialObj.map((obj, i) =>
                                isEmpty(obj.link)
                                    ? null
                                    : <a
                                        key={i}
                                        className="text-white p-2"
                                        href={obj.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className={obj.icon} />
                                    </a>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader;
