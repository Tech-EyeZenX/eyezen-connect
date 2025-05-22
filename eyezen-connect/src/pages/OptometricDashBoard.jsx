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
        <div className="flex min-h-screen w-full">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block fixed top-0 left-0 h-full w-64 border-r bg-gradient-to-b from-[#00694B] via-[#00694B] to-[#00CF94]">

                <div className="flex h-full flex-col gap-2 p-4">
                    <div className="flex items-center gap-2 pb-4 border-b">
                        <Stethoscope className="h-6 w-6 md:h-8 md:w-8 text-white" />
                        <h1 className="text-xl md:text-2xl font-semibold text-white">EYEZENX ANALYTICS</h1>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-accent hover:text-primary"
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
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
                        className="fixed top-4 left-4 z-50"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-64 p-4">
                    <div className="flex flex-col h-full gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Stethoscope className="h-6 w-6 text-primary" />
                                <h2 className="text-lg font-semibold">EyeZenX</h2>
                            </div>
                            <SheetClose>
                                <X className="h-5 w-5" />
                            </SheetClose>
                        </div>

                        <nav className="flex-1 space-y-2">
                            {[
                                { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
                                { path: "/patients", icon: User, label: "Patients" },
                                { path: "/settings", icon: Settings, label: "Settings" },
                            ].map((item) => (
                                <SheetClose asChild key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-primary"
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </SheetClose>
                            ))}
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-6  min-h-screen bg-[#E5FBF7]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-between items-center mb-8"
                >
                    <h1 className="text-2xl font-bold text-gray-800">Welcome, Mr. Surendra</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            SN
                        </div>
                    </div>
                </motion.div>

                {/* Today's Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <AnimatedCard>
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-sm font-medium text-gray-500">Reports Completed</h3>
                            <p className="text-2xl font-semibold mt-2 text-gray-800">4</p>
                        </Card>
                    </AnimatedCard>

                    <AnimatedCard transition={{ delay: 0.1 }}>
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-sm font-medium text-gray-500">Today's Patients</h3>
                            <p className="text-2xl font-semibold mt-2 text-gray-800">6</p>
                        </Card>
                    </AnimatedCard>

                    <AnimatedCard transition={{ delay: 0.2 }}>
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
                            <p className="text-2xl font-semibold mt-2 text-gray-800">2</p>
                        </Card>
                    </AnimatedCard>

                    <AnimatedCard transition={{ delay: 0.3 }}>
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Weekly Trend</h3>
                            <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                <Activity className="w-6 h-6" />
                            </div>
                        </Card>
                    </AnimatedCard>
                </div>
                <div className="p-6 bg-background rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4 text-[#11C099]">Report Status</h2>
                    <ReportStatusTable />
                </div>
                {/* Main Content Grid */}
                <div className="py-6 gap-6">
                    {/* Clinical Notes */}
                    <AnimatedCard transition={{ delay: 0.2 }}>
                        <Card className="p-6 hover:shadow-lg transition-shadow lg:col-span-2">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" /> Clinical Notes
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Scam Conditions</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {["Hypertension", "Seizurem", "Myopic", "ARVD", "Others"].map(
                                                (condition) => (
                                                    <Badge key={condition} variant="secondary">
                                                        {condition}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Percentage</h3>
                                        <p className="text-muted-foreground">
                                            Eye disease statistics, etc.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Lifestyle Risk Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {["Breaking", "Alcohol Use", "Long Screen Exposure", "Others"].map(
                                                (risk) => (
                                                    <Badge key={risk} variant="outline">
                                                        <Smartphone className="mr-1 h-4 w-4" /> {risk}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Comments</h3>
                                        <p className="text-muted-foreground">Terms, study names, Affects</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Additional details</h3>
                                        <Button variant="link" className="text-blue-600 p-0 h-auto">
                                            E-mail: http://www.surendra.com/
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </AnimatedCard>
                </div>
                <div className="py-6 gap-6">
                    <AnimatedCard transition={{ delay: 0.2 }}>
                        <Card className="p-6 hover:shadow-lg transition-shadow lg:col-span-2">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                Referral / Next Action
                            </h2>
                            <div className=" gap-6">
                                <div className="space-y-4">
                                    <div className="flex flex-row gap-4">
                                        <div className="flex  flex-wrap gap-4">
                                            {["Refer to Specialist", "Patient Notified", "Teleconsult Initiation"].map(
                                                (item) => (
                                                    <div key={item} className="flex items-center gap-2">
                                                        <Switch id={item} />
                                                        <Label htmlFor={item}>{item}</Label>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Specialist Options</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select specialist type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="optometrist">Optometrist</SelectItem>
                                                    <SelectItem value="ophthalmologist">Ophthalmologist</SelectItem>
                                                    <SelectItem value="retina-specialist">Retina Specialist</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-full flex flex-col gap-4 py-6">
                                    <div className="p-4  bg-green-100 rounded-lg flex-1">
                                        <h3 className="font-medium mb-2">Patient Feedback</h3>
                                        <p className="text-sm text-gray-600">
                                            "Best Experience Throughout! I loved the service. Eagerly waiting for how EyeZenX
                                            is going to revolutionize Health Care. It has been my absolute pleasure!"
                                        </p>
                                    </div>
                                 <div className='flex justify-center items-center'>
                                    <Button className="w-[10vw] h-6 py-4 font-semibold rounded-full text-xl bg-[#00695F]">
                                        ANALYZE
                                    </Button>

                                 </div>
                                </div>
                            </div>
                        </Card>
                    </AnimatedCard>
                </div>
            </main>
        </div>
    );
}