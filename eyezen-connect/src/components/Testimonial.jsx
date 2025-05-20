import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export function TestMonial() {
  const [activeIndex, setActiveIndex] = useState(0);
   const data = [
    {
      id: 1,
      image: "./doctor.jpg",
      heading: "Our Testimonial",
      content: "Real time Patient Referrals,Real time Patient Referrals Real time Patient Referrals.  Real time Patient Referrals,Real time Patient Referrals Real time Patient Referrals. Real time Patient Referrals,Real time Patient Referrals Real time Patient Referrals. ",
      name: "John Doe",
    },
    {
      id: 2,
      image: "./patient.jpg",
      heading: "Our Testimonial",
      content: "Faster diagnostics and clinical actions Faster diagnostics and clinical actions Faster diagnostics and clinical actions",
      name:"Harry Potter",
    },
    {
      id: 3,
      image: "./refralgap.jpg",
      heading: "Our Testimonial",
      content: "Faster diagnostics and clinical actions Faster diagnostics and clinical actions Faster diagnostics and clinical actions",
      name:"Hermione Granger",
    },
    {
      id: 4,
      image: "./easydocumentation.jpg",
      heading: "Our Testimonial",
      content: "Faster diagnostics and clinical actions Faster diagnostics and clinical actions Faster diagnostics and clinical actions.",
      name:"Draco Malfoy",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#E0EAF3] overflow-hidden py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-6"
        >
          <motion.h1
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            className="text-4xl md:text-5xl font-bold text-black/60 bg-clip-text  mb-4"
          >
            Creating Wellness Together
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xl md:text-2xl text-gray-600 font-medium"
          >
            Get Started Today
          </motion.p>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              className="rounded-full px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all"
            >
              Login as Doctor
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Login as Optometrist
            </Button>
          </div>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {data.map((item, index) => (
              <div 
                key={item.id}
                className="w-full flex-shrink-0 p-4"
              >
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="relative h-64 md:h-96 rounded-2xl overflow-hidden group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-6">
                      <Button
                        variant="ghost"
                        className="rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        {item.heading}
                      </Button>
                      
                      <motion.blockquote
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xl md:text-2xl text-gray-700 italic leading-relaxed"
                      >
                        "{item.content}"
                      </motion.blockquote>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-lg font-semibold text-gray-900"
                      >
                        — {item.name}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Arrows */}
          <div className="absolute top-[60vh] left-[70vw] -translate-y-1/2 w-full flex  px-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-12 h-12 bg-white/80 hover:bg-white"
              onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : data.length - 1))}
            >
              <ArrowLeft className="text-gray-800" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-12 h-12 bg-white/80 hover:bg-white"
              onClick={() => setActiveIndex(prev => (prev < data.length - 1 ? prev + 1 : 0))}
            >
              <ArrowRight className="text-gray-800" />
            </Button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {data.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div 
          className="absolute inset-0 bg-[length:100px_100px]"
          style={{ 
            backgroundImage: 'radial-gradient(rgba(12,82,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>
    </section>
  )
}