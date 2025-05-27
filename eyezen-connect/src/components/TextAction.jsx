import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "../styles/print.css"
export const TextSection = ({ title, value, onChange, isGeneratingPDF }) => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="printable-section"
    >
      <Card className="mb-6 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <div className="h-[2px] bg-gradient-to-r from-blue-300 to-indigo-300 mt-2" />
        </CardHeader>
        
        <CardContent className="p-4">
          {isGeneratingPDF ? (
            <div className="font-mono text-slate-700 whitespace-pre-wrap p-4 bg-slate-50 rounded-lg">
              {value}
            </div>
          ) : (
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              className="w-full p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 resize-none transition-all duration-300 bg-white"
              rows={8}
              value={value}
              onChange={onChange}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};