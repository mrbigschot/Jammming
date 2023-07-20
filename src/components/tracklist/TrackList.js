import React from 'react';
import Track from '../track/Track';

import './TrackList.css';

function TrackList(props) {
    let trackComponents = props.tracks.map((track, trackIndex) => {
            return <Track 
                key={track.id} 
                context={props.context} 
                trackInfo={track} 
                trackIndex={trackIndex + 1} 
                action={props.action} 
            />;
        }
    );
    
    return (
        <ul className="TrackList">
            {trackComponents}
        </ul>
    );
}

export default TrackList;