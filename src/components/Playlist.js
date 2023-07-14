import React from 'react';
import TrackList from './TrackList';

import './Playlist.css';

function Playlist(props) {
    let enableSaveButton = props.playlist.length !== 0 && props.playlistName;
    let saveButton = enableSaveButton ? 
        (<button className="standard" type="submit">Save to Spotify</button>) :
        (<button className="standard" type="submit" disabled="disabled" title="Playlist needs a name and at least 1 song.">Save to Spotify</button>);
    
    return (
        <div className="Playlist">
            <form>
                <input type="text" placeholder="Playlist Name" />
                {saveButton}
            </form>
            <TrackList tracks={props.playlist} context="playlist" action={props.removeFunction} />
        </div>
    );
}

export default Playlist;