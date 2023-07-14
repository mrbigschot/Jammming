import React from 'react';
import Track from './Track';

import './TrackList.css';

function TrackList(props) {
    let trackComponents = props.tracks.map((track) => {
            return <Track key={track.id} context={props.context} trackInfo={track} action={props.action} />;
        }
    );
    
    return (
        <ul className="TrackList">
            {trackComponents}
        </ul>
    );
}

export default TrackList;