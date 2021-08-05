import React, { Component } from "react";
import { TrackList } from "../TrackList/TrackList";
import "./Playlist.css";

export class Playlist extends Component {
    render() {
        return (
            <div className="Playlist">
                <input value="New Playlist" />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            <TrackList 
                playlistTracks={this.props.playlistTracks}
                onRemove={this.props.onRemove}
                isRemoval={true}
            />
            </div>
        );
    }
}
