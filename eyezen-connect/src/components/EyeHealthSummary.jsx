import React, { useState } from "react";

import "../styles/Eye.css"
import EyeScanInterface from "./Eyesection1";

export const EyeHealthSummary = () => {
    const [showPicker, setShowPicker] = useState(null);
    const [selectedColor, setSelectedColor] = useState({
        "Cup Disc Ratio": "",
        "Retinal Vasculature": "",
        "Disc Margins": "",
        "Disc BioMarkers": "",
    });

    const handleColorChange = (box, color) => {
        setSelectedColor((prev) => ({ ...prev, [box]: color }));
        setShowPicker(null);
    };

    return (
        <div className="eye-summary-container w-full">
            <h2 className="summary-title">Eye Health Summary</h2>
            <div className="divider"></div>

            <div>
                <EyeScanInterface />
            </div>

            {/*Second image */}

            <h2 className="summary-title" style={{ marginTop: '20px' }}>Eye Scan Analysis</h2>
            <div className="divider"></div>

            <div className="image-section" style={{ position: 'relative' }}>
                <img src="./eye1.png" alt="Eye Scan" className="eye-image" />

                {/* Pupil Label and Line */}
                <div
                    style={{
                        position: 'absolute',
                        left: '18vw',
                        top: '25vh',
                        backgroundColor: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        fontWeight: 'bold',
                        color: 'black',
                        zIndex: 3,
                    }}
                >
                    Pupil
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div
                        style={{
                            width: '150px',
                            height: '2px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '22vh',
                            left: '-16vw',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                        }}
                    ></div>
                </div>

                {/* Pupillary Reflex & Dilation Color Pickers */}
                <div className="marker-section" style={{ position: 'absolute', top: '60%', left: '28%' }}>
                    {["Pupillary Reflex", "Pupillary Dilation"].map((box, index) => (
                        <div key={index} className="marker-item">
                            <span>{box}</span>
                            <div
                                className="color-box"
                                style={{ backgroundColor: selectedColor[box] }}
                                onClick={() => setShowPicker(showPicker === box ? null : box)}
                            ></div>

                            {showPicker === box && (
                                <div className="color-picker">
                                    {["red", "blue", "green", "yellow"].map((color) => (
                                        <div
                                            key={color}
                                            className="color-option"
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorChange(box, color)}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Conjunctiva Marker */}
                <div
                    style={{
                        position: 'absolute',
                        top: '55%',
                        left: '55%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div
                        style={{
                            width: '120px',
                            height: '2px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            zIndex: 2,
                        }}
                    ></div>
                    <div
                        style={{
                            position: 'absolute',
                            left: '130px',
                            top: '-10px',
                            backgroundColor: 'white',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            fontWeight: 'bold',
                            color: 'black',
                            zIndex: 3,
                        }}
                    >
                        Conjunctiva
                    </div>
                </div>

                {/* Conjunctiva Input Boxes */}
                <div
                    className="marker-section"
                    style={{
                        position: 'absolute',
                        top: '65%',
                        left: '75%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    {[
                        "Conjuctival health",
                        "Redness and Inflammation Health",
                        "Conjuctival vasculature",
                    ].map((box, index) => (
                        <div key={index} className="marker-item">
                            <span>{box}</span>
                            <div
                                className="color-box"
                                style={{
                                    backgroundColor: selectedColor[box] || 'transparent',
                                }}
                                onClick={() => setShowPicker(showPicker === box ? null : box)}
                            ></div>

                            {showPicker === box && (
                                <div className="color-picker">
                                    {["red", "blue", "green", "yellow"].map((color) => (
                                        <div
                                            key={color}
                                            className="color-option"
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorChange(box, color)}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Cornea Marker */}
                <div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '60%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div
                        style={{
                            width: '60px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                        }}
                    ></div>
                    <div
                        style={{
                            width: '200px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '50%',
                            left: '-10px',
                            transform: 'rotate(120deg)',
                            transformOrigin: 'left center',
                            zIndex: 2,
                        }}
                    ></div>
                    <div
                        style={{
                            position: 'absolute',
                            left: '80px',
                            top: '-15px',
                            backgroundColor: 'white',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            fontWeight: 'bold',
                            color: 'black',
                            zIndex: 3,
                        }}
                    >
                        Cornea
                    </div>
                </div>

                {/* Cornea Input Boxes */}
                <div
                    style={{
                        position: 'absolute',
                        top: '17%',
                        left: '75%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    {["Corneal opacity & symmetry", "Corneal Health"].map((box, index) => (
                        <div
                            key={index}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}
                        >
                            <span>{box}</span>
                            <div
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    border: '1px solid gray',
                                    borderRadius: '4px',
                                    backgroundColor: selectedColor[box] || 'transparent',
                                    cursor: 'pointer',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                }}
                                onClick={() => setShowPicker(showPicker === box ? null : box)}
                            ></div>

                            {showPicker === box && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '30px',
                                        left: '110%',
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        gap: '8px',
                                    }}
                                >
                                    {["red", "blue", "green", "yellow"].map((color) => (
                                        <div
                                            key={color}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '4px',
                                                backgroundColor: color,
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                                            }}
                                            onClick={() => handleColorChange(box, color)}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Eyelids Marker */}
                <div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div
                        style={{
                            width: '100px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '5px',
                            left: '-280px',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                        }}
                    ></div>
                    <div
                        style={{
                            width: '240px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '10%',
                            left: '-170px',
                            transform: 'rotate(60deg)',
                            transformOrigin: 'left center',
                            zIndex: 2,
                        }}
                    ></div>
                    <div
                        style={{
                            position: 'absolute',
                            left: '-370px',
                            top: '-10px',
                            backgroundColor: 'white',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            fontWeight: 'bold',
                            color: 'black',
                            zIndex: 3,
                        }}
                    >
                        Eyelids
                    </div>
                </div>

                {/* Eyelids Input Boxes */}
                <div
                    style={{
                        position: 'absolute',
                        top: '17%',
                        left: '300px',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    {[
                        "Eye Dryness (meibomian Glands)",
                        "Normal Movements (any ptosis)",
                        "Swelling",
                    ].map((box, index) => (
                        <div
                            key={index}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}
                        >
                            <span>{box}</span>
                            <div
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    border: '1px solid gray',
                                    borderRadius: '4px',
                                    backgroundColor: selectedColor[box] || 'transparent',
                                    cursor: 'pointer',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                }}
                                onClick={() => setShowPicker(showPicker === box ? null : box)}
                            ></div>

                            {showPicker === box && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '30px',
                                        left: '110%',
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        gap: '8px',
                                    }}
                                >
                                    {["red", "blue", "green", "yellow"].map((color) => (
                                        <div
                                            key={color}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '4px',
                                                backgroundColor: color,
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                                            }}
                                            onClick={() => handleColorChange(box, color)}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>



            {/*Third Image */}


            <h2 className="summary-title" style={{ marginTop: '20px' }}>Eye Scan Analysis</h2>
            <div className="divider"></div>

            <div className="image-section">
                <img src="./fundus.jpeg" style={{ width: 400, height: 400 }} alt="Eye Scan" className="eye-image" />

                <div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {/* First Dotted Line - Horizontal */}
                    <div
                        style={{
                            width: '100px',
                            height: '2px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '2px',
                            left: '-280px',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                        }}
                    ></div>

                    {/* Second Dotted Line - Diagonal */}
                    <div
                        style={{
                            width: '200px',
                            height: '2px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '10%',
                            left: '-170px',
                            transform: 'rotate(45deg)',
                            transformOrigin: 'left center',
                            zIndex: 2,
                        }}
                    ></div>

                </div>


                {/* Input Boxes and Color Pickers Below Cornea Marker (2 Input Boxes) */}
                <div
                    style={{
                        position: 'absolute',
                        top: '4vh',
                        left: '12vw',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    {["Macula Appearance", "Fovea Appearance",].map((box, index) => (
                        <div
                            key={index}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}
                        >
                            <div key={index} className="marker-item">
                                <span>{box}</span>
                            </div>

                            {/* Clickable Transparent Color Box */}
                            <div
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    border: '1px solid gray',
                                    borderRadius: '4px',
                                    backgroundColor: selectedColor[box] || 'transparent',
                                    cursor: 'pointer',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                }}
                                onClick={() => setShowPicker(showPicker === box ? null : box)}
                            ></div>

                            {/* Color Picker */}
                            {showPicker === box && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '30px',
                                        left: '110%',
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        gap: '8px',
                                    }}
                                >
                                    {["red", "blue", "green", "yellow"].map((color) => (
                                        <div
                                            key={color}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '4px',
                                                backgroundColor: color,
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                                            }}
                                            onClick={() => handleColorChange(box, color)}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="label-container" style={{ top: '48%', left: '22%' }}>
                    <div
                        style={{
                            width: '15vw',
                            height: '2px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '12vh',
                            left: '1vw',
                            transform: 'translateY(-50%)',
                            rotate: '342deg',
                            zIndex: 2,
                        }}


                    ></div>

                    <div className="marker-section" style={{ top: '20vh', left: '-6vw' }}>
                        {["AV Crossing", "Vascular Tortuosity", "Hypertension Signs"].map((box, index) => (
                            <div key={index} className="marker-item">
                                <span>{box}</span>
                                <div
                                    className="color-box"
                                    style={{ backgroundColor: selectedColor[box] }}
                                    onClick={() => setShowPicker(showPicker === box ? null : box)}
                                ></div>

                                {showPicker === box && (
                                    <div className="color-picker">
                                        {["red", "blue", "green", "yellow"].map((color) => (
                                            <div
                                                key={color}
                                                className="color-option"
                                                style={{ backgroundColor: color }}
                                                onClick={() => handleColorChange(box, color)}
                                            ></div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Label: Pupil */}
                <div className="label-container" style={{ top: '48%', left: '22%' }}>

                    <div
                        style={{
                            width: '20vw',
                            height: '2px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '1vh',
                            left: '1vw',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                        }}
                    ></div>
                </div>

                {/* Color Pickers Section */}
                <div className="marker-section" style={{ top: '45%', left: '15%' }}>
                    {["Cup Disc Ratio", "Nasal Shifting", "Cup Vasculature", "Optic Disc Pallor"].map((box, index) => (
                        <div key={index} className="marker-item">
                            <span>{box}</span>
                            <div
                                className="color-box"
                                style={{ backgroundColor: selectedColor[box] }}
                                onClick={() => setShowPicker(showPicker === box ? null : box)}
                            ></div>

                            {showPicker === box && (
                                <div className="color-picker">
                                    {["red", "blue", "green", "yellow"].map((color) => (
                                        <div
                                            key={color}
                                            className="color-option"
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorChange(box, color)}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/*Thinkness of vessels */}
                <div className="label-container" style={{ top: '65%', left: '50%' }}>
                    {/* <div className="label-box">Pupil</div> */}
                    <div
                        style={{
                            width: '15vw',
                            height: '2px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '-1vh',
                            right: '-15vw',
                            transform: 'translateY(-50deg)',
                            zIndex: 2,
                        }}
                    ></div>
                </div>

                {/* Color Pickers Section */}
                <div className="marker-section" style={{ top: '30vh', left: '60vw' }}>
                    {["Thickening of vessels", " Microaneurysm", "Hemorrhages", "Exudates"].map((box, index) => (
                        <div key={index} className="marker-item">
                            <span>{box}</span>
                            <div
                                className="color-box"
                                style={{ backgroundColor: selectedColor[box] }}
                                onClick={() => setShowPicker(showPicker === box ? null : box)}
                            ></div>

                            {showPicker === box && (
                                <div className="color-picker">
                                    {["red", "blue", "green", "yellow"].map((color) => (
                                        <div
                                            key={color}
                                            className="color-option"
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorChange(box, color)}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Label: Pupil */}
                <div className="label-container" style={{ top: '28%', left: '52%' }}>
                    <div
                        style={{
                            width: '12vw',
                            height: '2px',
                            borderTop: '3px dotted green',
                            position: 'absolute',
                            top: '1vh',
                            left: '1vw',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                        }}>

                    </div>
                </div>

                {/* Color Pickers Section */}
                <div className="marker-section" style={{ top: '27%', left: '77%' }}>
                    {["Neovascularization"].map((box, index) => (
                        <div key={index} className="marker-item">
                            <span>{box}</span>
                            <div
                                className="color-box"
                                style={{ backgroundColor: selectedColor[box] }}
                                onClick={() => setShowPicker(showPicker === box ? null : box)}
                            ></div>

                            {showPicker === box && (
                                <div className="color-picker">
                                    {["red", "blue", "green", "yellow"].map((color) => (
                                        <div
                                            key={color}
                                            className="color-option"
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorChange(box, color)}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>



                <div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {/* First Dotted Line - Horizontal */}
                    <div
                        style={{
                            width: '100px',
                            height: '2px',
                            borderTop: '2px dotted green',
                            position: 'absolute',
                            top: '-10px',
                            left: '120px',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                        }}
                    ></div>

                    {/* Second Dotted Line - Diagonal */}
                    <div
                        style={{
                            width: '290px',
                            height: '2px',
                            borderTop: '2px dotted green',
                            position: 'absolute',
                            top: '-10px',
                            left: '120px',
                            transform: 'rotate(145deg)',
                            transformOrigin: 'left center',
                            zIndex: 2,
                        }}
                    ></div>

                </div>


                {/* Input Boxes and Color Pickers Below Cornea Marker (2 Input Boxes) */}
                <div
                    style={{
                        position: 'absolute',
                        top: '8px',
                        left: '77%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    {["Scars", "Choroidal Tesserations",].map((box, index) => (
                        <div
                            key={index}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}
                        >
                            <div key={index} className="marker-item">
                                <span>{box}</span>
                            </div>

                            {/* Clickable Transparent Color Box */}
                            <div
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    border: '1px solid gray',
                                    borderRadius: '4px',
                                    backgroundColor: selectedColor[box] || 'transparent',
                                    cursor: 'pointer',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                }}
                                onClick={() => setShowPicker(showPicker === box ? null : box)}
                            ></div>

                            {/* Color Picker */}
                            {showPicker === box && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '30px',
                                        left: '110%',
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        gap: '8px',
                                    }}
                                >
                                    {["red", "blue", "green", "yellow"].map((color) => (
                                        <div
                                            key={color}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '4px',
                                                backgroundColor: color,
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                                            }}
                                            onClick={() => handleColorChange(box, color)}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};


