import React from 'react';
import PropTypes from 'prop-types';
import s from './InputField.module.css';

const InputField = ({children, ...other}) => {
  const {label, value, onChange, type, name, pattern, title, required = false} = other;
  return (
    <p className={s.fieldWrapper}>
      <label className={s.field}>
        <span className={s.label}>{label}</span>
        <input
          className={s.input}
          value={value}
          onChange={onChange}
          type={type}
          name={name}
          pattern={pattern}
          title={title}
          required={required}
        />
        {children}
      </label>
    </p>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.bool,
};

export default InputField;
