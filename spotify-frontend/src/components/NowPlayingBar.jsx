import React from 'react';

const NowPlayingBar = ({ song }) => {
    if (!song) return null;


    return (
        <div className='fixed botton-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg z-50'>
            <div>
                <img src="" alt="" />
                <div>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <audio controls autoPlay src={song.preview} className='w-64' />
        </div>

    );
};

export default NowPlayingBar