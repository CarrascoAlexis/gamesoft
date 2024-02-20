import '../../index.css';
import PageBase from '../PageBase/PageBase';
import './Header.css';
import React from "react";
import { Link } from "react-router-dom";


export default class Header extends PageBase
{

    render()
    {
        return(
        <header onMouseEnter={this.checkConnection}>
            <nav className='d-flex'>
                <Link to={this.isConnected() ? "/profil" : "/connexion"} >${this.isConnected() ? "Profil" : "Connexion" }</Link>
            </nav>
        </header>)
    }
}