import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        if (!this.state) {
            return;
        }
        this.props.onSearch(this.state.term);
    }

    handleTermChange(e) {
        this.setState({ term: e.target.value });
    }

    render() {
        return (
            <div className="SearchBar">
                <input
                    onChange={this.handleTermChange}
                    placeholder="The Beatles"
                    inputMode="search"
                />
                <button onClick={this.search} className="SearchButton">
                    SEARCH
                </button>
            </div>
        );
    }
}
