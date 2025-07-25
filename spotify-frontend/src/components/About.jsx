import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Player } from '@lottiefiles/react-lottie-player';
import { Music, Users, Award, TrendingUp, Heart, Star, Zap, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(heroRef.current.querySelector('.hero-title'), 
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(heroRef.current.querySelector('.hero-subtitle'), 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
      );

      // Stats animation
      gsap.fromTo(statsRef.current.querySelectorAll('.stat-item'), 
        { opacity: 0, y: 80, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Features animation
      gsap.fromTo(featuresRef.current.querySelectorAll('.feature-card'), 
        { opacity: 0, x: -100, rotation: -5 },
        { 
          opacity: 1, 
          x: 0, 
          rotation: 0, 
          duration: 1, 
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "50M+", label: "Active Users" },
    { icon: <Music className="w-8 h-8" />, number: "100M+", label: "Songs" },
    { icon: <Globe className="w-8 h-8" />, number: "180+", label: "Countries" },
    { icon: <Award className="w-8 h-8" />, number: "25+", label: "Awards" }
  ];

  const features = [
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Lightning Fast",
      description: "Stream music instantly with our optimized servers and CDN network worldwide.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Personalized",
      description: "AI-powered recommendations that learn your taste and discover new favorites.",
      color: "from-pink-400 to-red-500"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "High Quality",
      description: "Lossless audio quality up to 320kbps for the ultimate listening experience.",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Always Growing",
      description: "New features, artists, and content added daily to keep your experience fresh.",
      color: "from-green-400 to-teal-500"
    }
  ];

  const teamMembers = [
    { name: "Alex Johnson", role: "CEO & Founder", avatar: "🧑‍💼" },
    { name: "Sarah Kim", role: "CTO", avatar: "👩‍💻" },
    { name: "Mike Chen", role: "Head of Design", avatar: "🎨" },
    { name: "Emily Davis", role: "Music Director", avatar: "🎵" }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white overflow-hidden">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10"
          style={{ y, opacity }}
        />
        
        <div className="text-center max-w-6xl mx-auto relative z-10">
          <motion.h1 
            className="hero-title text-7xl lg:text-9xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            About Spotify 2.0
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle text-2xl lg:text-3xl text-gray-300 mb-12 leading-relaxed"
          >
            Revolutionizing the way you discover, share, and experience music
          </motion.p>

          <motion.div 
            className="flex justify-center mb-16"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Player
              autoplay
              loop
              src="https://assets1.lottiefiles.com/packages/lf20_khzniaya.json"
              style={{ height: '400px', width: '400px' }}
            />
          </motion.div>

          <motion.div
            className="prose prose-lg prose-invert max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-xl text-gray-300 leading-relaxed">
              We're not just another streaming platform. We're a community of music lovers, 
              artists, and innovators working together to create the future of audio entertainment. 
              Our mission is to connect people through the universal language of music.
            </p>
          </motion.div>
        </div>

        {/* Floating music notes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ♪
          </motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            By the Numbers
          </motion.h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255,255,255,0.1)" 
                }}
              >
                <div className="text-green-400 mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What Makes Us Different
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10`}></div>
                <div className="relative z-10">
                  <div className={`text-transparent bg-gradient-to-r ${feature.color} bg-clip-text mb-6 flex justify-start`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Meet the Team
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-green-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Experience the future of music streaming today. It's free, it's fast, and it's waiting for you.
          </p>
          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-black font-bold text-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
