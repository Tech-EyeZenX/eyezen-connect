import { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';

import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";



import {
    Search,
    Plus,
    Filter,
    ChevronDown,
    ChevronUp,
    Eye,
    FileText,
    MoreVertical,
    Calendar as CalendarIcon,
    Phone,
    Mail,
    MapPin,
    User,
    ArrowLeft
} from "lucide-react";

const AnimatedCard = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
    >
        {children}
    </motion.div>
);

// Mock patient data
const patients = [
    {
        id: "P001",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "(555) 123-4567",
        lastVisit: "2023-10-15",
        nextAppointment: "2023-11-20",
        status: "Active",
        avatarColor: "bg-pink-500"
    },
    {
        id: "P002",
        name: "Michael Chen",
        email: "michael.c@example.com",
        phone: "(555) 987-6543",
        lastVisit: "2023-09-22",
        nextAppointment: null,
        status: "Inactive",
        avatarColor: "bg-blue-500"
    },
    {
        id: "P003",
        name: "Emma Rodriguez",
        email: "emma.r@example.com",
        phone: "(555) 456-7890",
        lastVisit: "2023-10-05",
        nextAppointment: "2023-11-15",
        status: "Active",
        avatarColor: "bg-purple-500"
    },
    {
        id: "P004",
        name: "James Wilson",
        email: "james.w@example.com",
        phone: "(555) 321-6549",
        lastVisit: "2023-08-12",
        nextAppointment: "2023-10-28",
        status: "Active",
        avatarColor: "bg-green-500"
    },
    {
        id: "P005",
        name: "Olivia Davis",
        email: "olivia.d@example.com",
        phone: "(555) 654-3210",
        lastVisit: "2023-07-30",
        nextAppointment: null,
        status: "Inactive",
        avatarColor: "bg-yellow-500"
    },
    {
        id: "P006",
        name: "William Thompson",
        email: "william.t@example.com",
        phone: "(555) 789-0123",
        lastVisit: "2023-10-18",
        nextAppointment: "2023-12-05",
        status: "Active",
        avatarColor: "bg-red-500"
    },
];

const PatientPage = () => {
    const [view, setView] = useState('list'); // 'list' or 'detail'
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [date, setDate] = useState(new Date());

    // Sort patients
    const sortedPatients = [...patients].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    // Filter patients based on search term
    const filteredPatients = sortedPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const viewPatientDetails = (patient) => {
        setSelectedPatient(patient);
        setView('detail');
    };

    const SortIcon = ({ field }) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    };

    return (
        <div className="min-h-screen bg-[#E5FBF7] p-4 md:p-6">
            {/* Back to Dashboard Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4"
            >
                <Link to="/optometricdashboard">
                    <Button
                        variant="ghost"
                        className="text-[#008A60] hover:bg-[#E5FBF7] flex items-center"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        <LayoutDashboard size={16} className="mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
            </motion.div>
            {view === 'list' ? (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
                    >
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Patient Management</h1>
                            <p className="text-gray-500">Manage your patient records and appointments</p>
                        </div>
                        <Button className="bg-[#008A60] hover:bg-[#00694B] text-white">
                            <Plus size={16} className="mr-2" />
                            Add New Patient
                        </Button>
                    </motion.div>

                    {/* Filters and Search */}
                    <AnimatedCard delay={0.1}>
                        <Card className="p-6 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                <div className="md:col-span-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search patients by name, email, or ID..."
                                            className="pl-10 w-full"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Select>
                                    <SelectTrigger className="w-full">
                                        <Filter size={16} className="mr-2 text-gray-500" />
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Patients</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="new">New Patients</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                                        <SelectItem value="recent">Most Recent</SelectItem>
                                        <SelectItem value="oldest">Oldest</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full text-[#008A60] border-[#008A60] hover:bg-[#E5FBF7]"
                                        >
                                            <CalendarIcon className='mr-2 h-4 w-4' />
                                            {date ? format(date, 'PPP') : 'Pick a date'}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            intitialFocus
                                            className="border border-[#E5FBF7] rounded-md"
                                        />
                                    </PopoverContent>
                                </Popover>

                            </div>
                        </Card>
                    </AnimatedCard>

                    {/* Patients Table */}
                    <AnimatedCard delay={0.2}>
                        <Card className="overflow-hidden">
                            <Table>
                                <TableHeader className="bg-[#F0FDFA]">
                                    <TableRow>
                                        <TableHead className="w-[100px]">Patient ID</TableHead>
                                        <TableHead
                                            className="cursor-pointer flex items-center"
                                            onClick={() => handleSort('name')}
                                        >
                                            <span>Patient Name</span>
                                            <SortIcon field="name" />
                                        </TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead
                                            className="cursor-pointer"
                                            onClick={() => handleSort('lastVisit')}
                                        >
                                            <div className="flex items-center">
                                                <span>Last Visit</span>
                                                <SortIcon field="lastVisit" />
                                            </div>
                                        </TableHead>
                                        <TableHead>Next Appointment</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPatients.map((patient) => (
                                        <TableRow key={patient.id} className="hover:bg-[#F0FDFA]">
                                            <TableCell className="font-medium">{patient.id}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Avatar className="h-8 w-8 mr-3">
                                                        <AvatarFallback className={patient.avatarColor}>
                                                            {patient.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span>{patient.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm text-gray-500">{patient.email}</div>
                                                <div className="text-sm text-gray-500">{patient.phone}</div>
                                            </TableCell>
                                            <TableCell>{patient.lastVisit}</TableCell>
                                            <TableCell>
                                                {patient.nextAppointment ? (
                                                    <span className="text-[#008A60] font-medium">{patient.nextAppointment}</span>
                                                ) : (
                                                    <span className="text-gray-400">Not scheduled</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={patient.status === "Active" ? "default" : "secondary"}
                                                    className={patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                                                >
                                                    {patient.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => viewPatientDetails(patient)}
                                                    >
                                                        <Eye size={16} />
                                                    </Button>
                                                    <Button variant="outline" size="icon">
                                                        <FileText size={16} />
                                                    </Button>
                                                    <Button variant="outline" size="icon">
                                                        <MoreVertical size={16} />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {filteredPatients.length === 0 && (
                                <div className="text-center py-12">
                                    <User className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">No patients found</h3>
                                    <p className="mt-1 text-gray-500">
                                        Try adjusting your search or filter to find what you're looking for.
                                    </p>
                                </div>
                            )}
                        </Card>
                    </AnimatedCard>

                    {/* Mobile Patient List */}
                    <div className="mt-6 md:hidden">
                        <AnimatedCard delay={0.3}>
                            <h2 className="text-lg font-semibold mb-4">Patients</h2>
                            <div className="space-y-4">
                                {filteredPatients.map(patient => (
                                    <Card key={patient.id} className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center">
                                                <Avatar className="h-10 w-10 mr-3">
                                                    <AvatarFallback className={patient.avatarColor}>
                                                        {patient.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{patient.name}</div>
                                                    <div className="text-sm text-gray-500">{patient.id}</div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => viewPatientDetails(patient)}
                                            >
                                                <ChevronDown size={16} />
                                            </Button>
                                        </div>

                                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                            <div className="text-gray-500">Last Visit:</div>
                                            <div>{patient.lastVisit}</div>

                                            <div className="text-gray-500">Status:</div>
                                            <div>
                                                <Badge
                                                    variant={patient.status === "Active" ? "default" : "secondary"}
                                                    className={patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                                                >
                                                    {patient.status}
                                                </Badge>
                                            </div>

                                            <div className="text-gray-500">Next Appointment:</div>
                                            <div>
                                                {patient.nextAppointment ? (
                                                    <span className="text-[#008A60] font-medium">{patient.nextAppointment}</span>
                                                ) : (
                                                    <span className="text-gray-400">Not scheduled</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-end gap-2">
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Records
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </AnimatedCard>
                    </div>
                </>
            ) : (
                selectedPatient && (
                    <AnimatedCard>
                        <div className="mb-6">
                            <Button
                                variant="ghost"
                                className="text-[#008A60] hover:bg-[#E5FBF7]"
                                onClick={() => setView('list')}
                            >
                                <ArrowLeft size={16} className="mr-2" />
                                Back to Patients
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Patient Summary Card */}
                            <div className="lg:col-span-1">
                                <Card className="p-6">
                                    <div className="flex flex-col items-center text-center mb-6">
                                        <Avatar className="h-20 w-20 mb-4">
                                            <AvatarFallback className={selectedPatient.avatarColor}>
                                                {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <h2 className="text-xl font-bold">{selectedPatient.name}</h2>
                                        <p className="text-gray-500">Patient ID: {selectedPatient.id}</p>

                                        <Badge
                                            className={`mt-3 ${selectedPatient.status === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {selectedPatient.status}
                                        </Badge>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <Calendar className="h-5 w-5 text-[#008A60] mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Last Visit</p>
                                                <p className="font-medium">{selectedPatient.lastVisit}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <Calendar className="h-5 w-5 text-[#008A60] mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Next Appointment</p>
                                                <p className="font-medium text-[#008A60]">
                                                    {selectedPatient.nextAppointment || "Not scheduled"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <Phone className="h-5 w-5 text-[#008A60] mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Phone</p>
                                                <p className="font-medium">{selectedPatient.phone}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <Mail className="h-5 w-5 text-[#008A60] mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-medium">{selectedPatient.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <MapPin className="h-5 w-5 text-[#008A60] mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Address</p>
                                                <p className="font-medium">123 Main St, Anytown, USA</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-col gap-3">
                                        <Button className="bg-[#008A60] hover:bg-[#00694B] text-white">
                                            Schedule Appointment
                                        </Button>
                                        <Button variant="outline">Send Message</Button>
                                        <Button variant="outline">View Full History</Button>
                                    </div>
                                </Card>
                            </div>

                            {/* Patient Details */}
                            <div className="lg:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <Card className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">Medical History</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-500">Conditions</p>
                                                <p>Myopia, Astigmatism</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Allergies</p>
                                                <p>None reported</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Medications</p>
                                                <p>Eye drops as prescribed</p>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">Prescription</h3>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                <div className="text-sm text-gray-500">Eye</div>
                                                <div className="text-sm text-gray-500">SPH</div>
                                                <div className="text-sm text-gray-500">CYL</div>

                                                <div className="font-medium">OD (Right)</div>
                                                <div>-2.50</div>
                                                <div>-0.75</div>

                                                <div className="font-medium">OS (Left)</div>
                                                <div>-2.75</div>
                                                <div>-0.50</div>
                                            </div>
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-500">Last Updated</p>
                                                <p>October 15, 2023</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <Card className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-semibold">Recent Visits</h3>
                                        <Button variant="outline">View All</Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="border-b pb-4">
                                            <div className="flex justify-between">
                                                <h4 className="font-medium">Annual Checkup</h4>
                                                <span className="text-sm text-gray-500">Oct 15, 2023</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2">Dr. Johnson</p>
                                            <p className="mt-2">Routine eye examination. Slight progression in myopia noted.</p>
                                        </div>

                                        <div className="border-b pb-4">
                                            <div className="flex justify-between">
                                                <h4 className="font-medium">Contact Lens Fitting</h4>
                                                <span className="text-sm text-gray-500">Jun 22, 2023</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2">Dr. Johnson</p>
                                            <p className="mt-2">Patient fitted with monthly disposable lenses. Follow-up scheduled in 1 week.</p>
                                        </div>

                                        <div>
                                            <div className="flex justify-between">
                                                <h4 className="font-medium">Emergency Visit</h4>
                                                <span className="text-sm text-gray-500">Mar 10, 2023</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2">Dr. Smith</p>
                                            <p className="mt-2">Redness and irritation in left eye. Diagnosed with mild conjunctivitis.</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </AnimatedCard>
                )
            )}
        </div>
    );
};

export default PatientPage;