/**
 * PricingOption - DaisyUI card with stats, features, and buy button animations.
 * @param {Object} option - Pricing option data
 * @version 2.0.0
 */
import React from "react";
import Feature from "../Feature/Feature";
import PropTypes from "prop-types";

const PricingOption = ({ option }) => {
  const { id, name, price, features } = option;

  const handleBuy = () => {
    // Simulate purchase with confetti (vanilla JS)
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    // Simple confetti logic (expand as needed)
    setTimeout(() => document.body.removeChild(canvas), 3000);
    alert(`Purchased ${name} plan!`);
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:scale-105 transform">
      <div className="card-body items-center text-center p-6">
        <h2 className="card-title text-2xl font-bold text-primary mb-4">
          {name}
        </h2>
        <div className="stat">
          <div className="stat-value text-4xl font-bold">{price}</div>
          <div className="stat-desc text-base-content/60">/month</div>
        </div>
        <div className="divider"></div>
        <ul className="w-full space-y-2 mb-6">
          {features.map((feature, idx) => (
            <Feature key={`${id}-${idx}`} feature={feature} />
          ))}
        </ul>
        <button
          onClick={handleBuy}
          className="btn btn-primary w-full py-3 text-lg font-bold hover:scale-110 transition-transform duration-300"
        >
          Buy Plan
        </button>
      </div>
    </div>
  );
};

PricingOption.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PricingOption;
