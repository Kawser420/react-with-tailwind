/**
 * Footer - World-class footer with multi-section grid, newsletter validation (vanilla JS regex),
 * social media embeds (placeholders), expandable FAQs, and confetti on subscribe.
 * Enhanced with CSS3 gradients, transforms, and reduced motion support.
 * @version 2.2.0
 * @author ReactTailwind Pro Team
 */
import React, { useState } from "react";
import {
  HeartIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { launchConfetti } from "../../utils/confetti"; // Vanilla JS confetti
import PropTypes from "prop-types";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (emailStr) => {
    // Vanilla JS regex validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailStr);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && validateEmail(email)) {
      setIsValid(true);
      // Simulate API with delay
      setTimeout(() => {
        setIsSubscribed(true);
        launchConfetti(); // Vanilla JS celebration
        console.log("Subscribed:", email);
        setEmail(""); // Reset
      }, 1000);
    } else {
      setIsValid(false);
    }
  };

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://facebook.com/reacttailwindpro",
      color: "text-blue-600",
      label: "Facebook",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/reacttailwindpro",
      color: "text-sky-400",
      label: "Twitter",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/reacttailwindpro",
      color: "text-pink-500",
      label: "Instagram",
    },
    {
      icon: FaGithub,
      href: "https://github.com/reacttailwindpro",
      color: "text-gray-800",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/company/reacttailwindpro",
      color: "text-blue-700",
      label: "LinkedIn",
    }, // Expanded
  ];

  const routes = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Product", path: "/product" },
    { id: 3, name: "Order", path: "/order" },
    { id: 4, name: "About", path: "/about" },
    { id: 5, name: "Login", path: "/login" },
    { id: 6, name: "Blog", path: "/blog" }, // Expanded
  ];

  const supportItems = [
    {
      question: "How to track order?",
      answer:
        "Navigate to the Order section in the navbar and enter your tracking ID.",
    },
    {
      question: "Refund policy?",
      answer:
        "We offer a 30-day full refund policy. Contact support for details.",
    },
    {
      question: "API Access?",
      answer: "Available in Platinum plan. See pricing for more.",
    }, // Expanded
  ];

  return (
    <footer
      className="footer footer-center p-10 bg-gradient-to-br from-base-200 via-primary/20 to-accent text-base-content rounded-lg mt-16 relative overflow-hidden will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Parallax Background Layer - Vanilla JS on scroll (add event listener in useEffect if needed) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-gentle parallax-layer"
        style={{ transform: "translateZ(-1px) scale(1.1)" }}
      ></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-7xl mx-auto relative z-10">
        {/* Company Section - Expanded */}
        <div className="col-span-1 md:col-span-2">
          <motion.h2
            whileHover={{ scale: 1.02 }}
            className="text-2xl font-bold gradient-text mb-4"
          >
            ReactTailwind Pro
          </motion.h2>
          <p className="mb-4 text-base-content/80 leading-relaxed">
            Crafting world-class UIs with React, Tailwind CSS, and DaisyUI.
            Responsive, animated, and accessible designs that captivate users
            and impress clients.
          </p>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:scale-125 transition-all duration-500 ease-out-cubic ${link.color} group`}
                  aria-label={`Visit our ${link.label} page`}
                  whileHover={{ rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-6 w-6 animate-bounce-slow group-hover:animate-spin-slow" />
                </motion.a>
              );
            })}
          </div>
          {/* Contact Info */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-center">
              <PhoneIcon className="h-4 w-4 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center">
              <EnvelopeIcon className="h-4 w-4 mr-2" />
              <span>hello@reacttailwindpro.com</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4 gradient-text">Products</h3>
          <ul className="space-y-2">
            {routes.slice(1, 4).map((route) => (
              <motion.li key={route.id} whileHover={{ x: 5 }}>
                <a
                  href={route.path}
                  className="link link-hover hover:scale-105 transition-all duration-300 block py-1"
                >
                  {route.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Support Section - Expanded with more FAQs */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4 gradient-text">Support</h3>
          {supportItems.map((item, idx) => (
            <details
              key={idx}
              className="mb-3 collapse collapse-arrow bg-base-100 rounded-lg p-2"
            >
              <summary className="collapse-title text-md font-medium cursor-pointer hover:bg-primary/10 transition-colors">
                {item.question}
              </summary>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="collapse-content"
              >
                <p className="text-base-content/70">{item.answer}</p>
              </motion.div>
            </details>
          ))}
        </div>
      </div>

      {/* Newsletter Section - Enhanced Validation */}
      <div className="divider mx-auto my-8 w-full max-w-md bg-gradient-to-r from-primary to-secondary"></div>
      <div className="grid grid-cols-1 md:flex md:justify-center space-y-4 md:space-y-0 md:space-x-4 relative z-10">
        <h3 className="font-bold text-lg text-center md:text-left">
          Stay Updated with Premium Insights
        </h3>
        <form
          onSubmit={handleSubscribe}
          className="join w-full md:w-auto flex-wrap"
        >
          <input
            type="email"
            placeholder="Enter your email for exclusive updates"
            className={`input input-bordered join-item flex-1 min-w-0 ${
              !isValid ? "input-error" : ""
            }`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsValid(true);
            }}
            required
            aria-label="Email address for newsletter subscription"
            aria-invalid={!isValid}
          />
          <motion.button
            type="submit"
            className="btn join-item btn-primary hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </form>
        {!isValid && (
          <p className="text-error text-sm animate-shake">
            Please enter a valid email.
          </p>
        )}
        {isSubscribed && (
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-success animate-fade-in flex items-center justify-center"
          >
            Subscribed Successfully! 🎉 Welcome to the Pro Community.
          </motion.p>
        )}
      </div>

      {/* Bottom Bar - Enhanced */}
      <div className="mt-8 pt-6 border-t border-base-300/50">
        <p className="text-base-content/70 text-sm">
          &copy; 2025 ReactTailwind Pro. Built with passion and{" "}
          <motion.span
            whileHover={{ scale: 1.2 }}
            className="inline-flex items-center"
          >
            <HeartIcon className="h-4 w-4 text-error inline animate-pulse" />{" "}
          </motion.span>
          by the World's Best UI Team. All rights reserved. |{" "}
          <a href="/privacy" className="link hover:text-primary">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="link hover:text-primary">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  // No external props, self-contained
};

export default React.memo(Footer);
