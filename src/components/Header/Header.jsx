
import '../../index.css';
import './Header.css';
import React from "react";


function Header(props)
{
    let connectText = "Connexion";
    const connectLink = connectText === "Connexion"? "/connect" : "/account"
    if(props.account != null && props.account.id != null)
    {
        connectText = "Compte";
    }

    return(
    <header>
            
        <nav className='d-flex'>
            ${connectLink}
        </nav>
    </header>)
}

export default Header;