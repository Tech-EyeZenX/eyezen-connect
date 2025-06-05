// src/components/EyeScanAnalysis.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownToLine,
  FileText,
  ScanEye,
  ChevronDown,
  Circle,
  Square,
  Triangle,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';

const EyeScanAnalysis = () => {
  const [selectedColors, setSelectedColors] = useState({
    "Pupillary Reflex": "green",
    "Pupillary Dilation": "green",
    "Conjuctival health": "green",
    "Redness and Inflammation Health": "yellow",
    "Conjuctival vasculature": "green",
    "Corneal opacity & symmetry": "green",
    "Corneal Health": "green",
    "Eye Dryness (meibomian Glands)": "yellow",
    "Normal Movements (any ptosis)": "green",
    "Swelling": "red"
  });

  const [showPicker, setShowPicker] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({
    pupil: true,
    conjunctiva: true,
    cornea: true,
    eyelids: true
  });

  const handleColorChange = (box, color) => {
    setSelectedColors(prev => ({ ...prev, [box]: color }));
    setShowPicker(null);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const colorStatus = {
    red: { label: "Critical", icon: <XCircle className="w-4 h-4" />, bg: "bg-red-500/20", border: "border-red-500" },
    yellow: { label: "Warning", icon: <AlertCircle className="w-4 h-4" />, bg: "bg-yellow-500/20", border: "border-yellow-500" },
    green: { label: "Normal", icon: <CheckCircle2 className="w-4 h-4" />, bg: "bg-green-500/20", border: "border-green-500" },
    blue: { label: "Needs Review", icon: <Circle className="w-3 h-3" />, bg: "bg-blue-500/20", border: "border-blue-500" }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <ScanEye className="w-8 h-8 text-indigo-600" />
            Eye Scan Analysis
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Detailed analysis of eye anatomy and physiological markers
          </p>
        </div>
       
      </div>


      {/* Main Content */}
      <div className="w-full gap-8">
        {/* Left Panel - Image with Markers */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">

          {/* Eye Image */}
          <div className="w-full ">
            <img src="./eye3.png" alt="Eye Scan" className="w-full h-full object-cover  rounded-lg shadow-lg bg-teal-100" />
          </div>

        {/* Right Panel - Analysis Details */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Scan Analysis</h2>

          {/* Status Summary */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-800 dark:text-slate-200">Overall Status</h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">Stable Condition</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {Object.entries(colorStatus).map(([color, status]) => (
                <div key={color} className={`flex flex-col items-center justify-center p-3 rounded-lg ${status.bg} border ${status.border}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${color === 'red' ? 'bg-red-500' : color === 'yellow' ? 'bg-yellow-500' : color === 'green' ? 'bg-green-500' : 'bg-blue-500'}`}>
                    {status.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{status.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Sections */}
          <div className="space-y-6">
            {/* Pupil Section */}
            <div className={`border rounded-lg overflow-hidden ${expandedSections.pupil ? 'border-slate-200 dark:border-slate-700' : 'border-transparent'}`}>
              <button
                className="flex items-center justify-between w-full p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                onClick={() => toggleSection('pupil')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Circle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-medium text-slate-800 dark:text-slate-200">Pupil Analysis</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSections.pupil ? 'rotate-180' : ''}`} />
              </button>

              {expandedSections.pupil && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 space-y-4"
                >
                  {["Pupillary Reflex", "Pupillary Dilation"].map((box) => (
                    <div key={box} className="flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300">{box}</span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded cursor-pointer relative ${selectedColors[box] === 'red' ? 'bg-red-500' : selectedColors[box] === 'yellow' ? 'bg-yellow-500' : selectedColors[box] === 'green' ? 'bg-green-500' : 'bg-blue-500'}`}
                          onClick={() => setShowPicker(showPicker === box ? null : box)}
                        />
                        {showPicker === box && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute z-10 mt-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg p-2 flex gap-1"
                          >
                            {['green', 'yellow', 'red', 'blue'].map(color => (
                              <div
                                key={color}
                                className={`w-6 h-6 rounded cursor-pointer ${color === 'red' ? 'bg-red-500' : color === 'yellow' ? 'bg-yellow-500' : color === 'green' ? 'bg-green-500' : 'bg-blue-500'}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleColorChange(box, color);
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${colorStatus[selectedColors[box]].bg} ${colorStatus[selectedColors[box]].border}`}>
                          {colorStatus[selectedColors[box]].label}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Pupils are responsive and symmetrical. No signs of dilation issues detected.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Conjunctiva Section */}
            <div className={`border rounded-lg overflow-hidden ${expandedSections.conjunctiva ? 'border-slate-200 dark:border-slate-700' : 'border-transparent'}`}>
              <button
                className="flex items-center justify-between w-full p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                onClick={() => toggleSection('conjunctiva')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Square className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-medium text-slate-800 dark:text-slate-200">Conjunctiva Analysis</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSections.conjunctiva ? 'rotate-180' : ''}`} />
              </button>

              {expandedSections.conjunctiva && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 space-y-4"
                >
                  {["Conjuctival health", "Redness and Inflammation Health", "Conjuctival vasculature"].map((box) => (
                    <div key={box} className="flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300">{box}</span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded cursor-pointer relative ${selectedColors[box] === 'red' ? 'bg-red-500' : selectedColors[box] === 'yellow' ? 'bg-yellow-500' : selectedColors[box] === 'green' ? 'bg-green-500' : 'bg-blue-500'}`}
                          onClick={() => setShowPicker(showPicker === box ? null : box)}
                        />
                        <span className={`text-xs px-2 py-1 rounded-full ${colorStatus[selectedColors[box]].bg} ${colorStatus[selectedColors[box]].border}`}>
                          {colorStatus[selectedColors[box]].label}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Mild inflammation detected in the nasal quadrant. Vascular patterns appear normal.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Cornea Section */}
            <div className={`border rounded-lg overflow-hidden ${expandedSections.cornea ? 'border-slate-200 dark:border-slate-700' : 'border-transparent'}`}>
              <button
                className="flex items-center justify-between w-full p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                onClick={() => toggleSection('cornea')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Triangle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-medium text-slate-800 dark:text-slate-200">Cornea Analysis</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSections.cornea ? 'rotate-180' : ''}`} />
              </button>

              {expandedSections.cornea && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 space-y-4"
                >
                  {["Corneal opacity & symmetry", "Corneal Health"].map((box) => (
                    <div key={box} className="flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300">{box}</span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded cursor-pointer relative ${selectedColors[box] === 'red' ? 'bg-red-500' : selectedColors[box] === 'yellow' ? 'bg-yellow-500' : selectedColors[box] === 'green' ? 'bg-green-500' : 'bg-blue-500'}`}
                          onClick={() => setShowPicker(showPicker === box ? null : box)}
                        />
                        <span className={`text-xs px-2 py-1 rounded-full ${colorStatus[selectedColors[box]].bg} ${colorStatus[selectedColors[box]].border}`}>
                          {colorStatus[selectedColors[box]].label}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Cornea appears clear and symmetrical. No signs of opacity or irregularities detected.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Eyelids Section */}
            <div className={`border rounded-lg overflow-hidden ${expandedSections.eyelids ? 'border-slate-200 dark:border-slate-700' : 'border-transparent'}`}>
              <button
                className="flex items-center justify-between w-full p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                onClick={() => toggleSection('eyelids')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-slate-800 dark:text-slate-200">Eyelids Analysis</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSections.eyelids ? 'rotate-180' : ''}`} />
              </button>

              {expandedSections.eyelids && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 space-y-4"
                >
                  {["Eye Dryness (meibomian Glands)", "Normal Movements (any ptosis)", "Swelling"].map((box) => (
                    <div key={box} className="flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300">{box}</span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded cursor-pointer relative ${selectedColors[box] === 'red' ? 'bg-red-500' : selectedColors[box] === 'yellow' ? 'bg-yellow-500' : selectedColors[box] === 'green' ? 'bg-green-500' : 'bg-blue-500'}`}
                          onClick={() => setShowPicker(showPicker === box ? null : box)}
                        />
                        <span className={`text-xs px-2 py-1 rounded-full ${colorStatus[selectedColors[box]].bg} ${colorStatus[selectedColors[box]].border}`}>
                          {colorStatus[selectedColors[box]].label}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Moderate swelling detected in upper right eyelid. Meibomian glands show signs of reduced function.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        </div>

      </div>

      {/* Recommendations */}
      <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Clinical Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Immediate Action
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Apply cold compress to reduce eyelid swelling. Schedule follow-up in 72 hours to monitor inflammation.
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Monitoring
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Track conjunctival inflammation daily. Use preservative-free artificial tears 4 times per day.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg p-4">
            <h3 className="font-medium text-green-800 dark:text-green-300 flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Maintenance
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Continue regular eye hygiene. Annual comprehensive eye exam recommended. UV protection in sunlight.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeScanAnalysis;