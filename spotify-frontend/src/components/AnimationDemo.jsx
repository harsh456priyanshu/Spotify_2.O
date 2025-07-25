import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Download, Heart, Share, Settings } from 'lucide-react';

// Import our new animation components
import SpectacularButton from './animations/SpectacularButton';
import FloatingMusicNotes from './animations/FloatingMusicNotes';
import AudioWaveLoader from './animations/AudioWaveLoader';
import MusicReactiveBackground from './animations/MusicReactiveBackground';

const AnimationDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0.7);
  const [backgroundTheme, setBackgroundTheme] = useState('default');

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const showLoaderDemo = () => {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 4000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with our reactive component */}
      <MusicReactiveBackground 
        isPlaying={isPlaying}
        audioLevel={audioLevel}
        theme={backgroundTheme}
      />
      
      {/* Floating music notes */}
      <FloatingMusicNotes 
        isPlaying={isPlaying}
        intensity="high"
      />
      
      {/* Loading demo */}
      <AudioWaveLoader 
        isLoading={showLoader}
        message="Loading spectacular animations..."
      />

      <div className="relative z-10 p-8 space-y-12">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold text-gradient mb-4">
            🎵 Animation Showcase
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the most spectacular animations for your Spotify clone!
            These components combine Framer Motion and GSAP for incredible effects.
          </p>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
            🎛️ Animation Controls
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Play/Pause Control */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Music Controls</h3>
              <SpectacularButton
                onClick={togglePlaying}
                icon={isPlaying ? Pause : Play}
                variant="primary"
                size="large"
                className="w-full"
              >
                {isPlaying ? 'Pause Music' : 'Play Music'}
              </SpectacularButton>
            </div>

            {/* Background Theme */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Background Theme</h3>
              <div className="space-y-2">
                {['default', 'cyberpunk', 'sunset'].map((theme) => (
                  <SpectacularButton
                    key={theme}
                    onClick={() => setBackgroundTheme(theme)}
                    variant={backgroundTheme === theme ? 'primary' : 'ghost'}
                    size="medium"
                    className="w-full capitalize"
                  >
                    {theme}
                  </SpectacularButton>
                ))}
              </div>
            </div>

            {/* Loader Demo */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Loading Animation</h3>
              <SpectacularButton
                onClick={showLoaderDemo}
                icon={Download}
                variant="secondary"
                size="large"
                className="w-full"
              >
                Show Loader
              </SpectacularButton>
            </div>
          </div>
        </motion.div>

        {/* Button Showcase */}
        <motion.div
          className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
            ✨ Spectacular Buttons
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SpectacularButton variant="primary" icon={Heart}>
              Like Song
            </SpectacularButton>
            
            <SpectacularButton variant="secondary" icon={Download}>
              Download
            </SpectacularButton>
            
            <SpectacularButton variant="danger" icon={Share}>
              Share
            </SpectacularButton>
            
            <SpectacularButton variant="ghost" icon={Settings}>
              Settings
            </SpectacularButton>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpectacularButton variant="primary" size="small">
              Small Button
            </SpectacularButton>
            
            <SpectacularButton variant="secondary" size="medium" loading>
              Loading...
            </SpectacularButton>
            
            <SpectacularButton variant="danger" size="large" disabled>
              Disabled
            </SpectacularButton>
          </div>
        </motion.div>

        {/* Audio Level Control */}
        <motion.div
          className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
            🎚️ Audio Reactivity
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white text-lg mb-2">
                Audio Level: {Math.round(audioLevel * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={audioLevel}
                onChange={(e) => setAudioLevel(parseFloat(e.target.value))}
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <p className="text-gray-300 text-center">
              Adjust the audio level to see how the background reacts to music!
              The geometric shapes and colors change based on the audio intensity.
            </p>
          </div>
        </motion.div>

        {/* Features List */}
        <motion.div
          className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
            🚀 Animation Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-400">🎵 Music Reactive</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Floating music notes that dance to the beat</li>
                <li>• Background shapes that pulse with audio</li>
                <li>• Dynamic color themes</li>
                <li>• Real-time audio visualization</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-400">✨ Interactive Elements</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 3D hover effects with mouse tracking</li>
                <li>• Holographic shimmer effects</li>
                <li>• Particle systems</li>
                <li>• Ripple click animations</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-400">🎨 Visual Effects</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Animated gradients and borders</li>
                <li>• Glow and neon effects</li>
                <li>• Morphing geometric shapes</li>
                <li>• Smooth page transitions</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-pink-400">⚡ Performance</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Optimized with Framer Motion</li>
                <li>• Hardware-accelerated animations</li>
                <li>• Smooth 60fps performance</li>
                <li>• Minimal performance impact</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center text-white">
            🎯 How to Use These Animations
          </h2>
          
          <div className="text-gray-200 space-y-4">
            <p className="text-lg">
              These animation components are now integrated into your Spotify clone! Here's what's included:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-black/20 rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-green-400 mb-3">🎼 FloatingMusicNotes</h4>
                <p>Musical notes that float across the screen when music is playing</p>
              </div>
              
              <div className="bg-black/20 rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-blue-400 mb-3">🌊 AudioWaveLoader</h4>
                <p>Beautiful loading screen with animated audio waves and particles</p>
              </div>
              
              <div className="bg-black/20 rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-purple-400 mb-3">🎨 MusicReactiveBackground</h4>
                <p>Dynamic background that responds to music with geometric shapes</p>
              </div>
              
              <div className="bg-black/20 rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-pink-400 mb-3">✨ SpectacularButton</h4>
                <p>Enhanced buttons with 3D effects, particles, and ripple animations</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for the slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AnimationDemo;
