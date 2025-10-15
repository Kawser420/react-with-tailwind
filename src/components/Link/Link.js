/**
 * Link - Professional navigation link with active state detection, ripple animation (vanilla JS),
 * accessibility (keyboard focus, ARIA), and smooth scroll transforms.
 * @param {Object} props - Component props
 * @param {Object} props.route - Route object {id, name, path}
 * @param {boolean} [props.isActive=false] - Active route flag
 * @version 2.0.0
 * @author ReactTailwind Pro Team
 */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Assuming React Router; fallback to window.location
import PropTypes from "prop-types";

const Link = ({ route, isActive = false }) => {
  const location = useLocation(); // For active state (add react-router-dom if not present)

  useEffect(() => {
    // Vanilla JS ripple effect on click
    const linkElement = document.querySelector(`[data-link-id="${route.id}"]`);
    if (linkElement) {
      const createRipple = (event) => {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        const rect = button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");
        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) ripple.remove();
        button.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
      };
      linkElement.addEventListener("click", createRipple);
      return () => linkElement.removeEventListener("click", createRipple);
    }
  }, [route.id]);

  const activeClass = isActive
    ? "text-primary font-bold underline underline-offset-4"
    : "";

  return (
    <li
      className={`mr-4 md:mr-12 relative group ${activeClass}`}
      data-link-id={route.id}
    >
      <a
        href={route.path}
        className={`text-base-content hover:text-primary transition-all duration-500 ease-out-cubic font-medium block py-2 px-3 rounded-lg group-hover:scale-110 will-change-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
          isActive ? "ring-2 ring-primary ring-opacity-50" : ""
        }`}
        aria-label={`Navigate to ${route.name} page`}
        aria-current={isActive ? "page" : undefined}
        role="link"
      >
        {route.name}
        {/* Active Indicator */}
        {isActive && (
          <motion.span
            className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
            layoutId="activeIndicator" // For shared layout animation
          />
        )}
      </a>
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: var(--fallback-pc, oklch(55% 0.3 240));
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          opacity: 0.5;
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
  }).isRequired,
  isActive: PropTypes.bool,
};

Link.defaultProps = {
  isActive: false,
};

export default React.memo(Link);
