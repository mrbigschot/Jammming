import React, { useState } from 'react';

// Styling
import './App.css';

// React components
import Header from './components/header/Header';
import SearchBar from './components/searchbar/SearchBar';
import SearchResults from './components/searchresults/SearchResults';
import Playlist from './components/playlist/Playlist';

// Utilities
import SpotifyAPI from './utils/SpotifyAPI';
import sampleData from './utils/FakeAPI';

function App() {
    // states
    const [fakeAPI, setFakeAPI] = useState(false); 
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName]= useState('');
    const [playlistTracks, setPlaylistTracks] = useState([]);
    
    const useFakeAPI = () => { setFakeAPI(true); }

    // other component functions
    const updatePlaylistName = (newName) => {
        setPlaylistName(newName);
    }
    const addToPlaylist = (trackToAdd) => {
        if (playlistTracks.length < 100 && !playlistTracks.find(track => track.id === trackToAdd.id)) {
            setPlaylistTracks((prevPlaylistTracks) => {
                return [...prevPlaylistTracks, trackToAdd];
            });
        }
    }
    const removeFromPlaylist = (trackToRemove) => {
        if (playlistTracks.find(track => track.id === trackToRemove.id)) {
            setPlaylistTracks((prevPlaylistTracks) => {
                return prevPlaylistTracks.filter(track => track.id !== trackToRemove.id);
            });
        }
    }

    // Spotify API wrapper functions
    const search = (song, artist, album) => {
        if (song || artist || album) {
            if (fakeAPI) {
                setSearchResults(sampleData);
            } else {
                SpotifyAPI.searchSongs(song, artist, album)
                    .then((results) => { setSearchResults(results) });
            }
        } else {
            setSearchResults([]);
        }
    }
    const savePlaylistToSpotify = () => {
        if (fakeAPI) {
            setPlaylistName('');
            setPlaylistTracks([]);
        } else {
            SpotifyAPI.savePlaylist(playlistName, playlistTracks)
                .then(() => {
                    setPlaylistName('');
                    setPlaylistTracks([]);
                });
        }
    }

    // component logic
    let appContent;
    if (SpotifyAPI.getAccessToken() || fakeAPI) {
        appContent = (
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
                        playlist={playlistTracks} removeFunction={removeFromPlaylist}
                        saveFunction={savePlaylistToSpotify}
                    />
                </div>
            </div>
        );
    } else {
        appContent = (
            <div className="App-content">
                <div className="App-content-section Startup">
                    <button className="standard" onClick={SpotifyAPI.login}>Connect to Spotify</button>
                    <button className="standard" onClick={useFakeAPI}>Use Sample Data</button>
                </div>
            </div>
        );
    }
        
    return (
        <div className="App">
            <div className="App-background" />
            <Header />
            <div className="App-content-wrapper">
                {appContent}
            </div>
        </div>
    );
}

export default App;