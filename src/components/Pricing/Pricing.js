/**
 * Pricing - World-class pricing section with hero banner (gradient + parallax image overlay),
 * monthly/yearly toggle (smooth animation), expanded feature comparisons table,
 * and purchase confetti. Fully responsive grid, CSS3 transforms for card flips.
 * Expanded with more plans, features, and table rows.
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React, { useState } from "react";
import PricingOption from "../PricingOption/PricingOption";
import { motion } from "framer-motion";
import { launchConfetti } from "../../utils/confetti"; // Vanilla JS

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  // Expanded pricing options with more features and a new plan
  const pricingOptions = [
    {
      id: 1,
      name: "Basic",
      price: isYearly ? "$0.00" : "$0.00",
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
        "Basic Analytics",
        "Mobile App Access",
        "Weekly Updates", // Expanded
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
        "Priority Support (Chat + Email)",
        "Full Component Library",
        "Analytics Dashboard",
        "Custom Themes & Plugins",
        "10GB Storage",
        "API Integrations",
        "Export Tools",
        "Priority Updates",
        "Team Collaboration", // Expanded
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
        "VIP Community Access",
        "Custom Integrations",
        "Dedicated Account Manager", // Expanded
      ],
      popular: false,
    },
    {
      id: 4,
      name: "Enterprise",
      price: isYearly ? "Custom" : "Custom",
      yearlyPrice: "Custom",
      discount: "Contact Us",
      features: [
        "Tailored Solutions",
        "Unlimited Everything",
        "Dedicated Team Support",
        "Custom Development",
        "Scalable Infrastructure",
        "SLA Guarantees",
        "On-Site Training",
        "Security Audits", // New plan expanded
      ],
      popular: false,
    },
  ];

  const handleToggle = () => {
    setIsYearly(!isYearly);
    // Subtle animation trigger - Vanilla JS
    document.documentElement.style.setProperty(
      "--toggle-offset",
      isYearly ? "0%" : "100%"
    );
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-base-200 via-white to-primary/20 py-12 md:py-16 overflow-hidden" id="pricing">
      {/* Parallax Banner Background - Vanilla JS scroll listener can be added for dynamic parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-sm"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')", // Premium image
        }}
        initial={{ y: 0 }}
        whileInView={{ y: -60 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/25 to-secondary/25"></div>

      {/* Hero Banner Content - Expanded for impressiveness */}
      <div className="hero-content text-center relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, staggerChildren: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-6 leading-tight">
            Unlock World-Class <span className="text-primary">UI Power</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-base-content/70 mb-8 max-w-4xl mx-auto leading-relaxed">
            Choose from flexible tiered plans tailored for startups to enterprises. Every plan delivers responsive, animated designs with seamless theme support and top-tier performance.
          </p>
          {/* Toggle Switch - With spring animation */}
          <div className="flex justify-center items-center space-x-4 mb-12">
            <span className="text-base-content/70 text-lg">Monthly Billing</span>
            <motion.div
              className="relative inline-block w-28 h-7 bg-base-200 rounded-full cursor-pointer shadow-inner"
              onClick={handleToggle}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 bg-primary rounded-full shadow-md transition-transform duration-500 ease-out-cubic"
                animate={{ x: isYearly ? "100%" : "0%" }}
                style={{ willChange: "transform" }}
              />
            </motion.div>
            <span className="text-base-content/70 text-lg">
              Yearly Billing ({isYearly ? "Save up to 20%" : ""})
            </span>
          </div>
        </motion.div>
      </div>

      {/* Pricing Grid - Responsive columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {pricingOptions.map((option) => (
          <PricingOption
            key={option.id}
            option={option}
            isYearly={isYearly}
            onPurchase={launchConfetti}
          />
        ))}
      </div>

      {/* Feature Comparison Table - Expanded with more categories */}
      <div className="mt-20 md:mt-24 px-4 relative z-10">
        <h3 className="text-3xl md:text-4xl font-bold text-center gradient-text mb-8 md:mb-12">
          Detailed Feature Comparison
        </h3>
        <div className="overflow-x-auto shadow-2xl rounded-xl">
          <table className="table table-zebra w-full bg-base-100 text-sm md:text-base">
            <thead>
              <tr>
                <th className="text-left p-4">Feature</th>
                {pricingOptions.map((option) => (
                  <th
                    key={option.id}
                    className={`text-center p-4 ${option.popular ? "gradient-text" : ""}`}
                  >
                    {option.name}
                    {option.popular && (
                      <div className="badge badge-primary badge-sm mt-2">
                        Most Popular
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                "Access Level",
                "Support Type",
                "Storage Limit",
                "Analytics",
                "Custom Builds",
                "Integrations",
                "Updates Frequency",
                "Team Features",
                "Security", // Expanded categories
              ].map((cat, idx) => (
                <tr key={idx}>
                  <td className="font-medium p-4 text-left">{cat}</td>
                  {pricingOptions.map((option) => (
                    <td key={option.id} className="text-center p-4">
                      {option.features.some((f) =>
                        f.toLowerCase().includes(cat.toLowerCase())
                      )
                        ? "✅ Available"
                        : "❌ Not Included"}
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