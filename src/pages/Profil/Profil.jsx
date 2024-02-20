import React from 'react';

import config from '../../utilities/config';
import PageBase from '../../components/PageBase/PageBase';

export default class Profil extends PageBase {

    constructor(props)
    {
        super(props);
        // this.state = {showProfil: []}
    }

    componentDidMount()
    {
        this.checkConnection()
        const params = new URLSearchParams(window.location.search);
        
        const user = params.get("user")
        if(user != null)
        {
            config.axiosInstance.get('/users', {params: {filter: {"username": `${user}`}}})
            .then(res => {
                this.setState({showProfil: res.data[0]})
            })
        }else 
        {
            this.setState({showProfil: undefined})
        }
        this.disconnectCallBack = this.disconnectCallBack.bind(this);
    }

    disconnectCallBack(event)
    {
        // console.log("deconnecté")
        localStorage.removeItem("token")
        this.checkConnection()
        event.preventDefault();
    }

    render()
    {
        if(this.isConnectionPending() === false && this.isConnected() === false && this.state.showProfil === undefined)
        {
            return(
                <p>Profil introuvable</p>
            )
        }
        let profile = this.state.showProfil
        if(this.state.showProfil === undefined && this.isConnected())
        {
            profile = this.state.account
        }
        console.log(profile)
        if(profile === undefined) return(null)
        return(
            <p>
                {profile.email}
                {this.isConnected() && this.state.showProfil === undefined ? <button onClick={this.disconnectCallBack}>Deconnecter</button> : null}
            </p>
        )
    }
}