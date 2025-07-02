import React from 'react'
import { Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav  className="bg-gray-900 text-white px-6 py-4 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className='text-xl md:text-2xl font-bold'>Spotify 2.0</h1>
            <ul className='flex gap-6 text-sm md-text-base'>
                <li>
                    <Link to="/" className='hover:text-green-400 transition'>Home</Link>
                </li>
                <li>
                    <Link to="/browse" className='hover:text-green-400 transition'>Browse</Link>
                </li>
                <li>
                    <Link to="/playlists" className='hover:text-green-400 transition'>Playlists</Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar