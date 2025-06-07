import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
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
    Settings,
    Menu,
    X,
    DollarSign,
    ClipboardList,
    ClipboardCheck,
    ClipboardEdit,
    Share2,
    Bell,
    Search,
    HelpCircle,
    LogOut
} from "lucide-react";
import { ReportStatusTable } from '../components/ReportStatusTable';
import { NewPatientDialog } from '../components/NewPatientDialog';

const AnimatedCard = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
    >
        {children}
    </motion.div>
);

export function OptometricDashBoard() {
    const [isOpen, setIsOpen] = useState(false);
    const [activePath, setActivePath] = useState('/dashboard');
    const location = useLocation();

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    const navItems = [
        { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { path: "/patients", icon: User, label: "Patients" },
        { path: "/refer-doctor", icon: Share2, label: "Refer a doctor" },
        { path: "/payment", icon: DollarSign, label: "Payment" },
        { path: "/profile", icon: Settings, label: "Settings" },
    ];

    // Mock data for stats cards
    const stats = [
        { title: "Reports Completed", value: "4", color: "bg-[#11C099]", icon: <ClipboardCheck className="h-5 w-5" /> },
        { title: "Today's Patients", value: "6", color: "bg-[#3B82F6]", icon: <User className="h-5 w-5" /> },
        { title: "Pending Review", value: "2", color: "bg-[#F59E0B]", icon: <ClipboardList className="h-5 w-5" /> },
        { title: "New Messages", value: "3", color: "bg-[#EF4444]", icon: <Bell className="h-5 w-5" /> }
    ];

    return (
        <div className="flex min-h-screen w-full overflow-hidden bg-[#F0FDFA]">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block fixed top-0 left-0 h-full w-64 border-r bg-gradient-to-b from-[#00694B] to-[#008A60] shadow-xl z-10">
                <div className="flex h-full flex-col gap-4 p-4">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3 pb-4 border-b border-white/20">
                        <Stethoscope className="h-8 w-8 text-white" />
                        <h1 className="text-xl font-bold text-white tracking-tight">EYEZENX ANALYTICS</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 mt-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-white/90 transition-all duration-200 group ${activePath === item.path
                                        ? 'bg-white/20 text-white shadow-inner'
                                        : 'hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <item.icon className="h-5 w-5 text-white/80 group-hover:text-white" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-white/20">
                        <Link
                            to="/help"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/90 hover:bg-white/10 transition-colors"
                        >
                            <HelpCircle className="h-5 w-5" />
                            <span className="text-sm">Help Center</span>
                        </Link>
                        <Link
                            to="/logout"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/90 hover:bg-white/10 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="text-sm">Sign Out</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile Navigation Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
                <div className="grid grid-cols-4 gap-1 p-2">
                    {navItems.slice(0, 4).map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs ${activePath === item.path
                                    ? 'text-[#00694B] bg-[#E5FBF7]'
                                    : 'text-gray-500'
                                }`}
                        >
                            <item.icon className="h-5 w-5 mb-1" />
                            <span>{item.label.split(' ')[0]}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Top Bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-[#00694B] to-[#008A60] text-white p-4 z-10 shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Stethoscope className="h-6 w-6 text-white" />
                        <h1 className="text-lg font-bold">EYEZENX</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-white">
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                        </Button>
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-[85%] max-w-xs p-0 bg-gradient-to-b from-[#00694B] to-[#008A60]"
                            >
                                <div className="flex flex-col h-full">
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-white/20">
                                        <div className="flex items-center gap-3">
                                            <Stethoscope className="h-7 w-7 text-white" />
                                            <h2 className="text-lg font-bold text-white">EYEZENX</h2>
                                        </div>
                                        <SheetClose className="text-white">
                                            <X className="h-6 w-6" />
                                        </SheetClose>
                                    </div>

                                    {/* Navigation */}
                                    <nav className="flex-1 px-2 py-4 overflow-y-auto">
                                        {navItems.map((item) => (
                                            <SheetClose key={item.path} asChild>
                                                <Link
                                                    to={item.path}
                                                    className={`flex items-center gap-3 rounded-lg px-3 py-3 my-1 text-white/90 transition-colors ${activePath === item.path
                                                            ? 'bg-white/20 text-white'
                                                            : 'hover:bg-white/10'
                                                        }`}
                                                >
                                                    <item.icon className="h-5 w-5" />
                                                    <span className="text-sm font-medium">{item.label}</span>
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </nav>

                                    {/* Footer */}
                                    <div className="p-4 border-t border-white/20">
                                        <SheetClose asChild>
                                            <Link
                                                to="/help"
                                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/90 hover:bg-white/10 mb-2"
                                            >
                                                <HelpCircle className="h-5 w-5" />
                                                <span className="text-sm">Help Center</span>
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link
                                                to="/logout"
                                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/90 hover:bg-white/10"
                                            >
                                                <LogOut className="h-5 w-5" />
                                                <span className="text-sm">Sign Out</span>
                                            </Link>
                                        </SheetClose>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-4 md:p-6 min-h-screen bg-[#F0FDFA] pt-20 lg:pt-6 pb-24 lg:pb-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
                >
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Welcome, Dr. Surendra</h1>
                        <p className="text-gray-500 text-sm mt-1">Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-3 bg-white rounded-full pl-1 pr-4 py-1 shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-[#008A60] flex items-center justify-center text-white font-medium">
                                SN
                            </div>
                            <span className="text-sm font-medium">Dr. Surendra</span>
                        </div>
                        <Button variant="outline" size="sm" className="hidden lg:flex gap-2">
                            <Bell className="h-4 w-4" />
                            <span>Notifications</span>
                        </Button>
                    </div>
                </motion.div>

                {/* Today's Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                    <AnimatePresence>
                        {stats.map((stat, index) => (
                            <AnimatedCard key={stat.title} delay={index * 0.1}>
                                <Card className="p-4 hover:shadow-md transition-shadow h-full">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xs font-medium text-gray-500">{stat.title}</h3>
                                            <p className="text-xl font-semibold mt-1 text-gray-800">{stat.value}</p>
                                        </div>
                                        <div className={`${stat.color} text-white p-2 rounded-lg`}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                </Card>
                            </AnimatedCard>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Report Status */}
                <div className="p-4 md:p-5 bg-white rounded-xl border mb-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Report Status</h2>
                        <Button variant="outline" size="sm" className="text-[#008A60] border-[#008A60]">
                            View All
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <ReportStatusTable />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="p-4 md:p-5 bg-white rounded-xl border shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                        <div className="flex flex-col items-center justify-center h-24 gap-2 p-2 bg-[#EBF5FF] hover:bg-[#d6e9ff] border border-[#3B82F6]">
                            <User className="h-8 w-8 text-blue-600" />
                            <div>
                                <NewPatientDialog />
                            </div>
                        </div>
                        <Button className="flex flex-col items-center justify-center h-24 gap-2 p-2 bg-[#FEF6E7] hover:bg-[#fceecd] border border-[#F59E0B]">
                            <ClipboardCheck className="h-6 w-6 text-amber-600" />
                            <span className="text-sm text-black">Review Tests</span>
                        </Button>
                        <Button className="flex flex-col items-center justify-center h-24 gap-2 p-2 bg-[#FEF2F2] hover:bg-[#feecec] border border-[#EF4444]">
                            <DollarSign className="h-6 w-6 text-red-500" />
                            <span className="text-sm text-black">Process Billing</span>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}