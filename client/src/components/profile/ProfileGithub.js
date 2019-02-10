import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import API from '../../utils/api.controller';

class ProfileGithub extends React.Component {

    state = {
        repos: []
    }

    componentDidMount = () => {
        const { username } = this.props;
        API.getGithubRepos(username)
            .then(res => this.setState({ repos: res.data }))
            .catch(err => console.log(err))
    }

    render () {
        const { repos } = this.state;

        return (
            <div>

            </div>
        )
    }
}

export default ProfileGithub;
