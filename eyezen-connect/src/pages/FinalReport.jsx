import { useState, useRef } from "react";
import { EyeHealthSummary } from "../components/EyeHealthSummary";
import { TextSection } from "../components/TextAction";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import "../styles/print.css";
export function FinalReport() {
  const [impression, setImpression] = useState('');
  const [managementPlan, setManagementPlan] = useState('');
  const [patientAdvice, setPatientAdvice] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-10">
      <div  className="printable-area">
        <EyeHealthSummary />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TextSection
            title="Impression"
            value={impression}
            onChange={(e) => setImpression(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <TextSection
            title="Management Plan"
            value={managementPlan}
            onChange={(e) => setManagementPlan(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <TextSection
            title="Patient Advice"
            value={patientAdvice}
            onChange={(e) => setPatientAdvice(e.target.value)}
          />
        </motion.div>
      </div>

      
    </div>
  );
}