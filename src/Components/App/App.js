import "./App.css"
import { SearchBar } from "../SearchBar/SearchBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js";
import { Playlist } from "../Playlist/Playlist.js";
import { Spotify } from "../../util/Spotify";
import React from "react";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);

        this.state = {
            searchResults: [
                {
                    name: "Another One",
                    artist: "DJ Khaled",
                    album: "whatever",
                    id: 1,
                },
                {
                    name: "Fade to Black",
                    artist: "Metallica",
                    album: "Fade to Black",
                    id: 2,
                },
                {
                    name: "Sandstorm",
                    artist: "Darude",
                    album: "Sandstorm",
                    id: 3,
                }
            ],

            playlistName: "New Playlist",
            
            playlistTracks: [
                {
                    name: "Another One",
                    artist: "DJ Khaled",
                    album: "whatever",
                    id: 1,
                },
                {
                    name: "Fade to Black",
                    artist: "Metallica",
                    album: "Fade to Black",
                    id: 2,
                },
                {
                    name: "Sandstorm",
                    artist: "Darude",
                    album: "Sandstorm",
                    id: 3,
                }
            ]
        };
    }

    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }
        this.setState({playlistTracks: this.state.playlistTracks.concat(track)});
    }
    
    removeTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            this.setState({playlistTracks: this.state.playlistTracks.filter(current_track => current_track.id !== track.id)});
        }
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    savePlaylist() {
        const playlistName = this.state.playlistName;
        const track_uris = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(playlistName, track_uris);
        this.setState({
            playlistName: 'New Playlist',
            playlistTracks: []
        });
    // TODO: 
    // Generate an array of uri values called trackURIs from the playlistTracks property.
    // In a later step, you will pass the trackURIs array and playlistName to a method that will save the user’s playlist to their account.
    }

    async search(term) {
        let search_results = await Spotify.search(term);
        this.setState({searchResults: search_results});
    }

    render() {
        return (
            <div>
                <h1>
                    Ja<span className="highlight">mmm</span>ing
                </h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
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