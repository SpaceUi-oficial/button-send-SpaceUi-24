'use client'
import React from 'react';
import AnimatedButton from './components/AnimatedButton';

const ButtonDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex justify-center">
          <AnimatedButton onClick={() => console.log('Button clicked!')} />
        </div>
    </div>
  );
};

export default ButtonDemo;


