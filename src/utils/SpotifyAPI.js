import clientID from './SpotifyAPISupport';

const spotifyLoginUrl = 'https://accounts.spotify.com';
const spotifyApiUrl = 'https://api.spotify.com/v1';
const redirectUri = 'http://localhost:3000/';
const corsPrefix = 'https://cors-anywhere.herokuapp.com/';

let accessToken = null;

const SpotifyAPI = {
    login() {
        var loginUrl = spotifyLoginUrl + '/authorize';
        loginUrl += '?response_type=token';
        loginUrl += '&client_id=' + encodeURIComponent(clientID);
        // url += '&scope=' + encodeURIComponent(scope);
        loginUrl += '&redirect_uri=' + encodeURIComponent(redirectUri);
        // url += '&state=' + encodeURIComponent(state);
    
        window.location = loginUrl;
    },

    expireConnection() {
        alert('Connection to Spotify is about to expire!');
        accessToken = null;
        window.location = redirectUri;
    },

    getAccessToken() {
        if (accessToken) return accessToken;

        const accessTokenHash = window.location.hash.match(/access_token=([^&]*)/);
        const expiresInHash = window.location.hash.match(/expires_in=([^&]*)/);

        if (accessTokenHash && expiresInHash) {
          accessToken = accessTokenHash[1];
          const expiresIn = Number(expiresInHash[1]);
          window.setTimeout(SpotifyAPI.expireConnection, expiresIn * 1000);
          window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
          return accessToken;
        }
    },

    async searchSongs(song, artist, album) {
        if (SpotifyAPI.getAccessToken()) {
            let endpointUrl = "/search";
            let params = "?type=track&q=";
            if (song) {
                params += `track:${song}%20`;
            }
            if (artist) {
                params += `artist:${artist}%20`;
            }
            if (album) {
                params += `album:${album}%20`;
            }
            let fetchUrl = corsPrefix + spotifyApiUrl + endpointUrl + params;
            let fetchSettings = {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            };
        
            try {
                let response = await fetch(fetchUrl, fetchSettings);
                if (response.ok) {
                    let jsonResponse = await response.json();
                    let tracks = jsonResponse.tracks;
                    let results = tracks.items.map((track) => {
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri
                        }
                    });
                    return results;
                }
                throw new Error('Request failed!');
            } catch (error) {
                console.log(error);
            }
        }
    },

    async savePlaylist(name, tracks) {
        // get the User's Spotify ID

        // create a Playlist using the UserID

        // add songs to the playlist
    }
};

export default SpotifyAPI;