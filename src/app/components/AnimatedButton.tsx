"use client"
import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

interface AnimatedButtonProps {
  onClick?: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();
  const backgroundControls = useAnimation();
  const text = "Send Message";

  const handleHoverStart = async () => {
    setIsAnimating(true);
    controls.start("hover");
    backgroundControls.start("hover");
  };

  const handleHoverEnd = async () => {
    setIsAnimating(false);
    controls.start("initial");
    backgroundControls.start("initial");
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

  const backgroundVariants = {
    initial: { 
      background: "linear-gradient(to right, #8B5CF6, #EC4899)",
    },
    hover: { 
      background: "linear-gradient(to right, #8B5CF6, #8B5CF6)",
      transition: { duration: 1, ease: "easeInOut" }
    },
  };

  return (
    <motion.button
      className="relative overflow-hidden px-6 py-3 rounded-full text-white font-semibold text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      style={{ 
        background: "linear-gradient(to right, #8B5CF6, #EC4899)",
      }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={controls}
      initial="initial"
      aria-label="Send Message"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        variants={backgroundVariants}
        initial="initial"
        animate={backgroundControls}
      />
      <div className="flex items-center justify-center space-x-2 relative z-10">
        <motion.div
          variants={iconVariants}
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        >
          <FiSend className="text-2xl" style={{ transform: 'rotate(40deg)' }} />
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

