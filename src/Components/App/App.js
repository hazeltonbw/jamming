import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js";
import { Playlist } from "../Playlist/Playlist.js";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
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
                },
            ],
        };
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
                        />
                        <Playlist />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
