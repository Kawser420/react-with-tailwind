/**
 * Footer - Detailed, colorful footer with sections, social icons, and newsletter.
 * Responsive grid, gradients, and hover animations for vibrancy.
 * @version 1.1.0
 */
import React, { useState } from "react";
import {
  HeartIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import PropTypes from "prop-types";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => setIsSubscribed(true), 1000);
      // Add confetti or animation here with vanilla JS
      console.log("Subscribed:", email);
    }
  };

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", color: "text-blue-600" },
    { icon: FaTwitter, href: "https://twitter.com", color: "text-sky-400" },
    {
      icon: FaInstagram,
      href: "https://instagram.com",
      color: "text-pink-500",
    },
    { icon: FaGithub, href: "https://github.com", color: "text-gray-800" },
  ];

  const routes = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Product", path: "/product" },
    { id: 3, name: "Order", path: "/order" },
    { id: 4, name: "About", path: "/about" },
    { id: 5, name: "Login", path: "/login" },
  ];

  const supportItems = [
    {
      question: "How to track order?",
      answer: "Use the Order section in navbar.",
    },
    { question: "Refund policy?", answer: "30 days full refund." },
  ];

  return (
    <footer className="footer footer-center p-10 bg-gradient-to-r from-base-200 to-primary text-base-content rounded-lg mt-16 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-gentle"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-6xl">
        {/* Company Section */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold gradient-text mb-4">
            ReactTailwind Pro
          </h2>
          <p className="mb-4">
            Building world-class UIs with React, Tailwind, and DaisyUI. Impress
            your clients with gorgeous, responsive designs.
          </p>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.href}
                  className={`hover:scale-125 transition-transform duration-300 ${link.color}`}
                  aria-label={`Visit our ${link.href.split(".")[1]} page`}
                >
                  <Icon className="h-6 w-6 animate-bounce-slow" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Products</h3>
          <ul className="space-y-2">
            {routes.slice(1, 3).map((route) => (
              <li key={route.id}>
                <a
                  href={route.path}
                  className="link link-hover hover:scale-105 transition-transform"
                >
                  {route.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          {supportItems.map((item, idx) => (
            <details key={idx} className="mb-2 collapse collapse-arrow">
              <summary className="collapse-title text-md font-medium">
                {item.question}
              </summary>
              <div className="collapse-content">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="divider mx-auto my-8 w-full max-w-md"></div>
      <div className="grid grid-cols-1 md:flex md:justify-center space-y-4 md:space-y-0 md:space-x-4">
        <h3 className="font-bold text-lg">Stay Updated</h3>
        <form onSubmit={handleSubscribe} className="join">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered join-item"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email for newsletter"
          />
          <button
            type="submit"
            className="btn join-item btn-primary hover:scale-105 transition-transform"
          >
            Subscribe
          </button>
        </form>
        {isSubscribed && (
          <p className="text-success animate-fade-in">Subscribed! 🎉</p>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-4 border-t border-base-300">
        <p>
          &copy; 2025 ReactTailwind Pro. Made with{" "}
          <HeartIcon className="inline h-4 w-4 text-error animate-pulse" /> by
          Your Team.
        </p>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
