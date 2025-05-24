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

    const [formData, setFormData] = useState({
        patientName: '',
        age: '',
        gender: 'male',
        phone: '',
        visitType: '',
        eye: '',
        symptoms: '',
        knownConditions: [],
        knownConditionsOther: '',
        familyHistory: '',
        lifestyleRisks: [],
        lifestyleRiskOther: '',
        duration: '',
    });

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
       navigate("/report")
    };



    return (
        <div className="p-6"> {/* Padding around the whole block */}
            <div className="rounded-md border overflow-hidden shadow-sm">
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
                        <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
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
                                <div className="space-y-2">
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
                                </div>

                                {/* Symptoms */}
                                <div className="space-y-2">
                                    <Label>Symptoms Noted</Label>
                                    <Input
                                        name="symptoms"
                                        placeholder="Blurry vision, floaters, eye strain, etc."
                                        value={formData.symptoms}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Known Conditions */}
                                <div className="space-y-2">
                                    <Label>Known Conditions</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["Diabetes", "Hypertension", "Glaucoma", "Myopia", "ARMD", "Others"].map((condition) => (
                                            <div key={condition} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={condition}
                                                    name="knownConditions"
                                                    value={condition}
                                                    checked={formData.knownConditions.includes(condition)}
                                                    onCheckedChange={() => toggleCondition(condition)}
                                                />
                                                <Label htmlFor={condition}>{condition}</Label>
                                            </div>
                                        ))}
                                    </div>
                                    <Input
                                        placeholder="If others, specify condition"
                                        name="knownConditionsOther"
                                        value={formData.knownConditionsOther}
                                        onChange={handleChange}
                                    />
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
                            <Button onClick={handleAnalyze} className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                                Analyze
                            </Button>
                        </div>

                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}