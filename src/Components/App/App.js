import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js";
import { Playlist } from "../Playlist/Playlist.js";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);

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

            playlistName: "Fun tracks",
            
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
        this.state.playlistTracks.push(track);
        this.setState();
    }

    removeTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }



    }

    

    render() {
        return (
            <div>
                <h1>
                    Ja<span className="highlight">mmm</span>ing
                </h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                        />
                        <Playlist 
                            playlistName={this.state.playlistName} 
                            playlistTracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
