import { CLIENT_ID, REDIRECT_URI, AccessToken, ExpiresIn } from "./config.js";

export class Spotify {
    async getAccessToken() {
        if (AccessToken !== "") {
            return AccessToken;
        }
        // Simulate a mouse click:
        
        let url = `https://accounts.spotify.com/authorize?client_id={CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri={REDIRECT_URI}`;
        const response = fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        console.log(JSON.stringify(response));
        AccessToken = window.location.href.match(/access_token=([^&]*)/);
        ExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    }

    search(term) {

    }
}