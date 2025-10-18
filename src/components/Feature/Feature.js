/**
 * Feature - Advanced feature list item with dynamic icons, progress indicators,
 * tooltips (vanilla JS with mouse tracking), and multi-state animations (CSS3 transitions/transforms).
 * Supports PropTypes for type safety and accessibility. Expanded with more icon types.
 * @param {Object} props - Component props
 * @param {string} props.feature - Feature description text
 * @param {string} [props.iconType='check'] - Icon variant (check, star, rocket, heart)
 * @param {number} [props.progress=100] - Optional progress percentage (0-100)
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  CheckCircleIcon,
  StarIcon,
  RocketLaunchIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

const iconMap = {
  check: CheckCircleIcon,
  star: StarIcon,
  rocket: RocketLaunchIcon,
  heart: HeartIcon, // Expanded
};

const Feature = ({ feature, iconType = "check", progress = 100 }) => {
  const IconComponent = iconMap[iconType] || CheckCircleIcon;

  useEffect(() => {
    // Vanilla JS tooltip setup with mouse tracking - Expanded for dynamic position
    const element = document.querySelector(`[data-feature-tooltip="${feature.replace(/\s/g, "-")}"]`);
    let tooltip = null;
    if (element) {
      const createTooltip = (e) => {
        tooltip = document.createElement("div");
        tooltip.className =
          "tooltip fixed bg-base-900 text-white px-3 py-1.5 rounded-lg text-sm z-50 shadow-xl transition-opacity duration-200 opacity-0";
        tooltip.textContent = `Feature Details: ${feature} (Progress: ${progress}%)`;
        document.body.appendChild(tooltip);
        updateTooltipPosition(e);
        setTimeout(() => (tooltip.style.opacity = 1), 50);
      };

      const updateTooltipPosition = (e) => {
        if (tooltip) {
          tooltip.style.left = `${e.clientX + 15}px`;
          tooltip.style.top = `${e.clientY - 15}px`;
        }
      };

      const removeTooltip = () => {
        if (tooltip) {
          tooltip.style.opacity = 0;
          setTimeout(() => tooltip.remove(), 200);
        }
      };

      element.addEventListener("mouseenter", createTooltip);
      element.addEventListener("mousemove", updateTooltipPosition);
      element.addEventListener("mouseleave", removeTooltip);
      return () => {
        element.removeEventListener("mouseenter", createTooltip);
        element.removeEventListener("mousemove", updateTooltipPosition);
        element.removeEventListener("mouseleave", removeTooltip);
      };
    }
  }, [feature, progress]);

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center pt-3 group relative overflow-hidden rounded-lg bg-base-100/50 p-3 mb-3 transition-all duration-500 ease-out-cubic hover:bg-primary/10 will-change-transform hover-scale"
      data-feature-tooltip={feature.replace(/\s/g, "-")}
      role="listitem"
      aria-label={`Feature: ${feature}`}
    >
      <IconComponent className="h-6 w-6 text-success mr-3 flex-shrink-0 transition-colors duration-300 group-hover:text-primary animate-bounce-slow" />
      <div className="flex-1">
        <p className="text-base-content font-medium group-hover:text-primary transition-colors text-sm sm:text-base">
          {feature}
        </p>
        {progress < 100 && (
          <div className="w-full bg-base-200 rounded-full h-1.5 mt-2">
            <motion.div
              className="bg-success h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

Feature.propTypes = {
  feature: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf(["check", "star", "rocket", "heart"]),
  progress: PropTypes.number,
};

Feature.defaultProps = {
  iconType: "check",
  progress: 100,
};

export default React.memo(Feature);