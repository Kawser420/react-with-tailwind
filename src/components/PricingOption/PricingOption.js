/**
 * PricingOption - Advanced pricing card with 3D flip on hover (CSS3 transforms + motion),
 * dynamic feature icons (Heroicons), enhanced payment simulation (Stripe placeholder with loading),
 * confetti trigger on success, responsive, accessible, with PropTypes and recommended badge.
 * @param {Object} props - Component props
 * @param {Object} props.option - Pricing data
 * @param {boolean} props.isYearly - Toggle for yearly pricing
 * @param {Function} props.onPurchase - Callback for purchase (confetti)
 * @param {boolean} props.recommended - Highlight as recommended
 * @version 3.1.0
 * @author ReactTailwind Pro Team
 */
import React, { useState } from "react";
import { motion } from "framer-motion";
import Feature from "../Feature/Feature";
import PropTypes from "prop-types";
import { 
  CheckCircleIcon, 
  StarIcon, 
  BoltIcon, 
  TrophyIcon,
  BadgeCheckIcon 
} from "@heroicons/react/24/solid";

const PricingOption = ({ option, isYearly, onPurchase, recommended = false }) => {
  const { id, name, price, yearlyPrice, discount, features, popular } = option;
  const [isFlipped, setIsFlipped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(""); // '', 'processing', 'success'
  const displayPrice = isYearly ? yearlyPrice : price;

  const handleBuy = async () => {
    setIsProcessing(true);
    setPurchaseStatus("processing");
    // Simulate Stripe payment
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setPurchaseStatus("success");
    onPurchase();
    // Reset after celebration
    setTimeout(() => {
      setPurchaseStatus("");
      setIsProcessing(false);
    }, 4000);
    console.log(`Purchased ${name} for $${displayPrice.replace("$", "")}${isYearly ? '/yr' : '/mo'}`);
  };

  return (
    <motion.div
      whileHover={{ y: -15, rotateX: 8, rotateY: 8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      className={`card-premium overflow-hidden relative group cursor-pointer perspective-2000 ${
        popular ? "ring-4 ring-primary/40" : recommended ? "ring-4 ring-warning/40" : ""
      }`}
      style={{ perspective: "2000px" }}
    >
      {/* Flip Card Front - Enhanced */}
      <motion.div
        className="card-body absolute inset-0 items-center text-center p-8 transition-transform duration-1000 ease-in-out group-hover:rotateY(180deg) backface-hidden"
        style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
      >
        {/* Badges */}
        <div className="space-y-2 mb-6">
          {popular && <div className="badge badge-primary badge-lg animate-pulse">⭐ Most Popular</div>}
          {recommended && <div className="badge badge-warning badge-lg animate-bounce-slow">🤖 Recommended</div>}
          {discount !== "Always Free" && <div className="badge badge-success">{discount}</div>}
        </div>
        <h2 className="card-title text-4xl font-bold text-primary mb-6">{name}</h2>
        <div className="stat p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-8">
          <div className="stat-value text-6xl font-bold gradient-text">
            {displayPrice}
          </div>
          <div className="stat-desc text-base-content/60 text-lg">
            {isYearly ? "per year" : "per month"}{" "}
            {!isYearly && <span className="text-success">(Billed monthly)</span>}
          </div>
        </div>
        <div className="divider my-8"></div>
        <ul className="w-full space-y-4 mb-10 max-w-md mx-auto">
          {features.map((feature, idx) => (
            <Feature
              key={`${id}-${idx}`}
              feature={feature}
              iconType={idx % 3 === 0 ? "check" : idx % 3 === 1 ? "star" : "bolt"}
              progress={Math.min(100, (idx + 1) * 10)}
              isCompleted={true}
            />
          ))}
        </ul>
        <motion.button
          data-buy-id={id}
          onClick={handleBuy}
          disabled={isProcessing}
          className={`btn w-full py-5 text-xl font-bold shadow-xl transition-all duration-500 ${
            isProcessing ? "btn-warning loading" : purchaseStatus === "success" ? "btn-success" : "btn-primary hover:scale-110"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Purchase ${name} plan for ${displayPrice} ${isYearly ? '/year' : '/month'}`}
        >
          {purchaseStatus === "processing" ? "Processing Payment..." : 
           purchaseStatus === "success" ? "🎉 Purchased! Redirecting..." : 
           `Buy ${name} Now`}
        </motion.button>
      </motion.div>

      {/* Flip Card Back - Detailed Features */}
      <motion.div
        className="card-body absolute inset-0 items-center text-center p-8 rotateY(180deg) backface-hidden bg-gradient-to-b from-secondary/10 to-accent/10"
        style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
      >
        <TrophyIcon className="h-16 w-16 text-warning mb-6 animate-spin-slow" />
        <h3 className="text-3xl font-bold mb-6 gradient-text">What's Included in {name}?</h3>
        <ul className="space-y-3 text-left w-full max-w-lg mx-auto">
          {features.map((feature, idx) => (
            <motion.li 
              key={idx} 
              whileHover={{ x: 10 }} 
              className="flex items-start py-2"
            >
              <CheckCircleIcon className="h-6 w-6 text-success mr-3 mt-1 flex-shrink-0 animate-pulse" />
              <span className="text-base-content/90">{feature}</span>
            </motion.li>
          ))}
        </ul>
        <motion.button
          onClick={handleBuy}
          className="btn btn-outline btn-secondary w-full mt-8"
          whileHover={{ scale: 1.03 }}
          disabled={isProcessing}
        >
          {isProcessing ? "Securing Plan..." : "Start Free Trial"}
        </motion.button>
      </motion.div>

      {/* Custom Styles for Flip */}
      <style jsx>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY\\(180deg\\) {
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
    recommended: PropTypes.bool,
  }).isRequired,
  isYearly: PropTypes.bool.isRequired,
  onPurchase: PropTypes.func.isRequired,
  recommended: PropTypes.bool,
};

PricingOption.defaultProps = {
  recommended: false,
};

export default React.memo(PricingOption);