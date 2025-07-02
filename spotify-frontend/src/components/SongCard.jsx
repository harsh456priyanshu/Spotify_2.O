import React from 'react'

const SongCard = ({song , setNowPlaying}) => {
  return (
    <div className='bg-white rounded shadow hover:shadow-lg tansition p-4 flex flex-col items-center'>
            <img src={song.album.cover} alt={song.album.title} className='w-full h-auto rounded'/>
            <h2 className='text-lg fonnt-semibold mt-2 text-center'>{song.artist.name}</h2>
            <p className='text-gray-600 text-sm text-center'>{song.artist.name}</p>
            <audio controls src={song.preview} className='mt-2 w-full' />
            <button 
            onClick={() => setNowPlaying(song)}
            className='mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Play Now
            </button>
    </div>
  );
};

export default SongCard