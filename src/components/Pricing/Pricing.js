/**
 * Pricing - World-class pricing section with hero banner (gradient + parallax image overlay),
 * monthly/yearly toggle (smooth animation), expanded feature comparisons table,
 * and purchase confetti. Fully responsive grid, CSS3 transforms for card flips.
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React, { useState } from "react";
import PricingOption from "../PricingOption/PricingOption";
import { motion } from "framer-motion";
import { launchConfetti } from "../../utils/confetti"; // Vanilla JS

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  // Expanded pricing options with yearly discounts
  const pricingOptions = [
    {
      id: 1,
      name: "Basic",
      price: isYearly ? "$0.00" : "$0.00", // Free always
      yearlyPrice: "$0.00",
      discount: "0%",
      features: [
        "Free User Access",
        "Simple UI Kit",
        "Basic Support (Email)",
        "Limited Components",
        "Community Forum Access",
        "Email Newsletter",
        "1GB Cloud Storage",
        "Basic Analytics", // Expanded
      ],
      popular: false,
    },
    {
      id: 2,
      name: "Premium",
      price: isYearly ? "$99.00" : "$9.99",
      yearlyPrice: "$99.00",
      discount: "17%",
      features: [
        "Unlimited Access",
        "Advanced UI Tools",
        "Priority Support (Chat)",
        "Full Component Library",
        "Analytics Dashboard",
        "Custom Themes & Plugins",
        "10GB Storage",
        "API Integrations",
        "Export Tools", // Expanded
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Platinum",
      price: isYearly ? "$199.00" : "$19.99",
      yearlyPrice: "$199.00",
      discount: "17%",
      features: [
        "Enterprise-Level Access",
        "Custom UI Builds & Consulting",
        "24/7 Dedicated Support",
        "All Features + Private API",
        "Advanced Analytics & Reports",
        "White-Label Solutions",
        "Unlimited Storage",
        "On-Prem Deployment",
        "VIP Community Access", // Expanded
      ],
      popular: false,
    },
  ];

  const handleToggle = () => {
    setIsYearly(!isYearly);
    // Subtle animation trigger
    document.documentElement.style.setProperty(
      "--toggle-offset",
      isYearly ? "0%" : "100%"
    );
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-base-200 via-white to-primary/20 py-12 overflow-hidden">
      {/* Parallax Banner Background - Vanilla JS scroll listener can be added */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')", // Premium banner image
        }}
        initial={{ y: 0 }}
        whileInView={{ y: -50 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>

      {/* Hero Banner Content */}
      <div className="hero-content text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 leading-tight">
            Unlock World-Class <span className="text-primary">UI Power</span>
          </h1>
          <p className="text-xl md:text-2xl text-base-content/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Choose from flexible tiered plans tailored for startups to
            enterprises. Every plan delivers responsive, animated designs with
            seamless theme support.
          </p>
          {/* Toggle Switch */}
          <div className="flex justify-center items-center space-x-4 mb-12">
            <span className="text-base-content/70">Monthly</span>
            <motion.div
              className="relative inline-block w-24 h-6 bg-base-200 rounded-full cursor-pointer"
              onClick={handleToggle}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 bg-primary rounded-full shadow-md transition-transform duration-500 ease-out-cubic"
                animate={{ x: isYearly ? "100%" : "0%" }}
                style={{ willChange: "transform" }}
              />
            </motion.div>
            <span className="text-base-content/70">
              Yearly ({isYearly ? "Save 17%" : ""})
            </span>
          </div>
        </motion.div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10 px-4">
        {pricingOptions.map((option) => (
          <PricingOption
            key={option.id}
            option={option}
            isYearly={isYearly}
            onPurchase={launchConfetti}
          />
        ))}
      </div>

      {/* Feature Comparison Table - Expanded */}
      <div className="mt-20 px-4 relative z-10">
        <h3 className="text-3xl font-bold text-center gradient-text mb-8">
          Feature Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full bg-base-100 rounded-xl shadow-xl">
            <thead>
              <tr>
                <th></th>
                {pricingOptions.map((option) => (
                  <th
                    key={option.id}
                    className={`text-center ${
                      option.popular ? "gradient-text" : ""
                    }`}
                  >
                    {option.name}
                    {option.popular && (
                      <div className="badge badge-primary badge-sm mt-1">
                        Popular
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                "Access",
                "Support",
                "Storage",
                "Analytics",
                "Custom Builds",
              ].map((cat, idx) => (
                <tr key={idx}>
                  <td className="font-medium">{cat}</td>
                  {pricingOptions.map((option) => (
                    <td key={option.id} className="text-center">
                      {option.features.some((f) =>
                        f.toLowerCase().includes(cat.toLowerCase())
                      )
                        ? "✅"
                        : "❌"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
