import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

const SpectacularButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon: Icon,
  loading = false,
  className = '',
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);
  const particlesRef = useRef([]);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]));
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]));

  const variants = {
    primary: {
      base: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
      hover: "from-green-400 to-emerald-500",
      glow: "rgba(34, 197, 94, 0.5)"
    },
    secondary: {
      base: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white",
      hover: "from-blue-400 to-cyan-500", 
      glow: "rgba(59, 130, 246, 0.5)"
    },
    danger: {
      base: "bg-gradient-to-r from-red-500 to-pink-600 text-white",
      hover: "from-red-400 to-pink-500",
      glow: "rgba(239, 68, 68, 0.5)"
    },
    ghost: {
      base: "bg-transparent border-2 border-gray-600 text-gray-300",
      hover: "border-green-500 text-green-400 bg-green-500/10",
      glow: "rgba(34, 197, 94, 0.3)"
    }
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  useEffect(() => {
    if (isHovered && particlesRef.current.length > 0) {
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            x: `random(-20, 20)`,
            y: `random(-20, 20)`,
            scale: `random(0.5, 1.5)`,
            rotation: `random(0, 360)`,
            duration: `random(1, 2)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
          });
        }
      });
    }
  }, [isHovered]);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    
    // Create ripple effect
    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-xl font-semibold
        ${currentVariant.base} ${currentSize} ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-300 transform-gpu
      `}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: isHovered 
          ? `0 0 30px ${currentVariant.glow}, 0 0 60px ${currentVariant.glow}20`
          : "0 10px 25px rgba(0, 0, 0, 0.2)"
      }}
      {...props}
    >
      {/* Gradient overlay for hover effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${currentVariant.hover} opacity-0`}
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Holographic shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: isHovered ? ["0%", "100%"] : "0%",
          skewX: isHovered ? [0, 10] : 0
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 2
        }}
      />

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `conic-gradient(from 0deg, ${currentVariant.glow}, transparent, ${currentVariant.glow})`,
          padding: '2px',
          opacity: isHovered ? 1 : 0
        }}
        animate={{
          rotate: isHovered ? 360 : 0
        }}
        transition={{
          duration: 3,
          repeat: isHovered ? Infinity : 0,
          ease: "linear"
        }}
      >
        <div className={`w-full h-full rounded-xl ${currentVariant.base}`} />
      </motion.div>

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Floating particles on hover */}
      {isHovered && [...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          ref={el => particlesRef.current[index] = el}
          className="absolute w-1 h-1 bg-white/60 rounded-full pointer-events-none"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0], 
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: index * 0.1,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      ))}

      {/* Button content */}
      <motion.div
        className="relative z-10 flex items-center justify-center space-x-2"
        animate={{
          y: isPressed ? 1 : 0
        }}
        transition={{ duration: 0.1 }}
      >
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {Icon && !loading && (
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}
        
        <motion.span
          animate={{
            color: isHovered ? "#ffffff" : "currentColor"
          }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.span>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-xl"
        style={{
          background: `radial-gradient(circle, ${currentVariant.glow}40, transparent 70%)`
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Energy pulses */}
      {isHovered && [...Array(3)].map((_, index) => (
        <motion.div
          key={`pulse-${index}`}
          className="absolute inset-0 rounded-xl border-2 opacity-50"
          style={{
            borderColor: currentVariant.glow
          }}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ 
            scale: [1, 1.5, 2], 
            opacity: [0.5, 0.2, 0] 
          }}
          transition={{
            duration: 2,
            delay: index * 0.6,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.button>
  );
};

export default SpectacularButton;
