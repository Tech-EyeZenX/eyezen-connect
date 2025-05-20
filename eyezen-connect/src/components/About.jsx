import { motion } from "framer-motion";
import { Button } from "./ui/button";
export function About() {
    return (
        <section className="relative w-full min-h-screen bg-[#E0EAF3] overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 bg-gradient-to-r from-[#FE53BB]/10 via-transparent to-[#0044FF]/10"
            />

            {/* Floating grid pattern */}
            <div className="absolute inset-0 z-0">
                <div className="h-full w-full relative overflow-hidden opacity-20 hover:opacity-30 transition-opacity duration-500">
                    {/* Base grid with 3D effect */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
          linear-gradient(to right, rgba(99,102,241,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(99,102,241,0.1) 1px, transparent 1px),
          linear-gradient(45deg, rgba(99,102,241,0.05) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(99,102,241,0.05) 1px, transparent 1px)
        `,
                            backgroundSize: "40px 40px",
                            backgroundPosition: "0 0",
                            animation: "gridPan 20s linear infinite"
                        }}
                    >
                        {/* Animated depth lines */}
                        <div
                            className="absolute inset-0 bg-[length:40px_40px] opacity-30"
                            style={{
                                backgroundImage: "linear-gradient(45deg, transparent 49%, rgba(147,197,253,0.1) 50%, transparent 51%)",
                                animation: "gridRotate 40s linear infinite"
                            }}
                        />

                        {/* Floating cubes */}
                        {[...Array(16)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-3 h-3 border border-blue-300/30"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animation: `floatCube ${10 + i * 2}s infinite ease-in-out`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Content container */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 flex flex-col items-center">
                {/* Decorative text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.05, y: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute top-[1.2] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                    <h2 className="text-[clamp(2rem,18vw,12rem)] md:text-[clamp(3rem,30vw,16rem)] font-bold md:font-black tracking-tight md:tracking-tighter text-center bg-gradient-to-r from-sky-500 to-[#8F51EA] bg-clip-text text-transparent">
                        EVIDENCE
                    </h2>
                </motion.div>

                {/* Main content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative z-10 w-full max-w-3xl text-center space-y-8"
                >
                    {/* Section header */}
                    <motion.div
                        initial={{ scale: 0.95 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring" }}
                        className="inline-block"
                    >
                        <Button
                            asChild
                            variant="glass"
                            size="lg"
                            className="rounded-full backdrop-blur-[18px] transition-colors text-black bg-gradient-to-r from-[#095DFF] to-white"

                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                About EyezenX Connect
                            </motion.button>
                        </Button>
                    </motion.div>

                    {/* Content text */}
                    <div className="space-y-6 md:space-y-8">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm md:text-xl leading-relaxed text-black/90"
                        >
                            EyeZenX Connect is a cloud-based referral and communication platform uniting optometrists and doctors for seamless, secure collaboration. Combined with the analytical power of EyeZenX Next, it enables advanced retinal biomarker screening and systemic disease stratification— designed for neurodegenerative conditions and scalable to millions through our core AI models.
                        </motion.p>


                    </div>
                </motion.div>
            </div>
            <div className="text-center space-y-8 md:space-y-12 px-4 py-12 md:py-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent mb-8"
                >
                    The Problem EyeZenX Connect Solves
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[1, 2, 3].map((num, index) => (
                        <motion.div
                            key={num}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="group relative bg-sky-500/20 rounded-2xl p-8  transition-all duration-300 overflow-hidden"
                        >
                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-300/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                            <div className="relative z-10">
                                <span className="inline-block mb-6 text-4xl md:text-5xl font-black bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">
                                    0{num}
                                </span>

                                <p className="text-lg md:text-xl font-semibold text-white/90 leading-relaxed">
                                    {[
                                        "Lack of tools for systemic disease screening at first-contact points",
                                        "Retinal cues for early disease often go untapped in primary care",
                                        "Absence of diagnostic infrastructure for finding vague symptoms"
                                    ][index]}
                                </p>
                            </div>

                            {/* Hover Indicator */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    )
}