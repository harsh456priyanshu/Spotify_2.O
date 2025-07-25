import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Play,
  Trash2,
  Download,
  Share2,
  Shuffle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MyPlaylists = ({ setNowPlaying }) => {
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredSong, setHoveredSong] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState(new Set());
  const playlistRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const saved = JSON.parse(localStorage.getItem('myPlaylist')) || [];
      setPlaylist(saved);
      setLoading(false);
    }, 500);

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (playlistRef.current && !loading) {
      const cards = playlistRef.current.querySelectorAll('.playlist-card');
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }
  }, [playlist, loading]);

  const handleRemove = (id) => {
    const updated = playlist.filter((song) => song.id !== id);
    localStorage.setItem('myPlaylist', JSON.stringify(updated));
    setPlaylist(updated);
    setSelectedSongs((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    toast.info('🗑️ Removed from Playlist', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const handlePlayNow = (song) => {
    if (setNowPlaying) {
      setNowPlaying({
        id: song.id,
        title: song.title,
        preview: song.audioUrl,
        album: { cover: song.thumbnailUrl },
        artist: { name: song.artist },
      });
      toast.success(`🎵 Now Playing: ${song.title}`, {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  };

  const handleShufflePlay = () => {
    if (playlist.length > 0) {
      const randomSong =
        playlist[Math.floor(Math.random() * playlist.length)];
      handlePlayNow(randomSong);
      toast.info(`🔀 Shuffling playlist...`, {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  const toggleSongSelection = (id) => {
    setSelectedSongs((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleBulkRemove = () => {
    const updated = playlist.filter((song) => !selectedSongs.has(song.id));
    localStorage.setItem('myPlaylist', JSON.stringify(updated));
    setPlaylist(updated);
    setSelectedSongs(new Set());
    toast.info(`🗑️ Removed ${selectedSongs.size} songs from playlist`);
  };

  return (
    <div className='p-6 max-w-7xl mx-auto' ref={playlistRef}>
      <div ref={headerRef}>
        <h1 className='text-green-700 hover:text-black mb-3 text-4xl font-extrabold border-b pb-2'>
          My Playlist
        </h1>
        <div className='flex justify-between py-2'>
          <button
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-200'
            onClick={handleShufflePlay}
          >
            <Shuffle className='inline-block mr-2' size={18} />
            Shuffle Play
          </button>
          {selectedSongs.size > 0 && (
            <button
              className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition duration-200'
              onClick={handleBulkRemove}
            >
              🗑 Remove Selected
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p className='text-center text-gray-500'>Loading...</p>
      ) : playlist.length === 0 ? (
        <p className='text-center text-gray-500'>No songs saved yet.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {playlist.map((song) => (
            <motion.div
              key={song.id}
              className={`playlist-card group relative p-4 rounded-xl shadow-lg backdrop-blur-xl border border-green-300 transition duration-300 flex flex-col items-center cursor-pointer ${
                selectedSongs.has(song.id)
                  ? 'bg-red-100'
                  : 'bg-green-400 bg-opacity-30'
              }`}
              onMouseEnter={() => setHoveredSong(song.id)}
              onMouseLeave={() => setHoveredSong(null)}
              onClick={() => toggleSongSelection(song.id)}
            >
              <img
                src={song.thumbnailUrl}
                alt={song.title}
                className='w-full h-auto rounded mb-3 object-cover max-h-48'
              />
              <h2 className='mt-2 font-semibold text-center text-white'>
                {song.title}
              </h2>
              <p className='text-green-100 text-sm text-center'>
                {song.artist}
              </p>

              <AnimatePresence>
                {hoveredSong === song.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className='absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex flex-col justify-center items-center gap-3 px-4'
                  >
                    <div className='flex gap-3 flex-wrap justify-center'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayNow(song);
                        }}
                        className='p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition'
                      >
                        <Play size={20} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(song.id);
                        }}
                        className='p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition'
                      >
                        <Trash2 size={20} />
                      </button>

                      <button
                        onClick={(e) => e.stopPropagation()}
                        className='p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition'
                      >
                        <Download size={20} />
                      </button>

                      <button
                        onClick={(e) => e.stopPropagation()}
                        className='p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition'
                      >
                        <Share2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlaylists;
