import React from "react";

import PropTypes from "prop-types";

const Label = ({ htmlFor, children }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="form-label block text-blue-300 py-2 font-bold mb-2"
      >
        {children}
      </label>
    </>
  );
};

Label.defaultProps = {
  children: PropTypes.any,
  htmlFor: "",
};
Label.propTypes = {
  children: PropTypes.any,
  htmlFor: PropTypes.string,
};

export default Label;
