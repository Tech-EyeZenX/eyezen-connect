import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question: "What is EyeZenX Connect?",
    answer: "EyeZenX Connect is an AI-powered diagnostic platform that enables early disease detection through non-invasive retinal analysis, seamlessly integrating with healthcare systems for proactive patient care."
  },
  {
    question: "How accurate is the diagnosis?",
    answer: "Our AI models achieve 98.7% accuracy through continuous learning from millions of clinical cases, validated by FDA-cleared clinical trials."
  },
  {
    question: "Is my data secure?",
    answer: "We employ end-to-end encryption and comply with HIPAA/GDPR regulations, ensuring patient data remains confidential and secure at all times."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const answerVariants = {
  open: { 
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  closed: { 
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#E0EAF3]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-xl bg-white dark:bg-slate-800 text-black shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="text-lg font-semibold text-black dark:text-slate-200">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-6 w-6 text-black" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={answerVariants}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 dark:text-slate-400">
            Still have questions?{" "}
            <a href="#contact" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold">
              Contact our team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}