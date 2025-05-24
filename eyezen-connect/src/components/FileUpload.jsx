import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {Label} from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
export const FileUpload = ({ onFileSelect, selectedFile }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileBoxClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <div className="space-y-2">
            <Label>Upload Image</Label>
            <div
                onClick={handleFileBoxClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors group ${
                    isDragging ? "border-primary bg-primary/10" : "hover:border-primary"
                }`}
            >
                <div className="flex flex-col items-center gap-2">
                    <Upload className={`h-8 w-8 ${
                        isDragging ? "text-primary" : "text-muted-foreground"
                    } group-hover:text-primary`} />
                    <p className="text-muted-foreground">
                        <span className="text-primary">Drag & drop files</span> or Browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Supported formats: JPEG, PNG
                    </p>
                    {selectedFile && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-green-600"
                        >
                            Selected: {selectedFile.name}
                        </motion.div>
                    )}
                </div>
            </div>
            <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
            />
        </div>
    );
}