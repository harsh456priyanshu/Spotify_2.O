import React , {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeezerSearch from './components/DeezerSearch';
import MyPlaylists from './components/MyPlaylists';

import NowPlayingBar from "./components/NowPlayingBar"
import Navbar from './components/Navbar';



const App = () => {
const [nowPlaying , setNowPlaying] = useState(null)

  return (
   <Router>
      <Navbar />
      <div className='pt-24 pb-24 bg-yellow-100 min-h-screen'>
        <Routes>
          <Route path='/' element={<DeezerSearch setNowPlaying={setNowPlaying}/>} />
         
          <Route path='/playlist' element={<MyPlaylists setNowPlaying={setNowPlaying} />} />

        </Routes>
        
       <NowPlayingBar nowPlaying={nowPlaying} />
      </div>
   </Router>
  )
}

export default App;