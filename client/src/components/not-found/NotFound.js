import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

    return <>
        <div className="jumbotron not-found">
            <div className="container-fluid">
                <Link to='/dashboard'
                    className="btn btn-lg btn-dark">
                    Go to dashboard
                </Link>
            </div>
        </div>
    </>
}

export default NotFound;