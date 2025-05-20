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
      controls.stop(); // Pause rotation
    }
  }, [isScrolling, controls]);

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Center Dot */}
      <div className="w-4 h-4 bg-white rounded-full z-10"></div>

      {/* Rotating Text Circle */}
      <motion.div
        animate={controls}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: 'linear',
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-gray-800">
          <defs>
            <path
              id="circlePath"
              d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0"
            />
          </defs>
          <text fill="text-gray-800" fontSize="35" fontFamily="sans-serif">
            <textPath href="#circlePath" startOffset="0%">
              Evidence - Evolution - Eyes -
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  )
}


