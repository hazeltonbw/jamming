import React from "react";
import { TrackList } from "../TrackList/TrackList.js";
import "./SearchResults.css";

class SearchResults extends React.Component {
	constructor(props) {
        super(props);
        this.changeButton = this.changeButton.bind(this);
		this.state = {
			hide: "Hide"
		}
	}

	changeButton() {
		const action = this.state.hide === "Show" ? "Hide" : "Show";
		this.setState( { hide: action } );
	}

	render() {
		return (
			<div className="SearchResults">
				<input 
					className="hideResults"
					type="button"
					value={this.state.hide + " Results"}
					onClick={this.changeButton}
					/>
				{this.state.hide === "Hide" && <TrackList
					playlistTracks={this.props.searchResults}
					onAdd={this.props.onAdd}
					isRemoval={false}
					hide={this.state.hide}
				/>}
			</div>
		);
	}
}

export { SearchResults };