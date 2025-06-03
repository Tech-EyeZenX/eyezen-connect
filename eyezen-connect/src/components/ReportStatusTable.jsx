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
import { NewPatientDialog } from "./NewPatientDialog";
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
        action: "In Progress",
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

            <div>
                <NewPatientDialog />
            </div>
        </div>
    );
}