import { motion } from "framer-motion";
import { Button } from "./ui/button";

export function Benifit() {
  const data = [
    {
      id: 1,
      image: "./doctor.jpg",
      heading: "Faster diagnostics and clinical actions",
      content: "Faster diagnostics and clinical actions Faster diagnostics and clinical actions Faster diagnostics and clinical actions",
      link: "#",
    },
    {
      id: 2,
      image: "./patient.jpg",
      heading: "Improved patient retention and satisfaction",
      content: "Faster diagnostics and clinical actions Faster diagnostics and clinical actions Faster diagnostics and clinical actions",
      link: "#",
    },
    {
      id: 3,
      image: "./refralgap.jpg",
      heading: "Reduce referral gaps and communication",
      content: "Faster diagnostics and clinical actions Faster diagnostics and clinical actions Faster diagnostics and clinical actions",
      link: "#",
    },
    {
      id: 4,
      image: "./easydocumentation.jpg",
      heading: "Easy documentation and audit trails",
      content: "Faster diagnostics and clinical actions Faster diagnostics and clinical actions Faster diagnostics and clinical actions.",
      link: "#",
    },
  ];

  return (
       <section className="relative w-full min-h-screen bg-[#E0EAF3] px-4 md:px-8 py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center space-y-4 md:space-y-6"
        >
          <Button
            variant="outline"
            className="rounded-full border-blue-600 bg-[#F2F7FF99] hover:bg-blue-50 px-6 py-2 md:px-8 md:py-3 text-sm md:text-base text-blue-800 font-semibold shadow-sm"
          >
            Benefits
          </Button>
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            Creating Wellness Together
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            Healthcare doesn't start at the hospital anymore. It starts at the shop down the street.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {data.map((item, index) => {
            const isOdd = item.id % 2 === 1;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isOdd ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative h-auto md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl group"
              >
                <div className={`flex flex-col md:flex-row h-full ${isOdd ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 md:gap-0`}>
                  {/* Image Container */}
                  <div className="relative md:w-1/2 h-64 md:h-full overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.heading}
                      className="w-full h-full object-cover transform origin-center"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                  </div>

                  {/* Content Container */}
                  <div className="md:w-1/2 bg-white p-4 md:p-8 flex flex-col justify-center space-y-2 md:space-y-4">
                    <h4 className="text-xl md:text-2xl font-bold text-gray-800">{item.heading}</h4>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {item.content}
                    </p>
                    <Button
                      variant="outline"
                      className="w-fit text-blue-600 hover:text-white hover:bg-blue-600 rounded-full px-4 py-1 md:px-6 md:py-2 text-sm md:text-base border-blue-600 mt-2 md:mt-4"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
