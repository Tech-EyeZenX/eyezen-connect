import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
// Card
import { Card } from "@/components/ui/card";

// Badge
import { Badge } from "@/components/ui/badge";

// Button
import { Button } from "@/components/ui/button";

// Form Elements
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// Select
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Avatar
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Sheet (Drawer/Sidebar)
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose
} from "@/components/ui/sheet";

// Table
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

// Tabs
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs";
import { useEffect } from 'react';
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
    ClipboardList,
    ClipboardCheck,
    Video,
    ClipboardEdit,
    Share2,
    User2,
    Bell,
    Search,
    HeartPulse,
    FilePlus2,
    FileCheck2,
    DollarSignIcon,
    LogOut,
    Contact
} from "lucide-react";
import { FaSignOutAlt } from 'react-icons/fa';

export function DoctorDashBoard() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("openCases");
    const navigate = useNavigate();

    const navItems = [
        { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { path: "/patient-history", icon: ClipboardList, label: "Patient History" },
        { path: "/referrals", icon: Share2, label: "Referrals" },
        { path: "/earnings", icon: DollarSignIcon, label: "Earnings" },
        { path: "/profile", icon: User, label: "Settings" }

    ];

    const assignedCases = [
        { id: 1, patientName: "Rakesh Kumar", age: 57, time: "10:32 AM", priority: "High" },
        { id: 2, patientName: "Deepa", age: 48, time: "11:30 AM", priority: "Medium" },
        { id: 3, patientName: "Priya Sharma", age: 34, time: "01:15 PM", priority: "High" },
        { id: 4, patientName: "Anil Mehta", age: 65, time: "02:45 PM", priority: "Low" }
    ];

    const completedReports = [
        { id: 1, patientName: "Keerthi Easwar", age: 85, time: "10:55 PM", referral: "Needed", status: "Completed" },
        { id: 2, patientName: "MK Gandhi", age: 66, time: "9:20 AM", referral: "Not needed", status: "Reviewed" },
        { id: 3, patientName: "Arjun Patel", age: 72, time: "11:45 AM", referral: "Needed", status: "Completed" },
        { id: 4, patientName: "Sneha Reddy", age: 58, time: "3:30 PM", referral: "Not needed", status: "Archived" }
    ];

    const AnimatedTableRow = ({ children, index }) => (
        <motion.tr
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01, backgroundColor: '#f0fdfa' }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="hover:bg-muted/50 transition-colors"
        >
            {children}
        </motion.tr>
    );

    const handleViewReport = () => {
        navigate(`/patient-report`);
    };

    // Stats for the dashboard
    const stats = [
        { title: "Today's Appointments", value: "12", icon: <Clock className="h-6 w-6" />, change: "+2" },
        { title: "Pending Reports", value: "7", icon: <FilePlus2 className="h-6 w-6" />, change: "-3" },
        { title: "Completed Cases", value: "24", icon: <FileCheck2 className="h-6 w-6" />, change: "+5" },

    ];

    return (
        <div className="flex min-h-screen w-full flex-row overflow-hidden bg-gradient-to-br from-[#f0fdfa] via-[#e0f2f1] to-[#d1f5f0]">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:block fixed top-0 left-0 h-full w-64 border-r bg-gradient-to-b from-[#00694B] via-[#008a5e] to-[#00CF94] shadow-xl"
            >
                <div className="flex h-full flex-col gap-4 p-4">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="flex items-center gap-3 pb-4 border-b border-white/20"
                    >
                        <Stethoscope className="h-8 w-8 text-white" />
                        <h1 className="text-xl font-bold text-white tracking-tight">EYEZENX ANALYTICS</h1>
                    </motion.div>
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
                    <div className="mt-auto pt-4 border-t border-white/20">

                        <Link
                            to="/contact-us"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-200 group"
                        >
                            <Contact className="h-5 w-5 text-white/80 group-hover:text-white" />
                            <span className="text-sm font-medium">Contact Us</span>
                        </Link>
                        <Link
                            to="/logout"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-200 group"
                        >
                            <LogOut className="h-5 w-5 text-white/80 group-hover:text-white" />
                            <span className="text-sm font-medium">LogOut</span>
                        </Link>
                    </div>
                </div>
            </motion.aside>

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
                    className="w-64 p-0 border-r bg-gradient-to-b from-[#00694B] via-[#008a5e] to-[#00CF94]"
                >
                    <div className="flex flex-col h-full">
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
                        <div className="mt-auto px-2 py-4 border-t border-white/20">
                            <SheetClose asChild>
                                <Link
                                    to="/settings"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-200 group"
                                >
                                    <Settings className="h-5 w-5 text-white/80 group-hover:text-white" />
                                    <span className="text-sm font-medium">Settings</span>
                                </Link>
                            </SheetClose>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 p-2 sm:p-4 min-h-screen">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-gradient-to-r from-[#00694B] to-[#00a56e] px-3 py-2 sm:px-4 sm:py-3 shadow-lg rounded-xl mb-4 sm:mb-6"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-2xl md:max-w-7xl mx-auto w-full">
                        {/* Doctor Info */}
                        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <Avatar className="border-2 border-white w-8 h-8 sm:w-10 sm:h-10">
                                    <AvatarImage src="/doctor-avatar.jpg" alt="Dr. Selva" />
                                    <AvatarFallback className="bg-[#00CF94] text-white text-xs sm:text-base">
                                        DS
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-white text-sm sm:text-xl font-bold">
                                        Welcome, Dr. Selva
                                    </h1>
                                    <p className="text-white/90 text-xs sm:text-sm">
                                        Ophthalmologist | Last login: Today, 08:45 AM
                                    </p>
                                </div>
                            </div>

                            {/* Mobile Action Buttons */}
                            <div className="flex sm:hidden gap-2">
                                <Button variant="ghost" className="p-1 rounded-full text-white hover:bg-white/20">
                                    <Bell className="size-4" />
                                </Button>
                                <Button variant="ghost" className="p-1 rounded-full text-white hover:bg-white/20">
                                    <Search className="size-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-1 text-white hover:bg-white/20 text-xs"
                                >
                                    <FaSignOutAlt className="size-3" />
                                </Button>
                            </div>
                        </div>

                        {/* Desktop Action Buttons */}
                        <div className="hidden sm:flex items-center gap-1 sm:gap-2">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="ghost" className="relative p-2 rounded-full text-white hover:bg-white/20">
                                    <Bell className="size-5" />
                                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="ghost" className="p-2 rounded-full text-white hover:bg-white/20">
                                    <Search className="size-5" />
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-1 text-white hover:bg-white/20 text-sm"
                                >
                                    <FaSignOutAlt className="size-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.header>


                {/* Stats Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 "
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md p-3 sm:p-4 border border-[#00CF94]/20 transition-transform"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-500 text-xs sm:text-sm truncate">{stat.title}</p>
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#00694B] mt-1">{stat.value}</h3>
                                </div>
                                <div className="p-2 sm:p-3 rounded-full bg-[#E5FBF7] text-[#00CF94] shrink-0">
                                    {stat.icon}
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm mt-2 sm:mt-3 text-green-600 flex items-center">
                                <span className="font-medium">{stat.change}</span>&nbsp;from yesterday
                            </p>
                        </motion.div>
                    ))}
                </motion.div>


                {/* Cases Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                    <Tabs defaultValue="openCases" className="w-full">
                        <div className="overflow-x-auto">
                            <TabsList className="w-full bg-[#d4f3eb] p-2 rounded-lg shadow-inner min-w-max">
                                <TabsTrigger
                                    value="openCases"
                                    className="py-3 sm:py-4 rounded-md font-medium transition-all bg-white px-3 sm:px-4"
                                    onClick={() => setActiveTab("openCases")}
                                >
                                    <div className="flex items-center">
                                        <ClipboardList className="mr-1 sm:mr-2 size-3 sm:size-4" />
                                        <span className="text-xs sm:text-sm">Open Cases</span>
                                        <Badge className="ml-1 sm:ml-2 rounded-full px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold bg-[#00694B] text-white">
                                            {assignedCases.length}
                                        </Badge>
                                    </div>
                                </TabsTrigger>

                                <TabsTrigger
                                    value="completedReports"
                                    className="py-3 sm:py-4  rounded-md font-medium transition-all 
                   bg-white px-3 sm:px-4"
                                    onClick={() => setActiveTab("completedReports")}
                                >
                                    <div className="flex items-center">
                                        <ClipboardCheck className="mr-1 sm:mr-2 size-3 sm:size-4" />
                                        <span className="text-xs sm:text-sm">Completed</span>
                                        <Badge className="ml-1 sm:ml-2 rounded-full px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold bg-[#00CF94] text-[#00694B]">
                                            {completedReports.length}
                                        </Badge>
                                    </div>
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Open Cases Tab */}
                        <TabsContent value="openCases" className="p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 sm:mb-4">
                                <h2 className="text-lg sm:text-xl font-bold text-[#00694B]">Assigned Patients</h2>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <Select>
                                        <SelectTrigger className="w-full sm:w-[160px] text-xs sm:text-sm">
                                            <SelectValue placeholder="Sort by Priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="high">High Priority</SelectItem>
                                            <SelectItem value="medium">Medium Priority</SelectItem>
                                            <SelectItem value="low">Low Priority</SelectItem>
                                        </SelectContent>
                                    </Select>

                                </div>
                            </div>
                            <div className="rounded-xl border border-[#00CF94]/30 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-black/80">
                                            <TableRow>
                                                <TableHead className="text-white py-3 px-2 sm:px-4">Patient</TableHead>
                                                <TableHead className="text-white py-3 px-2 sm:px-4 hidden sm:table-cell">Age</TableHead>
                                                <TableHead className="text-white py-3 px-2 sm:px-4 hidden sm:table-cell">Scan Time</TableHead>
                                                <TableHead className="text-white py-3 px-2 sm:px-4">Priority</TableHead>
                                                <TableHead className="text-right text-white py-3 px-2 sm:px-4">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {assignedCases.map((patient, index) => (
                                                <AnimatedTableRow key={patient.id} index={index}>
                                                    <TableCell className="font-medium flex items-center py-2 px-2 sm:px-4">
                                                        <div className="bg-[#E5FBF7] p-1 rounded-full mr-2">
                                                            <User2 className="size-4 text-[#00CF94]" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{patient.patientName}</div>
                                                            <div className="text-xs text-gray-500 sm:hidden">Age: {patient.age}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">{patient.age}</TableCell>
                                                    <TableCell className="hidden sm:table-cell">{patient.time}</TableCell>
                                                    <TableCell >
                                                        <Badge
                                                            variant={patient.priority === "High" ? "destructive" : patient.priority === "Medium" ? "secondary" : "outline"}
                                                            className="capitalize text-xs"
                                                        >
                                                            {patient.priority}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right py-2 px-2 sm:px-4">
                                                        <Button
                                                            size="sm"
                                                            className="bg-black/80 hover:bg-black  text-white text-xs px-2 sm:px-3"

                                                            onClick={handleViewReport}
                                                        >
                                                            <span className="hidden sm:inline">View Report</span>
                                                            <span className="sm:hidden">View</span>
                                                        </Button>
                                                    </TableCell>
                                                </AnimatedTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Completed Reports Tab */}
                        <TabsContent value="completedReports" className="p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 sm:mb-4">
                                <h2 className="text-lg sm:text-xl font-bold text-[#00694B]">Completed Reports</h2>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <Select>
                                        <SelectTrigger className="w-full sm:w-[160px] text-xs sm:text-sm">
                                            <SelectValue placeholder="Filter by Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="reviewed">Reviewed</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>

                                </div>
                            </div>
                            <div className="rounded-xl border border-[#00CF94]/30 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-black/80 hover:bg-black">
                                            <TableRow>
                                                <TableHead className="text-white py-3 px-2 sm:px-4">Patient</TableHead>
                                                <TableHead className="text-white py-3 px-2 sm:px-4 hidden sm:table-cell">Age</TableHead>
                                                <TableHead className="text-white py-3 px-2 sm:px-4 hidden sm:table-cell">Status</TableHead>
                                                <TableHead className="text-white py-3 px-2 sm:px-4 hidden sm:table-cell">Completed</TableHead>
                                                <TableHead className="text-white py-3 px-2 sm:px-4">Referral</TableHead>
                                                <TableHead className="text-right text-white py-3 px-2 sm:px-4">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {completedReports.map((patient, index) => (
                                                <AnimatedTableRow key={patient.id} index={index}>
                                                    <TableCell className="font-medium flex items-center py-2 px-2 sm:px-4">
                                                        <div className="bg-[#E5FBF7] p-1 rounded-full mr-2">
                                                            <User2 className="size-4 text-[#00CF94]" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{patient.patientName}</div>
                                                            <div className="text-xs text-gray-500 sm:hidden">Age: {patient.age}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">{patient.age}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={patient.status === "Completed" ? "default" : patient.status === "Reviewed" ? "secondary" : "outline"}
                                                            className="capitalize text-xs"
                                                        >
                                                            {patient.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">{patient.time}</TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge
                                                            variant={patient.referral === "Needed" ? "default" : "outline"}
                                                            className="capitalize text-xs"
                                                        >
                                                            {patient.referral}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right py-2 px-2 sm:px-4">
                                                        <div className="flex justify-end gap-1 sm:gap-2">
                                                            <Button
                                                                size="sm"
                                                                className="bg-black/80 hover:bg-black text-white  text-xs px-2 sm:px-3"
                                                                onClick={handleViewReport}
                                                            >
                                                                View
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="border-[#00694B] text-[#00694B] hover:bg-[#E5FBF7] text-xs px-2 sm:px-3"
                                                            >
                                                                Share
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </AnimatedTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-4  sm:mt-6 grid grid-cols-1 gap-4 sm:gap-6 mx-auto"
                >
                    <Card className="p-3 sm:p-5 rounded-xl border border-[#00CF94]/30">
                        <h3 className="text-base sm:text-lg font-bold text-[#00694B] mb-3 sm:mb-4 flex items-center">
                            <Activity className="mr-2 text-[#00CF94] size-4 sm:size-5" /> Recent Activity
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                            {[1, 2, 3].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start p-2 sm:p-3 hover:bg-[#E5FBF7] rounded-lg"
                                >
                                    <div className="bg-[#00CF94]/10 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                                        <Check className="size-3 sm:size-4 text-[#00CF94]" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm sm:text-base">Reviewed Priya Sharma's report</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">15 minutes ago</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Card>

                    <Card className="    rounded-xl border border-[#00CF94]/30">
                        <h3 className="text-base sm:text-lg font-bold text-[#00694B] mb-3 sm:mb-4 flex items-center">
                            <Thermometer className="mr-2 text-[#00CF94] size-4 sm:size-5" /> Upcoming Appointments
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                            {[1, 2].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start p-2 sm:p-3 hover:bg-[#E5FBF7] rounded-lg"
                                >
                                    <div className="bg-[#00694B]/10 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                                        <User className="size-3 sm:size-4 text-[#00694B]" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h4 className="font-medium text-sm sm:text-base">Rajiv Mehta</h4>
                                            <Badge variant="secondary" className="text-[#00694B] text-xs">11:30 AM</Badge>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-500">Follow-up for cataract surgery</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <Button variant="link" className="text-[#00694B] mt-2 pl-0 text-xs sm:text-sm">
                            View all appointments →
                        </Button>
                    </Card>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-6 sm:mt-8 pt-4 pb-3 sm:pt-6 sm:pb-4 bg-gradient-to-r from-[#00694B] to-[#00a56e] text-white rounded-xl shadow-lg p-5"
                >
                    <div className="max-w-7xl mx-auto px-3 sm:px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                            <div className="flex items-center gap-2">
                                <Stethoscope className="h-5 w-5 text-white" />
                                <span className="font-bold text-sm sm:text-base">EYEZENX ANALYTICS</span>
                            </div>
                            <div className="text-center text-xs sm:text-sm">
                                © 2025 EYEZENX ANALYTICS | All rights reserved
                            </div>
                            <div className="flex space-x-3">
                                <a href="#" className="text-white hover:text-[#d4f3eb] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-white hover:text-[#d4f3eb] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </a>
                                <a href="#" className="text-white hover:text-[#d4f3eb] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20 text-center text-xs sm:text-sm">
                            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
                                <a href="#" className="hover:underline">Terms & Conditions</a>
                                <span className="hidden sm:inline">•</span>
                                <a href="#" className="hover:underline">Privacy Policy</a>
                                <span className="hidden sm:inline">•</span>
                                <a href="#" className="hover:underline">Contact Support</a>


                            </div>
                        </div>
                    </div>
                </motion.footer>
            </div>
        </div>
    )
}