import React from 'react';
import './Track.css';

function Track(props) {
    let actionName;
    if (props.context === 'playlist') {
        actionName = '-';
    } else {
        actionName = '+';
    }
    const handleAction = () => props.action(props.trackInfo);
    
    return (
        <li className="Track">
            <div className="TrackDetails">
                <div className="TrackTitle">
                    {props.trackInfo.name}
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