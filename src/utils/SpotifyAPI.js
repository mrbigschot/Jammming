const devMode = true;
const redirectUri = (devMode ? 'http://localhost:3000/' : 'https://mrbigschot.github.io/Jammming/');
const corsPrefix = (devMode ? 'https://cors-anywhere.herokuapp.com/' : '');
const clientID = '91bf79d84fff4ec0b9960048ab233286';
const spotifyLoginUrl = 'https://accounts.spotify.com';
const spotifyApiUrl = 'https://api.spotify.com/v1';

let accessToken = null;

const SpotifyAPI = {
    login() {
        var loginUrl = spotifyLoginUrl + '/authorize';
        loginUrl += '?response_type=token';
        loginUrl += '&client_id=' + encodeURIComponent(clientID);
        loginUrl += '&scope=' + encodeURIComponent("playlist-modify-public");
        loginUrl += '&redirect_uri=' + encodeURIComponent(redirectUri);
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
          window.history.pushState('Access Token', null, '/'); // stomp on the parameter-containing url from the history
          return accessToken;
        }
    },

    getRequestHeaders() {
        return {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        };
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
                headers: SpotifyAPI.getRequestHeaders()
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

    async getUserID() {
        if (SpotifyAPI.getAccessToken()) {
            let endpointUrl = "/me";
            let fetchUrl = corsPrefix + spotifyApiUrl + endpointUrl;
            let fetchSettings = {
                method: 'GET',
                headers: SpotifyAPI.getRequestHeaders()
            };
        
            try {
                let response = await fetch(fetchUrl, fetchSettings);
                if (response.ok) {
                    let jsonResponse = await response.json();
                    let userId = jsonResponse.id;
                    return userId;
                }
                throw new Error('Request failed!');
            } catch (error) {
                console.log(error);
            }
        }
    },

    async createPlaylist(userId, playlistName) {
        if (SpotifyAPI.getAccessToken()) {
            let endpointUrl = `/users/${userId}/playlists`;
            let fetchUrl = corsPrefix + spotifyApiUrl + endpointUrl;
            let fetchSettings = {
                method: 'POST',
                headers: SpotifyAPI.getRequestHeaders(),
                body: JSON.stringify({
                    "name": playlistName,
                    "description": "Created using the Jammming app"
                })
            };
        
            try {
                let response = await fetch(fetchUrl, fetchSettings);
                if (response.ok) {
                    let jsonResponse = await response.json();
                    let playlistId = jsonResponse.id;
                    return playlistId;
                }
                throw new Error('Request failed!');
            } catch (error) {
                console.log(error);
            }
        }
    },

    async addPlaylistTracks(playlistId, tracks) {
        if (SpotifyAPI.getAccessToken()) {
            let endpointUrl = `/playlists/${playlistId}/tracks`;
            let fetchUrl = corsPrefix + spotifyApiUrl + endpointUrl;
            let fetchSettings = {
                method: 'POST',
                headers: SpotifyAPI.getRequestHeaders(),
                body: JSON.stringify({
                    "uris": tracks.map((track => track.uri))
                })
            };
        
            try {
                let response = await fetch(fetchUrl, fetchSettings);
                if (response.ok) {
                    let jsonResponse = await response.json();
                    return jsonResponse.snapshot_id;
                }
                throw new Error('Request failed!');
            } catch (error) {
                console.log(error);
            }
        }
    },

    async savePlaylist(playlistName, tracks) {
        let userId = await SpotifyAPI.getUserID();
        let playlistId = await SpotifyAPI.createPlaylist(userId, playlistName);
        return await SpotifyAPI.addPlaylistTracks(playlistId, tracks);
    }
};

export default SpotifyAPI;