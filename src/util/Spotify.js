let AccessToken = "";
let ExpiresIn = "";

const endpoint = "https://api.spotify.com/v1/";
const Spotify = {
	async getAccessToken() {
		if (AccessToken) return AccessToken;

		const AccessTokenMatch =
			window.location.href.match(/access_token=([^&]*)/);
		const ExpiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

		if (AccessTokenMatch && ExpiresInMatch) {
			AccessToken = AccessTokenMatch[1];
			ExpiresIn = Number(ExpiresInMatch[1]);
			window.setTimeout(() => (AccessToken = ""), ExpiresIn * 1000);
			window.history.pushState("Access Token", null, "/");
			return AccessToken;
		} else {
			const isBuild = process.env.NODE_ENV === "production";
			const redirect_uri = isBuild
				? "https://webejammming.netlify.app/"
				: process.env.REACT_APP_REDIRECT_URI;
			let url = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
			window.location = url;
		}
	},

	async search(term) {
		AccessToken = await Spotify.getAccessToken();
		const headers = { Authorization: `Bearer ${AccessToken}` };
		const search_url = `${endpoint}search?type=track&q=${term}`;
		let jsonResponse = "";
		try {
			let response = await fetch(search_url, { headers });
			if (response.ok) {
				jsonResponse = await response.json();
				if (!jsonResponse) return [];
				return jsonResponse.tracks.items.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri,
				}));
			}
		} catch (error) {
			console.log(error);
		}
	},

	async savePlaylist(name, uris) {
		if (!name || !uris) return;
		AccessToken = await Spotify.getAccessToken();

		const headers = {
			Authorization: `Bearer ${AccessToken}`,
			"Content-Type": "application/json",
		};
		let user_id;
		let responseJSON;
		let url = "https://api.spotify.com/v1/me";

		try {
			const response = await fetch(url, { headers });
			if (response.ok) {
				responseJSON = await response.json();
				console.log(responseJSON);
				user_id = responseJSON.id;
				if (!user_id) return;
			}
		} catch (error) {
			console.log(error);
		}
		url = `${endpoint}users/${user_id}/playlists`;

		let playlistID;
		try {
			const response = await fetch(url, {
				headers,
				method: "POST",
				body: JSON.stringify({ name }),
			});
			if (response.ok) {
				responseJSON = await response.json();
				playlistID = responseJSON.id;
			}
		} catch (error) {
			console.log(error);
		}

		// Now add the tracks to the playlist
		url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
		try {
			const response = await fetch(url, {
				headers,
				method: "POST",
				body: JSON.stringify({ uris }),
			});
			if (response.ok) {
				responseJSON = response.json();
			}
		} catch (error) {
			console.log(error);
		}
	},
	async getProfilePicURL() {
		AccessToken = await Spotify.getAccessToken();
		if (!AccessToken) return;
		const headers = { Authorization: `Bearer ${AccessToken}` };
		let url = "https://api.spotify.com/v1/me";
		let responseJSON;
		let images;
		try {
			const response = await fetch(url, { headers });
			if (response.ok) {
				responseJSON = await response.json();
				images = responseJSON.images;
			}
		} catch (error) {
			console.log(error);
		}
		if (images.length) return images[0].url;
	},
};

export { Spotify };
