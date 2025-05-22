import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";

export function ReportModel2() {
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({
    model2_1: null,
    model2_4: null,
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

        const endpoints = ['2-1/predict', '2-4/predict'];
        const responses = await Promise.all(
          endpoints.map((endpoint) => {
            const formData = new FormData();
            formData.append('file', imageFile);
            return fetch(`https://api.eyezenx.com/model2/${endpoint}/`, {
              method: 'POST',
              body: formData,
            });
          })
        );

        const data = await Promise.all(
          responses.map(async (response) => {
            if (!response.ok) throw new Error('API request failed');
            return await response.json();
          })
        );

        setResults({
          model2_1: data[0],
          model2_4: data[1],
        });
      } catch (err) {
        setError(err.message || 'Failed to process image');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [imageFile]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4"
    >
      {/* Image with Bounding Boxes */}
      <Card className="p-4 relative">
        <h2 className="text-xl font-semibold mb-4">Detected Structures</h2>
        <div className="relative">
          {results.model2_1?.result?.image && (
            <img
              src={`data:image/jpeg;base64,${results.model2_1.result.image}`}
              alt="Analyzed Fundus"
              className="w-full h-auto rounded-lg"
            />
          )}
          
          {/* Render Bounding Boxes */}
          {results.model2_1?.result?.Classes && Object.entries(results.model2_1.result.Classes).map(([className, boxes]) => (
            boxes.map((box, index) => (
              <div
                key={`${className}-${index}`}
                className="absolute border-2 rounded-lg"
                style={{
                  borderColor: className === 'Optic Disc' ? '#FF0000' : '#00FF00',
                  left: `${box.bbox[0]}px`,
                  top: `${box.bbox[1]}px`,
                  width: `${box.bbox[2] - box.bbox[0]}px`,
                  height: `${box.bbox[3] - box.bbox[1]}px`,
                }}
              >
                <span 
                  className="text-xs font-bold px-1 absolute -top-4 left-0"
                  style={{ color: className === 'Optic Disc' ? '#FF0000' : '#00FF00' }}
                >
                  {className} ({(box.score * 100).toFixed(1)}%)
                </span>
              </div>
            ))
          ))}
        </div>
      </Card>

      {/* Results Details */}
      <div className="space-y-6">
        <motion.div
          initial={{ x: 20 }}
          animate={{ x: 0 }}
        >
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Detection Details</h2>
            <div className="space-y-3">
              {results.model2_1?.result?.Classes && Object.entries(results.model2_1.result.Classes).map(([className, boxes]) => (
                boxes.map((box, index) => (
                  <div key={`${className}-${index}`} className="space-y-1">
                    <h3 className="font-medium">{className} #{index + 1}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Confidence: <span className="font-semibold">{(box.score * 100).toFixed(1)}%</span></div>
                      <div>Coordinates: 
                        <span className="font-mono ml-1">
                          {box.bbox.map(n => Math.round(n)).join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Add Model 2-4 results display here if needed */}
      </div>
    </motion.div>
  );
}