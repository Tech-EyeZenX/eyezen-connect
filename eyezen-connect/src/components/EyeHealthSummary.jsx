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
                <EyeScanInterface/>
            </div>

            {/*Second image */}

            <h2 className="summary-title" style={{ marginTop: '20px' }}>Eye Scan Analysis</h2>
            <div className="divider"></div>

            <div className="image-section">
                <img src="./eye1.png" alt="Eye Scan" className="eye-image" />

                {/* Label: Pupil */}
                <div className="label-container" style={{ top: '48%', left: '22%' }}>
                    <div className="label-box">Pupil</div>
                    <div className="dotted-line"></div>
                </div>

                {/* Color Pickers Section */}
                <div className="marker-section" style={{ top: '60%', left: '28%' }}>
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
                    {/* Green Dotted Line */}
                    <div
                        style={{
                            width: '120px',
                            height: '2px',
                            borderTop: '2px dotted green',
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                        }}
                    ></div>

                    {/* Conjunctiva Label at the end of the line */}
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


                {/* Marker: Cornea */}
                <div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '60%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {/* First Dotted Line - Horizontal */}
                    <div
                        style={{
                            width: '60px',
                            height: '2px',
                            borderTop: '2px dotted green',
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                        }}
                    ></div>

                    {/* Second Dotted Line - Diagonal */}
                    <div
                        style={{
                            width: '200px',
                            height: '2px',
                            borderTop: '2px dotted green',
                            position: 'absolute',
                            top: '50%',
                            left: '-10px',
                            transform: 'rotate(120deg)',
                            transformOrigin: 'left center',
                            zIndex: 2,
                        }}
                    ></div>

                    {/* Label at the end of diagonal line */}
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


                {/* Input Boxes and Color Pickers Below Cornea Marker (2 Input Boxes) */}
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




                {/* Marker: Cornea */}
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
                            top: '5px',
                            left: '-280px',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                        }}
                    ></div>

                    {/* Second Dotted Line - Diagonal */}
                    <div
                        style={{
                            width: '250px',
                            height: '2px',
                            borderTop: '2px dotted green',
                            position: 'absolute',
                            top: '10%',
                            left: '-170px',
                            transform: 'rotate(60deg)',
                            transformOrigin: 'left center',
                            zIndex: 2,
                        }}
                    ></div>

                    {/* Label at the end of diagonal line */}
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


                {/* Input Boxes and Color Pickers Below Cornea Marker (2 Input Boxes) */}
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
                    {["Eye Dryness (meibomian Glands)", "Normal Movements (any ptosis)", "Swelling"].map((box, index) => (
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
                            borderTop: '2px dotted green',
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
                            borderTop: '2px dotted green',
                            position: 'absolute',
                            top: '10%',
                            left: '-170px',
                            transform: 'rotate(40deg)',
                            transformOrigin: 'left center',
                            zIndex: 2,
                        }}
                    ></div>

                </div>


                {/* Input Boxes and Color Pickers Below Cornea Marker (2 Input Boxes) */}
                <div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '240px',
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



                {/* Label: Pupil */}
                <div className="label-container" style={{ top: '48%', left: '22%' }}>
                    {/* <div className="label-box">Pupil</div> */}
                    <div className="dotted-line" style={{ width: "410px" }}></div>
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

                {/* Label: Pupil */}
                <div className="label-container" style={{ top: '65%', left: '50%' }}>
                    {/* <div className="label-box">Pupil</div> */}
                    <div className="dotted-line" style={{ width: "200px" }}></div>
                </div>

                {/* Color Pickers Section */}
                <div className="marker-section" style={{ top: '62%', left: '75%' }}>
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
                    {/* <div className="label-box">Pupil</div> */}
                    <div className="dotted-line" style={{ width: "200px" }}></div>
                </div>

                {/* Color Pickers Section */}
                <div className="marker-section" style={{ top: '25%', left: '77%' }}>
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

                {/* Label: Pupil */}
                <div className="label-container" style={{ top: '87%', left: '30%', transform: 'rotate(-20deg)' }}>
                    {/* <div className="label-box">Pupil</div> */}
                    <div className="dotted-line" style={{ width: "180px" }}></div>
                </div>

                {/* Color Pickers Section */}
                <div className="marker-section" style={{ top: '80%', left: '20%' }}>
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


