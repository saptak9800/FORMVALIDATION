import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, onBlur, id, ...inputProps } = props;

  const handleBlur = (e) => {
    setFocused(true);
    onBlur && onBlur(e);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleBlur}
        focused={focused.toString()}
      />
      {errorMessage && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default FormInput;
