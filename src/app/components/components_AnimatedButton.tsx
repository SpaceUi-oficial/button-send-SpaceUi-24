import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

interface AnimatedButtonProps {
  onClick?: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();
  const text = "Send Message";

  const handleHoverStart = async () => {
    setIsAnimating(true);
    await controls.start("hover");
    setIsAnimating(false);
  };

  const handleHoverEnd = async () => {
    setIsAnimating(true);
    await controls.start("initial");
    setIsAnimating(false);
  };

  const iconVariants = {
    initial: { x: 0 },
    hover: { 
      x: 180,
      transition: { duration: 1, ease: "easeInOut" }
    },
  };

  const letterVariants = {
    initial: { y: 0 },
    hover: (i: number) => ({
      y: i % 2 === 0 ? -20 : 20,
      transition: { duration: 0.2, delay: 0.1 + i * 0.02, ease: "easeInOut" },
    }),
  };

  return (
    <motion.button
      className="relative overflow-hidden px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={controls}
      initial="initial"
      aria-label="Send Message"
    >
      <div className="flex items-center justify-center space-x-2">
        <motion.div
          variants={iconVariants}
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        >
          <FiSend className="text-2xl" style={{ transform: 'rotate(0deg)' }} />
        </motion.div>
        <div className="relative inline-block">
          {text.split('').map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              variants={letterVariants}
              custom={index}
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.button>
  );
};

export default AnimatedButton;

