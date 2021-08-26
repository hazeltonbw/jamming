import React, { Component } from "react";
import "./Profile.css";
import logo from '../../images/user-default-icon.png';

export class Profile extends Component {
    render() {
        return (
            <div  className="UserProfile">
                <img
                    src={logo}
                    alt="User icon"
                >
                </img>
            </div>);
    }

}