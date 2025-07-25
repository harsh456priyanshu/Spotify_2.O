import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import DeezerSearch from './components/DeezerSearch';
import MyPlaylists from './components/MyPlaylists';
import NowPlayingBar from './components/NowPlayingBar';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ClerkProviderWrapper from './components/auth/ClerkProvider';

// Animation Components
import FloatingMusicNotes from './components/animations/FloatingMusicNotes';
import AudioWaveLoader from './components/animations/AudioWaveLoader';
import MusicReactiveBackground from './components/animations/MusicReactiveBackground';

// Hooks
import { useLenis } from './hooks/useLenis';

// Styles
import './styles/animations.css';

const App = () => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0.5);
  
  // Initialize smooth scrolling
  useLenis();
  
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simulate audio level changes when playing
  useEffect(() => {
    let interval;
    if (nowPlaying) {
      interval = setInterval(() => {
        setAudioLevel(Math.random());
      }, 200);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [nowPlaying]);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -50,
      scale: 1.02
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.6
  };

  return (
    <ClerkProviderWrapper>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
          <Navbar />
          
          <main className="pt-20 pb-24">
            <AnimatePresence mode="wait">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <motion.div
                      key="home"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <DeezerSearch setNowPlaying={setNowPlaying} />
                    </motion.div>
                  } 
                />
                
                <Route 
                  path="/playlist" 
                  element={
                    <motion.div
                      key="playlist"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <MyPlaylists setNowPlaying={setNowPlaying} />
                    </motion.div>
                  } 
                />
                
                <Route 
                  path="/about" 
                  element={
                    <motion.div
                      key="about"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <About />
                    </motion.div>
                  } 
                />
                
                <Route 
                  path="/login" 
                  element={
                    <motion.div
                      key="login"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <Login />
                    </motion.div>
                  } 
                />
                
                <Route 
                  path="/signup" 
                  element={
                    <motion.div
                      key="signup"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <Signup />
                    </motion.div>
                  } 
                />
              </Routes>
            </AnimatePresence>
          </main>
          
          {/* Now Playing Bar with animation */}
          <AnimatePresence>
            {nowPlaying && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <NowPlayingBar nowPlaying={nowPlaying} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Toast Notifications */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            style={{
              '--toastify-color-dark': '#1f2937',
              '--toastify-color-success': '#10b981',
              '--toastify-color-error': '#ef4444',
              '--toastify-color-warning': '#f59e0b',
              '--toastify-color-info': '#3b82f6',
            }}
          />
          
          {/* Enhanced Background Effects */}
          <MusicReactiveBackground 
            isPlaying={!!nowPlaying}
            audioLevel={audioLevel}
            theme="default"
          />
          
          {/* Floating Music Notes */}
          <FloatingMusicNotes 
            isPlaying={!!nowPlaying}
            intensity="medium"
          />
          
          {/* Loading Screen */}
          <AudioWaveLoader 
            isLoading={isLoading}
            message="Tuning the perfect harmony..."
          />
        </div>
      </Router>
    </ClerkProviderWrapper>
  );
};

export default App;
