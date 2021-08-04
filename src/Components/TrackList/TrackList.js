import React, { Component } from "react";
import { Track } from "../Track/Track.js";
import "./TrackList.css";

export class TrackList extends Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map((track) => (
                    <Track track={track} />
                ))}
            </div>
        );
    }
}
