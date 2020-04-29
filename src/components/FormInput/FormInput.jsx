import React from 'react';
import './formInput.css';

const FormInput = ({ handleChange, label, isInvalid, type, ...otherProps }) => {
    return (
        <div className="group">
            <input
                className={`form-input ${
                    otherProps.value.length && type === 'password'
                        ? isInvalid
                            ? 'inValid'
                            : 'valid'
                        : ''
                }`}
                type={type}
                onChange={handleChange}
                {...otherProps}
            ></input>
            {label ? (
                <label
                    className={`form-input-label ${
                        otherProps.value.length ? 'shrink' : ''
                    } form-input-label`}
                >
                    {label}
                </label>
            ) : null}
        </div>
    );
};

export default FormInput;
