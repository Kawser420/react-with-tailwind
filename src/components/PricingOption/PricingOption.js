/**
 * PricingOption - Advanced pricing card with 3D flip on hover (CSS3 transforms),
 * feature icons, payment simulation (Stripe placeholder), and confetti trigger.
 * Responsive, accessible, with PropTypes validation. Expanded with more interactions.
 * @param {Object} props - Component props
 * @param {Object} props.option - Pricing data
 * @param {boolean} props.isYearly - Toggle for yearly pricing
 * @param {Function} props.onPurchase - Callback for purchase (confetti)
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React, { useState } from "react";
import { motion } from "framer-motion";
import Feature from "../Feature/Feature";
import PropTypes from "prop-types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const PricingOption = ({ option, isYearly, onPurchase }) => {
  const { id, name, price, yearlyPrice, discount, features, popular } = option;
  const displayPrice = isYearly ? yearlyPrice : price;
  const [buttonText, setButtonText] = useState("Buy Plan Now");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleBuy = async () => {
    setButtonText("Processing...");
    setButtonDisabled(true);
    // Simulate payment with delay - Expanded with steps
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setButtonText("Purchased!");
    onPurchase(); // Trigger confetti
    // Log for analytics
    console.log(`Purchased ${name} plan for $${displayPrice.replace("$", "")}${isYearly ? "/year" : "/mo"}`);
    setTimeout(() => {
      setButtonText("Buy Plan Now");
      setButtonDisabled(false);
    }, 3000);
  };

  return (
    <motion.div
      whileHover={{ y: -12, rotateX: 8, rotateY: 8 }}
      whileTap={{ scale: 0.98 }}
      className={`card bg-base-100 shadow-2xl overflow-hidden relative group cursor-pointer will-change-transform perspective-1000 card-premium ${
        popular ? "ring-4 ring-primary ring-opacity-40" : ""
      }`}
      style={{ perspective: "1000px" }}
    >
      {/* Flip Card Front - Main Info */}
      <div className="card-body items-center text-center p-6 md:p-8 relative transition-transform duration-1000 ease-in-out group-hover:rotateY(180) backface-hidden">
        <div className={`badge ${popular ? "badge-primary" : "badge-secondary"} mb-4 text-sm md:text-base`}>
          {popular ? "Popular Choice" : "Standard"}
        </div>
        <h2 className="card-title text-2xl md:text-3xl font-bold text-primary mb-4">
          {name}
        </h2>
        <div className="stat p-4 md:p-6 bg-primary/10 rounded-xl shadow-inner">
          <div className="stat-value text-4xl md:text-5xl font-bold gradient-text">
            {displayPrice}
          </div>
          <div className="stat-desc text-base-content/60 text-sm md:text-base">
            {isYearly ? "/year" : "/month"}{" "}
            {discount && (
              <span className="text-success ml-2">Save {discount}</span>
            )}
          </div>
        </div>
        <div className="divider my-6 opacity-50"></div>
        <ul className="w-full space-y-3 mb-8 max-w-md">
          {features.map((feature, idx) => (
            <Feature
              key={`${id}-${idx}`}
              feature={feature}
              iconType={idx % 4 === 0 ? "check" : idx % 4 === 1 ? "star" : idx % 4 === 2 ? "rocket" : "heart"}
              progress={Math.floor(Math.random() * 30 + 70)}
            />
          ))}
        </ul>
        <motion.button
          onClick={handleBuy}
          disabled={buttonDisabled}
          className="btn btn-primary w-full py-3 md:py-4 text-lg font-bold hover:scale-110 transition-all duration-300 shadow-lg btn-modern"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Purchase ${name} plan for ${displayPrice}`}
        >
          {buttonText}
        </motion.button>
      </div>

      {/* Flip Card Back - Detailed Features */}
      <div className="card-body absolute inset-0 items-center text-center p-6 md:p-8 rotateY(180) backface-hidden bg-gradient-to-b from-primary/15 to-secondary/15">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">What's Included in {name}?</h3>
        <ul className="space-y-3 text-left w-full max-w-lg">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm md:text-base">
              <CheckCircleIcon className="h-5 w-5 md:h-6 md:w-6 text-success mr-3 flex-shrink-0" />
              <span className="text-base-content/80">{feature}</span>
            </li>
          ))}
        </ul>
        <motion.button
          onClick={handleBuy}
          className="btn btn-outline btn-secondary w-full mt-6 py-3 text-lg"
          whileHover={{ scale: 1.02 }}
        >
          Start Your Free Trial Today
        </motion.button>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY(180) {
          transform: rotateY(180deg);
        }
      `}</style>
    </motion.div>
  );
};

PricingOption.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    yearlyPrice: PropTypes.string.isRequired,
    discount: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    popular: PropTypes.bool,
  }).isRequired,
  isYearly: PropTypes.bool.isRequired,
  onPurchase: PropTypes.func.isRequired,
};

PricingOption.defaultProps = {
  isYearly: false,
};

export default React.memo(PricingOption);