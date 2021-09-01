import React, { Component } from "react";
import "./TrackListHeader.css";

export class TrackListHeader extends Component {
    render() {
        return (
            <div className="headers">
                <h3 className="titleColumn">Title/<span className="thin">Artist</span></h3>
                <h3 className="albumColumn">Album</h3>
            </div>
        );
    }
}
