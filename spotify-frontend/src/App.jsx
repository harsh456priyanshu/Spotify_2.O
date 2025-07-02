import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeezerSearch from './components/DeezerSearch';
import Navbar from './components/Navbar';
const App = () => {
  return (
   <Router>
      <Navbar />
      <div className='pt-24 pb-24 bg-gray-50 min-h-screen'>
        <Routes>
          <Route path='/' element={<DeezerSearch/>} />
          <Route path='/borwse' element={<div className="text-center mt-10 text-xl">🎧 Browse by Albums, Genres, and More — coming soon!</div>} />
          <Route path='/playlists' element={<div className="text-center mt-10 text-xl">📁 Your playlists — coming soon!</div>} />
        </Routes>
      </div>
   </Router>
  )
}

export default App;