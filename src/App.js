import React, { useState, useEffect } from 'react';

// Styling
import './App.css';

// React components
import SearchBar from './components/searchbar/SearchBar';
import SearchResults from './components/searchresults/SearchResults';
import Playlist from './components/playlist/Playlist';

// Utilities
import SpotifyAPI from './utils/SpotifyAPI';

const tempData = [
    {
        id: 1,
        name: "Superstition",
        artist: "Stevie Wonder",
        album: "Hotter Than July",
        genre: "R&B",
        uri: 'uri1'
    },
    {
        name: "Higher Ground",
        artist: "Stevie Wonder",
        album: "Innervisions",
        genre: "R&B",
        id: 2,
        uri: 'uri2'
    },
    {
        name: "In the Stone",
        artist: "Earth, Wind & Fire",
        album: "I Am",
        genre: "R&B",
        id: 3,
        uri: 'uri3'
    },
    {
        name: "That's The Way of the World",
        artist: "Earth, Wind & Fire",
        album: "That's The Way of the World",
        genre: "R&B",
        id: 4,
        uri: 'uri4'
    },
    {
        name: "Click Bait (feat. The Hornheads)",
        artist: "Cory Wong",
        album: "The Striped Album",
        genre: "R&B",
        id: 5,
        uri: 'uri5'
    },
    {
        name: "Long Train Runnin'",
        artist: "The Doobie Brothers",
        album: "Live at the Wolf Trap",
        genre: "Rock",
        id: 6,
        uri: 'uri6'
    },
    {
        name: "The Chicken (Soul Intro)",
        artist: "Jaco Pastorius",
        album: "The Birthday Concert",
        genre: "Jazz",
        id: 7,
        uri: 'uri7'
    }
];

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName]= useState('');
    const [playlist, setPlaylist] = useState([]);

    const search = (song, artist, album) => {
       SpotifyAPI.searchSongs(song, artist, album)
       .then((results) => { setSearchResults(results) });
    }

    const updatePlaylistName = (newName) => { setPlaylistName(newName); }
    const addToPlaylist = (trackToAdd) => {
        if (!playlist.find(track => track.id === trackToAdd.id)) {
            setPlaylist((prevPlaylist) => {
                return [...prevPlaylist, trackToAdd];
            });
        }
    }
    const removeFromPlaylist = (trackToRemove) => {
        if (playlist.find(track => track.id === trackToRemove.id)) {
            setPlaylist((prevPlaylist) => {
                return prevPlaylist.filter(track => track.id !== trackToRemove.id);
            });
        }
    }
    const savePlaylistToSpotify = () => {
        alert("Saving Playlist");
        let trackURIs = playlist.map(track => track.uri);
        alert(trackURIs);
        
        setPlaylistName('');
        setPlaylist([]);
    }

    if (SpotifyAPI.getAccessToken()) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Ja<span className="mmm">mmm</span>ing</h1>
                    <h2>Spotify playlist creator using React</h2>
                </header>
                <div className="App-content-wrapper">
                    <img className="App-content-background" src="background.jpg"/>
                    <div className="App-content">
                        <div className="App-content-section">
                            <SearchBar 
                                searchFunction={search}
                            />
                            <SearchResults
                                results={searchResults}
                                addFunction={addToPlaylist}
                            />
                        </div>
                        <div className="App-content-section">
                            <Playlist 
                                playlistName={playlistName} updatePlaylistName={updatePlaylistName} 
                                playlist={playlist} removeFunction={removeFromPlaylist}
                                saveFunction={savePlaylistToSpotify}
                            />
                        </div>
                    </div>
                </div>
               
            </div>
        );
    } else {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Ja<span className="mmm">mmm</span>ing</h1>
                    <h2>Spotify playlist creator using React</h2>
                </header>
                <div className="App-content-wrapper">
                    <img className="App-content-background" src="background.jpg"/>
                    <div className="App-content">
                        <div className="App-content-section">
                            <button className="standard" onClick={SpotifyAPI.login}>Connect to Spotify</button>
                        </div>
                    </div>
                </div>
               
            </div>
        );
    }
}

export default App;