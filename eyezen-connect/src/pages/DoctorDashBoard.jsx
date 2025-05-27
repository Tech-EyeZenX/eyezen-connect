import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
    Settings,
    Menu,
    X,
    History,
    Check,
    DollarSign,
    Clock,
    FileText,
    AlertCircle,
    Activity,
    Thermometer,
    Eye,
    Smartphone,
    ClipboardList,     // For Diagnosis Result
    ClipboardCheck,    // For Test Results
    Video,             // For Telephthal tools
    ClipboardEdit,     // For Treatment plan
    Share2,             // For Referrals
    User2
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FaSignOutAlt } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export function DoctorDashBoard() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    

        {
            path: "/diagnosis-result",
            icon: ClipboardList,
            label: "Diagnosis Result"
        },
        {
            path: "/test-results",
            icon: ClipboardCheck,
            label: "Test Results"
        },
        {
            path: "/telephthal-tools",
            icon: Video,
            label: "Telephthal Tools"
        },
        {
            path: "/treatment-plan",
            icon: ClipboardEdit,
            label: "Treatment Plan"
        },
        {
            path: "/referrals",
            icon: Share2,
            label: "Referrals"
        },
        {
            path: "/billing-tools",
            icon: DollarSign,
            label: "Billing Tools"
        }
    ];

    const naviagate = useNavigate();
    const assignedCases = [
        { patientName: "Rakesh Kumar", age: 57, time: "10:32 AM", urgency: "High" },
        { patientName: "Deepa", age: 48, time: "11:30 AM", urgency: "Medium" }
    ];

    const completedReports = [
        { patientName: "Keerthi Easwar", age: 85, time: "10:55 PM", referral: "Needed" },
        { patientName: "MK Gandhi", age: 66, time: "9:20 AM", referral: "Not needed" }
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

    const handleViewReport = () => {
        naviagate("/patient-report");
    }
    return (
        <div className="flex min-h-screen w-full flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block fixed top-0 left-0 h-full w-64 border-r bg-gradient-to-b from-[#00694B] via-[#00694B] to-[#00CF94] shadow-xl">
                <div className="flex h-full flex-col gap-4 p-4">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3 pb-4 border-b border-white/20">
                        <Stethoscope className="h-8 w-8 text-white" />
                        <h1 className="text-xl font-bold text-white tracking-tight">EYEZENX ANALYTICS</h1>
                    </div>

                    {/* Navigation */}
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
                    <Button
                        variant="outline"
                        size="icon"
                        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                    >
                        <Menu className="h-5 w-5 text-[#00694B]" />
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="left"
                    className="w-64 p-0 border-r bg-gradient-to-b from-[#00694B] via-[#00694B] to-[#00CF94]"
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/20">
                            <div className="flex items-center gap-3">
                                <Stethoscope className="h-7 w-7 text-white" />
                                <h2 className="text-lg font-bold text-white">EYEZENX</h2>
                            </div>
                            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity-200 hover:opacity-100">
                                <X className="h-5 w-5 text-white" />
                                <span className="sr-only">Close</span>
                            </SheetClose>
                        </div>

                        {/* Navigation */}
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
            <div className="flex-1 lg:ml-64 p-4 bg-[#E5FBF7] min-h-screen">
                <header className="w-full bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        {/* Left: Greeting */}
                        <h1 className="text-[#00694B] text-lg sm:text-3xl font-semibold">
                            Welcome, Dr. Selva
                        </h1>

                        {/* Right: Icons */}
                        <div className="flex items-center gap-4">
                            <User2 className="size-6 sm:size-8 text-[#00694B] bg-white p-1 rounded-full border border-[#00694B]" />
                            <FaSignOutAlt className="size-6 sm:size-8 text-[#00694B] cursor-pointer hover:text-[#004d3a] transition-colors" />
                        </div>
                    </div>
                </header>
                <div className="rounded-md border overflow-hidden shadow-md px-4 py-12 bg-white mt-6">
                    <h1 className='text-[#00694B] text-2xl font-semibold pb-4'>My Assigned Cases</h1>
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead>Patient name</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Scan Time</TableHead>
                                <TableHead>Urgency</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignedCases.map((patient, index) => (
                                <AnimatedTableRow key={index} transition={{ delay: index * 0.1 }}>
                                    <TableCell className="font-medium">{patient.patientName}</TableCell>
                                    <TableCell>{patient.age}</TableCell>
                                    <TableCell>{patient.time}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                patient.urgency === "Waiting"
                                                    ? "bg-amber-100 text-amber-800"
                                                    : "bg-[#c0dcd6] text-[#123c36]"
                                            }
                                        >
                                            {patient.urgency}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button variant="outline" className="text-[#3182ce] border-[#3182ce] hover:bg-[#ebf8ff]" onClick = {handleViewReport}>
                                            View Report
                                        </Button>
                                    </TableCell>

                                </AnimatedTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Completed Reports */}
                <div className="rounded-md border overflow-hidden shadow-md p-3 py-12 bg-white mt-6">
                    <h1 className='text-[#00694B] text-2xl font-semibold pb-4'>Completed Reports</h1>
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead>Patient name</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Scan Time</TableHead>
                                <TableHead>Referral</TableHead>
                                <TableHead className="text-center">Action</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {completedReports.map((patient, index) => (
                                <AnimatedTableRow key={index} transition={{ delay: index * 0.1 }}>
                                    <TableCell className="font-medium">{patient.patientName}</TableCell>
                                    <TableCell>{patient.age}</TableCell>
                                    <TableCell>{patient.time}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={patient.referral === "Needed" ? "default" : "outline"}
                                            className="capitalize"
                                        >
                                            {patient.referral}
                                        </Badge>

                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button variant="outline" className="text-[#3182ce] border-[#3182ce] hover:bg-[#ebf8ff]" onClick = {handleViewReport}>
                                            View Report
                                        </Button>
                                    </TableCell>

                                </AnimatedTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 pt-6 pb-4 border-t border-gray-200 bg-white text-center text-sm text-gray-500 flex p-2 rounded-2xl justify-between"
                >
                    <div className="mb-2">© 2025 EyeZenX | All rights reserved</div>
                    <div className="space-x-4">
                        <a href="#" className="hover:text-gray-700 transition-colors">
                            Terms & Conditions
                        </a>
                        <a href="#" className="hover:text-gray-700 transition-colors">
                            Privacy Policy
                        </a>
                    </div>
                </motion.footer>
            </div>



        </div>
    )
}