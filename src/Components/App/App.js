import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify";
import { Profile } from "../Profile/Profile";
import React from "react";

require("dotenv").config();

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
		this.initProfile = this.initProfile.bind(this);

		this.state = {
			searchResults:
				[
					{
						"id": "6dGnYIeXmHdcikdzNNDMm2",
						"name": "Here Comes The Sun - Remastered 2009",
						"artist": "The Beatles",
						"album": "Abbey Road (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25",
						"uri": "spotify:track:6dGnYIeXmHdcikdzNNDMm2"
					},
					{
						"id": "6EOKwO6WaLal58MSsi6U4W",
						"name": "Eleanor Rigby",
						"artist": "The Beatles",
						"album": "Yellow Submarine Songtrack",
						"albumart": "https://i.scdn.co/image/ab67616d00004851d807dd713cdfbeed142881e2",
						"uri": "spotify:track:6EOKwO6WaLal58MSsi6U4W"
					},
					{
						"id": "2EqlS6tkEnglzr7tkKAAYD",
						"name": "Come Together - Remastered 2009",
						"artist": "The Beatles",
						"album": "Abbey Road (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25",
						"uri": "spotify:track:2EqlS6tkEnglzr7tkKAAYD"
					},
					{
						"id": "7iN1s7xHE4ifF5povM6A48",
						"name": "Let It Be - Remastered 2009",
						"artist": "The Beatles", "album": "Let It Be (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d0000485184243a01af3c77b56fe01ab1",
						"uri": "spotify:track:7iN1s7xHE4ifF5povM6A48"
					},
					{
						"id": "3BQHpFgAp4l80e1XslIjNI",
						"name": "Yesterday - Remastered 2009",
						"artist": "The Beatles",
						"album": "Help! (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d00004851e3e3b64cea45265469d4cafa",
						"uri": "spotify:track:3BQHpFgAp4l80e1XslIjNI"
					},
					{
						"id": "3Am0IbOxmvlSXro7N5iSfZ",
						"name": "Strawberry Fields Forever - Remastered 2009",
						"artist": "The Beatles",
						"album": "Magical Mystery Tour (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d00004851692d9189b2bd75525893f0c1",
						"uri": "spotify:track:3Am0IbOxmvlSXro7N5iSfZ"
					},
					{
						"id": "5jgFfDIR6FR0gvlA56Nakr",
						"name": "Blackbird - Remastered 2009",
						"artist": "The Beatles",
						"album": "The Beatles (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d000048514ce8b4e42588bf18182a1ad2",
						"uri": "spotify:track:5jgFfDIR6FR0gvlA56Nakr"
					},
					{
						"id": "3KfbEIOC7YIv90FIfNSZpo",
						"name": "In My Life - Remastered 2009",
						"artist": "The Beatles",
						"album": "Rubber Soul (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d00004851ed801e58a9ababdea6ac7ce4",
						"uri": "spotify:track:3KfbEIOC7YIv90FIfNSZpo"
					},
					{
						"id": "0aym2LBJBk9DAYuHHutrIl",
						"name": "Hey Jude - Remastered 2015",
						"artist": "The Beatles",
						"album": "1 (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d00004851582d56ce20fe0146ffa0e5cf",
						"uri": "spotify:track:0aym2LBJBk9DAYuHHutrIl"
					},
					{
						"id": "1gFNm7cXfG1vSMcxPpSxec",
						"name": "Ob-La-Di, Ob-La-Da - Remastered 2009",
						"artist": "The Beatles",
						"album": "The Beatles (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d000048514ce8b4e42588bf18182a1ad2",
						"uri": "spotify:track:1gFNm7cXfG1vSMcxPpSxec"
					},
					{
						"id": "5ZBeML7Lf3FMEVviTyvi8l",
						"name": "Twist And Shout - Remastered 2009",
						"artist": "The Beatles",
						"album": "Please Please Me (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d00004851dbeec63ad914c973e75c24df",
						"uri": "spotify:track:5ZBeML7Lf3FMEVviTyvi8l"
					},
					{
						"id": "3evG0BIqEFMMP7lVJh1cSf",
						"name": "Don't Let Me Down - Remastered 2009",
						"artist": "The Beatles",
						"album": "The Beatles 1967 - 1970 (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d000048516e3d3c964df32136fb1cd594",
						"uri": "spotify:track:3evG0BIqEFMMP7lVJh1cSf"
					},
					{
						"id": "4pbG9SUmWIvsROVLF0zF9s",
						"name": "I Want To Hold Your Hand - Remastered 2015",
						"artist": "The Beatles", "album": "1 (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d00004851582d56ce20fe0146ffa0e5cf",
						"uri": "spotify:track:4pbG9SUmWIvsROVLF0zF9s"
					},
					{
						"id": "0pNeVovbiZHkulpGeOx1Gj",
						"name": "Something - Remastered 2009",
						"artist": "The Beatles",
						"album": "Abbey Road (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25",
						"uri": "spotify:track:0pNeVovbiZHkulpGeOx1Gj"
					},
					{
						"id": "1ABegtCPBMMJaMpfDyATjE",
						"name": "Birthday - Remastered 2009",
						"artist": "The Beatles", "album": "The Beatles (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d000048514ce8b4e42588bf18182a1ad2",
						"uri": "spotify:track:1ABegtCPBMMJaMpfDyATjE"
					},
					{
						"id": "25yQPHgC35WNnnOUqFhgVR",
						"name": "Lucy In The Sky With Diamonds - Remastered 2009",
						"artist": "The Beatles",
						"album": "Sgt. Pepper's Lonely Hearts Club Band (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d0000485134ef8f7d06cf2fc2146f420a",
						"uri": "spotify:track:25yQPHgC35WNnnOUqFhgVR"
					},
					{
						"id": "5GjPQ0eI7AgmOnADn1EO6Q",
						"name": "Eleanor Rigby - Remastered 2009",
						"artist": "The Beatles",
						"album": "Revolver (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d0000485128b8b9b46428896e6491e97a",
						"uri": "spotify:track:5GjPQ0eI7AgmOnADn1EO6Q"
					},
					{
						"id": "7DD7eSuYSC5xk2ArU62esN",
						"name": "Help! - Remastered 2009",
						"artist": "The Beatles",
						"album": "Help! (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d00004851e3e3b64cea45265469d4cafa",
						"uri": "spotify:track:7DD7eSuYSC5xk2ArU62esN"
					},
					{
						"id": "389QX9Q1eUOEZ19vtzzI9O",
						"name": "While My Guitar Gently Weeps - Remastered 2009",
						"artist": "The Beatles",
						"album": "The Beatles (Remastered)",
						"albumart": "https://i.scdn.co/image/ab67616d000048514ce8b4e42588bf18182a1ad2",
						"uri": "spotify:track:389QX9Q1eUOEZ19vtzzI9O"
					},
					{
						"id": "38iGqJQPZcTYNx6bdR5YWC",
						"name": "She Likes the Beatles",
						"artist": "William Clark Green",
						"album": "Rose Queen",
						"albumart": "https://i.scdn.co/image/ab67616d000048515dc74d133b45ff9bf001befb",
						"uri": "spotify:track:38iGqJQPZcTYNx6bdR5YWC"
					}
				],
			playlistName: "Playlist Name",

			playlistTracks: [
				{
					"id":"7DD7eSuYSC5xk2ArU62esN",
					"name":"Help! - Remastered 2009",
					"artist":"The Beatles",
					"album":"Help! (Remastered)",
					"albumart":"https://i.scdn.co/image/ab67616d00004851e3e3b64cea45265469d4cafa",
					"uri":"spotify:track:7DD7eSuYSC5xk2ArU62esN"
				},
				{
					"id":"5GjPQ0eI7AgmOnADn1EO6Q",
					"name":"Eleanor Rigby - Remastered 2009",
					"artist":"The Beatles",
					"album":"Revolver (Remastered)",
					"albumart":"https://i.scdn.co/image/ab67616d0000485128b8b9b46428896e6491e97a",
					"uri":"spotify:track:5GjPQ0eI7AgmOnADn1EO6Q"
				},
				{
					"id":"25yQPHgC35WNnnOUqFhgVR",
					"name":"Lucy In The Sky With Diamonds - Remastered 2009",
					"artist":"The Beatles",
					"album":"Sgt. Pepper's Lonely Hearts Club Band (Remastered)",
					"albumart":"https://i.scdn.co/image/ab67616d0000485134ef8f7d06cf2fc2146f420a",
					"uri":"spotify:track:25yQPHgC35WNnnOUqFhgVR"
				}
			],
		};
	}

	componentDidMount() {
		const searchTermExistsInLocalStorage = localStorage.getItem('term');
		if (searchTermExistsInLocalStorage) {
			this.search(searchTermExistsInLocalStorage);
			this.initProfile();
		}
	}

	addTrack(track) {
		if (
			this.state.playlistTracks.find(
				(savedTrack) => savedTrack.id === track.id
			)
		) {
			return;
		}
		this.setState({
			playlistTracks: this.state.playlistTracks.concat(track),
		});
	}

	removeTrack(track) {
		if (
			this.state.playlistTracks.find(
				(savedTrack) => savedTrack.id === track.id
			)
		) {
			this.setState({
				playlistTracks: this.state.playlistTracks.filter(
					(current_track) => current_track.id !== track.id
				),
			});
		}
	}

	updatePlaylistName(name) {
		this.setState({ playlistName: name });
	}

	savePlaylist() {
		const playlistName = this.state.playlistName;
		const track_uris = this.state.playlistTracks.map((track) => track.uri);
		Spotify.savePlaylist(playlistName, track_uris);
		this.setState({
			playlistName: "Playlist Name",
			playlistTracks: [],
		});
	}

	async search(term) {
		if (!localStorage.getItem('term'))
			localStorage.setItem('term', term);
		else
			localStorage.removeItem('term');
		let search_results = await Spotify.search(term);
		if (!search_results) return;
		this.setState({ searchResults: search_results });
	}

	async initProfile() {
		let profile = await Spotify.getProfile();
		let profilePicIconURL = "../../images/user-default-icon.png";
		let userName = profile.display_name;
		if (profile.images.length) {
			profilePicIconURL = profile.images[0].url;
		}
		this.setState({
			profilePic: profilePicIconURL,
			username: userName,
		});
	}
	render() {
		return (
			<div>
				<Profile profilePicURL={this.state.profilePic} username={this.state.username} />
				<header>
					<div className="UserTitle">
						<a href="#">
							<h1>
								Ja<span className="highlight">mmm</span>ing
							</h1>
						</a>
						<SearchBar onSearch={this.search} />
					</div>
				</header>
				<div className="App">
					<div className="App-playlist">
						<SearchResults
							searchResults={this.state.searchResults}
							onAdd={this.addTrack}
						/>
						<Playlist
							onNameChange={this.updatePlaylistName}
							playlistName={this.state.playlistName}
							playlistTracks={this.state.playlistTracks}
							onRemove={this.removeTrack}
							onSave={this.savePlaylist}
						/>
					</div>
				</div>
			</div>
		);
	}
}
