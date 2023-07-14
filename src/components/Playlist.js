import React from 'react';
import TrackList from './TrackList';

import './Playlist.css';

function Playlist(props) {
    let isEmpty = props.playlist.length === 0;
    let saveButton = isEmpty ? 
        (<button className="standard" type="button" disabled="disabled">Save to Spotify</button>) : 
        (<button className="standard" type="button">Save to Spotify</button>);
    
    return (
        <div className="Playlist">
            <TrackList tracks={props.playlist} context="playlist" action={props.removeFunction} />
            {saveButton}
        </div>
    );
}

export default Playlist;