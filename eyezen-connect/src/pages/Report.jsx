import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Make sure you have this Badge component

export function Report() {
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({
    cataract: null,
    normalAbnormal: null,
    classification: null,
    fundusValidation: null,
    model2_1: null,
    model2_2: null
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setError(null);
    }
  };

 useEffect(() => {
  const fetchData = async () => {
    if (!imageFile) return;

    try {
      setIsLoading(true);

      // Define endpoint keys and their actual paths separately
      const endpoints = [
        { key: 'cataract', path: 'predict-cataract-no-cataract', port: 5005 },
        { key: 'normalAbnormal', path: 'predict-normal-abnormal', port: 5005 },
        { key: 'classification', path: 'predict-classification', port: 5005 },
        { key: 'fundusValidation', path: 'validate-fundus-image', port: 5005 },
        { key: 'model2_1', path: 'predict', port: 5006 },
        { key: 'model2_2', path: 'predict', port: 5007 }
      ];

      const responses = await Promise.all(
        endpoints.map(({ key, path, port }) => {
          const formData = new FormData();
          formData.append('file', imageFile);

          return fetch(`http://api.eyezenx.com:${port}/${path}`, {
            method: 'POST',
            body: formData
          });
        })
      );

      const data = await Promise.all(responses.map((res) => res.json()));

      setResults({
        cataract: data[0],
        normalAbnormal: data[1],
        classification: data[2],
        fundusValidation: data[3],
        model2_1: data[4],
        model2_2: data[5]
      });
    } catch (err) {
      setError(err.message || 'Failed to process image');
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, [imageFile]);


  const renderBoundingBoxes = (detections, color) => {
    return detections.map((detection, index) => (
      <div
        key={index}
        className="absolute border-2 rounded-lg"
        style={{
          borderColor: color,
          left: `${detection.bbox[0]}px`,
          top: `${detection.bbox[1]}px`,
          width: `${detection.bbox[2] - detection.bbox[0]}px`,
          height: `${detection.bbox[3] - detection.bbox[1]}px`
        }}
      >
        <span className="text-xs font-bold px-1 absolute -top-4 left-0" style={{ color }}>
          {(detection.score || detection.confidence * 100).toFixed(1)}%
        </span>
      </div>
    ));
  };

  if (!imageFile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-96 space-y-4"
      >
        <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-sm">Select Fundus Image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        <p className="text-gray-500 text-sm">Supported formats: JPEG, PNG</p>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-lg font-medium">Processing image...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold py-12 text-center text-blue-400">Advanced Diagnostic Report</h1>

      {/* Model Images */}
      <div className="">
        {/* Model 2-1 */}
        <motion.div initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6 relative overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Model 2-1</span>
              Optic Disc & Cup Analysis
            </h2>
            {results.model2_1?.result?.image && (
              <div className="relative">
                <img
                  src={`data:image/jpeg;base64,${results.model2_1.result.image}`}
                  alt="Optic Analysis"
                  className="w-full h-full rounded-lg"
                />
            
              </div>
            )}
          </Card>
        </motion.div>

        {/* Model 2-2 */}
        <motion.div initial={{ x: 20 }} animate={{ x: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-6 relative overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Model 2-2</span>
              Detailed Anomaly Detection
            </h2>
            {results.model2_2?.result?.image && (
              <div className="relative">
                <img
                  src={`data:image/jpeg;base64,${results.model2_2.result.image}`}
                  alt="Anomaly Detection"
                  className="w-full h-full rounded-lg"
                />
           
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Diagnostic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
        <ResultCard title="Fundus Validation" value={results.fundusValidation?.prediction} confidence={results.fundusValidation?.confidence} delay={0.4} />
        <ResultCard title="Cataract Detection" value={results.cataract?.prediction} confidence={results.cataract?.confidence} delay={0.5} />
        <ResultCard title="Abnormality" value={results.normalAbnormal?.prediction} confidence={results.normalAbnormal?.confidence} delay={0.6} />
        <ResultCard title="Primary Condition" value={results.classification?.prediction} confidence={results.classification?.confidence} delay={0.7} />
      </div>

      {/* Detailed Confidence Breakdown */}
      {results.classification?.all_confidences && (
        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Detailed Condition Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.classification.all_confidences.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg px-8 pb-12">
                  <div className="flex-1">
                    <p className="font-medium">{item.category.replace(/_/g, ' ')}</p>
                    <p className="text-sm text-muted-foreground">Confidence level</p>
                  </div>
                  <span className="text-lg font-bold text-primary">{item.score}%</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}

const ResultCard = ({ title, value, confidence, delay }) => (
  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay }}>
    <Card className="p-4 h-full">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {confidence && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Confidence:</span>
          <Badge variant="outline" className="text-green-600">
            {confidence}%
          </Badge>
        </div>
      )}
    </Card>
  </motion.div>
);
