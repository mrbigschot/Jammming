import React from 'react';
import TrackList from './TrackList';

import './SearchResults.css';

function SearchResults(props) {
    return (
        <div className="SearchResults">
            <h2>Results...</h2>
            <TrackList tracks={props.results} context="search" action={props.addFunction} />
        </div>
    );
}

export default SearchResults;