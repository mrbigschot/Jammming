import React from 'react';
import './Track.css';

function Track(props) {
    let actionName;
    let trackPrefix;
    if (props.context === 'playlist') {
        actionName = '-';
        trackPrefix = props.trackIndex + ". ";
    } else {
        actionName = '+';
        trackPrefix = '';
    }
    const handleAction = () => props.action(props.trackInfo);
    
    return (
        <li className="Track">
            <div className="TrackDetails">
                <div className="TrackTitle">
                    {trackPrefix + props.trackInfo.name}
                </div>
                <div className="TrackSubtitle">
                    <span className="Artist">{props.trackInfo.artist}</span>
                    <span className="Album">{props.trackInfo.album}</span>
                </div>
            </div>
            <button className="subtle" onClick={handleAction}>{actionName}</button>
        </li>
    );
}

export default Track;