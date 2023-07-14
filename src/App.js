import React, { useState } from 'react';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';

import './App.css';

function App() {
    const [searchResults, setSearchResults] = useState([
        {
            name: "Superstition",
            artist: "Stevie Wonder",
            album: "Hotter Than July",
            genre: "R&B",
            id: 1
        },
        {
            name: "Higher Ground",
            artist: "Stevie Wonder",
            album: "Innervisions",
            genre: "R&B",
            id: 2
        },
        {
            name: "In the Stone",
            artist: "Earth, Wind & Fire",
            album: "I Am",
            genre: "R&B",
            id: 3
        },
        {
            name: "That's The Way of the World",
            artist: "Earth, Wind & Fire",
            album: "That's The Way of the World",
            genre: "R&B",
            id: 4
        },
        {
            name: "Click Bait (feat. The Hornheads)",
            artist: "Cory Wong",
            album: "The Striped Album",
            genre: "R&B",
            id: 5
        },
        {
            name: "Long Train Runnin'",
            artist: "The Doobie Brothers",
            album: "Live at the Wolf Trap",
            genre: "Rock",
            id: 6
        },
        {
            name: "The Chicken (Soul Intro)",
            artist: "Jaco Pastorius",
            album: "The Birthday Concert",
            genre: "Jazz",
            id: 7
        }
    ]);

    const [playlistName, setPlaylistName]= useState('');
    const [playlist, setPlaylist] = useState([]);

    const addToPlaylist = (trackToAdd) => {
        if (!playlist.find(track => track.id === trackToAdd.id)) {
            setPlaylist((prevPlaylist) => {
                return [...prevPlaylist, trackToAdd];
            });
        }
    }

    const removeFromPlayList = (trackToRemove) => {
        if (playlist.find(track => track.id === trackToRemove.id)) {
            setPlaylist((prevPlaylist) => {
                return prevPlaylist.filter(track => track.id !== trackToRemove.id);
            });
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Ja<span className="mmm">mmm</span>ing</h1>
            </header>
            <div className="App-content-wrapper">
                <img className="App-content-background" src="background.jpg"/>
                <div className="App-content">
                    <div className="App-content-section">
                        <SearchBar />
                        <SearchResults results={searchResults} addFunction={addToPlaylist} />
                    </div>
                    <div className="App-content-section">
                        <Playlist playlistName={playlistName} playlist={playlist} removeFunction={removeFromPlayList} />
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default App;