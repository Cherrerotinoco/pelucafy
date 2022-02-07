import React from "react";

import PropTypes from "prop-types";

const ErrorMsg = ({ children }) => {
  return (
    <>
      <span className="text-red-600  w-full text-center block mb-2">
        {children}
      </span>
    </>
  );
};

ErrorMsg.defaultProps = {
  children: PropTypes.any,
};
ErrorMsg.propTypes = {
  children: PropTypes.any,
};

export default ErrorMsg;
