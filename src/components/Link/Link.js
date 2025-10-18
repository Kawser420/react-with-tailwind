/**
 * Link - Professional navigation link with active state detection, ripple animation (vanilla JS),
 * accessibility (keyboard focus, ARIA), and smooth scroll transforms.
 * Integrated with React Router for world-class routing. Expanded with more effects.
 * @param {Object} props - Component props
 * @param {Object} props.route - Route object {id, name, path}
 * @param {boolean} [props.isActive=false] - Active route flag
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Link = ({ route, isActive = false }) => {
  const location = useLocation(); // For active state

  useEffect(() => {
    // Vanilla JS ripple effect on click - Expanded with color variation
    const linkElement = document.querySelector(`[data-link-id="${route.id}"]`);
    if (linkElement) {
      const createRipple = (event) => {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        const rect = button.getBoundingRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");
        circle.style.background = isActive ? "var(--fallback-pc, oklch(55% 0.3 240))" : "var(--fallback-pb, oklch(65% 0.25 160))";
        const existingRipple = button.getElementsByClassName("ripple")[0];
        if (existingRipple) existingRipple.remove();
        button.appendChild(circle);
        setTimeout(() => circle.remove(), 700);
      };
      linkElement.addEventListener("click", createRipple);
      return () => linkElement.removeEventListener("click", createRipple);
    }
  }, [route.id, isActive]);

  const activeClass = location.pathname === route.path ? "text-primary font-bold underline underline-offset-4" : "";

  return (
    <li
      className={`mr-2 md:mr-6 lg:mr-12 relative group ${activeClass}`}
      data-link-id={route.id}
    >
      <a
        href={route.path}
        className={`text-base-content hover:text-primary transition-all duration-500 ease-out-cubic font-medium block py-2 px-3 md:px-4 rounded-lg group-hover:scale-110 will-change-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-sm md:text-base ${
          location.pathname === route.path ? "ring-2 ring-primary ring-opacity-50" : ""
        }`}
        aria-label={`Navigate to ${route.name} page`}
        aria-current={location.pathname === route.path ? "page" : undefined}
        role="link"
      >
        {route.name}
        {/* Active Indicator - Shared layout with Framer Motion */}
        {location.pathname === route.path && (
          <motion.span
            className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
            layoutId="active-nav-indicator"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </a>
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation 0.7s linear;
          opacity: 0.5;
        }
        @keyframes ripple-animation {
          to {
            transform: scale(5);
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
  }).isRequired,
  isActive: PropTypes.bool,
};

Link.defaultProps = {
  isActive: false,
};

export default React.memo(Link);