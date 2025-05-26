import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Stethoscope,
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
} from "lucide-react";
import { FaSignOutAlt } from 'react-icons/fa';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

export function PatientReport() {
  const [isOpen, setIsOpen] = useState(false);
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
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [confidenceData, setConfidenceData] = useState([])
  const navigate = useNavigate();
  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/patient-overview", icon: User, label: "Patients Overview" },
    { path: "/diagnosis-result", icon: ClipboardList, label: "Diagnosis Result" },
    { path: "/test-results", icon: ClipboardCheck, label: "Test Results" },
    { path: "/telephthal-tools", icon: Video, label: "Telephthal Tools" },
    { path: "/treatment-plan", icon: ClipboardEdit, label: "Treatment Plan" },
    { path: "/referrals", icon: Share2, label: "Referrals" },
    { path: "/billing-tools", icon: DollarSign, label: "Billing Tools" }
  ];
  
  
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
  
  
  useEffect(() => {
    const loadTestImage = async () => {
      try {
        // Fetch the test image from public directory
        const response = await fetch('/test-image4.jpg');
        const blob = await response.blob();
        
        // Create a File object from the blob
        const testFile = new File([blob], 'test-image4.jpg', {
          type: blob.type,
          lastModified: Date.now()
        });
        
        // Set the file to trigger processing
        setImageFile(testFile);
      } catch (err) {
        setError('Failed to load test image');
      }
    };
    
    // Only load test image if no file is selected
    if (!imageFile) {
      loadTestImage();
    }
  }, []);
  
  // function to handle condition selection
  const handleConditionChange = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };
  // function to handle modifying grading and redirect to the Final Report page
  const HandleModifyGrading = ()=>{
     navigate('/patient-final-report')
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
    <div className="flex min-h-screen w-full flex-col bg-[#f7fafc]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 h-full w-64 border-r bg-gradient-to-b from-[#00694B] via-[#00694B] to-[#00CF94] shadow-xl">
        <div className="flex h-full flex-col gap-4 p-4">
          <div className="flex items-center gap-3 pb-4 border-b border-white/20">
            <Stethoscope className="h-8 w-8 text-white" />
            <h1 className="text-xl font-bold text-white tracking-tight">EYEZENX ANALYTICS</h1>
          </div>
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-200 group"
              >
                <item.icon className="h-5 w-5 text-white/80 group-hover:text-white" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 bg-white/90 shadow-lg">
            <Menu className="h-5 w-5 text-[#00694B]" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-gradient-to-b from-[#00694B] via-[#00694B] to-[#00CF94]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/20">
              <div className="flex items-center gap-3">
                <Stethoscope className="h-7 w-7 text-white" />
                <h2 className="text-lg font-bold text-white">EYEZENX</h2>
              </div>
              <SheetClose className="text-white hover:opacity-80">
                <X className="h-5 w-5" />
              </SheetClose>
            </div>
            <nav className="flex-1 px-2 py-4">
              {navItems.map((item) => (
                <SheetClose key={item.path} asChild>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-200 group"
                  >
                    <item.icon className="h-5 w-5 text-white/80 group-hover:text-white" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 bg-[#E5FBF7]">
        {/* Header */}
       

        {/* Patient Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto flex gap-2 flex-col"
        >
          <h1 className='font-semibold text-2xl'>Patient Report</h1>
          <Card className="rounded-xl shadow-sm border border-[#e2e8f0]">

            <CardContent className="p-3">

              <div className="flex flex-col md:flex-row items-start gap-6">
                <Avatar className="h-20 w-20 border-2 border-[#00694B]">
                  <AvatarImage src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?semt=ais_hybrid&w=740" />
                </Avatar>
                <div className="space-y-2 flex-1">
                  <h2 className="text-xl font-semibold text-[#00694B]">Rakesh Sharma</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Age:</span>
                      <span className="font-medium text-[#00CF94]">57</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Gender:</span>
                      <span className="font-medium text-[#00CF94]">Male</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-[#00CF94]">+91-8825642531</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Visit Type:</span>
                      <span className="font-medium text-[#00CF94]">Follow-up</span>
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
          className="max-w-6xl mx-auto flex gap-2 flex-col py-10"
        >
          <h1 className="text-2xl font-bold text-gray-800">Clinical Report</h1>

          <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image Section */}
            <div className="md:w-1/2">
              <img
                src="./eye-report.jpg"
                alt="Eye Report"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Report Card */}
            <Card className="flex-1 p-6 space-y-6">
              <CardContent className="space-y-6">

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Source</p>
                    <p className="font-medium">Mobile Upload</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Quality</p>
                    <Badge variant="outline" className="text-green-600">Good</Badge>
                  </div>
                  <div>
                    <p className="text-gray-500">Eye</p>
                    <p className="font-medium">Right</p>
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Symptoms Noted</h3>
                  <p className="text-sm text-gray-600">Blurry vision, floaters, eye strain, etc.</p>
                </div>

                {/* Conditions Grid */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Known Conditions</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    {['Diabetes', 'Hypertension', 'Glaucoma', 'Myopia', 'ARMD', 'Others'].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={selectedConditions.includes(condition)}
                          onCheckedChange={() => handleConditionChange(condition)}
                        />
                        <label htmlFor={condition} className="text-gray-700">{condition}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Family History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Family History</h3>
                  <p className="text-sm text-gray-600">Eye disease, diabetes, etc.</p>
                </div>

                {/* Lifestyle Risks */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Lifestyle Risk Tags</h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {['Smoking', 'Alcohol Use', 'Long Screen Exposure', 'Others'].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox id={condition}
                          checked={selectedConditions.includes(condition)}
                          onCheckedChange={() => handleConditionChange(condition)} />
                        <label htmlFor={condition} className="text-gray-700">{condition}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Duration of Complaint</h3>
                  <p className="text-sm text-gray-600">1-6 months</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>



        {/* Fundus Image Analysis Section */}
        <div className="max-w-6xl mx-auto flex gap-2 flex-col py-10">
          <h1 className="text-2xl font-bold text-gray-800">Fundus Image Analysis</h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="relative group overflow-hidden px-6 py-4 shadow-lg bg-white rounded-lg space-y-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-green-600 font-semibold">
                  Fundus Image Analysis
                </CardTitle>
              </CardHeader>

              <div className="flex flex-col gap-3">
                <Badge variant="outline" className="w-fit bg-green-100 text-green-800 text-sm">
                  Quality of Image: {results?.fundusValidation?.quality || "GOOD"}
                </Badge>
                <Badge variant="outline" className="w-fit bg-blue-100 text-blue-800 text-sm">
                  Presence of Cataract: {results?.cataract?.prediction || "NO"}
                </Badge>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Confidence Scores for Preliminary Diseases
                </h2>

                <div className="space-y-4">
                  {results?.classification?.all_confidences?.map((item, index) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-teal-600 capitalize">
                          {item.category.replace(/_/g, ' ')}
                        </span>
                        <span className="text-sm font-semibold text-teal-600">
                          {item.score}%
                        </span>
                      </div>

                      <div className="w-full h-2 bg-teal-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full transition-all duration-300 ease-in-out"
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


        <div className="max-w-6xl mx-auto space-y-6 py-10">
          {/* Model 2-1 */}
          <motion.div initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 relative overflow-hidden">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-500">

                Retinal Features Extraction
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
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-500">

                Microaneurysm Detection
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
         
         <div className='max-w-6xl mx-auto flex justify-center items-center'>

        <button
          className="px-6 py-2 bg-[#11C099] hover:bg-[#0fa887] text-white font-medium rounded-md shadow transition duration-200 "
          onClick={HandleModifyGrading}

        >
         Modify Grading
        </button>
         </div>


      </main>
    </div>
  );
}