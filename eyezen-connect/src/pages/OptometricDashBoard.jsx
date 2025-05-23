import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    Share2             // For Referrals
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { FaHistory, FaDollarSign } from "react-icons/fa"
import { ReportStatusTable } from '../components/ReportStatusTable';
const AnimatedCard = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);

export function OptometricDashBoard() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { path: "/patients", icon: User, label: "Patients" },
        { path: "/settings", icon: Settings, label: "Settings" },
        { path: "/patientHistory", icon: FaHistory, label: "Patient History" },
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

    return (
        <div className="flex min-h-screen w-full overflow-hidden">
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
                            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opadata-200 text-white">

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
            <main className="flex-1 lg:ml-64 p-4 md:p-6 min-h-screen bg-[#E5FBF7]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8"
                >
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Welcome, Mr. Surendra</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm md:text-base">
                            SN
                        </div>
                    </div>
                </motion.div>

                {/* Today's Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                    <AnimatedCard>
                        <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-xs md:text-sm font-medium text-gray-500">Reports Completed</h3>
                            <p className="text-xl md:text-2xl font-semibold mt-1 md:mt-2 text-gray-800">4</p>
                        </Card>
                    </AnimatedCard>

                    <AnimatedCard >
                        <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-xs md:text-sm font-medium text-gray-500">Today's Patients</h3>
                            <p className="text-xl md:text-2xl font-semibold mt-1 md:mt-2 text-gray-800">6</p>
                        </Card>
                    </AnimatedCard>

                    <AnimatedCard>
                        <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-xs md:text-sm font-medium text-gray-500">Pending Review</h3>
                            <p className="text-xl md:text-2xl font-semibold mt-1 md:mt-2 text-gray-800">2</p>
                        </Card>
                    </AnimatedCard>

                  
                </div>
                <div className="p-4 md:p-6 bg-background rounded-lg border mb-6 md:mb-8">
                    <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[#11C099]">Report Status</h2>

                    <div className="overflow-x-auto">
                        <ReportStatusTable />
                    </div>
                </div>

              

            </main>
        </div>
    );
}