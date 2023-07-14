import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar() {
    const [title, setTitle] = useState('');
    const handleInputChangeTitle = ({target}) => { setTitle(target.value); };

    const [artist, setArtist] = useState('');
    const handleInputChangeArtist = ({target}) => { setArtist(target.value); };

    const [album, setAlbum] = useState('');
    const handleInputChangeAlbum = ({target}) => { setAlbum(target.value); };

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="SearchBar">
            <form onSubmit={handleSubmit}>
                <h2>Search for tracks...</h2>
                
                <div>
                    <input type="text" placeholder="Title" value={title} onChange={handleInputChangeTitle} />
                    <input type="text" placeholder="Artist" value={artist} onChange={handleInputChangeArtist} />
                    <input type="text" placeholder="Album" value={album} onChange={handleInputChangeAlbum} />
                </div>
                
                <button className="standard" type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchBar;