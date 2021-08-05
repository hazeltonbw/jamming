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
        return (
            <button
                className="Track-action"
                onClick={this.props.isRemoval === true ? this.removeTrack : this.addTrack}    
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
                    <h3>{this.props.track.name}</h3>
                    <p>
                        {this.props.track.artist} | {this.props.track.album}
                    </p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}
