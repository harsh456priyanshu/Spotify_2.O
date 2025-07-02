import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeezerSearch from './components/DeezerSearch';
import MyPlaylists from './components/MyPlaylists';
import Navbar from './components/Navbar';
const App = () => {
  return (
   <Router>
      <Navbar />
      <div className='pt-24 pb-24 bg-gray-50 min-h-screen'>
        <Routes>
          <Route path='/' element={<DeezerSearch/>} />
          <Route path='/borwse' element={<div>Hello</div>} />
          <Route path='/playlist' element={<MyPlaylists />} />
        </Routes>
      </div>
   </Router>
  )
}

export default App;