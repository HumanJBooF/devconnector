import React from 'react';
import spinner from '../../img/loading.gif';

const Spinner = () => {
    return (
        <>
            <img
                src={spinner}
                alt="loading"
                style={{ width: '350px', margin: 'auto', display: 'block' }}
            />
        </>
    )
}

export default Spinner;