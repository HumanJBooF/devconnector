import React from 'react'
import PropTypes from 'prop-types';

const InputGroup = ({ error, placeholder, name, value, onChange, icon, type }) => {
    return (
        <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className={icon} />
                    </div>
                </div>
                <input
                    className={
                        error
                            ? "form-control form-control-lg is-invalid"
                            : "form-control form-control-lg"}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                <div className="invalid-feedback">
                    {error}
                </div>
            </div>
        </div>
    )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired
}

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;