import React from "react";

import "./CustomButton.scss";
export function CustomButton({
  children,
  isGoogleSignIn,
  isInvalid,
  inverted,
  ...otherProps
}) {
  return (
    <button
      className={`${inverted ? "inverted" : ""} ${
        isGoogleSignIn ? "googleSignIn" : ""
      } custom-button`}
      {...otherProps}
      disabled={isInvalid}
    >
      {children}
    </button>
  );
}
