import { motion } from 'framer-motion';
import { Button } from "./ui/button";

export function Solution() {
    return (
        <section className="relative w-full min-h-screen bg-[#E0EAF3] overflow-hidden py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto relative z-10 shadow-xl p-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-16 text-center"
                >
                    <Button 
                        variant="outline"
                        className="rounded-full border-blue-600 bg-[#F2F7FF99] hover:bg-blue-50 px-8 py-6 mb-6 shadow-sm"
                    >
                        Our Solutions
                    </Button>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <img 
                            src="./solution.jpg" 
                            alt="solution" 
                            className="w-full h-[600px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                    </motion.div>

                    {/* Solutions List */}
                    <div className="space-y-12">
                        {[
                            {
                                icon: './support.png',
                                title: 'Plug-and-Play diagnostic gateway',
                                text: 'A plug-and-play diagnostic gateway that brings EyeZenX’s full diagnostic engine to vision centers, optical shops, and rural health clinics.'
                            },
                            {
                                icon: './statoscope.png',
                                title: 'Peripheral health intelligence',
                                text: 'A Peripheral health intelligence layer that captures and analyzes insights in underserved areas—where access is limited but the need is greatest'
                            },
                            {
                                icon: './globe.png',
                                title: 'End-to-End network',
                                text: 'An end-to-end network that identifies risk and connects patients to specialists in hours—accelerating care when it matters most.'
                            }
                        ].map((solution, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="flex gap-6 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center p-3">
                                        <img 
                                            src={solution.icon} 
                                            alt={solution.title} 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold text-gray-900">{solution.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{solution.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Background Elements */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute inset-0 bg-[length:100px_100px] [mask-image:linear-gradient(to_bottom,transparent,white)]" 
                        style={{
                            backgroundImage: 'radial-gradient(rgba(12,82,255,0.2) 1px,transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />
                </div>
            </div>
        </section>
    )
}