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
import { useRef } from "react"
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

    const handleFileBoxClick = () => {
        fileInputRef.current?.click();
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
            <div className="flex justify-center mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
                            <Plus className="h-4 w-4 mr-2" /> Add Patient
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-h-[90vh] w-full overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-xl">New Patient Details</DialogTitle>
                            <DialogDescription>
                                Fill in the patient details below.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="patient-name">Patient Name</Label>
                                    <Input id="patient-name" placeholder="Rakesh Kumar" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="age">Age</Label>
                                        <Input type="number" id="age" placeholder="35" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <RadioGroup defaultValue="male" className="flex gap-4">
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="male" id="male" />
                                                <Label htmlFor="male">Male</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="female" id="female" />
                                                <Label htmlFor="female">Female</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone-number">Phone Number</Label>
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center px-3 border rounded-md bg-muted text-sm">
                                            +91
                                        </span>
                                        <Input id="phone-number" placeholder="8825625412" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="visit-type">Visit Type</Label>
                                    <Input id="visit-type" placeholder="Follow-up" />
                                </div>

                               

                                <div className="space-y-2">
                                    <Label>Select Eye</Label>
                                    <RadioGroup className="flex gap-4">
                                        {["Right", "Left", "Both"].map((eye) => (
                                            <div key={eye} className="flex items-center gap-2">
                                                <RadioGroupItem value={eye.toLowerCase()} id={eye.toLowerCase()} />
                                                <Label htmlFor={eye.toLowerCase()}>{eye}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                             

                                <div className="space-y-2">
                                    <Label>Upload Image</Label>
                                    <div
                                        onClick={handleFileBoxClick}
                                        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors group"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                                            <p className="text-muted-foreground">
                                                <span className="text-primary">Drag & drop files</span> or Browse
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Supported formats: JPEG, PNG
                                            </p>
                                        </div>
                                    </div>
                                    <Input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept="image/jpeg,image/png"
                                    />
                                </div>
                            </div>

                           
                         

                            {/* Add new medical history fields */}
                            <div className="space-y-2">
                                <Label>Symptoms Noted</Label>
                                <Input placeholder="Blurry vision, floaters, eye strain, etc." />
                            </div>

                            <div className="space-y-2">
                                <Label>Known Conditions</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Diabetes", "Hypertension", "Glaucoma", "Myopia", "ARMD", "Others"].map((condition) => (
                                        <div key={condition} className="flex items-center gap-2">
                                            <Checkbox id={condition} />
                                            <Label htmlFor={condition} className="text-sm">
                                                {condition}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                <Input placeholder="If others, specify condition" />
                            </div>

                            <div className="space-y-2">
                                <Label>Family History</Label>
                                <Input placeholder="Eye disease, diabetes, etc." />
                            </div>

                            <div className="space-y-2">
                                <Label>Lifestyle Risk Tags</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Smoking", "Alcohol Use", "Long Screen Exposure", "Others"].map((risk) => (
                                        <div key={risk} className="flex items-center gap-2">
                                            <Checkbox id={risk} />
                                            <Label htmlFor={risk} className="text-sm">
                                                {risk}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                <Input placeholder="If others, specify condition" />
                            </div>

                            <div className="space-y-2">
                                <Label>Duration of Complaint</Label>
                                <Select>
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

                        <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                                <Plus className="h-4 w-4" /> Add Patient
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}