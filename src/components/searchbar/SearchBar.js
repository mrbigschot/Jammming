import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const [song, setSong] = useState('');
    const handleInputChangeSong = ({target}) => { setSong(target.value); };

    const [artist, setArtist] = useState('');
    const handleInputChangeArtist = ({target}) => { setArtist(target.value); };

    const [album, setAlbum] = useState('');
    const handleInputChangeAlbum = ({target}) => { setAlbum(target.value); };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchFunction(song, artist, album);
    }

    return (
        <div className="SearchBar">
            <form onSubmit={handleSubmit}>
                <h2>Search for songs...</h2>
                <div>
                    <input type="text" placeholder="Song" value={song} onChange={handleInputChangeSong} />
                    <input type="text" placeholder="Artist" value={artist} onChange={handleInputChangeArtist} />
                    <input type="text" placeholder="Album" value={album} onChange={handleInputChangeAlbum} />
                </div>
                
                <button className="standard" type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchBar;