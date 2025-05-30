import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { FileUpload } from "./FileUpload";
import { ToastContainer, toast } from 'react-toastify'

export function NewPatientDialog() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [innerDialogOpen, setInnerDialogOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        patientName: "",
        age: "",
        gender: "",
        phone: "",
        visitType: "",
        eye: "",
        symptoms: {
            selectedSymptom: "",
            duration: ""
        },
        knownConditions: [],
        knownConditionsOther: "",
        familyHistory: "",
        lifestyleRisks: [],
        lifestyleRiskOther: "",
        duration: ""
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
        "Frequent Change in Spectacle Power"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleCondition = (condition) => {
        setFormData(prev => {
            const conditions = [...prev.knownConditions];
            if (conditions.includes(condition)) {
                return { ...prev, knownConditions: conditions.filter(c => c !== condition) };
            } else {
                return { ...prev, knownConditions: [...conditions, condition] };
            }
        });
    };

    const toggleLifestyleRisk = (risk) => {
        setFormData(prev => {
            const risks = [...prev.lifestyleRisks];
            if (risks.includes(risk)) {
                return { ...prev, lifestyleRisks: risks.filter(r => r !== risk) };
            } else {
                return { ...prev, lifestyleRisks: [...risks, risk] };
            }
        });
    };

    const handleFileSelect = (file) => {
        // Handle file selection
        setSelectedImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setIsDialogOpen(false);
    };

    const handleAnalyze = () => {
        console.log("Sending for analysis:", formData);
        setIsDialogOpen(false);
        toast("Patient details sent to the doctor successfully!")
    };

    const handleFileBoxClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const HandleCloseDialog = () => {
        setInnerDialogOpen(!innerDialogOpen);
        setSelectedImage(null);
        setDescription('');
        setImageName('');
        fileInputRef.current.value = null; // Reset file input
        toast("Image upload cancelled.");
    };

    const HandleUploadImage = () => {
        console.log("Uploading image:", imageName, description);
        setInnerDialogOpen(false);
        toast("Image uploaded successfully!");
    };

    return (
        <div className="flex justify-center mt-6 w-[90%]">
            <ToastContainer />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                        <div className="grid gap-4">
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
                            <div className="space-y-2">
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
                            <div className="space-y-2">
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

                            {/* File Upload Button */}
                            <div className="space-y-2">
                                <Label>Upload Image</Label>
                                <Dialog open={innerDialogOpen} onOpenChange={setInnerDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="gap-2 bg-[#00B07E] hover:bg-[#00B07E]/90 text-white px-6 py-4 rounded-md w-full">
                                            <Upload className="h-6 w-6" />
                                            Upload the Image
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px] max-h-[calc(100vh-2rem)] overflow-y-auto">
                                        <DialogHeader className="text-center sm:text-left">
                                            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#00B07E] to-purple-600 bg-clip-text text-transparent">
                                                Upload Image
                                            </DialogTitle>
                                            <DialogDescription className="text-muted-foreground">
                                                Add visual documentation for better diagnosis
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="space-y-4 py-4">
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
                                                    className="w-full px-3 py-2 border rounded-md min-h-[100px] focus:ring-2 focus:ring-[#00B07E] focus:outline-none"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>

                                            <div className="sticky bottom-0 bg-background pt-4 -mx-6 px-6 border-t">
                                                <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full sm:w-auto"
                                                        onClick={HandleCloseDialog}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        className="w-full sm:w-auto gap-2 bg-[#00B07E] hover:bg-[#00B07E]/90"
                                                        onClick={HandleUploadImage}
                                                    >
                                                        <Upload className="h-4 w-4" /> Upload
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Symptoms */}
                            <div className="space-y-3">
                                <Label className="text-base font-medium">Symptoms Noted</Label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Symptoms Dropdown */}
                                    <div className="space-y-2">
                                        <Label>Select Symptoms</Label>
                                        <Select
                                            value={formData.symptoms.selectedSymptom}
                                            onValueChange={(value) => setFormData({
                                                ...formData,
                                                symptoms: {
                                                    ...formData.symptoms,
                                                    selectedSymptom: value
                                                }
                                            })}
                                        >
                                            <SelectTrigger className="w-full h-12 text-left">
                                                <SelectValue placeholder="Select symptoms..." />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-60 overflow-y-auto">
                                                {symptomsList.map((symptom, index) => (
                                                    <SelectItem key={index} value={symptom}>
                                                        {symptom}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Duration Dropdown */}
                                    <div className="space-y-2">
                                        <Label>Duration</Label>
                                        <Select
                                            value={formData.symptoms.duration}
                                            onValueChange={(value) => setFormData({
                                                ...formData,
                                                symptoms: {
                                                    ...formData.symptoms,
                                                    duration: value
                                                }
                                            })}
                                        >
                                            <SelectTrigger className="w-full h-12 text-left">
                                                <SelectValue placeholder="Duration of symptoms" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="< 1 week">&lt; 1 week</SelectItem>
                                                <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                                                <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                                                <SelectItem value=">1 month">&gt;1 month</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Known Conditions */}
                            <div className="space-y-4">
                                <Label className="text-base font-medium">Known Conditions</Label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Column: Conditions Checkboxes */}
                                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            {["Diabetes", "Hypertension", "Glaucoma", "Myopia", "ARMD", "Others"].map(
                                                (condition) => (
                                                    <div key={condition} className="flex items-center gap-3">
                                                        <Checkbox
                                                            id={`condition-${condition}`}
                                                            checked={formData.knownConditions.includes(condition)}
                                                            onCheckedChange={() => toggleCondition(condition)}
                                                            className="h-5 w-5 border-gray-300 text-[#00B07E]"
                                                        />
                                                        <Label htmlFor={`condition-${condition}`} className="text-sm">
                                                            {condition}
                                                        </Label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Column: Duration Dropdown */}
                                    <div className="space-y-2">
                                        <Label>Duration of Condition</Label>
                                        <Select
                                            value={formData.duration}
                                            onValueChange={(value) => setFormData({ ...formData, duration: value })}
                                        >
                                            <SelectTrigger className="w-full h-12 text-left">
                                                <SelectValue placeholder="Select duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="< 6 months">&lt; 6 months</SelectItem>
                                                <SelectItem value="6-12 months">6-12 months</SelectItem>
                                                <SelectItem value="> 12 months">&gt; 12 months</SelectItem>
                                                <SelectItem value="1-5 years">1-5 years</SelectItem>
                                                <SelectItem value="> 5 years">&gt; 5 years</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Conditionally show "Other" input field */}
                                {formData.knownConditions.includes("Others") && (
                                    <div className="space-y-2">
                                        <Label>Specify Other Condition</Label>
                                        <Input
                                            placeholder="Enter other condition"
                                            name="knownConditionsOther"
                                            value={formData.knownConditionsOther}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}
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
                                                id={`risk-${risk}`}
                                                checked={formData.lifestyleRisks.includes(risk)}
                                                onCheckedChange={() => toggleLifestyleRisk(risk)}
                                            />
                                            <Label htmlFor={`risk-${risk}`}>{risk}</Label>
                                        </div>
                                    ))}
                                </div>
                                {formData.lifestyleRisks.includes("Others") && (
                                    <Input
                                        placeholder="Specify other lifestyle risk"
                                        name="lifestyleRiskOther"
                                        value={formData.lifestyleRiskOther}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>

                            {/* Duration of Complaint */}
                            <div className="space-y-2">
                                <Label>Duration of Complaint</Label>
                                <Select
                                    value={formData.duration}
                                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                                >
                                    <SelectTrigger className="w-full h-12 text-left">
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

                        <div className="flex justify-center gap-4 pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="px-8 py-3"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                className="bg-[#00B07E] hover:bg-[#00B07E]/90 text-white px-8 py-3 font-semibold"
                                onClick={handleAnalyze}
                            >
                                Send for Analysis
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}