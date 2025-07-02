import React, { useState } from 'react';
import SongCard from "./SongCard";
import NowPlayingBar from "./NowPlayingBar"
import { toast } from 'react-toastify';
import axios from 'axios';


const DeezerSearch = () => {

    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [nowPlaying, setNowPlaying] = useState(null);

    const handleSearch = async (searchQuery = query) => {
        try {
            const encodedQuery = encodeURIComponent(`https://api.deezer.com/search?q=${searchQuery}`);
            const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${query}`,
                {
                    headers: {
                        'X-Requested-with': 'XMLHttpRequest'
                    }
                }
            );
            setSongs(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };


    const handleAddToPlaylist = (song) => {
        const existing = JSON.parse(localStorage.getItem("myPlaylist")) || [];
        const alreadySaved = existing.find((item) => item.id === song.id);
        if (!alreadySaved) {
            localStorage.setItem("myPlaylist", JSON.stringify([...existing, song]));
            toast.success("🎵 Added to Playlist!");
        } else {
            toast.info('Aleady in Playlist');
        }
    }


    return (
        <div className='p-4 max-w-7xl mx-auto'>
            <h1 className='text-2xl md:text-4xl font-bold text-center mb-6'>Search Music</h1>

            <div className='flex flex-col md:flex-bold mb-6 gap-4 justify-center '>
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search songs or artists"
                    className='border p-3 flex-1 rounded w-full md:w-auto'
                />
                <button onClick={handleSearch} className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-md'>Search</button>


             


            </div>

            <div className='flex flex-wrap justify-center gap-3 mb-8'>
                {['pop', 'Rock', 'Hip-hop', 'chill', 'Jazz', 'classical'].map((gerne) => (
                    <button
                        key={gerne}
                        onClick={() => handleSearch(gerne)}
                        className='bg-gray-200  hover:bg-green-500  hover:text-white  px-4 py-2 rounded-full  text-sm font-semibold transition'
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

            {nowPlaying && (
                <NowPlayingBar song={nowPlaying} />
            )}
        </div>
    )
}

export default DeezerSearch