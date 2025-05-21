import { motion, useAnimation } from 'framer-motion'
import { cn } from "@/lib/utils"
import { useScrollActivity } from '../customHooks/useScrollActivity.js';
import { useEffect } from 'react';

export const CircularText = () => {
  const isScrolling = useScrollActivity();
  const controls = useAnimation();

  useEffect(() => {
    if (isScrolling) {
      controls.start({
        rotate: 360,
        transition: {
          repeat: Infinity,
          duration: 12,
          ease: 'linear',
        }
      });
    } else {
      controls.stop();
    }
  }, [isScrolling, controls]);

  return (
    <div className={cn(
      "relative flex items-center justify-center",
      "w-[clamp(200px,60vw,300px)] h-[clamp(200px,60vw,300px)]", // Responsive sizing
      "sm:w-64 sm:h-64", // Small screens
      "md:w-72 md:h-72" // Medium screens
    )}>
      {/* Center Dot */}
      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full z-10" />

      {/* Rotating Text Circle */}
      <motion.div
        animate={controls}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg 
          viewBox="0 0 200 200"
          className="w-full h-full text-gray-800"
          preserveAspectRatio="xMidYMid meet" // Better mobile scaling
        >
          <defs>
            <path
              id="circlePath"
              d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0"
            />
          </defs>
          <text 
            fill="currentColor" 
            fontSize="clamp(12px,4vw,28px)" // Responsive font size
            fontFamily="sans-serif"
            textLength="425" // Better text spacing
          >
            <textPath 
              href="#circlePath" 
              startOffset="0%"
              method="align" 
              spacing="auto"
            >
              Evidence - Evolution - Eyes -
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Touch Hint for Mobile */}
     
    </div>
  )
}