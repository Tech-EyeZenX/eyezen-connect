import { useState, useRef } from "react";
import { EyeHealthSummary } from "../components/EyeHealthSummary";
import { TextSection } from "../components/TextAction";
import jsPDF from "jspdf";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
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

      <motion.div
        className="flex justify-center no-print"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => window.print()}
          className="bg-[#0CB5A7] hover:bg-[#0CB5A7]/90 text-white px-8 py-4 rounded-xl
                   shadow-lg transition-all duration-300 font-semibold text-lg"
       
        >
          { 'Download Report'}
        </Button>
      </motion.div>
    </div>
  );
}