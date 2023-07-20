import React from 'react';
import TrackList from '../tracklist/TrackList';

import './SearchResults.css';

function SearchResults(props) {
    return (
        <div className="SearchResults TrackListContainer">
            <TrackList tracks={props.results} context="search" action={props.addFunction} />
        </div>
    );
}

export default SearchResults;