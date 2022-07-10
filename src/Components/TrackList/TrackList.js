import React, { Component } from 'react'
import { Track } from '../Track/Track.js'
import './TrackList.css'
import { TrackListHeader } from '../TrackListHeader/TrackListHeader.js'
export class TrackList extends Component {
  render() {
    return (
      <div className='TrackList'>
        <TrackListHeader />
        {this.props.playlistTracks ? (
          this.props.playlistTracks.map((track) => (
            <Track
              key={track.id}
              track={track}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
            />
          ))
        ) : (
          <h2 className='no-results'>No tracks found</h2>
        )}
      </div>
    )
  }
}
