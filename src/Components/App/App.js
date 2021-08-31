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
			searchResults: [
				{
					id: "3fjCqjypAHUNhfkujitTJn",
					name: "What Are You Looking For",
					artist: "Sick Puppies",
					album: "Dressed Up As Life",
					uri: "spotify:track:3fjCqjypAHUNhfkujitTJn",
				},
				{
					id: "3DlgDXIYtnWtJKiB8bZQMv",
					name: "Photosynthesis",
					artist: "Saba",
					album: "Bucket List Project",
					uri: "spotify:track:3DlgDXIYtnWtJKiB8bZQMv",
				},
				{
					id: "5ZtXyVtXU3G5wRu5qqROvh",
					name: "What Are You Looking For?",
					artist: "Kinney",
					album: "So Glad You Exist",
					uri: "spotify:track:5ZtXyVtXU3G5wRu5qqROvh",
				},
				{
					id: "2mwnYvlLVP465u9V9wjUGj",
					name: "Find Me",
					artist: "Kings of Leon",
					album: "WALLS",
					uri: "spotify:track:2mwnYvlLVP465u9V9wjUGj",
				},
				{
					id: "3eR3lWuvQqOzhTn91nbRCa",
					name: "Something That I Want",
					artist: "Grace Potter",
					album: "Tangled",
					uri: "spotify:track:3eR3lWuvQqOzhTn91nbRCa",
				},
				{
					id: "7ejAeKSETTe2vQCiS4Ad9e",
					name: "Past My Prime",
					artist: "Greensky Bluegrass",
					album: "Shouted, Written Down & Quoted",
					uri: "spotify:track:7ejAeKSETTe2vQCiS4Ad9e",
				},
				{
					id: "6YKkW8xOZemwJuZ6RAfEga",
					name: "Big Mouth",
					artist: "Citizen",
					album: "Big Mouth",
					uri: "spotify:track:6YKkW8xOZemwJuZ6RAfEga",
				},
				{
					id: "30EnyAjJs8F9LSOOjxUvmG",
					name: "Lovergirl",
					artist: "Yusei",
					album: "Lovergirl",
					uri: "spotify:track:30EnyAjJs8F9LSOOjxUvmG",
				},
				{
					id: "3UyL1yzD5B1nIaFJRs4W8r",
					name: "Hold On",
					artist: "Good Charlotte",
					album: "The Young and The Hopeless",
					uri: "spotify:track:3UyL1yzD5B1nIaFJRs4W8r",
				},
				{
					id: "5MUtfvBf6O5281IAhBXDHb",
					name: "How to Forgive",
					artist: "Tennis",
					album: "Swimmer",
					uri: "spotify:track:5MUtfvBf6O5281IAhBXDHb",
				},
				{
					id: "0AaJoyA8WDFfTSFCVLOoU2",
					name: "Where You Want Me",
					artist: "Brett Young",
					album: "Ticket To L.A.",
					uri: "spotify:track:0AaJoyA8WDFfTSFCVLOoU2",
				},
				{
					id: "1W6rk2GOZWHWzGbHGKCQj9",
					name: "B4",
					artist: "Ginger Root",
					album: "B4",
					uri: "spotify:track:1W6rk2GOZWHWzGbHGKCQj9",
				},
				{
					id: "153SwL1d9SfCLWhqIs08we",
					name: "Alison Hell",
					artist: "Annihilator",
					album: "Alice In Hell",
					uri: "spotify:track:153SwL1d9SfCLWhqIs08we",
				},
				{
					id: "5XhwjFeptj9D52SW4tKN8u",
					name: "REVIVER",
					artist: "MY FIRST STORY",
					album: "THE PREMIUM SYMPHONY",
					uri: "spotify:track:5XhwjFeptj9D52SW4tKN8u",
				},
				{
					id: "4YIEQFXKPv3OYl2JBXJ86H",
					name: "Birds",
					artist: "Cody Jinks",
					album: "Adobe Sessions",
					uri: "spotify:track:4YIEQFXKPv3OYl2JBXJ86H",
				},
				{
					id: "1oBTw7IkWnEUxiestsAD1V",
					name: "Falling In Love (Is Hard On The Knees)",
					artist: "Aerosmith",
					album: "Nine Lives",
					uri: "spotify:track:1oBTw7IkWnEUxiestsAD1V",
				},
				{
					id: "6kRblaZ5a4V76t7Wd5h9qc",
					name: "And I Drove You Crazy",
					artist: "BANKS",
					album: "Goddess (Deluxe)",
					uri: "spotify:track:6kRblaZ5a4V76t7Wd5h9qc",
				},
				{
					id: "3zbptLHVvAgOeO3zmTcFmw",
					name: "What Are You Digging For",
					artist: "BONZIE",
					album: "Reincarnation",
					uri: "spotify:track:3zbptLHVvAgOeO3zmTcFmw",
				},
				{
					id: "02HZgK5YSCALhTkEw2x1va",
					name: "Give",
					artist: "You Me At Six",
					album: "Night People",
					uri: "spotify:track:02HZgK5YSCALhTkEw2x1va",
				},
				{
					id: "3nwm64vSRDY3NPLRrQTI1a",
					name: "Zvvl",
					artist: "CHVRCHES",
					album: "Recover",
					uri: "spotify:track:3nwm64vSRDY3NPLRrQTI1a",
				},
			],
			playlistName: "Playlist Name",

			playlistTracks: [
				{
					id: "0m9ul5FMXzR2k2BRZKamcn",
					name: "It Was A Good Day",
					artist: "Ice Cube",
					album: "Greatest Hits",
					uri: "spotify:track:0m9ul5FMXzR2k2BRZKamcn",
				},
				{
					id: "0dqGfCMAGyDgpUAgLNOjWd",
					name: "Fade To Black (Remastered)",
					artist: "Metallica",
					album: "Ride The Lightning (Deluxe Remaster)",
					uri: "spotify:track:0dqGfCMAGyDgpUAgLNOjWd",
				},
				{
					id: "2SG0RPcyWgUPqLCKWLtYc1",
					name: "Sandstorm - Original Mix",
					artist: "Darude",
					album: "Sandstorm",
					uri: "spotify:track:2SG0RPcyWgUPqLCKWLtYc1",
				},
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
				<Profile profilePicURL={this.state.profilePic} username={this.state.username}/>
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
