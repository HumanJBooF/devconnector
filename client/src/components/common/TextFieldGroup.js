import React from 'react'
import PropTypes from 'prop-types';

const TextFieldGroup = ({ type, error, placeholder, name, value, onChange, info, disabled }) => {
    return (
        <div>
            <div className="form-group">
                <input
                    type={type}
                    className={
                        error
                            ? "form-control form-control-lg is-invalid"
                            : "form-control form-control-lg"}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
                {info && <small className="form-text text-muted">{info}</small>}
                <div className="invalid-feedback">
                    {error}
                </div>
            </div>
        </div>
    )
}

TextFieldGroup.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string,
    disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;
