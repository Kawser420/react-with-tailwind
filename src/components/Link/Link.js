/**
 * Link - Professional navigation link with active state detection (react-router), enhanced ripple animation (vanilla JS with colors),
 * accessibility (keyboard focus, ARIA, role), smooth scroll transforms, and shared layout animations.
 * @param {Object} props - Component props
 * @param {Object} props.route - Route object {id, name, path}
 * @param {boolean} [props.isActive=false] - Active route flag
 * @param {string} [props.colorVariant='primary'] - Color for ripple (primary, secondary)
 * @version 2.1.0
 * @author ReactTailwind Pro Team
 */
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Link = ({ route, isActive = false, colorVariant = "primary" }) => {
  const location = useLocation();
  const linkRef = useRef(null);
  const actualActive = route.exact ? location.pathname === route.path : location.pathname.startsWith(route.path);

  useEffect(() => {
    // Enhanced vanilla JS ripple effect with color variants
    const linkElement = linkRef.current;
    if (!linkElement) return;

    const createRipple = (event) => {
      const button = event.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      const rect = button.getBoundingClientRect();
      const color = colorVariant === "primary" ? "#3b82f6" : "#a78bfa";

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - rect.left - radius}px`;
      circle.style.top = `${event.clientY - rect.top - radius}px`;
      circle.style.backgroundColor = color;
      circle.classList.add("ripple");
      const existingRipple = button.querySelector(".ripple");
      if (existingRipple) existingRipple.remove();
      button.appendChild(circle);

      // Enhanced animation with easing
      circle.animate(
        [
          { transform: "scale(0)", opacity: 0.6 },
          { transform: "scale(4)", opacity: 0 }
        ],
        { duration: 700, easing: "ease-out" }
      ).onfinish = () => circle.remove();
    };

    // Keyboard nav support
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        createRipple(e);
        window.location.href = route.path; // Fallback for non-router
      }
    };

    linkElement.addEventListener("click", createRipple);
    linkElement.addEventListener("keydown", handleKeyDown);

    return () => {
      linkElement.removeEventListener("click", createRipple);
      linkElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [route.path, colorVariant]);

  const activeClass = actualActive
    ? "text-primary font-bold underline underline-offset-8 decoration-wavy"
    : "";

  return (
    <li
      className={`mr-4 md:mr-16 relative group ${activeClass}`}
      data-link-id={route.id}
      role="none"
    >
      <motion.a
        ref={linkRef}
        href={route.path}
        className={`text-base-content hover:text-primary transition-all duration-600 ease-out-cubic font-medium block py-3 px-4 rounded-xl group-hover:scale-110 will-change-transform focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-base-100 ${
          actualActive ? "ring-4 ring-primary/30 ring-offset-2 ring-offset-base-100" : ""
        }`}
        aria-label={`Navigate to ${route.name} page`}
        aria-current={actualActive ? "page" : undefined}
        role="link"
        tabIndex={0}
      >
        {route.name}
        {/* Shared Layout Active Indicator with 3D */}
        <AnimatePresence>
          {actualActive && (
            <motion.span
              layoutId="activeIndicator"
              className="absolute inset-0 bg-primary/20 rounded-xl -z-10 transform-gpu"
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              style={{ transformStyle: "preserve-3d" }}
              transition={{ duration: 0.4, ease: "easeOutCubic" }}
            />
          )}
        </AnimatePresence>
      </motion.a>
      {/* Inline Styles for Ripple - Global but Scoped */}
      <style jsx>{`
        [data-link-id="${route.id}"] .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.6;
          z-index: 1;
        }
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </li>
  );
};

Link.propTypes = {
  route: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
  }).isRequired,
  isActive: PropTypes.bool,
  colorVariant: PropTypes.oneOf(["primary", "secondary"]),
};

Link.defaultProps = {
  isActive: false,
  colorVariant: "primary",
};

export default React.memo(Link);