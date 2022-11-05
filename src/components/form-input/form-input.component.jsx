import React from "react";
import "./fotrm-input.styles.scss";

export default function FormInput({lable, ...otherProps}) {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />

      {lable && (
        <label className={`${otherProps.value.length ? "shrink" : ""} form-input-label`}>
          {lable}
        </label>
      )}
    </div>
  );
}
