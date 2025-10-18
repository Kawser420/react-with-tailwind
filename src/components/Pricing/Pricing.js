/**
 * Pricing - World-class pricing section with hero banner (gradient + parallax image overlay with motion),
 * monthly/yearly toggle (custom slider with motion), expanded feature comparisons table with zebra stripes,
 * purchase confetti with variants, fully responsive grid, CSS3 transforms for card flips, and plan recommender.
 * @version 3.1.0
 * @author ReactTailwind Pro Team
 */
import React, { useState } from "react";
import { motion } from "framer-motion";
import PricingOption from "../PricingOption/PricingOption";
import { launchConfetti } from "../../utils/confetti";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState("Premium"); // AI recommender placeholder

  // Expanded pricing options with more features and discounts
  const pricingOptions = [
    {
      id: 1,
      name: "Basic",
      price: "$0.00",
      yearlyPrice: "$0.00",
      discount: "Always Free",
      features: [
        "Free User Access",
        "Simple UI Kit",
        "Basic Support (Email)",
        "Limited Components (10+)",
        "Community Forum Access",
        "Email Newsletter",
        "1GB Cloud Storage",
        "Basic Analytics Dashboard",
        "Standard Themes (5)",
        "Export to CSV Only", // Expanded
      ],
      popular: false,
      recommended: false,
    },
    {
      id: 2,
      name: "Premium",
      price: isYearly ? "$99.00" : "$9.99",
      yearlyPrice: "$99.00",
      discount: isYearly ? "17% Off" : "Billed Monthly",
      features: [
        "Unlimited Access",
        "Advanced UI Tools & Animations",
        "Priority Support (Chat + Email)",
        "Full Component Library (100+)",
        "Advanced Analytics & Reports",
        "Custom Themes & Plugins",
        "10GB Storage",
        "API Integrations & Webhooks",
        "Export Tools (CSV, PNG, PDF)",
        "Priority Updates & Features", // Expanded
      ],
      popular: true,
      recommended: true,
    },
    {
      id: 3,
      name: "Platinum",
      price: isYearly ? "$199.00" : "$19.99",
      yearlyPrice: "$199.00",
      discount: isYearly ? "17% Off" : "Billed Monthly",
      features: [
        "Enterprise-Level Access",
        "Custom UI Builds & Consulting",
        "24/7 Dedicated Support (Phone)",
        "All Features + Private API",
        "Advanced Analytics & AI Insights",
        "White-Label Solutions",
        "Unlimited Storage & Bandwidth",
        "On-Prem Deployment Options",
        "VIP Community Access & Events",
        "Dedicated Account Manager", // Expanded
      ],
      popular: false,
      recommended: false,
    },
  ];

  const handleToggle = () => {
    setIsYearly(!isYearly);
    if (!isYearly) launchConfetti(document.body, { count: 50, colors: ["#10b981"] }); // Subtle confetti on yearly
    // Recommender logic placeholder
    setRecommendedPlan(isYearly ? "Platinum" : "Premium");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-base-200 via-white/50 to-primary/30 py-20 overflow-hidden">
      {/* Enhanced Parallax Banner with Motion */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-15 parallax"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
        initial={{ y: 0 }}
        whileInView={{ y: -60 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30"></div>

      {/* Hero Banner Content with Recommender */}
      <div className="hero-content text-center relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, staggerChildren: 0.15 }}
        >
          <motion.h1
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-5xl md:text-7xl font-bold gradient-text mb-8 leading-tight"
          >
            Unlock <span className="text-primary">World-Class</span> UI Power
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-xl md:text-3xl text-base-content/70 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            Choose from flexible tiered plans tailored for startups to enterprises. Every plan delivers responsive, animated designs with seamless theme support and premium tools.
          </motion.p>
          {/* Enhanced Toggle Slider */}
          <motion.div
            className="flex justify-center items-center space-x-6 mb-16 p-4 bg-base-100/50 rounded-2xl"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-base-content/70 font-semibold">Monthly</span>
            <motion.div
              className="relative inline-block w-32 h-10 bg-base-300 rounded-full cursor-pointer overflow-hidden"
              onClick={handleToggle}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute top-1 left-1 w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xs"
                layout
                animate={{ x: isYearly ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                ${isYearly ? "99" : "9"}
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-around px-2 text-xs"
                layout
                initial={false}
              >
                <span className={isYearly ? "text-base-content/50" : "text-primary font-bold"}>/mo</span>
                <span className={isYearly ? "text-primary font-bold" : "text-base-content/50"}>/yr</span>
              </motion.div>
            </motion.div>
            <span className="text-base-content/70 font-semibold">
              Yearly {isYearly && <span className="text-success ml-1">(Save 17% + Bonus!)</span>}
            </span>
          </motion.div>
          {/* Recommender Badge */}
          <motion.div
            className="badge badge-warning badge-lg mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            🤖 AI Recommends: <strong>{recommendedPlan}</strong> for your needs
          </motion.div>
        </motion.div>
      </div>

      {/* Pricing Grid with Motion */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto relative z-10 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
      >
        {pricingOptions.map((option) => (
          <PricingOption
            key={option.id}
            option={option}
            isYearly={isYearly}
            onPurchase={() => launchConfetti(document.body, { count: 300, spread: 60 })}
            recommended={option.name === recommendedPlan}
          />
        ))}
      </motion.div>

      {/* Enhanced Feature Comparison Table */}
      <motion.div 
        className="mt-24 px-6 relative z-10 animate-fade-in"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-4xl font-bold text-center gradient-text mb-10">
          Detailed Feature Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
            <thead className="bg-primary/10">
              <tr>
                <th className="bg-transparent"></th>
                {pricingOptions.map((option) => (
                  <th
                    key={option.id}
                    className={`text-center py-4 ${option.popular ? "gradient-text font-bold" : ""}`}
                  >
                    {option.name}
                    {option.popular && (
                      <div className="badge badge-primary badge-lg mt-2 animate-pulse">
                        Most Popular
                      </div>
                    )}
                    {option.recommended && (
                      <div className="badge badge-warning badge-lg mt-1">
                        Recommended
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { cat: "Core Access", key: "access" },
                { cat: "Support Level", key: "support" },
                { cat: "Storage", key: "storage" },
                { cat: "Analytics", key: "analytics" },
                { cat: "Custom Builds", key: "custom" },
                { cat: "Integrations", key: "api" },
              ].map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-base-200/50" : ""}>
                  <td className="font-semibold py-4">{item.cat}</td>
                  {pricingOptions.map((option) => (
                    <td key={option.id} className="text-center py-4">
                      {option.features.some((f) => f.toLowerCase().includes(item.key))
                        ? <motion.span whileHover={{ scale: 1.2 }} className="text-success">✅</motion.span>
                        : <span className="text-base-content/50">❌</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <motion.p
          className="text-center mt-8 text-base-content/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          All plans include free updates & 30-day money-back guarantee. Questions?{" "}
          <a href="/contact" className="link link-primary">Contact Sales</a>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Pricing;