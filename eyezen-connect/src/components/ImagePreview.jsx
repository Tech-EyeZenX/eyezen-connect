import { useEffect, useState } from "react";

export const ImagePreview = ({ image }) => {
    const [preview, setPreview] = useState(null);

    console.log(image);
    
   
    useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(image);

        return () => {
            reader.abort();
        };
    }, [image]);

    return (
        <div className="mt-4 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Selected Image</h3>
            {preview && (
                <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-w-full h-64 object-contain rounded-lg"
                />
            )}
        </div>
    );
};