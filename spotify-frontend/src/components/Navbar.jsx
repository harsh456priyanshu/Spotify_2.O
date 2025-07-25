import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, UserButton, SignInButton } from '@clerk/clerk-react';
import { useMockUser, MockUserButton, MockSignInButton } from './auth/ClerkProvider';
import { Music, Home, ListMusic, User, Menu, X, Search, Bell } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  // Use mock auth instead of Clerk
  const { isSignedIn, user } = useMockUser();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/playlist', label: 'Playlists', icon: <ListMusic className="w-5 h-5" /> },
    { path: '/about', label: 'About', icon: <User className="w-5 h-5" /> },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50
          ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800'
          : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-4">
        {/* Logo */}
        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="flex items-center space-x-3 group"
          >
           
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Spotify 2.0
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden md:flex items-center space-x-8"
          variants={itemVariants}
        >
          {navItems.map((item) => (
            <motion.div key={item.path} className="relative">
              <Link
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-green-400 bg-green-400/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
              {location.pathname === item.path && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="hidden lg:flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 w-96"
          variants={itemVariants}
        >
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search for songs, artists, or albums..."
            className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
          />
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex items-center space-x-4"
          variants={itemVariants}
        >
          {/* Notifications */}
          <motion.button
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200 relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full"></span>
          </motion.button>

          {/* Auth Section */}
          {isSignedIn ? (
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <span className="hidden md:block text-gray-300 text-sm">
                Welcome, {user?.firstName || 'User'}!
              </span>
              <MockUserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10 rounded-full ring-2 ring-green-400/50',
                  },
                }}
              />
            </motion.div>
          ) : (
            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login">
                  <button className="px-4 py-2 text-white border border-gray-600 rounded-full font-medium hover:border-white transition-all duration-200">
                    Login
                  </button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup">
                  <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-black font-semibold hover:shadow-lg transition-all duration-200">
                    Sign Up
                  </button>
                </Link>
              </motion.div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <motion.div
                className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
                />
              </motion.div>

              {/* Mobile Navigation */}
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 2) }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'text-green-400 bg-green-400/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Auth */}
              {!isSignedIn && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 border-t border-gray-800"
                >
                  <MockSignInButton mode="modal">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-black font-semibold">
                      Sign In
                    </button>
                  </MockSignInButton>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
