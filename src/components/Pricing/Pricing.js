/**
 * Pricing - Grid of pricing cards with DaisyUI, responsive and animated.
 * @version 2.0.0
 */
import React from "react";
import PricingOption from "../PricingOption/PricingOption";

const Pricing = () => {
  const pricingOptions = [
    {
      id: 1,
      name: "Basic",
      price: "$0.00",
      features: [
        "Free Users Access",
        "Simple UI Experience",
        "Basic Support",
        "Limited Features",
        "Community Forum",
        "Email Updates",
        "1GB Storage",
      ],
    },
    {
      id: 2,
      name: "Premium",
      price: "$9.99",
      features: [
        "Unlimited Access",
        "Advanced UI Tools",
        "Priority Support",
        "Full Feature Set",
        "Analytics Dashboard",
        "Custom Themes",
        "10GB Storage",
      ],
    },
    {
      id: 3,
      name: "Platinum",
      price: "$19.99",
      features: [
        "Enterprise Access",
        "Custom UI Builds",
        "24/7 Support",
        "All Features + API",
        "Advanced Analytics",
        "White-label",
        "Unlimited Storage",
      ],
    },
  ];

  return (
    <div className="hero min-h-screen bg-base-200 py-12 animate-fade-in">
      <div className="hero-content text-center">
        <div>
          <h1 className="text-5xl font-bold gradient-text mb-8">
            Select Your Best Plan
          </h1>
          <p className="text-xl text-base-content/70 mb-12 max-w-2xl mx-auto">
            Choose from our tiered plans designed for every need. All plans
            include responsive design and theme support.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {pricingOptions.map((option) => (
          <PricingOption key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
