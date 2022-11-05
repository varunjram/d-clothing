import React from "react";
import "./button.style.scss";

const Button_type_class = {
  google: "google-sign-in",
  inverted: "inverted",
};

export default function Button({children, buttonType, ...otherProps}) {
  return (
    <button className={`button-container ${Button_type_class[buttonType]}`} {...otherProps}>
      {children}
    </button>
  );
}
