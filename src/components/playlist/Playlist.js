import React from 'react';
import TrackList from '../tracklist/TrackList';

import './Playlist.css';

function Playlist(props) {
    const onChangePlaylistName = ({target}) => { props.updatePlaylistName(target.value); }
    
    let enableSaveButton = props.playlist.length !== 0 && props.playlistName;
    let saveButton = enableSaveButton ? 
        (<button className="standard" type="submit">Save to Spotify</button>) :
        (<button className="standard" type="submit" disabled="disabled" title="Playlist needs a name and at least 1 song.">Save to Spotify</button>);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        props.saveFunction();
    } 

    return (
        <div className="Playlist">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Playlist Name" value={props.playlistName} onChange={onChangePlaylistName} />
                {saveButton}
            </form>
            <div className="TrackListContainer">
                <TrackList tracks={props.playlist} context="playlist" action={props.removeFunction} />
            </div>
        </div>
    );
}

export default Playlist;