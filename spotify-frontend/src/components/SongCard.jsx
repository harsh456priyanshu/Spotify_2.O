import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

const SongCard = ({song , setNowPlaying ,handleAddToPlaylist}) => {
  return (
    <div className='bg-green-400 rounded shadow hover:shadow-lg tansition p-4 flex flex-col items-center hover:scale-101  '>
            <img src={song.album.cover} alt={song.album.title} className='w-full h-auto rounded'/>
            <h2 className='text-lg fonnt-semibold mt-2 text-center'>{song.artist.name}</h2>
            <p className='text-gray-600 text-sm text-center'>{song.artist.name}</p>
        
            <div className='flex  justify-between'>
              <button 
            onClick={() => setNowPlaying(song)}
            className='mt-3 bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700'
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
                    className="mt-2  px-4 py-2 "
                >
<FontAwesomeIcon icon={faBookmark} className="text-xl text-gray-600" />

                </button>
            </div>
    </div>
  );
};

export default SongCard