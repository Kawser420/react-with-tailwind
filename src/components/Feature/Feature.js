/**
 * Feature - Advanced feature list item with dynamic icons (Heroicons variants), progress indicators with easing,
 * enhanced tooltips (vanilla JS with delay/fade), multi-state animations (CSS3 + Framer), and accessibility.
 * Supports PropTypes, ARIA, and keyboard interactions.
 * @param {Object} props - Component props
 * @param {string} props.feature - Feature description text
 * @param {string} [props.iconType='check'] - Icon variant (check, star, rocket, heart, lightbulb)
 * @param {number} [props.progress=100] - Optional progress percentage (0-100)
 * @param {boolean} [props.isCompleted=true] - Completion state for icon
 * @version 2.2.0
 * @author ReactTailwind Pro Team
 */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  CheckCircleIcon,
  StarIcon,
  RocketLaunchIcon,
  HeartIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
import {
  CheckCircleIcon as CheckCircleOutline,
  StarIcon as StarOutline,
  RocketLaunchIcon as RocketOutline,
  HeartIcon as HeartOutline,
  LightBulbIcon as LightBulbOutline,
} from "@heroicons/react/24/outline";

const iconMap = {
  check: { solid: CheckCircleIcon, outline: CheckCircleOutline },
  star: { solid: StarIcon, outline: StarOutline },
  rocket: { solid: RocketLaunchIcon, outline: RocketOutline },
  heart: { solid: HeartIcon, outline: HeartOutline },
  lightbulb: { solid: LightBulbIcon, outline: LightBulbOutline },
};

const Feature = ({ feature, iconType = "check", progress = 100, isCompleted = true }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);
  const IconComponent = iconMap[iconType]?.[isCompleted ? "solid" : "outline"] || CheckCircleIcon;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let tooltipTimeout;
    const handleMouseEnter = (e) => {
      tooltipTimeout = setTimeout(() => {
        setShowTooltip(true);
        setTooltipPos({ x: e.clientX + 15, y: e.clientY - 10 });
      }, 300); // Delay for UX
    };

    const handleMouseMove = (e) => {
      if (showTooltip) {
        setTooltipPos({ x: e.clientX + 15, y: e.clientY - 10 });
      }
    };

    const handleMouseLeave = () => {
      clearTimeout(tooltipTimeout);
      setShowTooltip(false);
    };

    // Keyboard support
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        setShowTooltip(true);
      }
    };

    const handleKeyUp = () => {
      setTimeout(() => setShowTooltip(false), 2000);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("keydown", handleKeyDown);
    element.addEventListener("keyup", handleKeyUp);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("keydown", handleKeyDown);
      element.removeEventListener("keyup", handleKeyUp);
      clearTimeout(tooltipTimeout);
    };
  }, [feature, showTooltip]);

  return (
    <motion.div
      ref={elementRef}
      whileHover={{ scale: 1.03, rotate: 2 }}
      whileTap={{ scale: 0.97 }}
      whileFocus={{ scale: 1.02 }}
      tabIndex={0}
      role="listitem"
      aria-label={`${feature} ${isCompleted ? '(Completed)' : '(In Progress)'}`}
      className="flex items-center pt-4 group relative overflow-hidden rounded-xl bg-base-100/60 p-4 mb-3 transition-all duration-600 ease-out-cubic hover:bg-primary/15 will-change-transform animate-fade-in"
      data-feature-tooltip={feature}
    >
      {/* Dynamic Icon with State */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="h-8 w-8 mr-4 flex-shrink-0 transition-all duration-500 group-hover:text-primary"
      >
        <IconComponent className={`h-full w-full ${isCompleted ? 'text-success' : 'text-warning'}`} />
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className="text-base-content font-semibold group-hover:text-primary transition-colors truncate">
          {feature}
        </p>
        {progress < 100 && (
          <div className="w-full bg-base-300 rounded-full h-2 mt-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-success to-primary h-2 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 2, ease: "easeOutCubic" }}
            >
              <div className="absolute inset-0 bg-success opacity-50 animate-pulse-gentle"></div>
            </motion.div>
          </div>
        )}
        <p className="text-xs text-base-content/50 mt-1">{progress}% Complete</p>
      </div>
      {/* Enhanced Tooltip with Fade */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-full left-0 mt-2 bg-base-900 text-white px-3 py-2 rounded-lg text-sm shadow-2xl z-50 whitespace-nowrap pointer-events-none"
            style={{ top: tooltipPos.y, left: tooltipPos.x }}
            role="tooltip"
            aria-hidden={!showTooltip}
          >
            <span>Details: {feature}</span>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-base-900"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

Feature.propTypes = {
  feature: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf(["check", "star", "rocket", "heart", "lightbulb"]),
  progress: PropTypes.number,
  isCompleted: PropTypes.bool,
};

Feature.defaultProps = {
  iconType: "check",
  progress: 100,
  isCompleted: true,
};

export default React.memo(Feature);