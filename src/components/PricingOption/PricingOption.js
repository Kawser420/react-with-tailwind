/**
 * PricingOption - Advanced pricing card with 3D flip on hover (CSS3 transforms),
 * feature icons, payment simulation (Stripe placeholder), and confetti trigger.
 * Responsive, accessible, with PropTypes validation.
 * @param {Object} props - Component props
 * @param {Object} props.option - Pricing data
 * @param {boolean} props.isYearly - Toggle for yearly pricing
 * @param {Function} props.onPurchase - Callback for purchase (confetti)
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React from "react";
import { motion } from "framer-motion";
import Feature from "../Feature/Feature";
import PropTypes from "prop-types";
import { CheckCircleIcon, StarIcon } from "@heroicons/react/24/solid";

const PricingOption = ({ option, isYearly, onPurchase }) => {
  const { id, name, price, yearlyPrice, discount, features, popular } = option;
  const displayPrice = isYearly ? yearlyPrice : price;

  const handleBuy = async () => {
    // Simulate payment with delay
    const button = document.querySelector(`[data-buy-id="${id}"]`);
    button.textContent = "Processing...";
    button.disabled = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    button.textContent = "Purchased!";
    button.classList.add("btn-success");
    onPurchase(); // Trigger confetti
    // Reset after celebration
    setTimeout(() => {
      button.textContent = "Buy Plan";
      button.disabled = false;
      button.classList.remove("btn-success");
    }, 3000);
    // Log for analytics
    console.log(
      `Purchased ${name} plan for $${displayPrice.replace("$", "")}/mo`
    );
  };

  return (
    <motion.div
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`card bg-base-100 shadow-2xl overflow-hidden relative group cursor-pointer will-change-transform perspective-1000 ${
        popular ? "ring-2 ring-primary ring-opacity-30" : ""
      }`}
      style={{ perspective: "1000px" }}
    >
      {/* Flip Card Front */}
      <div className="card-body items-center text-center p-8 relative transition-transform duration-1000 ease-in-out group-hover:rotate-y-180 backface-hidden">
        <div
          className={`badge ${
            popular ? "badge-primary" : "badge-secondary"
          } mb-4`}
        >
          Popular {popular && "Choice"}
        </div>
        <h2 className="card-title text-3xl font-bold text-primary mb-4">
          {name}
        </h2>
        <div className="stat p-4 bg-primary/10 rounded-xl">
          <div className="stat-value text-5xl font-bold gradient-text">
            {displayPrice}
          </div>
          <div className="stat-desc text-base-content/60">
            {isYearly ? "/year" : "/month"}{" "}
            {discount && (
              <span className="text-success ml-2">Save {discount}</span>
            )}
          </div>
        </div>
        <div className="divider my-6"></div>
        <ul className="w-full space-y-3 mb-8 max-w-md">
          {features.map((feature, idx) => (
            <Feature
              key={`${id}-${idx}`}
              feature={feature}
              iconType={idx < 3 ? "check" : "star"}
              progress={Math.floor(Math.random() * 100) + 1}
            />
          ))}
        </ul>
        <motion.button
          data-buy-id={id}
          onClick={handleBuy}
          className="btn btn-primary w-full py-4 text-lg font-bold hover:scale-110 transition-all duration-300 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Purchase ${name} plan for ${displayPrice}`}
        >
          Buy Plan Now
        </motion.button>
      </div>

      {/* Flip Card Back - Features Detail */}
      <div className="card-body absolute inset-0 items-center text-center p-8 rotate-y-180 backface-hidden bg-gradient-to-b from-primary/10 to-secondary/10">
        <h3 className="text-2xl font-bold mb-4">What's Included?</h3>
        <ul className="space-y-2 text-left w-full max-w-sm">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-success mr-2 flex-shrink-0" />
              <span className="text-base-content/80">{feature}</span>
            </li>
          ))}
        </ul>
        <motion.button
          onClick={handleBuy}
          className="btn btn-outline btn-secondary w-full mt-6"
          whileHover={{ scale: 1.02 }}
        >
          Start Free Trial
        </motion.button>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
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
