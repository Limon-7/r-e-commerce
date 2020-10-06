import React from "react";
import "./Spinner.scss";
function Spinner(WrappedComponent) {
  const spinner = ({ loading, ...otherProps }) => {
    return loading ? (
      <div className="spinner">
        <div className="spinner-container"></div>
      </div>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return spinner;
}

export default Spinner;
