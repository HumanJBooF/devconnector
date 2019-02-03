import React from 'react'
import PropTypes from 'prop-types';

const SelectList = ({ error, name, value, onChange, info, options }) => {
    return (
        <div>
            <div className="form-group">
                <select
                    className={
                        error
                            ? "form-control form-control-lg is-invalid"
                            : "form-control form-control-lg"}
                    name={name}
                    value={value}
                    onChange={onChange}>
                    {options.map(option =>
                        <option key={option.label} value={option.value}>
                            {option.label}
                        </option>
                    )}
                </select>
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

SelectList.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    info: PropTypes.string,
    options: PropTypes.array.isRequired
}

export default SelectList;