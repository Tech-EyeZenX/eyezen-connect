import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { ImagePreview } from "./ImagePreview";

const MotionDialogContent = motion(DialogContent);

export function NewPatientDialog() {
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);




    const handleFileBoxClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Add Patient
                </Button>
            </DialogTrigger>

            <MotionDialogContent
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full"
            >
                <DialogHeader>
                    <DialogTitle className="text-xl">New Patient Details</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Patient Name */}
                    <div className="space-y-2">
                        <Label htmlFor="patient-name">Patient Name</Label>
                        <Input id="patient-name" placeholder="Rakesh Kumar" />
                    </div>

                    {/* Age & Gender */}
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

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <Label htmlFor="phone-number">Phone Number</Label>
                        <div className="flex gap-2">
                            <span className="inline-flex items-center px-3 border rounded-md bg-muted text-sm">
                                +91
                            </span>
                            <Input id="phone-number" placeholder="8825625412" />
                        </div>
                    </div>

                    {/* Visit Type */}
                    <div className="space-y-2">
                        <Label htmlFor="visit-type">Visit Type</Label>
                        <Input id="visit-type" placeholder="Follow-up" />
                    </div>

                    {/* Image Quality
                    <div className="space-y-2">
                        <Label htmlFor="image-quality">Image Quality</Label>
                        <Input id="image-quality" placeholder="Blurry" />
                    </div> */}

                    {/* Select Eye */}
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



                    {/* File Upload */}
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
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    console.log("File selected:", e.target.files[0]);
                                    setImage(e.target.files[0]);
                                }
                            }}
                        />
                        </div>
                    </div>
                   
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Add Patient
                    </Button>
                </div>
            </MotionDialogContent>
        </Dialog>
    );
}
