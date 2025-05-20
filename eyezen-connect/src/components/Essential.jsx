import { motion } from 'framer-motion';
import { CircularText } from './CircularText';

export function Essential() {
    return (
        <section className="relative w-full bg-[#E0EAF3] overflow-hidden px-4 md:px-8">
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 flex flex-col items-center">
                {/* Background Decorative Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.05, y: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                >
                    <h2 className="text-[clamp(2rem,20vw,12rem)] md:text-[clamp(3rem,25vw,15rem)] font-black tracking-normal md:tracking-tighter text-center bg-gradient-to-r from-sky-500 to-[#8F51EA] bg-clip-text text-transparent">
                        ESSENTIAL
                    </h2>
                </motion.div>

                {/* Radial Technical Indicators */}
                <div className="relative z-10 w-full max-w-4xl flex justify-center">
                    {/* Central Circular Text */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.6 }}
                        className="relative mx-auto"
                        viewport={{ margin: "-50px" }}
                    >
                        <CircularText className="w-[min(80vw,300px)] h-[min(80vw,300px)] md:w-[min(90vw,400px)] md:h-[min(90vw,400px)] transition-transform" />
                    </motion.div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 z-0">
                    {[...Array(12)].map((_, i) => ( // Reduced particle count for mobile
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-gradient-to-r from-sky-400 to-[#8F51EA] rounded-full"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0.4, 0],
                                x: Math.random() * 150 - 75, 
                                y: Math.random() * 150 - 75
                            }}
                            transition={{
                                duration: Math.random() * 4 + 3,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}