import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const MusicReactiveBackground = ({ 
  isPlaying = false, 
  audioLevel = 0.5, 
  frequency = 'medium',
  theme = 'default' 
}) => {
  const canvasRef = useRef(null);
  const shapesRef = useRef([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const themes = {
    default: {
      colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'],
      gradients: ['from-green-500/20', 'to-blue-500/20', 'via-purple-500/10']
    },
    cyberpunk: {
      colors: ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5'],
      gradients: ['from-pink-500/20', 'to-cyan-500/20', 'via-purple-500/10']
    },
    sunset: {
      colors: ['#ff7b54', '#ff9a8b', '#a8e6cf', '#ffd93d'],
      gradients: ['from-orange-500/20', 'to-yellow-500/20', 'via-pink-500/10']
    }
  };
  
  const currentTheme = themes[theme];
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    if (isPlaying && shapesRef.current.length > 0) {
      shapesRef.current.forEach((shape, index) => {
        if (shape) {
          const intensity = audioLevel * (0.5 + Math.random() * 0.5);
          
          gsap.to(shape, {
            scale: 1 + intensity * 2,
            rotation: `+=${intensity * 180}`,
            opacity: 0.3 + intensity * 0.7,
            duration: 0.5 + Math.random() * 0.5,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
          });
        }
      });
    }
  }, [isPlaying, audioLevel]);

  const geometricShapes = [
    // Floating triangles
    { type: 'triangle', count: 6 },
    // Rotating squares
    { type: 'square', count: 4 },
    // Pulsing circles
    { type: 'circle', count: 8 },
    // Hexagons
    { type: 'hexagon', count: 3 }
  ];

  const generateShapeStyle = (index, type) => {
    const baseDelay = index * 0.2;
    const color = currentTheme.colors[index % currentTheme.colors.length];
    
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${baseDelay}s`,
      background: `linear-gradient(135deg, ${color}40, ${color}20)`,
      borderColor: `${color}60`
    };
  };

  const ShapeComponent = ({ type, index, style }) => {
    const shapeVariants = {
      initial: {
        scale: 0,
        rotate: 0,
        opacity: 0
      },
      animate: {
        scale: [0, 1.2, 1],
        rotate: type === 'triangle' ? [0, 120, 0] : type === 'square' ? [0, 90, 0] : [0, 360, 0],
        opacity: [0, 0.6, 0.3],
        x: [0, mousePosition.x * 10, 0],
        y: [0, mousePosition.y * 10, 0]
      },
      hover: {
        scale: 1.5,
        opacity: 0.8,
        transition: { duration: 0.3 }
      }
    };

    const shapeClasses = {
      triangle: "w-8 h-8 clip-path-triangle border-2",
      square: "w-10 h-10 border-2 rounded-sm",
      circle: "w-6 h-6 rounded-full border-2",
      hexagon: "w-12 h-12 clip-path-hexagon border-2"
    };

    return (
      <motion.div
        ref={el => shapesRef.current[index] = el}
        className={`absolute ${shapeClasses[type]} backdrop-blur-sm`}
        style={style}
        variants={shapeVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.1
        }}
      />
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradients.join(' ')}`}
        animate={{
          background: isPlaying ? [
            `linear-gradient(45deg, ${currentTheme.colors[0]}20, ${currentTheme.colors[1]}20)`,
            `linear-gradient(135deg, ${currentTheme.colors[2]}20, ${currentTheme.colors[3]}20)`,
            `linear-gradient(225deg, ${currentTheme.colors[1]}20, ${currentTheme.colors[0]}20)`,
            `linear-gradient(315deg, ${currentTheme.colors[3]}20, ${currentTheme.colors[2]}20)`
          ] : `linear-gradient(45deg, ${currentTheme.colors[0]}10, ${currentTheme.colors[1]}10)`
        }}
        transition={{
          duration: 4,
          repeat: isPlaying ? Infinity : 0,
          ease: "easeInOut"
        }}
      />

      {/* Floating geometric shapes */}
      {geometricShapes.map((shapeGroup, groupIndex) => 
        [...Array(shapeGroup.count)].map((_, index) => (
          <ShapeComponent
            key={`${shapeGroup.type}-${index}`}
            type={shapeGroup.type}
            index={groupIndex * shapeGroup.count + index}
            style={generateShapeStyle(groupIndex * shapeGroup.count + index, shapeGroup.type)}
          />
        ))
      )}

      {/* Pulsing orbs that react to music */}
      {isPlaying && [...Array(12)].map((_, index) => (
        <motion.div
          key={`orb-${index}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${currentTheme.colors[index % currentTheme.colors.length]}80, transparent)`
          }}
          animate={{
            scale: [1, 1 + audioLevel * 3, 1],
            opacity: [0.3, 0.8, 0.3],
            x: [0, (Math.random() - 0.5) * 100, 0],
            y: [0, (Math.random() - 0.5) * 100, 0]
          }}
          transition={{
            duration: 1 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1
          }}
        />
      ))}

      {/* Grid overlay with breathing effect */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(${currentTheme.colors[0]}40 1px, transparent 1px),
            linear-gradient(90deg, ${currentTheme.colors[1]}40 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
        animate={{
          opacity: isPlaying ? [0.05, 0.15, 0.05] : 0.05,
          scale: isPlaying ? [1, 1.02, 1] : 1
        }}
        transition={{
          duration: 3,
          repeat: isPlaying ? Infinity : 0,
          ease: "easeInOut"
        }}
      />

      {/* Scanning line effect */}
      {isPlaying && (
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
          animate={{
            y: [0, window.innerHeight]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* Corner accent elements */}
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={`corner-${index}`}
          className={`absolute w-20 h-20 ${
            index === 0 ? 'top-0 left-0' :
            index === 1 ? 'top-0 right-0' :
            index === 2 ? 'bottom-0 left-0' :
            'bottom-0 right-0'
          }`}
          style={{
            background: `conic-gradient(from ${index * 90}deg, ${currentTheme.colors[index]}40, transparent)`
          }}
          animate={{
            rotate: isPlaying ? 360 : 0,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 10, repeat: isPlaying ? Infinity : 0, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      ))}
    </div>
  );
};

export default MusicReactiveBackground;
