import React, { Component } from "react";
import { TrackList } from "../TrackList/TrackList";
import "./Playlist.css";

export class Playlist extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <div className="Playlist-save-flex">
                <input onChange={this.handleNameChange} placeholder="Playlist Name" />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
                </div>
                <TrackList
                    playlistTracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                />
            </div>
        );
    }
}