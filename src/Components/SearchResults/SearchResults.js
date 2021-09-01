import React from "react";
import { TrackList } from "../TrackList/TrackList.js";
import "./SearchResults.css";

export class SearchResults extends React.Component {
	render() {
		return (
			<div className="SearchResults">
				<TrackList
					playlistTracks={this.props.searchResults}
					onAdd={this.props.onAdd}
					isRemoval={false}
				/>
			</div>
		);
	}
}
