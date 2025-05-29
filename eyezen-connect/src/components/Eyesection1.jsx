import React, { useState } from 'react';

const EyeScanInterface = () => {
    const [selectedColor, setSelectedColor] = useState({
        "Cup Disc Ratio": "transparent",
        "Retinal Vasculature": "transparent",
        "Disc Margins": "transparent",
        "Disc BioMarkers": "transparent",
        "Lens Retinal Thickness": "transparent",
        "Retina Biomarkers": "transparent",
        "Floaters": "transparent",
        "Vitreous Composition": "transparent"
    });

    const [showPicker, setShowPicker] = useState(null);

    const handleColorChange = (box, color) => {
        setSelectedColor(prev => ({ ...prev, [box]: color }));
        setShowPicker(null);
    };

    return (
        <div className="relative w-full h-[600px] sm:h-[500px] md:h-[600px] flex justify-center items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            {/* Eye Image */}
            <img
                src="/eye.png"
                alt="Eye Scan"
                className="max-w-full max-h-full rounded-lg object-contain"
            />

            {/* Optic Nerve Label */}
            <div className="absolute top-[15%] left-[4%] sm:top-[20%] sm:left-[5%] flex items-center">
                <div className="bg-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-bold text-black rounded-md shadow-md whitespace-nowrap">
                    Optic Nerve <br /> & Optic Vessel
                </div>
                <div className="absolute top-[8vh] left-full w-[120px] sm:w-[200px] md:w-[400px] h-0 border-t-2 border-dotted border-green-500 transform -translate-y-1/2 rotate-8"></div>
            </div>

            {/* Marker Section */}
            <MarkerSection
                boxes={[
                    "Cup Disc Ratio",
                    "Retinal Vasculature",
                    "Disc Margins",
                    "Disc BioMarkers"
                ]}
                position="top-[30%] left-[4%] sm:top-[38%] sm:left-[6%]"
                selectedColor={selectedColor}
                showPicker={showPicker}
                setShowPicker={setShowPicker}
                handleColorChange={handleColorChange}
            />

            {/* Retina Section */}
            <div className="absolute bottom-[8%] right-[20%] sm:bottom-[10%] sm:right-[38%]">
                <LabelWithLine
                    text="Retina"
                    position="top-[5%] right-[20%] sm:right-[30%]"
                    linePosition="top-[-30%] right-[40%] sm:right-[49%] h-[40px] sm:h-[60px] rotate-180"
                />
                <ColorInputSection
                    boxes={["Lens Retinal Thickness", "Retina Biomarkers"]}
                    selectedColor={selectedColor}
                    showPicker={showPicker}
                    setShowPicker={setShowPicker}
                    handleColorChange={handleColorChange}
                />
            </div>

            {/* Vitreous Section */}
            <div className="absolute top-[18%] right-[10%] sm:top-[20%] sm:right-[14%]">
                <LabelWithLine
                    text="Vitreous"
                    position="top-0 right-10 sm:right-14"
                    linePosition="top-[-2vh] right-[10vw] sm:right-[15vw] h-[150px] sm:h-[210px] rotate-55"
                />
                <ColorInputSection
                    boxes={["Floaters", "Vitreous Composition"]}
                    selectedColor={selectedColor}
                    showPicker={showPicker}
                    setShowPicker={setShowPicker}
                    handleColorChange={handleColorChange}
                />
            </div>
        </div>
    );
};
// Reusable Marker Section Component
const MarkerSection = ({ boxes, position, selectedColor, showPicker, setShowPicker, handleColorChange }) => (
    <div className={`absolute ${position} flex flex-col gap-4`}>
        {boxes.map((box) => (
            <ColorPickerItem
                key={box}
                box={box}
                selectedColor={selectedColor[box]}
                isOpen={showPicker === box}
                onToggle={() => setShowPicker(showPicker === box ? null : box)}
                onSelectColor={(color) => handleColorChange(box, color)}
            />
        ))}
    </div>
);

// Reusable Color Input Section
const ColorInputSection = ({ boxes, selectedColor, showPicker, setShowPicker, handleColorChange }) => (
    <div className="flex flex-col gap-3 mt-2 pt-10">
        {boxes.map((box) => (
            <ColorPickerItem
                key={box}
                box={box}
                selectedColor={selectedColor[box]}
                isOpen={showPicker === box}
                onToggle={() => setShowPicker(showPicker === box ? null : box)}
                onSelectColor={(color) => handleColorChange(box, color)}
            />
        ))}
    </div>
);

// Color Picker Item Component
const ColorPickerItem = ({ box, selectedColor, isOpen, onToggle, onSelectColor }) => (
    <div className="flex items-center gap-3 relative">
        <span className="text-sm font-medium text-gray-700">{box}</span>
        <div
            className="w-6 h-6 border border-gray-300 rounded-md shadow-sm cursor-pointer transition-transform hover:scale-105"
            style={{ backgroundColor: selectedColor }}
            onClick={onToggle}
        />

        {isOpen && (
            <div className="absolute top-0 left-full ml-3 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 flex gap-2">
                {["red", "blue", "green", "yellow"].map((color) => (
                    <div
                        key={color}
                        className="w-6 h-6 rounded-md cursor-pointer shadow-inner"
                        style={{ backgroundColor: color }}
                        onClick={() => onSelectColor(color)}
                    />
                ))}
            </div>
        )}
    </div>
);

// Label with Line Component
const LabelWithLine = ({ text, position, linePosition }) => (
    <>
        <div className={`absolute ${position} font-bold text-lg text-black bg-white px-2 py-1 rounded-md shadow-sm z-10`}>
            {text}
        </div>
        <div
            className={`absolute border-l-2 border-dotted border-green-500 ${linePosition}`}
        />
    </>
);

export default EyeScanInterface;