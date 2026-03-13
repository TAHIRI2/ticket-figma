import React, { Component } from "react";
import './Header.scss';
import logoTickets from '../icone/logot.png';
class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-icone">
                    <img src={logoTickets} alt="Icône tickets" />
                </div>
                <div className="header-text">
                    <h1>TICKETS</h1>
                    <h3>GERER VOS TICKETS</h3>
                </div>
            </div>
        )
    }
}

export default Header;