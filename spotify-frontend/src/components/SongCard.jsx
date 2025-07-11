import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

const SongCard = ({song , setNowPlaying ,handleAddToPlaylist}) => {
  return (
    <div className='relative p-4 rounded-xl shadow-lg bg-green-400 bg-opacity-30 backdrop-blur-xl border border-green-300 hover:scale-105 transition duration-300 flex flex-col items-center'>
            <img src={song.album.cover} alt={song.album.title} className='w-full h-auto rounded mb-3'/>
            <h2 className='text-lg font-bold mt-2 text-center text-white font-["Circular"]'>{song.artist.name}</h2>
            <p className='text-green-100 text-sm text-center font-["Circular"]'>{song.artist.name}</p>
        
            <div className='flex justify-between w-full mt-3 gap-2'>
              <button 
            onClick={() => setNowPlaying(song)}
            className='flex-1 bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200'
            >
              Play Now
            </button>

               <button
                    onClick={() => handleAddToPlaylist({
                        id: song.id,
                        title: song.title,
                        artist: song.artist.name,
                        thumbnailUrl: song.album.cover,
                        audioUrl: song.preview
                    })}
                    className="px-4 py-2 text-white hover:text-yellow-400 transition duration-200"
                >
<FontAwesomeIcon icon={faBookmark} className="text-xl" />

                </button>
            </div>
    </div>
  );
};

export default SongCard

 
