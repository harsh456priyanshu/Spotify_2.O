import React, { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Pause, Plus, Heart, Clock, Volume2,
  Download, Share2, MoreVertical
} from 'lucide-react';
import { toast } from 'react-toastify';
import clsx from 'clsx';

const SongCard = memo(({ song, setNowPlaying, handleAddToPlaylist, isPlaying = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleLike = useCallback((e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(!isLiked ? 'Added to favorites' : 'Removed from favorites', {
      position: 'bottom-left',
      autoClose: 2000
    });
  }, [isLiked]);

  const handleAddToPlaylistClick = (e) => {
    e.stopPropagation();
    handleAddToPlaylist({
      id: song.id,
      title: song.title,
      artist: song.artist.name,
      thumbnailUrl: song.album.cover,
      audioUrl: song.preview
    });
    toast.success(`"${song.title}" added to playlist!`, {
      position: 'bottom-left',
      autoClose: 2000
    });
  };

  const formatDuration = (duration) => {
    if (!duration) return '0:00';
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const floatingButtons = [
    {
      icon: Heart,
      action: handleLike,
      isActive: isLiked,
      classes: 'bg-red-500/90 text-white border-red-400/50',
      glowColor: 'rgb(239, 68, 68)'
    },
    {
      icon: Download,
      action: () => {},
      isActive: false,
      classes: 'bg-blue-500/90 text-white border-blue-400/50',
      glowColor: 'rgb(59, 130, 246)'
    },
    {
      icon: Share2,
      action: () => {},
      isActive: false,
      classes: 'bg-purple-500/90 text-white border-purple-400/50',
      glowColor: 'rgb(147, 51, 234)'
    },
    {
      icon: MoreVertical,
      action: () => {},
      isActive: false,
      classes: 'bg-gray-500/90 text-white border-gray-400/50',
      glowColor: 'rgb(107, 114, 128)'
    }
  ];

  return (
    <motion.div
      className="relative cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setNowPlaying(song)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-xl rounded-xl overflow-hidden border border-gray-700/30 shadow-lg">
        {/* Album Art */}
        <div className="relative aspect-square overflow-hidden group">
          <img
            src={song.album.cover}
            alt={song.album.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
          )}

          {/* Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setNowPlaying(song);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-white" />
              ) : (
                <Play className="w-7 h-7 ml-1 text-white" />
              )}
            </motion.button>
          </div>

          {/* Floating Buttons */}
          <motion.div
            className="absolute top-4 right-4 flex flex-col space-y-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 30 }}
            transition={{ duration: 0.4 }}
          >
            {floatingButtons.map((btn, index) => (
              <motion.button
                key={index}
                className={clsx(
                  'p-3 rounded-full backdrop-blur-xl border transition-all duration-300',
                  btn.isActive
                    ? btn.classes
                    : 'bg-black/40 text-gray-300 hover:text-white hover:bg-black/60 border-gray-600/30'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  btn.action(e);
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  boxShadow: `0 0 25px ${btn.glowColor}50`,
                  y: -2
                }}
                whileTap={{ scale: 0.85 }}
              >
                <btn.icon className="w-5 h-5" />
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Song Info */}
        <div className="p-4 text-white">
          <h3 className="text-xl font-bold truncate">{song.title}</h3>
          <p className="text-sm text-gray-400 truncate">{song.artist.name}</p>

          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3" />
              <span>{formatDuration(song.duration)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-3 h-3" />
              <span>HD</span>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleAddToPlaylistClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500/10 rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add to Playlist</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default SongCard;
