import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  ArrowLeft,
  User,
  ClipboardList,
  ClipboardCheck,
  Video,
  ClipboardEdit,
  Share2,
  DollarSign,
  Menu,
  X,
  Phone,
  Car,
  Stethoscope,
} from "lucide-react";
import { FaSignOutAlt } from 'react-icons/fa';

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { FinalReport } from './FinalReport';
import { toast } from 'react-toastify';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from '../utils/getInitials';

export function PatientReport() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({
    cataract: null | 79,
    normalAbnormal: 68,
    classification: 88,
    fundusValidation: 44,
    model2_1: true,
    model2_2: true
  });
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [imageUrl, setImageUrl] = useState("./test-image4.jpg");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!imageFile) return;

  //     try {
  //       setIsLoading(true);

  //       const endpoints = [
  //         { key: 'cataract', path: 'predict-cataract-no-cataract', port: 5005 },
  //         { key: 'normalAbnormal', path: 'predict-normal-abnormal', port: 5005 },
  //         { key: 'classification', path: 'predict-classification', port: 5005 },
  //         { key: 'fundusValidation', path: 'validate-fundus-image', port: 5005 },
  //         { key: 'model2_1', path: 'predict', port: 5006 },
  //         { key: 'model2_2', path: 'predict', port: 5007 }
  //       ];

  //       const responses = await Promise.all(
  //         endpoints.map(({ key, path, port }) => {
  //           const formData = new FormData();
  //           formData.append('file', imageFile);

  //           return fetch(`http://api.eyezenx.com:${port}/${path}`, {
  //             method: 'POST',
  //             body: formData
  //           });
  //         })
  //       );

  //       const data = await Promise.all(responses.map((res) => res.json()));

  //       setResults({
  //         cataract: data[0],
  //         normalAbnormal: data[1],
  //         classification: data[2],
  //         fundusValidation: data[3],
  //         model2_1: data[4],
  //         model2_2: data[5]
  //       });

  //     } catch (err) {
  //       setError(err.message || 'Failed to process image');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [imageFile]);

  // useEffect(() => {
  //   const loadTestImage = async () => {
  //     try {
  //       const response = await fetch('/test-image4.jpg');
  //       const blob = await response.blob();
  //       const testFile = new File([blob], 'test-image4.jpg', {
  //         type: blob.type,
  //         lastModified: Date.now()
  //       });

  //       // Create URL for the image preview
  //       const url = URL.createObjectURL(testFile);
  //       setImageUrl(url);
  //       setImageFile(testFile);
  //     } catch (err) {
  //       setError('Failed to load test image');
  //     }
  //   };

  //   if (!imageFile) {
  //     loadTestImage();
  //   }

  //   // Clean up function
  //   return () => {
  //     if (imageUrl) {
  //       URL.revokeObjectURL(imageUrl);
  //     }
  //   };
  // }, []);









  // 2. Print handler
  const reportRef = useRef(null);

 const downloadPDF = async () => {
  toast.info("Preparing report...");
  
  try {
    const element = reportRef.current;
    const originalStyles = {
      width: element.style.width,
      padding: element.style.padding,
      overflow: element.style.overflow
    };
    
    // Set print-optimized styles
    element.style.width = '210mm';
    element.style.padding = '15mm';
    element.style.overflow = 'visible';
    
    // Hide non-printable elements
    const noPrintElements = Array.from(element.querySelectorAll('.no-print'));
    noPrintElements.forEach(el => {
      el.style.visibility = 'hidden';
      el.style.height = '0';
      el.style.margin = '0';
      el.style.padding = '0';
    });
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.getHeight() - 20;
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      windowHeight: element.scrollHeight,
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const totalHeight = imgProps.height * pdfWidth / imgProps.width;
    
    let position = 0;
    let pageNum = 1;
    
    while (position < totalHeight) {
      if (pageNum > 1) pdf.addPage();
      
      pdf.addImage(
        imgData,
        'PNG',
        0,
        -position,
        pdfWidth,
        totalHeight
      );
      
      position += pageHeight;
      pageNum++;
    }
    
    // Add footer
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.setTextColor(150);
      pdf.text(
        `Patient Report - Page ${i}/${pageCount}`,
        pdfWidth / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }
    
    // Restore original styles
    element.style.width = originalStyles.width;
    element.style.padding = originalStyles.padding;
    element.style.overflow = originalStyles.overflow;
    noPrintElements.forEach(el => {
      el.style.visibility = '';
      el.style.height = '';
      el.style.margin = '';
      el.style.padding = '';
    });
    
    pdf.save(`patient-report-${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success("Report downloaded successfully!");
  } catch (error) {
    toast.error("Failed to generate PDF");
    console.error("PDF generation error:", error);
  }
};


  const handleConditionChange = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7fafc]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00CF94] mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Processing image analysis...</p>
      </div>
    );
  }

  if (error) {
    return (

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7fafc] p-6">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <X className="h-12 w-12 text-red-600" />
        </div>
        <p className="text-xl font-medium text-red-600 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }



  return (


    <div className="relative">
      {/* Print button outside the printable content */}
      {/* 3. Print button - MUST be outside the printable content */}
      <div className="no-print fixed bottom-6 right-6 z-50">
        <Button onClick={downloadPDF} className="bg-[#00694B] hover:bg-[#00563D] shadow-lg">
          Download PDF
        </Button>
      </div>
      <div ref={reportRef} className="min-h-screen w-full bg-[#f7fafc] print:bg-white">
        <main className="w-full flex-1 p-4 md:p-6 lg:p-8 bg-[#E5FBF7] print:bg-white">
          {/* Header with Back Button */}
          <div className="max-w-7xl mx-auto mb-6 no-print">
            <Button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 mb-6 bg-white text-[#00694B] hover:bg-[#00CF94]/10 border border-[#00CF94]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>

            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Patient Report</h1>
              <Badge variant="outline" className="bg-[#00CF94]/10 text-[#00694B] border-[#00CF94]">
                {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </div>

          {/* Patient Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto mb-8"
          >
            <Card className="rounded-xl shadow-sm border border-[#e2e8f0] bg-white">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <Avatar>
                    <AvatarFallback className="bg-[#00CF94] text-white font-medium">
                      {getInitials('Rakesh Sharma')}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <h2 className="text-xl md:text-2xl font-semibold text-[#00694B]">Rakesh Sharma</h2>
                      <Badge className="bg-[#00CF94]/10 text-[#00694B] px-3 py-1">
                        ID: EYE-2024-057
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Age:</span>
                        <span className="font-medium text-[#00A375]">57</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Gender:</span>
                        <span className="font-medium text-[#00A375]">Male</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-[#00A375]">+91-8825642531</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Visit Type:</span>
                        <span className="font-medium text-[#00A375]">Follow-up</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Clinical Report Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-1 bg-[#00CF94] rounded-full"></div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Clinical Report</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Image Section */}
              <div className="lg:w-1/2 bg-gray-50 flex items-center justify-center p-4">
                {imageUrl ? (
                  <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                    <img
                      src='./test-image4.jpg'
                      // src={imageUrl}
                      alt="Eye Report"
                      className="object-contain w-full h-full"
                    />
                    <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      Right Eye
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-80 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                    <span className="text-gray-500">Loading image...</span>
                  </div>
                )}
              </div>

              {/* Report Card */}
              <Card className="flex-1 border-0 shadow-none">
                <CardContent className="p-4 md:p-6 space-y-6">
                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs">Source</p>
                      <p className="font-medium">Mobile Upload</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs">Quality</p>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        Good
                      </Badge>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs">Eye</p>
                      <p className="font-medium">Right</p>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-[#00CF94]" />
                      Symptoms Noted
                    </h3>
                    <p className="text-sm text-gray-600 pl-6">Blurry vision, floaters, eye strain</p>
                  </div>

                  {/* Conditions Grid */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-[#00CF94]" />
                      Known Conditions
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm pl-2">
                      {['Diabetes', 'Hypertension', 'Glaucoma', 'Myopia', 'ARMD', 'Others'].map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={condition}
                            checked={selectedConditions.includes(condition)}
                            onCheckedChange={() => handleConditionChange(condition)}
                            className="border-gray-400 data-[state=checked]:bg-[#00CF94] data-[state=checked]:border-[#00CF94]"
                          />
                          <label htmlFor={condition} className="text-gray-700">{condition}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Family History */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <User className="h-4 w-4 text-[#00CF94]" />
                      Family History
                    </h3>
                    <p className="text-sm text-gray-600 pl-6">History of diabetes and glaucoma</p>
                  </div>

                  {/* Lifestyle Risks */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Car className="h-4 w-4 text-[#00CF94]" />
                      Lifestyle Risk Tags
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm pl-2">
                      {['Smoking', 'Alcohol Use', 'Long Screen Exposure', 'Others'].map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={condition}
                            checked={selectedConditions.includes(condition)}
                            onCheckedChange={() => handleConditionChange(condition)}
                            className="border-gray-400 data-[state=checked]:bg-[#00CF94] data-[state=checked]:border-[#00CF94]"
                          />
                          <label htmlFor={condition} className="text-gray-700">{condition}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <ClipboardEdit className="h-4 w-4 text-[#00CF94]" />
                      Duration of Complaint
                    </h3>
                    <p className="text-sm text-gray-600 pl-6">1-6 months</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Fundus Image Analysis Section */}
          <div className="max-w-7xl mx-auto mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-1 bg-[#00CF94] rounded-full"></div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Fundus Image Analysis</h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative overflow-hidden p-6 bg-white shadow-lg rounded-xl border border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl md:text-2xl text-[#00694B] font-semibold flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5" />
                    Diagnostic Analysis
                  </CardTitle>
                </CardHeader>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 text-sm py-1 px-3">
                    Quality of Image: {results?.fundusValidation?.quality || "GOOD"}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 text-sm py-1 px-3">
                    Presence of Cataract: {results?.cataract?.prediction || "NO"}
                  </Badge>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 text-sm py-1 px-3">
                    Status: {results?.normalAbnormal?.prediction || "ABNORMAL"}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 border-b pb-2">
                    Confidence Scores for Preliminary Diseases
                  </h2>

                  <div className="space-y-5">
                    {results?.classification?.all_confidences?.map((item, index) => (
                      <motion.div
                        key={item.category}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm md:text-base font-medium text-gray-700 capitalize">
                            {item.category.replace(/_/g, ' ')}
                          </span>
                          <span className={`text-sm font-bold ${item.score > 70 ? 'text-red-600' :
                            item.score > 40 ? 'text-amber-600' : 'text-green-600'
                            }`}>
                            {item.score}%
                          </span>
                        </div>

                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ease-out ${item.score > 70 ? 'bg-red-500' :
                              item.score > 40 ? 'bg-amber-500' : 'bg-green-500'
                              }`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Image Analysis Results */}
          <div className="max-w-7xl mx-auto space-y-2 mb-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-[#00CF94] rounded-full"></div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Detailed Analysis</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h- [80%]">
              {/* Model 2-1 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}

              >
                <Card className="overflow-hidden border border-gray-200 rounded-xl">
                  <CardHeader className="bg-[#00CF94]/10 p-1">
                    <CardTitle className="text-lg font-semibold text-[#00694B] flex items-center gap-2 m-0">
                      <Share2 className="h-5 w-5" />
                      Retinal Features Extraction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 -mt-2">
                    {/* {results.model2_1?.result?.image ? ( */}
                    {results.model2_1 ? (
                      <div className="relative aspect-square">
                        <img
                          src='./image2-report.jpg'
                          // src={`data:image/jpeg;base64,${results.model2_1.result.image}`}
                          alt="Optic Analysis"
                          className="object-contain w-full h-full rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                        <p className="text-gray-500">Processing analysis...</p>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-3">
                      Highlights key retinal structures including optic disc, blood vessels, and macula.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Model 2-2 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="overflow-hidden border border-gray-200 rounded-xl">
                  <CardHeader className="bg-[#00CF94]/10 p-1">
                    <CardTitle className="text-lg font-semibold text-[#00694B] flex items-center gap-2 m-0">
                      <ClipboardCheck className="h-5 w-5" />
                      Microaneurysm Detection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 -mt-2">
                    {results.model2_2 ? (
                      <div className="relative aspect-square">
                        <img
                          src='./test-image4.jpg'
                          // src={`data:image/jpeg;base64,${results.model2_2.result.image}`}
                          alt="Anomaly Detection"
                          className="object-contain w-full h-full rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                        <p className="text-gray-500">Processing analysis...</p>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-3">
                      Identifies microaneurysms, hemorrhages, and exudates indicative of diabetic retinopathy.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            <FinalReport />
          </div>

          {/* Action Buttons */}
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 justify-end mb-12 no-print">
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
            <Button className="bg-[#00694B] hover:bg-[#00563D]">
              Generate PDF Report
            </Button>
            <Button className="bg-[#00CF94] hover:bg-[#00B582]">
              Share with Patient
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}