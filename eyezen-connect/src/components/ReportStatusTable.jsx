import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


// Icons
import { FileText, Clock, Plus, Upload } from "lucide-react";

// Animation
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify'
// React
import { useRef, useState } from "react"
import { FileUpload } from "./FileUpload";
import { useNavigate } from "react-router-dom";
const patients = [
    {
        patientName: "Rakesh Kumar",
        age: 57,
        scanTime: "10:32 AM",
        status: "Completed",
        action: "View Report",
    },
    {
        patientName: "Deepa",
        age: 48,
        scanTime: "11:30 AM",
        status: "Waiting",
        action: "View Progress",
    },
];

const AnimatedTableRow = ({ children }) => (
    <motion.tr
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="hover:bg-muted/50 transition-colors"
    >
        {children}
    </motion.tr>
);

export function ReportStatusTable() {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [imageName, setImageName] = useState('');
    const [innerDialogOpen, setInnerDialogOpen] = useState(false);

    const [formData, setFormData] = useState({
        patientName: '',
        age: '',
        gender: 'male',
        phone: '',
        visitType: '',
        eye: '',
        symptoms: {
            affected: "",
            duration: "",
        },
        knownConditions: [],
        knownConditionsOther: '',
        familyHistory: '',
        lifestyleRisks: [],
        lifestyleRiskOther: '',
        duration: '',
    });



    const symptomsList = [
        "Blurred Vision",
        "Difficulty Reading / Eye Strain",
        "Headache",
        "Double Vision",
        "Watering",
        "Redness",
        "Itching / Burning",
        "Light Sensitivity",
        "Flashes / Floaters",
        "Night Vision Difficulty",
        "Glare / Halos",
        "Dryness / Gritty Feeling",
        "Frequent Change in Spectacle Power",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleCondition = (condition) => {
        setFormData((prev) => {
            const list = [...prev.knownConditions];
            const index = list.indexOf(condition);
            if (index > -1) list.splice(index, 1);
            else list.push(condition);
            return { ...prev, knownConditions: list };
        });
    };

    const toggleLifestyleRisk = (risk) => {
        setFormData((prev) => {
            const list = [...prev.lifestyleRisks];
            const index = list.indexOf(risk);
            if (index > -1) list.splice(index, 1);
            else list.push(risk);
            return { ...prev, lifestyleRisks: list };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submit logic
    };
    const handleFileSelect = (file) => {
        setSelectedImage(file);
    };

    const navigate = useNavigate();
    const handleAnalyze = () => {
        setIsDialogOpen(!isDialogOpen);
        toast("Patient details sent to the doctor successfully!")
    };

    const HandleCloseDialog = () => {
        setInnerDialogOpen(!innerDialogOpen);
        setSelectedImage(null);
        setDescription('');
        setImageName('');
        fileInputRef.current.value = null; // Reset file input
        toast("Image upload cancelled.");
    }

    const HandleUploadImage = () => {
        setInnerDialogOpen(!innerDialogOpen);
        toast("Image uploaded successfully!");
    }

    const handleMultiSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        const selectedString = selectedOptions.join(',');

        setFormData(prev => ({
            ...prev,
            symptoms: {
                ...prev.symptoms,
                affected: selectedString
            }
        }));
    };

    return (
        <div className="p-6"> {/* Padding around the whole block */}
            <div className="rounded-md border overflow-hidden shadow-sm">
                <ToastContainer className="text-green-600" />
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[200px]">Patient Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Scan Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.map((patient, index) => (
                            <AnimatedTableRow key={patient.patientName} transition={{ delay: index * 0.1 }}>
                                <TableCell className="font-medium">{patient.patientName}</TableCell>
                                <TableCell>{patient.age}</TableCell>
                                <TableCell>{patient.scanTime}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={
                                            patient.status === "Waiting"
                                                ? "bg-amber-100 text-amber-800"
                                                : "bg-[#c0dcd6] text-[#123c36]"
                                        }
                                    >
                                        {patient.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary hover:text-primary/80 gap-1"
                                    >
                                        {patient.status === "Completed" ? (
                                            <FileText className="h-4 w-4" />
                                        ) : (
                                            <Clock className="h-4 w-4" />
                                        )}
                                        {patient.action}
                                    </Button>
                                </TableCell>
                            </AnimatedTableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Centered Add Patient Button */}
            <div className="flex justify-center mt-6 w-[90%]">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} className="w-full">
                    <DialogTrigger asChild>
                        <Button className="bg-[#00B07E] hover:bg-[#00B07E]/70 text-white px-6 py-2 rounded-md">
                            <Plus className="h-4 w-4 mr-2" /> Add Patient
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-h-[90vh] w-full md:min-w-[600px] lg:max-w-3xl xl:max-w-4xl overflow-y-auto mx-auto px-6">
                        <DialogHeader>
                            <DialogTitle className="text-xl">New Patient Details</DialogTitle>
                            <DialogDescription>
                                Fill in the patient details below.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            <div className="grid gap-4 py-4">
                                {/* Patient Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="patient-name">Patient Name</Label>
                                    <Input
                                        id="patient-name"
                                        name="patientName"
                                        placeholder="Enter patient name"
                                        value={formData.patientName}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Age & Gender */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="age">Age</Label>
                                        <Input
                                            type="number"
                                            id="age"
                                            name="age"
                                            placeholder="Enter patient age"
                                            value={formData.age}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <RadioGroup
                                            name="gender"
                                            value={formData.gender}
                                            onValueChange={(value) => setFormData({ ...formData, gender: value })}
                                            className="flex gap-4"
                                        >
                                            {["male", "female", "other"].map((gender) => (
                                                <div key={gender} className="flex items-center gap-2">
                                                    <RadioGroupItem value={gender} id={gender} />
                                                    <Label htmlFor={gender}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <Label htmlFor="phone-number">Phone Number</Label>
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center px-3 rounded-md border border-gray-300 bg-gray-100 text-sm text-gray-700">
                                            +91
                                        </span>
                                        <Input
                                            id="phone-number"
                                            name="phone"
                                            type="tel"
                                            placeholder="Enter patient phone number"
                                            className="flex-1"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Visit Type */}
                                <div>
                                    <Label htmlFor="visit-type">Visit Type</Label>
                                    <Input
                                        id="visit-type"
                                        name="visitType"
                                        placeholder="Follow-up"
                                        value={formData.visitType}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Select Eye */}
                                <div className="space-y-2">
                                    <Label>Select Eye</Label>
                                    <RadioGroup
                                        name="eye"
                                        value={formData.eye}
                                        onValueChange={(value) => setFormData({ ...formData, eye: value })}
                                        className="flex gap-4"
                                    >
                                        {["Right", "Left", "Both"].map((eye) => (
                                            <div key={eye} className="flex items-center gap-2">
                                                <RadioGroupItem value={eye.toLowerCase()} id={eye.toLowerCase()} />
                                                <Label htmlFor={eye.toLowerCase()}>{eye}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                {/* File Upload */}
                                <Dialog open={innerDialogOpen} onOpenChange={setInnerDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="gap-2 bg-[#00B07E] hover:bg-[#00B07E]/90 text-white px-6 py-4 rounded-md">
                                            <Upload className="h-8 w-6" />
                                            Upload the Image
                                        </Button>

                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px] max-h-[calc(100vh-2rem)] overflow-y-auto" >
                                        <DialogHeader className="text-center sm:text-left">
                                            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                                Upload Image
                                            </DialogTitle>
                                            <DialogDescription className="text-muted-foreground">
                                                Add visual documentation for better diagnosis
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="space-y-2">
                                            {/* Existing File Upload */}
                                            <FileUpload
                                                onFileSelect={handleFileSelect}
                                                selectedFile={selectedImage}
                                            />
                                            <Input
                                                ref={fileInputRef}
                                                type="file"
                                                className="hidden"
                                                accept="image/jpeg,image/png"
                                            />

                                            {/* New Image Name Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="image-name">Image Name</Label>
                                                <Input
                                                    id="image-name"
                                                    placeholder="Enter image name"
                                                    value={imageName}
                                                    onChange={(e) => setImageName(e.target.value)}
                                                />
                                            </div>

                                            {/* New Description Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="image-description">Image Description</Label>
                                                <textarea
                                                    id="image-description"
                                                    placeholder="Enter image description"
                                                    className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>

                                            <div className="sticky bottom-0 bg-background pt-4 -mx-6 px-6 border-t">
                                                <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                                                    <Button variant="destructive" className="w-full sm:w-auto"
                                                        onClick={HandleCloseDialog}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button className="w-full sm:w-auto gap-2 bg-primary/90 hover:bg-primary"
                                                        onClick={HandleUploadImage}

                                                    >
                                                        <Upload className="h-4 w-4" /> Upload
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                {/* Symptoms */}
                                <div className="space-y-2">
                                    <Label>Symptoms Noted</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Symptoms Dropdown */}
                                        <div className="relative">
                                            <Select>
                                                <SelectTrigger className="h-12 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                                                    <SelectValue
                                                        placeholder={
                                                            <span className="text-gray-500">Select symptoms...</span>
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg shadow-lg bg-white">
                                                    {symptomsList.map((symptom, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={symptom}
                                                            className="px-4 py-3 hover:bg-gray-50 focus:bg-blue-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0  "
                                                        >
                                                            {symptom}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Duration Dropdown */}
                                        <div className="relative">
                                            <select
                                                name="duration"
                                                value={formData.symptoms.duration}
                                                onChange={handleChange}
                                                className="w-full h-12 pl-4 pr-10 bg-white border border-gray-300 rounded-lg appearance-none hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-800"
                                            >
                                                <option value="" className="text-gray-500">Duration of symptoms</option>
                                                <option value="< 1 week">&lt; 1 week</option>
                                                <option value="1-2 weeks">1-2 weeks</option>
                                                <option value="2-4 weeks">2-4 weeks</option>
                                                <option value=">1 month">&gt;1 month</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Known Conditions */}
                                <div className="space-y-4">
                                    <Label className="text-gray-800 font-medium text-base">Known Conditions</Label>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Left Column: Conditions Checkboxes */}
                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <div className="grid grid-cols-2 gap-3">
                                                {["Diabetes", "Hypertension", "Glaucoma", "Myopia", "ARMD", "Others"].map((condition) => (
                                                    <div key={condition} className="flex items-center gap-2">
                                                        <Checkbox
                                                            id={condition}
                                                            name="knownConditions"
                                                            value={condition}
                                                            checked={formData.knownConditions.includes(condition)}
                                                            onCheckedChange={() => toggleCondition(condition)}
                                                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <Label htmlFor={condition} className="text-gray-700">{condition}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Column: Duration Dropdown */}
                                        <div className="relative">
                                            <select
                                                name="duration"
                                                value={formData.knownConditionsDuration}
                                                onChange={handleChange}
                                                className="w-full h-12 pl-4 pr-10 bg-white border border-gray-300 rounded-lg appearance-none hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-800"
                                            >
                                                <option value="" className="text-gray-500">Duration of condition</option>
                                                <option value="< 6 months">&lt; 6 months</option>
                                                <option value="6-12 months">6-12 months</option>
                                                <option value="> 12 months">&gt; 12 months</option>
                                                <option value="1-5 years">1-5 years</option>
                                                <option value="> 5 years">&gt; 5 years</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Others Input Field */}
                                    <div className="relative">
                                        <Input
                                            placeholder="If others, specify condition"
                                            name="knownConditionsOther"
                                            value={formData.knownConditionsOther}
                                            onChange={handleChange}
                                            className="w-full h-12 pl-4 pr-4 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-800"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center px-3">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Family History */}
                                <div className="space-y-2">
                                    <Label>Family History</Label>
                                    <Input
                                        name="familyHistory"
                                        placeholder="Eye disease, diabetes, etc."
                                        value={formData.familyHistory}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Lifestyle Risks */}
                                <div className="space-y-2">
                                    <Label>Lifestyle Risk Tags</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["Smoking", "Alcohol Use", "Long Screen Exposure", "Others"].map((risk) => (
                                            <div key={risk} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={risk}
                                                    name="lifestyleRisks"
                                                    value={risk}
                                                    checked={formData.lifestyleRisks.includes(risk)}
                                                    onCheckedChange={() => toggleLifestyleRisk(risk)}
                                                />
                                                <Label htmlFor={risk}>{risk}</Label>
                                            </div>
                                        ))}
                                    </div>
                                    <Input
                                        placeholder="If others, specify condition"
                                        name="lifestyleRiskOther"
                                        value={formData.lifestyleRiskOther}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Duration of Complaint */}
                                <div className="space-y-2">
                                    <Label>Duration of Complaint</Label>
                                    <Select
                                        value={formData.duration}
                                        onValueChange={(value) => setFormData({ ...formData, duration: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-6">1-6 months</SelectItem>
                                            <SelectItem value="6-12">6-12 months</SelectItem>
                                            <SelectItem value="1+">More than 1 year</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>

                        <div className="flex justify-center gap-2">
                            <Button onClick={handleAnalyze} className="bg-[#00B07E] hover:bg-[#00B07E]/70 text-white font-semibold px-6 py-2 rounded-md shadow-md transition duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                                Send for Analysis
                            </Button>

                        </div>

                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}