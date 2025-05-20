import { useState } from "react";
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from "lucide-react";
export function Hero() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="relatvie h-screen w-full overflow-hidden">
            <img
                src="./eyezen-connect.jpg"
                alt="Hero Image"
                className="w-full h-full object-cover absolute top-0 left-0 z-0"
            />
            <div className="absolute inset-0 bg-black/10 z-10"></div>

            <nav className="fixed top-4 left-4 right-4 z-50 backdrop-blur-md bg-white/10 rounded-full px-4 py-3 flex items-center justify-between max-w-4xl mx-auto text-white md:px-6">
                {/* Left side - Logo */}
                <div className="flex items-center space-x-4">
                    <a href="#" className="font-semibold text-sm px-4 py-2 hover:bg-white/20 rounded-full transition-colors">
                        EyeZenX
                    </a>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    <span className="h-8 border-r-2"></span>
                    <a href="#" className="font-semibold text-sm px-4 hover:bg-white/40 p-2 rounded-full">
                        How it works
                    </a>
                    <a href="#" className="font-semibold text-sm px-4 hover:bg-white/40 rounded-full p-2">
                        About Company
                    </a>
                    <a href="#" className="font-semibold text-sm px-4 hover:bg-white/40 rounded-full p-2">
                        Our Partners
                    </a>
                    <a href="#" className="font-semibold text-sm px-4 hover:bg-white/40 rounded-full p-2">
                        Contact Us
                    </a>
                </div>

                {/* Desktop Right Section */}
                <div className="hidden md:flex items-center space-x-4">
                    <span className="h-8 border-l-2 px-4">
                        <a href="#" className="font-semibold text-sm px-4 py-2 hover:bg-white/20 rounded-full transition-colors">
                            Get Started
                        </a>
                    </span>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-white/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Mobile Menu Dropdown */}

                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-sm mt-4 py-2 rounded-lg space-y-2 border border-white/10">
                        {/* Navigation Links */}
                        <a href="#" className="block px-4 py-2 hover:bg-white/20 text-sm font-semibold text-white">
                            How it works
                        </a>
                        <a href="#" className="block px-4 py-2 hover:bg-white/20 text-sm font-semibold text-white">
                            About Company
                        </a>
                        <a href="#" className="block px-4 py-2 hover:bg-white/20 text-sm font-semibold text-white">
                            Our Partners
                        </a>
                        <a href="#" className="block px-4 py-2 hover:bg-white/20 text-sm font-semibold text-white">
                            Contact Us
                        </a>

                        <div className="border-t border-white/20 mx-4"></div>

                        <a href="#" className="block px-4 py-2 hover:bg-white/20 text-sm font-semibold text-white">
                            Get Started
                        </a>
                    </div>

                )}
            </nav>
            {/* floating eye  */}
            <div className="eye hidden md:flex absolute z-20  items-center space-x-4 top-[36vh] left-[70vw] transform -translate-y-1/2 -translate-x-1/2 ">
                <span className="bg-white/30 rounded-full border-2 border-white w-5 h-5 flex items-center justify-center shadow-lg">
                    <span className="bg-white/40 w-[4px] h-[4px] rounded-full shadow-inner"></span>
                </span>
                <span className="bg-white/30 text-gray-200 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-white/70 transition">
                    Eyes
                </span>
            </div>
            {/* Evolution  */}
            <div className="eye hidden md:flex absolute z-20  items-center space-x-4 top-[50vh] left-[64vw] transform -translate-y-1/2 -translate-x-1/2">
                <span className="bg-white/30 rounded-full border-2 border-white w-10 h-10 sm:w-8 sm:h-8 md:w-5 md:h-5 flex items-center justify-center shadow-lg">
                    <span className="bg-white/40 w-4 h-4 sm:w-3 sm:h-3 md:w-[8px] md:h-[8px] rounded-full shadow-inner"></span>
                </span>
                <span className="bg-white/30 text-gray-200 font-semibold px-5 py-2 sm:px-6 sm:py-2 rounded-full shadow-md hover:bg-white/70 transition text-base sm:text-sm md:text-base min-w-[140px] sm:min-w-0 text-center">
                    Evolution
                </span>

            </div>

            <div className="eye hidden md:flex absolute z-20  items-center space-x-4 top-[25vh] left-[48vw] transform -translate-y-1/2 -translate-x-1/2">
                <span className="bg-white/30 text-gray-200 font-semibold px-5 py-2 sm:px-6 sm:py-2 rounded-full shadow-md hover:bg-white/70 transition text-base sm:text-sm md:text-base min-w-[140px] sm:min-w-0 text-center">
                    Evidence
                </span>
                <span className="bg-white/30 rounded-full border-2 border-white w-10 h-10 sm:w-8 sm:h-8 md:w-5 md:h-5 flex items-center justify-center shadow-lg">
                    <span className="bg-white/40 w-4 h-4 sm:w-3 sm:h-3 md:w-[8px] md:h-[8px] rounded-full shadow-inner"></span>
                </span>

            </div>

            <div className="px-4 sm:px-6  max-w-[90%] md:max-w-6xl mx-auto sm:mx-[5vw] z-30 relative pt-[55vh] md:pt-[40vh] flex">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4 md:space-y-4 lg:space-y-6 text-white"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight">
                        <span className="block text-lg sm:text-xl md:text-2xl lg:text-4xl font-normal text-white/70 mb-2 sm:mb-3 md:mb-4">
                            Early. Easy. Essential.
                        </span>
                        <span className="block leading-snug sm:leading-tight md:leading-tight">
                            EyeZenx connect<br className="hidden sm:inline" />
                            sees what others miss.
                        </span>
                    </h1>
                </motion.div>
            </div>

            {/* get started  button */}
            <div className="px-4 sm:px-6 max-w-[90%] md:max-w-4xl left-[5vw] z-30 relative pt-16 md:pt-24 flex">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4 md:space-y-4 lg:space-y-6 w-full flex flex-col items-start"
                >
                    <Button
                        className="bg-gradient-to-r from-[#095DFF] to-[#E4E5EE] hover:from-[#004ECC] hover:to-[#009ECC] text-white rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                    >
                        Get started
                        <ArrowRight className="w-6 h-6" />
                    </Button>


                </motion.div>
            </div>
        </div>
    )
}