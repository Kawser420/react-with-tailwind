/**
 * Footer - World-class footer with multi-section grid, newsletter validation (vanilla JS regex),
 * social media embeds (placeholders), expandable FAQs, and confetti on subscribe.
 * Enhanced with CSS3 gradients, transforms, reduced motion support, and accessibility.
 * Expanded with more links, contacts, and animations.
 * @version 3.0.0
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
  FaYoutube,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { launchConfetti } from "../../utils/confetti"; // Vanilla JS confetti
import PropTypes from "prop-types";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (emailStr) => {
    // Vanilla JS regex validation - Expanded for stricter check
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(emailStr);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && validateEmail(email)) {
      setIsValid(true);
      // Simulate API with delay - Expanded with success feedback
      setTimeout(() => {
        setIsSubscribed(true);
        launchConfetti(); // Vanilla JS celebration
        console.log("Subscribed:", email);
        setEmail(""); // Reset
        setTimeout(() => setIsSubscribed(false), 5000); // Auto-hide message
      }, 1200);
    } else {
      setIsValid(false);
      // Shake animation on invalid
      const form = e.target;
      form.classList.add("animate-shake");
      setTimeout(() => form.classList.remove("animate-shake"), 600);
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
    },
    {
      icon: FaYoutube,
      href: "https://youtube.com/reacttailwindpro",
      color: "text-red-600",
      label: "YouTube",
    }, // Expanded
  ];

  const routes = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Product", path: "/product" },
    { id: 3, name: "Order", path: "/order" },
    { id: 4, name: "About", path: "/about" },
    { id: 5, name: "Login", path: "/login" },
    { id: 6, name: "Blog", path: "/blog" },
    { id: 7, name: "Contact", path: "/contact" }, // Expanded
  ];

  const supportItems = [
    {
      question: "How to track order?",
      answer:
        "Navigate to the Order section in the navbar and enter your tracking ID. Real-time updates available.",
    },
    {
      question: "Refund policy?",
      answer:
        "We offer a 30-day full refund policy for all plans. Contact support with your order ID for processing.",
    },
    {
      question: "API Access?",
      answer: "Available in Premium and Platinum plans. Includes rate limiting and documentation.",
    },
    {
      question: "Custom Integration?",
      answer: "Yes, in Platinum. Contact our team for tailored solutions.",
    }, // Expanded
  ];

  return (
    <footer
      className="footer footer-center p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-base-200 via-primary/20 to-accent text-base-content rounded-lg mt-16 relative overflow-hidden will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Parallax Background Layer - Vanilla JS on scroll (add event listener in useEffect if needed) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-gentle parallax-layer"
        style={{ transform: "translateZ(-2px) scale(1.2)" }}
      ></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl mx-auto relative z-10">
        {/* Company Section - Expanded with more details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-1 lg:col-span-2"
        >
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-4">
            ReactTailwind Pro
          </h2>
          <p className="mb-6 text-base-content/80 leading-relaxed text-sm md:text-base">
            Crafting world-class UIs with React, Tailwind CSS, and DaisyUI.
            Responsive, animated, and accessible designs that captivate users
            and impress clients. Join our community for premium insights.
          </p>
          <div className="flex justify-center space-x-4 mb-6">
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
          {/* Contact Info - Expanded */}
          <div className="mt-4 space-y-3 text-sm md:text-base text-center">
            <div className="flex items-center justify-center">
              <PhoneIcon className="h-5 w-5 mr-2" />
              <span>+1 (555) 123-4567 (24/7 Support)</span>
            </div>
            <div className="flex items-center justify-center">
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              <span>support@reacttailwindpro.com</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span>San Francisco, CA 94105, USA</span>
            </div>
          </div>
        </motion.div>

        {/* Products Section - Expanded */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center lg:text-left"
        >
          <h3 className="font-bold text-lg md:text-xl gradient-text mb-4">Products</h3>
          <ul className="space-y-2 text-sm md:text-base">
            {routes.slice(1, 5).map((route) => (
              <motion.li key={route.id} whileHover={{ x: 8 }}>
                <a
                  href={route.path}
                  className="link link-hover hover:scale-105 transition-all duration-300 block py-1.5"
                >
                  {route.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Support Section - Expanded with more FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center lg:text-left"
        >
          <h3 className="font-bold text-lg md:text-xl gradient-text mb-4">Support</h3>
          {supportItems.map((item, idx) => (
            <details
              key={idx}
              className="mb-3 collapse collapse-arrow bg-base-100 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <summary className="collapse-title text-md font-medium cursor-pointer hover:bg-primary/10 transition-colors py-2">
                {item.question}
              </summary>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4 }}
                className="collapse-content p-2"
              >
                <p className="text-base-content/70 text-sm md:text-base">{item.answer}</p>
              </motion.div>
            </details>
          ))}
        </motion.div>
      </div>

      {/* Newsletter Section - Enhanced Validation and Feedback */}
      <div className="divider mx-auto my-8 w-full max-w-xl bg-gradient-to-r from-primary to-secondary opacity-50"></div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:flex md:justify-center space-y-4 md:space-y-0 md:space-x-4 relative z-10"
      >
        <h3 className="font-bold text-lg md:text-xl text-center md:text-left">
          Stay Updated with Premium Insights
        </h3>
        <form
          onSubmit={handleSubscribe}
          className="join w-full md:w-auto flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            placeholder="Enter your email for exclusive updates"
            className={`input input-bordered join-item flex-1 min-w-0 transition-all duration-300 ${!isValid ? "input-error shake" : ""}`}
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
            className="btn join-item btn-primary hover:scale-105 transition-all duration-300 mt-2 sm:mt-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe Now
          </motion.button>
        </form>
        {!isValid && (
          <p className="text-error text-sm animate-shake mt-2 text-center">
            Please enter a valid email address.
          </p>
        )}
        {isSubscribed && (
          <motion.p
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-success animate-fade-in flex items-center justify-center mt-2 text-center"
          >
            Subscribed Successfully! 🎉 Welcome to the Pro Community.
          </motion.p>
        )}
      </motion.div>

      {/* Bottom Bar - Enhanced with more links */}
      <div className="mt-8 pt-6 border-t border-base-300/50 text-center">
        <p className="text-base-content/70 text-sm md:text-base">
          &copy; {new Date().getFullYear()} ReactTailwind Pro. Built with passion and{" "}
          <motion.span
            whileHover={{ scale: 1.3 }}
            className="inline-flex items-center"
          >
            <HeartIcon className="h-4 w-4 text-error inline animate-pulse" />{" "}
          </motion.span>
          by the World's Best UI Team. All rights reserved. |{" "}
          <a href="/privacy" className="link hover:text-primary transition-colors">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="link hover:text-primary transition-colors">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="/sitemap" className="link hover:text-primary transition-colors">
            Sitemap
          </a>
        </p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  // No external props, self-contained but ready for customization
};

export default React.memo(Footer);