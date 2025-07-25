import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Music2, Music3, Music4 } from 'lucide-react';

const FloatingMusicNotes = ({ isPlaying = false, intensity = 'medium' }) => {
  const containerRef = useRef(null);
  
  const musicIcons = [Music, Music2, Music3, Music4];
  
  const intensitySettings = {
    low: { count: 8, speed: 1.5, opacity: 0.3 },
    medium: { count: 12, speed: 1.2, opacity: 0.4 },
    high: { count: 16, speed: 0.8, opacity: 0.5 },
  };
  
  const settings = intensitySettings[intensity];
  
  const noteVariants = {
    initial: (custom) => ({
      y: window.innerHeight + 100,
      x: custom.startX,
      opacity: 0,
      rotate: 0,
      scale: 0.5,
    }),
    animate: (custom) => ({
      y: -100,
      x: custom.endX,
      opacity: [0, settings.opacity, settings.opacity, 0],
      rotate: [0, 180, 360],
      scale: [0.5, custom.scale, custom.scale, 0.5],
      transition: {
        duration: custom.duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay: custom.delay,
      },
    }),
  };

  const generateNoteData = (index) => ({
    id: index,
    startX: Math.random() * window.innerWidth,
    endX: Math.random() * window.innerWidth,
    scale: 0.8 + Math.random() * 0.4,
    duration: settings.speed * (8 + Math.random() * 4),
    delay: Math.random() * 10,
    icon: musicIcons[Math.floor(Math.random() * musicIcons.length)],
    color: [
      'text-green-400',
      'text-blue-400', 
      'text-purple-400',
      'text-pink-400',
      'text-yellow-400'
    ][Math.floor(Math.random() * 5)]
  });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    >
      {isPlaying && [...Array(settings.count)].map((_, index) => {
        const noteData = generateNoteData(index);
        const IconComponent = noteData.icon;
        
        return (
          <motion.div
            key={index}
            className={`absolute ${noteData.color}`}
            custom={noteData}
            variants={noteVariants}
            initial="initial"
            animate="animate"
          >
            <IconComponent 
              className="w-6 h-6 drop-shadow-lg"
              style={{
                filter: `drop-shadow(0 0 10px currentColor)`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingMusicNotes;
