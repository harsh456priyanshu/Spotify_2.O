import React from 'react'
import { Link} from 'react-router-dom'
import logo from '../assets/logo.png';



const Navbar = () => {


return (
    <nav className="bg-gray-900 text-white px-6 py-4 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="h-12 hover:scale-110  object-contain" />
               
            </div>
            <ul className='flex gap-10 text-sm md-text-base'>
                <li>
                    <Link to="/"  className='hover:text-green-400 font-bold text-xl hover:font-extralight transition'>Home</Link>
                </li>
             
                <li>
                    <Link to="/playlist" className='hover:text-green-400 font-bold text-xl hover:font-extralight  transition'>My Playlist</Link>
                </li>
            </ul>
        </div>
    </nav>
)
}

export default Navbar