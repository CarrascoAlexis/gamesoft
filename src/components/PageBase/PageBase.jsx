import React from "react";
import config from "../../utilities/config";

export default class PageBase extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {account: [], logged: false}
    }

    update()
    {
        return
    }

    isConnected()
    {
        return this.state.logged === true && !(this.state.account === undefined || this.state.account.length === 0);
    }

    isConnectionPending()
    {
        return this.state.logged === false
    }

    componentDidMount()
    {
        this.checkConnection = this.checkConnection.bind(this)
        this.checkConnection()
    }

    checkConnection()
    {
        if(localStorage.getItem("token") != undefined)
        {
            config.axiosInstance.get('https://api.ipify.org/?format=json')
            .then(res => {
                config.axiosInstance.get(`sessions`, {params: {"filter": {"token": `${localStorage.getItem("token")}`, "ip": `${res.data.ip}`}}})
                .then(res => {
                    const session = res.data[0];
                    if(session.length == 0)
                    {
                        if(this.state.account === undefined || (this.state.account.length != 0 && this.state.logged === false))
                        this.setState({ account: [], logged: true });
                        this.update()
                        return
                    }
                    config.axiosInstance.get('users', {params: {"filter": {"id": `${session.account_id}`}}})
                    .then(res => {
                        if(this.state.account != res.data[0] && this.state.logged === false)
                        this.setState({ account: res.data[0], logged: true});
                    this.update()
                    })
                })
            })
        }else
        {
            this.setState({ account: [], logged: true });
            this.update()
        }
    }
}