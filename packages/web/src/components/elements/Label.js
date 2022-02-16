import React from "react";
import PropTypes from "prop-types";

/**
 * This component set styles for labels
 * @param {*} params {htmlFor={form name}, children{any}}
 * @returns JSC tailwind styled label component
 */
const Label = ({ htmlFor, children }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="form-label block text-blue-300 py-2 font-bold "
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
