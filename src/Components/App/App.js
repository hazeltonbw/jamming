import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify";
import { Profile } from "../Profile/Profile";
import { initialState } from "./initialState";
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

    // make App.js less cluttered
    this.state = initialState;
  }
  componentDidMount() {
    const searchTermExistsInLocalStorage = localStorage.getItem("term");
    if (searchTermExistsInLocalStorage) {
      this.search(searchTermExistsInLocalStorage);
      this.initProfile();
    }
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    }
    this.setState({
      playlistTracks: this.state.playlistTracks.concat(track),
    });
  }

  removeTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
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
    if (!localStorage.getItem("term")) localStorage.setItem("term", term);
    else localStorage.removeItem("term");
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
        <Profile
          profilePicURL={this.state.profilePic}
          username={this.state.username}
        />
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
