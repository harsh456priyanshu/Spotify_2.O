import React , { useState , useEffect} from 'react'
import { toast } from 'react-toastify';

const MyPlaylists = () => {

    const [playlist , setPlaylist] = useState([]);
    const [nowPlaying , setNowPlaying] = useState(null)

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('myPlaylist')) || [];
        setPlaylist(saved);
    } , []);


    const handleRemove = (id) => {
        const updated = playlist.filter((song) => song.id != id);
        localStorage.setItem("myPlaylist" , JSON.stringify(updated));
        setPlaylist(updated);
        toast.success(" Removed from Playlist")
    };

  return (
    <div className='p-6 max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold text-center mb-8'>My Playlist</h1>

            {playlist.length === 0 ? (
                <p className='text-center text-gray-500'>No songs saved yet.</p>
            ) : (
                <div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {playlist.map((song) => (
                        <div key={song.id} className='bg-white shadow rounded p-4 text-center'>
                            <img src={song.thumbnailUrl} alt={song.title}  className='w-full h-40 object-cover rounded'/>
                            <h2 className='mt-2 font-semibold'>{song.title}</h2>
                            <p className='text-sm text-gray-500'>{song.artist}</p>
                            <audio controls src={song.audioUrl} className='w-full mt-2' />
                            <div className="flex justify-center gap-2 mt-3">
                                <button
                                onClick={() => setNowPlaying(song)}
                                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' 
                                >Play Now
                                </button>

                                 <button
                                onClick={() => handleRemove(song.id)}
                                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" 
                                >Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>   
            )}

            {nowPlaying && (
                <div className="mt-10 p-4 bg-gray-100 rounded shadow text-center">
                    <p className='text-xl font-bold mb-2'>Now Playing</p>
                    <img src={nowPlaying.thumbnailUrl} alt="Now Playing" className='mx-auto w-32 h-32 object-cover rounded'/>
                    <p className='text-xl font-bold'>{nowPlaying.title}</p>
                    <p className='text-sm text-gray-500'>{nowPlaying.artist}</p>
                    <audio controls src={nowPlaying.audioUrl} className='mt-2 w-full' />
                </div>
            )}
    </div>
  );
};

export default MyPlaylists;