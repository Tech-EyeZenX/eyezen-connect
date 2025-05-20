import { motion } from "framer-motion"
import { Button } from "./ui/button"

export function Methodology() {
  return (
    <section className="relative w-full min-h-screen bg-[#E0EAF3] overflow-hidden py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto bg-sky-600 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[length:100px_100px]"
          style={{ backgroundImage: 'radial-gradient(#ffffff40 1px, transparent 1px)' }}>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="block text-lg md:text-4xl font-semibold mb-4 text-sky-200">
                Understanding the
              </motion.span>
              Technical Architecture
            </h1>

            <div className="space-y-12">
              {['Image & Symptom Capture', 'Cloud Data Routing', 'Autonomous Triage','Specialist Integration'].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative"
                >
                  <p className="text-xl md:text-2xl font-semibold mb-2">{step}</p>
                  <div className="w-40 h-1 bg-white/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
          >
            <img 
              src="./methodology.jpg" 
              alt="methodology" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
            
            {/* Annotation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-1 left-16 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-6xl"
            >
              <div className="h-2 w-40 bg-sky-600 rounded-full mb-2" />
              <p className="text-sm text-gray-800 font-medium h-16">
                Non-mydriatic fundus cameras, technician led symptom input
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full bg-white/10 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </section>
  )
}