import React from 'react';
import PropTypes from 'prop-types'
import API from '../../utils/api.controller';

class ProfileGithub extends React.Component {

    state = {
        repos: []
    }

    componentDidMount = () => {
        const { username } = this.props;
        API.getGithubRepos(username)
            .then(res => this.setState({ repos: res.data.data }))
            .catch(err => console.log(err))
    }

    render () {
        const { repos } = this.state;
        console.log(repos);

        return (
            <>
                <h3 className="mt-2 mb-4 text-center">My Latest Repos</h3>
                {repos.map(repo =>
                    <div key={repo.id} className="card card-body mb-2">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>
                                    <a href={repo.html_url}
                                        className="text-info"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {repo.name}
                                    </a>
                                </h4>
                                <p>{repo.description}</p>
                            </div>
                            <div className="col-md-6">
                                <span className="badge badge-danger mr-1">
                                    Language: {repo.language}
                                </span>
                                <span className="badge badge-info mr-1">
                                    Stars: {repo.stargazers_count}
                                </span>
                                <span className="badge badge-secondary mr-1">
                                    Watchers: {repo.watchers_count}
                                </span>
                                <span className="badge badge-success">
                                    Forks: {repo.forks_count}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
}

export default ProfileGithub;
