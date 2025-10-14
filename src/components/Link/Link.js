/**
 * Link - Enhanced reusable link with animations and accessibility.
 * @param {Object} route - Route object with name and path
 * @version 1.1.0
 */
import React from "react";
import PropTypes from "prop-types";

const Link = ({ route }) => {
  return (
    <li className="mr-4 md:mr-12 hover:scale-110 transition-transform duration-200">
      <a
        href={route.path}
        className="text-base-content hover:text-primary transition-colors duration-300 font-medium"
        aria-label={`Navigate to ${route.name}`}
      >
        {route.name}
      </a>
    </li>
  );
};

Link.propTypes = {
  route: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Link;
