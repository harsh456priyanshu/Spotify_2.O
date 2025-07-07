import React , { useState , useEffect} from 'react'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


const MyPlaylists = ({ setNowPlaying}) => {

    const [playlist , setPlaylist] = useState([]);
   

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('myPlaylist')) || [];
        setPlaylist(saved);
    } , []);


    const handleRemove = (id) => {
        const updated = playlist.filter((song) => song.id != id);
        localStorage.setItem("myPlaylist" , JSON.stringify(updated));
        setPlaylist(updated);
        toast.info(" Removed from Playlist")
    };

const handlePlayNow = (song) => {
  if (setNowPlaying) {
    setNowPlaying({
      id: song.id,
      title: song.title,
      preview: song.audioUrl,
      album: { cover: song.thumbnailUrl },
      artist: { name: song.artist }
    });
    toast.success(`Now Playing: ${song.title}`);
  }
};

  return (
    <div className='p-6 max-w-7xl mx-auto'>
            <h1 className='text-green-700 hover:text-black mb-3 text-4xl  justify-center text-shadow-blue-200  px-6 py-3 outline-0 font-extrabold border-b w-full'>My Playlist</h1>

            {playlist.length === 0 ? (
                <p className='text-center text-gray-500'>No songs saved yet.</p>
            ) : (
                <div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {playlist.map((song) => (
                        <div key={song.id} className='bg-green-400 shadow rounded p-4 text-center'>
                            <img src={song.thumbnailUrl} alt={song.title}  className='w-full h-auto  rounded'/>
                            <h2 className='mt-2 font-semibold'>{song.title}</h2>
                            <p className='text-sm text-gray-500'>{song.artist}</p>
                            
                            <div className="flex justify-center gap-2 mt-3">
                                <button
                                onClick={() => handlePlayNow(song)}
                                className='mt-3 bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700' 
                                >Play Now
                                </button>

                                 <button
                                onClick={() => handleRemove(song.id)}
                                 className=" text-white px-4 py-1 rounded hover:bg-red-600 text-2xl" 
                                ><FontAwesomeIcon icon={faTrashCan} className="" />

                                </button>
                            </div>
                        </div>
                    ))}
                </div>   
            )}
    </div>
  );
};

export default MyPlaylists;