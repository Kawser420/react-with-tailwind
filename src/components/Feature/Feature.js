/**
 * Feature - Advanced feature list item with dynamic icons, progress indicators,
 * tooltips (vanilla JS), and multi-state animations (CSS3 transitions/transforms).
 * Supports PropTypes for type safety and accessibility.
 * @param {Object} props - Component props
 * @param {string} props.feature - Feature description text
 * @param {string} [props.iconType='check'] - Icon variant (check, star, rocket)
 * @param {number} [props.progress=100] - Optional progress percentage (0-100)
 * @version 2.1.0
 * @author ReactTailwind Pro Team
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  CheckCircleIcon,
  StarIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";

const iconMap = {
  check: CheckCircleIcon,
  star: StarIcon,
  rocket: RocketLaunchIcon,
};

const Feature = ({ feature, iconType = "check", progress = 100 }) => {
  const IconComponent = iconMap[iconType] || CheckCircleIcon;

  useEffect(() => {
    // Vanilla JS tooltip setup
    const element = document.querySelector(
      `[data-feature-tooltip="${feature}"]`
    );
    if (element) {
      element.addEventListener("mouseenter", (e) => {
        const tooltip = document.createElement("div");
        tooltip.className =
          "tooltip absolute bg-base-900 text-white px-2 py-1 rounded text-xs z-50 shadow-lg";
        tooltip.textContent = `Details: ${feature}`;
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY - 10}px`;
        document.body.appendChild(tooltip);
      });
      element.addEventListener("mouseleave", () => {
        const tooltip = document.querySelector(".tooltip");
        if (tooltip) tooltip.remove();
      });
      return () => {
        element.removeEventListener("mouseenter", () => {});
        element.removeEventListener("mouseleave", () => {});
      };
    }
  }, [feature]);

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center pt-3 group relative overflow-hidden rounded-lg bg-base-100/50 p-3 mb-2 transition-all duration-500 ease-out-cubic hover:bg-primary/10 will-change-transform"
      data-feature-tooltip={feature}
    >
      <IconComponent className="h-6 w-6 text-success mr-3 flex-shrink-0 transition-colors duration-300 group-hover:text-primary" />
      <div className="flex-1">
        <p className="text-base-content font-medium group-hover:text-primary transition-colors">
          {feature}
        </p>
        {progress < 100 && (
          <div className="w-full bg-base-200 rounded-full h-1 mt-1">
            <motion.div
              className="bg-success h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

Feature.propTypes = {
  feature: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf(["check", "star", "rocket"]),
  progress: PropTypes.number,
};

Feature.defaultProps = {
  iconType: "check",
  progress: 100,
};

export default React.memo(Feature);
