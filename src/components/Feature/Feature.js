/**
 * Feature - Iconic feature list item with bounce animation.
 * @param {string} feature - Feature text
 * @version 1.1.0
 */
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

const Feature = ({ feature }) => {
  return (
    <div className="flex items-center pt-3 animate-bounce-slow hover:animate-none">
      <CheckCircleIcon className="h-6 w-6 text-success mr-2 flex-shrink-0" />
      <p className="text-base-content">{feature}</p>
    </div>
  );
};

Feature.propTypes = {
  feature: PropTypes.string.isRequired,
};

export default Feature;
