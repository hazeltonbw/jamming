import React, { Component } from "react";
import "./Playlist.css";

export class Playlist extends Component {
    render() {
        return (
            <div className="Playlist">
                <input value="New Playlist" />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}
