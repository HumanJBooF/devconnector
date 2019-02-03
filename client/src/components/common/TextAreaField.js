import React from 'react'
import PropTypes from 'prop-types';

const TextAreaField = ({ error, placeholder, name, value, onChange, info }) => {
    return (
        <div>
            <div className="form-group">
                <textarea
                    className={
                        error
                            ? "form-control form-control-lg is-invalid"
                            : "form-control form-control-lg"}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {info && <small className="form-text text-muted">
                    {info}
                </small>}
                <div className="invalid-feedback">
                    {error}
                </div>
            </div>
        </div>
    )
}

TextAreaField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string
}

export default TextAreaField;