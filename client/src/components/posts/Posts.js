import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../../img/loading.gif';

class Posts extends React.Component {
    render () {
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect()(Posts);