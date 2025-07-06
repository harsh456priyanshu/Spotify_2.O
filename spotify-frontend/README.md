# 🎧 Spotify 2.0 Clone – React Music Streaming App

Welcome to **Spotify 2.0**, a sleek and functional full-stack music streaming web app built using **React.js**, **TailwindCSS**, and **Jamendo Public API** for full-track, royalty-free songs. Designed to replicate the feel of Spotify with essential features and responsive design.

> 🎓 Project submitted by [Harsh Priyanshu](https://github.com/harsh456priyanshu) for college portfolio and real-world showcase.

---

## 🚀 Live Preview

[🔗 Live Demo](https://spotify-2-o-iknz-b5p54ws7y-priyanshu-rajs-projects-a1211202.vercel.app/playlist) (Add your deployed link here after deploying with Vercel/Netlify)

---

## 📸 Screenshots

| Home Page | Playlist Page | Now Playing |
|-----------|----------------|--------------|
| ![Home](../spotify-frontend/src/assets/Screen%20short/Screenshot%202025-07-06%20102631.png) | ![Playlist](./src/assets//Screen%20short/Screenshot%202025-07-06%20102746.png) | ![NowPlaying](./src//assets//Screen%20short/Screenshot%202025-07-06%20103339.png) |

---

## 🛠️ Features

- 🎵 **Search Music** from the Jamendo API (free and royalty-free)
- 📜 **Add to Playlist** and save it in browser localStorage
- ▶️ **Play Full Tracks** in Now Playing bar (works across all pages)
- 📱 **Responsive Design** for desktop, tablet, and mobile
- 🧠 **Genre Filtering** for quick discovery (pop, jazz, chill, etc.)
- ❤️ **Toast Notifications** with React-Toastify
- 🔄 **Persistent Playlist** even after page reload

---

## 🧩 Tech Stack

- **React.js** (UI)
- **Tailwind CSS** (Styling)
- **React Router** (Routing)
- **DeezerSearch API** (30 second track streaming)
- **React-Toastify** (Notifications)
- **FontAwesome** (Icons)

---

## 🧪 Installation

```bash
# Clone the repo
git clone https://github.com/harsh456priyanshu/Spotify_2.O.git

# Navigate to the project
cd Spotify_2.O

# Install dependencies
npm install

# Start the development server
npm start


📝 Folder Structure

src/
│
├── components/
│   ├── DeezerSearch.jsx
│   ├── MyPlaylists.jsx
│   ├── NowPlayingBar.jsx
│   ├── Navbar.jsx
│   └── SongCard.jsx
│
├── App.jsx
└── index.js



✅ To-Do (Future Enhancements)


🎤 Add authentication system for user-specific playlists

📁 Backend integration with MongoDB to store playlists online

💡 Use Redux or Context API for global song state

📱 Advanced UI/UX with animation and drag-drop playlist sorting

🔊 Implement volume controls and loop/shuffle

🔥 Add Lyrics API for karaoke-style display

🎧 Add queue system and multi-song playback

📲 PWA support for mobile app-like experience