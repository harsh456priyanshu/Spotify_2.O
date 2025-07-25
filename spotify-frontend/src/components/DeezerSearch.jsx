import React, { useState , useEffect} from 'react';
import SongCard from "./SongCard";
import { toast } from 'react-toastify';
import axios from 'axios';
import MicButton from "./MicButton"


const DeezerSearch = ({nowPlaying ,setNowPlaying}) => {

    const [query, setQuery] = useState(localStorage.getItem('lastQuery') || '');
    const [songs, setSongs] = useState(() => {
         try {
        return JSON.parse(localStorage.getItem('lastSongs')) || [];
    }catch {
        return []
    }
    });
   


   const handleSearch = async (searchQuery = query) => {
    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${searchQuery}`,
        {
          headers: {
            'X-Requested-with': 'XMLHttpRequest'
          }
        }
      );
      const results = Array.isArray(res.data.data) ? res.data.data : [];
      setSongs(results);
      localStorage.setItem('lastSongs' , JSON.stringify(results));
      localStorage.setItem('lastQuery' , searchQuery);
    } catch (err) {
      console.log(err);
      setSongs([]); 
    }
  };

    const handleAddToPlaylist = (song) => {
        const existing = JSON.parse(localStorage.getItem("myPlaylist")) || [];
        const alreadySaved = existing.find((item) => item.id === song.id);
        if (!alreadySaved) {
            localStorage.setItem("myPlaylist", JSON.stringify([...existing, song]));
            toast.success("Added to Playlist!");
        } else {
            toast.info('Aleady in Playlist');
        }
    };


    useEffect(() => {
        if(query && songs.length === 0) {
            handleSearch(query);
        }
    } , []);


    return (
        <div className='p-4 max-w-7xl mx-auto bg-blue-800 '>
            <div className='flex flex-row md:flex-bold mb-6 gap-4 justify-center '>
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search songs or artists"
                    className='border-b p-3 flex-1 outline-0 hover:scale-102  w-3/4 md:w-auto rounded-full'
                />
               
                <button onClick={handleSearch} 
                className='text-black hover:text-blue-900 lg:text-2xl  sm:text-sm hover:scale-102  px-6 py-3 outline-0 rounded-full  border-b w-1/4'>Search</button>
                 <MicButton  onVoice={(voiceText) => {
                    setQuery(voiceText);
                     handleSearch(voiceText);
                     
                    }} />
            </div>

            <div className='flex flex-wrap justify-center gap-3 mb-8'>
                {['pop', 'Rock', 'Hip-hop', 'chill', 'Jazz', 'classical'].map((gerne) => (
                    <button
                        key={gerne}
                        onClick={() => handleSearch(gerne)}
                        className='bg-blue-900  hover:bg-blue-700  hover:scale-110 hover:text-white  px-4 py-2 rounded-full  text-sm font-semibold transition'
                    >
                        {gerne}
                    </button>
                ))}
            </div>


            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {songs.map((song) => (
                    <SongCard key={song.id} song={song} setNowPlaying={setNowPlaying} handleAddToPlaylist={handleAddToPlaylist}  />
                ))}
            </div>

        </div>
    )
}

export default DeezerSearch