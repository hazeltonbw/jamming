let AccessToken = "";
let ExpiresIn = "";
const CLIENT_ID = "408c83c5fc334f67bce22d1074fb796a";
const REDIRECT_URI = "http://localhost:3000/";

const Spotify = {
    async getAccessToken() {
        if (AccessToken)
            return AccessToken;

        let url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        AccessToken = window.location.href.match(/access_token=([^&]*)/);
        ExpiresIn = window.location.href.match(/expires_in=([^&]*)/);


        if (AccessToken && ExpiresIn) {
            AccessToken = AccessToken[1];
            ExpiresIn = Number(ExpiresIn[1]);
            window.setTimeout(() => AccessToken = "", ExpiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        else {
            window.location = url;
        }
        return AccessToken;
    },

    async search(term) {
        AccessToken = await Spotify.getAccessToken();
        const AccessObject = {
            headers: { Authorization: `Bearer ${AccessToken}` }
        };
        const search_url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        let jsonResponse = "";
        try {
            let response = await fetch(search_url, AccessObject);
            if (response.ok) {
                jsonResponse = await response.json();
                if (!jsonResponse) return [];
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    async savePlaylist(playlistName, track_uris) {
        if (!playlistName || !track_uris.length)
            return;
        AccessToken = await Spotify.getAccessToken();

        let headers = {
            headers: { Authorization: `Bearer ${AccessToken}` }
        };

        let user_id;
        let responseJSON;
        let url = "https://api.spotify.com/v1/me";

        try {
            const response = await fetch(url, headers);
            if (response.ok) {
                responseJSON = await response.json();
                user_id = responseJSON.id;
                if (!user_id) return;
            }
        }
        catch (error) {
            console.log(error);
        }

        // Make the POST request to create a playlist in the user's Spotify account
        // First, setup headers, data and endpoint url
        let data = {
            "name": playlistName
        };

        headers = {
            headers: {  
                Authorization: `Bearer ${AccessToken}`,
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        };
        url = `https://api.spotify.com/v1/users/${user_id}/playlists`;

        let playlistID;
        try {
            const response = await fetch(url, headers);
            if (response.ok) {
                responseJSON = await response.json();
                playlistID = responseJSON.id;
            }
        }
        catch (error) {
            console.log(error);
        }

        // Now add the tracks to the playlist
        data = {
            "uris": track_uris
        }
        url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
        headers.body = JSON.stringify(data);
        try {
            const response = await fetch(url, headers);
            if (response.ok) {
                responseJSON = response.json();
            }
        }
        catch(error) {
            console.log(error);
        }

    }
}

export { Spotify };