import React from "react";
import PropTypes from "prop-types";

function ScreenLayout({ leftPanel, rightPanel }) {
  return (
    <div className="flex mb-4">
      <div className="flex-auto w-3/4">{leftPanel}</div>
      <div className="flex-auto w-1/4">{rightPanel}</div>
    </div>
  );
}

ScreenLayout.propTypes = {
  leftPanel: PropTypes.node.isRequired,
  rightPanel: PropTypes.node.isRequired,
};

export default ScreenLayout;
