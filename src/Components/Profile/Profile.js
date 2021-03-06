import React, { Component } from "react";
import "./Profile.css";
import logo from "../../images/user-default-icon.png";

class Profile extends Component {
    render() {
        return (
            <div className="UserProfile">
                <h6>{this.props.username}</h6>
                <img src={this.props.profilePicURL} alt="User icon"></img>
            </div>
        );
    }
}

Profile.defaultProps = {
    profilePicURL: logo,
};

export { Profile };
