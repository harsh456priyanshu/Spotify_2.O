import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const AudioWaveLoader = ({ isLoading = false, message = "Loading music..." }) => {
  const waveRefs = useRef([]);
  const particleRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isLoading && waveRefs.current.length > 0) {
      // Animate wave bars
      waveRefs.current.forEach((bar, index) => {
        if (bar) {
          gsap.to(bar, {
            scaleY: `random(0.2, 2)`,
            duration: `random(0.5, 1.2)`,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.1
          });
        }
      });

      // Animate particles
      particleRefs.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            x: `random(-50, 50)`,
            y: `random(-50, 50)`,
            rotation: `random(0, 360)`,
            scale: `random(0.5, 1.5)`,
            duration: `random(2, 4)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
          });
        }
      });
    }
  }, [isLoading]);

  const waveVariants = {
    initial: { scaleY: 0.1, opacity: 0 },
    animate: { 
      scaleY: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      scaleY: 0.1, 
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="text-center">
            {/* Pulsing background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main loader container */}
            <motion.div
              ref={containerRef}
              className="relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-3xl p-12 border border-gray-700/50 backdrop-blur-xl shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(34, 197, 94, 0.3)",
                  "0 0 60px rgba(59, 130, 246, 0.3)",
                  "0 0 30px rgba(168, 85, 247, 0.3)",
                  "0 0 30px rgba(34, 197, 94, 0.3)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Spinning vinyl record effect */}
              <motion.div
                className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="absolute inset-4 rounded-full bg-black/50 border border-gray-600">
                  <div className="absolute inset-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-900">
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </motion.div>

              {/* Audio wave visualization */}
              <div className="flex items-end justify-center space-x-2 mb-8 h-20">
                {[...Array(12)].map((_, index) => (
                  <motion.div
                    key={index}
                    ref={el => waveRefs.current[index] = el}
                    className="bg-gradient-to-t from-green-400 via-blue-400 to-purple-400 rounded-full origin-bottom"
                    style={{
                      width: '6px',
                      height: `${20 + Math.random() * 40}px`,
                    }}
                    variants={waveVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  />
                ))}
              </div>

              {/* Loading text with typewriter effect */}
              <motion.h2
                className="text-2xl font-bold text-white mb-4"
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {message}
              </motion.h2>

              {/* Progress bar */}
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-6">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, index) => (
                  <motion.div
                    key={index}
                    ref={el => particleRefs.current[index] = el}
                    className="absolute w-1 h-1 bg-green-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Orbiting elements */}
              {[...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                    style={{
                      transformOrigin: `${50 + index * 20}px 0px`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioWaveLoader;
