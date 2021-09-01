import React, { Component } from "react";
import "./Track.css";

export class Track extends Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);

    }

    renderAction() {
        const buttonType = this.props.isRemoval === true ? "-" : "+";
        const action = buttonType === "-" ? "Remove from" : "Add to";
        return (
            <button
                className="Track-action"
                onClick={this.props.isRemoval === true ? this.removeTrack : this.addTrack}
                title={action + " playlist"}
            >
                {buttonType}
            </button>
        );
    }
    addTrack(track) {
        this.props.onAdd(this.props.track);
    }

    removeTrack(track) {
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <img src={this.props.track.albumart} alt={this.props.track.album + " album art"} />
                    <div className="title-album">
                        <div className="track-artist">
                            <h4>{this.props.track.name}</h4>
                            <p>{this.props.track.artist}</p>
                        </div>
                        <p className="album">
                            {this.props.track.album}
                        </p>
                    </div>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}
