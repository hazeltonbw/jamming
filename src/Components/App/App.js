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
                    "id":"3zpbWaTHZutGOjT4S4CuUq",
                    "name":"The Duck Song",
                    "artist":"Bryant Oden",
                    "album":"The Duck Song (The Duck And The Lemonade Stand)",
                    "uri":"spotify:track:3zpbWaTHZutGOjT4S4CuUq"
                },
                {
                    "id":"1zyqZONW985Cs4osz9wlsu",
                    "name":"On the Hotline - Amended Version",
                    "artist":"Pretty Ricky",
                    "album":"Late Night Special",
                    "uri":"spotify:track:1zyqZONW985Cs4osz9wlsu"
                },
                {
                    "id":"6jF6iozvmHms55tWmsXMud",
                    "name":"The Duck Song (The Duck and the Lemonade Stand)",
                    "artist":"Bryant Oden",
                    "album":"The Songdrops Collection, Vol. 1",
                    "uri":"spotify:track:6jF6iozvmHms55tWmsXMud"
                },
                {
                    "id":"0B2ZuTLZnWQ6gz8RlNwBu1",
                    "name":"On Fire",
                    "artist":"Lloyd Banks",
                    "album":"The Hunger For More",
                    "uri":"spotify:track:0B2ZuTLZnWQ6gz8RlNwBu1"
                },
                {
                    "id":"2I66eI2j2ZfOe9q8TMLPbj",
                    "name":"The Duck Song",
                    "artist":"The Duck",
                    "album":"The Duck Song",
                    "uri":"spotify:track:2I66eI2j2ZfOe9q8TMLPbj"
                }
            ],
            playlistName: "New Playlist",

            playlistTracks: [
                {
                    "id": "0m9ul5FMXzR2k2BRZKamcn",
                    "name": "It Was A Good Day",
                    "artist": "Ice Cube",
                    "album": "Greatest Hits",
                    "uri": "spotify:track:0m9ul5FMXzR2k2BRZKamcn"
                },
                {
                    "id": "0dqGfCMAGyDgpUAgLNOjWd",
                    "name": "Fade To Black (Remastered)",
                    "artist": "Metallica",
                    "album": "Ride The Lightning (Deluxe Remaster)",
                    "uri": "spotify:track:0dqGfCMAGyDgpUAgLNOjWd"
                },
                {
                    "id": "2SG0RPcyWgUPqLCKWLtYc1",
                    "name": "Sandstorm - Original Mix",
                    "artist": "Darude", 
                    "album": "Sandstorm",
                    "uri": "spotify:track:2SG0RPcyWgUPqLCKWLtYc1"
                }
            ]
        };
    }

    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }
        this.setState({ playlistTracks: this.state.playlistTracks.concat(track) });
    }

    removeTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            this.setState({ playlistTracks: this.state.playlistTracks.filter(current_track => current_track.id !== track.id) });
        }
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    savePlaylist() {
        const playlistName = this.state.playlistName;
        const track_uris = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(playlistName, track_uris);
        this.setState({
            playlistName: 'New Playlist',
            playlistTracks: []
        });
    }

    async search(term) {
        let search_results = await Spotify.search(term);
        this.setState({ searchResults: search_results });
    }

    render() {
        return (
            <div>
                <h1>
                    Ja<span className="highlight">mmm</span>ing
                </h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
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