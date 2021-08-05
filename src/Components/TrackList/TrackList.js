import React, { Component } from "react";
import { Track } from "../Track/Track.js";
import "./TrackList.css";

export class TrackList extends Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.playlistTracks.map((track) => 
                <Track 
                    track={track} 
                    onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
                    isRemoval={this.props.isRemoval}
                />)}
            </div>
        );
    }
}
